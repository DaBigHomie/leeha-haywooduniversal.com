/**
 * Agent 2: Content Extraction Specialist
 * Extract and structure all textual content with semantic meaning
 */

import * as cheerio from 'cheerio';
import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import ora from 'ora';

interface TextBlock {
  id: string;
  type: 'heading' | 'paragraph' | 'list' | 'blockquote' | 'code';
  content: string;
  html: string;
  tag: string;
  level?: number;
  parent?: string;
  attributes: Record<string, string>;
  position: number;
}

interface CallToAction {
  text: string;
  href: string;
  type: 'button' | 'link';
  context: string;
  priority: 'primary' | 'secondary' | 'tertiary';
}

interface ContentInventory {
  pageUrl: string;
  pageTitle: string;
  sections: ContentSection[];
  textBlocks: TextBlock[];
  headings: Heading[];
  ctas: CallToAction[];
  lists: ListData[];
  metadata: PageMetadata;
  structuredData: any[];
  accessibility: AccessibilityData;
}

interface ContentSection {
  id: string;
  type: string;
  heading?: string;
  content: TextBlock[];
  order: number;
}

interface Heading {
  level: number;
  text: string;
  id?: string;
  slug: string;
}

interface ListData {
  type: 'ordered' | 'unordered';
  items: string[];
  context: string;
}

interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  author?: string;
  ogTags: Record<string, string>;
  twitterCard?: Record<string, string>;
}

interface AccessibilityData {
  ariaLabels: Array<{ element: string; label: string }>;
  altTexts: Array<{ src: string; alt: string }>;
  landmarks: string[];
  headingStructure: number[];
}

class ContentExtractor {
  private outputDir: string;

  constructor(outputDir: string) {
    this.outputDir = outputDir;
  }

  async extractFromCrawlData(crawlDataPath: string): Promise<void> {
    console.log(chalk.blue.bold('\n📝 Starting content extraction...\n'));

    const siteStructure = await fs.readJSON(
      path.join(crawlDataPath, 'site-structure.json')
    );

    const contentInventory: ContentInventory[] = [];

    for (const page of siteStructure.pages) {
      const spinner = ora(`Extracting: ${page.url}`).start();
      
      try {
        const inventory = await this.extractPageContent(page);
        contentInventory.push(inventory);
        spinner.succeed(`Extracted: ${page.url}`);
      } catch (error) {
        spinner.fail(`Failed: ${page.url}`);
      }
    }

    // Save content inventory
    await fs.ensureDir(this.outputDir);
    await fs.writeJSON(
      path.join(this.outputDir, 'content-inventory.json'),
      contentInventory,
      { spaces: 2 }
    );

    // Generate content library
    await this.generateContentLibrary(contentInventory);

    console.log(chalk.green.bold('\n✅ Content extraction complete!\n'));
  }

  private async extractPageContent(page: any): Promise<ContentInventory> {
    // Load page HTML from screenshot directory
    // For now, we'll work with the metadata we have
    
    const textBlocks = this.extractTextBlocks(page);
    const headings = this.extractHeadings(page);
    const ctas = this.extractCTAs(page);
    const sections = this.identifySections(textBlocks, headings);
    const accessibility = this.extractAccessibility(page);

    return {
      pageUrl: page.url,
      pageTitle: page.title,
      sections,
      textBlocks,
      headings,
      ctas,
      lists: [],
      metadata: {
        title: page.title,
        description: page.description,
        keywords: this.extractKeywords(page),
        ogTags: page.ogTags,
      },
      structuredData: page.structuredData,
      accessibility,
    };
  }

  private extractTextBlocks(page: any): TextBlock[] {
    const blocks: TextBlock[] = [];
    
    // Extract from headings
    ['h1', 'h2', 'h3'].forEach((tag, index) => {
      page[tag]?.forEach((text: string, pos: number) => {
        blocks.push({
          id: `${tag}-${pos}`,
          type: 'heading',
          content: text,
          html: `<${tag}>${text}</${tag}>`,
          tag,
          level: parseInt(tag[1]),
          attributes: {},
          position: blocks.length,
        });
      });
    });

    return blocks;
  }

  private extractHeadings(page: any): Heading[] {
    const headings: Heading[] = [];

    ['h1', 'h2', 'h3'].forEach(tag => {
      const level = parseInt(tag[1]);
      page[tag]?.forEach((text: string) => {
        headings.push({
          level,
          text,
          slug: this.slugify(text),
        });
      });
    });

    return headings;
  }

  private extractCTAs(page: any): CallToAction[] {
    const ctas: CallToAction[] = [];

    // Common CTA patterns
    const ctaPatterns = [
      /schedule|book|contact|get started|sign up|learn more|call now/i,
    ];

    page.links?.forEach((link: any) => {
      const text = link.text.trim();
      if (ctaPatterns.some(pattern => pattern.test(text))) {
        ctas.push({
          text,
          href: link.href,
          type: 'link',
          context: '',
          priority: this.determineCTAPriority(text),
        });
      }
    });

    return ctas;
  }

  private identifySections(
    textBlocks: TextBlock[],
    headings: Heading[]
  ): ContentSection[] {
    const sections: ContentSection[] = [];
    let currentSection: ContentSection | null = null;

    textBlocks.forEach((block, index) => {
      if (block.type === 'heading' && block.level === 2) {
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = {
          id: `section-${sections.length}`,
          type: 'content-section',
          heading: block.content,
          content: [],
          order: sections.length,
        };
      } else if (currentSection) {
        currentSection.content.push(block);
      }
    });

    if (currentSection) {
      sections.push(currentSection);
    }

    return sections;
  }

  private extractAccessibility(page: any): AccessibilityData {
    const ariaLabels: Array<{ element: string; label: string }> = [];
    const altTexts = page.images?.map((img: any) => ({
      src: img.src,
      alt: img.alt || '',
    })) || [];

    const headingStructure = ['h1', 'h2', 'h3']
      .map(tag => page[tag]?.length || 0);

    return {
      ariaLabels,
      altTexts,
      landmarks: [],
      headingStructure,
    };
  }

  private extractKeywords(page: any): string[] {
    const text = [
      page.title,
      page.description,
      ...(page.h1 || []),
      ...(page.h2 || []),
    ].join(' ');

    // Simple keyword extraction
    const words = text
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 4);

    const frequency = new Map<string, number>();
    words.forEach(word => {
      frequency.set(word, (frequency.get(word) || 0) + 1);
    });

    return Array.from(frequency.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word]) => word);
  }

  private determineCTAPriority(text: string): 'primary' | 'secondary' | 'tertiary' {
    const primaryPatterns = /schedule|book now|get started|contact us|sign up/i;
    const secondaryPatterns = /learn more|view services|see gallery/i;

    if (primaryPatterns.test(text)) return 'primary';
    if (secondaryPatterns.test(text)) return 'secondary';
    return 'tertiary';
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
  }

  private async generateContentLibrary(inventory: ContentInventory[]): Promise<void> {
    const spinner = ora('Generating content library...').start();

    // Aggregate all content
    const library = {
      allHeadings: inventory.flatMap(page => page.headings),
      allCTAs: inventory.flatMap(page => page.ctas),
      allSections: inventory.flatMap(page => page.sections),
      contentPatterns: this.identifyContentPatterns(inventory),
      reusableBlocks: this.identifyReusableBlocks(inventory),
    };

    await fs.writeJSON(
      path.join(this.outputDir, 'content-library.json'),
      library,
      { spaces: 2 }
    );

    // Generate Markdown documentation
    const markdown = this.generateContentDocumentation(library);
    await fs.writeFile(
      path.join(this.outputDir, 'CONTENT_GUIDE.md'),
      markdown
    );

    spinner.succeed('Content library generated');
  }

  private identifyContentPatterns(inventory: ContentInventory[]): any {
    return {
      commonHeadings: this.findCommonElements(
        inventory.flatMap(page => page.headings.map(h => h.text))
      ),
      commonCTAs: this.findCommonElements(
        inventory.flatMap(page => page.ctas.map(c => c.text))
      ),
    };
  }

  private identifyReusableBlocks(inventory: ContentInventory[]): any[] {
    // Identify content that appears on multiple pages
    const blockFrequency = new Map<string, number>();

    inventory.forEach(page => {
      page.textBlocks.forEach(block => {
        const key = block.content.substring(0, 100); // First 100 chars as key
        blockFrequency.set(key, (blockFrequency.get(key) || 0) + 1);
      });
    });

    return Array.from(blockFrequency.entries())
      .filter(([_, count]) => count > 1)
      .map(([content, count]) => ({ content, occurrences: count }));
  }

  private findCommonElements(items: string[]): Array<{ text: string; count: number }> {
    const frequency = new Map<string, number>();
    items.forEach(item => {
      frequency.set(item, (frequency.get(item) || 0) + 1);
    });

    return Array.from(frequency.entries())
      .map(([text, count]) => ({ text, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  private generateContentDocumentation(library: any): string {
    return `# Content Library Documentation

## Content Patterns

### Common Headings
${library.contentPatterns.commonHeadings.map((h: any) => `- "${h.text}" (appears ${h.count} times)`).join('\n')}

### Common CTAs
${library.contentPatterns.commonCTAs.map((c: any) => `- "${c.text}" (appears ${c.count} times)`).join('\n')}

## Reusable Content Blocks

Found ${library.reusableBlocks.length} content blocks that appear on multiple pages.

## Content Sections

Total sections identified: ${library.allSections.length}

## Implementation Guide

### Using CTAs in Components

\`\`\`tsx
import { Button } from '@/components/ui/button';

<Button variant="primary">{cta.text}</Button>
\`\`\`

### Implementing Headings

\`\`\`tsx
<h2 className="text-4xl font-display">{heading.text}</h2>
\`\`\`
`;
  }
}

// Main execution
async function main() {
  const extractor = new ContentExtractor(
    '/home/claude/haywood-universal-v2/output/content-data'
  );

  try {
    await extractor.extractFromCrawlData(
      '/home/claude/haywood-universal-v2/output/crawl-data'
    );
  } catch (error) {
    console.error(chalk.red('❌ Content extraction failed:'), error);
  }
}

export { ContentExtractor };

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

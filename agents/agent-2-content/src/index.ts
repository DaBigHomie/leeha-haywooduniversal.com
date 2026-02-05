/**
 * Agent 2: Content Extraction Specialist
 * Extract and structure all textual content with semantic meaning
 */

import * as cheerio from 'cheerio';
import fs from 'fs-extra';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  metadata: PageContentMetadata;
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

interface PageContentMetadata {
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
  private crawlDataDir: string;

  constructor(outputDir: string, crawlDataDir: string) {
    this.outputDir = outputDir;
    this.crawlDataDir = crawlDataDir;
  }

  async extract(): Promise<void> {
    console.log('\n📝 Starting content extraction...\n');

    // Read site structure from Agent 1
    const siteStructurePath = path.join(this.crawlDataDir, 'site-structure.json');
    
    if (!await fs.pathExists(siteStructurePath)) {
      throw new Error(`Site structure not found at ${siteStructurePath}. Run Agent 1 first.`);
    }

    const fileContent = await fs.readFile(siteStructurePath, 'utf-8');
    const siteStructure = JSON.parse(fileContent);
    const contentInventory: ContentInventory[] = [];

    // Process each page
    for (const page of siteStructure.pages) {
      console.log(`📄 Extracting content from: ${page.url}`);
      
      try {
        // Try to load saved HTML
        const urlSlug = this.getUrlSlug(page.url, siteStructure.baseUrl);
        const htmlPath = path.join(this.crawlDataDir, 'html', `${urlSlug}.html`);
        
        let htmlContent = '';
        if (await fs.pathExists(htmlPath)) {
          htmlContent = await fs.readFile(htmlPath, 'utf-8');
        }
        
        const inventory = await this.extractPageContent(page, htmlContent);
        contentInventory.push(inventory);
        console.log(`   ✅ Extracted: ${inventory.headings.length} headings, ${inventory.ctas.length} CTAs`);
      } catch (error) {
        console.log(`   ❌ Failed: ${error}`);
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

    console.log('\n✅ Content extraction complete!\n');
    console.log(`📁 Output saved to: ${this.outputDir}`);
  }

  private getUrlSlug(url: string, baseUrl: string): string {
    return url
      .replace(baseUrl, '')
      .replace(/^\/|\/$/g, '')
      .replace(/\//g, '-')
      || 'home';
  }

  private async extractPageContent(page: any, htmlContent: string): Promise<ContentInventory> {
    const $ = htmlContent ? cheerio.load(htmlContent) : null;
    
    const textBlocks = this.extractTextBlocks(page, $);
    const headings = this.extractHeadings(page);
    const ctas = this.extractCTAs(page);
    const lists = $ ? this.extractLists($) : [];
    const sections = this.identifySections(textBlocks, headings);
    const accessibility = this.extractAccessibility(page, $);

    return {
      pageUrl: page.url,
      pageTitle: page.title,
      sections,
      textBlocks,
      headings,
      ctas,
      lists,
      metadata: {
        title: page.title,
        description: page.description,
        keywords: this.extractKeywords(page),
        ogTags: page.ogTags || {},
      },
      structuredData: page.structuredData || [],
      accessibility,
    };
  }

  private extractTextBlocks(page: any, $: cheerio.CheerioAPI | null): TextBlock[] {
    const blocks: TextBlock[] = [];
    
    // Extract from headings
    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach((tag) => {
      const headings = page[tag] || [];
      headings.forEach((text: string, pos: number) => {
        if (text.trim()) {
          blocks.push({
            id: `${tag}-${pos}`,
            type: 'heading',
            content: text.trim(),
            html: `<${tag}>${text}</${tag}>`,
            tag,
            level: parseInt(tag[1]),
            attributes: {},
            position: blocks.length,
          });
        }
      });
    });

    // Extract paragraphs from HTML if available
    if ($) {
      $('p').each((pos, el) => {
        const text = $(el).text().trim();
        if (text && text.length > 20) { // Skip very short paragraphs
          blocks.push({
            id: `p-${pos}`,
            type: 'paragraph',
            content: text,
            html: $.html(el) || '',
            tag: 'p',
            attributes: {},
            position: blocks.length,
          });
        }
      });

      // Extract blockquotes
      $('blockquote').each((pos, el) => {
        const text = $(el).text().trim();
        if (text) {
          blocks.push({
            id: `blockquote-${pos}`,
            type: 'blockquote',
            content: text,
            html: $.html(el) || '',
            tag: 'blockquote',
            attributes: {},
            position: blocks.length,
          });
        }
      });
    }

    return blocks;
  }

  private extractHeadings(page: any): Heading[] {
    const headings: Heading[] = [];

    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(tag => {
      const level = parseInt(tag[1]);
      const pageHeadings = page[tag] || [];
      pageHeadings.forEach((text: string) => {
        if (text.trim()) {
          headings.push({
            level,
            text: text.trim(),
            slug: this.slugify(text),
          });
        }
      });
    });

    return headings;
  }

  private extractCTAs(page: any): CallToAction[] {
    const ctas: CallToAction[] = [];

    // Common CTA patterns
    const ctaPatterns = [
      /schedule|book|contact|get started|sign up|learn more|call now|get quote/i,
      /request|apply|subscribe|download|start|try|join|view/i,
    ];

    const links = page.links || [];
    links.forEach((link: any) => {
      const text = (link.text || '').trim();
      if (text && ctaPatterns.some(pattern => pattern.test(text))) {
        ctas.push({
          text,
          href: link.href,
          type: 'link',
          context: '',
          priority: this.determineCTAPriority(text),
        });
      }
    });

    // Deduplicate by text
    const unique = new Map<string, CallToAction>();
    ctas.forEach(cta => {
      if (!unique.has(cta.text.toLowerCase())) {
        unique.set(cta.text.toLowerCase(), cta);
      }
    });

    return Array.from(unique.values());
  }

  private extractLists($: cheerio.CheerioAPI): ListData[] {
    const lists: ListData[] = [];

    $('ul, ol').each((_, el) => {
      const $el = $(el);
      const items = $el.find('> li').map((_, li) => $(li).text().trim()).get();
      
      if (items.length > 0) {
        lists.push({
          type: el.tagName === 'ol' ? 'ordered' : 'unordered',
          items,
          context: $el.prev('h2, h3, h4, p').text().trim() || '',
        });
      }
    });

    return lists;
  }

  private identifySections(
    textBlocks: TextBlock[],
    headings: Heading[]
  ): ContentSection[] {
    const sections: ContentSection[] = [];
    let currentSection: ContentSection | null = null;

    textBlocks.forEach((block) => {
      if (block.type === 'heading' && block.level && block.level <= 2) {
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

  private extractAccessibility(page: any, $: cheerio.CheerioAPI | null): AccessibilityData {
    const ariaLabels: Array<{ element: string; label: string }> = [];
    
    if ($) {
      $('[aria-label]').each((_, el) => {
        ariaLabels.push({
          element: el.tagName,
          label: $(el).attr('aria-label') || '',
        });
      });
    }

    const altTexts = (page.images || []).map((img: any) => ({
      src: img.src,
      alt: img.alt || '',
    }));

    const headingStructure = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
      .map(tag => (page[tag] || []).length);

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
    ].filter(Boolean).join(' ');

    // Simple keyword extraction
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 4);

    const frequency = new Map<string, number>();
    words.forEach(word => {
      frequency.set(word, (frequency.get(word) || 0) + 1);
    });

    return Array.from(frequency.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([word]) => word);
  }

  private determineCTAPriority(text: string): 'primary' | 'secondary' | 'tertiary' {
    const primaryPatterns = /schedule|book now|get started|contact us|sign up|get quote/i;
    const secondaryPatterns = /learn more|view services|see gallery|read more/i;

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
    console.log('📚 Generating content library...');

    // Aggregate all content
    const library = {
      generatedAt: new Date().toISOString(),
      summary: {
        totalPages: inventory.length,
        totalHeadings: inventory.reduce((sum, p) => sum + p.headings.length, 0),
        totalCTAs: inventory.reduce((sum, p) => sum + p.ctas.length, 0),
        totalSections: inventory.reduce((sum, p) => sum + p.sections.length, 0),
      },
      allHeadings: inventory.flatMap(page => 
        page.headings.map(h => ({ ...h, pageUrl: page.pageUrl }))
      ),
      allCTAs: inventory.flatMap(page => 
        page.ctas.map(c => ({ ...c, pageUrl: page.pageUrl }))
      ),
      allSections: inventory.flatMap(page => 
        page.sections.map(s => ({ ...s, pageUrl: page.pageUrl }))
      ),
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

    console.log('✅ Content library generated');
  }

  private identifyContentPatterns(inventory: ContentInventory[]): any {
    return {
      commonHeadings: this.findCommonElements(
        inventory.flatMap(page => page.headings.map(h => h.text))
      ),
      commonCTAs: this.findCommonElements(
        inventory.flatMap(page => page.ctas.map(c => c.text))
      ),
      ctasByPriority: {
        primary: inventory.flatMap(p => p.ctas.filter(c => c.priority === 'primary')),
        secondary: inventory.flatMap(p => p.ctas.filter(c => c.priority === 'secondary')),
        tertiary: inventory.flatMap(p => p.ctas.filter(c => c.priority === 'tertiary')),
      },
    };
  }

  private identifyReusableBlocks(inventory: ContentInventory[]): any[] {
    const blockFrequency = new Map<string, number>();

    inventory.forEach(page => {
      page.textBlocks.forEach(block => {
        const key = block.content.substring(0, 100);
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
      const normalized = item.toLowerCase().trim();
      if (normalized) {
        frequency.set(normalized, (frequency.get(normalized) || 0) + 1);
      }
    });

    return Array.from(frequency.entries())
      .map(([text, count]) => ({ text, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);
  }

  private generateContentDocumentation(library: any): string {
    return `# Content Library Documentation

**Generated At**: ${library.generatedAt}

## Summary

- **Total Pages Analyzed**: ${library.summary.totalPages}
- **Total Headings**: ${library.summary.totalHeadings}
- **Total CTAs**: ${library.summary.totalCTAs}
- **Total Sections**: ${library.summary.totalSections}

## Content Patterns

### Common Headings
${library.contentPatterns.commonHeadings.map((h: any) => `- "${h.text}" (appears ${h.count} times)`).join('\n') || 'None found'}

### Common CTAs
${library.contentPatterns.commonCTAs.map((c: any) => `- "${c.text}" (appears ${c.count} times)`).join('\n') || 'None found'}

### CTAs by Priority

#### Primary CTAs (High Conversion)
${library.contentPatterns.ctasByPriority.primary.map((c: any) => `- "${c.text}" → ${c.href}`).join('\n') || 'None found'}

#### Secondary CTAs
${library.contentPatterns.ctasByPriority.secondary.map((c: any) => `- "${c.text}" → ${c.href}`).join('\n') || 'None found'}

## Reusable Content Blocks

Found **${library.reusableBlocks.length}** content blocks that appear on multiple pages.

${library.reusableBlocks.slice(0, 5).map((b: any) => `- "${b.content.substring(0, 50)}..." (${b.occurrences} occurrences)`).join('\n')}

## All Headings by Page

${library.allHeadings.slice(0, 30).map((h: any) => `- **H${h.level}**: ${h.text}`).join('\n')}

## Implementation Guide

### Using CTAs in React Components

\`\`\`tsx
import { Button } from '@/components/ui/button';

// Primary CTA
<Button variant="default" size="lg">
  {cta.text}
</Button>

// Secondary CTA
<Button variant="outline">
  {cta.text}
</Button>
\`\`\`

### Implementing Headings

\`\`\`tsx
// Section heading
<h2 className="text-4xl font-display font-bold">
  {heading.text}
</h2>

// Subsection heading
<h3 className="text-2xl font-semibold">
  {heading.text}
</h3>
\`\`\`

---

*Generated by Agent 2: Content Extraction Specialist*
`;
  }
}

// Main execution
async function main() {
  const projectRoot = path.resolve(__dirname, '../../..');
  const outputDir = path.join(projectRoot, 'output', 'content-data');
  const crawlDataDir = path.join(projectRoot, 'output', 'crawl-data');
  
  const extractor = new ContentExtractor(outputDir, crawlDataDir);

  try {
    await extractor.extract();
  } catch (error) {
    console.error('❌ Content extraction failed:', error);
    process.exit(1);
  }
}

export { ContentExtractor };

main();

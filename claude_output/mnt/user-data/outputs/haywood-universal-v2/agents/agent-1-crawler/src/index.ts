/**
 * Agent 1: Site Crawler & Structure Mapper
 * Comprehensive web scraping for haywooduniversal.com
 */

import { chromium, Page, Browser } from 'playwright';
import * as cheerio from 'cheerio';
import axios from 'axios';
import * as fs from 'fs-extra';
import * as path from 'path';
import { parseStringPromise } from 'xml2js';
import PQueue from 'p-queue';
import chalk from 'chalk';
import ora from 'ora';

interface PageMetadata {
  url: string;
  title: string;
  description: string;
  canonicalUrl: string;
  ogTags: Record<string, string>;
  structuredData: any[];
  h1: string[];
  h2: string[];
  h3: string[];
  images: ImageData[];
  links: LinkData[];
  forms: FormData[];
  scripts: ScriptData[];
  styles: StyleData[];
}

interface ImageData {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: string;
  srcset?: string;
}

interface LinkData {
  href: string;
  text: string;
  rel?: string;
  isInternal: boolean;
}

interface FormData {
  action: string;
  method: string;
  inputs: Array<{
    type: string;
    name: string;
    placeholder?: string;
    required: boolean;
  }>;
}

interface ScriptData {
  src?: string;
  content?: string;
  async: boolean;
  defer: boolean;
  type?: string;
}

interface StyleData {
  href?: string;
  content?: string;
  media?: string;
}

interface SiteStructure {
  baseUrl: string;
  pages: Map<string, PageMetadata>;
  assets: {
    images: Set<string>;
    fonts: Set<string>;
    videos: Set<string>;
    documents: Set<string>;
  };
  navigation: NavigationStructure;
  sitemap: string[];
}

interface NavigationStructure {
  header: NavItem[];
  footer: NavItem[];
  mobile?: NavItem[];
}

interface NavItem {
  text: string;
  href: string;
  children?: NavItem[];
}

class SiteCrawler {
  private baseUrl: string;
  private browser!: Browser;
  private outputDir: string;
  private visitedUrls: Set<string> = new Set();
  private queue: PQueue;
  private structure: SiteStructure;

  constructor(baseUrl: string, outputDir: string) {
    this.baseUrl = baseUrl;
    this.outputDir = outputDir;
    this.queue = new PQueue({ concurrency: 3 });
    this.structure = {
      baseUrl,
      pages: new Map(),
      assets: {
        images: new Set(),
        fonts: new Set(),
        videos: new Set(),
        documents: new Set(),
      },
      navigation: { header: [], footer: [] },
      sitemap: [],
    };
  }

  async initialize(): Promise<void> {
    const spinner = ora('Launching browser...').start();
    this.browser = await chromium.launch({ headless: true });
    await fs.ensureDir(this.outputDir);
    await fs.ensureDir(path.join(this.outputDir, 'screenshots'));
    await fs.ensureDir(path.join(this.outputDir, 'assets'));
    spinner.succeed('Browser launched');
  }

  async crawl(): Promise<SiteStructure> {
    console.log(chalk.blue.bold('\n🕷️  Starting comprehensive site crawl...\n'));

    // Step 1: Fetch sitemap
    await this.fetchSitemap();

    // Step 2: Crawl all pages
    const pagesToCrawl = this.structure.sitemap.length > 0 
      ? this.structure.sitemap 
      : [this.baseUrl];

    for (const url of pagesToCrawl) {
      await this.queue.add(() => this.crawlPage(url));
    }

    await this.queue.onIdle();

    // Step 3: Extract navigation
    await this.extractNavigation();

    // Step 4: Generate reports
    await this.generateReports();

    console.log(chalk.green.bold('\n✅ Crawl complete!\n'));
    return this.structure;
  }

  private async fetchSitemap(): Promise<void> {
    const spinner = ora('Fetching sitemap...').start();
    
    try {
      const sitemapUrls = [
        `${this.baseUrl}/sitemap.xml`,
        `${this.baseUrl}/sitemap_index.xml`,
        `${this.baseUrl}/sitemap`,
      ];

      for (const sitemapUrl of sitemapUrls) {
        try {
          const response = await axios.get(sitemapUrl, { timeout: 10000 });
          const parsed = await parseStringPromise(response.data);

          if (parsed.urlset?.url) {
            this.structure.sitemap = parsed.urlset.url.map(
              (u: any) => u.loc[0]
            );
            spinner.succeed(`Found ${this.structure.sitemap.length} URLs in sitemap`);
            return;
          }
        } catch (error) {
          // Try next URL
        }
      }

      spinner.warn('No sitemap found, will discover pages through crawling');
    } catch (error) {
      spinner.fail('Sitemap fetch failed');
    }
  }

  private async crawlPage(url: string): Promise<void> {
    if (this.visitedUrls.has(url)) return;
    this.visitedUrls.add(url);

    const spinner = ora(`Crawling: ${url}`).start();

    try {
      const page = await this.browser.newPage();
      
      // Set realistic viewport and user agent
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.setExtraHTTPHeaders({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      });

      // Navigate and wait for network idle
      await page.goto(url, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });

      // Wait for dynamic content
      await page.waitForTimeout(2000);

      // Take screenshot
      const urlSlug = this.getUrlSlug(url);
      await page.screenshot({
        path: path.join(this.outputDir, 'screenshots', `${urlSlug}.png`),
        fullPage: true,
      });

      // Extract page metadata
      const metadata = await this.extractPageMetadata(page, url);
      this.structure.pages.set(url, metadata);

      // Collect assets
      this.collectAssets(metadata);

      // Discover new internal links
      const newLinks = metadata.links
        .filter(link => link.isInternal && !this.visitedUrls.has(link.href))
        .map(link => link.href);

      for (const link of newLinks) {
        await this.queue.add(() => this.crawlPage(link));
      }

      await page.close();
      spinner.succeed(`Crawled: ${url}`);
    } catch (error) {
      spinner.fail(`Failed: ${url} - ${error}`);
    }
  }

  private async extractPageMetadata(page: Page, url: string): Promise<PageMetadata> {
    const content = await page.content();
    const $ = cheerio.load(content);

    // Extract meta tags
    const title = await page.title();
    const description = $('meta[name="description"]').attr('content') || '';
    const canonicalUrl = $('link[rel="canonical"]').attr('href') || url;

    // Extract Open Graph tags
    const ogTags: Record<string, string> = {};
    $('meta[property^="og:"]').each((_, el) => {
      const property = $(el).attr('property')?.replace('og:', '') || '';
      const content = $(el).attr('content') || '';
      ogTags[property] = content;
    });

    // Extract structured data (JSON-LD)
    const structuredData: any[] = [];
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        structuredData.push(JSON.parse($(el).html() || '{}'));
      } catch (error) {
        // Invalid JSON
      }
    });

    // Extract headings
    const h1 = $('h1').map((_, el) => $(el).text().trim()).get();
    const h2 = $('h2').map((_, el) => $(el).text().trim()).get();
    const h3 = $('h3').map((_, el) => $(el).text().trim()).get();

    // Extract images
    const images: ImageData[] = $('img').map((_, el) => ({
      src: this.normalizeUrl($(el).attr('src') || ''),
      alt: $(el).attr('alt') || '',
      width: parseInt($(el).attr('width') || '0'),
      height: parseInt($(el).attr('height') || '0'),
      loading: $(el).attr('loading'),
      srcset: $(el).attr('srcset'),
    })).get();

    // Extract links
    const links: LinkData[] = $('a[href]').map((_, el) => {
      const href = this.normalizeUrl($(el).attr('href') || '');
      return {
        href,
        text: $(el).text().trim(),
        rel: $(el).attr('rel'),
        isInternal: this.isInternalUrl(href),
      };
    }).get();

    // Extract forms
    const forms: FormData[] = $('form').map((_, el) => ({
      action: $(el).attr('action') || '',
      method: $(el).attr('method') || 'get',
      inputs: $(el).find('input, textarea, select').map((_, input) => ({
        type: $(input).attr('type') || 'text',
        name: $(input).attr('name') || '',
        placeholder: $(input).attr('placeholder'),
        required: $(input).attr('required') !== undefined,
      })).get(),
    })).get();

    // Extract scripts
    const scripts: ScriptData[] = $('script').map((_, el) => ({
      src: $(el).attr('src'),
      content: $(el).html()?.substring(0, 200), // First 200 chars
      async: $(el).attr('async') !== undefined,
      defer: $(el).attr('defer') !== undefined,
      type: $(el).attr('type'),
    })).get();

    // Extract styles
    const styles: StyleData[] = $('link[rel="stylesheet"], style').map((_, el) => ({
      href: $(el).attr('href'),
      content: $(el).is('style') ? $(el).html()?.substring(0, 200) : undefined,
      media: $(el).attr('media'),
    })).get();

    return {
      url,
      title,
      description,
      canonicalUrl,
      ogTags,
      structuredData,
      h1,
      h2,
      h3,
      images,
      links,
      forms,
      scripts,
      styles,
    };
  }

  private collectAssets(metadata: PageMetadata): void {
    // Collect images
    metadata.images.forEach(img => {
      if (img.src) this.structure.assets.images.add(img.src);
    });

    // Collect fonts from CSS
    metadata.styles.forEach(style => {
      if (style.content?.includes('@font-face')) {
        const fontUrls = style.content.match(/url\(['"]?([^'"]+)['"]?\)/g);
        fontUrls?.forEach(url => {
          const cleanUrl = url.replace(/url\(['"]?|['"]?\)/g, '');
          this.structure.assets.fonts.add(cleanUrl);
        });
      }
    });

    // Collect videos
    metadata.links.forEach(link => {
      if (link.href.match(/\.(mp4|webm|ogg)$/i)) {
        this.structure.assets.videos.add(link.href);
      }
    });

    // Collect documents
    metadata.links.forEach(link => {
      if (link.href.match(/\.(pdf|doc|docx|xls|xlsx)$/i)) {
        this.structure.assets.documents.add(link.href);
      }
    });
  }

  private async extractNavigation(): Promise<void> {
    const spinner = ora('Extracting navigation structure...').start();

    try {
      // Use homepage to extract navigation
      const homepage = this.structure.pages.get(this.baseUrl);
      if (!homepage) {
        spinner.fail('Homepage not found');
        return;
      }

      const page = await this.browser.newPage();
      await page.goto(this.baseUrl, { waitUntil: 'networkidle' });
      const content = await page.content();
      const $ = cheerio.load(content);

      // Extract header navigation
      const headerNav = $('header nav, nav[role="navigation"]').first();
      this.structure.navigation.header = this.parseNavItems(headerNav, $);

      // Extract footer navigation
      const footerNav = $('footer nav, footer ul').first();
      this.structure.navigation.footer = this.parseNavItems(footerNav, $);

      await page.close();
      spinner.succeed('Navigation extracted');
    } catch (error) {
      spinner.fail(`Navigation extraction failed: ${error}`);
    }
  }

  private parseNavItems(element: cheerio.Cheerio, $: cheerio.CheerioAPI): NavItem[] {
    const items: NavItem[] = [];

    element.find('> ul > li, > li').each((_, li) => {
      const $li = $(li);
      const $link = $li.find('> a').first();
      
      if ($link.length) {
        const item: NavItem = {
          text: $link.text().trim(),
          href: this.normalizeUrl($link.attr('href') || ''),
        };

        // Check for dropdown/children
        const $submenu = $li.find('ul').first();
        if ($submenu.length) {
          item.children = this.parseNavItems($submenu, $);
        }

        items.push(item);
      }
    });

    return items;
  }

  private async generateReports(): Promise<void> {
    const spinner = ora('Generating reports...').start();

    // Generate JSON report
    const report = {
      baseUrl: this.structure.baseUrl,
      crawledAt: new Date().toISOString(),
      summary: {
        totalPages: this.structure.pages.size,
        totalImages: this.structure.assets.images.size,
        totalFonts: this.structure.assets.fonts.size,
        totalVideos: this.structure.assets.videos.size,
        totalDocuments: this.structure.assets.documents.size,
      },
      pages: Array.from(this.structure.pages.entries()).map(([url, data]) => ({
        url,
        ...data,
      })),
      assets: {
        images: Array.from(this.structure.assets.images),
        fonts: Array.from(this.structure.assets.fonts),
        videos: Array.from(this.structure.assets.videos),
        documents: Array.from(this.structure.assets.documents),
      },
      navigation: this.structure.navigation,
    };

    await fs.writeJSON(
      path.join(this.outputDir, 'site-structure.json'),
      report,
      { spaces: 2 }
    );

    // Generate Markdown report
    const markdown = this.generateMarkdownReport(report);
    await fs.writeFile(
      path.join(this.outputDir, 'CRAWL_REPORT.md'),
      markdown
    );

    spinner.succeed('Reports generated');
  }

  private generateMarkdownReport(report: any): string {
    return `# Site Crawl Report

**Base URL**: ${report.baseUrl}  
**Crawled At**: ${report.crawledAt}

## Summary

- **Total Pages**: ${report.summary.totalPages}
- **Total Images**: ${report.summary.totalImages}
- **Total Fonts**: ${report.summary.totalFonts}
- **Total Videos**: ${report.summary.totalVideos}
- **Total Documents**: ${report.summary.totalDocuments}

## Pages Crawled

${report.pages.map((p: any) => `- [${p.title || 'Untitled'}](${p.url})`).join('\n')}

## Navigation Structure

### Header Navigation
${JSON.stringify(report.navigation.header, null, 2)}

### Footer Navigation
${JSON.stringify(report.navigation.footer, null, 2)}

## Assets Inventory

### Images (${report.assets.images.length})
${report.assets.images.slice(0, 20).join('\n')}
${report.assets.images.length > 20 ? `\n... and ${report.assets.images.length - 20} more` : ''}

### Fonts (${report.assets.fonts.length})
${report.assets.fonts.join('\n')}
`;
  }

  private normalizeUrl(url: string): string {
    if (!url) return '';
    
    try {
      if (url.startsWith('//')) {
        return `https:${url}`;
      } else if (url.startsWith('/')) {
        return `${this.baseUrl}${url}`;
      } else if (url.startsWith('http')) {
        return url;
      } else {
        return `${this.baseUrl}/${url}`;
      }
    } catch (error) {
      return url;
    }
  }

  private isInternalUrl(url: string): boolean {
    try {
      const urlObj = new URL(url, this.baseUrl);
      const baseUrlObj = new URL(this.baseUrl);
      return urlObj.hostname === baseUrlObj.hostname;
    } catch (error) {
      return false;
    }
  }

  private getUrlSlug(url: string): string {
    return url
      .replace(this.baseUrl, '')
      .replace(/^\/|\/$/g, '')
      .replace(/\//g, '-')
      || 'home';
  }

  async cleanup(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// Main execution
async function main() {
  const crawler = new SiteCrawler(
    'https://haywooduniversal.com',
    '/home/claude/haywood-universal-v2/output/crawl-data'
  );

  try {
    await crawler.initialize();
    const structure = await crawler.crawl();
    
    console.log(chalk.green('\n📊 Crawl Statistics:'));
    console.log(`   Pages: ${structure.pages.size}`);
    console.log(`   Images: ${structure.assets.images.size}`);
    console.log(`   Fonts: ${structure.assets.fonts.size}`);
    
  } catch (error) {
    console.error(chalk.red('❌ Crawl failed:'), error);
  } finally {
    await crawler.cleanup();
  }
}

export { SiteCrawler };

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

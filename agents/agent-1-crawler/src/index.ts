/**
 * Agent 1: Site Crawler & Structure Mapper
 * Comprehensive web scraping for haywooduniversal.com
 */

import { chromium, Page, Browser } from 'playwright';
import * as cheerio from 'cheerio';
import axios from 'axios';
import fs from 'fs-extra';
import * as path from 'path';
import { parseStringPromise } from 'xml2js';
import PQueue from 'p-queue';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  html?: string;
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
  private knownPages: string[];

  constructor(baseUrl: string, outputDir: string, knownPages: string[] = []) {
    this.baseUrl = baseUrl;
    this.outputDir = outputDir;
    this.knownPages = knownPages;
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
    console.log('🚀 Launching browser...');
    this.browser = await chromium.launch({ headless: true });
    await fs.ensureDir(this.outputDir);
    await fs.ensureDir(path.join(this.outputDir, 'screenshots'));
    await fs.ensureDir(path.join(this.outputDir, 'html'));
    console.log('✅ Browser launched');
  }

  async crawl(): Promise<SiteStructure> {
    console.log('\n🕷️  Starting comprehensive site crawl...\n');

    // Step 1: Use known pages or fetch sitemap
    if (this.knownPages.length > 0) {
      console.log(`📋 Using ${this.knownPages.length} known pages`);
      this.structure.sitemap = this.knownPages;
    } else {
      await this.fetchSitemap();
    }

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

    console.log('\n✅ Crawl complete!\n');
    return this.structure;
  }

  private async fetchSitemap(): Promise<void> {
    console.log('📋 Fetching sitemap...');
    
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
            console.log(`✅ Found ${this.structure.sitemap.length} URLs in sitemap`);
            return;
          }
        } catch {
          // Try next URL
        }
      }

      console.log('⚠️  No sitemap found, will discover pages through crawling');
      this.structure.sitemap = [this.baseUrl];
    } catch (error) {
      console.log('❌ Sitemap fetch failed');
      this.structure.sitemap = [this.baseUrl];
    }
  }

  private async crawlPage(url: string): Promise<void> {
    if (this.visitedUrls.has(url)) return;
    this.visitedUrls.add(url);

    console.log(`🔍 Crawling: ${url}`);

    try {
      const page = await this.browser.newPage();
      
      // Set realistic viewport and user agent
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.setExtraHTTPHeaders({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      });

      // Navigate with shorter timeout
      await page.goto(url, { 
        waitUntil: 'domcontentloaded',
        timeout: 15000 
      });

      // Brief wait for dynamic content
      await page.waitForTimeout(1000);

      // Take screenshot
      const urlSlug = this.getUrlSlug(url);
      await page.screenshot({
        path: path.join(this.outputDir, 'screenshots', `${urlSlug}.png`),
        fullPage: true,
      });

      // Save HTML
      const html = await page.content();
      await fs.writeFile(
        path.join(this.outputDir, 'html', `${urlSlug}.html`),
        html
      );

      // Extract page metadata
      const metadata = await this.extractPageMetadata(page, url, html);
      this.structure.pages.set(url, metadata);

      // Collect assets
      this.collectAssets(metadata);

      // Skip link discovery - only crawl known pages
      // (No automatic link following to prevent unwanted pages)

      await page.close();
      console.log(`✅ Crawled: ${url}`);
    } catch (error) {
      console.log(`❌ Failed: ${url} - ${error}`);
    }
  }

  private async extractPageMetadata(page: Page, url: string, html: string): Promise<PageMetadata> {
    const $ = cheerio.load(html);

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
      } catch {
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
      width: parseInt($(el).attr('width') || '0') || undefined,
      height: parseInt($(el).attr('height') || '0') || undefined,
      loading: $(el).attr('loading'),
      srcset: $(el).attr('srcset'),
    })).get().filter(img => img.src);

    // Extract links
    const links: LinkData[] = $('a[href]').map((_, el) => {
      const href = this.normalizeUrl($(el).attr('href') || '');
      return {
        href,
        text: $(el).text().trim(),
        rel: $(el).attr('rel'),
        isInternal: this.isInternalUrl(href),
      };
    }).get().filter(link => link.href);

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
      content: $(el).html()?.substring(0, 200),
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

    // Collect fonts from stylesheet links
    metadata.styles.forEach(style => {
      if (style.href?.includes('font')) {
        this.structure.assets.fonts.add(style.href);
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
    console.log('📍 Extracting navigation structure...');

    try {
      const homepage = this.structure.pages.get(this.baseUrl);
      if (!homepage) {
        console.log('⚠️  Homepage not found');
        return;
      }

      const page = await this.browser.newPage();
      await page.goto(this.baseUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
      const content = await page.content();
      const $ = cheerio.load(content);

      // Extract header navigation
      const headerNav = $('header nav, nav[role="navigation"], .nav, .navbar').first();
      this.structure.navigation.header = this.parseNavItems(headerNav, $);

      // Extract footer navigation
      const footerNav = $('footer nav, footer ul, .footer-nav').first();
      this.structure.navigation.footer = this.parseNavItems(footerNav, $);

      await page.close();
      console.log('✅ Navigation extracted');
    } catch (error) {
      console.log(`❌ Navigation extraction failed: ${error}`);
    }
  }

  private parseNavItems(element: cheerio.Cheerio<cheerio.Element>, $: cheerio.CheerioAPI): NavItem[] {
    const items: NavItem[] = [];

    element.find('a').each((_, el) => {
      const $link = $(el);
      const href = this.normalizeUrl($link.attr('href') || '');
      const text = $link.text().trim();
      
      if (text && href) {
        items.push({ text, href });
      }
    });

    return items;
  }

  private async generateReports(): Promise<void> {
    console.log('📊 Generating reports...');

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

    console.log('✅ Reports generated');
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
\`\`\`json
${JSON.stringify(report.navigation.header, null, 2)}
\`\`\`

### Footer Navigation
\`\`\`json
${JSON.stringify(report.navigation.footer, null, 2)}
\`\`\`

## Assets Inventory

### Images (${report.assets.images.length})
${report.assets.images.slice(0, 20).map((img: string) => `- ${img}`).join('\n')}
${report.assets.images.length > 20 ? `\n... and ${report.assets.images.length - 20} more` : ''}

### Fonts (${report.assets.fonts.length})
${report.assets.fonts.map((font: string) => `- ${font}`).join('\n')}

### Documents (${report.assets.documents.length})
${report.assets.documents.map((doc: string) => `- ${doc}`).join('\n')}
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
      } else if (url.startsWith('mailto:') || url.startsWith('tel:')) {
        return url;
      } else {
        return `${this.baseUrl}/${url}`;
      }
    } catch {
      return url;
    }
  }

  private isInternalUrl(url: string): boolean {
    try {
      if (!url.startsWith('http')) return true;
      const urlObj = new URL(url, this.baseUrl);
      const baseUrlObj = new URL(this.baseUrl);
      return urlObj.hostname === baseUrlObj.hostname;
    } catch {
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

// Main public pages (account pages excluded)
const KNOWN_PAGES = [
  'https://haywooduniversal.com/',
  'https://haywooduniversal.com/project-management',
  'https://haywooduniversal.com/gallery',
  'https://haywooduniversal.com/services',
  'https://haywooduniversal.com/rooms-for-rent',
];

// Main execution
async function main() {
  const projectRoot = path.resolve(__dirname, '../../..');
  const outputDir = path.join(projectRoot, 'output', 'crawl-data');
  
  const crawler = new SiteCrawler(
    'https://haywooduniversal.com',
    outputDir,
    KNOWN_PAGES
  );

  try {
    await crawler.initialize();
    const structure = await crawler.crawl();
    
    console.log('\n📊 Crawl Statistics:');
    console.log(`   Pages: ${structure.pages.size}`);
    console.log(`   Images: ${structure.assets.images.size}`);
    console.log(`   Fonts: ${structure.assets.fonts.size}`);
    console.log(`\n📁 Output saved to: ${outputDir}`);
    
  } catch (error) {
    console.error('❌ Crawl failed:', error);
    process.exit(1);
  } finally {
    await crawler.cleanup();
  }
}

export { SiteCrawler };

main();

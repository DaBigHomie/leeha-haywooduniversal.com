/**
 * Agent 3: Asset Manager & Optimizer
 * Download and optimize all images, fonts, and media assets
 */

import axios from 'axios';
import fs from 'fs-extra';
import * as path from 'path';
import sharp from 'sharp';
import PQueue from 'p-queue';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface AssetManifest {
  generatedAt: string;
  baseUrl: string;
  summary: {
    totalImages: number;
    totalDownloaded: number;
    totalFailed: number;
    totalOptimized: number;
    originalSizeBytes: number;
    optimizedSizeBytes: number;
    savingsPercent: number;
  };
  images: ImageAsset[];
  fonts: FontAsset[];
  videos: VideoAsset[];
  documents: DocumentAsset[];
}

interface ImageAsset {
  originalUrl: string;
  localPath: string;
  optimizedPath?: string;
  filename: string;
  alt: string;
  width?: number;
  height?: number;
  originalSize: number;
  optimizedSize?: number;
  format: string;
  status: 'downloaded' | 'optimized' | 'failed';
  variants?: ImageVariant[];
}

interface ImageVariant {
  size: string;
  width: number;
  path: string;
  format: string;
}

interface FontAsset {
  originalUrl: string;
  localPath: string;
  filename: string;
  format: string;
  status: 'downloaded' | 'failed';
}

interface VideoAsset {
  originalUrl: string;
  localPath: string;
  filename: string;
  status: 'downloaded' | 'failed';
}

interface DocumentAsset {
  originalUrl: string;
  localPath: string;
  filename: string;
  type: string;
  status: 'downloaded' | 'failed';
}

class AssetManager {
  private outputDir: string;
  private crawlDataDir: string;
  private queue: PQueue;
  private manifest: AssetManifest;

  constructor(outputDir: string, crawlDataDir: string) {
    this.outputDir = outputDir;
    this.crawlDataDir = crawlDataDir;
    this.queue = new PQueue({ concurrency: 5 });
    this.manifest = {
      generatedAt: new Date().toISOString(),
      baseUrl: '',
      summary: {
        totalImages: 0,
        totalDownloaded: 0,
        totalFailed: 0,
        totalOptimized: 0,
        originalSizeBytes: 0,
        optimizedSizeBytes: 0,
        savingsPercent: 0,
      },
      images: [],
      fonts: [],
      videos: [],
      documents: [],
    };
  }

  async process(): Promise<void> {
    console.log('\n📦 Starting asset processing...\n');

    // Read site structure from Agent 1
    const siteStructurePath = path.join(this.crawlDataDir, 'site-structure.json');
    
    if (!await fs.pathExists(siteStructurePath)) {
      throw new Error(`Site structure not found at ${siteStructurePath}. Run Agent 1 first.`);
    }

    const fileContent = await fs.readFile(siteStructurePath, 'utf-8');
    const siteStructure = JSON.parse(fileContent);
    this.manifest.baseUrl = siteStructure.baseUrl;

    // Ensure output directories
    await fs.ensureDir(path.join(this.outputDir, 'images', 'original'));
    await fs.ensureDir(path.join(this.outputDir, 'images', 'optimized'));
    await fs.ensureDir(path.join(this.outputDir, 'images', 'responsive'));
    await fs.ensureDir(path.join(this.outputDir, 'fonts'));
    await fs.ensureDir(path.join(this.outputDir, 'videos'));
    await fs.ensureDir(path.join(this.outputDir, 'documents'));

    // Process images
    const images = siteStructure.assets?.images || [];
    this.manifest.summary.totalImages = images.length;
    console.log(`🖼️  Processing ${images.length} images...`);

    for (const imageUrl of images) {
      await this.queue.add(() => this.processImage(imageUrl, siteStructure));
    }

    // Process fonts
    const fonts = siteStructure.assets?.fonts || [];
    console.log(`🔤 Processing ${fonts.length} fonts...`);
    
    for (const fontUrl of fonts) {
      await this.queue.add(() => this.downloadFont(fontUrl));
    }

    // Process videos
    const videos = siteStructure.assets?.videos || [];
    console.log(`🎬 Processing ${videos.length} videos...`);
    
    for (const videoUrl of videos) {
      await this.queue.add(() => this.downloadVideo(videoUrl));
    }

    // Process documents
    const documents = siteStructure.assets?.documents || [];
    console.log(`📄 Processing ${documents.length} documents...`);
    
    for (const docUrl of documents) {
      await this.queue.add(() => this.downloadDocument(docUrl));
    }

    await this.queue.onIdle();

    // Calculate savings
    if (this.manifest.summary.originalSizeBytes > 0) {
      this.manifest.summary.savingsPercent = Math.round(
        ((this.manifest.summary.originalSizeBytes - this.manifest.summary.optimizedSizeBytes) /
          this.manifest.summary.originalSizeBytes) * 100
      );
    }

    // Save manifest
    await this.saveManifest();

    console.log('\n✅ Asset processing complete!\n');
    this.printSummary();
  }

  private async processImage(imageUrl: string, siteStructure: any): Promise<void> {
    const filename = this.getFilenameFromUrl(imageUrl);
    
    if (!filename || !this.isValidImageUrl(imageUrl)) {
      return;
    }

    const originalPath = path.join(this.outputDir, 'images', 'original', filename);
    
    try {
      console.log(`   📥 Downloading: ${filename}`);
      
      // Download image
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
        timeout: 30000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });

      await fs.writeFile(originalPath, response.data);
      const originalSize = response.data.length;
      this.manifest.summary.originalSizeBytes += originalSize;
      this.manifest.summary.totalDownloaded++;

      // Find alt text from site structure
      let altText = '';
      for (const page of siteStructure.pages || []) {
        const img = page.images?.find((i: any) => i.src === imageUrl);
        if (img?.alt) {
          altText = img.alt;
          break;
        }
      }

      const imageAsset: ImageAsset = {
        originalUrl: imageUrl,
        localPath: `images/original/${filename}`,
        filename,
        alt: altText,
        originalSize,
        format: path.extname(filename).slice(1).toLowerCase(),
        status: 'downloaded',
      };

      // Optimize image
      try {
        const optimizedResult = await this.optimizeImage(originalPath, filename);
        imageAsset.optimizedPath = optimizedResult.path;
        imageAsset.optimizedSize = optimizedResult.size;
        imageAsset.width = optimizedResult.width;
        imageAsset.height = optimizedResult.height;
        imageAsset.variants = optimizedResult.variants;
        imageAsset.status = 'optimized';
        
        this.manifest.summary.optimizedSizeBytes += optimizedResult.size;
        this.manifest.summary.totalOptimized++;
        
        console.log(`   ✅ Optimized: ${filename} (${this.formatBytes(originalSize)} → ${this.formatBytes(optimizedResult.size)})`);
      } catch (optError) {
        // Keep original if optimization fails
        this.manifest.summary.optimizedSizeBytes += originalSize;
        console.log(`   ⚠️ Optimization failed for ${filename}, keeping original`);
      }

      this.manifest.images.push(imageAsset);
    } catch (error) {
      console.log(`   ❌ Failed: ${filename}`);
      this.manifest.summary.totalFailed++;
      this.manifest.images.push({
        originalUrl: imageUrl,
        localPath: '',
        filename,
        alt: '',
        originalSize: 0,
        format: path.extname(filename).slice(1).toLowerCase(),
        status: 'failed',
      });
    }
  }

  private async optimizeImage(
    inputPath: string, 
    filename: string
  ): Promise<{ path: string; size: number; width: number; height: number; variants: ImageVariant[] }> {
    const baseName = path.basename(filename, path.extname(filename));
    const optimizedPath = path.join(this.outputDir, 'images', 'optimized', `${baseName}.webp`);
    
    // Read image metadata
    const metadata = await sharp(inputPath).metadata();
    const width = metadata.width || 800;
    const height = metadata.height || 600;

    // Optimize to WebP
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(optimizedPath);

    const optimizedStats = await fs.stat(optimizedPath);
    
    // Generate responsive variants
    const variants: ImageVariant[] = [];
    const sizes = [
      { name: 'sm', width: 480 },
      { name: 'md', width: 768 },
      { name: 'lg', width: 1024 },
      { name: 'xl', width: 1920 },
    ];

    for (const size of sizes) {
      if (width >= size.width) {
        const variantPath = path.join(
          this.outputDir, 
          'images', 
          'responsive', 
          `${baseName}-${size.name}.webp`
        );
        
        await sharp(inputPath)
          .resize(size.width)
          .webp({ quality: 80 })
          .toFile(variantPath);

        variants.push({
          size: size.name,
          width: size.width,
          path: `images/responsive/${baseName}-${size.name}.webp`,
          format: 'webp',
        });
      }
    }

    return {
      path: `images/optimized/${baseName}.webp`,
      size: optimizedStats.size,
      width,
      height,
      variants,
    };
  }

  private async downloadFont(fontUrl: string): Promise<void> {
    const filename = this.getFilenameFromUrl(fontUrl);
    if (!filename) return;

    const localPath = path.join(this.outputDir, 'fonts', filename);

    try {
      console.log(`   📥 Downloading font: ${filename}`);
      const response = await axios.get(fontUrl, {
        responseType: 'arraybuffer',
        timeout: 30000,
      });

      await fs.writeFile(localPath, response.data);
      
      this.manifest.fonts.push({
        originalUrl: fontUrl,
        localPath: `fonts/${filename}`,
        filename,
        format: path.extname(filename).slice(1).toLowerCase(),
        status: 'downloaded',
      });
      
      console.log(`   ✅ Downloaded: ${filename}`);
    } catch (error) {
      console.log(`   ❌ Failed: ${filename}`);
      this.manifest.fonts.push({
        originalUrl: fontUrl,
        localPath: '',
        filename,
        format: path.extname(filename).slice(1).toLowerCase(),
        status: 'failed',
      });
    }
  }

  private async downloadVideo(videoUrl: string): Promise<void> {
    const filename = this.getFilenameFromUrl(videoUrl);
    if (!filename) return;

    const localPath = path.join(this.outputDir, 'videos', filename);

    try {
      console.log(`   📥 Downloading video: ${filename}`);
      const response = await axios.get(videoUrl, {
        responseType: 'arraybuffer',
        timeout: 120000, // 2 minute timeout for videos
      });

      await fs.writeFile(localPath, response.data);
      
      this.manifest.videos.push({
        originalUrl: videoUrl,
        localPath: `videos/${filename}`,
        filename,
        status: 'downloaded',
      });
      
      console.log(`   ✅ Downloaded: ${filename}`);
    } catch (error) {
      console.log(`   ❌ Failed: ${filename}`);
      this.manifest.videos.push({
        originalUrl: videoUrl,
        localPath: '',
        filename,
        status: 'failed',
      });
    }
  }

  private async downloadDocument(docUrl: string): Promise<void> {
    const filename = this.getFilenameFromUrl(docUrl);
    if (!filename) return;

    const localPath = path.join(this.outputDir, 'documents', filename);

    try {
      console.log(`   📥 Downloading document: ${filename}`);
      const response = await axios.get(docUrl, {
        responseType: 'arraybuffer',
        timeout: 60000,
      });

      await fs.writeFile(localPath, response.data);
      
      this.manifest.documents.push({
        originalUrl: docUrl,
        localPath: `documents/${filename}`,
        filename,
        type: path.extname(filename).slice(1).toLowerCase(),
        status: 'downloaded',
      });
      
      console.log(`   ✅ Downloaded: ${filename}`);
    } catch (error) {
      console.log(`   ❌ Failed: ${filename}`);
      this.manifest.documents.push({
        originalUrl: docUrl,
        localPath: '',
        filename,
        type: path.extname(filename).slice(1).toLowerCase(),
        status: 'failed',
      });
    }
  }

  private getFilenameFromUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const filename = path.basename(pathname);
      
      // Handle URLs without proper filenames
      if (!filename || filename === '/' || !filename.includes('.')) {
        // Generate a hash-based filename
        const hash = Buffer.from(url).toString('base64').slice(0, 12).replace(/[/+=]/g, '');
        return `asset-${hash}.jpg`;
      }
      
      // Clean filename
      return filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    } catch {
      return '';
    }
  }

  private isValidImageUrl(url: string): boolean {
    // Skip data URLs, SVG sprites, and tracking pixels
    if (url.startsWith('data:')) return false;
    if (url.includes('1x1')) return false;
    if (url.includes('pixel')) return false;
    if (url.includes('tracking')) return false;
    
    return true;
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  private async saveManifest(): Promise<void> {
    await fs.writeJSON(
      path.join(this.outputDir, 'asset-manifest.json'),
      this.manifest,
      { spaces: 2 }
    );

    // Generate Markdown report
    const markdown = this.generateAssetGuide();
    await fs.writeFile(
      path.join(this.outputDir, 'ASSET_GUIDE.md'),
      markdown
    );
  }

  private generateAssetGuide(): string {
    return `# Asset Guide

**Generated At**: ${this.manifest.generatedAt}

## Summary

| Metric | Value |
|--------|-------|
| Total Images | ${this.manifest.summary.totalImages} |
| Successfully Downloaded | ${this.manifest.summary.totalDownloaded} |
| Optimized | ${this.manifest.summary.totalOptimized} |
| Failed | ${this.manifest.summary.totalFailed} |
| Original Size | ${this.formatBytes(this.manifest.summary.originalSizeBytes)} |
| Optimized Size | ${this.formatBytes(this.manifest.summary.optimizedSizeBytes)} |
| **Savings** | **${this.manifest.summary.savingsPercent}%** |

## Images

${this.manifest.images.filter(i => i.status !== 'failed').slice(0, 20).map(img => `
### ${img.filename}
- **Original URL**: ${img.originalUrl}
- **Local Path**: ${img.localPath}
- **Optimized Path**: ${img.optimizedPath || 'N/A'}
- **Alt Text**: ${img.alt || 'None'}
- **Dimensions**: ${img.width || '?'}x${img.height || '?'}
- **Original Size**: ${this.formatBytes(img.originalSize)}
- **Optimized Size**: ${this.formatBytes(img.optimizedSize || img.originalSize)}
- **Variants**: ${img.variants?.length || 0} responsive versions
`).join('\n')}

${this.manifest.images.length > 20 ? `\n... and ${this.manifest.images.length - 20} more images\n` : ''}

## Fonts (${this.manifest.fonts.length})

${this.manifest.fonts.map(font => `- ${font.filename} (${font.format})`).join('\n') || 'No fonts found'}

## Videos (${this.manifest.videos.length})

${this.manifest.videos.map(video => `- ${video.filename}`).join('\n') || 'No videos found'}

## Documents (${this.manifest.documents.length})

${this.manifest.documents.map(doc => `- ${doc.filename} (${doc.type})`).join('\n') || 'No documents found'}

## Usage in Next.js

### Importing Optimized Images

\`\`\`tsx
import Image from 'next/image';

// Using optimized WebP image
<Image
  src="/assets/images/optimized/hero-image.webp"
  alt="Hero section"
  width={1920}
  height={1080}
  priority
/>
\`\`\`

### Using Responsive Images

\`\`\`tsx
<Image
  src="/assets/images/responsive/hero-image-xl.webp"
  srcSet="
    /assets/images/responsive/hero-image-sm.webp 480w,
    /assets/images/responsive/hero-image-md.webp 768w,
    /assets/images/responsive/hero-image-lg.webp 1024w,
    /assets/images/responsive/hero-image-xl.webp 1920w
  "
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1200px"
  alt="Responsive hero"
/>
\`\`\`

---

*Generated by Agent 3: Asset Manager & Optimizer*
`;
  }

  private printSummary(): void {
    console.log('📊 Asset Processing Summary:');
    console.log(`   Images: ${this.manifest.summary.totalDownloaded}/${this.manifest.summary.totalImages} downloaded`);
    console.log(`   Optimized: ${this.manifest.summary.totalOptimized} images`);
    console.log(`   Failed: ${this.manifest.summary.totalFailed}`);
    console.log(`   Original size: ${this.formatBytes(this.manifest.summary.originalSizeBytes)}`);
    console.log(`   Optimized size: ${this.formatBytes(this.manifest.summary.optimizedSizeBytes)}`);
    console.log(`   Savings: ${this.manifest.summary.savingsPercent}%`);
    console.log(`   Fonts: ${this.manifest.fonts.length}`);
    console.log(`   Videos: ${this.manifest.videos.length}`);
    console.log(`   Documents: ${this.manifest.documents.length}`);
    console.log(`\n📁 Output saved to: ${this.outputDir}`);
  }
}

// Main execution
async function main() {
  const projectRoot = path.resolve(__dirname, '../../..');
  const outputDir = path.join(projectRoot, 'output', 'asset-data');
  const crawlDataDir = path.join(projectRoot, 'output', 'crawl-data');
  
  const manager = new AssetManager(outputDir, crawlDataDir);

  try {
    await manager.process();
  } catch (error) {
    console.error('❌ Asset processing failed:', error);
    process.exit(1);
  }
}

export { AssetManager };

main();

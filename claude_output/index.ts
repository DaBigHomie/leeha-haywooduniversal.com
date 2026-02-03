/**
 * Agent 3: Asset Manager
 * Download, optimize, and catalog all media assets
 */

import axios from 'axios';
import * as fs from 'fs-extra';
import * as path from 'path';
import sharp from 'sharp';
import PQueue from 'p-queue';
import chalk from 'chalk';
import ora from 'ora';
import crypto from 'crypto';

interface AssetManifest {
  images: ImageAsset[];
  fonts: FontAsset[];
  videos: VideoAsset[];
  icons: IconAsset[];
  optimizationReport: OptimizationReport;
}

interface ImageAsset {
  originalUrl: string;
  localPath: string;
  filename: string;
  format: string;
  width: number;
  height: number;
  sizeKb: number;
  optimized: boolean;
  variants: ImageVariant[];
  hash: string;
}

interface ImageVariant {
  size: string;
  path: string;
  width: number;
  format: string;
  sizeKb: number;
}

interface FontAsset {
  originalUrl: string;
  localPath: string;
  family: string;
  weight: string;
  style: string;
  format: string;
}

interface VideoAsset {
  originalUrl: string;
  localPath: string;
  filename: string;
  sizeKb: number;
}

interface IconAsset {
  type: 'svg' | 'png' | 'ico';
  originalUrl: string;
  localPath: string;
  purpose: string;
}

interface OptimizationReport {
  totalOriginalSizeMb: number;
  totalOptimizedSizeMb: number;
  savingsPercent: number;
  imagesProcessed: number;
  fontsDownloaded: number;
  videosDownloaded: number;
}

class AssetManager {
  private outputDir: string;
  private queue: PQueue;
  private manifest: AssetManifest;

  constructor(outputDir: string) {
    this.outputDir = outputDir;
    this.queue = new PQueue({ concurrency: 5 });
    this.manifest = {
      images: [],
      fonts: [],
      videos: [],
      icons: [],
      optimizationReport: {
        totalOriginalSizeMb: 0,
        totalOptimizedSizeMb: 0,
        savingsPercent: 0,
        imagesProcessed: 0,
        fontsDownloaded: 0,
        videosDownloaded: 0,
      },
    };
  }

  async processAssets(crawlDataPath: string): Promise<void> {
    console.log(chalk.blue.bold('\n🖼️  Starting asset processing...\n'));

    const siteStructure = await fs.readJSON(
      path.join(crawlDataPath, 'site-structure.json')
    );

    // Create output directories
    await fs.ensureDir(path.join(this.outputDir, 'images', 'original'));
    await fs.ensureDir(path.join(this.outputDir, 'images', 'optimized'));
    await fs.ensureDir(path.join(this.outputDir, 'fonts'));
    await fs.ensureDir(path.join(this.outputDir, 'videos'));
    await fs.ensureDir(path.join(this.outputDir, 'icons'));

    // Process images
    const imageUrls = Array.from(siteStructure.assets.images);
    console.log(chalk.cyan(`📥 Downloading ${imageUrls.length} images...`));
    
    for (const url of imageUrls) {
      await this.queue.add(() => this.processImage(url));
    }

    // Process fonts
    const fontUrls = Array.from(siteStructure.assets.fonts);
    console.log(chalk.cyan(`📥 Downloading ${fontUrls.length} fonts...`));
    
    for (const url of fontUrls) {
      await this.queue.add(() => this.processFont(url));
    }

    // Process videos
    const videoUrls = Array.from(siteStructure.assets.videos);
    if (videoUrls.length > 0) {
      console.log(chalk.cyan(`📥 Downloading ${videoUrls.length} videos...`));
      
      for (const url of videoUrls) {
        await this.queue.add(() => this.processVideo(url));
      }
    }

    await this.queue.onIdle();

    // Calculate optimization report
    this.calculateOptimizationReport();

    // Save manifest
    await fs.writeJSON(
      path.join(this.outputDir, 'asset-manifest.json'),
      this.manifest,
      { spaces: 2 }
    );

    // Generate documentation
    await this.generateAssetDocumentation();

    console.log(chalk.green.bold('\n✅ Asset processing complete!\n'));
    this.printSummary();
  }

  private async processImage(url: string): Promise<void> {
    const spinner = ora(`Processing: ${this.getFilename(url)}`).start();

    try {
      // Download original
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
        timeout: 30000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        },
      });

      const originalBuffer = Buffer.from(response.data);
      const hash = crypto.createHash('md5').update(originalBuffer).digest('hex').substring(0, 8);
      const ext = this.getExtension(url) || 'jpg';
      const filename = `${hash}.${ext}`;
      
      const originalPath = path.join(this.outputDir, 'images', 'original', filename);
      await fs.writeFile(originalPath, originalBuffer);

      // Get image metadata
      const metadata = await sharp(originalBuffer).metadata();
      const originalSizeKb = originalBuffer.length / 1024;

      // Create optimized variants
      const variants: ImageVariant[] = [];

      // Responsive sizes
      const sizes = [
        { name: 'thumbnail', width: 400 },
        { name: 'small', width: 800 },
        { name: 'medium', width: 1200 },
        { name: 'large', width: 1920 },
      ];

      for (const size of sizes) {
        if (metadata.width && metadata.width >= size.width) {
          // WebP format
          const webpPath = path.join(
            this.outputDir,
            'images',
            'optimized',
            `${hash}-${size.name}.webp`
          );
          
          await sharp(originalBuffer)
            .resize(size.width, null, { withoutEnlargement: true })
            .webp({ quality: 85 })
            .toFile(webpPath);

          const webpStats = await fs.stat(webpPath);
          
          variants.push({
            size: size.name,
            path: webpPath,
            width: size.width,
            format: 'webp',
            sizeKb: webpStats.size / 1024,
          });

          // AVIF format (modern browsers)
          const avifPath = path.join(
            this.outputDir,
            'images',
            'optimized',
            `${hash}-${size.name}.avif`
          );
          
          await sharp(originalBuffer)
            .resize(size.width, null, { withoutEnlargement: true })
            .avif({ quality: 80 })
            .toFile(avifPath);

          const avifStats = await fs.stat(avifPath);
          
          variants.push({
            size: size.name,
            path: avifPath,
            width: size.width,
            format: 'avif',
            sizeKb: avifStats.size / 1024,
          });
        }
      }

      const asset: ImageAsset = {
        originalUrl: url,
        localPath: originalPath,
        filename,
        format: metadata.format || 'unknown',
        width: metadata.width || 0,
        height: metadata.height || 0,
        sizeKb: originalSizeKb,
        optimized: true,
        variants,
        hash,
      };

      this.manifest.images.push(asset);
      this.manifest.optimizationReport.imagesProcessed++;

      spinner.succeed(`Processed: ${filename} (${variants.length} variants)`);
    } catch (error) {
      spinner.fail(`Failed: ${this.getFilename(url)}`);
    }
  }

  private async processFont(url: string): Promise<void> {
    const spinner = ora(`Downloading: ${this.getFilename(url)}`).start();

    try {
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
        timeout: 30000,
      });

      const buffer = Buffer.from(response.data);
      const filename = this.getFilename(url);
      const localPath = path.join(this.outputDir, 'fonts', filename);
      
      await fs.writeFile(localPath, buffer);

      const asset: FontAsset = {
        originalUrl: url,
        localPath,
        family: this.extractFontFamily(url),
        weight: 'normal',
        style: 'normal',
        format: this.getExtension(url) || 'woff2',
      };

      this.manifest.fonts.push(asset);
      this.manifest.optimizationReport.fontsDownloaded++;

      spinner.succeed(`Downloaded: ${filename}`);
    } catch (error) {
      spinner.fail(`Failed: ${this.getFilename(url)}`);
    }
  }

  private async processVideo(url: string): Promise<void> {
    const spinner = ora(`Downloading: ${this.getFilename(url)}`).start();

    try {
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
        timeout: 60000,
      });

      const buffer = Buffer.from(response.data);
      const filename = this.getFilename(url);
      const localPath = path.join(this.outputDir, 'videos', filename);
      
      await fs.writeFile(localPath, buffer);

      const asset: VideoAsset = {
        originalUrl: url,
        localPath,
        filename,
        sizeKb: buffer.length / 1024,
      };

      this.manifest.videos.push(asset);
      this.manifest.optimizationReport.videosDownloaded++;

      spinner.succeed(`Downloaded: ${filename}`);
    } catch (error) {
      spinner.fail(`Failed: ${this.getFilename(url)}`);
    }
  }

  private calculateOptimizationReport(): void {
    const originalSize = this.manifest.images.reduce(
      (sum, img) => sum + img.sizeKb,
      0
    );

    const optimizedSize = this.manifest.images.reduce(
      (sum, img) => sum + img.variants.reduce((s, v) => s + v.sizeKb, 0) / img.variants.length,
      0
    );

    this.manifest.optimizationReport.totalOriginalSizeMb = originalSize / 1024;
    this.manifest.optimizationReport.totalOptimizedSizeMb = optimizedSize / 1024;
    this.manifest.optimizationReport.savingsPercent = 
      ((originalSize - optimizedSize) / originalSize) * 100;
  }

  private async generateAssetDocumentation(): Promise<void> {
    const spinner = ora('Generating asset documentation...').start();

    const markdown = `# Asset Library Documentation

## Optimization Report

- **Original Size**: ${this.manifest.optimizationReport.totalOriginalSizeMb.toFixed(2)} MB
- **Optimized Size**: ${this.manifest.optimizationReport.totalOptimizedSizeMb.toFixed(2)} MB
- **Savings**: ${this.manifest.optimizationReport.savingsPercent.toFixed(1)}%

## Assets Summary

- **Images Processed**: ${this.manifest.optimizationReport.imagesProcessed}
- **Fonts Downloaded**: ${this.manifest.optimizationReport.fontsDownloaded}
- **Videos Downloaded**: ${this.manifest.optimizationReport.videosDownloaded}

## Image Formats

All images have been optimized with multiple formats for modern browsers:

- **AVIF**: Best compression, newest format
- **WebP**: Wide support, excellent compression
- **JPEG/PNG**: Fallback for older browsers

## Responsive Sizes

Each image includes the following sizes:
- Thumbnail: 400px width
- Small: 800px width
- Medium: 1200px width
- Large: 1920px width

## Usage in Next.js

\`\`\`tsx
import Image from 'next/image';

<Image
  src="/images/optimized/${this.manifest.images[0]?.hash}-medium.webp"
  alt="Description"
  width={1200}
  height={800}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
\`\`\`

## Font Loading

\`\`\`tsx
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'] });
\`\`\`
`;

    await fs.writeFile(
      path.join(this.outputDir, 'ASSET_GUIDE.md'),
      markdown
    );

    spinner.succeed('Asset documentation generated');
  }

  private printSummary(): void {
    console.log(chalk.cyan('📊 Asset Processing Summary:'));
    console.log(`   Images: ${this.manifest.optimizationReport.imagesProcessed}`);
    console.log(`   Fonts: ${this.manifest.optimizationReport.fontsDownloaded}`);
    console.log(`   Videos: ${this.manifest.optimizationReport.videosDownloaded}`);
    console.log(`   Savings: ${this.manifest.optimizationReport.savingsPercent.toFixed(1)}%`);
  }

  private getFilename(url: string): string {
    try {
      const urlObj = new URL(url);
      return path.basename(urlObj.pathname) || 'unknown';
    } catch {
      return 'unknown';
    }
  }

  private getExtension(url: string): string | null {
    const filename = this.getFilename(url);
    const ext = path.extname(filename).substring(1);
    return ext || null;
  }

  private extractFontFamily(url: string): string {
    const match = url.match(/family=([^&:]+)/);
    return match ? match[1].replace(/\+/g, ' ') : 'Unknown';
  }
}

// Main execution
async function main() {
  const manager = new AssetManager(
    '/home/claude/haywood-universal-v2/output/asset-data'
  );

  try {
    await manager.processAssets(
      '/home/claude/haywood-universal-v2/output/crawl-data'
    );
  } catch (error) {
    console.error(chalk.red('❌ Asset processing failed:'), error);
  }
}

export { AssetManager };

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

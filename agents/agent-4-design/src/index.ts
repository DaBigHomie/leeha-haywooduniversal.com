/**
 * Agent 4: Design Token Extractor
 * Create comprehensive design system from visual inspection
 */

import fs from 'fs-extra';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';
import Color from 'color';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface DesignTokens {
  colors: {
    primary: Record<string, string>;
    secondary: Record<string, string>;
    neutral: Record<string, string>;
    semantic: {
      success: Record<string, string>;
      error: Record<string, string>;
      warning: Record<string, string>;
    };
  };
  typography: {
    fontFamily: Record<string, string[]>;
    fontSize: Record<string, [string, { lineHeight: string }]>;
    fontWeight: Record<string, number>;
  };
  spacing: Record<string, string>;
  shadows: Record<string, string>;
  borderRadius: Record<string, string>;
  breakpoints: Record<string, string>;
}

class DesignTokenExtractor {
  private crawlDataDir: string;
  private outputDir: string;
  private tokens: DesignTokens;

  constructor() {
    const projectRoot = path.resolve(__dirname, '../../..');
    this.crawlDataDir = path.join(projectRoot, 'output', 'crawl-data');
    this.outputDir = path.join(projectRoot, 'output', 'design-tokens');
    
    this.tokens = {
      colors: {
        primary: {},
        secondary: {},
        neutral: {},
        semantic: {
          success: {},
          error: {},
          warning: {},
        },
      },
      typography: {
        fontFamily: {},
        fontSize: {},
        fontWeight: {},
      },
      spacing: {},
      shadows: {},
      borderRadius: {},
      breakpoints: {},
    };
  }

  async extract(): Promise<void> {
    await fs.ensureDir(this.outputDir);

    console.log('🎨 Extracting design tokens from HTML...\n');

    // Read HTML files
    const htmlDir = path.join(this.crawlDataDir, 'html');
    const htmlFiles = await fs.readdir(htmlDir);

    const colorSet = new Set<string>();
    const fontSet = new Set<string>();
    const classSet = new Set<string>();

    for (const file of htmlFiles) {
      const html = await fs.readFile(path.join(htmlDir, file), 'utf-8');
      const $ = cheerio.load(html);

      // Extract inline styles and classes
      $('[style], [class]').each((_, el) => {
        const style = $(el).attr('style');
        const classes = $(el).attr('class');

        if (style) {
          this.extractColors(style, colorSet);
        }

        if (classes) {
          classes.split(' ').forEach(c => classSet.add(c));
        }
      });

      // Extract fonts
      $('link[rel="stylesheet"], style').each((_, el) => {
        const href = $(el).attr('href');
        const content = $(el).html();
        
        if (href && href.includes('font')) {
          const match = href.match(/family=([^&:]+)/);
          if (match) fontSet.add(match[1].replace(/\+/g, ' '));
        }

        if (content) {
          const fontMatch = content.match(/font-family:\s*([^;]+)/gi);
          if (fontMatch) {
            fontMatch.forEach(f => {
              const family = f.replace(/font-family:\s*/i, '').trim();
              fontSet.add(family);
            });
          }
        }
      });
    }

    // Generate color palette
    this.generateColorPalette(Array.from(colorSet));

    // Generate typography
    this.generateTypography(Array.from(fontSet));

    // Generate spacing scale
    this.generateSpacingScale();

    // Generate other tokens
    this.generateMiscTokens();

    // Save outputs
    await this.saveDesignTokens();
    await this.generateTailwindConfig();
    await this.generateGlobalCSS();
    await this.generateDocumentation();

    console.log('\n✅ Design token extraction complete!\n');
    console.log(`📁 Output saved to: ${this.outputDir}`);
  }

  private extractColors(style: string, colorSet: Set<string>): void {
    const colorRegex = /(#[0-9a-f]{3,6}|rgb\([^)]+\)|rgba\([^)]+\))/gi;
    const matches = style.match(colorRegex);
    if (matches) {
      matches.forEach(color => {
        try {
          const normalized = Color(color).hex();
          colorSet.add(normalized);
        } catch {
          // Invalid color
        }
      });
    }
  }

  private generateColorPalette(colors: string[]): void {
    // Define default brand colors (can be refined based on extracted colors)
    const primaryBase = '#2563eb'; // Blue
    const secondaryBase = '#f59e0b'; // Amber
    
    this.tokens.colors.primary = this.generateColorScale(primaryBase);
    this.tokens.colors.secondary = this.generateColorScale(secondaryBase);
    this.tokens.colors.neutral = this.generateColorScale('#6b7280');
    
    this.tokens.colors.semantic.success = this.generateColorScale('#10b981');
    this.tokens.colors.semantic.error = this.generateColorScale('#ef4444');
    this.tokens.colors.semantic.warning = this.generateColorScale('#f59e0b');
  }

  private generateColorScale(baseColor: string): Record<string, string> {
    const scale: Record<string, string> = {};
    const base = Color(baseColor);

    scale['50'] = base.lighten(0.9).hex();
    scale['100'] = base.lighten(0.8).hex();
    scale['200'] = base.lighten(0.6).hex();
    scale['300'] = base.lighten(0.4).hex();
    scale['400'] = base.lighten(0.2).hex();
    scale['500'] = base.hex();
    scale['600'] = base.darken(0.1).hex();
    scale['700'] = base.darken(0.2).hex();
    scale['800'] = base.darken(0.3).hex();
    scale['900'] = base.darken(0.4).hex();

    return scale;
  }

  private generateTypography(fonts: string[]): void {
    // Default font families
    this.tokens.typography.fontFamily = {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Georgia', 'serif'],
      mono: ['Monaco', 'Courier New', 'monospace'],
    };

    // Font size scale (matching Tailwind)
    this.tokens.typography.fontSize = {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
    };

    // Font weights
    this.tokens.typography.fontWeight = {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    };
  }

  private generateSpacingScale(): void {
    // 8px grid system
    const scale = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64];
    scale.forEach(value => {
      this.tokens.spacing[value] = `${value * 4}px`;
    });
  }

  private generateMiscTokens(): void {
    // Shadows
    this.tokens.shadows = {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    };

    // Border radius
    this.tokens.borderRadius = {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      full: '9999px',
    };

    // Breakpoints
    this.tokens.breakpoints = {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    };
  }

  private async saveDesignTokens(): Promise<void> {
    await fs.writeJson(
      path.join(this.outputDir, 'design-tokens.json'),
      this.tokens,
      { spaces: 2 }
    );
  }

  private async generateTailwindConfig(): Promise<void> {
    const config = `import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: ${JSON.stringify(this.tokens.colors, null, 6)},
      fontFamily: ${JSON.stringify(this.tokens.typography.fontFamily, null, 6)},
      fontSize: ${JSON.stringify(this.tokens.typography.fontSize, null, 6)},
      fontWeight: ${JSON.stringify(this.tokens.typography.fontWeight, null, 6)},
      spacing: ${JSON.stringify(this.tokens.spacing, null, 6)},
      boxShadow: ${JSON.stringify(this.tokens.shadows, null, 6)},
      borderRadius: ${JSON.stringify(this.tokens.borderRadius, null, 6)},
      screens: ${JSON.stringify(this.tokens.breakpoints, null, 6)},
    },
  },
  plugins: [],
};

export default config;
`;

    await fs.writeFile(
      path.join(this.outputDir, 'tailwind.config.ts'),
      config
    );
  }

  private async generateGlobalCSS(): void {
    const css = `:root {
  /* Colors - Primary */
${Object.entries(this.tokens.colors.primary).map(([key, value]) => `  --color-primary-${key}: ${value};`).join('\n')}

  /* Colors - Secondary */
${Object.entries(this.tokens.colors.secondary).map(([key, value]) => `  --color-secondary-${key}: ${value};`).join('\n')}

  /* Spacing */
${Object.entries(this.tokens.spacing).map(([key, value]) => `  --spacing-${key}: ${value};`).join('\n')}

  /* Shadows */
${Object.entries(this.tokens.shadows).map(([key, value]) => `  --shadow-${key}: ${value};`).join('\n')}

  /* Border Radius */
${Object.entries(this.tokens.borderRadius).map(([key, value]) => `  --radius-${key}: ${value};`).join('\n')}
}
`;

    await fs.writeFile(
      path.join(this.outputDir, 'globals.css'),
      css
    );
  }

  private async generateDocumentation(): Promise<void> {
    const docs = `# Design System Documentation

**Generated**: ${new Date().toISOString()}

## Color Palette

### Primary
${Object.entries(this.tokens.colors.primary).map(([key, value]) => `- **${key}**: ${value}`).join('\n')}

### Secondary
${Object.entries(this.tokens.colors.secondary).map(([key, value]) => `- **${key}**: ${value}`).join('\n')}

## Typography

### Font Families
${Object.entries(this.tokens.typography.fontFamily).map(([key, value]) => `- **${key}**: ${value.join(', ')}`).join('\n')}

### Font Sizes
${Object.entries(this.tokens.typography.fontSize).map(([key, [size, meta]]) => `- **${key}**: ${size} (line-height: ${meta.lineHeight})`).join('\n')}

## Spacing Scale
${Object.entries(this.tokens.spacing).map(([key, value]) => `- **${key}**: ${value}`).join('\n')}

## Usage

### TailwindCSS
\`\`\`bash
# Install dependencies
npm install tailwindcss@latest

# Use the generated config
cp output/design-tokens/tailwind.config.ts ./
\`\`\`

### CSS Variables
\`\`\`css
@import './output/design-tokens/globals.css';

.my-component {
  color: var(--color-primary-500);
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}
\`\`\`
`;

    await fs.writeFile(
      path.join(this.outputDir, 'DESIGN_SYSTEM.md'),
      docs
    );
  }
}

// Main execution
async function main() {
  const extractor = new DesignTokenExtractor();

  try {
    await extractor.extract();
  } catch (error) {
    console.error('❌ Design token extraction failed:', error);
    process.exit(1);
  }
}

export { DesignTokenExtractor };

main();

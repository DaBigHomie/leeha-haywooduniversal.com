# Design System Documentation

**Generated**: 2026-02-05T01:51:47.551Z

## Color Palette

### Primary
- **50**: #FFFFFF
- **100**: #ECF2FD
- **200**: #BACEF9
- **300**: #89AAF4
- **400**: #5787F0
- **500**: #2563EB
- **600**: #1554E0
- **700**: #124BC7
- **800**: #1042AE
- **900**: #0E3895

### Secondary
- **50**: #FEF6E8
- **100**: #FDECD0
- **200**: #FBD99F
- **300**: #F9C56D
- **400**: #F7B23C
- **500**: #F59E0B
- **600**: #DD8E09
- **700**: #C57F08
- **800**: #AC6F07
- **900**: #945F06

## Typography

### Font Families
- **sans**: Inter, system-ui, sans-serif
- **serif**: Georgia, serif
- **mono**: Monaco, Courier New, monospace

### Font Sizes
- **xs**: 0.75rem (line-height: 1rem)
- **sm**: 0.875rem (line-height: 1.25rem)
- **base**: 1rem (line-height: 1.5rem)
- **lg**: 1.125rem (line-height: 1.75rem)
- **xl**: 1.25rem (line-height: 1.75rem)
- **2xl**: 1.5rem (line-height: 2rem)
- **3xl**: 1.875rem (line-height: 2.25rem)
- **4xl**: 2.25rem (line-height: 2.5rem)
- **5xl**: 3rem (line-height: 1)
- **6xl**: 3.75rem (line-height: 1)

## Spacing Scale
- **0**: 0px
- **1**: 4px
- **2**: 8px
- **3**: 12px
- **4**: 16px
- **5**: 20px
- **6**: 24px
- **8**: 32px
- **10**: 40px
- **12**: 48px
- **16**: 64px
- **20**: 80px
- **24**: 96px
- **32**: 128px
- **40**: 160px
- **48**: 192px
- **56**: 224px
- **64**: 256px

## Usage

### TailwindCSS
```bash
# Install dependencies
npm install tailwindcss@latest

# Use the generated config
cp output/design-tokens/tailwind.config.ts ./
```

### CSS Variables
```css
@import './output/design-tokens/globals.css';

.my-component {
  color: var(--color-primary-500);
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}
```

# Page Templates

**Generated**: 2026-02-05T02:48:44.257Z

## Pages

- **HomePage**: `/`
- **ServicesPage**: `/services`
- **GalleryPage**: `/gallery`
- **ContactPage**: `/contact`
- **Layout**: `_layout`

## Usage

```tsx
import { HomePage, ServicesPage, GalleryPage, ContactPage } from './pages';

// Next.js App Router example:
// app/page.tsx
export default function Page() {
  return <HomePage />;
}

// app/services/page.tsx
export default function Page() {
  return <ServicesPage />;
}
```

## Structure

All pages use the `Layout` component which includes:
- Header with navigation
- Footer with links
- Responsive design
- Consistent branding

## Customization

To customize page content:
1. Edit the page component directly
2. Modify service data, project lists, etc.
3. Adjust styling via TailwindCSS classes
4. Add new sections using atomic/composite components

## Next.js Integration

```bash
# Create Next.js 15 app
npx create-next-app@latest my-app --typescript --tailwind --app

# Copy components to your Next.js app
cp -r output/components/* my-app/src/components/

# Use in app router
# app/page.tsx
import { HomePage } from '@/components/pages';
export default HomePage;
```

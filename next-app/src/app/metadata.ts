import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata('home');

export default function RootPage() {
  // Re-export from page.tsx to add metadata
  return null;
}

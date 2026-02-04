import { Gallery } from '../shared/ui/components/Gallery';
import type { SiteConfig } from '../shared/types/config';

interface GalleryPageProps {
  config: SiteConfig;
}

export function GalleryPage({ config }: GalleryPageProps) {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-display text-center mb-8">Gallery</h1>
      <p className="text-xl text-gray-600 text-center mb-16">
        Explore our recent work and success stories
      </p>
      
      <Gallery 
        title={config.content.gallery.title}
        images={config.content.gallery.images}
      />
      
      {/* Extended gallery grid */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
        {config.content.gallery.images.map((image, index) => (
          <div key={index} className="aspect-square overflow-hidden rounded-lg">
            <img 
              src={image.url} 
              alt={image.alt}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </main>
  );
}

export default GalleryPage;

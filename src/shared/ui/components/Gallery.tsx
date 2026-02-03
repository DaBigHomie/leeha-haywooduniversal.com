import { motion } from 'framer-motion';
import type { GalleryContent } from '../../types/config';

interface GalleryProps {
  content: GalleryContent;
  variant?: number;
}

export const Gallery = ({ content, variant = 1 }: GalleryProps) => {
  // Different grid layouts based on variant
  const getGridClass = () => {
    const layouts = [
      'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      'grid-cols-1 md:grid-cols-3',
      'grid-cols-2 md:grid-cols-4',
      'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    ];
    return layouts[variant % layouts.length];
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold text-center mb-12 text-gray-900"
        >
          {content.title}
        </motion.h2>

        <div className={`grid ${getGridClass()} gap-6`}>
          {content.images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {image.caption && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white font-medium">{image.caption}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

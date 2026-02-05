'use client';

import React, { useState } from 'react';
import { Layout } from './Layout';
import { Hero } from '@/components/organisms/Hero/Hero';
import { Text } from '@/components/atoms/Text/Text';
import { getPageContent } from '@/content/data';
import Image from 'next/image';

const content = getPageContent('gallery');

export const GalleryPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');

  const filteredImages = filter === 'All'
    ? content.images
    : content.images.filter(img => img.category === filter.toLowerCase());

  return (
    <Layout currentPath="/gallery">
      <Hero
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        cta={{
          label: content.hero.ctaButtons[0].text,
          onClick: () => window.location.href = content.hero.ctaButtons[0].href,
        }}
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 mb-12">
            {content.categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  filter === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <div key={image.id} className="group cursor-pointer">
                <div className="aspect-video bg-neutral-200 rounded-lg overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <Text variant="h5" className="mt-3">
                  {image.title}
                </Text>
                <Text variant="caption" className="capitalize">
                  {image.category}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

import React, { useState } from 'react';
import { Header } from '../../components/organisms/Header/Header';
import { Footer } from '../../components/organisms/Footer/Footer';
import { Hero } from '../../components/organisms/Hero/Hero';
import { Button } from '../../components/atoms/Button/Button';

export const GalleryPage: React.FC = () => {
  const [filter, setFilter] = useState('all');

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPath="/gallery" />
      <main className="flex-1">
        <Hero title="Our Portfolio" description="Browse our completed projects." />
        <section className="py-16 container mx-auto px-4">
          <div className="flex gap-4 justify-center mb-8">
            <Button variant={filter === 'all' ? 'primary' : 'outline'} onClick={() => setFilter('all')}>
              All
            </Button>
            <Button variant={filter === 'painting' ? 'primary' : 'outline'} onClick={() => setFilter('painting')}>
              Painting
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {/* Gallery items would go here */}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

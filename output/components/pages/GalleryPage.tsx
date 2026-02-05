import React, { useState } from 'react';
import { Layout } from './Layout';
import { Hero } from '../organisms/Hero/Hero';
import { Text } from '../atoms/Text/Text';

const projects = [
  { id: '1', title: 'Residential Renovation', category: 'residential', image: '/images/project-1.jpg' },
  { id: '2', title: 'Commercial Building', category: 'commercial', image: '/images/project-2.jpg' },
  { id: '3', title: 'Kitchen Remodel', category: 'residential', image: '/images/project-3.jpg' },
  { id: '4', title: 'Office Space', category: 'commercial', image: '/images/project-4.jpg' },
  { id: '5', title: 'Bathroom Upgrade', category: 'residential', image: '/images/project-5.jpg' },
  { id: '6', title: 'Retail Store', category: 'commercial', image: '/images/project-6.jpg' },
];

export const GalleryPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial'>('all');

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <Layout currentPath="/gallery">
      <Hero
        title="Our Portfolio"
        subtitle="Explore our completed projects and see our craftsmanship"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter('residential')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                filter === 'residential'
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
              }`}
            >
              Residential
            </button>
            <button
              onClick={() => setFilter('commercial')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                filter === 'commercial'
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
              }`}
            >
              Commercial
            </button>
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="group cursor-pointer">
                <div className="aspect-video bg-neutral-200 rounded-lg overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <Text variant="h5" className="mt-3">
                  {project.title}
                </Text>
                <Text variant="caption" className="capitalize">
                  {project.category}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

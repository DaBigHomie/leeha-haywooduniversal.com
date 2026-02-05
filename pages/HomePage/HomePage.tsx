import React from 'react';
import { Header } from '../../components/organisms/Header/Header';
import { Footer } from '../../components/organisms/Footer/Footer';
import { Hero } from '../../components/organisms/Hero/Hero';
import { ServiceGrid } from '../../components/organisms/ServiceGrid/ServiceGrid';

export const HomePage: React.FC = () => {
  const services = [
    {
      id: 'painting',
      title: 'Professional Painting',
      description: 'Transform your space with expert painting services.',
    },
    {
      id: 'remodeling',
      title: 'Home Remodeling',
      description: 'Complete renovation services for your dream home.',
    },
    {
      id: 'property',
      title: 'Property Management',
      description: 'Comprehensive property management solutions.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPath="/" />
      <main className="flex-1">
        <Hero
          title="Building Excellence, One Project at a Time"
          subtitle="Haywood Universal Services"
          description="Professional painting, remodeling, and property management services."
          primaryCta={{
            text: 'Get a Free Quote',
            onClick: () => console.log('Navigate to contact'),
          }}
        />
        <ServiceGrid services={services} />
      </main>
      <Footer />
    </div>
  );
};

import React from 'react';
import { Header } from '../../components/organisms/Header/Header';
import { Footer } from '../../components/organisms/Footer/Footer';
import { Hero } from '../../components/organisms/Hero/Hero';
import { Card } from '../../components/molecules/Card/Card';

export const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPath="/services" />
      <main className="flex-1">
        <Hero
          title="Our Services"
          description="Comprehensive solutions for all your needs."
        />
        <section className="py-16 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card title="Interior Painting" description="Professional interior painting services." />
            <Card title="Exterior Painting" description="Weather-resistant exterior finishes." />
            <Card title="Kitchen Remodeling" description="Complete kitchen transformations." />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

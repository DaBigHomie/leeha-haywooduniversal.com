'use client';

import React from 'react';
import { Layout } from './Layout';
import { Hero } from '@/components/organisms/Hero/Hero';
import { ServiceGrid, type Service } from '@/components/organisms/ServiceGrid/ServiceGrid';
import { Text } from '@/components/atoms/Text/Text';
import { getPageContent } from '@/content/data';

const pageData = getPageContent('home');
const content = 'services' in pageData ? pageData : { ...pageData, services: [], features: { title: '', items: [] } };

const services: Service[] = content.services.map((service, idx) => ({
  id: String(idx + 1),
  title: service.title,
  description: service.description,
  action: {
    label: 'Learn More',
    onClick: () => window.location.href = '/services',
  },
}));

export const HomePage: React.FC = () => {
  const heroData = 'title' in content ? content : (content as any).hero || content;
  
  return (
    <Layout currentPath="/">
      <Hero
        title={heroData.title}
        subtitle={heroData.subtitle}
        cta={{
          label: heroData.ctaButtons?.[0]?.text || 'Get Started',
          onClick: () => window.location.href = heroData.ctaButtons?.[0]?.href || '/contact',
        }}
        secondaryCta={{
          label: heroData.ctaButtons?.[1]?.text || 'Learn More',
          onClick: () => window.location.href = heroData.ctaButtons?.[1]?.href || '/services',
        }}
      />

      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Text variant="h2" align="center" className="mb-4">
            Our Services
          </Text>
          <Text variant="body" align="center" className="mb-12 text-neutral-600">
            Comprehensive solutions for all your construction and property needs
          </Text>
          
          <ServiceGrid services={services} columns={3} />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Text variant="h2" align="center" className="mb-4">
            Why Choose Haywood Universal?
          </Text>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <Text variant="h3" className="mb-2">20+ Years</Text>
              <Text variant="body" className="text-neutral-600">
                Experience in construction and property management
              </Text>
            </div>
            <div className="text-center">
              <Text variant="h3" className="mb-2">500+ Projects</Text>
              <Text variant="body" className="text-neutral-600">
                Successfully completed across residential and commercial sectors
              </Text>
            </div>
            <div className="text-center">
              <Text variant="h3" className="mb-2">100% Satisfaction</Text>
              <Text variant="body" className="text-neutral-600">
                Committed to quality and customer satisfaction
              </Text>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

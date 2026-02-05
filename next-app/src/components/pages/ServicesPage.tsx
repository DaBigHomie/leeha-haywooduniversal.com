'use client';

import React from 'react';
import { Layout } from './Layout';
import { Hero } from '@/components/organisms/Hero/Hero';
import { ServiceGrid, type Service } from '@/components/organisms/ServiceGrid/ServiceGrid';
import { Text } from '@/components/atoms/Text/Text';
import { getPageContent } from '@/content/data';

const content = getPageContent('services');

export const ServicesPage: React.FC = () => {
  return (
    <Layout currentPath="/services">
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
          {content.categories.map((category, idx) => (
            <div key={idx} className="mb-16">
              <Text variant="h2" align="center" className="mb-8">
                {category.title}
              </Text>
              <ServiceGrid services={category.services.map((service, sIdx) => ({
                id: `${idx}-${sIdx}`,
                title: service.title,
                description: service.description,
                price: service.price,
              }))} />
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Text variant="h3" className="mb-4">
            Ready to Get Started?
          </Text>
          <Text variant="body" className="mb-8">
            Contact us today for a free consultation and quote
          </Text>
          <a
            href="/contact"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </Layout>
  );
};

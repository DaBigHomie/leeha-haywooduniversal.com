import React from 'react';
import { Layout } from './Layout';
import { Hero } from '../organisms/Hero/Hero';
import { ServiceGrid, type Service } from '../organisms/ServiceGrid/ServiceGrid';
import { Text } from '../atoms/Text/Text';

const services: Service[] = [
  {
    id: '1',
    title: 'Residential Construction',
    description: 'Complete home building and renovation services',
    action: {
      label: 'Learn More',
      onClick: () => window.location.href = '/services',
    },
  },
  {
    id: '2',
    title: 'Commercial Projects',
    description: 'Professional commercial construction management',
    action: {
      label: 'View Projects',
      onClick: () => window.location.href = '/gallery',
    },
  },
  {
    id: '3',
    title: 'Property Management',
    description: 'Expert property maintenance and management',
    action: {
      label: 'Get Started',
      onClick: () => window.location.href = '/contact',
    },
  },
];

export const HomePage: React.FC = () => {
  return (
    <Layout currentPath="/">
      <Hero
        title="Building Your Vision, Managing Your Success"
        subtitle="Professional construction and property management services"
        cta={{
          label: 'Get Started',
          onClick: () => window.location.href = '/contact',
        }}
        secondaryCta={{
          label: 'View Our Work',
          onClick: () => window.location.href = '/gallery',
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

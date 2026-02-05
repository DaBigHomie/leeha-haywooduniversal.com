import React from 'react';
import { Layout } from './Layout';
import { Hero } from '../organisms/Hero/Hero';
import { ServiceGrid, type Service } from '../organisms/ServiceGrid/ServiceGrid';
import { Text } from '../atoms/Text/Text';

const services: Service[] = [
  {
    id: '1',
    title: 'Construction Management',
    description: 'End-to-end project management for residential and commercial construction',
  },
  {
    id: '2',
    title: 'Property Maintenance',
    description: 'Regular maintenance and repair services for all property types',
  },
  {
    id: '3',
    title: 'Renovation & Remodeling',
    description: 'Transform your space with expert renovation services',
  },
  {
    id: '4',
    title: 'Room Rentals',
    description: 'Quality room rentals with flexible terms',
  },
  {
    id: '5',
    title: 'Project Consultation',
    description: 'Expert advice and planning for your next project',
  },
  {
    id: '6',
    title: 'Emergency Services',
    description: '24/7 emergency response for urgent property issues',
  },
];

export const ServicesPage: React.FC = () => {
  return (
    <Layout currentPath="/services">
      <Hero
        title="Our Services"
        subtitle="Comprehensive construction and property management solutions"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Text variant="h2" align="center" className="mb-12">
            What We Offer
          </Text>
          
          <ServiceGrid services={services} columns={3} />
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

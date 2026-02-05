'use client';

import React from 'react';
import { Layout } from './Layout';
import { Hero } from '../organisms/Hero/Hero';
import { Check, ArrowRight } from 'lucide-react';
import { siteContent } from '@/content/data';

const ProjectManagementPage = () => {
  const content = siteContent.projectManagement;

  return (
    <Layout>
      {/* Hero Section */}
      <Hero {...content.hero} />

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary-900 mb-6">
              Our Project Management Services
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Comprehensive construction oversight from planning to completion
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {content.services.map((service, index) => (
              <div
                key={index}
                className="bg-neutral-50 rounded-lg p-8 hover:shadow-lg transition-shadow"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-heading font-bold text-secondary-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-neutral-600 mb-4">{service.description}</p>
                  <div className="text-2xl font-bold text-primary-600 mb-6">
                    {service.pricing}
                  </div>
                </div>

                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary-900 mb-6">
              Our Project Management Process
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              A proven 5-step approach to successful project delivery
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {content.process.map((step, index) => (
              <div key={index} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-xl">
                    {step.step}
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-heading font-bold text-secondary-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary-900 mb-6">
              Why Choose Our Project Management
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Professional oversight that saves you time and money
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {content.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 bg-neutral-50 rounded-lg"
              >
                <Check className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                <p className="text-neutral-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Ready to Start Your Construction Project?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Schedule a free consultation to discuss your project needs and get a custom quote.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-neutral-100 transition-colors"
            >
              Get Free Quote
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="https://haywooduniversal.com/m/bookings"
              className="inline-flex items-center gap-2 bg-secondary-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-secondary-800 transition-colors"
            >
              Book Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary-900 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">50+</div>
              <div className="text-neutral-300">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">98%</div>
              <div className="text-neutral-300">On-Time Delivery</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">$2M+</div>
              <div className="text-neutral-300">Budget Managed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">4.9/5</div>
              <div className="text-neutral-300">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectManagementPage;

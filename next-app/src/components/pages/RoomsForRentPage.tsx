'use client';

import React from 'react';
import { Layout } from './Layout';
import { Hero } from '../organisms/Hero/Hero';
import { Check, MapPin, DollarSign, Users, Home } from 'lucide-react';
import { siteContent } from '@/content/data';

const RoomsForRentPage = () => {
  const content = siteContent.roomsForRent;

  return (
    <Layout>
      {/* Hero Section */}
      <Hero {...content.hero} />

      {/* Featured Listings Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary-900 mb-6">
              Featured Room Rentals
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Quality shared housing in Metro Atlanta's best neighborhoods
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {content.featured.map((listing, index) => (
              <div
                key={index}
                className="bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="bg-primary-600 text-white p-6">
                  <h3 className="text-2xl font-heading font-bold mb-2">
                    {listing.title}
                  </h3>
                  <div className="flex items-center gap-2 text-neutral-100">
                    <MapPin className="w-4 h-4" />
                    <span>{listing.location}</span>
                  </div>
                  <div className="mt-4 text-3xl font-bold">{listing.price}</div>
                </div>

                <div className="p-6">
                  <h4 className="font-semibold text-secondary-900 mb-3">Features:</h4>
                  <ul className="space-y-2 mb-6">
                    {listing.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-neutral-700">
                        <Check className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-semibold text-secondary-900 mb-3">House Rules:</h4>
                  <ul className="space-y-2 mb-6">
                    {listing.houseRules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-neutral-700">
                        <Check className="w-4 h-4 text-neutral-400 flex-shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-neutral-200">
                    <div className="text-sm text-neutral-600 mb-4">
                      {listing.availability}
                    </div>
                    <a
                      href="/contact"
                      className="block w-full text-center bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                    >
                      Schedule Viewing
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary-900 mb-6">
              Why Choose Our Room Rentals
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Safe, affordable, and professionally managed shared housing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {content.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-sm"
              >
                <Check className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                <p className="text-neutral-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Filters Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary-900 mb-6">
              Find Your Perfect Room
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Use our filters to find rooms that match your preferences
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-secondary-50 rounded-lg p-8">
            <h3 className="text-xl font-heading font-bold text-secondary-900 mb-6">
              Search Criteria:
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {content.searchFilters.map((filter, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white rounded-lg"
                >
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <span className="text-neutral-700">{filter}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a
                href="/contact"
                className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Start Your Room Search
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              How It Works
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Simple steps to find your perfect shared housing
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: 1, title: 'Browse Listings', description: 'View available rooms with photos and details' },
              { step: 2, title: 'Schedule Viewings', description: 'Book tours to meet roommates and see the property' },
              { step: 3, title: 'Apply & Screen', description: 'Complete application and background check' },
              { step: 4, title: 'Move In', description: 'Sign lease and move into your new room' },
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-white text-primary-600 flex items-center justify-center font-bold text-2xl mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">{step.title}</h3>
                <p className="text-neutral-100 opacity-90">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Ready to Find Your Room?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Contact us today to schedule viewings or learn more about available rooms in your preferred neighborhood.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              View All Rooms
            </a>
            <a
              href="tel:+16782749182"
              className="inline-flex items-center gap-2 bg-white text-secondary-900 px-8 py-4 rounded-lg font-semibold hover:bg-neutral-100 transition-colors"
            >
              Call (678) 274-9182
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">100+</div>
              <div className="text-neutral-600">Rooms Listed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">95%</div>
              <div className="text-neutral-600">Roommate Match Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">$700</div>
              <div className="text-neutral-600">Average Monthly Rent</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">4.8/5</div>
              <div className="text-neutral-600">Tenant Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RoomsForRentPage;

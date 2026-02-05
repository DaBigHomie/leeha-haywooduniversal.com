import React from 'react';
import { Layout } from './Layout';
import { Hero } from '@/components/organisms/Hero/Hero';
import { ContactForm, type ContactFormData } from '@/components/organisms/ContactForm/ContactForm';
import { Text } from '@/components/atoms/Text/Text';
import { Icon } from '@/components/atoms/Icon/Icon';
import { getPageContent } from '@/content/data';

const pageData = getPageContent('contact');
const content = 'contactInfo' in pageData ? pageData : { 
  hero: 'hero' in pageData ? pageData.hero : pageData,
  contactInfo: { phone: '(555) 123-4567', email: 'info@haywooduniversal.com', address: '123 Main St' }
};

export const ContactPage: React.FC = () => {
  const handleSubmit = async (data: ContactFormData) => {
    // In production, this would send to your API
    console.log('Form submitted:', data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <Layout currentPath="/contact">
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
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <Text variant="h3" className="mb-6">
                Contact Information
              </Text>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Icon name="phone" size={24} color="#2563eb" />
                  <div>
                    <Text variant="h5" className="mb-1">Phone</Text>
                    <Text variant="body" className="text-neutral-600">
                      {content.contactInfo.phone}
                    </Text>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Icon name="mail" size={24} color="#2563eb" />
                  <div>
                    <Text variant="h5" className="mb-1">Email</Text>
                    <Text variant="body" className="text-neutral-600">
                      {content.contactInfo.email}
                    </Text>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Icon name="home" size={24} color="#2563eb" />
                  <div>
                    <Text variant="h5" className="mb-1">Office</Text>
                    <Text variant="body" className="text-neutral-600">
                      {content.contactInfo.address}<br />
                      Suite 100<br />
                      City, State 12345
                    </Text>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Text variant="h5" className="mb-4">Business Hours</Text>
                <Text variant="body" className="text-neutral-600">
                  Monday - Friday: 8:00 AM - 6:00 PM<br />
                  Saturday: 9:00 AM - 3:00 PM<br />
                  Sunday: Closed
                </Text>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Text variant="h3" className="mb-6">
                Send Us a Message
              </Text>
              <ContactForm onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

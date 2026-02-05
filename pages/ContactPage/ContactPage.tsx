import React from 'react';
import { Header } from '../../components/organisms/Header/Header';
import { Footer } from '../../components/organisms/Footer/Footer';
import { Hero } from '../../components/organisms/Hero/Hero';
import { ContactForm, ContactFormData } from '../../components/organisms/ContactForm/ContactForm';

export const ContactPage: React.FC = () => {
  const handleSubmit = async (data: ContactFormData) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPath="/contact" />
      <main className="flex-1">
        <Hero title="Get In Touch" description="Contact us for a free consultation." />
        <section className="py-16 container mx-auto px-4 max-w-2xl">
          <ContactForm onSubmit={handleSubmit} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

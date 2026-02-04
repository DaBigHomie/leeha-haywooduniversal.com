import { useState } from 'react';
import { EmailSignup } from '../shared/ui/components/EmailSignup';
import { BookingPolicy } from '../shared/ui/components/BookingPolicy';
import { MeltTestimonials } from '../shared/ui/components/MeltTestimonials';
import { AttorneyBio } from '../shared/ui/components/AttorneyBio';
import type { SiteConfig } from '../shared/types/config';

interface ContactPageProps {
  config: SiteConfig;
}

export function ContactPage({ config }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We will be in touch soon.');
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-display text-center mb-8">Get In Touch</h1>
      <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
        Have questions? We're here to help. Reach out to us and we'll respond as soon as possible.
      </p>
      
      {/* Attorney Bio Section */}
      {config.bookingExperience?.attorneyBio && (
        <div className="mb-24">
          <AttorneyBio attorney={config.bookingExperience.attorneyBio} variant="full" />
        </div>
      )}

      {/* Booking Policy Section */}
      {config.bookingExperience && (
        <div className="mb-16 max-w-4xl mx-auto">
          <BookingPolicy
            variant="inline"
            depositAmount={config.bookingExperience.depositAmount}
            depositPercentage={config.bookingExperience.depositPercentage}
            cancellationWindow={config.bookingExperience.cancellationWindow}
            rescheduleWindow={config.bookingExperience.rescheduleWindow}
            serviceName={config.name}
          />
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-24">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-display mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: config.theme.primaryColor }}
            >
              Send Message
            </button>
          </form>
        </div>
        
        {/* Contact Info */}
        <div>
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h2 className="text-3xl font-display mb-6">Contact Information</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-lg mb-1">Business Name</h3>
                <p>{config.content.footer.businessName}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Email</h3>
                <p>info@example.com</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Phone</h3>
                <p>(555) 123-4567</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Address</h3>
                <p>123 Main Street<br />Suite 100<br />City, ST 12345</p>
              </div>
            </div>
          </div>
          
          <EmailSignup 
            title={config.content.emailSignup.title}
            subtitle={config.content.emailSignup.subtitle}
            placeholder={config.content.emailSignup.placeholder}
            buttonText={config.content.emailSignup.buttonText}
          />
        </div>
      </div>

      {/* Testimonials Section */}
      {config.bookingExperience?.testimonials && (
        <div className="mt-24">
          <MeltTestimonials
            testimonials={config.bookingExperience.testimonials}
            title="Client Success Stories"
            subtitle="What our clients say about working with us"
            autoplay={true}
            autoplayInterval={6000}
          />
        </div>
      )}
    </main>
  );
}

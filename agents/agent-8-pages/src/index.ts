import fs from 'fs-extra';
import path from 'path';

class PageBuilder {
  private outputDir: string;
  private pagesDir: string;

  constructor() {
    this.outputDir = path.join(process.cwd(), '../../pages');
    this.pagesDir = this.outputDir;
  }

  async build() {
    console.log('📄 Building page templates...\n');

    // Ensure pages directory exists
    await fs.ensureDir(this.pagesDir);

    // Build all pages - content is inline for simplicity
    await this.createHomePage();
    await this.createServicesPage();
    await this.createGalleryPage();
    await this.createContactPage();
    await this.createProjectManagementPage();
    await this.createRoomsForRentPage();

    // Create index file
    await this.createPagesIndex();

    console.log('\n✅ Page templates complete!');
    console.log(`📁 Pages: ${this.pagesDir}`);
  }

  async createHomePage() {
    const dir = path.join(this.pagesDir, 'HomePage');
    await fs.ensureDir(dir);
    
    const content = `import React from 'react';
import { Header } from '../../components/organisms/Header/Header';
import { Footer } from '../../components/organisms/Footer/Footer';
import { Hero } from '../../components/organisms/Hero/Hero';
import { ServiceGrid } from '../../components/organisms/ServiceGrid/ServiceGrid';

export const HomePage: React.FC = () => {
  const services = [
    {
      id: 'painting',
      title: 'Professional Painting',
      description: 'Transform your space with expert painting services.',
    },
    {
      id: 'remodeling',
      title: 'Home Remodeling',
      description: 'Complete renovation services for your dream home.',
    },
    {
      id: 'property',
      title: 'Property Management',
      description: 'Comprehensive property management solutions.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPath="/" />
      <main className="flex-1">
        <Hero
          title="Building Excellence, One Project at a Time"
          subtitle="Haywood Universal Services"
          description="Professional painting, remodeling, and property management services."
          primaryCta={{
            text: 'Get a Free Quote',
            onClick: () => console.log('Navigate to contact'),
          }}
        />
        <ServiceGrid services={services} />
      </main>
      <Footer />
    </div>
  );
};
`;

    await fs.writeFile(path.join(dir, 'HomePage.tsx'), content);
    console.log('  ✅ HomePage created');
  }

  async createServicesPage() {
    const dir = path.join(this.pagesDir, 'ServicesPage');
    await fs.ensureDir(dir);
    
    const content = `import React from 'react';
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
`;

    await fs.writeFile(path.join(dir, 'ServicesPage.tsx'), content);
    console.log('  ✅ ServicesPage created');
  }

  async createGalleryPage() {
    const dir = path.join(this.pagesDir, 'GalleryPage');
    await fs.ensureDir(dir);
    
    const content = `import React, { useState } from 'react';
import { Header } from '../../components/organisms/Header/Header';
import { Footer } from '../../components/organisms/Footer/Footer';
import { Hero } from '../../components/organisms/Hero/Hero';
import { Button } from '../../components/atoms/Button/Button';

export const GalleryPage: React.FC = () => {
  const [filter, setFilter] = useState('all');

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPath="/gallery" />
      <main className="flex-1">
        <Hero title="Our Portfolio" description="Browse our completed projects." />
        <section className="py-16 container mx-auto px-4">
          <div className="flex gap-4 justify-center mb-8">
            <Button variant={filter === 'all' ? 'primary' : 'outline'} onClick={() => setFilter('all')}>
              All
            </Button>
            <Button variant={filter === 'painting' ? 'primary' : 'outline'} onClick={() => setFilter('painting')}>
              Painting
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {/* Gallery items would go here */}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
`;

    await fs.writeFile(path.join(dir, 'GalleryPage.tsx'), content);
    console.log('  ✅ GalleryPage created');
  }

  async createContactPage() {
    const dir = path.join(this.pagesDir, 'ContactPage');
    await fs.ensureDir(dir);
    
    const content = `import React from 'react';
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
`;

    await fs.writeFile(path.join(dir, 'ContactPage.tsx'), content);
    console.log('  ✅ ContactPage created');
  }

  async createProjectManagementPage() {
    const dir = path.join(this.pagesDir, 'ProjectManagementPage');
    await fs.ensureDir(dir);
    
    const content = `import React from 'react';
import { Header } from '../../components/organisms/Header/Header';
import { Footer } from '../../components/organisms/Footer/Footer';
import { Hero } from '../../components/organisms/Hero/Hero';
import { Text } from '../../components/atoms/Text/Text';

export const ProjectManagementPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPath="/project-management" />
      <main className="flex-1">
        <Hero title="Project Management" description="Professional project management services." />
        <section className="py-16 container mx-auto px-4">
          <Text variant="h2" className="mb-8 text-center">Our Process</Text>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Text variant="h3" className="mb-4">1. Consultation</Text>
              <Text variant="body">Initial project assessment and planning.</Text>
            </div>
            <div className="text-center">
              <Text variant="h3" className="mb-4">2. Execution</Text>
              <Text variant="body">Professional implementation of your project.</Text>
            </div>
            <div className="text-center">
              <Text variant="h3" className="mb-4">3. Completion</Text>
              <Text variant="body">Final walkthrough and quality assurance.</Text>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
`;

    await fs.writeFile(path.join(dir, 'ProjectManagementPage.tsx'), content);
    console.log('  ✅ ProjectManagementPage created');
  }

  async createRoomsForRentPage() {
    const dir = path.join(this.pagesDir, 'RoomsForRentPage');
    await fs.ensureDir(dir);
    
    const content = `import React from 'react';
import { Header } from '../../components/organisms/Header/Header';
import { Footer } from '../../components/organisms/Footer/Footer';
import { Hero } from '../../components/organisms/Hero/Hero';
import { Card } from '../../components/molecules/Card/Card';

export const RoomsForRentPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPath="/rooms-for-rent" />
      <main className="flex-1">
        <Hero title="Rooms for Rent" description="Quality rooms in safe neighborhoods." />
        <section className="py-16 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card 
              title="Master Bedroom" 
              description="Spacious room with private bathroom. $800/month."
            />
            <Card 
              title="Single Room" 
              description="Comfortable single room. $550/month."
            />
            <Card 
              title="Studio Apartment" 
              description="Fully furnished studio. $950/month."
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
`;

    await fs.writeFile(path.join(dir, 'RoomsForRentPage.tsx'), content);
    console.log('  ✅ RoomsForRentPage created');
  }

  async createPagesIndex() {
    const content = `export { HomePage } from './HomePage/HomePage';
export { ServicesPage } from './ServicesPage/ServicesPage';
export { GalleryPage } from './GalleryPage/GalleryPage';
export { ContactPage } from './ContactPage/ContactPage';
export { ProjectManagementPage } from './ProjectManagementPage/ProjectManagementPage';
export { RoomsForRentPage } from './RoomsForRentPage/RoomsForRentPage';
`;

    await fs.writeFile(path.join(this.pagesDir, 'index.ts'), content);
    console.log('  ✅ Pages index created');
  }
}

// Execute
const builder = new PageBuilder();
builder.build().catch(console.error);

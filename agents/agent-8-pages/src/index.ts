/**
 * Agent 8: Page Builder
 * Build page templates using composite components
 */

import fs from 'fs-extra';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface PageTemplate {
  name: string;
  route: string;
  code: string;
}

class PageBuilder {
  private outputDir: string;
  private pagesDir: string;
  private contentDataPath: string;

  constructor() {
    const projectRoot = path.resolve(__dirname, '../../..');
    this.outputDir = path.join(projectRoot, 'output', 'components');
    this.pagesDir = path.join(this.outputDir, 'pages');
    this.contentDataPath = path.join(projectRoot, 'output', 'content-data', 'content-inventory.json');
  }

  async build(): Promise<void> {
    await fs.ensureDir(this.pagesDir);

    console.log('📄 Building page templates...\n');

    // Load content data
    let contentData = null;
    if (await fs.pathExists(this.contentDataPath)) {
      contentData = await fs.readJson(this.contentDataPath);
    }

    const pages: PageTemplate[] = [
      this.buildHomePage(contentData),
      this.buildServicesPage(contentData),
      this.buildGalleryPage(contentData),
      this.buildContactPage(contentData),
      this.buildLayout(),
    ];

    // Create page files
    for (const page of pages) {
      await this.createPage(page);
    }

    // Create index file
    await this.createIndexFile(pages);

    // Create README
    await this.createReadme(pages);

    console.log('\n✅ Page templates built!\n');
    console.log(`📁 Output saved to: ${this.pagesDir}`);
  }

  private buildLayout(): PageTemplate {
    const code = `import React from 'react';
import { Header, type NavItem } from '../organisms/Header/Header';
import { Footer, type FooterLink } from '../organisms/Footer/Footer';

export interface LayoutProps {
  children: React.ReactNode;
  currentPath?: string;
}

const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Project Management', href: '/project-management' },
  { label: 'Contact', href: '/contact' },
];

const footerLinks: FooterLink[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
];

export const Layout: React.FC<LayoutProps> = ({ children, currentPath = '/' }) => {
  const navWithActive = navigation.map(item => ({
    ...item,
    active: item.href === currentPath,
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        navigation={navWithActive}
        ctaLabel="Get a Quote"
        ctaHref="/contact"
      />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer
        links={footerLinks}
        copyright="© 2026 Haywood Universal. All rights reserved."
      />
    </div>
  );
};
`;

    return { name: 'Layout', route: '_layout', code };
  }

  private buildHomePage(contentData: any): PageTemplate {
    const code = `import React from 'react';
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
`;

    return { name: 'HomePage', route: '/', code };
  }

  private buildServicesPage(contentData: any): PageTemplate {
    const code = `import React from 'react';
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
`;

    return { name: 'ServicesPage', route: '/services', code };
  }

  private buildGalleryPage(contentData: any): PageTemplate {
    const code = `import React, { useState } from 'react';
import { Layout } from './Layout';
import { Hero } from '../organisms/Hero/Hero';
import { Text } from '../atoms/Text/Text';

const projects = [
  { id: '1', title: 'Residential Renovation', category: 'residential', image: '/images/project-1.jpg' },
  { id: '2', title: 'Commercial Building', category: 'commercial', image: '/images/project-2.jpg' },
  { id: '3', title: 'Kitchen Remodel', category: 'residential', image: '/images/project-3.jpg' },
  { id: '4', title: 'Office Space', category: 'commercial', image: '/images/project-4.jpg' },
  { id: '5', title: 'Bathroom Upgrade', category: 'residential', image: '/images/project-5.jpg' },
  { id: '6', title: 'Retail Store', category: 'commercial', image: '/images/project-6.jpg' },
];

export const GalleryPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial'>('all');

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <Layout currentPath="/gallery">
      <Hero
        title="Our Portfolio"
        subtitle="Explore our completed projects and see our craftsmanship"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setFilter('all')}
              className={\`px-6 py-2 rounded-lg font-medium transition-colors \${
                filter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
              }\`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter('residential')}
              className={\`px-6 py-2 rounded-lg font-medium transition-colors \${
                filter === 'residential'
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
              }\`}
            >
              Residential
            </button>
            <button
              onClick={() => setFilter('commercial')}
              className={\`px-6 py-2 rounded-lg font-medium transition-colors \${
                filter === 'commercial'
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
              }\`}
            >
              Commercial
            </button>
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="group cursor-pointer">
                <div className="aspect-video bg-neutral-200 rounded-lg overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <Text variant="h5" className="mt-3">
                  {project.title}
                </Text>
                <Text variant="caption" className="capitalize">
                  {project.category}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};
`;

    return { name: 'GalleryPage', route: '/gallery', code };
  }

  private buildContactPage(contentData: any): PageTemplate {
    const code = `import React from 'react';
import { Layout } from './Layout';
import { Hero } from '../organisms/Hero/Hero';
import { ContactForm, type ContactFormData } from '../organisms/ContactForm/ContactForm';
import { Text } from '../atoms/Text/Text';
import { Icon } from '../atoms/Icon/Icon';

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
        title="Get in Touch"
        subtitle="Have a project in mind? We'd love to hear from you"
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
                      (555) 123-4567
                    </Text>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Icon name="mail" size={24} color="#2563eb" />
                  <div>
                    <Text variant="h5" className="mb-1">Email</Text>
                    <Text variant="body" className="text-neutral-600">
                      info@haywooduniversal.com
                    </Text>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Icon name="home" size={24} color="#2563eb" />
                  <div>
                    <Text variant="h5" className="mb-1">Office</Text>
                    <Text variant="body" className="text-neutral-600">
                      123 Business St<br />
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
`;

    return { name: 'ContactPage', route: '/contact', code };
  }

  private async createPage(page: PageTemplate): Promise<void> {
    await fs.writeFile(
      path.join(this.pagesDir, `${page.name}.tsx`),
      page.code
    );

    console.log(`✅ Created ${page.name} (${page.route})`);
  }

  private async createIndexFile(pages: PageTemplate[]): Promise<void> {
    const exports = pages
      .map(p => `export * from './${p.name}';`)
      .join('\n');

    await fs.writeFile(
      path.join(this.pagesDir, 'index.ts'),
      exports
    );
  }

  private async createReadme(pages: PageTemplate[]): Promise<void> {
    const readme = `# Page Templates

**Generated**: ${new Date().toISOString()}

## Pages

${pages.map(p => `- **${p.name}**: \`${p.route}\``).join('\n')}

## Usage

\`\`\`tsx
import { HomePage, ServicesPage, GalleryPage, ContactPage } from './pages';

// Next.js App Router example:
// app/page.tsx
export default function Page() {
  return <HomePage />;
}

// app/services/page.tsx
export default function Page() {
  return <ServicesPage />;
}
\`\`\`

## Structure

All pages use the \`Layout\` component which includes:
- Header with navigation
- Footer with links
- Responsive design
- Consistent branding

## Customization

To customize page content:
1. Edit the page component directly
2. Modify service data, project lists, etc.
3. Adjust styling via TailwindCSS classes
4. Add new sections using atomic/composite components

## Next.js Integration

\`\`\`bash
# Create Next.js 15 app
npx create-next-app@latest my-app --typescript --tailwind --app

# Copy components to your Next.js app
cp -r output/components/* my-app/src/components/

# Use in app router
# app/page.tsx
import { HomePage } from '@/components/pages';
export default HomePage;
\`\`\`
`;

    await fs.writeFile(
      path.join(this.pagesDir, 'README.md'),
      readme
    );
  }
}

// Main execution
async function main() {
  const builder = new PageBuilder();

  try {
    await builder.build();
  } catch (error) {
    console.error('❌ Page build failed:', error);
    process.exit(1);
  }
}

export { PageBuilder };

main();

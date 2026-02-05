/**
 * Agent 7: Composite Component Developer
 * Build molecules (FormField, Card, NavLink) and organisms (Header, Footer, Hero, ContactForm, ServiceGrid)
 */

import fs from 'fs-extra';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ComponentTemplate {
  name: string;
  type: 'molecule' | 'organism';
  code: string;
  story?: string;
}

class CompositeComponentBuilder {
  private outputDir: string;
  private moleculesDir: string;
  private organismsDir: string;

  constructor() {
    const projectRoot = path.resolve(__dirname, '../../..');
    this.outputDir = path.join(projectRoot, 'output', 'components');
    this.moleculesDir = path.join(this.outputDir, 'molecules');
    this.organismsDir = path.join(this.outputDir, 'organisms');
  }

  async build(): Promise<void> {
    await fs.ensureDir(this.moleculesDir);
    await fs.ensureDir(this.organismsDir);

    console.log('🧬 Building composite components...\n');

    const molecules = this.buildMolecules();
    const organisms = this.buildOrganisms();

    // Create molecules
    for (const component of molecules) {
      await this.createComponent(component, 'molecule');
    }

    // Create organisms
    for (const component of organisms) {
      await this.createComponent(component, 'organism');
    }

    // Create index files
    await this.createIndexFile(molecules, 'molecules');
    await this.createIndexFile(organisms, 'organisms');

    // Create README
    await this.createReadme([...molecules, ...organisms]);

    console.log('\n✅ Composite components built!\n');
    console.log(`📁 Molecules: ${this.moleculesDir}`);
    console.log(`📁 Organisms: ${this.organismsDir}`);
  }

  private buildMolecules(): ComponentTemplate[] {
    return [
      {
        name: 'FormField',
        type: 'molecule' as const,
        code: `import React from 'react';
import { Input, type InputProps } from '../atoms/Input/Input';
import { Text } from '../atoms/Text/Text';

export interface FormFieldProps extends Omit<InputProps, 'label' | 'error'> {
  label: string;
  error?: string;
  helpText?: string;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  helpText,
  required,
  ...inputProps
}) => {
  return (
    <div className="w-full">
      <Input
        label={label}
        error={error}
        required={required}
        fullWidth
        {...inputProps}
      />
      {helpText && !error && (
        <Text variant="caption" className="mt-1">
          {helpText}
        </Text>
      )}
    </div>
  );
};
`,
      },
      {
        name: 'Card',
        type: 'molecule' as const,
        code: `import React from 'react';
import { Text } from '../atoms/Text/Text';
import { Button, type ButtonProps } from '../atoms/Button/Button';

export interface CardProps {
  image?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: ButtonProps['variant'];
  };
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div className={\`rounded-lg overflow-hidden shadow-lg bg-white transition-transform hover:scale-105 \${className}\`}>
      {image && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <Text variant="h4" className="mb-2">
          {title}
        </Text>
        {description && (
          <Text variant="body" className="text-neutral-600 mb-4">
            {description}
          </Text>
        )}
        {action && (
          <Button
            variant={action.variant || 'primary'}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
};
`,
      },
      {
        name: 'NavLink',
        type: 'molecule' as const,
        code: `import React from 'react';

export interface NavLinkProps {
  href: string;
  active?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  active = false,
  children,
  className = '',
}) => {
  const baseStyles = 'px-4 py-2 text-base font-medium transition-colors rounded-md';
  const activeStyles = active
    ? 'text-primary-600 bg-primary-50'
    : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50';

  return (
    <a
      href={href}
      className={\`\${baseStyles} \${activeStyles} \${className}\`}
      aria-current={active ? 'page' : undefined}
    >
      {children}
    </a>
  );
};
`,
      },
    ];
  }

  private buildOrganisms(): ComponentTemplate[] {
    return [
      {
        name: 'Header',
        type: 'organism' as const,
        code: `import React, { useState } from 'react';
import { NavLink, type NavLinkProps } from '../molecules/NavLink/NavLink';
import { Button } from '../atoms/Button/Button';
import { Icon } from '../atoms/Icon/Icon';

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface HeaderProps {
  logo?: string;
  navigation: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
}

export const Header: React.FC<HeaderProps> = ({
  logo,
  navigation,
  ctaLabel,
  ctaHref,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {logo ? (
              <img src={logo} alt="Logo" className="h-8" />
            ) : (
              <span className="text-xl font-bold text-primary-600">Logo</span>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigation.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                active={item.active}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA Button */}
          {ctaLabel && ctaHref && (
            <div className="hidden md:block">
              <Button variant="primary" onClick={() => window.location.href = ctaHref}>
                {ctaLabel}
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <Icon name={mobileMenuOpen ? 'x' : 'menu'} size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                active={item.active}
                className="block"
              >
                {item.label}
              </NavLink>
            ))}
            {ctaLabel && ctaHref && (
              <Button
                variant="primary"
                onClick={() => window.location.href = ctaHref}
                className="w-full mt-4"
              >
                {ctaLabel}
              </Button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};
`,
      },
      {
        name: 'Footer',
        type: 'organism' as const,
        code: `import React from 'react';
import { NavLink } from '../molecules/NavLink/NavLink';
import { Text } from '../atoms/Text/Text';
import { Icon } from '../atoms/Icon/Icon';

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}

export interface FooterProps {
  links: FooterLink[];
  social?: SocialLink[];
  copyright?: string;
}

export const Footer: React.FC<FooterProps> = ({
  links,
  social,
  copyright,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Links */}
          <div>
            <Text variant="h5" className="mb-4 text-white">
              Quick Links
            </Text>
            <nav className="space-y-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-neutral-300 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          {social && social.length > 0 && (
            <div>
              <Text variant="h5" className="mb-4 text-white">
                Connect With Us
              </Text>
              <div className="flex space-x-4">
                {social.map((item) => (
                  <a
                    key={item.platform}
                    href={item.href}
                    className="text-neutral-300 hover:text-white transition-colors"
                    aria-label={item.platform}
                  >
                    <Icon name={item.icon} size={24} color="currentColor" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Copyright */}
          <div>
            <Text variant="body" className="text-neutral-400">
              {copyright || \`© \${currentYear} All rights reserved.\`}
            </Text>
          </div>
        </div>
      </div>
    </footer>
  );
};
`,
      },
      {
        name: 'Hero',
        type: 'organism' as const,
        code: `import React from 'react';
import { Text } from '../atoms/Text/Text';
import { Button } from '../atoms/Button/Button';

export interface HeroProps {
  title: string;
  subtitle?: string;
  image?: string;
  cta?: {
    label: string;
    onClick: () => void;
  };
  secondaryCta?: {
    label: string;
    onClick: () => void;
  };
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  image,
  cta,
  secondaryCta,
}) => {
  return (
    <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {image && (
        <div className="absolute inset-0 z-0">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Text
          variant="h1"
          color={image ? 'white' : undefined}
          className="mb-6"
        >
          {title}
        </Text>

        {subtitle && (
          <Text
            variant="h4"
            color={image ? 'white' : undefined}
            className="mb-8 font-normal"
          >
            {subtitle}
          </Text>
        )}

        {(cta || secondaryCta) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {cta && (
              <Button
                variant="primary"
                size="lg"
                onClick={cta.onClick}
              >
                {cta.label}
              </Button>
            )}
            {secondaryCta && (
              <Button
                variant="outline"
                size="lg"
                onClick={secondaryCta.onClick}
              >
                {secondaryCta.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
`,
      },
      {
        name: 'ContactForm',
        type: 'organism' as const,
        code: `import React, { useState } from 'react';
import { FormField } from '../molecules/FormField/FormField';
import { Button } from '../atoms/Button/Button';
import { Text } from '../atoms/Text/Text';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  loading?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await onSubmit(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <Text variant="h3" className="mb-4 text-success-600">
          Thank you for contacting us!
        </Text>
        <Text variant="body" className="mb-6">
          We'll get back to you as soon as possible.
        </Text>
        <Button onClick={() => setSubmitted(false)}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <FormField
        label="Name"
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
        required
      />

      <FormField
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
        required
      />

      <FormField
        label="Phone (Optional)"
        type="tel"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />

      <div className="w-full">
        <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
          Message *
        </label>
        <textarea
          id="message"
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={\`w-full px-3 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 \${
            errors.message ? 'border-error-500' : 'border-neutral-300'
          }\`}
        />
        {errors.message && (
          <Text variant="caption" className="text-error-600 mt-1">
            {errors.message}
          </Text>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
};
`,
      },
      {
        name: 'ServiceGrid',
        type: 'organism' as const,
        code: `import React from 'react';
import { Card, type CardProps } from '../molecules/Card/Card';

export interface Service {
  id: string;
  title: string;
  description: string;
  image?: string;
  action?: CardProps['action'];
}

export interface ServiceGridProps {
  services: Service[];
  columns?: 1 | 2 | 3 | 4;
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({
  services,
  columns = 3,
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={\`grid \${gridCols[columns]} gap-6\`}>
      {services.map((service) => (
        <Card
          key={service.id}
          title={service.title}
          description={service.description}
          image={service.image}
          action={service.action}
        />
      ))}
    </div>
  );
};
`,
      },
    ];
  }

  private async createComponent(
    component: ComponentTemplate,
    type: 'molecule' | 'organism'
  ): Promise<void> {
    const targetDir = type === 'molecule' ? this.moleculesDir : this.organismsDir;
    const componentDir = path.join(targetDir, component.name);
    await fs.ensureDir(componentDir);

    // Write component file
    await fs.writeFile(
      path.join(componentDir, `${component.name}.tsx`),
      component.code
    );

    console.log(`✅ Created ${component.name} (${type})`);
  }

  private async createIndexFile(
    components: ComponentTemplate[],
    type: 'molecules' | 'organisms'
  ): Promise<void> {
    const targetDir = type === 'molecules' ? this.moleculesDir : this.organismsDir;
    const exports = components
      .map(c => `export * from './${c.name}/${c.name}';`)
      .join('\n');

    await fs.writeFile(
      path.join(targetDir, 'index.ts'),
      exports
    );
  }

  private async createReadme(components: ComponentTemplate[]): Promise<void> {
    const molecules = components.filter(c => c.type === 'molecule');
    const organisms = components.filter(c => c.type === 'organism');

    const readme = `# Composite Components

**Generated**: ${new Date().toISOString()}

## Molecules (${molecules.length})

${molecules.map(c => `- **${c.name}**: Combination of atomic elements`).join('\n')}

## Organisms (${organisms.length})

${organisms.map(c => `- **${c.name}**: Complex UI section`).join('\n')}

## Usage

\`\`\`tsx
import { Header, Hero, ServiceGrid, ContactForm } from './organisms';
import { Card, FormField } from './molecules';

function HomePage() {
  return (
    <>
      <Header
        navigation={[
          { label: 'Home', href: '/', active: true },
          { label: 'Services', href: '/services' },
          { label: 'Contact', href: '/contact' },
        ]}
        ctaLabel="Get Started"
        ctaHref="/contact"
      />
      
      <Hero
        title="Welcome to Our Site"
        subtitle="Professional services for your needs"
        cta={{ label: 'Learn More', onClick: () => {} }}
      />
      
      <ServiceGrid
        services={[
          { id: '1', title: 'Service 1', description: 'Description' },
          { id: '2', title: 'Service 2', description: 'Description' },
        ]}
      />
    </>
  );
}
\`\`\`
`;

    await fs.writeFile(
      path.join(this.outputDir, 'COMPOSITE_README.md'),
      readme
    );
  }
}

// Main execution
async function main() {
  const builder = new CompositeComponentBuilder();

  try {
    await builder.build();
  } catch (error) {
    console.error('❌ Composite component build failed:', error);
    process.exit(1);
  }
}

export { CompositeComponentBuilder };

main();

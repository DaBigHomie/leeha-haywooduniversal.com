import fs from 'fs-extra';
import path from 'path';

class CompositeComponentDeveloper {
  private outputDir: string;
  private moleculesDir: string;
  private organismsDir: string;

  constructor() {
    this.outputDir = path.join(process.cwd(), '../../components');
    this.moleculesDir = path.join(this.outputDir, 'molecules');
    this.organismsDir = path.join(this.outputDir, 'organisms');
  }

  async build() {
    console.log('🧩 Building composite components...\n');

    // Ensure directories exist
    await fs.ensureDir(this.moleculesDir);
    await fs.ensureDir(this.organismsDir);

    // Build molecules
    await this.createFormField();
    await this.createCard();
    await this.createNavLink();

    // Build organisms
    await this.createHeader();
    await this.createFooter();
    await this.createHero();
    await this.createContactForm();
    await this.createServiceGrid();

    // Create index files
    await this.createMoleculesIndex();
    await this.createOrganismsIndex();

    console.log('\n✅ Composite components complete!');
    console.log(`📁 Molecules: ${this.moleculesDir}`);
    console.log(`📁 Organisms: ${this.organismsDir}`);
  }

  // MOLECULES

  async createFormField() {
    const dir = path.join(this.moleculesDir, 'FormField');
    await fs.ensureDir(dir);

    const content = `import React from 'react';
import { Input } from '../../atoms/Input/Input';
import { Text } from '../../atoms/Text/Text';

export interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'password' | 'number';
  placeholder?: string;
  value?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  error,
  required,
  disabled,
  onChange,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block mb-2">
        <Text variant="body" weight="medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Text>
      </label>
      
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        error={!!error}
        disabled={disabled}
        onChange={onChange}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? \`\${name}-error\` : undefined}
      />
      
      {error && (
        <div id={\`\${name}-error\`} className="mt-1" role="alert">
          <Text variant="small" color="text-red-500">
            {error}
          </Text>
        </div>
      )}
    </div>
  );
};
`;

    await fs.writeFile(path.join(dir, 'FormField.tsx'), content);
    console.log('  ✅ FormField component created');
  }

  async createCard() {
    const dir = path.join(this.moleculesDir, 'Card');
    await fs.ensureDir(dir);

    const content = `import React from 'react';
import { Text } from '../../atoms/Text/Text';
import { Button } from '../../atoms/Button/Button';

export interface CardProps {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  imageAlt = '',
  buttonText,
  onButtonClick,
  className = '',
}) => {
  return (
    <div className={\`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 \${className}\`}>
      {image && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}
      
      <div className="p-6">
        <Text variant="h3" className="mb-3">
          {title}
        </Text>
        
        <Text variant="body" color="text-gray-600" className="mb-4">
          {description}
        </Text>
        
        {buttonText && (
          <Button
            variant="outline"
            size="sm"
            onClick={onButtonClick}
            className="w-full sm:w-auto"
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};
`;

    await fs.writeFile(path.join(dir, 'Card.tsx'), content);
    console.log('  ✅ Card component created');
  }

  async createNavLink() {
    const dir = path.join(this.moleculesDir, 'NavLink');
    await fs.ensureDir(dir);

    const content = `import React from 'react';
import { Text } from '../../atoms/Text/Text';

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  active = false,
  onClick,
  className = '',
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={\`
        inline-block px-4 py-2 rounded-md transition-all duration-200
        hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500
        \${active ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:text-gray-900'}
        \${className}
      \`}
      aria-current={active ? 'page' : undefined}
    >
      <Text variant="body" weight={active ? 'semibold' : 'normal'}>
        {children}
      </Text>
    </a>
  );
};
`;

    await fs.writeFile(path.join(dir, 'NavLink.tsx'), content);
    console.log('  ✅ NavLink component created');
  }

  // ORGANISMS

  async createHeader() {
    const dir = path.join(this.organismsDir, 'Header');
    await fs.ensureDir(dir);

    const content = `import React, { useState } from 'react';
import { Text } from '../../atoms/Text/Text';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { NavLink } from '../../molecules/NavLink/NavLink';

export interface HeaderProps {
  logoText?: string;
  navItems?: Array<{ label: string; href: string }>;
  ctaText?: string;
  onCtaClick?: () => void;
  currentPath?: string;
}

export const Header: React.FC<HeaderProps> = ({
  logoText = 'Haywood Universal',
  navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ],
  ctaText = 'Get Quote',
  onCtaClick,
  currentPath = '/',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <Text variant="h3" weight="bold" color="text-gray-900">
              {logoText}
            </Text>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                active={currentPath === item.href}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button onClick={onCtaClick} size="sm">
              {ctaText}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            <Icon name={mobileMenuOpen ? 'close' : 'menu'} size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  active={currentPath === item.href}
                  className="w-full text-left"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <Button onClick={onCtaClick} className="w-full mt-4">
                {ctaText}
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
`;

    await fs.writeFile(path.join(dir, 'Header.tsx'), content);
    console.log('  ✅ Header component created');
  }

  async createFooter() {
    const dir = path.join(this.organismsDir, 'Footer');
    await fs.ensureDir(dir);

    const content = `import React from 'react';
import { Text } from '../../atoms/Text/Text';
import { Icon } from '../../atoms/Icon/Icon';
import { NavLink } from '../../molecules/NavLink/NavLink';

export interface FooterProps {
  companyName?: string;
  navItems?: Array<{ label: string; href: string }>;
  socialLinks?: Array<{ platform: 'facebook' | 'instagram' | 'linkedin'; url: string }>;
  contactInfo?: {
    phone?: string;
    email?: string;
    address?: string;
  };
}

export const Footer: React.FC<FooterProps> = ({
  companyName = 'Haywood Universal',
  navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ],
  socialLinks = [],
  contactInfo = {},
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <Text variant="h3" weight="bold" color="text-white" className="mb-4">
              {companyName}
            </Text>
            {contactInfo.phone && (
              <div className="flex items-center gap-2 mb-2">
                <Icon name="phone" size={20} />
                <a href={\`tel:\${contactInfo.phone}\`} className="hover:text-blue-400 transition-colors">
                  <Text variant="body" color="text-gray-300">
                    {contactInfo.phone}
                  </Text>
                </a>
              </div>
            )}
            {contactInfo.email && (
              <div className="flex items-center gap-2 mb-2">
                <Icon name="mail" size={20} />
                <a href={\`mailto:\${contactInfo.email}\`} className="hover:text-blue-400 transition-colors">
                  <Text variant="body" color="text-gray-300">
                    {contactInfo.email}
                  </Text>
                </a>
              </div>
            )}
            {contactInfo.address && (
              <div className="flex items-start gap-2">
                <Icon name="location" size={20} className="mt-1" />
                <Text variant="body" color="text-gray-300">
                  {contactInfo.address}
                </Text>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <Text variant="h4" weight="semibold" color="text-white" className="mb-4">
              Quick Links
            </Text>
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <NavLink key={item.href} href={item.href} className="text-gray-300 hover:text-white">
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <Text variant="h4" weight="semibold" color="text-white" className="mb-4">
              Connect With Us
            </Text>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                  aria-label={\`Visit our \${link.platform}\`}
                >
                  <Icon name={link.platform} size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <Text variant="small" color="text-gray-400">
            © {currentYear} {companyName}. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
};
`;

    await fs.writeFile(path.join(dir, 'Footer.tsx'), content);
    console.log('  ✅ Footer component created');
  }

  async createHero() {
    const dir = path.join(this.organismsDir, 'Hero');
    await fs.ensureDir(dir);

    const content = `import React from 'react';
import { Text } from '../../atoms/Text/Text';
import { Button } from '../../atoms/Button/Button';

export interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCta?: {
    text: string;
    onClick: () => void;
  };
  secondaryCta?: {
    text: string;
    onClick: () => void;
  };
  backgroundImage?: string;
  overlay?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  backgroundImage,
  overlay = true,
}) => {
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center">
      {/* Background Image */}
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: \`url(\${backgroundImage})\` }}
          />
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
          )}
        </>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {subtitle && (
          <Text
            variant="body"
            weight="semibold"
            color={backgroundImage ? 'text-blue-400' : 'text-blue-600'}
            className="mb-4"
          >
            {subtitle}
          </Text>
        )}

        <Text
          variant="h1"
          weight="bold"
          color={backgroundImage ? 'text-white' : 'text-gray-900'}
          className="mb-6 max-w-4xl mx-auto"
        >
          {title}
        </Text>

        {description && (
          <Text
            variant="body"
            color={backgroundImage ? 'text-gray-200' : 'text-gray-600'}
            className="mb-8 max-w-2xl mx-auto text-lg"
          >
            {description}
          </Text>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {primaryCta && (
            <Button
              onClick={primaryCta.onClick}
              size="lg"
              className="w-full sm:w-auto"
            >
              {primaryCta.text}
            </Button>
          )}
          {secondaryCta && (
            <Button
              variant="outline"
              onClick={secondaryCta.onClick}
              size="lg"
              className="w-full sm:w-auto"
            >
              {secondaryCta.text}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
`;

    await fs.writeFile(path.join(dir, 'Hero.tsx'), content);
    console.log('  ✅ Hero component created');
  }

  async createContactForm() {
    const dir = path.join(this.organismsDir, 'ContactForm');
    await fs.ensureDir(dir);

    const content = `import React, { useState } from 'react';
import { Text } from '../../atoms/Text/Text';
import { Button } from '../../atoms/Button/Button';
import { FormField } from '../../molecules/FormField/FormField';

export interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void> | void;
  successMessage?: string;
  errorMessage?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  successMessage = 'Thank you! We will get back to you soon.',
  errorMessage = 'Something went wrong. Please try again.',
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      setSubmitStatus('success');
      // Reset form
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md">
      <Text variant="h2" className="mb-6 text-center">
        Get In Touch
      </Text>

      <div className="space-y-4">
        <FormField
          label="Name"
          name="name"
          type="text"
          placeholder="John Doe"
          value={formData.name}
          error={errors.name}
          required
          onChange={handleChange('name')}
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          error={errors.email}
          required
          onChange={handleChange('email')}
        />

        <FormField
          label="Phone"
          name="phone"
          type="tel"
          placeholder="(123) 456-7890"
          value={formData.phone}
          error={errors.phone}
          onChange={handleChange('phone')}
        />

        <div className="w-full">
          <label htmlFor="message" className="block mb-2">
            <Text variant="body" weight="medium">
              Message <span className="text-red-500">*</span>
            </Text>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Tell us about your project..."
            value={formData.message}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, message: e.target.value }));
              if (errors.message) {
                setErrors((prev) => ({ ...prev, message: undefined }));
              }
            }}
            className={\`
              w-full px-4 py-2 border rounded-md
              focus:outline-none focus:ring-2 focus:ring-blue-500
              \${errors.message ? 'border-red-500' : 'border-gray-300'}
            \`}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <div id="message-error" className="mt-1" role="alert">
              <Text variant="small" color="text-red-500">
                {errors.message}
              </Text>
            </div>
          )}
        </div>
      </div>

      {submitStatus === 'success' && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md" role="status">
          <Text variant="body" color="text-green-700">
            {successMessage}
          </Text>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md" role="alert">
          <Text variant="body" color="text-red-700">
            {errorMessage}
          </Text>
        </div>
      )}

      <Button
        type="submit"
        loading={isSubmitting}
        disabled={isSubmitting}
        className="w-full mt-6"
        size="lg"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
};
`;

    await fs.writeFile(path.join(dir, 'ContactForm.tsx'), content);
    console.log('  ✅ ContactForm component created');
  }

  async createServiceGrid() {
    const dir = path.join(this.organismsDir, 'ServiceGrid');
    await fs.ensureDir(dir);

    const content = `import React from 'react';
import { Text } from '../../atoms/Text/Text';
import { Card } from '../../molecules/Card/Card';

export interface Service {
  id: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export interface ServiceGridProps {
  title?: string;
  subtitle?: string;
  services: Service[];
  columns?: 2 | 3 | 4;
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({
  title = 'Our Services',
  subtitle,
  services,
  columns = 3,
}) => {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          {subtitle && (
            <Text variant="body" weight="semibold" color="text-blue-600" className="mb-2">
              {subtitle}
            </Text>
          )}
          <Text variant="h2" weight="bold" className="mb-4">
            {title}
          </Text>
        </div>

        {/* Services Grid */}
        <div className={\`grid grid-cols-1 \${gridCols[columns]} gap-6\`}>
          {services.map((service) => (
            <Card
              key={service.id}
              title={service.title}
              description={service.description}
              image={service.image}
              imageAlt={service.imageAlt}
              buttonText={service.buttonText}
              onButtonClick={service.onButtonClick}
            />
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-12">
            <Text variant="body" color="text-gray-500">
              No services available at the moment.
            </Text>
          </div>
        )}
      </div>
    </section>
  );
};
`;

    await fs.writeFile(path.join(dir, 'ServiceGrid.tsx'), content);
    console.log('  ✅ ServiceGrid component created');
  }

  // INDEX FILES

  async createMoleculesIndex() {
    const content = `export { FormField } from './FormField/FormField';
export type { FormFieldProps } from './FormField/FormField';

export { Card } from './Card/Card';
export type { CardProps } from './Card/Card';

export { NavLink } from './NavLink/NavLink';
export type { NavLinkProps } from './NavLink/NavLink';
`;

    await fs.writeFile(path.join(this.moleculesDir, 'index.ts'), content);
    console.log('  ✅ Molecules index created');
  }

  async createOrganismsIndex() {
    const content = `export { Header } from './Header/Header';
export type { HeaderProps } from './Header/Header';

export { Footer } from './Footer/Footer';
export type { FooterProps } from './Footer/Footer';

export { Hero } from './Hero/Hero';
export type { HeroProps } from './Hero/Hero';

export { ContactForm } from './ContactForm/ContactForm';
export type { ContactFormProps, ContactFormData } from './ContactForm/ContactForm';

export { ServiceGrid } from './ServiceGrid/ServiceGrid';
export type { ServiceGridProps, Service } from './ServiceGrid/ServiceGrid';
`;

    await fs.writeFile(path.join(this.organismsDir, 'index.ts'), content);
    console.log('  ✅ Organisms index created');
  }
}

// Execute
const developer = new CompositeComponentDeveloper();
developer.build().catch(console.error);

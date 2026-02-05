// Generated Component Types
// DO NOT EDIT MANUALLY

import { ReactNode } from 'react';

export interface ButtonProps {
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'outline';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Button content */
  children: React.ReactNode;
}

export interface InputProps {
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'tel';
  /** Placeholder text */
  placeholder?: string;
  /** Controlled value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Required field */
  required?: boolean;
}

export interface TextProps {
  /** Text style */
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  /** Text color */
  color?: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Text content */
  children: React.ReactNode;
}

export interface IconProps {
  /** Icon identifier */
  name: string;
  /** Icon size in pixels */
  size?: number;
  /** Icon color */
  color?: string;
}

export interface FormFieldProps {
  /** Field label */
  label: string;
  /** Validation error message */
  error?: string;
  /** Required field */
  required?: boolean;
  /** Input element */
  children: React.ReactNode;
}

export interface CardProps {
  /** Card image URL */
  image?: string;
  /** Card title */
  title: string;
  /** Card description */
  description?: string;
  /** CTA button */
  action?: React.ReactNode;
}

export interface NavLinkProps {
  /** Link destination */
  href: string;
  /** Active state */
  active?: boolean;
  /** Link text */
  children: React.ReactNode;
}

export interface HeaderProps {
  /** Logo image URL */
  logo?: string;
  /** Navigation items */
  navigation: NavItem[];
  /** Header actions */
  actions?: React.ReactNode;
}

export interface FooterProps {
  /** Footer links */
  links: NavItem[];
  /** Social media links */
  social?: SocialLink[];
  /** Copyright text */
  copyright?: string;
}

export interface HeroProps {
  /** Hero title */
  title: string;
  /** Hero subtitle */
  subtitle?: string;
  /** Background image */
  image?: string;
  /** Call to action */
  cta?: React.ReactNode;
}

export interface ContactFormProps {
  /** Form submission handler */
  onSubmit: (data: ContactData) => void;
  /** Loading state */
  loading?: boolean;
}

export interface ServiceGridProps {
  /** Services to display */
  services: Service[];
  /** Grid columns */
  columns?: number;
}

export interface PageLayoutProps {
  /** Page content */
  children: React.ReactNode;
  /** Page title */
  title?: string;
}

export interface ServicePageProps {
  /** Service data */
  service: Service;
}


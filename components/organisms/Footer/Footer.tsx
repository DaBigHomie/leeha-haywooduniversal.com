import React from 'react';
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
                <a href={`tel:${contactInfo.phone}`} className="hover:text-blue-400 transition-colors">
                  <Text variant="body" color="text-gray-300">
                    {contactInfo.phone}
                  </Text>
                </a>
              </div>
            )}
            {contactInfo.email && (
              <div className="flex items-center gap-2 mb-2">
                <Icon name="mail" size={20} />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-blue-400 transition-colors">
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
                  aria-label={`Visit our ${link.platform}`}
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

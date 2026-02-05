import React from 'react';
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
              {copyright || `© ${currentYear} All rights reserved.`}
            </Text>
          </div>
        </div>
      </div>
    </footer>
  );
};

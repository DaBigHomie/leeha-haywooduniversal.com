import React, { useState } from 'react';
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

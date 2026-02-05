import React, { useState } from 'react';
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

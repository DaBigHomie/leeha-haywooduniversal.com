import React from 'react';
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

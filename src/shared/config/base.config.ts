import type { SiteConfig } from '../types/config';

/**
 * Base configuration for Haywood Universal site
 * This serves as the template for creating 20x variations
 */
export const baseConfig: SiteConfig = {
  id: 'haywood-universal-01',
  name: 'Haywood Universal',
  businessType: 'Multi-Service Business',
  theme: {
    primaryColor: '#f8b8a7',
    fonts: {
      display: 'Playfair Display',
      body: 'Noto Sans',
    },
  },
  navigation: {
    logo: 'Haywood Universal',
    items: [
      { text: 'Home', href: '/' },
      { text: 'Project Management', href: '/project-management' },
      { text: 'Contact Us', href: '/contact' },
      {
        text: 'Purchase Merch',
        href: '/merch',
        children: [
          { text: 'Apparel', href: '/merch/apparel' },
          { text: 'Accessories', href: '/merch/accessories' },
        ],
      },
      { text: 'Gallery', href: '/gallery' },
      {
        text: 'Services',
        href: '/services',
        children: [
          { text: 'All Services', href: '/services' },
          { text: 'Consulting', href: '/services/consulting' },
          { text: 'Training', href: '/services/training' },
        ],
      },
      { text: 'Rooms for Rent', href: '/rooms' },
    ],
    accountMenu: [
      { text: 'Sign In', href: '/account/signin' },
      { text: 'Create Account', href: '/account/create' },
      { text: 'Bookings', href: '/account/bookings' },
    ],
  },
  content: {
    hero: {
      title: 'Making Life Easy For You',
      subtitle: 'Professional services tailored to your needs',
      ctaText: 'Get Started',
      backgroundImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920',
    },
    services: [
      {
        title: 'Project Management',
        description: 'Expert guidance for your business projects',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
        link: '/project-management',
      },
      {
        title: 'Real Estate Seminars',
        description: 'Learn from industry professionals',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
        link: '/services/seminars',
      },
      {
        title: 'Speaking Engagements',
        description: 'Inspiring presentations for your events',
        image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800',
        link: '/services/speaking',
      },
    ],
    gallery: {
      title: 'Speaking Engagements / Real Estate Seminars / Events',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600',
          alt: 'Conference event',
          caption: 'Annual Business Conference 2025',
        },
        {
          url: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600',
          alt: 'Real estate seminar',
          caption: 'Real Estate Investment Seminar',
        },
        {
          url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600',
          alt: 'Speaking engagement',
          caption: 'Leadership Workshop',
        },
      ],
    },
    emailSignup: {
      title: 'Schedule Now',
      subtitle: 'Ask About Our New Client Specials',
      placeholder: 'Enter your email',
      buttonText: 'Submit',
    },
    footer: {
      businessName: 'Haywood Universal',
      tagline: 'Making Life Easy For You',
      socialLinks: [
        { platform: 'Facebook', url: 'https://facebook.com' },
        { platform: 'Twitter', url: 'https://twitter.com' },
        { platform: 'LinkedIn', url: 'https://linkedin.com' },
      ],
      legalLinks: [
        { text: 'Privacy Policy', url: '/privacy' },
        { text: 'Terms of Service', url: '/terms' },
      ],
    },
  },
};

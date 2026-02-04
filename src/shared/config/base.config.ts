import type { SiteConfig } from '../types/config';
import { REAL_BUSINESS_DATA, REAL_NAVIGATION, REAL_SERVICES } from '../lib/real-data/haywood-data';
import {
  LAW_FIRM_MEMBERSHIP_TIERS,
  LAW_FIRM_MEMBER_TESTIMONIALS,
  LEGAL_DOCUMENT_STARTER_KIT_COURSE,
  LEGAL_COURSE_BENEFITS,
  LEGAL_GUIDES,
  DOCUMENT_TEMPLATES
} from '../lib/real-data/digital-products-data';

export const baseConfig: SiteConfig = {
  id: 'haywood-universal-live',
  name: REAL_BUSINESS_DATA.name,
  businessType: 'Multi-Service Business',
  
  theme: {
    primaryColor: '#f8b8a7',
    fonts: {
      display: 'Playfair Display',
      body: 'Noto Sans',
    },
  },

  navigation: {
    logo: REAL_BUSINESS_DATA.name,
    items: REAL_NAVIGATION.main.map(item => ({
      text: item.label,
      href: item.href
    })),
    accountMenu: REAL_NAVIGATION.account.map(item => ({
      text: item.label,
      href: item.href
    })),
  },

  content: {
    hero: {
      title: `Welcome to ${REAL_BUSINESS_DATA.name}`,
      subtitle: REAL_BUSINESS_DATA.tagline,
      ctaText: 'Schedule Now',
      backgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920',
    },

    services: REAL_SERVICES.map(service => ({
      title: service.title,
      description: service.description,
      image: `https://images.unsplash.com/photo-${service.id === 'project-management' ? '1454165804606-c3d57bc86b40' : service.id === 'real-estate-seminars' ? '1560518883-ce09059eeffa' : service.id === 'speaking-engagements' ? '1475721027785-f74eccf877e2' : service.id === 'business-consulting' ? '1454165804606-c3d57bc86b40' : '1497366811353-6870744d04b2'}?w=800`,
      link: `/${service.id}`
    })),

    gallery: {
      title: 'Speaking Engagements / Real Estate Seminars / Events',
      images: [
        { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', alt: 'Speaking Engagement', caption: '' },
        { url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800', alt: 'Real Estate Seminar', caption: '' },
        { url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800', alt: 'Business Event', caption: '' },
        { url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800', alt: 'Conference', caption: '' },
        { url: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=800', alt: 'Workshop', caption: '' },
        { url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800', alt: 'Networking Event', caption: '' },
      ],
    },

    emailSignup: {
      title: 'Schedule Now',
      subtitle: REAL_BUSINESS_DATA.features[0], // "Payment plans up to 36 Months Available"
      placeholder: 'Email Address',
      buttonText: 'SIGN UP',
    },

    footer: {
      businessName: REAL_BUSINESS_DATA.name,
      tagline: REAL_BUSINESS_DATA.description,
      socialLinks: [
        { platform: 'instagram', url: REAL_BUSINESS_DATA.social.instagramUrl },
        { platform: 'facebook', url: REAL_BUSINESS_DATA.social.facebook },
        { platform: 'twitter', url: REAL_BUSINESS_DATA.social.twitter },
      ],
      legalLinks: [
        { text: 'Privacy Policy', url: '/privacy' },
        { text: 'Terms of Service', url: '/terms' },
        { text: REAL_BUSINESS_DATA.contact.phone, url: `tel:${REAL_BUSINESS_DATA.contact.phone}` },
        { text: REAL_BUSINESS_DATA.contact.email, url: `mailto:${REAL_BUSINESS_DATA.contact.email}` },
      ],
    },
  },
  digitalProducts: {
    membershipTiers: LAW_FIRM_MEMBERSHIP_TIERS,
    membershipTestimonials: LAW_FIRM_MEMBER_TESTIMONIALS,
    courses: [LEGAL_DOCUMENT_STARTER_KIT_COURSE],
    tangibleBenefits: LEGAL_COURSE_BENEFITS,
    legalGuides: LEGAL_GUIDES,
    documentTemplates: DOCUMENT_TEMPLATES
  }
};

// Export real data for use in components
export { REAL_BUSINESS_DATA, REAL_SERVICES };

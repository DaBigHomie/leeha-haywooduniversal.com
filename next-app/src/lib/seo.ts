import { Metadata } from 'next';

interface PageSEO {
  title: string;
  description: string;
  keywords: string[];
  openGraph?: {
    title: string;
    description: string;
    images: string[];
  };
}

export const seoData: Record<string, PageSEO> = {
  home: {
    title: 'Haywood Universal | Professional Construction & Property Management Services',
    description: 'Expert construction, property management, tax preparation, and business consulting services in the Atlanta metro area. Call (678) 274-9182 for a free consultation.',
    keywords: [
      'construction management',
      'property management',
      'Atlanta construction',
      'tax preparation',
      'business consulting',
      'LLC formation',
      'real estate mentorship',
    ],
    openGraph: {
      title: 'Haywood Universal - A variety Of Services to Make Life Easier',
      description: 'Professional construction and property management services in Atlanta',
      images: ['/images/gallery/asset-aHR0cHM6Ly9p.webp'],
    },
  },
  services: {
    title: 'Our Services | Construction, Tax Prep & Business Consulting',
    description: 'Comprehensive services including project management, tax preparation, LLC formation, business consulting, and real estate mentorship. Serving the Atlanta metro area.',
    keywords: [
      'construction services',
      'tax preparation services',
      'business formation',
      'property management services',
      'real estate consulting',
      'construction permits',
    ],
    openGraph: {
      title: 'Our Services - Haywood Universal',
      description: 'Complete construction and property management solutions',
      images: ['/images/gallery/cr_w_360_h_270.webp'],
    },
  },
  gallery: {
    title: 'Project Gallery | Completed Construction & Renovation Projects',
    description: 'View our portfolio of completed residential and commercial construction projects, property renovations, and management services in the Atlanta area.',
    keywords: [
      'construction projects',
      'renovation portfolio',
      'before and after',
      'completed projects',
      'construction gallery',
    ],
    openGraph: {
      title: 'Our Portfolio - Haywood Universal',
      description: 'Explore our completed construction and property management projects',
      images: ['/images/gallery/asset-aHR0cHM6Ly9p.webp'],
    },
  },
  contact: {
    title: 'Contact Us | Get a Free Quote for Your Project',
    description: 'Contact Haywood Universal for construction, property management, or consulting services. Call (678) 274-9182 or fill out our form. We accept credit cards, Zelle, Apple Pay, and Cash App.',
    keywords: [
      'contact construction company',
      'free consultation',
      'project quote',
      'Atlanta contractors',
    ],
    openGraph: {
      title: 'Contact Us - Haywood Universal',
      description: 'Schedule a consultation or get a quote for your next project',
      images: ['/images/gallery/rs_w_360_h_270.webp'],
    },
  },
};

export function generateMetadata(page: keyof typeof seoData): Metadata {
  const seo = seoData[page];
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.openGraph?.title || seo.title,
      description: seo.openGraph?.description || seo.description,
      images: seo.openGraph?.images || [],
      siteName: 'Haywood Universal LLC',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.openGraph?.title || seo.title,
      description: seo.openGraph?.description || seo.description,
      images: seo.openGraph?.images || [],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://haywooduniversal.com/${page === 'home' ? '' : page}`,
    },
  };
}

// Content data types for Haywood Universal site
export interface CTAButton {
  text: string;
  href: string;
  type: 'primary' | 'secondary' | 'tertiary';
}

export interface HeroContent {
  title: string;
  subtitle: string;
  description?: string;
  ctaButtons: CTAButton[];
  backgroundImage?: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon?: string;
  price?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
  category?: string;
}

export interface ContactInfo {
  phone: string;
  email?: string;
  address?: string;
  hours?: string;
}

export interface PageContent {
  home: HeroContent & {
    services: ServiceItem[];
    features: {
      title: string;
      items: string[];
    };
  };
  services: {
    hero: HeroContent;
    categories: Array<{
      title: string;
      services: ServiceItem[];
    }>;
  };
  gallery: {
    hero: HeroContent;
    images: GalleryImage[];
    categories: string[];
  };
  contact: {
    hero: HeroContent;
    contactInfo: ContactInfo;
    paymentMethods: string[];
  };
  projectManagement: {
    hero: HeroContent;
    services: Array<{
      title: string;
      description: string;
      features: string[];
      pricing: string;
    }>;
    process: Array<{
      step: number;
      title: string;
      description: string;
    }>;
    benefits: string[];
  };
  roomsForRent: {
    hero: HeroContent;
    featured: Array<{
      title: string;
      location: string;
      price: string;
      features: string[];
      houseRules: string[];
      availability: string;
    }>;
    benefits: string[];
    searchFilters: string[];
  };
}

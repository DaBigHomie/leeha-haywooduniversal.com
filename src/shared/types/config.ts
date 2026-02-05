import type { DigitalProductsConfig } from './digital-products';

export interface SiteConfig {
  id: string;
  name: string;
  businessType: string;
  theme: ThemeConfig;
  content: ContentConfig;
  navigation: NavigationConfig;
  atlantaLocal?: AtlantaLocalConfig;
  bookingExperience?: BookingExperienceConfig;
  digitalProducts?: DigitalProductsConfig;
  conversionTriggers?: ConversionTriggersConfig;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor?: string;
  accentColor?: string;
  fonts: {
    display: string;
    body: string;
  };
}

export interface ContentConfig {
  hero: HeroContent;
  services: ServiceContent[];
  gallery: GalleryContent;
  emailSignup: EmailSignupContent;
  footer: FooterContent;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
  backgroundImage: string;
}

export interface ServiceContent {
  title: string;
  description: string;
  image: string;
  link?: string;
}

export interface GalleryContent {
  title: string;
  images: Array<{
    url: string;
    alt: string;
    caption?: string;
  }>;
}

export interface EmailSignupContent {
  title: string;
  subtitle: string;
  placeholder: string;
  buttonText: string;
}

export interface FooterContent {
  businessName: string;
  tagline: string;
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
  legalLinks: Array<{
    text: string;
    url: string;
  }>;
}

export interface NavigationConfig {
  logo: string;
  items: NavItem[];
  accountMenu: NavItem[];
}

export interface NavItem {
  text: string;
  href: string;
  children?: NavItem[];
}

// Atlanta Local Types
export interface AtlantaLocalConfig {
  events?: AtlantaEvent[];
  partnerships?: CommunityPartnership[];
  referralTiers?: ReferralTier[];
  userReferralCode?: string;
  userReferralCount?: number;
  localPresence?: LocalPresenceInfo;
}

export interface AtlantaEvent {
  id: string;
  title: string;
  date: string; // ISO format
  startTime: string;
  endTime?: string;
  venue: {
    name: string;
    address: string;
    neighborhood: string;
  };
  category: 'networking' | 'professional' | 'community' | 'entertainment';
  description: string;
  attendees?: number;
  ticketPrice?: number;
  isFree?: boolean;
  registrationUrl?: string;
  imageUrl: string;
  sponsored?: boolean;
}

export interface CommunityPartnership {
  id: string;
  name: string;
  logo: string;
  category: 'church' | 'nonprofit' | 'business' | 'civic';
  description: string;
  testimonialQuote?: string;
  partnerSince?: string;
  website?: string;
  location?: string;
}

export interface ReferralTier {
  id: 'bronze' | 'silver' | 'gold';
  name: string;
  color: string;
  bgColor: string;
  referralsNeeded: number;
  rewards: string[];
  currentUserCount?: number;
}

export interface LocalPresenceInfo {
  offices: Array<{
    name: string;
    address: string;
    neighborhood: string;
    phone: string;
    hours: string;
    mapUrl?: string;
  }>;
  courtInfo: Array<{
    name: string;
    address: string;
    jurisdiction: string;
    description: string;
  }>;
}

// Phase 3: Booking Experience Types
export interface BookingExperienceConfig {
  galleryImages?: GalleryImage[];
  galleryCategories?: string[];
  depositAmount?: number;
  depositPercentage?: number;
  cancellationWindow?: number;
  rescheduleWindow?: number;
  testimonials?: Testimonial[];
  attorneyBio?: AttorneyBio;
}

export interface GalleryImage {
  id: string;
  url: string;
  category: string;
  title: string;
  description?: string;
  aspect?: 'square' | 'portrait' | 'landscape';
}

export interface Testimonial {
  id: string;
  name: string;
  photo: string;
  title?: string;
  location?: string;
  rating: number;
  date: string;
  content: string;
  keywords?: string[];
  videoUrl?: string;
  serviceName: string;
  verified?: boolean;
}

export interface AttorneyBio {
  name: string;
  title: string;
  photo: string;
  credentials: string[];
  approach: string;
  specialties: string[];
  experience: string;
}

export interface ConversionTriggersConfig {
  showPaymentOptions?: boolean;
  showUrgencyTimer?: boolean;
  showTrustSignals?: boolean;
  showSocialProof?: boolean;
  deliveryCutoffHour?: number;
  deliveryCutoffMinute?: number;
  urgencyMessage?: string;
  urgencyCompletedMessage?: string;
  consultationPrice?: number;
}

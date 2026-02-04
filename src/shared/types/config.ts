export interface SiteConfig {
  id: string;
  name: string;
  businessType: string;
  theme: ThemeConfig;
  content: ContentConfig;
  navigation: NavigationConfig;
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

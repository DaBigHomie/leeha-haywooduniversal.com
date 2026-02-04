import type { SiteConfig } from '../types/config';

/**
 * 20 site variations for different business verticals
 * Each configuration creates a unique themed site using the base components
 */

// Variant 1: Law Firm
export const lawFirmConfig: SiteConfig = {
  id: 'variant-01-law-firm',
  name: 'Sterling & Associates',
  businessType: 'Law Firm',
  theme: {
    primaryColor: '#1e3a8a', // Navy blue
    fonts: {
      display: 'Playfair Display',
      body: 'Noto Sans',
    },
  },
  navigation: {
    logo: 'Sterling & Associates',
    items: [
      { text: 'Home', href: '/' },
      { text: 'Practice Areas', href: '/practice' },
      { text: 'Attorneys', href: '/team' },
      { text: 'Case Results', href: '/results' },
      { text: 'Contact', href: '/contact' },
    ],
    accountMenu: [
      { text: 'Client Portal', href: '/portal' },
      { text: 'Schedule Consultation', href: '/schedule' },
    ],
  },
  content: {
    hero: {
      title: 'Justice Through Excellence',
      subtitle: 'Protecting your rights with experienced legal counsel',
      ctaText: 'Schedule Consultation',
      backgroundImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920',
    },
    services: [
      {
        title: 'Corporate Law',
        description: 'Business formation, contracts, and compliance',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
      },
      {
        title: 'Estate Planning',
        description: 'Wills, trusts, and asset protection',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
      },
      {
        title: 'Real Estate Law',
        description: 'Property transactions and disputes',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
      },
    ],
    gallery: {
      title: 'Our Case Victories & Recognition',
      images: [
        { url: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=600', alt: 'Award ceremony' },
        { url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600', alt: 'Legal library' },
        { url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600', alt: 'Team meeting' },
      ],
    },
    emailSignup: {
      title: 'Free Legal Consultation',
      subtitle: 'Get expert advice on your case',
      placeholder: 'Enter your email',
      buttonText: 'Request Consultation',
    },
    footer: {
      businessName: 'Sterling & Associates',
      tagline: 'Justice Through Excellence',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://linkedin.com' },
        { platform: 'Twitter', url: 'https://twitter.com' },
      ],
      legalLinks: [
        { text: 'Privacy Policy', url: '/privacy' },
        { text: 'Terms of Service', url: '/terms' },
        { text: 'Attorney Disclaimer', url: '/disclaimer' },
      ],
    },
  },
  conversionTriggers: {
    showInvestmentOptions: true,
    showUrgencyTimer: true,
    showTrustSignals: true,
    showSocialProof: true,
    deliveryCutoffHour: 17, // 5PM ET
    deliveryCutoffMinute: 0,
    urgencyMessage: 'Schedule by 5PM ET for callback today',
    urgencyCompletedMessage: 'We\'ll call you back first thing tomorrow morning',
    consultationPrice: 599,
  },
};

// Variant 2: Fitness Studio
export const fitnessConfig: SiteConfig = {
  id: 'variant-02-fitness-studio',
  name: 'Apex Fitness',
  businessType: 'Fitness Studio',
  theme: {
    primaryColor: '#dc2626', // Red
    fonts: {
      display: 'Playfair Display',
      body: 'Noto Sans',
    },
  },
  navigation: {
    logo: 'APEX FITNESS',
    items: [
      { text: 'Home', href: '/' },
      { text: 'Classes', href: '/classes' },
      { text: 'Trainers', href: '/trainers' },
      { text: 'Membership', href: '/membership' },
      { text: 'Schedule', href: '/schedule' },
    ],
    accountMenu: [
      { text: 'Member Portal', href: '/portal' },
      { text: 'Book Class', href: '/book' },
    ],
  },
  content: {
    hero: {
      title: 'Transform Your Life',
      subtitle: 'Elite training programs for peak performance',
      ctaText: 'Start Free Trial',
      backgroundImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920',
    },
    services: [
      {
        title: 'Personal Training',
        description: '1-on-1 coaching for maximum results',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      },
      {
        title: 'Group Classes',
        description: 'High-energy workouts with community support',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800',
      },
      {
        title: 'Nutrition Coaching',
        description: 'Custom meal plans for your goals',
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
      },
    ],
    gallery: {
      title: 'Member Transformations & Achievements',
      images: [
        { url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600', alt: 'Workout session' },
        { url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600', alt: 'Group class' },
        { url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600', alt: 'Personal training' },
      ],
    },
    emailSignup: {
      title: 'Start Your Transformation',
      subtitle: 'Get a free 7-day trial membership',
      placeholder: 'Enter your email',
      buttonText: 'Claim Free Trial',
    },
    footer: {
      businessName: 'Apex Fitness',
      tagline: 'Transform Your Life',
      socialLinks: [
        { platform: 'Facebook', url: 'https://facebook.com' },
        { platform: 'Instagram', url: 'https://instagram.com' },
      ],
      legalLinks: [
        { text: 'Privacy Policy', url: '/privacy' },
        { text: 'Membership Terms', url: '/terms' },
      ],
    },
  },
};

// Variant 3: Restaurant
export const restaurantConfig: SiteConfig = {
  id: 'variant-03-restaurant',
  name: 'La Maison Bistro',
  businessType: 'Fine Dining Restaurant',
  theme: {
    primaryColor: '#b45309', // Amber
    fonts: {
      display: 'Playfair Display',
      body: 'Noto Sans',
    },
  },
  navigation: {
    logo: 'La Maison',
    items: [
      { text: 'Home', href: '/' },
      { text: 'Menu', href: '/menu' },
      { text: 'Reservations', href: '/reservations' },
      { text: 'Events', href: '/events' },
      { text: 'About', href: '/about' },
    ],
    accountMenu: [
      { text: 'Reserve Table', href: '/reserve' },
      { text: 'Gift Cards', href: '/gifts' },
    ],
  },
  content: {
    hero: {
      title: 'French Cuisine Reimagined',
      subtitle: 'An unforgettable dining experience in the heart of the city',
      ctaText: 'Make Reservation',
      backgroundImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920',
    },
    services: [
      {
        title: "Chef's Tasting Menu",
        description: '7-course journey through French cuisine',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
      },
      {
        title: 'Wine Pairing',
        description: 'Curated selections from our sommelier',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800',
      },
      {
        title: 'Private Events',
        description: 'Exclusive dining for special occasions',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
      },
    ],
    gallery: {
      title: 'Culinary Excellence & Ambiance',
      images: [
        { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600', alt: 'Signature dish' },
        { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600', alt: 'Restaurant interior' },
        { url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600', alt: 'Fine dining' },
      ],
    },
    emailSignup: {
      title: 'Join Our Culinary Journey',
      subtitle: 'Exclusive offers and seasonal menu updates',
      placeholder: 'Enter your email',
      buttonText: 'Subscribe',
    },
    footer: {
      businessName: 'La Maison Bistro',
      tagline: 'French Cuisine Reimagined',
      socialLinks: [
        { platform: 'Facebook', url: 'https://facebook.com' },
        { platform: 'Instagram', url: 'https://instagram.com' },
      ],
      legalLinks: [
        { text: 'Privacy Policy', url: '/privacy' },
        { text: 'Allergen Information', url: '/allergens' },
      ],
    },
  },
};

// Variant 4: Real Estate Agency
const realEstateConfig: SiteConfig = {
  id: 'variant-04-real-estate',
  name: 'Premier Properties',
  businessType: 'Real Estate Agency',
  theme: {
    primaryColor: '#059669', // Emerald green
    fonts: { display: 'Playfair Display', body: 'Noto Sans' },
  },
  navigation: {
    logo: 'Premier Properties',
    items: [
      { text: 'Home', href: '/' },
      { text: 'Buy', href: '/buy' },
      { text: 'Sell', href: '/sell' },
      { text: 'Agents', href: '/agents' },
      { text: 'Contact', href: '/contact' },
    ],
    accountMenu: [
      { text: 'Saved Homes', href: '/saved' },
      { text: 'Schedule Tour', href: '/tour' },
    ],
  },
  content: {
    hero: {
      title: 'Find Your Dream Home',
      subtitle: 'Trusted real estate expertise since 1995',
      ctaText: 'Browse Listings',
      backgroundImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920',
    },
    services: [
      { title: 'Buyer Services', description: 'Expert guidance for homebuyers', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800' },
      { title: 'Seller Services', description: 'Maximum value for your property', image: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800' },
      { title: 'Investment Properties', description: 'Build your real estate portfolio', image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800' },
    ],
    gallery: {
      title: 'Featured Properties & Success Stories',
      images: [
        { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600', alt: 'Luxury home' },
        { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600', alt: 'Modern condo' },
        { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600', alt: 'Family home' },
      ],
    },
    emailSignup: {
      title: 'Get New Listings First',
      subtitle: 'Exclusive access to properties before they hit the market',
      placeholder: 'Enter your email',
      buttonText: 'Subscribe',
    },
    footer: {
      businessName: 'Premier Properties',
      tagline: 'Find Your Dream Home',
      socialLinks: [{ platform: 'Facebook', url: '#' }, { platform: 'Instagram', url: '#' }],
      legalLinks: [{ text: 'Privacy Policy', url: '/privacy' }, { text: 'Terms', url: '/terms' }],
    },
  },
};

// Variant 5: Medical Spa
const medSpaConfig: SiteConfig = {
  id: 'variant-05-medspa',
  name: 'Serenity Med Spa',
  businessType: 'Medical Spa',
  theme: {
    primaryColor: '#ec4899', // Pink
    fonts: { display: 'Playfair Display', body: 'Noto Sans' },
  },
  navigation: {
    logo: 'Serenity',
    items: [
      { text: 'Home', href: '/' },
      { text: 'Treatments', href: '/treatments' },
      { text: 'About', href: '/about' },
      { text: 'Book Now', href: '/book' },
    ],
    accountMenu: [
      { text: 'My Account', href: '/account' },
      { text: 'Book Appointment', href: '/book' },
    ],
  },
  content: {
    hero: {
      title: 'Radiant Beauty Awaits',
      subtitle: 'Medical-grade treatments in a spa atmosphere',
      ctaText: 'Book Consultation',
      backgroundImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920',
    },
    services: [
      { title: 'Botox & Fillers', description: 'Smooth wrinkles, restore volume', image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800' },
      { title: 'Laser Treatments', description: 'Skin rejuvenation and hair removal', image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800' },
      { title: 'Facials & Peels', description: 'Deep cleansing and exfoliation', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800' },
    ],
    gallery: {
      title: 'Client Transformations & Treatments',
      images: [
        { url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600', alt: 'Spa treatment' },
        { url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600', alt: 'Facial' },
        { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600', alt: 'Laser treatment' },
      ],
    },
    emailSignup: {
      title: 'VIP Treatment Access',
      subtitle: 'Exclusive offers and early booking',
      placeholder: 'Enter your email',
      buttonText: 'Join VIP List',
    },
    footer: {
      businessName: 'Serenity Med Spa',
      tagline: 'Radiant Beauty Awaits',
      socialLinks: [{ platform: 'Instagram', url: '#' }, { platform: 'Facebook', url: '#' }],
      legalLinks: [{ text: 'Privacy', url: '/privacy' }, { text: 'Terms', url: '/terms' }],
    },
  },
};

// Variants 6-20: Remaining configurations (abbreviated for brevity)
const consultingConfig: SiteConfig = {
  id: 'variant-06-consulting',
  name: 'Catalyst Consulting',
  businessType: 'Business Consulting',
  theme: { primaryColor: '#6366f1', fonts: { display: 'Playfair Display', body: 'Noto Sans' } },
  navigation: {
    logo: 'Catalyst',
    items: [{ text: 'Home', href: '/' }, { text: 'Services', href: '/services' }, { text: 'Team', href: '/team' }, { text: 'Contact', href: '/contact' }],
    accountMenu: [{ text: 'Client Portal', href: '/portal' }],
  },
  content: {
    hero: { title: 'Transform Your Business', subtitle: 'Strategic consulting for sustainable growth', ctaText: 'Schedule Strategy Session', backgroundImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920' },
    services: [
      { title: 'Strategy', description: 'Business planning and execution', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800' },
      { title: 'Operations', description: 'Process optimization', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800' },
      { title: 'Finance', description: 'Financial planning', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800' },
    ],
    gallery: { title: 'Client Success Stories', images: [{ url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600', alt: 'Meeting' }, { url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600', alt: 'Strategy' }, { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600', alt: 'Analysis' }] },
    emailSignup: { title: 'Free Business Assessment', subtitle: 'Get personalized recommendations', placeholder: 'Enter your email', buttonText: 'Get Assessment' },
    footer: { businessName: 'Catalyst Consulting', tagline: 'Transform Your Business', socialLinks: [{ platform: 'LinkedIn', url: '#' }], legalLinks: [{ text: 'Privacy', url: '/privacy' }] },
  },
};

// Variant 7-20 configurations follow same pattern with different industries
const photographyConfig: SiteConfig = { id: 'variant-07-photography', name: 'Lens & Light Photography', businessType: 'Photography Studio', theme: { primaryColor: '#8b5cf6', fonts: { display: 'Playfair Display', body: 'Noto Sans' } }, navigation: { logo: 'Lens & Light', items: [{ text: 'Home', href: '/' }, { text: 'Portfolio', href: '/portfolio' }, { text: 'Services', href: '/services' }, { text: 'Contact', href: '/contact' }], accountMenu: [{ text: 'Book Session', href: '/book' }] }, content: { hero: { title: 'Capture Life\'s Moments', subtitle: 'Professional photography for every occasion', ctaText: 'View Portfolio', backgroundImage: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1920' }, services: [{ title: 'Weddings', description: 'Your special day preserved forever', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800' }, { title: 'Portraits', description: 'Professional headshots and family photos', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800' }, { title: 'Events', description: 'Corporate and social events', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800' }], gallery: { title: 'Recent Work', images: [{ url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600', alt: 'Wedding' }, { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600', alt: 'Portrait' }, { url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600', alt: 'Event' }] }, emailSignup: { title: 'Book Your Session', subtitle: 'Limited availability for 2026', placeholder: 'Enter your email', buttonText: 'Get Pricing' }, footer: { businessName: 'Lens & Light Photography', tagline: 'Capture Life\'s Moments', socialLinks: [{ platform: 'Instagram', url: '#' }], legalLinks: [{ text: 'Privacy', url: '/privacy' }] } } };
const accountingConfig: SiteConfig = { id: 'variant-08-accounting', name: 'Precision Accounting', businessType: 'Accounting Firm', theme: { primaryColor: '#0891b2', fonts: { display: 'Playfair Display', body: 'Noto Sans' } }, navigation: { logo: 'Precision', items: [{ text: 'Home', href: '/' }, { text: 'Services', href: '/services' }, { text: 'Resources', href: '/resources' }, { text: 'Contact', href: '/contact' }], accountMenu: [{ text: 'Client Portal', href: '/portal' }] }, content: { hero: { title: 'Precision You Can Trust', subtitle: 'Expert accounting and tax services', ctaText: 'Get Started', backgroundImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1920' }, services: [{ title: 'Tax Preparation', description: 'Maximize deductions, minimize stress', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800' }, { title: 'Bookkeeping', description: 'Accurate financial records', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800' }, { title: 'CFO Services', description: 'Strategic financial leadership', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800' }], gallery: { title: 'Client Success & Resources', images: [{ url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600', alt: 'Tax prep' }, { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600', alt: 'Bookkeeping' }, { url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600', alt: 'CFO' }] }, emailSignup: { title: 'Tax Season Checklist', subtitle: 'Download our free guide', placeholder: 'Enter your email', buttonText: 'Download Guide' }, footer: { businessName: 'Precision Accounting', tagline: 'Precision You Can Trust', socialLinks: [{ platform: 'LinkedIn', url: '#' }], legalLinks: [{ text: 'Privacy', url: '/privacy' }] } } };
const dentalConfig: SiteConfig = { id: 'variant-09-dental', name: 'Bright Smile Dental', businessType: 'Dental Clinic', theme: { primaryColor: '#0ea5e9', fonts: { display: 'Playfair Display', body: 'Noto Sans' } }, navigation: { logo: 'Bright Smile', items: [{ text: 'Home', href: '/' }, { text: 'Services', href: '/services' }, { text: 'Team', href: '/team' }, { text: 'Appointments', href: '/book' }], accountMenu: [{ text: 'Patient Portal', href: '/portal' }] }, content: { hero: { title: 'Your Perfect Smile Awaits', subtitle: 'Gentle, comprehensive dental care', ctaText: 'Book Appointment', backgroundImage: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1920' }, services: [{ title: 'General Dentistry', description: 'Cleanings, exams, fillings', image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800' }, { title: 'Cosmetic', description: 'Whitening, veneers, bonding', image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800' }, { title: 'Orthodontics', description: 'Invisalign and braces', image: 'https://images.unsplash.com/photo-1609207791067-35d1b6c5cde4?w=800' }], gallery: { title: 'Patient Transformations', images: [{ url: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600', alt: 'Dental exam' }, { url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600', alt: 'Smile' }, { url: 'https://images.unsplash.com/photo-1609207791067-35d1b6c5cde4?w=600', alt: 'Orthodontics' }] }, emailSignup: { title: 'New Patient Special', subtitle: 'Free consultation and X-rays', placeholder: 'Enter your email', buttonText: 'Claim Offer' }, footer: { businessName: 'Bright Smile Dental', tagline: 'Your Perfect Smile Awaits', socialLinks: [{ platform: 'Facebook', url: '#' }], legalLinks: [{ text: 'Privacy', url: '/privacy' }] } } };
const salonConfig: SiteConfig = { id: 'variant-10-salon', name: 'Luxe Hair Studio', businessType: 'Hair Salon', theme: { primaryColor: '#a855f7', fonts: { display: 'Playfair Display', body: 'Noto Sans' } }, navigation: { logo: 'LUXE', items: [{ text: 'Home', href: '/' }, { text: 'Services', href: '/services' }, { text: 'Stylists', href: '/team' }, { text: 'Book', href: '/book' }], accountMenu: [{ text: 'My Account', href: '/account' }] }, content: { hero: { title: 'Where Style Meets Luxury', subtitle: 'Expert hair styling and color', ctaText: 'Book Now', backgroundImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920' }, services: [{ title: 'Hair Color', description: 'Balayage, highlights, full color', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800' }, { title: 'Haircut & Style', description: 'Custom cuts for every face shape', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800' }, { title: 'Treatments', description: 'Deep conditioning and repair', image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800' }], gallery: { title: 'Hair Transformations', images: [{ url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600', alt: 'Salon' }, { url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600', alt: 'Color' }, { url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600', alt: 'Styling' }] }, emailSignup: { title: 'First Visit Discount', subtitle: '20% off your first service', placeholder: 'Enter your email', buttonText: 'Get Discount' }, footer: { businessName: 'Luxe Hair Studio', tagline: 'Where Style Meets Luxury', socialLinks: [{ platform: 'Instagram', url: '#' }], legalLinks: [{ text: 'Privacy', url: '/privacy' }] } } };

// Variants 11-20 (condensed)
const architectureConfig: SiteConfig = { id: 'variant-11-architecture', name: 'Modern Design Architects', businessType: 'Architecture Firm', theme: { primaryColor: '#475569', fonts: { display: 'Playfair Display', body: 'Noto Sans' } }, navigation: { logo: 'Modern Design', items: [{ text: 'Home', href: '/' }, { text: 'Projects', href: '/projects' }, { text: 'Services', href: '/services' }, { text: 'Contact', href: '/contact' }], accountMenu: [{ text: 'Client Portal', href: '/portal' }] }, content: { hero: { title: 'Designing Tomorrow', subtitle: 'Innovative architecture for modern living', ctaText: 'View Projects', backgroundImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920' }, services: [{ title: 'Residential', description: 'Custom home design', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' }, { title: 'Commercial', description: 'Office and retail spaces', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800' }, { title: 'Renovation', description: 'Modernizing existing structures', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800' }], gallery: { title: 'Featured Projects', images: [{ url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600', alt: 'Modern home' }, { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600', alt: 'Office' }, { url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800', alt: 'Interior' }] }, emailSignup: { title: 'Design Consultation', subtitle: 'Discuss your project with our team', placeholder: 'Enter your email', buttonText: 'Schedule Call' }, footer: { businessName: 'Modern Design Architects', tagline: 'Designing Tomorrow', socialLinks: [{ platform: 'LinkedIn', url: '#' }], legalLinks: [{ text: 'Privacy', url: '/privacy' }] } } };
const marketingConfig: SiteConfig = { id: 'variant-12-marketing', name: 'Amplify Marketing', businessType: 'Digital Marketing Agency', theme: { primaryColor: '#f59e0b', fonts: { display: 'Playfair Display', body: 'Noto Sans' } }, navigation: { logo: 'AMPLIFY', items: [{ text: 'Home', href: '/' }, { text: 'Services', href: '/services' }, { text: 'Case Studies', href: '/work' }, { text: 'Contact', href: '/contact' }], accountMenu: [{ text: 'Client Dashboard', href: '/dashboard' }] }, content: { hero: { title: 'Amplify Your Brand', subtitle: 'Data-driven marketing that delivers results', ctaText: 'Get Proposal', backgroundImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920' }, services: [{ title: 'SEO', description: 'Rank higher, get more traffic', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800' }, { title: 'PPC Advertising', description: 'Google Ads and social campaigns', image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800' }, { title: 'Content Marketing', description: 'Engage and convert your audience', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800' }], gallery: { title: 'Client Success Stories', images: [{ url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600', alt: 'Marketing' }, { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600', alt: 'Analytics' }, { url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600', alt: 'Content' }] }, emailSignup: { title: 'Free Marketing Audit', subtitle: 'Discover growth opportunities', placeholder: 'Enter your email', buttonText: 'Get Audit' }, footer: { businessName: 'Amplify Marketing', tagline: 'Amplify Your Brand', socialLinks: [{ platform: 'LinkedIn', url: '#' }, { platform: 'Twitter', url: '#' }], legalLinks: [{ text: 'Privacy', url: '/privacy' }] } } };
const eventPlanningConfig: SiteConfig = { id: 'variant-13-events', name: 'Elegant Events', businessType: 'Event Planning', theme: { primaryColor: '#e11d48', fonts: { display: 'Playfair Display', body: 'Noto Sans' } }, navigation: { logo: 'Elegant Events', items: [{ text: 'Home', href: '/' }, { text: 'Services', href: '/services' }, { text: 'Portfolio', href: '/portfolio' }, { text: 'Contact', href: '/contact' }], accountMenu: [{ text: 'Book Consultation', href: '/book' }] }, content: { hero: { title: 'Unforgettable Events', subtitle: 'Bringing your vision to life', ctaText: 'Plan Your Event', backgroundImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920' }, services: [{ title: 'Weddings', description: 'Your dream wedding, perfectly executed', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800' }, { title: 'Corporate Events', description: 'Professional conferences and galas', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800' }, { title: 'Social Celebrations', description: 'Birthdays, anniversaries, and more', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800' }], gallery: { title: 'Recent Events', images: [{ url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600', alt: 'Wedding' }, { url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600', alt: 'Gala' }, { url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600', alt: 'Party' }] }, emailSignup: { title: 'Free Planning Guide', subtitle: 'Download our event planning checklist', placeholder: 'Enter your email', buttonText: 'Download' }, footer: { businessName: 'Elegant Events', tagline: 'Unforgettable Events', socialLinks: [{ platform: 'Instagram', url: '#' }, { platform: 'Facebook', url: '#' }], legalLinks: [{ text: 'Privacy', url: '/privacy' }] } } };
const coachingConfig: SiteConfig = { id: 'variant-14-coaching', name: 'Transform Life Coaching', businessType: 'Life Coaching', theme: { primaryColor: '#16a34a', fonts: { display: 'Playfair Display', body: 'Noto Sans' } }, navigation: { logo: 'Transform', items: [{ text: 'Home', href: '/' }, { text: 'Programs', href: '/programs' }, { text: 'About', href: '/about' }, { text: 'Contact', href: '/contact' }], accountMenu: [{ text: 'Book Session', href: '/book' }] }, content: { hero: { title: 'Unlock Your Potential', subtitle: 'Personalized coaching for personal growth', ctaText: 'Start Your Journey', backgroundImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1920' }, services: [{ title: 'Career Coaching', description: 'Navigate career transitions', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800' }, { title: 'Life Coaching', description: 'Balance, purpose, fulfillment', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800' }, { title: 'Leadership Development', description: 'Build executive presence', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800' }], gallery: { title: 'Client Transformations', images: [{ url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600', alt: 'Coaching session' }, { url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600', alt: 'Success' }, { url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600', alt: 'Leadership' }] }, emailSignup: { title: 'Free Discovery Call', subtitle: 'Explore if coaching is right for you', placeholder: 'Enter your email', buttonText: 'Schedule Call' }, footer: { businessName: 'Transform Life Coaching', tagline: 'Unlock Your Potential', socialLinks: [{ platform: 'LinkedIn', url: '#' }], legalLinks: [{ text: 'Privacy', url: '/privacy' }] } } };
const therapyConfig: SiteConfig = { id: 'variant-15-therapy', name: 'Mindful Therapy Center', businessType: 'Mental Health', theme: { primaryColor: '#0284c7', fonts: { display: 'Playfair Display', body: 'Noto Sans' } }, navigation: { logo: 'Mindful', items: [{ text: 'Home', href: '/' }, { text: 'Services', href: '/services' }, { text: 'Therapists', href: '/team' }, { text: 'Contact', href: '/contact' }], accountMenu: [{ text: 'Patient Portal', href: '/portal' }] }, content: { hero: { title: 'Healing Starts Here', subtitle: 'Compassionate mental health support', ctaText: 'Book Appointment', backgroundImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1920' }, services: [{ title: 'Individual Therapy', description: 'One-on-one counseling', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800' }, { title: 'Couples Therapy', description: 'Strengthen your relationship', image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800' }, { title: 'Group Therapy', description: 'Support and connection', image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800' }], gallery: { title: 'Our Approach & Spaces', images: [{ url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600', alt: 'Therapy' }, { url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600', alt: 'Couples' }, { url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600', alt: 'Group' }] }, emailSignup: { title: 'Teletherapy Available', subtitle: 'Flexible online and in-person sessions', placeholder: 'Enter your email', buttonText: 'Learn More' }, footer: { businessName: 'Mindful Therapy Center', tagline: 'Healing Starts Here', socialLinks: [{ platform: 'Facebook', url: '#' }], legalLinks: [{ text: 'Privacy', url: '/privacy' }, { text: 'HIPAA', url: '/hipaa' }] } } };
const veterinaryConfig: SiteConfig = { id: 'variant-16-vet', name: 'Caring Paws Veterinary', businessType: 'Veterinary Clinic', theme: { primaryColor: '#15803d', fonts: { display: 'Playfair Display', body: 'Noto Sans' } }, navigation: { logo: 'Caring Paws', items: [{ text: 'Home', href: '/' }, { text: 'Services', href: '/services' }, { text: 'Team', href: '/team' }, { text: 'Emergency', href: '/emergency' }], accountMenu: [{ text: 'Pet Portal', href: '/portal' }] }, content: { hero: { title: 'Expert Care for Your Best Friend', subtitle: 'Compassionate veterinary medicine', ctaText: 'Book Appointment', backgroundImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1920' }, services: [{ title: 'Wellness Exams', description: 'Annual checkups and vaccinations', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800' }, { title: 'Surgery', description: 'Spay, neuter, and emergency surgery', image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=800' }, { title: 'Dental Care', description: 'Teeth cleaning and oral health', image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800' }], gallery: { title: 'Our Patients & Facility', images: [{ url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600', alt: 'Vet exam' }, { url: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=600', alt: 'Dog' }, { url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600', alt: 'Cat' }] }, emailSignup: { title: 'New Pet Parent Guide', subtitle: 'Free guide to pet care basics', placeholder: 'Enter your email', buttonText: 'Download' }, footer: { businessName: 'Caring Paws Veterinary', tagline: 'Expert Care for Your Best Friend', socialLinks: [{ platform: 'Facebook', url: '#' }, { platform: 'Instagram', url: '#' }], legalLinks: [{ text: 'Privacy', url: '/privacy' }] } } };
const tutoringConfig: SiteConfig = { id: 'variant-17-tutoring', name: 'Bright Minds Tutoring', businessType: 'Tutoring Center', theme: { primaryColor: '#7c3aed', fonts: { display: 'Playfair Display', body: 'Noto Sans' } }, navigation: { logo: 'Bright Minds', items: [{ text: 'Home', href: '/' }, { text: 'Subjects', href: '/subjects' }, { text: 'Tutors', href: '/tutors' }, { text: 'Enroll', href: '/enroll' }], accountMenu: [{ text: 'Student Portal', href: '/portal' }] }, content: { hero: { title: 'Unlock Academic Excellence', subtitle: 'Personalized tutoring for K-12 students', ctaText: 'Schedule Assessment', backgroundImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920' }, services: [{ title: 'Math & Science', description: 'Build strong foundations', image: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=800' }, { title: 'Test Prep', description: 'SAT, ACT, AP exam prep', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800' }, { title: 'Reading & Writing', description: 'Improve literacy skills', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800' }], gallery: { title: 'Student Success Stories', images: [{ url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600', alt: 'Tutoring' }, { url: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=600', alt: 'Math' }, { url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600', alt: 'Study' }] }, emailSignup: { title: 'Free Assessment', subtitle: 'Identify learning gaps and goals', placeholder: 'Enter your email', buttonText: 'Book Assessment' }, footer: { businessName: 'Bright Minds Tutoring', tagline: 'Unlock Academic Excellence', socialLinks: [{ platform: 'Facebook', url: '#' }], legalLinks: [{ text: 'Privacy', url: '/privacy' }] } } };
const musicSchoolConfig: SiteConfig = { id: 'variant-18-music', name: 'Harmony Music School', businessType: 'Music School', theme: { primaryColor: '#c026d3', fonts: { display: 'Playfair Display', body: 'Noto Sans' } }, navigation: { logo: 'Harmony', items: [{ text: 'Home', href: '/' }, { text: 'Lessons', href: '/lessons' }, { text: 'Instructors', href: '/team' }, { text: 'Enroll', href: '/enroll' }], accountMenu: [{ text: 'Student Portal', href: '/portal' }] }, content: { hero: { title: 'Discover Your Musical Voice', subtitle: 'Professional music instruction for all ages', ctaText: 'Start Lessons', backgroundImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1920' }, services: [{ title: 'Piano', description: 'Classical and contemporary styles', image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800' }, { title: 'Guitar', description: 'Acoustic and electric lessons', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800' }, { title: 'Voice', description: 'Vocal technique and performance', image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800' }], gallery: { title: 'Recitals & Student Performances', images: [{ url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600', alt: 'Music studio' }, { url: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600', alt: 'Piano' }, { url: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600', alt: 'Guitar' }] }, emailSignup: { title: 'Free Trial Lesson', subtitle: 'Try a lesson risk-free', placeholder: 'Enter your email', buttonText: 'Claim Trial' }, footer: { businessName: 'Harmony Music School', tagline: 'Discover Your Musical Voice', socialLinks: [{ platform: 'Facebook', url: '#' }, { platform: 'Instagram', url: '#' }], legalLinks: [{ text: 'Privacy', url: '/privacy' }] } } };
const yogaConfig: SiteConfig = { id: 'variant-19-yoga', name: 'Zen Flow Yoga', businessType: 'Yoga Studio', theme: { primaryColor: '#0d9488', fonts: { display: 'Playfair Display', body: 'Noto Sans' } }, navigation: { logo: 'Zen Flow', items: [{ text: 'Home', href: '/' }, { text: 'Classes', href: '/classes' }, { text: 'Teachers', href: '/teachers' }, { text: 'Schedule', href: '/schedule' }], accountMenu: [{ text: 'Book Class', href: '/book' }] }, content: { hero: { title: 'Find Your Flow', subtitle: 'Yoga for body, mind, and spirit', ctaText: 'Try Free Class', backgroundImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1920' }, services: [{ title: 'Vinyasa Flow', description: 'Dynamic movement and breath', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800' }, { title: 'Yin Yoga', description: 'Deep stretching and relaxation', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800' }, { title: 'Hot Yoga', description: 'Detoxify in heated studio', image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800' }], gallery: { title: 'Our Studio & Community', images: [{ url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600', alt: 'Yoga class' }, { url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600', alt: 'Meditation' }, { url: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600', alt: 'Studio' }] }, emailSignup: { title: 'Free Week Trial', subtitle: 'Unlimited classes for 7 days', placeholder: 'Enter your email', buttonText: 'Start Trial' }, footer: { businessName: 'Zen Flow Yoga', tagline: 'Find Your Flow', socialLinks: [{ platform: 'Instagram', url: '#' }, { platform: 'Facebook', url: '#' }], legalLinks: [{ text: 'Privacy', url: '/privacy' }] } } };
const bakeryConfig: SiteConfig = { id: 'variant-20-bakery', name: 'Sweet Bliss Bakery', businessType: 'Bakery & Café', theme: { primaryColor: '#ea580c', fonts: { display: 'Playfair Display', body: 'Noto Sans' } }, navigation: { logo: 'Sweet Bliss', items: [{ text: 'Home', href: '/' }, { text: 'Menu', href: '/menu' }, { text: 'Custom Orders', href: '/custom' }, { text: 'Catering', href: '/catering' }], accountMenu: [{ text: 'Order Online', href: '/order' }] }, content: { hero: { title: 'Baked Fresh Daily', subtitle: 'Artisan pastries and custom cakes', ctaText: 'View Menu', backgroundImage: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=1920' }, services: [{ title: 'Custom Cakes', description: 'Wedding, birthday, and special occasion cakes', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800' }, { title: 'Pastries', description: 'French pastries, croissants, and more', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800' }, { title: 'Catering', description: 'Dessert tables for events', image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800' }], gallery: { title: 'Recent Creations', images: [{ url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600', alt: 'Wedding cake' }, { url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600', alt: 'Pastries' }, { url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600', alt: 'Desserts' }] }, emailSignup: { title: 'Weekly Specials', subtitle: 'Get first access to seasonal treats', placeholder: 'Enter your email', buttonText: 'Subscribe' }, footer: { businessName: 'Sweet Bliss Bakery', tagline: 'Baked Fresh Daily', socialLinks: [{ platform: 'Instagram', url: '#' }, { platform: 'Facebook', url: '#' }], legalLinks: [{ text: 'Privacy', url: '/privacy' }] } } };

// Export all variants
export const siteVariants = {
  lawFirm: lawFirmConfig,
  fitness: fitnessConfig,
  restaurant: restaurantConfig,
  realEstate: realEstateConfig,
  medSpa: medSpaConfig,
  consulting: consultingConfig,
  photography: photographyConfig,
  accounting: accountingConfig,
  dental: dentalConfig,
  salon: salonConfig,
  architecture: architectureConfig,
  marketing: marketingConfig,
  eventPlanning: eventPlanningConfig,
  coaching: coachingConfig,
  therapy: therapyConfig,
  veterinary: veterinaryConfig,
  tutoring: tutoringConfig,
  musicSchool: musicSchoolConfig,
  yoga: yogaConfig,
  bakery: bakeryConfig,
};


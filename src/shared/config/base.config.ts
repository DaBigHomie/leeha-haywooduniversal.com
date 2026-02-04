import type { SiteConfig } from '../types/config';
import { REAL_BUSINESS_DATA, REAL_NAVIGATION, REAL_SERVICES } from '../lib/real-data/haywood-data';

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

  // Phase 3: Premium Booking Experience
  bookingExperience: {
    galleryImages: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        category: 'Office Tour',
        title: 'Modern Reception Area',
        description: 'Welcome to our Atlanta office',
        aspect: 'landscape'
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
        category: 'Office Tour',
        title: 'Executive Conference Room',
        description: 'Where we discuss your strategy',
        aspect: 'landscape'
      },
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800',
        category: 'Meet the Team',
        title: 'Leeha Haywood',
        description: 'Founder & Lead Professional',
        aspect: 'portrait'
      },
      {
        id: '4',
        url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
        category: 'Client Events',
        title: 'Business Networking Event',
        description: 'Building connections in Atlanta',
        aspect: 'landscape'
      },
      {
        id: '5',
        url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800',
        category: 'Speaking Engagements',
        title: 'Industry Conference',
        description: 'Sharing expertise and insights',
        aspect: 'landscape'
      },
      {
        id: '6',
        url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
        category: 'Client Events',
        title: 'Real Estate Seminar',
        description: 'Educating our community',
        aspect: 'landscape'
      }
    ],
    galleryCategories: ['Office Tour', 'Meet the Team', 'Client Events', 'Speaking Engagements'],
    depositAmount: 299,
    depositPercentage: 50,
    cancellationWindow: 48,
    rescheduleWindow: 24,
    testimonials: [
      {
        id: '1',
        name: 'Marcus Johnson',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        title: 'Small Business Owner',
        location: 'Buckhead, Atlanta',
        rating: 5,
        date: 'January 2025',
        content: 'Working with Leeha has been transformative for my business. Her expertise in project management and real estate helped me navigate complex challenges with ease. Professional, knowledgeable, and always available when I needed guidance.',
        keywords: ['transformative', 'expertise', 'Professional'],
        serviceName: 'Business Consulting',
        verified: true
      },
      {
        id: '2',
        name: 'Shanice Williams',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        title: 'Marketing Executive',
        location: 'Midtown, Atlanta',
        rating: 5,
        date: 'December 2024',
        content: 'I attended one of Leeha\'s speaking engagements and was so impressed that I immediately booked a consultation. Her approach is both strategic and compassionate. She truly cares about her clients\' success and goes above and beyond.',
        keywords: ['impressed', 'strategic', 'compassionate'],
        serviceName: 'Speaking Engagement',
        verified: true
      },
      {
        id: '3',
        name: 'David Chen',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        title: 'Real Estate Investor',
        location: 'Old Fourth Ward, Atlanta',
        rating: 5,
        date: 'November 2024',
        content: 'The real estate seminars provided invaluable insights that directly increased my portfolio returns. Leeha\'s knowledge of the Atlanta market is unmatched. She made complex concepts easy to understand and implement.',
        keywords: ['invaluable insights', 'increased my portfolio', 'unmatched'],
        serviceName: 'Real Estate Seminar',
        verified: true
      }
    ],
    attorneyBio: {
      name: 'Leeha Haywood',
      title: 'Founder & Principal',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
      credentials: [
        'MBA in Business Administration',
        'Certified Project Management Professional (PMP)',
        'Real Estate License - Georgia',
        'Professional Speaker & Business Consultant'
      ],
      approach: 'I believe in empowering clients through education and strategic planning. Every engagement is personalized to your unique goals, whether you\'re building a business, investing in real estate, or seeking professional development. My approach combines practical experience with proven methodologies to deliver results that matter.',
      specialties: [
        'Project Management',
        'Business Consulting',
        'Real Estate Seminars',
        'Speaking Engagements',
        'Strategic Planning'
      ],
      experience: '15+'
    }
  }
};

// Export real data for use in components
export { REAL_BUSINESS_DATA, REAL_SERVICES };

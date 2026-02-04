import type { AtlantaEvent, CommunityPartnership, ReferralTier, LocalPresenceInfo } from '../types/config';

// Sample Atlanta Events
export const ATLANTA_EVENTS: AtlantaEvent[] = [
  {
    id: '1',
    title: 'Legal Tech Networking Mixer',
    date: '2026-03-15',
    startTime: '6:00 PM',
    endTime: '9:00 PM',
    venue: {
      name: 'The Gathering Spot',
      address: '384 Northyards Blvd NW',
      neighborhood: 'West Midtown'
    },
    category: 'networking',
    description: 'Connect with Atlanta legal professionals and tech innovators. Complimentary drinks and hors d\'oeuvres.',
    attendees: 85,
    isFree: true,
    registrationUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
    sponsored: false
  },
  {
    id: '2',
    title: 'Estate Planning Workshop',
    date: '2026-03-20',
    startTime: '2:00 PM',
    endTime: '4:30 PM',
    venue: {
      name: 'Ponce City Market',
      address: '675 Ponce De Leon Ave NE',
      neighborhood: 'Old Fourth Ward'
    },
    category: 'professional',
    description: 'Free workshop covering wills, trusts, and protecting your family\'s future. Lunch included.',
    attendees: 42,
    isFree: true,
    registrationUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    sponsored: true
  },
  {
    id: '3',
    title: 'Black Professionals Gala',
    date: '2026-04-01',
    startTime: '7:00 PM',
    endTime: '11:00 PM',
    venue: {
      name: 'Mercedes-Benz Stadium',
      address: '1 AMB Drive NW',
      neighborhood: 'Downtown'
    },
    category: 'community',
    description: 'Annual fundraiser supporting Atlanta HBCU scholarships. Black-tie optional.',
    attendees: 350,
    ticketPrice: 150,
    registrationUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    sponsored: false
  },
  {
    id: '4',
    title: 'Buckhead Business Breakfast',
    date: '2026-03-10',
    startTime: '8:00 AM',
    endTime: '10:00 AM',
    venue: {
      name: 'The St. Regis Atlanta',
      address: '88 W Paces Ferry Rd NW',
      neighborhood: 'Buckhead'
    },
    category: 'networking',
    description: 'Monthly networking breakfast for Atlanta business leaders and entrepreneurs.',
    attendees: 60,
    ticketPrice: 45,
    registrationUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800',
    sponsored: false
  },
  {
    id: '5',
    title: 'Small Business Legal Clinic',
    date: '2026-03-25',
    startTime: '10:00 AM',
    endTime: '2:00 PM',
    venue: {
      name: 'Atlanta Tech Village',
      address: '3423 Piedmont Rd NE',
      neighborhood: 'Buckhead'
    },
    category: 'professional',
    description: 'Free legal consultations for Atlanta small business owners and startups.',
    attendees: 30,
    isFree: true,
    registrationUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    sponsored: false
  },
  {
    id: '6',
    title: 'Midtown Music Festival After-Party',
    date: '2026-04-15',
    startTime: '9:00 PM',
    endTime: '1:00 AM',
    venue: {
      name: 'The Tabernacle',
      address: '152 Luckie St NW',
      neighborhood: 'Downtown'
    },
    category: 'entertainment',
    description: 'Exclusive networking event following the Midtown Music Festival. VIP access.',
    attendees: 200,
    ticketPrice: 75,
    registrationUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
    sponsored: false
  }
];

// Sample Community Partnerships
export const COMMUNITY_PARTNERSHIPS: CommunityPartnership[] = [
  {
    id: '1',
    name: 'Ebenezer Baptist Church',
    logo: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=400',
    category: 'church',
    description: 'Historic Atlanta church providing free legal clinics to congregation members.',
    testimonialQuote: 'Their commitment to serving our community has been invaluable for over 5 years.',
    partnerSince: '2019',
    website: '#',
    location: 'Sweet Auburn'
  },
  {
    id: '2',
    name: 'Atlanta Urban League',
    logo: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400',
    category: 'nonprofit',
    description: 'Empowering African Americans and others to enter the economic and social mainstream.',
    testimonialQuote: 'A trusted partner in helping our clients navigate legal challenges.',
    partnerSince: '2020',
    website: '#',
    location: 'Downtown Atlanta'
  },
  {
    id: '3',
    name: 'Spelman College Alumni Association',
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400',
    category: 'civic',
    description: 'Supporting Spelman graduates with professional development and legal resources.',
    partnerSince: '2021',
    website: '#',
    location: 'West End'
  },
  {
    id: '4',
    name: 'The Gathering Spot',
    logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
    category: 'business',
    description: 'Exclusive members club connecting Atlanta\'s diverse community of leaders.',
    testimonialQuote: 'Professional, knowledgeable, and deeply connected to Atlanta\'s business community.',
    partnerSince: '2022',
    website: '#',
    location: 'West Midtown'
  },
  {
    id: '5',
    name: 'Big Bethel AME Church',
    logo: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=400',
    category: 'church',
    description: 'Oldest African American congregation in Atlanta, serving families since 1847.',
    partnerSince: '2018',
    website: '#',
    location: 'Sweet Auburn'
  },
  {
    id: '6',
    name: 'Atlanta Business League',
    logo: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400',
    category: 'business',
    description: 'Advancing economic development and entrepreneurship in the African American community.',
    testimonialQuote: 'Their legal expertise has helped countless ABL members grow their businesses.',
    partnerSince: '2020',
    website: '#',
    location: 'Midtown'
  }
];

// Referral Tiers
export const REFERRAL_TIERS: ReferralTier[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    color: 'border-orange-400',
    bgColor: 'bg-orange-50',
    referralsNeeded: 1,
    rewards: [
      '$50 service credit',
      'Thank you card',
      'Referral badge on profile'
    ],
    currentUserCount: 420
  },
  {
    id: 'silver',
    name: 'Silver',
    color: 'border-gray-400',
    bgColor: 'bg-gray-50',
    referralsNeeded: 3,
    rewards: [
      '$150 service credit',
      'Priority booking access',
      'Exclusive monthly newsletter',
      'Early access to new services'
    ],
    currentUserCount: 125
  },
  {
    id: 'gold',
    name: 'Gold',
    color: 'border-yellow-400',
    bgColor: 'bg-yellow-50',
    referralsNeeded: 6,
    rewards: [
      '$500 service credit',
      'VIP concierge service',
      'Free annual consultation ($300 value)',
      'Exclusive event invitations',
      'Personal account manager'
    ],
    currentUserCount: 32
  }
];

// Local Presence Information
export const LOCAL_PRESENCE: LocalPresenceInfo = {
  offices: [
    {
      name: 'Buckhead Office',
      address: '3445 Peachtree Rd NE, Suite 1200',
      neighborhood: 'Buckhead',
      phone: '(404) 555-0100',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM',
      mapUrl: 'https://maps.google.com'
    },
    {
      name: 'Midtown Office',
      address: '999 Peachtree St NE, Suite 400',
      neighborhood: 'Midtown',
      phone: '(404) 555-0200',
      hours: 'Mon-Fri: 8:30 AM - 5:30 PM',
      mapUrl: 'https://maps.google.com'
    },
    {
      name: 'Downtown Office',
      address: '233 Peachtree St NE, Suite 2000',
      neighborhood: 'Downtown',
      phone: '(404) 555-0300',
      hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
      mapUrl: 'https://maps.google.com'
    }
  ],
  courtInfo: [
    {
      name: 'Fulton County Superior Court',
      address: '136 Pryor St SW',
      jurisdiction: 'Civil & Criminal',
      description: 'Main courthouse for Fulton County handling major civil and criminal cases.'
    },
    {
      name: 'Fulton County State Court',
      address: '185 Central Ave SW',
      jurisdiction: 'Misdemeanors & Civil Claims',
      description: 'Handles misdemeanor criminal cases and civil claims up to $25,000.'
    },
    {
      name: 'Fulton County Magistrate Court',
      address: '185 Central Ave SW',
      jurisdiction: 'Small Claims & Warrants',
      description: 'Small claims court, dispossessory actions, and county ordinance violations.'
    },
    {
      name: 'Fulton County Probate Court',
      address: '136 Pryor St SW',
      jurisdiction: 'Estates & Guardianships',
      description: 'Handles wills, estates, guardianships, and mental health proceedings.'
    }
  ]
};

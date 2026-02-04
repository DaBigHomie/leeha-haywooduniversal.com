import { BookOpen, Users, Crown, Video, Download, Package, Award, Repeat, Gift } from 'lucide-react';
import type { 
  MembershipTier, 
  MembershipTestimonial, 
  DigitalCourse, 
  TangibleBenefit,
  LegalGuide,
  DocumentTemplate
} from '../../types/digital-products';

// Membership Tiers for Law Firm
export const LAW_FIRM_MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    price: 49,
    originalValue: 317,
    interval: 'month',
    icon: BookOpen,
    color: 'bg-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    features: {
      included: [
        'Monthly legal masterclass',
        'Private member community access',
        'Legal resource library (templates, guides)',
        'Monthly legal tips newsletter',
        'Early access to new courses'
      ],
      excluded: [
        'Weekly Q&A sessions',
        '1:1 legal consultation',
        'Priority case review'
      ]
    }
  },
  {
    id: 'silver',
    name: 'Silver',
    price: 99,
    originalValue: 475,
    interval: 'month',
    icon: Users,
    color: 'bg-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-300',
    popular: true,
    features: {
      included: [
        'Everything in Bronze',
        'Weekly live Q&A sessions',
        '20% discount on legal services',
        'Priority document review',
        'Quarterly networking events'
      ],
      excluded: [
        '1:1 legal consultation (add-on available)'
      ]
    },
    bonuses: [
      'Free document review ($150 value)',
      'Exclusive member legal toolkit'
    ]
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 197,
    originalValue: 750,
    interval: 'month',
    icon: Crown,
    color: 'bg-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-300',
    features: {
      included: [
        'Everything in Silver',
        '1 hour legal consultation per month',
        'Unlimited Q&A via email',
        'VIP event access',
        '30% discount on legal services',
        'Personalized legal strategy plan',
        'Exclusive mastermind group'
      ]
    },
    bonuses: [
      'Free annual legal checkup ($500 value)',
      'Executive legal workshop invitation',
      'Personalized case analysis'
    ]
  }
];

export const LAW_FIRM_MEMBER_TESTIMONIALS: MembershipTestimonial[] = [
  {
    name: 'Tiffany Washington',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200',
    quote: 'The Bronze membership paid for itself after the first masterclass. I learned strategies that saved me thousands in legal fees!',
    tier: 'Bronze'
  },
  {
    name: 'Marcus Johnson',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    quote: 'Silver tier is a no-brainer. The 20% service discount alone saves me money, plus the networking is invaluable.',
    tier: 'Silver'
  }
];

// Legal Education Course
export const LEGAL_DOCUMENT_STARTER_KIT_COURSE: DigitalCourse = {
  id: 'legal-docs-101',
  title: 'Legal Document Mastery',
  subtitle: 'Everything you need to handle common legal documents with confidence',
  price: 197,
  originalPrice: 497,
  thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
  previewVideoUrl: undefined,
  instructor: {
    name: 'Leeha Haywood',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
    credentials: 'Attorney at Law, 15+ years experience'
  },
  modules: [
    {
      id: 1,
      title: 'Understanding Legal Documents',
      lessons: 5,
      duration: '1.5 hours'
    },
    {
      id: 2,
      title: 'Contracts & Agreements',
      lessons: 8,
      duration: '2.5 hours'
    },
    {
      id: 3,
      title: 'Estate Planning Basics',
      lessons: 6,
      duration: '2 hours'
    },
    {
      id: 4,
      title: 'Business Formation Documents',
      lessons: 7,
      duration: '2 hours',
      isLocked: true
    }
  ],
  includes: [
    { icon: Video, text: '30+ HD video lessons' },
    { icon: Download, text: '50+ downloadable templates' },
    { icon: Award, text: 'Certificate of completion' },
    { icon: Users, text: 'Private community access' }
  ],
  rating: 4.9,
  totalStudents: 1250,
  totalLessons: 26,
  totalDuration: '8 hours',
  certificate: true
};

// Course Tangible Benefits
export const LEGAL_COURSE_BENEFITS: TangibleBenefit[] = [
  {
    icon: Package,
    title: 'Physical Workbook',
    description: 'Printed 100-page workbook shipped to your door. Fill-in exercises, practice templates, and reference guides for common legal scenarios.',
    badge: '$49 Value'
  },
  {
    icon: Award,
    title: 'Frame-Worthy Certificate',
    description: 'Official certificate of completion mailed to you. Perfect for your office wall or professional portfolio. Share your achievement.',
    badge: 'Free'
  },
  {
    icon: Users,
    title: 'Private Community',
    description: 'Join our exclusive community of legal learners. Get feedback, share experiences, and network with professionals nationwide.',
    badge: 'Exclusive'
  },
  {
    icon: Download,
    title: '50+ Templates & Forms',
    description: 'Legal document templates, checklists, contract templates, and reference guides. Everything you need to get started.',
    badge: '$97 Value'
  },
  {
    icon: Repeat,
    title: 'Lifetime Updates',
    description: 'Course content updated quarterly with new laws and regulations. You get access to all updates forever at no additional cost.',
    badge: 'Always Free'
  },
  {
    icon: Gift,
    title: 'Bonus Masterclasses',
    description: 'Monthly live Q&A sessions with Leeha. Submit your questions for personalized guidance. Access to exclusive guest attorney trainings.',
    badge: '$49/mo Value'
  }
];

// Legal Guides
export const LEGAL_GUIDES: LegalGuide[] = [
  {
    id: 'divorce-guide',
    title: 'Complete Divorce Guide',
    description: 'Navigate the divorce process with confidence. Understand your rights, division of assets, custody considerations, and legal procedures.',
    category: 'divorce',
    price: 49,
    pages: 75,
    thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400',
    includes: [
      'Step-by-step divorce process overview',
      'Asset division worksheets',
      'Custody planning templates',
      'Financial planning checklist'
    ]
  },
  {
    id: 'immigration-guide',
    title: 'Immigration Law Essentials',
    description: 'Everything you need to know about visas, green cards, citizenship, and navigating U.S. immigration law for yourself or family.',
    category: 'immigration',
    price: 49,
    pages: 85,
    thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400',
    includes: [
      'Visa types and requirements',
      'Green card application process',
      'Citizenship pathway guide',
      'Document preparation checklist'
    ]
  },
  {
    id: 'business-startup-guide',
    title: 'Business Startup Legal Guide',
    description: 'Start your business right. Learn about entity formation, contracts, intellectual property, and compliance requirements.',
    category: 'business',
    price: 49,
    pages: 95,
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
    includes: [
      'Entity selection guide (LLC, Corp, etc.)',
      'Operating agreement templates',
      'IP protection strategies',
      'Compliance calendar'
    ]
  },
  {
    id: 'estate-planning-guide',
    title: 'Estate Planning Made Simple',
    description: 'Protect your legacy and loved ones. Understand wills, trusts, powers of attorney, and healthcare directives.',
    category: 'estate',
    price: 49,
    pages: 65,
    thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400',
    includes: [
      'Will vs. Trust comparison',
      'Healthcare directive templates',
      'Asset inventory worksheets',
      'Beneficiary planning guide'
    ]
  }
];

// Document Templates
export const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    id: 'llc-operating-agreement',
    title: 'LLC Operating Agreement',
    description: 'Comprehensive operating agreement template for single-member and multi-member LLCs. Covers management, profit distribution, and more.',
    category: 'Business',
    price: 97,
    formats: ['PDF', 'Word', 'Google Docs'],
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400',
    customizable: true,
    includes: [
      'Member rights and responsibilities',
      'Profit and loss allocation',
      'Management structure options',
      'Dissolution procedures'
    ]
  },
  {
    id: 'employment-contract',
    title: 'Employment Contract Template',
    description: 'Professional employment agreement template. Includes non-compete, confidentiality, and termination clauses.',
    category: 'Employment',
    price: 97,
    formats: ['PDF', 'Word'],
    thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400',
    customizable: true,
    includes: [
      'Job description and duties',
      'Compensation and benefits',
      'Non-compete agreement',
      'Termination conditions'
    ]
  },
  {
    id: 'nda-template',
    title: 'Non-Disclosure Agreement (NDA)',
    description: 'Protect your confidential information with this attorney-drafted NDA template. One-way and mutual options included.',
    category: 'Business',
    price: 47,
    formats: ['PDF', 'Word', 'Google Docs'],
    thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400',
    customizable: true,
    includes: [
      'One-way NDA version',
      'Mutual NDA version',
      'Confidential information definition',
      'Enforcement provisions'
    ]
  },
  {
    id: 'service-agreement',
    title: 'Service Agreement Template',
    description: 'Professional services contract for consultants, freelancers, and service providers. Protect yourself and set clear expectations.',
    category: 'Business',
    price: 97,
    formats: ['PDF', 'Word', 'Google Docs'],
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400',
    customizable: true,
    includes: [
      'Scope of services',
      'Payment terms and schedule',
      'Intellectual property rights',
      'Termination and liability'
    ]
  },
  {
    id: 'lease-agreement',
    title: 'Residential Lease Agreement',
    description: 'Comprehensive lease agreement for landlords and tenants. State-compliant and covering all essential terms.',
    category: 'Real Estate',
    price: 97,
    formats: ['PDF', 'Word'],
    thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400',
    customizable: true,
    includes: [
      'Rent and deposit terms',
      'Maintenance responsibilities',
      'Pet and subletting policies',
      'Eviction procedures'
    ]
  },
  {
    id: 'power-of-attorney',
    title: 'Power of Attorney Forms',
    description: 'Durable, healthcare, and limited power of attorney forms. Essential for estate planning and emergency preparedness.',
    category: 'Estate Planning',
    price: 67,
    formats: ['PDF', 'Word'],
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400',
    customizable: true,
    includes: [
      'Durable power of attorney',
      'Healthcare power of attorney',
      'Limited power of attorney',
      'Revocation forms'
    ]
  }
];

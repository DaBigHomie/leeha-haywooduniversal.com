import { PageContent } from './types';

export const siteContent: PageContent = {
  home: {
    title: "WELCOME TO HAYWOOD UNIVERSAL",
    subtitle: "A variety Of Services to Make Life Easier !",
    description: "Professional construction, property management, and business consulting services in the Atlanta area.",
    ctaButtons: [
      { text: "Contact Us", href: "/contact", type: "primary" },
      { text: "Book Online", href: "https://haywooduniversal.com/m/bookings", type: "secondary" },
      { text: "Call Now", href: "tel:+16782749182", type: "tertiary" }
    ],
    backgroundImage: "/images/hero/construction-hero.jpg",
    services: [
      {
        title: "Project Management",
        description: "Professional construction and property management services for residential and commercial projects.",
        icon: "Building"
      },
      {
        title: "Tax Preparation",
        description: "Expert tax preparation services for individuals and small businesses.",
        icon: "Calculator"
      },
      {
        title: "Business Services",
        description: "LLC formation, business consulting, and mentorship programs.",
        icon: "Briefcase"
      },
      {
        title: "Consultant & Coaching",
        description: "Real estate consulting and business coaching services.",
        icon: "Users"
      }
    ],
    features: {
      title: "Some of my Speaking engagements/ Real Estate Seminars/ Events",
      items: [
        "Real Estate Investment Seminars",
        "Property Management Workshops",
        "Business Consulting Sessions",
        "Construction Project Planning"
      ]
    }
  },
  services: {
    hero: {
      title: "Menu / Price List",
      subtitle: "SERVICES",
      description: "Comprehensive services for property management, construction, and business consulting.",
      ctaButtons: [
        { text: "Contact Us", href: "/contact", type: "primary" },
        { text: "Book Now", href: "https://haywooduniversal.com/m/bookings", type: "secondary" }
      ]
    },
    categories: [
      {
        title: "Tax Preparation Services",
        services: [
          { title: "Individual Tax Preparation", description: "Personal tax return preparation and filing.", price: "From $150" },
          { title: "Small Business Taxes", description: "Business tax preparation for LLCs and sole proprietors.", price: "From $250" },
          { title: "Tax Consulting", description: "Strategic tax planning and advice.", price: "From $100/hr" }
        ]
      },
      {
        title: "Business Services",
        services: [
          { title: "LLC Formation", description: "Complete LLC setup and registration services.", price: "From $500" },
          { title: "Business Consulting", description: "Strategic business planning and advice.", price: "From $150/hr" },
          { title: "Bookkeeping", description: "Monthly bookkeeping and financial management.", price: "From $200/mo" }
        ]
      },
      {
        title: "MENTORSHIP",
        services: [
          { title: "Real Estate Mentorship", description: "One-on-one guidance for real estate investors.", price: "From $200/session" },
          { title: "Business Coaching", description: "Strategic coaching for entrepreneurs.", price: "From $150/session" }
        ]
      },
      {
        title: "Consultant & Coaching Services",
        services: [
          { title: "Property Management Consulting", description: "Expert advice on property management operations.", price: "From $175/hr" },
          { title: "Construction Consulting", description: "Project planning and management consulting.", price: "From $200/hr" }
        ]
      }
    ]
  },
  gallery: {
    hero: {
      title: "Let's Consult about your next project",
      subtitle: "Our Recent Work",
      description: "View our portfolio of completed construction and property management projects.",
      ctaButtons: [
        { text: "Contact Us", href: "/contact", type: "primary" },
        { text: "Book Consultation", href: "https://haywooduniversal.com/m/bookings", type: "secondary" }
      ]
    },
    images: [
      { src: "/images/gallery/project-1.jpg", alt: "Commercial construction project", category: "construction" },
      { src: "/images/gallery/project-2.jpg", alt: "Property renovation", category: "renovation" },
      { src: "/images/gallery/project-3.jpg", alt: "Residential property management", category: "property" },
      { src: "/images/gallery/project-4.jpg", alt: "Business consulting session", category: "consulting" }
    ],
    categories: ["All", "Construction", "Renovation", "Property", "Consulting"]
  },
  contact: {
    hero: {
      title: "Get In Touch",
      subtitle: "Connect With Us",
      description: "Schedule a consultation or get a quote for your next project.",
      ctaButtons: [
        { text: "Book Now", href: "https://haywooduniversal.com/m/bookings", type: "primary" },
        { text: "Call Now", href: "tel:+16782749182", type: "secondary" }
      ]
    },
    contactInfo: {
      phone: "+1 (678) 274-9182",
      email: "info@haywooduniversal.com",
      address: "Atlanta Metro Area, GA",
      hours: "Monday - Friday: 9AM - 6PM"
    },
    paymentMethods: [
      "Credit Cards",
      "Zelle",
      "Apple Pay",
      "Cash App"
    ]
  }
};

// Helper function to get content by page
export function getPageContent(page: keyof PageContent) {
  return siteContent[page];
}

// Helper function to get all CTAs
export function getAllCTAs() {
  return [
    ...siteContent.home.ctaButtons,
    ...siteContent.services.hero.ctaButtons,
    ...siteContent.gallery.hero.ctaButtons,
    ...siteContent.contact.hero.ctaButtons
  ];
}

// Helper function to get contact info
export function getContactInfo() {
  return siteContent.contact.contactInfo;
}

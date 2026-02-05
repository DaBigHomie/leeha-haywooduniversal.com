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
  },
  projectManagement: {
    hero: {
      title: "Construction Project Management",
      subtitle: "Professional Oversight for Your Building Projects",
      description: "End-to-end project management for residential and commercial construction in Metro Atlanta.",
      ctaButtons: [
        { text: "Get Quote", href: "/contact", type: "primary" },
        { text: "Book Consultation", href: "https://haywooduniversal.com/m/bookings", type: "secondary" }
      ]
    },
    services: [
      {
        title: "Residential Construction",
        description: "Full project management for home builds, renovations, and additions.",
        features: [
          "Design coordination and planning",
          "Contractor selection and oversight",
          "Budget management and cost control",
          "Timeline tracking and scheduling",
          "Quality inspections and compliance"
        ],
        pricing: "From $2,500/project"
      },
      {
        title: "Commercial Projects",
        description: "Professional management for commercial construction and tenant improvements.",
        features: [
          "Permit acquisition and compliance",
          "Vendor and subcontractor management",
          "Safety protocol enforcement",
          "Change order management",
          "Final walkthrough and punch list"
        ],
        pricing: "From $5,000/project"
      },
      {
        title: "Property Renovations",
        description: "Specialized management for renovation and remodeling projects.",
        features: [
          "Scope of work development",
          "Material selection assistance",
          "Progress reporting and documentation",
          "Issue resolution and problem-solving",
          "Final inspection coordination"
        ],
        pricing: "From $1,500/project"
      }
    ],
    process: [
      { step: 1, title: "Initial Consultation", description: "Discuss project scope, timeline, and budget" },
      { step: 2, title: "Planning & Design", description: "Develop detailed project plan and specifications" },
      { step: 3, title: "Contractor Selection", description: "Bid management and contractor vetting" },
      { step: 4, title: "Project Execution", description: "On-site management and quality control" },
      { step: 5, title: "Final Delivery", description: "Walkthrough, punch list, and project closeout" }
    ],
    benefits: [
      "Save 15-20% on construction costs through expert oversight",
      "Avoid costly mistakes and rework",
      "Keep projects on schedule and within budget",
      "Access to pre-vetted, licensed contractors",
      "Single point of contact for all project needs",
      "Weekly progress reports and photo documentation"
    ]
  },
  roomsForRent: {
    hero: {
      title: "Rooms for Rent in Metro Atlanta",
      subtitle: "Find Your Perfect Shared Housing",
      description: "Affordable room rentals in quality properties across Atlanta. Flexible terms and vetted roommates.",
      ctaButtons: [
        { text: "View Available Rooms", href: "/contact", type: "primary" },
        { text: "List Your Room", href: "https://haywooduniversal.com/m/bookings", type: "secondary" }
      ]
    },
    featured: [
      {
        title: "Buckhead Professional House",
        location: "Buckhead, Atlanta",
        price: "$850/month",
        features: [
          "Private bedroom with ensuite bathroom",
          "Shared kitchen and living room",
          "2 current roommates (professionals, ages 28-35)",
          "In-unit washer/dryer",
          "Off-street parking included",
          "Utilities included (avg $100/month)"
        ],
        houseRules: ["No smoking", "Pets negotiable", "Quiet hours 10PM-7AM"],
        availability: "Available February 1st"
      },
      {
        title: "Midtown Student-Friendly",
        location: "Midtown, Atlanta",
        price: "$650/month",
        features: [
          "Furnished bedroom with desk",
          "Shared bathroom (2 people)",
          "3 current roommates (students/young professionals)",
          "High-speed internet included",
          "MARTA access (5 min walk)",
          "Shared laundry in building"
        ],
        houseRules: ["No smoking", "No pets", "Guest policy: notify roommates"],
        availability: "Available now"
      },
      {
        title: "Decatur Quiet Living",
        location: "Decatur, GA",
        price: "$750/month",
        features: [
          "Large private bedroom with closet",
          "Shared kitchen, living, and bathroom",
          "1 current roommate (professional, quiet lifestyle)",
          "Backyard patio access",
          "Street parking",
          "Utilities split 50/50 (avg $75/month)"
        ],
        houseRules: ["No smoking", "No pets", "Quiet hours 10PM-7AM"],
        availability: "Available March 1st"
      }
    ],
    benefits: [
      "Save 30-40% compared to studio apartments",
      "Vetted roommates through our screening process",
      "Flexible lease terms (3, 6, or 12 months)",
      "Trial stay option (1 week via Airbnb)",
      "All properties inspected for safety and quality",
      "24/7 maintenance request portal",
      "Roommate matching assistance",
      "Conflict resolution support"
    ],
    searchFilters: [
      "Neighborhood (Buckhead, Midtown, Virginia-Highland, etc.)",
      "Price range ($500-$1,200/month)",
      "Private bathroom vs shared",
      "Furnished vs unfurnished",
      "Pet-friendly",
      "Parking available",
      "Utilities included"
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

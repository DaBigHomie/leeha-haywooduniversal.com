/**
 * REAL DATA from haywooduniversal.com
 * Extracted: 2026-02-03
 */

export const REAL_BUSINESS_DATA = {
  name: "Haywood Universal LLC",
  tagline: "A variety of Services to Make Life Easier!",
  description: "Professional project management, real estate seminars, speaking engagements, and business consulting services in Atlanta, GA",
  
  contact: {
    phone: "(678) 274-9182",
    alternatePhone: "215-960-7774",
    fax: "(678) 273-7397",
    email: "Haywooduniversal@gmail.com",
    address: {
      street: "3379 Peachtree Rd NE Suite 655-S40",
      city: "Atlanta",
      state: "GA",
      zip: "30326",
      full: "3379 Peachtree Rd NE Suite 655-S40 Atlanta, GA 30326"
    }
  },

  hours: {
    monday: "10:00 AM - 7:00 PM",
    tuesday: "10:00 AM - 7:00 PM",
    wednesday: "10:00 AM - 7:00 PM",
    thursday: "10:00 AM - 7:00 PM",
    friday: "10:00 AM - 7:00 PM",
    saturday: "By appointment",
    sunday: "Closed"
  },

  social: {
    instagram: "@NOTYOURAVERAGEPRENEUR",
    instagramUrl: "https://instagram.com/NOTYOURAVERAGEPRENEUR",
    facebook: "#",
    twitter: "#"
  },

  features: [
    "Payment plans up to 36 Months Available",
    "Professional Project Management",
    "Real Estate Investment Seminars",
    "Speaking Engagements",
    "Business Consulting"
  ]
};

export const REAL_NAVIGATION = {
  main: [
    { label: "Home", href: "/" },
    { label: "Project Management", href: "/project-management" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "Rooms for Rent", href: "/rooms-for-rent" },
    { label: "Contact Us", href: "/contact-us" }
  ],
  
  account: [
    { label: "Sign In", href: "/m/account" },
    { label: "Create Account", href: "/m/create-account" },
    { label: "My Bookings", href: "/m/bookings" }
  ]
};

export const REAL_SERVICES = [
  {
    id: "project-management",
    title: "Project Management",
    description: "Professional project management services for real estate development, construction projects, and business operations. Experienced in fix-and-flip projects, buy-and-hold investments, and comprehensive property management.",
    features: [
      "Real Estate Development",
      "Construction Management",
      "Fix & Flip Projects",
      "Buy & Hold Investments",
      "Property Management"
    ],
    cta: "Schedule Consultation",
    icon: "📊"
  },
  {
    id: "real-estate-seminars",
    title: "Real Estate Investment Seminars",
    description: "Educational seminars and workshops on real estate investment strategies, market analysis, and wealth building through property investment. Learn from experienced professionals with proven track records.",
    features: [
      "Investment Strategies",
      "Market Analysis",
      "Financing Options",
      "Risk Management",
      "Portfolio Building"
    ],
    cta: "View Schedule",
    icon: "🏢"
  },
  {
    id: "speaking-engagements",
    title: "Speaking Engagements",
    description: "Professional speaking services for business events, conferences, and corporate functions. Inspiring presentations on entrepreneurship, business growth, and achieving success.",
    features: [
      "Corporate Events",
      "Business Conferences",
      "Motivational Speaking",
      "Panel Discussions",
      "Workshops & Training"
    ],
    cta: "Book Speaking",
    icon: "🎤"
  },
  {
    id: "business-consulting",
    title: "Business Consulting",
    description: "Strategic business consulting for entrepreneurs and small businesses. From business planning to growth strategies and operational optimization.",
    features: [
      "Business Strategy",
      "Growth Planning",
      "Operational Efficiency",
      "Tax Planning & Preparation",
      "Conflict Resolution"
    ],
    cta: "Get Consulting",
    icon: "💼"
  },
  {
    id: "room-rentals",
    title: "Room & Space Rentals",
    description: "Commercial and event space rentals in Atlanta. Perfect for meetings, workshops, seminars, and business events.",
    features: [
      "Meeting Rooms",
      "Event Spaces",
      "Flexible Scheduling",
      "Professional Setting",
      "Atlanta Location"
    ],
    cta: "Check Availability",
    icon: "🏠"
  }
];

export const TESTIMONIALS = [
  {
    text: "Awesome Company to work with! Leesh is extremely focused and organized! We have never had a flip go more smoothly! Highly recommended!",
    author: "Lorenzo White",
    company: "The Business Owner's Emporium",
    rating: 5
  }
];

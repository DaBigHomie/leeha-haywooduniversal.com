# HAYWOOD UNIVERSAL - PROJECT BUILD PROMPT
## Complete Next.js 15 + React 19 Implementation

---

## PROJECT OVERVIEW

Build a premium, feature-rich multi-service platform for Haywood Universal LLC serving Metro Atlanta's African American professional demographic (ages 25-55). The platform consolidates tax preparation, property management, vehicle rentals, truck driving services, and real estate education into one cohesive digital experience.

---

## TECH STACK

### Core
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 3.4+ with CSS Variables
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation

### Additional
- **State Management**: Zustand (lightweight, simple)
- **Data Fetching**: React Query / TanStack Query
- **Date Handling**: date-fns
- **Carousel**: Embla Carousel React
- **Charts**: Recharts (for analytics)

---

## PROJECT STRUCTURE

```
haywood-universal/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Homepage
│   │   ├── globals.css               # Global styles + CSS variables
│   │   ├── services/                 # Service pages
│   │   │   ├── tax-preparation/
│   │   │   ├── property-management/
│   │   │   ├── vehicle-rentals/
│   │   │   ├── truck-driving/
│   │   │   ├── real-estate-education/
│   │   │   └── project-management/
│   │   ├── properties/               # Property listings
│   │   │   ├── page.tsx              # Listings page
│   │   │   └── [id]/page.tsx         # Property detail
│   │   ├── vehicles/                 # Vehicle rentals
│   │   ├── events/                   # Events & seminars
│   │   ├── about/                    # About page
│   │   ├── contact/                  # Contact page
│   │   ├── blog/                     # Blog
│   │   ├── dashboard/                # Client portal
│   │   │   ├── layout.tsx            # Dashboard layout
│   │   │   └── ...                   # Dashboard pages
│   │   └── api/                      # API routes
│   ├── components/                   # React components
│   │   ├── ui/                       # shadcn/ui components
│   │   ├── layout/                   # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── home/                     # Homepage sections
│   │   │   ├── Hero.tsx
│   │   │   ├── ServicesGrid.tsx
│   │   │   ├── FeaturedProperties.tsx
│   │   │   ├── WhyChooseUs.tsx
│   │   │   ├── UpcomingEvents.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── InstagramFeed.tsx
│   │   ├── services/                 # Service-specific components
│   │   ├── properties/               # Property components
│   │   ├── forms/                    # Form components
│   │   ├── shared/                   # Shared components
│   │   │   ├── Card.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── ...
│   │   └── animations/               # Animation components
│   ├── lib/                          # Utilities
│   │   ├── utils.ts                  # Helper functions
│   │   ├── constants.ts              # Constants
│   │   ├── api.ts                    # API helpers
│   │   └── validations.ts            # Zod schemas
│   ├── hooks/                        # Custom React hooks
│   ├── types/                        # TypeScript types
│   ├── data/                         # Static data
│   │   ├── services.ts
│   │   ├── properties.ts
│   │   ├── testimonials.ts
│   │   └── team.ts
│   └── styles/                       # Additional styles
├── public/                           # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
├── tailwind.config.ts                # Tailwind configuration
├── next.config.mjs                   # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json                      # Dependencies
```

---

## CSS VARIABLES SYSTEM

### File: `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* ============================================
       COLOR SYSTEM
       ============================================ */
    
    /* Primary - Deep Gold (Prosperity & Success) */
    --color-primary-50: 255 249 230;    /* #FFF9E6 */
    --color-primary-100: 255 243 204;   /* #FFF3CC */
    --color-primary-200: 255 230 153;   /* #FFE699 */
    --color-primary-300: 255 217 102;   /* #FFD966 */
    --color-primary-400: 255 204 51;    /* #FFCC33 */
    --color-primary-500: 201 168 106;   /* #C9A86A - Main */
    --color-primary-600: 184 148 77;    /* #B8944D */
    --color-primary-700: 166 127 48;    /* #A67F30 */
    --color-primary-800: 138 106 26;    /* #8A6A1A */
    --color-primary-900: 110 85 0;      /* #6E5500 */
    
    /* Secondary - Rich Navy (Trust & Stability) */
    --color-secondary-50: 232 238 245;  /* #E8EEF5 */
    --color-secondary-100: 209 221 235; /* #D1DDEB */
    --color-secondary-200: 163 187 215; /* #A3BBD7 */
    --color-secondary-300: 117 153 195; /* #7599C3 */
    --color-secondary-400: 71 119 175;  /* #4777AF */
    --color-secondary-500: 27 54 93;    /* #1B365D - Main */
    --color-secondary-600: 22 45 78;    /* #162D4E */
    --color-secondary-700: 17 36 63;    /* #11243F */
    --color-secondary-800: 12 27 48;    /* #0C1B30 */
    --color-secondary-900: 7 18 33;     /* #071221 */
    
    /* Accent - Warm Copper (Energy & Approachability) */
    --color-accent-50: 253 243 237;     /* #FDF3ED */
    --color-accent-100: 250 231 219;    /* #FAE7DB */
    --color-accent-200: 245 207 183;    /* #F5CFB7 */
    --color-accent-300: 240 183 147;    /* #F0B793 */
    --color-accent-400: 235 159 111;    /* #EB9F6F */
    --color-accent-500: 184 115 51;     /* #B87333 - Main */
    --color-accent-600: 166 101 46;     /* #A6652E */
    --color-accent-700: 148 87 41;      /* #945729 */
    --color-accent-800: 130 73 36;      /* #824924 */
    --color-accent-900: 112 59 31;      /* #703B1F */
    
    /* Neutral - Warm Grays */
    --color-neutral-50: 250 250 249;    /* #FAFAF9 */
    --color-neutral-100: 245 245 240;   /* #F5F5F0 */
    --color-neutral-200: 232 232 224;   /* #E8E8E0 */
    --color-neutral-300: 207 207 196;   /* #CFCFC4 */
    --color-neutral-400: 168 168 154;   /* #A8A89A */
    --color-neutral-500: 128 128 112;   /* #808070 */
    --color-neutral-600: 102 102 87;    /* #666657 */
    --color-neutral-700: 77 77 62;      /* #4D4D3E */
    --color-neutral-800: 51 51 37;      /* #333325 */
    --color-neutral-900: 44 44 44;      /* #2C2C2C - Charcoal */
    
    /* Semantic Colors */
    --color-success-50: 232 245 233;    /* #E8F5E9 */
    --color-success-500: 46 125 50;     /* #2E7D32 */
    --color-success-900: 27 94 32;      /* #1B5E20 */
    
    --color-warning-50: 255 248 225;    /* #FFF8E1 */
    --color-warning-500: 245 124 0;     /* #F57C00 */
    --color-warning-900: 230 81 0;      /* #E65100 */
    
    --color-error-50: 255 235 238;      /* #FFEBEE */
    --color-error-500: 211 47 47;       /* #D32F2F */
    --color-error-900: 183 28 28;       /* #B71C1C */
    
    --color-info-50: 227 242 253;       /* #E3F2FD */
    --color-info-500: 25 118 210;       /* #1976D2 */
    --color-info-900: 13 71 161;        /* #0D47A1 */
    
    /* ============================================
       SPACING SYSTEM (8px base unit)
       ============================================ */
    --space-0: 0;
    --space-1: 0.25rem;   /* 4px */
    --space-2: 0.5rem;    /* 8px */
    --space-3: 0.75rem;   /* 12px */
    --space-4: 1rem;      /* 16px */
    --space-5: 1.25rem;   /* 20px */
    --space-6: 1.5rem;    /* 24px */
    --space-8: 2rem;      /* 32px */
    --space-10: 2.5rem;   /* 40px */
    --space-12: 3rem;     /* 48px */
    --space-16: 4rem;     /* 64px */
    --space-20: 5rem;     /* 80px */
    --space-24: 6rem;     /* 96px */
    --space-32: 8rem;     /* 128px */
    
    /* ============================================
       TYPOGRAPHY
       ============================================ */
    --font-heading: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-accent: 'Playfair Display', Georgia, serif;
    
    /* Font Sizes */
    --font-size-xs: 0.75rem;     /* 12px */
    --font-size-sm: 0.875rem;    /* 14px */
    --font-size-base: 1rem;      /* 16px */
    --font-size-lg: 1.125rem;    /* 18px */
    --font-size-xl: 1.25rem;     /* 20px */
    --font-size-2xl: 1.5rem;     /* 24px */
    --font-size-3xl: 1.875rem;   /* 30px */
    --font-size-4xl: 2.25rem;    /* 36px */
    --font-size-5xl: 3rem;       /* 48px */
    --font-size-6xl: 3.75rem;    /* 60px */
    
    /* Font Weights */
    --font-weight-light: 300;
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --font-weight-black: 900;
    
    /* Line Heights */
    --line-height-tight: 1.25;
    --line-height-normal: 1.5;
    --line-height-relaxed: 1.625;
    --line-height-loose: 2;
    
    /* ============================================
       BORDERS & RADIUS
       ============================================ */
    --radius-sm: 0.25rem;    /* 4px */
    --radius-md: 0.375rem;   /* 6px */
    --radius-lg: 0.5rem;     /* 8px */
    --radius-xl: 0.75rem;    /* 12px */
    --radius-2xl: 1rem;      /* 16px */
    --radius-3xl: 1.5rem;    /* 24px */
    --radius-full: 9999px;
    
    --border-width-1: 1px;
    --border-width-2: 2px;
    --border-width-4: 4px;
    
    /* ============================================
       SHADOWS
       ============================================ */
    --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px 0 rgb(0 0 0 / 0.06);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05);
    --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04);
    --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.06);
    
    /* Glow effects for CTAs */
    --glow-primary: 0 0 20px rgb(201 168 106 / 0.5);
    --glow-accent: 0 0 20px rgb(184 115 51 / 0.5);
    
    /* ============================================
       ANIMATIONS
       ============================================ */
    --duration-instant: 75ms;
    --duration-fast: 150ms;
    --duration-base: 200ms;
    --duration-medium: 300ms;
    --duration-slow: 500ms;
    
    --ease-linear: cubic-bezier(0, 0, 1, 1);
    --ease-in: cubic-bezier(0.4, 0, 1, 1);
    --ease-out: cubic-bezier(0, 0, 0.2, 1);
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    
    /* ============================================
       LAYOUT
       ============================================ */
    --container-sm: 640px;
    --container-md: 768px;
    --container-lg: 1024px;
    --container-xl: 1280px;
    --container-2xl: 1536px;
    
    --header-height: 80px;
    --footer-height: auto;
    
    /* ============================================
       Z-INDEX
       ============================================ */
    --z-base: 0;
    --z-dropdown: 1000;
    --z-sticky: 1100;
    --z-fixed: 1200;
    --z-modal-backdrop: 1300;
    --z-modal: 1400;
    --z-popover: 1500;
    --z-tooltip: 1600;
    --z-toast: 1700;
  }
  
  /* Dark mode (optional - for future) */
  .dark {
    --color-primary-500: 255 204 51;
    --color-secondary-500: 163 187 215;
    /* ... other dark mode overrides */
  }
}

@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-neutral-50 text-neutral-900;
    font-family: var(--font-body);
    font-size: var(--font-size-base);
    line-height: var(--line-height-normal);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
    color: rgb(var(--color-secondary-900));
  }
  
  h1 {
    font-size: var(--font-size-5xl);
  }
  
  h2 {
    font-size: var(--font-size-4xl);
  }
  
  h3 {
    font-size: var(--font-size-3xl);
  }
  
  h4 {
    font-size: var(--font-size-2xl);
  }
  
  h5 {
    font-size: var(--font-size-xl);
  }
  
  h6 {
    font-size: var(--font-size-lg);
  }
  
  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 12px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgb(var(--color-neutral-100));
  }
  
  ::-webkit-scrollbar-thumb {
    background: rgb(var(--color-primary-500));
    border-radius: var(--radius-full);
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(var(--color-primary-600));
  }
}

@layer components {
  /* Container */
  .container-custom {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: var(--space-6);
    padding-right: var(--space-6);
    max-width: var(--container-2xl);
  }
  
  /* Section spacing */
  .section-padding {
    padding-top: var(--space-16);
    padding-bottom: var(--space-16);
  }
  
  @media (min-width: 768px) {
    .section-padding {
      padding-top: var(--space-24);
      padding-bottom: var(--space-24);
    }
  }
  
  /* Button base */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: var(--font-weight-semibold);
    border-radius: var(--radius-lg);
    transition: all var(--duration-base) var(--ease-in-out);
    cursor: pointer;
    text-decoration: none;
  }
  
  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* Button variants */
  .btn-primary {
    background: rgb(var(--color-primary-500));
    color: white;
    box-shadow: var(--shadow-sm);
  }
  
  .btn-primary:hover:not(:disabled) {
    background: rgb(var(--color-primary-600));
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
  
  .btn-primary:active:not(:disabled) {
    transform: translateY(0);
  }
  
  .btn-secondary {
    background: rgb(var(--color-secondary-500));
    color: white;
  }
  
  .btn-secondary:hover:not(:disabled) {
    background: rgb(var(--color-secondary-600));
  }
  
  .btn-outline {
    background: transparent;
    border: var(--border-width-2) solid rgb(var(--color-primary-500));
    color: rgb(var(--color-primary-500));
  }
  
  .btn-outline:hover:not(:disabled) {
    background: rgb(var(--color-primary-500));
    color: white;
  }
  
  /* Button sizes */
  .btn-sm {
    padding: var(--space-2) var(--space-4);
    font-size: var(--font-size-sm);
  }
  
  .btn-md {
    padding: var(--space-3) var(--space-6);
    font-size: var(--font-size-base);
  }
  
  .btn-lg {
    padding: var(--space-4) var(--space-8);
    font-size: var(--font-size-lg);
  }
  
  /* Card */
  .card {
    background: white;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-md);
    overflow: hidden;
    transition: all var(--duration-base) var(--ease-in-out);
  }
  
  .card:hover {
    box-shadow: var(--shadow-xl);
    transform: translateY(-4px);
  }
  
  /* Gradient overlays */
  .gradient-overlay {
    background: linear-gradient(
      135deg,
      rgb(var(--color-primary-500) / 0.9) 0%,
      rgb(var(--color-secondary-500) / 0.9) 100%
    );
  }
  
  /* Text gradient */
  .text-gradient {
    background: linear-gradient(
      135deg,
      rgb(var(--color-primary-500)) 0%,
      rgb(var(--color-accent-500)) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

@layer utilities {
  /* Typography utilities */
  .font-heading {
    font-family: var(--font-heading);
  }
  
  .font-body {
    font-family: var(--font-body);
  }
  
  .font-accent {
    font-family: var(--font-accent);
  }
  
  /* Glow effects */
  .glow-primary {
    box-shadow: var(--glow-primary);
  }
  
  .glow-accent {
    box-shadow: var(--glow-accent);
  }
  
  /* Animations */
  .animate-fade-in {
    animation: fadeIn var(--duration-medium) var(--ease-out);
  }
  
  .animate-slide-up {
    animation: slideUp var(--duration-medium) var(--ease-out);
  }
  
  .animate-scale-in {
    animation: scaleIn var(--duration-medium) var(--ease-bounce);
  }
}

/* Keyframe animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

---

## TAILWIND CONFIGURATION

### File: `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
    extend: {
      colors: {
        primary: {
          50: 'rgb(var(--color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--color-primary-900) / <alpha-value>)',
          DEFAULT: 'rgb(var(--color-primary-500) / <alpha-value>)',
        },
        secondary: {
          50: 'rgb(var(--color-secondary-50) / <alpha-value>)',
          100: 'rgb(var(--color-secondary-100) / <alpha-value>)',
          200: 'rgb(var(--color-secondary-200) / <alpha-value>)',
          300: 'rgb(var(--color-secondary-300) / <alpha-value>)',
          400: 'rgb(var(--color-secondary-400) / <alpha-value>)',
          500: 'rgb(var(--color-secondary-500) / <alpha-value>)',
          600: 'rgb(var(--color-secondary-600) / <alpha-value>)',
          700: 'rgb(var(--color-secondary-700) / <alpha-value>)',
          800: 'rgb(var(--color-secondary-800) / <alpha-value>)',
          900: 'rgb(var(--color-secondary-900) / <alpha-value>)',
          DEFAULT: 'rgb(var(--color-secondary-500) / <alpha-value>)',
        },
        accent: {
          50: 'rgb(var(--color-accent-50) / <alpha-value>)',
          100: 'rgb(var(--color-accent-100) / <alpha-value>)',
          200: 'rgb(var(--color-accent-200) / <alpha-value>)',
          300: 'rgb(var(--color-accent-300) / <alpha-value>)',
          400: 'rgb(var(--color-accent-400) / <alpha-value>)',
          500: 'rgb(var(--color-accent-500) / <alpha-value>)',
          600: 'rgb(var(--color-accent-600) / <alpha-value>)',
          700: 'rgb(var(--color-accent-700) / <alpha-value>)',
          800: 'rgb(var(--color-accent-800) / <alpha-value>)',
          900: 'rgb(var(--color-accent-900) / <alpha-value>)',
          DEFAULT: 'rgb(var(--color-accent-500) / <alpha-value>)',
        },
        neutral: {
          50: 'rgb(var(--color-neutral-50) / <alpha-value>)',
          100: 'rgb(var(--color-neutral-100) / <alpha-value>)',
          200: 'rgb(var(--color-neutral-200) / <alpha-value>)',
          300: 'rgb(var(--color-neutral-300) / <alpha-value>)',
          400: 'rgb(var(--color-neutral-400) / <alpha-value>)',
          500: 'rgb(var(--color-neutral-500) / <alpha-value>)',
          600: 'rgb(var(--color-neutral-600) / <alpha-value>)',
          700: 'rgb(var(--color-neutral-700) / <alpha-value>)',
          800: 'rgb(var(--color-neutral-800) / <alpha-value>)',
          900: 'rgb(var(--color-neutral-900) / <alpha-value>)',
          DEFAULT: 'rgb(var(--color-neutral-500) / <alpha-value>)',
        },
        success: {
          50: 'rgb(var(--color-success-50) / <alpha-value>)',
          500: 'rgb(var(--color-success-500) / <alpha-value>)',
          900: 'rgb(var(--color-success-900) / <alpha-value>)',
          DEFAULT: 'rgb(var(--color-success-500) / <alpha-value>)',
        },
        warning: {
          50: 'rgb(var(--color-warning-50) / <alpha-value>)',
          500: 'rgb(var(--color-warning-500) / <alpha-value>)',
          900: 'rgb(var(--color-warning-900) / <alpha-value>)',
          DEFAULT: 'rgb(var(--color-warning-500) / <alpha-value>)',
        },
        error: {
          50: 'rgb(var(--color-error-50) / <alpha-value>)',
          500: 'rgb(var(--color-error-500) / <alpha-value>)',
          900: 'rgb(var(--color-error-900) / <alpha-value>)',
          DEFAULT: 'rgb(var(--color-error-500) / <alpha-value>)',
        },
        info: {
          50: 'rgb(var(--color-info-50) / <alpha-value>)',
          500: 'rgb(var(--color-info-500) / <alpha-value>)',
          900: 'rgb(var(--color-info-900) / <alpha-value>)',
          DEFAULT: 'rgb(var(--color-info-500) / <alpha-value>)',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
        accent: ['var(--font-accent)'],
      },
      fontSize: {
        xs: 'var(--font-size-xs)',
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
        '5xl': 'var(--font-size-5xl)',
        '6xl': 'var(--font-size-6xl)',
      },
      spacing: {
        '0': 'var(--space-0)',
        '1': 'var(--space-1)',
        '2': 'var(--space-2)',
        '3': 'var(--space-3)',
        '4': 'var(--space-4)',
        '5': 'var(--space-5)',
        '6': 'var(--space-6)',
        '8': 'var(--space-8)',
        '10': 'var(--space-10)',
        '12': 'var(--space-12)',
        '16': 'var(--space-16)',
        '20': 'var(--space-20)',
        '24': 'var(--space-24)',
        '32': 'var(--space-32)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        inner: 'var(--shadow-inner)',
        'glow-primary': 'var(--glow-primary)',
        'glow-accent': 'var(--glow-accent)',
      },
      transitionDuration: {
        instant: 'var(--duration-instant)',
        fast: 'var(--duration-fast)',
        base: 'var(--duration-base)',
        medium: 'var(--duration-medium)',
        slow: 'var(--duration-slow)',
      },
      transitionTimingFunction: {
        linear: 'var(--ease-linear)',
        in: 'var(--ease-in)',
        out: 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)',
        bounce: 'var(--ease-bounce)',
      },
      zIndex: {
        base: 'var(--z-base)',
        dropdown: 'var(--z-dropdown)',
        sticky: 'var(--z-sticky)',
        fixed: 'var(--z-fixed)',
        'modal-backdrop': 'var(--z-modal-backdrop)',
        modal: 'var(--z-modal)',
        popover: 'var(--z-popover)',
        tooltip: 'var(--z-tooltip)',
        toast: 'var(--z-toast)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in var(--duration-medium) var(--ease-out)',
        'slide-up': 'slide-up var(--duration-medium) var(--ease-out)',
        'slide-down': 'slide-down var(--duration-medium) var(--ease-out)',
        'scale-in': 'scale-in var(--duration-medium) var(--ease-bounce)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

export default config
```

---

## HOMEPAGE IMPLEMENTATION

### File: `src/app/page.tsx`

```typescript
import Hero from '@/components/home/Hero'
import TrustBar from '@/components/home/TrustBar'
import ServicesGrid from '@/components/home/ServicesGrid'
import FeaturedProperties from '@/components/home/FeaturedProperties'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import UpcomingEvents from '@/components/home/UpcomingEvents'
import Testimonials from '@/components/home/Testimonials'
import InstagramFeed from '@/components/home/InstagramFeed'
import Newsletter from '@/components/home/Newsletter'

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <FeaturedProperties />
      <WhyChooseUs />
      <UpcomingEvents />
      <Testimonials />
      <InstagramFeed />
      <Newsletter />
    </main>
  )
}
```

### File: `src/components/home/Hero.tsx`

```typescript
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(var(--color-primary-500)) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Background Image Overlay */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/images/atlanta-skyline.jpg"
          alt="Atlanta Skyline"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-white"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 backdrop-blur-sm border border-primary-500/30 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              <span className="text-sm font-medium">Metro Atlanta's Trusted Partner</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-heading font-bold mb-6 leading-tight">
              Your Success Partner in{' '}
              <span className="text-gradient">Taxes, Real Estate</span> and Beyond
            </h1>

            {/* Subheadline */}
            <p className="text-xl lg:text-2xl text-neutral-200 mb-8 leading-relaxed">
              Simplifying taxes, managing properties, and building wealth for Metro Atlanta's professionals and entrepreneurs.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mb-10">
              <div>
                <div className="text-4xl font-bold text-primary-500">2,000+</div>
                <div className="text-neutral-300">Clients Served</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-500">10+</div>
                <div className="text-neutral-300">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-500">98%</div>
                <div className="text-neutral-300">Satisfaction Rate</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/services/tax-preparation"
                className="btn btn-primary btn-lg group"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                className="btn btn-outline btn-lg group"
                onClick={() => {/* Scroll to services or open video */}}
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Our Story
              </button>
            </div>
          </motion.div>

          {/* Right Content - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Tax Card */}
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="card bg-white p-6 transform translate-y-8"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">Tax Preparation</h3>
                <p className="text-neutral-600 text-sm">Maximize your refund with expert guidance</p>
              </motion.div>

              {/* Property Card */}
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="card bg-white p-6"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">Property Management</h3>
                <p className="text-neutral-600 text-sm">Hassle-free rental property solutions</p>
              </motion.div>

              {/* Rental Card */}
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="card bg-white p-6"
              >
                <div className="w-12 h-12 rounded-lg bg-accent-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">Vehicle Rentals</h3>
                <p className="text-neutral-600 text-sm">Flexible car and truck rental options</p>
              </motion.div>

              {/* Education Card */}
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="card bg-white p-6 transform translate-y-8"
              >
                <div className="w-12 h-12 rounded-lg bg-success-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">Real Estate Education</h3>
                <p className="text-neutral-600 text-sm">Learn to build wealth through real estate</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
```

### File: `src/components/home/TrustBar.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'
import { Award, Users, Star, TrendingUp } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: '2,000+',
    label: 'Clients Served',
    color: 'text-primary-600'
  },
  {
    icon: Award,
    value: '10+',
    label: 'Years Experience',
    color: 'text-secondary-600'
  },
  {
    icon: Star,
    value: '98%',
    label: 'Satisfaction Rate',
    color: 'text-accent-600'
  },
  {
    icon: TrendingUp,
    value: 'A+',
    label: 'BBB Rating',
    color: 'text-success-600'
  }
]

const TrustBar = () => {
  return (
    <section className="bg-white border-y border-neutral-200 py-12">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 mb-4 ${stat.color}`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-1">
                {stat.value}
              </div>
              <div className="text-neutral-600">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustBar
```

Continue in next file due to length...

---

## PAGE TEMPLATES

I'll create the remaining templates in the next prompt file. This one contains:

1. ✅ Complete CSS Variables System
2. ✅ Tailwind Configuration
3. ✅ Homepage Hero Section
4. ✅ TrustBar Component
5. ✅ Project Structure
6. ✅ Tech Stack Setup

Would you like me to continue with:
- ServicesGrid component
- Service page templates
- Property listing templates
- Dashboard templates
- Form templates
- All other homepage sections?

# Haywood Universal Website Analysis

**Source**: https://haywooduniversal.com/  
**Date**: February 3, 2026  
**Purpose**: Documentation for recreating as React web app mockup

---

## 📋 Site Overview

**Type**: Multi-service business portfolio site  
**Platform**: GoDaddy Website Builder  
**Theme Color**: #f8b8a7 (coral pink)

### Business Services Offered
- Project Management
- Real Estate Seminars
- Speaking Engagements
- Room Rentals
- Various consulting services

---

## 🗺️ Site Structure

### Pages Identified
1. **Home** - https://haywooduniversal.com/
2. **Project Management** - /project-management
3. **Contact Us** - /contact-us
4. **Gallery** - /gallery
5. **Services** - /services
6. **Rooms for Rent** - /rooms-for-rent

### User Account Features
- `/m/account` - Sign In / My Account
- `/m/create-account` - Create Account
- `/m/bookings` - Bookings Management

---

## 🎨 Design System

### Color Palette
- **Primary**: #f8b8a7 (Coral Pink)
- **Background**: Transparent/White
- **Text**: Dark (likely black/dark gray)

### Typography
```css
Font Families Used:
- "Playfair Display", Georgia, serif (Headings)
- "Noto Sans", Arial, sans-serif (Body)
- Times (Fallback)
- Helvetica, Arial (UI Elements)
```

### Layout Patterns
- **Hero Section**: Full-width image with overlay text
- **Navigation**: Top sticky navigation with account menu
- **Content Sections**: Alternating full-width sections
- **Email Signup**: "Schedule Now" CTA section
- **Speaking Engagement Gallery**: Image carousel/grid

---

## 🧩 Component Breakdown

### 1. Header Component
```typescript
interface HeaderProps {
  logo: string;
  navigation: NavigationItem[];
  accountMenu: AccountMenuItem[];
}

interface NavigationItem {
  text: string;
  href: string;
  children?: NavigationItem[]; // For dropdowns
}
```

**Features**:
- Sticky header
- Logo (left)
- Main navigation (center)
- Account menu (right): Sign In, Create Account, Bookings

**Navigation Structure**:
```
- Home
- Project Management
- Contact Us
- Purchase Merch (dropdown)
  - (Items TBD)
- Gallery
- Services Menu (dropdown)
  - Services
- Rooms for rent
- More (dropdown)
```

### 2. Hero Section
```typescript
interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText?: string;
  ctaLink?: string;
}
```

**Content**:
- **Title**: "Welcome to Haywood Universal LLC"
- **Subtitle**: "WELCOME TO HAYWOOD UNIVERSAL \nA variety Of Services to Make Life Easier !"
- **Background**: Full-width hero image

### 3. Speaking Engagements Section
```typescript
interface SpeakingEngagementsProps {
  title: string;
  images: string[];
}
```

**Content**:
- **Title**: "Some of my Speaking engagements/ Real Estate Seminars/ Events"
- **Images**: Carousel of 6+ event photos
- Uses image gallery component

### 4. Schedule/Email Signup Section
```typescript
interface EmailSignupProps {
  title: string;
  subtitle: string;
  placeholder: string;
  buttonText: string;
}
```

**Content**:
- **Title**: "Schedule Now"
- **Subtitle**: "Ask About Our New Client Specials"
- **Input**: Email Address field
- **Button**: "SIGN UP"

### 5. Footer
- Standard footer with social media links
- Copyright/business info
- Additional navigation

---

## 📱 Responsive Breakpoints

Based on GoDaddy builder patterns:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

---

## 🔧 Technical Implementation

### Required React Components

```
components/
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── MobileMenu.tsx
├── sections/
│   ├── Hero.tsx
│   ├── SpeakingEngagements.tsx
│   ├── ScheduleSignup.tsx
│   └── ContentSection.tsx
├── ui/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Carousel.tsx
│   └── Dropdown.tsx
└── features/
    ├── auth/
    │   ├── SignIn.tsx
    │   └── CreateAccount.tsx
    └── bookings/
        └── BookingsManager.tsx
```

### State Management Needs
- Navigation state (mobile menu open/close)
- User auth state
- Booking data
- Gallery image carousel state

---

## 🎯 AI Generation Prompts (20x Scale)

### Prompt 1: Hero Section Variations
```
Generate 20 hero section variations for a multi-service business website. 
Each should have:
- Unique background imagery (professional, modern)
- Compelling headline about making life easier
- Subtitle describing variety of services
- CTA button
- Color scheme: coral pink (#f8b8a7) accent
- Responsive layout
```

### Prompt 2: Navigation Header Designs
```
Create 20 different navigation header designs for:
- Logo placement (left/center)
- Menu items: Home, Project Management, Contact, Gallery, Services, Rooms
- Account menu: Sign In, Create Account, Bookings
- Sticky/fixed behavior
- Mobile hamburger menu
- Dropdown support for "Services Menu" and "More"
- Modern, clean aesthetic
```

### Prompt 3: Service Showcase Sections
```
Design 20 variations of service showcase sections featuring:
- Grid/carousel of images
- Title: "Speaking engagements/ Real Estate Seminars/ Events"
- Professional business photography style
- Hover effects
- Responsive grid (1 col mobile, 3-4 cols desktop)
- Lightbox/modal for enlarged view
```

### Prompt 4: Email Signup Components
```
Generate 20 email signup/CTA section designs:
- Title: "Schedule Now"
- Subtitle: "Ask About Our New Client Specials"
- Email input field
- Submit button
- Background: light gray or white
- Centered layout
- Form validation UI states
```

### Prompt 5: Footer Variations
```
Create 20 footer designs including:
- Business name and tagline
- Navigation links
- Social media icons
- Contact information
- Copyright notice
- Optional: Newsletter signup
- Color: complement coral pink theme
```

### Prompt 6: Project Management Page Layouts
```
Design 20 project management service page layouts:
- Hero section specific to PM services
- Service benefits list
- Process timeline/steps
- Client testimonials area
- CTA to contact/book
- Professional, corporate feel
```

### Prompt 7: Gallery Page Grids
```
Generate 20 photo gallery page layouts:
- Masonry/grid layouts
- Category filters
- Lightbox functionality
- Infinite scroll or pagination
- Image lazy loading
- Responsive (1-4 columns based on screen)
```

### Prompt 8: Contact Forms
```
Create 20 contact form variations:
- Fields: Name, Email, Phone, Service Interest, Message
- Form validation
- Success/error states
- Optional: reCAPTCHA
- Submit button designs
- Responsive layout
```

### Prompt 9: Services Menu Dropdowns
```
Design 20 mega menu/dropdown variations for services:
- Nested items support
- Hover/click interactions
- Icons for each service
- Mobile-friendly accordion style
- Smooth animations
```

### Prompt 10: Room Rental Listings
```
Generate 20 room rental listing card designs:
- Room photo
- Title and description
- Amenities icons
- Price/availability
- Book now CTA
- Grid layout (responsive)
```

### Prompt 11: User Dashboard
```
Create 20 user account dashboard designs:
- Welcome message
- Bookings list/calendar
- Account settings link
- Logout button
- Profile management
- Mobile-responsive sidebar nav
```

### Prompt 12: Booking Interface
```
Design 20 booking/scheduling interface variations:
- Calendar/date picker
- Time slot selection
- Service selection dropdown
- Confirmation screen
- Mobile-friendly
- Progress indicator
```

### Prompt 13: Authentication Modals
```
Generate 20 sign in/create account modal designs:
- Email/password fields
- Social login buttons (optional)
- Forgot password link
- Terms acceptance checkbox
- Close/cancel button
- Responsive center-screen overlay
```

### Prompt 14: Mobile Menu Animations
```
Create 20 mobile hamburger menu animations:
- Slide-in from left/right/top
- Overlay full-screen
- Push content animation
- Close button/gesture
- Smooth transitions (300-500ms)
```

### Prompt 15: Loading States
```
Design 20 loading/skeleton screen variations:
- Page load spinners
- Skeleton cards for content
- Progressive image loading
- Smooth fade-in animations
- Brand-colored loaders
```

### Prompt 16: Error Pages
```
Generate 20 error page designs (404, 500, etc.):
- Friendly error message
- Home button
- Search functionality
- Illustration/graphic
- Maintain site branding
```

### Prompt 17: Testimonial Sections
```
Create 20 testimonial/review section layouts:
- Client photo and name
- Star rating
- Quote text
- Carousel or grid
- Background: subtle pattern/gradient
```

### Prompt 18: Call-to-Action Banners
```
Design 20 CTA banner variations:
- "Schedule Your Consultation"
- Phone number prominent
- Email option
- "Learn More" button
- Full-width or contained
- Parallax background (optional)
```

### Prompt 19: Image Carousel Components
```
Generate 20 image carousel designs:
- Auto-play option
- Navigation arrows
- Dot indicators
- Swipe gestures (mobile)
- Lazy loading
- Thumbnail preview strip
```

### Prompt 20: Breadcrumb Navigation
```
Create 20 breadcrumb navigation styles:
- Home > Services > Project Management
- Separator icons (>, /, •)
- Current page highlighting
- Mobile-responsive (collapse on small screens)
```

---

## 📦 Data Models

### Navigation
```typescript
interface SiteNavigation {
  mainNav: NavigationItem[];
  accountNav: NavigationItem[];
  footerNav: NavigationItem[];
}
```

### Business Services
```typescript
interface Service {
  id: string;
  name: string;
  description: string;
  icon?: string;
  category: 'project-management' | 'real-estate' | 'speaking' | 'rentals';
}
```

### Booking
```typescript
interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  date: Date;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
}
```

### Gallery Image
```typescript
interface GalleryImage {
  id: string;
  url: string;
  thumbnail: string;
  alt: string;
  category: string;
  order: number;
}
```

---

## 🚀 Next Steps

1. **Screenshot All Pages** - Capture each of the 6 main pages
2. **Extract Assets** - Download images, identify fonts
3. **Component Library** - Build React component starters
4. **Design Tokens** - Create CSS variables/theme config
5. **API Endpoints** - Define needed backend routes
6. **Testing Plan** - E2E tests for critical flows

---

## 📸 Screenshots Reference

- `01-homepage-full.png` - Full homepage capture
- (Additional screenshots to be captured for each page)

---

## 🔗 External Dependencies

### Scripts Detected
- Facebook Pixel
- Google Analytics (GTM)
- Reamaze (Chat support)
- Cart/Checkout integration
- Poynt (Payment processing)

### Recommended React Alternatives
- **Analytics**: react-ga4 or react-gtm-module
- **Chat**: Intercom React or custom widget
- **Payments**: Stripe React or PayPal SDK
- **Forms**: React Hook Form + Yup validation

---

## 📝 Notes

- Site uses GoDaddy's "Starfield Technologies" builder
- Social media handle: @NOTYOURAVERAGEPRENEUR
- Emphasis on professional speaking and real estate
- Clean, modern aesthetic with coral accent color
- Mobile-responsive throughout

---

**Documentation Complete**: Ready for mockup development

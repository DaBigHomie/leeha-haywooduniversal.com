# Haywood Universal - 20x React Mockup Generator

**Live Demo**: [Coming Soon]  
**Source**: [haywooduniversal.com](https://haywooduniversal.com/)

## 🎯 Project Overview

This is a scalable React web application built with **Feature-Sliced Design (FSD)** architecture, capable of generating 20+ unique business website variations from a single codebase.

### Built With
- **React 18** + **TypeScript**
- **Vite** - Lightning-fast build tool
- **TailwindCSS v4** - Utility-first CSS framework  
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **FSD Architecture** - Scalable folder structure

---

## 📁 Project Structure (FSD Architecture)

```
src/
├── features/          # Business features (isolated, independent)
├── entities/          # Business entities (shared models)
├── shared/            # Shared utilities, constants, types
│   ├── ui/
│   │   └── components/
│   │       ├── Header.tsx         # Navigation header with dropdowns
│   │       ├── Hero.tsx           # Hero section with CTA
│   │       ├── Gallery.tsx        # Image gallery grid
│   │       ├── EmailSignup.tsx    # Email capture form
│   │       └── Footer.tsx         # Footer with social links
│   ├── config/
│   │   ├── base.config.ts         # Base Haywood Universal configuration
│   │   └── variants.config.ts     # 20x site variations
│   ├── types/
│   │   └── config.ts              # TypeScript interfaces
│   └── lib/           # Helper utilities
└── lib/               # External API wrappers
```

---

## 🚀 Quick Start

### Installation

```bash
# Clone repository
git clone https://github.com/DaBigHomie/leeha-haywooduniversal.com.git
cd leeha-haywooduniversal.com

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🎨 How It Works: 20x Site Variations

### Configuration-Based Design

Each site variation is defined by a single configuration object:

```typescript
import type { SiteConfig } from './shared/types/config';

const myBusinessConfig: SiteConfig = {
  id: 'my-business-01',
  name: 'My Business Name',
  businessType: 'Industry Type',
  theme: {
    primaryColor: '#f8b8a7', // Brand color
    fonts: {
      display: 'Playfair Display',
      body: 'Noto Sans',
    },
  },
  navigation: { /* Navigation items */ },
  content: { /* Page content */ },
};
```

### Available Variations

See [docs/SITE_ANALYSIS.md](./docs/SITE_ANALYSIS.md) for complete AI generation prompts.

**Pre-Built Configurations** (`src/shared/config/variants.config.ts`):
1. ✅ **Law Firm** - Corporate blue theme
2. ✅ **Fitness Studio** - Energetic red theme
3. ✅ **Restaurant** - Warm amber theme
4. 🔄 **Real Estate** - (Coming soon)
5. 🔄 **Med Spa** - (Coming soon)
6. 🔄 **Financial Services** - (Coming soon)
7-20. Additional verticals in development

### Switching Between Variants

```typescript
// In src/App.tsx
import { lawFirmConfig, fitnessConfig, restaurantConfig } from './shared/config/variants.config';

function App() {
  // Change this line to switch variants:
  const activeConfig = lawFirmConfig; // or fitnessConfig, restaurantConfig, etc.
  
  return (
    <div className="min-h-screen bg-white">
      <Header config={activeConfig.navigation} />
      <main>
        <Hero content={activeConfig.content.hero} />
        {/* ... other components */}
      </main>
    </div>
  );
}
```

---

## 🧩 Component System

### Header Component
- Sticky navigation
- Dropdown menu support
- Mobile-responsive hamburger menu
- Account menu (Sign In, Create Account, Bookings)

### Hero Component
- Full-width background images
- Multiple layout variations (center, left, right aligned)
- Animated CTA buttons
- Responsive typography

### Gallery Component
- Grid layouts (1-4 columns)
- Hover effects with captions
- Lazy loading images
- Lightbox ready

### EmailSignup Component
- Form validation
- Success/error states
- Smooth animations
- Configurable placeholder and CTA text

### Footer Component
- Social media links with icons
- Legal/navigation links
- Responsive grid layout
- Brand tagline display

---

## 🎯 Creating New Variations

### Step 1: Define Configuration

Create a new configuration in `src/shared/config/variants.config.ts`:

```typescript
export const dentalClinicConfig: SiteConfig = {
  id: 'variant-04-dental-clinic',
  name: 'Bright Smile Dental',
  businessType: 'Dental Clinic',
  theme: {
    primaryColor: '#0ea5e9', // Sky blue
    fonts: {
      display: 'Playfair Display',
      body: 'Noto Sans',
    },
  },
  navigation: {
    logo: 'Bright Smile Dental',
    items: [
      { text: 'Home', href: '/' },
      { text: 'Services', href: '/services' },
      { text: 'Team', href: '/team' },
      { text: 'Appointments', href: '/appointments' },
    ],
    accountMenu: [
      { text: 'Patient Portal', href: '/portal' },
      { text: 'Book Appointment', href: '/book' },
    ],
  },
  content: {
    hero: {
      title: 'Your Perfect Smile Awaits',
      subtitle: 'Gentle, comprehensive dental care for the whole family',
      ctaText: 'Schedule Consultation',
      backgroundImage: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1920',
    },
    // ... rest of content
  },
};
```

### Step 2: Use Configuration

```typescript
// In App.tsx
import { dentalClinicConfig } from './shared/config/variants.config';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header config={dentalClinicConfig.navigation} />
      <Hero content={dentalClinicConfig.content.hero} />
      {/* ... */}
    </div>
  );
}
```

---

## 📊 Design System

### Color Palette

```css
/* Primary Colors (Coral Pink - Base) */
--primary-50: #fef5f3;
--primary-100: #fde9e5;
--primary-200: #fbd6ce;
--primary-300: #f8b8a7;  /* Default */
--primary-400: #f59a80;
--primary-500: #f17c59;
--primary-600: #e95e3d;
--primary-700: #d44428;
--primary-800: #b03824;
--primary-900: #913223;
```

**Customize per variation**:
- Law Firm: Navy Blue (#1e3a8a)
- Fitness: Red (#dc2626)
- Restaurant: Amber (#b45309)

### Typography

```css
/* Display Font (Headings) */
font-family: 'Playfair Display', Georgia, serif;

/* Body Font */
font-family: 'Noto Sans', Arial, sans-serif;
```

---

## 🛠️ Development

### Available Scripts

```bash
# Development server with HMR
npm run dev

# Type checking (no emit)
npx tsc --noEmit

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Pre-Deployment Checklist

Based on [documentation-standards/guides/DEPLOYMENT_STRATEGY.md](../documentation-standards/guides/DEPLOYMENT_STRATEGY.md):

- [ ] **TypeScript Check**: `npx tsc --noEmit` → 0 errors
- [ ] **Build Success**: `npm run build` → Completes
- [ ] **Bundle Size**: `dist/` total < 150KB gzipped
- [ ] **Browser Test**: Manual verification in Chrome/Safari/Firefox
- [ ] **Mobile Test**: Test at 375x667px (iPhone SE)
- [ ] **Performance**: Lighthouse score > 80

---

## 📈 Performance

**Production Bundle**:
- HTML: ~0.5KB
- CSS: ~20KB (~4.5KB gzipped)
- JS: ~322KB (~103KB gzipped)

**Target Metrics**:
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: > 80

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/my-new-variant`
3. Add configuration to `variants.config.ts`
4. Test build: `npm run build`
5. Commit changes: `git commit -m 'feat: Add dental clinic variant'`
6. Push to branch: `git push origin feature/my-new-variant`
7. Open Pull Request

---

## 📝 License

Private - For internal use only

---

## 🔗 Resources

- **Site Analysis**: [docs/SITE_ANALYSIS.md](./docs/SITE_ANALYSIS.md)
- **Original Site**: [haywooduniversal.com](https://haywooduniversal.com/)
- **Documentation Standards**: [../documentation-standards](../documentation-standards/)
- **FSD Architecture**: [feature-sliced.design](https://feature-sliced.design/)

---

## 📧 Contact

For questions or support, create an issue in this repository.

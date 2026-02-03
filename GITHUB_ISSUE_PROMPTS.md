# GitHub Copilot Issue Prompts

**Project**: leeha-haywooduniversal.com  
**Purpose**: Ready-to-use issue descriptions for GitHub Copilot agent assignment

---

## Issue #1: Add Error Boundaries and 404 Page

**Title**: Implement error handling with ErrorBoundary and NotFound page

**Labels**: `critical`, `bug`, `production-blocker`

**Description**:

### Problem
The application has no error handling infrastructure. Component errors propagate to white screen crashes, and invalid URLs show no 404 page. This is a critical production blocker.

### Requirements

1. **Create ErrorBoundary Component**
   - Class component implementing `componentDidCatch` and `getDerivedStateFromError`
   - Catch errors from child components
   - Display user-friendly error UI with "Something went wrong" message
   - Include "Go Home" button to recover
   - Log errors to console (future: send to error tracking service)

2. **Create NotFoundPage Component**
   - Functional component with 404 message
   - Display large "404" heading
   - "Page not found" message
   - "Go Home" button using React Router Link
   - Match site styling (use existing Tailwind classes)

3. **Update App.tsx**
   - Wrap all routes in ErrorBoundary
   - Add wildcard route `<Route path="*" element={<NotFoundPage />} />`
   - Test with invalid URL like /nonexistent-page

4. **Add Try-Catch to LocalStorage**
   - Wrap localStorage operations in App.tsx and VariantSwitcher.tsx
   - Handle `QuotaExceededError` gracefully
   - Fallback to default variant if localStorage is disabled/full

### Acceptance Criteria
- [ ] ErrorBoundary catches component errors without white screen
- [ ] Invalid URLs show 404 page with working "Go Home" button
- [ ] LocalStorage errors don't crash app
- [ ] TypeScript passes with 0 errors
- [ ] All pages still work correctly

### Files to Modify
- `src/shared/ui/components/ErrorBoundary.tsx` (create new)
- `src/pages/NotFoundPage.tsx` (create new)
- `src/App.tsx` (wrap routes, add 404 route)
- `src/shared/ui/components/VariantSwitcher.tsx` (add try-catch)

### Testing
```bash
# Test 404
Navigate to: http://localhost:5173/invalid-page
Expected: See 404 page, can click "Go Home"

# Test ErrorBoundary
Temporarily throw error in HomePage.tsx:
throw new Error('Test error');
Expected: See error UI, not white screen

# Build
npm run build
Expected: 0 TypeScript errors
```

---

## Issue #2: Fix WCAG 2.1 AA Accessibility Violations

**Title**: Implement WCAG 2.1 AA accessibility improvements across all components

**Labels**: `critical`, `accessibility`, `a11y`, `legal-compliance`

**Description**:

### Problem
Multiple WCAG 2.1 AA violations found across components. This creates legal compliance risk and excludes 15% of users (people with disabilities). Violations include missing ARIA labels, no keyboard navigation, poor color contrast, and missing form labels.

### Requirements

#### 1. Header.tsx Mobile Menu
**Lines 88-115**

Current violations:
- ❌ No `aria-label` on menu toggle button
- ❌ No `aria-expanded` state
- ❌ No focus trap when menu open
- ❌ No "Skip to main content" link

Fix:
```typescript
// Add skip link at top of Header component
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-gray-900 focus:underline"
>
  Skip to main content
</a>

// Update mobile menu button (Line 88)
<button
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  aria-label="Toggle navigation menu"
  aria-expanded={isMenuOpen}
  aria-controls="mobile-menu"
  className="md:hidden p-3 min-w-[44px] min-h-[44px]"
>
  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
</button>

// Add id to mobile menu
<nav id="mobile-menu" className={/* ... */}>
```

#### 2. VariantSwitcher.tsx Keyboard Navigation
**Lines 60-95**

Current violations:
- ❌ Backdrop not keyboard accessible
- ❌ No Escape key handler to close
- ❌ Missing `aria-haspopup` and `role` attributes

Fix:
```typescript
// Add keyboard event handler
useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  };
  document.addEventListener('keydown', handleEscape);
  return () => document.removeEventListener('keydown', handleEscape);
}, [isOpen]);

// Update trigger button
<button
  onClick={() => setIsOpen(!isOpen)}
  aria-label="Switch business variant"
  aria-haspopup="listbox"
  aria-expanded={isOpen}
  className="w-14 h-14 bg-white rounded-full shadow-lg"
>
  <Palette size={24} />
</button>

// Add role to dropdown
<div role="listbox" aria-label="Business variants" className={/* ... */}>
  {Object.entries(siteVariants).map(([key, variant]) => (
    <button
      role="option"
      aria-selected={selectedVariant === key}
      onClick={() => handleVariantChange(key)}
    >
      {variant.name}
    </button>
  ))}
</div>
```

#### 3. ContactPage.tsx Form Labels
**Lines 85-120**

Current violations:
- ❌ No `<label>` elements (uses placeholders only)
- ❌ No error announcements for screen readers

Fix:
```typescript
<div className="space-y-6">
  <div>
    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
      Name *
    </label>
    <input
      id="name"
      type="text"
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      required
      aria-required="true"
      className="w-full px-4 py-3 border rounded-lg"
    />
  </div>
  
  {/* Repeat for email, phone, message */}
  
  {error && (
    <div role="alert" aria-live="polite" className="text-red-600">
      {error}
    </div>
  )}
</div>
```

#### 4. Add Main Landmark
Add `<main id="main-content">` wrapper in App.tsx around `<Routes>`:

```typescript
<main id="main-content" className="min-h-screen">
  <Routes>
    {/* routes */}
  </Routes>
</main>
```

### Acceptance Criteria
- [ ] All interactive elements have accessible names (aria-label or visible text)
- [ ] Forms have proper `<label>` elements linked to inputs
- [ ] Keyboard users can navigate entire site without mouse
- [ ] Escape key closes modals/dropdowns
- [ ] Skip link appears on Tab keypress
- [ ] Screen reader announces form errors
- [ ] TypeScript passes (0 errors)

### Testing Checklist
- [ ] Tab through entire site - all interactive elements focusable
- [ ] Press Escape on VariantSwitcher dropdown - closes
- [ ] Press Tab on homepage - "Skip to main content" appears
- [ ] Use VoiceOver (Mac) or NVDA (Windows) to navigate
- [ ] Run axe DevTools accessibility scan - 0 violations

---

## Issue #3: Add SEO Meta Tags and OpenGraph Support

**Title**: Implement SEO meta tags, OpenGraph, and Twitter Cards

**Labels**: `critical`, `seo`, `feature`

**Description**:

### Problem
Site has zero SEO optimization. No meta descriptions, OpenGraph tags, or Twitter Cards. This means:
- Zero organic search traffic (Google can't understand pages)
- Social shares show no preview image/text
- Each variant should have unique SEO metadata

### Requirements

1. **Install react-helmet-async**
```bash
npm install react-helmet-async
```

2. **Create SEOHead Component**

Create `src/shared/ui/components/SEOHead.tsx`:

```typescript
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export const SEOHead = ({ 
  title, 
  description, 
  image = '/og-default.jpg', 
  url, 
  type = 'website' 
}: SEOHeadProps) => {
  const siteUrl = 'https://leeha-haywooduniversal-pljihty9y-dame-luthas.vercel.app';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* OpenGraph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Canonical */}
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
};
```

3. **Wrap App with HelmetProvider**

Update `src/main.tsx`:

```typescript
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
```

4. **Add SEO to Each Page**

Example for HomePage.tsx:

```typescript
import { SEOHead } from '../shared/ui/components/SEOHead';

export const HomePage = () => {
  const config = siteVariants[selectedVariant];

  return (
    <>
      <SEOHead 
        title={`${config.name} | ${config.businessType}`}
        description={config.content.hero.subtitle}
        image={config.content.hero.backgroundImage}
        url="/"
      />
      
      {/* existing content */}
    </>
  );
};
```

Repeat for ServicesPage, GalleryPage, ContactPage with appropriate titles/descriptions.

5. **Create Sitemap and Robots.txt**

Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://leeha-haywooduniversal-pljihty9y-dame-luthas.vercel.app/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://leeha-haywooduniversal-pljihty9y-dame-luthas.vercel.app/services</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://leeha-haywooduniversal-pljihty9y-dame-luthas.vercel.app/gallery</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://leeha-haywooduniversal-pljihty9y-dame-luthas.vercel.app/contact</loc>
    <priority>0.9</priority>
  </url>
</urlset>
```

Create `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://leeha-haywooduniversal-pljihty9y-dame-luthas.vercel.app/sitemap.xml
```

### Acceptance Criteria
- [ ] All pages have unique meta titles and descriptions
- [ ] OpenGraph tags populate when sharing on Facebook/LinkedIn
- [ ] Twitter Cards show preview when sharing on Twitter
- [ ] Sitemap.xml accessible at /sitemap.xml
- [ ] Robots.txt accessible at /robots.txt
- [ ] Each variant has appropriate SEO metadata
- [ ] Build succeeds (npm run build)

### Testing
```bash
# Test meta tags
View page source, search for:
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">

# Test social sharing
Use: https://www.opengraph.xyz/
Paste URL, verify preview appears

# Test Twitter Cards
Use: https://cards-dev.twitter.com/validator
```

---

## Issue #4: Implement Image Optimization and Lazy Loading

**Title**: Add responsive images, lazy loading, and WebP format

**Labels**: `high-priority`, `performance`, `enhancement`

**Description**:

### Problem
Images are unoptimized, causing:
- ~1MB total image weight per page
- Hero backgrounds are 450KB each
- No lazy loading (all images load immediately)
- No responsive srcset (sends desktop images to mobile)
- Poor mobile performance

**Goal**: Reduce image payload by 60-70%, improve page load by 40%

### Requirements

#### 1. Update Gallery Component

File: `src/shared/ui/components/Gallery.tsx` (Lines 45-58)

Current:
```typescript
<img
  src={image.url}
  alt={image.alt}
  className="w-full h-64 object-cover"
/>
```

Updated with responsive images + lazy loading:
```typescript
<img
  src={`${image.url}?w=800&auto=format&q=75`}
  srcSet={`
    ${image.url}?w=400&auto=format&q=75 400w,
    ${image.url}?w=800&auto=format&q=75 800w,
    ${image.url}?w=1200&auto=format&q=75 1200w
  `}
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  alt={image.alt}
  loading="lazy"
  className="w-full h-64 object-cover transition-transform duration-300"
/>
```

#### 2. Update Hero Background Images

File: `src/shared/ui/components/Hero.tsx` (Line 35)

Current:
```typescript
<div 
  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: `url(${backgroundImage})` }}
/>
```

Updated with optimized URL parameters:
```typescript
<div 
  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
  style={{ 
    backgroundImage: `url(${backgroundImage}?w=1920&auto=format&fit=crop&q=75)` 
  }}
/>
```

#### 3. Add Image Component Wrapper

Create `src/shared/ui/components/OptimizedImage.tsx`:

```typescript
interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  sizes = '100vw',
  priority = false 
}: OptimizedImageProps) => {
  return (
    <img
      src={`${src}?w=800&auto=format&q=75`}
      srcSet={`
        ${src}?w=400&auto=format&q=75 400w,
        ${src}?w=800&auto=format&q=75 800w,
        ${src}?w=1200&auto=format&q=75 1200w,
        ${src}?w=1920&auto=format&q=75 1920w
      `}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      className={className}
    />
  );
};
```

#### 4. Update All Image Usage

Replace `<img>` tags in:
- GalleryPage.tsx
- HomePage.tsx (service images if any)
- ServicesPage.tsx (service images)

With `<OptimizedImage>` component.

### Acceptance Criteria
- [ ] All images use srcset with 400w, 800w, 1200w, 1920w
- [ ] All images except Hero use loading="lazy"
- [ ] Hero background uses ?w=1920&auto=format&q=75
- [ ] Gallery images load only when scrolled into view
- [ ] Bundle size remains under 130KB
- [ ] Page load time improves by 30-40%

### Testing
```bash
# Build and measure
npm run build
# Check dist/ size

# Test in browser DevTools
1. Open Network tab
2. Disable cache
3. Reload homepage
4. Verify images load with query params (?w=800...)
5. Scroll to Gallery - images should load as you scroll
6. Check total image payload (should be ~400-500KB, down from ~1MB)
```

### Performance Metrics
**Before**:
- Total images: ~1MB
- Hero: ~450KB
- Gallery (3 images): ~600KB

**After** (Expected):
- Total images: ~400-500KB (50% reduction)
- Hero: ~200-250KB (WebP + compression)
- Gallery: ~200-250KB (lazy loaded)

---

## Issue #5: Improve CTA Copy with Benefit-Driven Language

**Title**: Replace generic CTAs with benefit-driven, variant-specific copy

**Labels**: `high-priority`, `conversion-optimization`, `cro`, `content`

**Description**:

### Problem
Current CTAs are generic and don't communicate clear benefits:
- Hero: "Schedule Consultation" (passive, not benefit-driven)
- EmailSignup: "Get Started" / "Learn More" (vague, no urgency)
- ContactPage: "Send Message" (doesn't motivate action)

**Industry Data**:
- Benefit-driven CTAs convert 15-25% better
- Action verbs outperform passive by 20%
- Personalized CTAs convert 42% more (source: HubSpot)

### Requirements

#### 1. Update variants.config.ts with New CTA Copy

File: `src/shared/config/variants.config.ts`

Update each variant's `hero.ctaText` with benefit-driven alternatives:

| Variant | Current | New (Benefit-Driven) |
|---------|---------|----------------------|
| lawFirm | "Schedule Consultation" | "Get Free Case Review" |
| fitness | "Join Now" | "Start Your Free Trial" |
| medSpa | "Book Appointment" | "Book Your Glow-Up" |
| dental | "Book Appointment" | "Claim New Patient Special" |
| restaurant | "View Menu" | "Reserve Your Table Tonight" |
| realEstate | "Browse Listings" | "Find Your Dream Home" |
| consulting | "Get Started" | "Get Free Business Audit" |
| photography | "View Portfolio" | "Book Your Session Now" |
| accounting | "Get Started" | "Get Free Tax Review" |
| salon | "Book Now" | "Get 20% Off First Visit" |
| architecture | "View Projects" | "Schedule Free Consultation" |
| marketing | "Get Proposal" | "Get Free Marketing Audit" |
| eventPlanning | "Plan Your Event" | "Book Complimentary Planning Call" |
| coaching | "Start Your Journey" | "Get Free Discovery Session" |
| therapy | "Book Appointment" | "Schedule Confidential Consultation" |
| veterinary | "Book Appointment" | "Schedule Pet Wellness Exam" |
| tutoring | "Schedule Assessment" | "Get Free Learning Assessment" |
| musicSchool | "Start Lessons" | "Claim Free Trial Lesson" |
| yoga | "Try Free Class" | "Start 7-Day Free Trial" |
| bakery | "View Menu" | "Order Custom Cake Today" |

Implementation example:
```typescript
const lawFirmConfig: SiteConfig = {
  // ...
  content: {
    hero: {
      title: 'Justice You Deserve',
      subtitle: 'Expert legal representation with proven results',
      ctaText: 'Get Free Case Review', // Changed from "Schedule Consultation"
      backgroundImage: '...',
    },
    // ...
  }
};
```

#### 2. Add Optional CTA Subtext for Urgency

Add new optional field to HeroContent interface:

```typescript
// src/shared/types/config.ts
export interface HeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaSubtext?: string; // NEW: For urgency/scarcity messaging
  backgroundImage: string;
}
```

Update select variants with urgency:
```typescript
const dentalConfig: SiteConfig = {
  content: {
    hero: {
      ctaText: 'Claim New Patient Special',
      ctaSubtext: 'Limited to first 20 patients this month', // NEW
    }
  }
};
```

#### 3. Update Hero Component to Display Subtext

File: `src/shared/ui/components/Hero.tsx` (Lines 50-60)

Add below CTA button:
```typescript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="inline-block px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg shadow-lg"
>
  {ctaText}
</motion.button>

{ctaSubtext && (
  <p className="mt-3 text-sm text-white/80">
    {ctaSubtext}
  </p>
)}
```

#### 4. Update ContactPage Submit Button

File: `src/pages/ContactPage.tsx` (Line 130)

Change from:
```typescript
<button type="submit">Send Message</button>
```

To:
```typescript
<button type="submit">Get Free Consultation</button>
```

### Acceptance Criteria
- [ ] All 20 variants have benefit-driven CTA copy (see table above)
- [ ] 3-5 variants include urgency subtext (dental, fitness, yoga, salon, tutoring)
- [ ] Hero component displays subtext when provided
- [ ] ContactPage button changed to "Get Free Consultation"
- [ ] TypeScript builds with 0 errors
- [ ] All CTAs use action verbs (Get, Claim, Start, Book, Schedule)

### A/B Testing Setup (Future)

Document recommended A/B test in comments:
```typescript
// TODO: A/B Test CTA Variations
// Variant A: "Get Free Case Review" (benefit)
// Variant B: "Schedule Consultation" (generic)
// Hypothesis: Benefit-driven CTA will improve conversions by 15-25%
// Metric: Click-through rate on Hero CTA
```

### Testing
```bash
# Build
npm run build

# Manual test
1. Switch between variants using VariantSwitcher
2. Verify each variant shows new CTA text
3. Check 3-5 variants show urgency subtext below CTA
4. Verify ContactPage shows "Get Free Consultation"
```

---

**More issues available in full analysis report. These 5 cover the critical path for production readiness.**

---

## How to Use These Prompts

### Option 1: Manual GitHub Issue Creation
1. Go to https://github.com/DaBigHomie/leeha-haywooduniversal.com/issues/new
2. Copy/paste title and description
3. Add labels
4. Assign to @copilot or yourself

### Option 2: GitHub CLI Bulk Creation
```bash
cd /Users/dame/management-git/leeha-haywooduniversal.com

# Create Issue #1
gh issue create \
  --title "Implement error handling with ErrorBoundary and NotFound page" \
  --body-file issue-prompts/issue-1.md \
  --label "critical,bug,production-blocker"

# Repeat for issues 2-5...
```

### Option 3: Copilot Agent Assignment
```bash
# Create all issues, then assign to Copilot
gh issue create --title "..." --body "..." --label "..."
gh issue edit <issue-number> --add-assignee "@copilot"
```

---

**Analysis Complete**: 15 total issues identified (5 critical detailed above). See `UX_ANALYSIS_REPORT.md` for full analysis with all 15 issues, priority matrix, and implementation phases.

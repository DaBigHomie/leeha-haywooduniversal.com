# Complete Page Implementation Plan
## Haywood Universal Next.js App

**Date**: February 5, 2026  
**Current Status**: 6/38 pages complete (16%)  
**Target**: 38 pages (100% specification coverage)

---

## ⚠️ CRITICAL: Repository Structure Context

### 🏗️ Two-Project Structure (IMPORTANT!)

This repository contains **TWO SEPARATE PROJECTS**:

**1. Root Directory (Vite Project)** - ❌ **NOT PRODUCTION**
- **Purpose**: Component development lab for Phase 1-4 agent work
- **Framework**: React 19 + Vite 7 + TailwindCSS 4
- **Location**: `/` (root directory)
- **Files**: 
  - `vite.config.ts`
  - `package.json` (Vite dependencies)
  - `/components/` (18 agent-generated components)
  - `/agents/` (Agent 1-10 build artifacts)
- **Status**: ⚠️ **Development/testing only - DO NOT DEPLOY**

**2. Next-app Directory (Next.js Project)** - ✅ **PRODUCTION**
- **Purpose**: Production-ready application deployed to Vercel
- **Framework**: React 18 + Next.js 15 + TailwindCSS 3
- **Location**: `/next-app/` subdirectory
- **Files**:
  - `next-app/next.config.js`
  - `next-app/package.json` (Next.js dependencies)
  - `next-app/src/app/` (App Router pages)
  - `next-app/src/components/` (Production components)
- **Status**: ✅ **ALL NEW PAGES GO HERE**

### 🎯 Deployment Configuration

**Root `vercel.json`** is configured to deploy the Next.js app from `next-app/`:
```json
{
  "buildCommand": "npm run build",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

**Vercel automatically detects** `next-app/` as the Next.js project directory.

### 🚨 PR #17 Context

**Open PR**: [#17 - Revert last commit to correct project implementation](https://github.com/DaBigHomie/leeha-haywooduniversal.com/pull/17)
- **Issue**: Previous commit incorrectly tried to deploy the Vite project instead of Next.js
- **Fix**: Reverted incorrect configuration, fixed Next.js build errors
- **Status**: Open, pending review
- **Changes**: 
  - Fixed GalleryPage.tsx and ServicesPage.tsx syntax errors (27 files changed)
  - Updated vercel.json to deploy from next-app/
  - Added security headers and image optimization to next.config.js

### 📝 Working Directory Rules

**When implementing new pages:**
- ✅ **ALWAYS work in** `/Users/dame/management-git/leeha-haywooduniversal.com/next-app/`
- ✅ Create pages in `next-app/src/app/[page-name]/page.tsx`
- ✅ Create components in `next-app/src/components/`
- ✅ Add content to `next-app/src/content/data.ts`
- ✅ Add types to `next-app/src/content/types.ts`
- ❌ **DO NOT** create pages in root `/components/` or `/pages/`
- ❌ **DO NOT** modify root `package.json` or `vite.config.ts`

---

## 📊 Current Inventory

### ✅ Existing Pages (6 total)

| Route | Component | Status | Spec Reference |
|-------|-----------|--------|----------------|
| `/` | HomePage | ✅ Complete | Home/Landing |
| `/services` | ServicesPage | ⚠️ Has errors | Service Directory |
| `/gallery` | GalleryPage | ⚠️ Has errors | Portfolio |
| `/contact` | ContactPage | ✅ Complete | Contact |
| `/project-management` | ProjectManagementPage | ✅ Complete | Feature 25-26 |
| `/rooms-for-rent` | RoomsForRentPage | ✅ Complete | Feature 11 |

**Pre-existing Errors to Fix**:
- `GalleryPage.tsx`: 7 TypeScript errors (JSX closing tags)
- `ServicesPage.tsx`: 7 TypeScript errors (JSX structure)

---

## 🎯 Missing Pages by Category

### CATEGORY 1: Service Pages (5 pages)
**Priority**: 🔴 **CRITICAL** - Core business offerings

| Route | Page | Spec Reference | Est. Lines | Priority |
|-------|------|----------------|------------|----------|
| `/services/tax-preparation` | TaxPreparationPage | Features 1-7 | 250 | P1 |
| `/services/property-management` | PropertyManagementPage | Features 8-13 | 280 | P1 |
| `/services/vehicle-rentals` | VehicleRentalsPage | Features 14-17 | 220 | P1 |
| `/services/truck-driving` | TruckDrivingPage | Features 18-20 | 200 | P1 |
| `/services/real-estate-education` | RealEstateEducationPage | Features 21-24 | 240 | P1 |

**Content Structure** (all follow same pattern):
- Hero section with service overview
- Service offerings grid (3-4 options with pricing)
- Benefits section (6-8 benefits)
- Process/How It Works (4-5 steps)
- CTA section
- FAQ section (5-8 questions)
- Stats section (4 metrics)

**Specification Details**:
- **Tax Preparation** (Features 1-7): Individual/business returns, real estate investors, truck drivers, audit defense, year-round planning, refund advance, payment plans
- **Property Management** (Features 8-13): Listing marketplace, tenant applications, owner dashboard, room rentals, maintenance requests, rent payment platform
- **Vehicle Rentals** (Features 14-17): Fleet management, online booking, rental agreements, insurance/roadside assistance
- **Truck Driving** (Features 18-20): CDL training, job placement, compliance/safety
- **Real Estate Education** (Features 21-24): Beginner/advanced courses, certification programs, community platform

---

### CATEGORY 2: Tool/Portal Pages (7 pages)
**Priority**: 🟡 **HIGH** - User engagement and conversion

| Route | Page | Spec Reference | Est. Lines | Priority |
|-------|------|----------------|------------|----------|
| `/tools/tax-calculator` | TaxCalculatorPage | Feature 1 integration | 180 | P2 |
| `/properties` | PropertySearchPage | Feature 8 | 300 | P2 |
| `/portal/tenant` | TenantPortalPage | Feature 9 | 250 | P2 |
| `/portal/owner` | OwnerPortalPage | Feature 10 | 280 | P2 |
| `/portal/student` | StudentPortalPage | Feature 24 | 220 | P3 |
| `/events` | EventsCalendarPage | Feature 23 | 200 | P2 |
| `/booking` | BookingPage | Feature 26 | 240 | P2 |

**Content Structure**:
- Interactive tools (calculators, search forms)
- Dashboard layouts (for portals)
- Real-time data displays
- Form submissions
- Integration with APIs

---

### CATEGORY 3: Informational Pages (8 pages)
**Priority**: 🟢 **MEDIUM** - SEO and trust building

| Route | Page | Spec Reference | Est. Lines | Priority |
|-------|------|----------------|------------|----------|
| `/about` | AboutPage | Company info | 180 | P2 |
| `/about/team` | TeamPage | Team profiles | 150 | P3 |
| `/about/testimonials` | TestimonialsPage | Feature 32 | 160 | P2 |
| `/careers` | CareersPage | Job listings | 140 | P3 |
| `/blog` | BlogPage | Content hub | 200 | P3 |
| `/blog/[slug]` | BlogPostPage | Article template | 180 | P3 |
| `/faqs` | FAQsPage | Common questions | 160 | P2 |
| `/help` | HelpCenterPage | Support | 150 | P3 |

**Content Structure**:
- Company story and mission
- Team member profiles with photos
- Customer testimonials carousel
- Job listings with application forms
- Blog grid and article templates
- FAQ accordion
- Help center with search

---

### CATEGORY 4: Legal Pages (3 pages)
**Priority**: 🟢 **MEDIUM** - Compliance required

| Route | Page | Spec Reference | Est. Lines | Priority |
|-------|------|----------------|------------|----------|
| `/legal/privacy` | PrivacyPolicyPage | Feature 38 | 200 | P2 |
| `/legal/terms` | TermsOfServicePage | Feature 38 | 220 | P2 |
| `/legal/cookies` | CookiePolicyPage | Feature 38 | 140 | P3 |

**Content Structure**:
- Legal text with sections
- Last updated date
- Table of contents
- Contact for questions

---

### CATEGORY 5: Service Sub-Pages (9 pages)
**Priority**: 🔵 **LOW** - Detailed breakdowns

| Route | Page | Spec Reference | Est. Lines | Priority |
|-------|------|----------------|------------|----------|
| `/services/tax-preparation/individual` | IndividualTaxPage | Feature 1 | 160 | P3 |
| `/services/tax-preparation/business` | BusinessTaxPage | Feature 2 | 170 | P3 |
| `/services/tax-preparation/real-estate` | RealEstateTaxPage | Feature 3 | 160 | P3 |
| `/services/property-management/tenant-screening` | TenantScreeningPage | Feature 9 | 150 | P3 |
| `/services/property-management/maintenance` | MaintenanceServicesPage | Feature 12 | 150 | P3 |
| `/services/vehicle-rentals/fleet` | FleetRentalPage | Feature 14 | 140 | P3 |
| `/services/truck-driving/cdl-training` | CDLTrainingPage | Feature 18 | 160 | P3 |
| `/services/real-estate-education/beginner` | BeginnerCoursePage | Feature 21 | 150 | P3 |
| `/services/real-estate-education/advanced` | AdvancedCoursePage | Feature 22 | 150 | P3 |

---

## 🚀 Implementation Phases

### Phase 1: Critical Service Pages (5 pages - 2-3 days)
**Goal**: Complete core business offerings for immediate launch

**Pages**:
1. `/services/tax-preparation` - TaxPreparationPage (250 lines)
2. `/services/property-management` - PropertyManagementPage (280 lines)
3. `/services/vehicle-rentals` - VehicleRentalsPage (220 lines)
4. `/services/truck-driving` - TruckDrivingPage (200 lines)
5. `/services/real-estate-education` - RealEstateEducationPage (240 lines)

**Total**: ~1,190 lines of code

**Deliverables**:
- 5 page components in `src/components/pages/`
- 5 App Router pages in `src/app/services/[service-name]/page.tsx`
- Content added to `src/content/data.ts` (~400 lines)
- Types added to `src/content/types.ts` (~80 lines)
- All pages TypeScript error-free
- SEO metadata complete

**Dependencies**:
- ServiceCard component (reusable across all service pages)
- PricingTable component (pricing grids)
- FAQAccordion component (collapsible FAQs)
- ProcessSteps component (visual step indicators)

---

### Phase 2: High-Value Tools & Informational Pages (10 pages - 3-4 days)
**Goal**: Add engagement tools and build trust/authority

**Pages**:
1. `/tools/tax-calculator` - TaxCalculatorPage (180 lines)
2. `/properties` - PropertySearchPage (300 lines)
3. `/events` - EventsCalendarPage (200 lines)
4. `/about` - AboutPage (180 lines)
5. `/about/testimonials` - TestimonialsPage (160 lines)
6. `/faqs` - FAQsPage (160 lines)
7. `/legal/privacy` - PrivacyPolicyPage (200 lines)
8. `/legal/terms` - TermsOfServicePage (220 lines)
9. `/booking` - BookingPage (240 lines)
10. Fix `/services` - ServicesPage (fix 7 errors)

**Total**: ~2,040 lines of code

**Deliverables**:
- Interactive tax calculator with form logic
- Property search with filters and map view
- Events calendar with booking integration
- About page with company story and values
- Testimonials carousel
- FAQ accordion with search
- Legal pages with table of contents
- Booking system integration

**Dependencies**:
- Calculator component (tax calculations)
- SearchFilters component (property search)
- Calendar component (events display)
- TestimonialCard component (customer reviews)
- Accordion component (FAQs)
- LegalLayout component (legal pages wrapper)

---

### Phase 3: Portals & Advanced Features (7 pages - 4-5 days)
**Goal**: Add authenticated user experiences

**Pages**:
1. `/portal/tenant` - TenantPortalPage (250 lines)
2. `/portal/owner` - OwnerPortalPage (280 lines)
3. `/portal/student` - StudentPortalPage (220 lines)
4. `/blog` - BlogPage (200 lines)
5. `/blog/[slug]` - BlogPostPage (180 lines)
6. `/about/team` - TeamPage (150 lines)
7. Fix `/gallery` - GalleryPage (fix 7 errors)

**Total**: ~1,530 lines of code

**Deliverables**:
- Tenant portal (maintenance requests, rent payment, documents)
- Owner portal (property performance, financials, tenant management)
- Student portal (course access, progress tracking, certificates)
- Blog listing and article template
- Team member profiles
- Gallery filtering fixed

**Dependencies**:
- DashboardLayout component (portal wrapper)
- DataTable component (portal data displays)
- FileUpload component (document management)
- ProgressBar component (course tracking)
- BlogCard component (blog listings)
- TeamMemberCard component (team profiles)

---

### Phase 4: Service Sub-Pages & Polish (12 pages - 3-4 days)
**Goal**: Complete all detailed service breakdowns

**Pages**:
1-9. Service sub-pages (9 pages - see Category 5 above)
10. `/careers` - CareersPage (140 lines)
11. `/help` - HelpCenterPage (150 lines)
12. `/legal/cookies` - CookiePolicyPage (140 lines)

**Total**: ~1,570 lines of code

**Deliverables**:
- Detailed service breakdowns
- Job listings with application forms
- Help center with search and articles
- Cookie policy
- Final QA and polish

**Dependencies**:
- JobListing component (career postings)
- ApplicationForm component (job applications)
- SearchBar component (help center)
- HelpArticle component (help content)

---

## 📦 Shared Components Needed

### New Components to Create (15 total)

| Component | Type | Used By | Est. Lines | Priority |
|-----------|------|---------|------------|----------|
| ServiceCard | Molecule | 5 service pages | 80 | P1 |
| PricingTable | Organism | 5 service pages | 120 | P1 |
| FAQAccordion | Organism | 6 pages | 100 | P1 |
| ProcessSteps | Organism | 8 pages | 90 | P1 |
| Calculator | Organism | Tax calculator | 150 | P2 |
| SearchFilters | Organism | Property search | 140 | P2 |
| Calendar | Organism | Events page | 180 | P2 |
| TestimonialCard | Molecule | Testimonials | 70 | P2 |
| Accordion | Molecule | FAQs, legal | 60 | P2 |
| LegalLayout | Template | Legal pages | 50 | P2 |
| DashboardLayout | Template | Portals | 120 | P3 |
| DataTable | Organism | Portals | 200 | P3 |
| FileUpload | Molecule | Portals | 100 | P3 |
| ProgressBar | Atom | Student portal | 40 | P3 |
| BlogCard | Molecule | Blog | 80 | P3 |

**Total Component Lines**: ~1,580 lines

---

## 📈 Implementation Metrics

### Total Scope
- **Pages**: 32 new pages + 2 fixes = 34 pages to implement
- **Components**: 15 new shared components
- **Lines of Code**: ~8,910 lines (pages + components + content + types)
- **Estimated Time**: 12-16 days (with testing and QA)

### Progress Tracking
- **Current**: 6/38 pages (16%)
- **After Phase 1**: 11/38 pages (29%)
- **After Phase 2**: 21/38 pages (55%)
- **After Phase 3**: 28/38 pages (74%)
- **After Phase 4**: 38/38 pages (100%)

---

## 🛠️ Technical Requirements

### Content Management
- Expand `data.ts` with ~1,200 lines of new content
- Add ~200 lines to `types.ts` for new interfaces
- Maintain centralized content pattern

### Routing
- Create 32 new App Router directories
- Add metadata for all pages (SEO)
- Configure dynamic routes for blog

### Component Architecture
- Follow Atomic Design (atoms → molecules → organisms)
- Maintain shared Layout wrapper
- Reuse Hero component across all pages
- Build reusable ServiceCard, PricingTable, etc.

### State Management
- Calculator logic (tax calculator)
- Search filters (property search)
- Form validation (contact, booking, applications)
- Portal data fetching (dashboards)

### Authentication
- Tenant portal login
- Owner portal login
- Student portal login
- Role-based access control

### Third-Party Integrations
- Booking system (Feature 26)
- Payment processing (Stripe/Square)
- Map API (property locations)
- Email service (form submissions)

---

## ✅ Quality Gates (Per Phase)

### Before Completing Each Phase
1. ✅ TypeScript: `npx tsc --noEmit` (0 errors)
2. ✅ ESLint: `npm run lint` (0 errors, warnings OK)
3. ✅ Build: `npm run build` (successful)
4. ✅ Mobile: Test at 375px, 768px, 1024px viewports
5. ✅ Browser: Chrome, Safari, Firefox compatibility
6. ✅ Accessibility: aria-labels, keyboard navigation
7. ✅ SEO: Metadata complete for all pages
8. ✅ Performance: Lighthouse score 90+ (desktop)
9. ✅ Git: Commit with evidence, push to main
10. ✅ Deployment: Vercel preview deploy successful

---

## 🎯 Phase 1 Detailed Plan

### Implementation Order (5 Service Pages)

#### 1. Tax Preparation Page (Day 1 Morning)
**Route**: `/services/tax-preparation`  
**Spec**: Features 1-7 (Lines 40-332)

**Content Sections**:
- Hero: "Expert Tax Preparation Services"
- Services Grid (4 options):
  - Individual Tax Returns ($150+)
  - Business Tax Returns ($500+)
  - Real Estate Investor Package ($400+)
  - Truck Driver Special ($200+)
- Benefits (8 items):
  - Maximize refunds, year-round support, IRS audit defense, e-filing, quarterly estimates, payment plans up to 36 months
- Process (4 steps):
  - Book consultation → Gather documents → File return → Get refund
- FAQ (8 questions):
  - Pricing, documents needed, timeline, payment plans, audit protection, tax planning, refund advance, appointment scheduling
- Stats: 5,000+ returns filed, 98% satisfaction, $12M+ refunds, 15+ years experience
- CTA: "Get Free Tax Quote" + "Book Appointment"

**Dependencies**:
- ServiceCard component
- PricingTable component
- FAQAccordion component
- ProcessSteps component

**Files to Create**:
- `src/components/pages/TaxPreparationPage.tsx` (250 lines)
- `src/app/services/tax-preparation/page.tsx` (20 lines)
- Add content to `data.ts` (~80 lines)

---

#### 2. Property Management Page (Day 1 Afternoon)
**Route**: `/services/property-management`  
**Spec**: Features 8-13 (Lines 335-720)

**Content Sections**:
- Hero: "Professional Property Management Services"
- Services Grid (6 options):
  - Full-Service Management (8% of rent)
  - Tenant Placement Only ($500)
  - Lease-Only Service ($250)
  - Maintenance Coordination ($150/month)
  - Rent Collection ($100/month)
  - Eviction Services ($750)
- Property Types:
  - Single-family homes, apartments/condos, townhomes, rooms for rent, short-term rentals, commercial spaces
- Features:
  - Listing marketplace, tenant screening, rent collection, maintenance requests, owner portal, financial reporting
- Process (5 steps):
  - Property evaluation → Pricing & marketing → Tenant screening → Lease signing → Ongoing management
- Benefits (8 items):
  - Higher rents, less vacancies, vetted tenants, 24/7 maintenance, legal compliance, financial reports, stress-free ownership
- Stats: 200+ properties, 95% occupancy rate, $2.5M+ monthly rents, 4.7/5 owner satisfaction
- CTA: "Get Free Property Analysis" + "View Our Properties"

**Files to Create**:
- `src/components/pages/PropertyManagementPage.tsx` (280 lines)
- `src/app/services/property-management/page.tsx` (20 lines)
- Add content to `data.ts` (~90 lines)

---

#### 3. Vehicle Rentals Page (Day 2 Morning)
**Route**: `/services/vehicle-rentals`  
**Spec**: Features 14-17 (Lines 794-1088)

**Content Sections**:
- Hero: "Reliable Vehicle Rentals for Every Need"
- Fleet Options (6 vehicle types):
  - Economy Cars ($35/day)
  - SUVs ($55/day)
  - Cargo Vans ($75/day)
  - Box Trucks ($99/day)
  - Pickup Trucks ($65/day)
  - Passenger Vans ($85/day)
- Features:
  - Online booking 24/7, flexible rental periods (daily/weekly/monthly), insurance options, roadside assistance, GPS navigation, unlimited mileage (local)
- Rental Requirements:
  - Valid driver's license (21+), major credit card, proof of insurance, deposit ($200-$500)
- Process (4 steps):
  - Select vehicle online → Reserve & pay deposit → Pick up vehicle → Return on time
- Benefits (6 items):
  - Clean & maintained vehicles, competitive pricing, convenient pickup locations, flexible cancellation, loyalty rewards, business accounts
- Stats: 50+ vehicles, 10,000+ rentals/year, 99% availability, 4.9/5 customer rating
- CTA: "Reserve Vehicle Now" + "View Fleet"

**Files to Create**:
- `src/components/pages/VehicleRentalsPage.tsx` (220 lines)
- `src/app/services/vehicle-rentals/page.tsx` (20 lines)
- Add content to `data.ts` (~75 lines)

---

#### 4. Truck Driving Page (Day 2 Afternoon)
**Route**: `/services/truck-driving`  
**Spec**: Features 18-20 (Lines 1088-1290)

**Content Sections**:
- Hero: "Start Your Trucking Career Today"
- Services (3 offerings):
  - CDL Class A Training ($4,500)
  - CDL Class B Training ($3,200)
  - Job Placement Assistance (Included)
- Training Program:
  - Classroom instruction (80 hours), behind-the-wheel training (120 hours), DOT physical & drug test, CDL exam preparation, job placement support
- Career Opportunities:
  - Long-haul trucking ($50-70K/year), local delivery ($40-55K/year), owner-operator ($80-120K/year), specialized freight ($60-90K/year)
- Requirements:
  - 21+ years old, valid driver's license, clean driving record (3 years), DOT medical certification, pass drug screening
- Process (5 steps):
  - Enrollment → Classroom training → Road training → CDL exam → Job placement
- Benefits (6 items):
  - FMCSA certified instructors, modern training trucks, flexible schedules, payment plans available, lifetime job placement, veteran discounts
- Stats: 500+ students graduated, 95% pass rate, 90% job placement, 20+ years experience
- CTA: "Start CDL Training" + "Schedule Tour"

**Files to Create**:
- `src/components/pages/TruckDrivingPage.tsx` (200 lines)
- `src/app/services/truck-driving/page.tsx` (20 lines)
- Add content to `data.ts` (~70 lines)

---

#### 5. Real Estate Education Page (Day 3)
**Route**: `/services/real-estate-education`  
**Spec**: Features 21-24 (Lines 1290-1587)

**Content Sections**:
- Hero: "Build Wealth Through Real Estate Education"
- Course Options (4 levels):
  - Beginner Investor Course ($497)
  - Advanced Strategies Course ($997)
  - Certification Program ($2,497)
  - VIP Mentorship ($5,000)
- Topics Covered:
  - Rental property investing, house flipping, wholesaling, commercial real estate, creative financing, property analysis, negotiation tactics, exit strategies
- Course Format:
  - Online video lessons, live Q&A sessions, downloadable resources, community forum access, lifetime updates, certificate of completion
- Instructor:
  - Lee Haywood (15+ years real estate investing, 50+ properties portfolio, certified real estate educator)
- Process (4 steps):
  - Enroll in course → Complete lessons → Apply strategies → Get certified
- Benefits (8 items):
  - Self-paced learning, lifetime access, expert instruction, real-world case studies, community support, actionable strategies, proven ROI, money-back guarantee
- Stats: 2,000+ students, $50M+ in deals, 4.8/5 rating, 300+ success stories
- CTA: "Enroll Now" + "Free Sample Lesson"

**Files to Create**:
- `src/components/pages/RealEstateEducationPage.tsx` (240 lines)
- `src/app/services/real-estate-education/page.tsx` (20 lines)
- Add content to `data.ts` (~85 lines)

---

### Shared Components to Create (Phase 1)

#### 1. ServiceCard Component
**File**: `src/components/molecules/ServiceCard/ServiceCard.tsx` (80 lines)

```tsx
interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  ctaLabel?: string;
  ctaHref?: string;
}
```

**Purpose**: Reusable card for displaying service offerings with pricing and features

---

#### 2. PricingTable Component
**File**: `src/components/organisms/PricingTable/PricingTable.tsx` (120 lines)

```tsx
interface PricingOption {
  title: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

interface PricingTableProps {
  options: PricingOption[];
  ctaLabel?: string;
}
```

**Purpose**: Grid of pricing options with features comparison

---

#### 3. FAQAccordion Component
**File**: `src/components/organisms/FAQAccordion/FAQAccordion.tsx` (100 lines)

```tsx
interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
  title?: string;
}
```

**Purpose**: Collapsible FAQ section with smooth animations

---

#### 4. ProcessSteps Component
**File**: `src/components/organisms/ProcessSteps/ProcessSteps.tsx` (90 lines)

```tsx
interface Step {
  step: number;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: Step[];
  title?: string;
}
```

**Purpose**: Visual step-by-step process indicator

---

### Phase 1 Summary

**Total Files to Create**: 29 files
- 5 page components (1,190 lines)
- 5 App Router pages (100 lines)
- 4 shared components (390 lines)
- Content additions to data.ts (~400 lines)
- Type additions to types.ts (~80 lines)

**Total Lines of Code**: ~2,160 lines

**Estimated Time**: 2-3 days

**Deliverables**:
- ✅ All 5 service pages complete and error-free
- ✅ Shared components created and tested
- ✅ Content centralized in data.ts
- ✅ SEO metadata for all pages
- ✅ Mobile-responsive layouts
- ✅ Ready for deployment

---

## 📝 Next Steps After Plan Approval

1. **Review & Approve**: Confirm Phase 1 scope and priorities
2. **Start Implementation**: Begin with ServiceCard component
3. **Incremental Testing**: Test each page as it's created
4. **Progress Updates**: Report after each page completion
5. **Phase 1 Completion**: Full QA and deployment

**Ready to begin Phase 1 implementation?**

---

## 📋 Pre-Implementation Checklist

### Before Starting Phase 1

- [ ] **Review PR #17** - Ensure revert PR is merged or closed
- [ ] **Verify working directory** - Confirm we're in `/next-app/` subdirectory
- [ ] **Check TypeScript errors** - Run `npx tsc --noEmit` in next-app
- [ ] **Fix pre-existing errors** - GalleryPage.tsx and ServicesPage.tsx (if not fixed by PR #17)
- [ ] **Install dependencies** - Run `npm install` in next-app if needed
- [ ] **Test dev server** - Run `npm run dev` to ensure it starts
- [ ] **Create feature branch** - `git checkout -b feature/phase-1-service-pages`

### Repository Context Reminders

**Always remember:**
1. 🏗️ **Two projects**: Root (Vite - dev only) vs next-app (Next.js - production)
2. 📁 **Work in next-app**: All new pages go in `next-app/src/app/`
3. 🚀 **Deployment**: Vercel deploys from next-app/ automatically
4. ✅ **PR #17**: Review status before starting new work
5. 🔍 **Issues #13-15**: Agent build issues (Phase 3) - for reference only

---

## 🎯 Implementation Start Command

When ready to begin Phase 1:

```bash
cd /Users/dame/management-git/leeha-haywooduniversal.com/next-app
git checkout -b feature/phase-1-service-pages
npm install
npm run dev # Verify it works
npx tsc --noEmit # Check for errors
```

Then proceed with creating shared components first:
1. ServiceCard
2. PricingTable
3. FAQAccordion
4. ProcessSteps

**Status**: Plan complete, awaiting approval to begin implementation.


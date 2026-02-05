# Prompt for Claude AI: Redesign Haywood Universal Folder Structure

Copy and paste this entire prompt to Claude AI to get assistance with redesigning the haywood-universal folder.

---

## 🎯 Task Overview

I need your help redesigning the `haywood-universal/` folder structure in my website project. This folder currently contains specification documents for the Haywood Universal website, but it needs better organization and potentially new implementation prompts.

## 📂 Current Project Structure

I have **TWO SEPARATE** website implementations:

### 1. **Vite Project** (Root Directory)
- Location: `/Users/dame/management-git/leeha-haywooduniversal.com/`
- Purpose: Component development lab with 8-agent AI pipeline
- Tech: Vite 7.2.4 + React 19.2.0 + TailwindCSS 4.1.18
- Status: Development/Legacy (Phase 1-3 complete)

### 2. **Next.js Project** (next-app/)
- Location: `/Users/dame/management-git/leeha-haywooduniversal.com/next-app/`
- Purpose: Production deployment target
- Tech: Next.js 15.0.0 + React 18.3.0
- Status: **Production-ready** ✅ (all builds passing, ready to deploy)

## 📋 Complete Project Documentation

Here's the full documentation of both projects:

### File Structure Overview

```
leeha-haywooduniversal.com/
├── agents/                       # 8 AI agents (crawler → pages)
│   ├── agent-1-crawler/          # Web scraping
│   ├── agent-2-content/          # Content extraction
│   ├── agent-3-assets/           # Asset optimization
│   ├── agent-4-design/           # Design tokens
│   ├── agent-5-components/       # Component specs
│   ├── agent-6-atomic/           # Atomic components
│   ├── agent-7-composite/        # Composite components
│   └── agent-8-pages/            # Page templates
│
├── output/                       # Generated artifacts
│   ├── components/               # Full component library
│   │   ├── atoms/                # Button, Text, Icon, Input
│   │   ├── molecules/            # Card, FormField, NavLink
│   │   ├── organisms/            # Header, Footer, Hero, ServiceGrid
│   │   └── pages/                # HomePage, ServicesPage, Gallery, Contact
│   │
│   ├── design-tokens/            # Design system
│   │   ├── design-tokens.json    # Colors, typography, spacing
│   │   ├── globals.css           # CSS variables
│   │   ├── tailwind.config.ts    # Tailwind theme
│   │   └── DESIGN_SYSTEM.md
│   │
│   ├── content-data/             # Content library
│   │   ├── content-library.json  # All site content
│   │   └── CONTENT_GUIDE.md
│   │
│   ├── asset-data/               # Optimized assets
│   │   └── images/optimized/     # WebP images (33% smaller)
│   │
│   └── crawl-data/               # Original site data
│       ├── html/                 # Scraped pages
│       └── site-structure.json
│
├── haywood-universal/            # ⚠️ FOLDER TO REDESIGN
│   ├── HAYWOOD_UNIVERSAL_COMPLETE_SPEC.md
│   ├── HAYWOOD_UNIVERSAL_DESIGN_SYSTEM.md
│   ├── HAYWOOD_UNIVERSAL_MASTER_PLAN.md
│   ├── HAYWOOD_UNIVERSAL_GAP_ANALYSIS.md
│   └── [4 implementation prompt files]
│
├── next-app/                     # Production Next.js app
│   ├── src/
│   │   ├── app/                  # App Router
│   │   │   ├── page.tsx          # Homepage (/)
│   │   │   ├── services/         # /services
│   │   │   ├── gallery/          # /gallery
│   │   │   ├── contact/          # /contact
│   │   │   ├── api/contact/      # POST /api/contact
│   │   │   ├── sitemap.ts        # SEO sitemap
│   │   │   ├── robots.ts         # Robots.txt
│   │   │   └── globals.css
│   │   │
│   │   ├── components/           # Atomic design components
│   │   │   ├── atoms/
│   │   │   ├── molecules/
│   │   │   ├── organisms/
│   │   │   └── pages/
│   │   │
│   │   ├── content/              # Real business content
│   │   │   ├── types.ts          # TypeScript interfaces
│   │   │   └── data.ts           # Actual content from haywooduniversal.com
│   │   │
│   │   └── lib/                  # Utils
│   │       └── seo.ts
│   │
│   └── public/images/gallery/    # 3 optimized WebP images
│
├── src/                          # Vite app source
├── public/                       # Vite static assets
├── docs/                         # Documentation
├── scripts/                      # Build scripts
└── package.json                  # Vite dependencies
```

### Technology Stacks

**Vite Project:**
```json
{
  "vite": "7.2.4",
  "react": "19.2.0",
  "react-router-dom": "7.13.0",
  "tailwindcss": "4.1.18",
  "framer-motion": "12.30.0",
  "lucide-react": "0.563.0",
  "typescript": "5.9.3"
}
```

**Next.js Project:**
```json
{
  "next": "15.0.0",
  "react": "18.3.0",
  "tailwindcss": "3.4.0",
  "resend": "6.9.1",
  "zod": "4.3.6",
  "typescript": "5.x"
}
```

### Business Context

**Haywood Universal** (haywooduniversal.com)

**Services:**
1. **Tax Preparation** ($50-250)
   - Individual Returns
   - Business Returns
   - Quarterly Filings
   - Tax Consultation

2. **Business Services** ($50-750)
   - Business Formation
   - Financial Planning
   - Bookkeeping
   - Account Management

3. **Mentorship** ($50-150)
   - Career Coaching
   - Professional Development
   - 1-on-1 Sessions
   - Group Workshops

4. **Consulting** ($100-750)
   - Project Management
   - Strategy Development
   - Process Optimization
   - Implementation Support

**Contact:**
- Phone: (678) 274-9182
- Email: info@haywooduniversal.com
- Payment: Cash App, Zelle, Venmo, PayPal

### P0 Sprint Status (100% Complete) ✅

**Completed Tasks:**
1. ✅ Real content integration (no placeholders)
2. ✅ Image optimization (3 WebP images, 33% size reduction)
3. ✅ API route (contact form with Resend email)
4. ✅ SEO (meta tags, sitemap, robots.txt, Open Graph)
5. ✅ Deployment config (Vercel ready)
6. ✅ Build fixes (CSS paths, imports, client directives)
7. ✅ Dev server running (GET / 200 in 5229ms)
8. ✅ Testing setup (Playwright configured)

**Build Status:**
- ✅ TypeScript: Compiling successfully
- ✅ Next.js: 572 modules in 4.2s
- ✅ All pages functional (Home, Services, Gallery, Contact)
- ✅ API endpoint working (form validation ready)

### Current haywood-universal/ Folder

**Existing Files:**
```
haywood-universal/
├── HAYWOOD_UNIVERSAL_COMPLETE_SPEC.md
├── HAYWOOD_UNIVERSAL_DESIGN_SYSTEM.md
├── HAYWOOD_UNIVERSAL_MASTER_PLAN.md
├── HAYWOOD_UNIVERSAL_GAP_ANALYSIS.md
└── [Implementation prompt files - need to verify names]
```

**Purpose of Folder:**
- Stores specification documents
- Contains implementation prompts for AI agents
- Acts as source of truth for project requirements
- Guides the 8-agent pipeline

## 🎯 What I Need Help With

### 1. **Folder Reorganization**

**Current Issues:**
- Files are flat (no sub-folders)
- Naming is inconsistent
- Unclear which documents are active vs archived
- No clear hierarchy or navigation

**Desired Outcome:**
- Better organization (maybe sub-folders for specs, prompts, design, content?)
- Clear naming convention
- Easy to find relevant documents
- Version control (Phase 1 vs Phase 2 specs?)

### 2. **Implementation Prompt Review**

**Questions:**
- Are the 4 implementation prompts still relevant?
- Do they align with Next.js 15 architecture?
- Should we create new prompts for:
  - Next.js App Router setup
  - Vercel deployment
  - API route creation
  - SEO optimization

### 3. **Documentation Gaps**

**What's Missing:**
- Deployment guide (Vercel step-by-step)
- Testing strategy (Playwright tests)
- Environment variables documentation
- API integration guide (Resend email)
- Content management guide (updating data.ts)
- Image optimization workflow

### 4. **Alignment with Next.js Project**

**Ensure Consistency:**
- Specs should match the **Next.js implementation** (not Vite)
- Design system should reference `next-app/tailwind.config.ts`
- Content structure should match `next-app/src/content/data.ts`
- Component specs should align with actual components in `next-app/src/components/`

## 📝 Specific Questions for You

1. **Folder Structure**: What's the best way to organize specification documents for a dual-project setup (Vite dev + Next.js prod)?

2. **Implementation Prompts**: Should I create separate prompts for:
   - Vite component development
   - Next.js production deployment
   - Testing & validation
   - Performance optimization

3. **Documentation**: What critical documents am I missing for:
   - Developer onboarding
   - Content editors
   - Deployment engineers
   - QA testers

4. **Versioning**: How should I track which specs are for:
   - Phase 1-3 (completed - agent pipeline)
   - Phase 4-6 (future - testing, deployment, optimization)
   - Next.js-specific features

5. **Agent Pipeline**: Should the haywood-universal folder be the **source of truth** for what the 8 agents generate? Or should it be separate?

## 🎨 Design System Context

**Current State:**
- Design tokens in `/output/design-tokens/design-tokens.json`
- Tailwind config in `/output/design-tokens/tailwind.config.ts`
- CSS variables in `/output/design-tokens/globals.css`

**Color Palette:**
- Primary: Navy Blue (#1e3a8a)
- Secondary: Gold (#f59e0b)
- Accent: Green (#10b981)

**Typography:**
- Headings: Inter (sans-serif)
- Body: Inter (sans-serif)
- Scale: 14px, 16px, 18px, 24px, 32px, 48px

**Components:**
- **Atoms**: Button (4 variants), Text, Icon, Input
- **Molecules**: Card, FormField, NavLink
- **Organisms**: Header, Footer, Hero, ServiceGrid, ContactForm
- **Pages**: HomePage, ServicesPage, GalleryPage, ContactPage

## 🚀 Deployment Status

**Next.js Project:**
- ✅ Build: Passing (572 modules in 4.2s)
- ✅ Dev Server: Running at localhost:3000
- ✅ Vercel: Linked to project (prj_XFSfG2H2WZ6Y64pyD5WgGnP0rKSQ)
- ⚠️ Environment Variables: Need to add RESEND_API_KEY
- ⏳ Production Deploy: Not yet deployed (ready when you are)

## 📊 What Success Looks Like

After your redesign, the haywood-universal folder should:

1. ✅ **Be well-organized** - Clear hierarchy, easy navigation
2. ✅ **Be up-to-date** - Reflect the Next.js 15 implementation
3. ✅ **Be comprehensive** - Cover all aspects (dev, deploy, test, content)
4. ✅ **Be actionable** - Implementation prompts are clear and specific
5. ✅ **Be versioned** - Clear separation of phases/sprints
6. ✅ **Be aligned** - Specs match actual implementation

## 🤔 Additional Context

**Agent Pipeline Flow:**
1. Agent 1: Crawl haywooduniversal.com → `/output/crawl-data/`
2. Agent 2: Extract content → `/output/content-data/`
3. Agent 3: Optimize assets → `/output/asset-data/`
4. Agent 4: Generate design tokens → `/output/design-tokens/`
5. Agent 5: Create component specs → `/output/component-architecture/`
6. Agent 6: Build atomic components → `/output/components/atoms/`
7. Agent 7: Build composite components → `/output/components/organisms/`
8. Agent 8: Build page templates → `/output/components/pages/`

**Then:**
- Copy components to `/next-app/src/components/`
- Wire content to `/next-app/src/content/data.ts`
- Deploy to Vercel

## 📚 Reference Materials

You can find the complete project documentation in:
- `COMPLETE_PROJECT_DOCUMENTATION.md` (just created)
- `P0_SPRINT_SUMMARY.md` (P0 completion report)
- `PROJECT_STATUS.md` (current status)
- `GAP_ANALYSIS.md` (feature gaps)

## ✨ Your Task

Please help me:

1. **Propose a new folder structure** for `haywood-universal/`
2. **Identify which documents to keep/archive/create**
3. **Create updated implementation prompts** aligned with Next.js 15
4. **Fill documentation gaps** (deployment, testing, content, API)
5. **Suggest versioning strategy** for phased development
6. **Ensure alignment** between specs and actual implementation

**Constraints:**
- Keep it simple (not over-engineered)
- Prioritize developer experience
- Align with Next.js 15 App Router patterns
- Support both Vite (dev) and Next.js (prod) workflows

**Deliverables I Need:**
1. Proposed folder structure (markdown with tree view)
2. List of documents to create/update/archive
3. Updated implementation prompt templates
4. Documentation checklist (what's missing)
5. Versioning strategy recommendation

---

Thank you! Let me know if you need any clarification or additional context.

#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# CREATE PHASE 3 ISSUES
# Creates GitHub issues for all Phase 3 component development
# ═══════════════════════════════════════════════════════════════

set -e

REPO_OWNER="DaBigHomie"
REPO_NAME="leeha-haywooduniversal.com"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo -e "${CYAN}🎯 Creating Phase 3 Issues for Haywood Universal${NC}"
echo ""

# Get milestone number for Phase 3
PHASE3_MILESTONE=$(gh api repos/$REPO_OWNER/$REPO_NAME/milestones --jq '.[] | select(.title=="Phase 3: Component Development") | .number' 2>/dev/null || echo "")

# Agent 6: Atomic Component Developer
echo "📝 Creating Agent 6 issue..."
gh issue create \
    --repo "$REPO_OWNER/$REPO_NAME" \
    --title "Agent 6: Build Atomic Components (Button, Input, Text, Icon)" \
    --label "phase-3-components,agent:atoms,priority:p1,type:component" \
    --milestone "$PHASE3_MILESTONE" \
    --body "## Agent 6: Atomic Component Developer

### Objective
Build foundational atomic components using design tokens from Agent 4.

### Components to Build

#### 1. Button Component
- **Variants**: \`primary\`, \`secondary\`, \`outline\`
- **Sizes**: \`sm\`, \`md\`, \`lg\`
- **States**: default, hover, active, disabled, loading
- **Props**: \`variant\`, \`size\`, \`disabled\`, \`loading\`, \`onClick\`, \`children\`

#### 2. Input Component
- **Types**: \`text\`, \`email\`, \`password\`, \`tel\`, \`number\`
- **States**: default, focus, error, disabled
- **Props**: \`type\`, \`placeholder\`, \`value\`, \`onChange\`, \`error\`, \`disabled\`, \`required\`

#### 3. Text Component
- **Variants**: \`h1\`, \`h2\`, \`h3\`, \`h4\`, \`body\`, \`caption\`, \`small\`
- **Props**: \`variant\`, \`color\`, \`align\`, \`weight\`, \`children\`

#### 4. Icon Component
- **SVG Icon System** using lucide-react or heroicons
- **Sizes**: 16px, 20px, 24px, 32px
- **Props**: \`name\`, \`size\`, \`color\`, \`className\`

### Implementation Details

**Tech Stack**:
- React 18+ with TypeScript
- TailwindCSS (using design tokens from \`output/design-tokens/\`)
- Storybook for component documentation

**File Structure**:
\`\`\`
components/atoms/
├── Button/
│   ├── Button.tsx
│   ├── Button.stories.tsx
│   └── Button.test.tsx
├── Input/
│   ├── Input.tsx
│   ├── Input.stories.tsx
│   └── Input.test.tsx
├── Text/
│   ├── Text.tsx
│   ├── Text.stories.tsx
│   └── Text.test.tsx
└── Icon/
    ├── Icon.tsx
    ├── Icon.stories.tsx
    └── Icon.test.tsx
\`\`\`

### Acceptance Criteria
- [ ] All 4 atomic components built with TypeScript
- [ ] Props match interfaces from \`output/component-architecture/component-types.ts\`
- [ ] Uses design tokens from \`output/design-tokens/tailwind.config.ts\`
- [ ] Storybook stories show all variants and states
- [ ] Unit tests with >80% coverage
- [ ] Accessibility: ARIA labels, keyboard navigation, screen reader support
- [ ] Responsive: works on mobile (375px) and desktop (1920px)

### Dependencies
- ✅ **Agent 4**: Design tokens available
- ✅ **Agent 5**: Component specifications ready

### Deliverables
- 4 production-ready React components
- Storybook documentation
- Unit tests
- Updated \`components/atoms/index.ts\` for exports

### Estimated Time
- 4-6 hours

### Testing Checklist
- [ ] Visual regression tests in Storybook
- [ ] Unit tests pass (\`npm test\`)
- [ ] TypeScript compilation succeeds (\`npx tsc --noEmit\`)
- [ ] ESLint passes (\`npm run lint\`)
- [ ] Accessibility audit (Lighthouse, axe DevTools)

---

**Branch**: \`feat/agent-6-atomic-components\`  
**Milestone**: Phase 3: Component Development" 2>/dev/null

echo -e "${GREEN}   ✅ Agent 6 issue created${NC}"

# Agent 7: Composite Component Developer
echo "📝 Creating Agent 7 issue..."
gh issue create \
    --repo "$REPO_OWNER/$REPO_NAME" \
    --title "Agent 7: Build Composite Components (Molecules & Organisms)" \
    --label "phase-3-components,agent:molecules,priority:p1,type:component" \
    --milestone "$PHASE3_MILESTONE" \
    --body "## Agent 7: Composite Component Developer

### Objective
Build composite components (molecules & organisms) using atomic components from Agent 6.

### Molecules to Build

#### 1. FormField
- **Composition**: Label + Input + Error Message
- **Props**: \`label\`, \`error\`, \`required\`, \`children\`
- **Dependencies**: Text, Input

#### 2. Card
- **Composition**: Image + Title + Description + Button
- **Variants**: \`default\`, \`hover\`, \`featured\`
- **Props**: \`image\`, \`title\`, \`description\`, \`action\`, \`variant\`
- **Dependencies**: Text, Button

#### 3. NavLink
- **Composition**: Link + Active State Indicator
- **Props**: \`href\`, \`active\`, \`children\`
- **Dependencies**: Text

### Organisms to Build

#### 4. Header
- **Composition**: Logo + Navigation + CTA Button + Mobile Menu
- **Features**: Sticky header, mobile responsive, dropdown menus
- **Props**: \`logo\`, \`navigation\`, \`actions\`
- **Dependencies**: NavLink, Button

#### 5. Footer
- **Composition**: Links Grid + Social Icons + Copyright
- **Props**: \`links\`, \`social\`, \`copyright\`
- **Dependencies**: NavLink, Icon

#### 6. Hero
- **Composition**: Background Image + Title + Subtitle + CTA
- **Variants**: \`fullscreen\`, \`split\`, \`centered\`
- **Props**: \`title\`, \`subtitle\`, \`image\`, \`cta\`, \`variant\`
- **Dependencies**: Text, Button

#### 7. ContactForm
- **Composition**: Multiple FormFields + Submit Button
- **Validation**: Email, phone, required fields
- **Props**: \`onSubmit\`, \`loading\`
- **Dependencies**: FormField, Button

#### 8. ServiceGrid
- **Composition**: Grid of Cards
- **Features**: Responsive grid (1 col mobile, 3 cols desktop)
- **Props**: \`services\`, \`columns\`
- **Dependencies**: Card

### Implementation Details

**File Structure**:
\`\`\`
components/
├── molecules/
│   ├── FormField/
│   ├── Card/
│   └── NavLink/
└── organisms/
    ├── Header/
    ├── Footer/
    ├── Hero/
    ├── ContactForm/
    └── ServiceGrid/
\`\`\`

### Acceptance Criteria
- [ ] All 8 components built with TypeScript
- [ ] Props match specifications from Agent 5
- [ ] Uses atomic components from Agent 6
- [ ] Storybook stories for all components
- [ ] Unit tests with >80% coverage
- [ ] Mobile-first responsive design
- [ ] Accessibility compliant (WCAG 2.1 AA)

### Dependencies
- ✅ **Agent 4**: Design tokens
- ✅ **Agent 5**: Component specs
- ⏳ **Agent 6**: Atomic components (Button, Input, Text, Icon)

### Deliverables
- 3 molecule components
- 5 organism components
- Storybook documentation
- Unit tests
- Updated component exports

### Estimated Time
- 6-8 hours

### Testing Checklist
- [ ] All organisms work on mobile (375px)
- [ ] Header sticky behavior works
- [ ] ContactForm validation works
- [ ] ServiceGrid responsive layout works
- [ ] All Storybook stories load
- [ ] TypeScript/ESLint passes

---

**Branch**: \`feat/agent-7-composite-components\`  
**Milestone**: Phase 3: Component Development" 2>/dev/null

echo -e "${GREEN}   ✅ Agent 7 issue created${NC}"

# Agent 8: Page Builder
echo "📝 Creating Agent 8 issue..."
gh issue create \
    --repo "$REPO_OWNER/$REPO_NAME" \
    --title "Agent 8: Build Pages (Homepage, Services, Gallery, Contact)" \
    --label "phase-3-components,agent:pages,priority:p1,type:page" \
    --milestone "$PHASE3_MILESTONE" \
    --body "## Agent 8: Page Builder

### Objective
Build complete page templates using organisms from Agent 7 and content from Agents 1-2.

### Pages to Build

#### 1. Homepage (\`/\`)
**Composition**:
- Hero section (construction management hero)
- Service grid (6 services)
- Trust indicators (licenses, certifications)
- Contact CTA

**Content Source**: \`output/content-data/content-library.json\`

#### 2. Services Page (\`/services\`)
**Composition**:
- Page header
- Service grid (all services)
- Individual service details
- Contact form

#### 3. Gallery Page (\`/gallery\`)
**Composition**:
- Image grid
- Lightbox viewer
- Category filters

**Asset Source**: \`output/asset-data/optimized/\`

#### 4. Contact Page (\`/contact\`)
**Composition**:
- Contact form
- Business info
- Location map
- Operating hours

#### 5. Project Management Page (\`/project-management\`)
**Composition**:
- Service hero
- Project management features
- Case studies
- Contact CTA

#### 6. Rooms for Rent Page (\`/rooms-for-rent\`)
**Composition**:
- Property listings
- Room details
- Booking calendar
- Contact form

### Implementation Details

**Tech Stack**:
- Next.js 15 App Router
- TypeScript
- TailwindCSS
- React Server Components

**File Structure**:
\`\`\`
app/
├── page.tsx                    (Homepage)
├── services/
│   └── page.tsx
├── gallery/
│   └── page.tsx
├── contact/
│   └── page.tsx
├── project-management/
│   └── page.tsx
└── rooms-for-rent/
    └── page.tsx
\`\`\`

### Acceptance Criteria
- [ ] All 6 pages built using Next.js App Router
- [ ] Uses organisms from Agent 7
- [ ] Content populated from Agent 2 data
- [ ] Images from Agent 3 optimized assets
- [ ] SEO metadata (title, description, OG tags)
- [ ] Mobile responsive (tested at 375px, 768px, 1024px, 1920px)
- [ ] Accessibility (WCAG 2.1 AA)
- [ ] Loading states for dynamic content

### Dependencies
- ✅ **Agent 1**: Site structure
- ✅ **Agent 2**: Content library
- ✅ **Agent 3**: Optimized images
- ✅ **Agent 4**: Design tokens
- ✅ **Agent 5**: Component specs
- ⏳ **Agent 6**: Atomic components
- ⏳ **Agent 7**: Organisms (Header, Footer, Hero, ContactForm, ServiceGrid)

### Deliverables
- 6 complete Next.js pages
- SEO metadata
- Responsive layouts
- Integration tests
- Updated sitemap.xml

### Estimated Time
- 8-10 hours

### Testing Checklist
- [ ] All pages load without errors
- [ ] Navigation works between pages
- [ ] Forms submit successfully
- [ ] Images load (WebP with fallback)
- [ ] Mobile navigation works
- [ ] Lighthouse score >90 (Performance, Accessibility, SEO)
- [ ] TypeScript/ESLint passes

---

**Branch**: \`feat/agent-8-pages\`  
**Milestone**: Phase 3: Component Development" 2>/dev/null

echo -e "${GREEN}   ✅ Agent 8 issue created${NC}"

echo ""
echo -e "${GREEN}✅ Created 3 Phase 3 issues!${NC}"
echo ""
echo -e "${CYAN}View issues at:${NC}"
echo -e "https://github.com/$REPO_OWNER/$REPO_NAME/issues"
echo ""

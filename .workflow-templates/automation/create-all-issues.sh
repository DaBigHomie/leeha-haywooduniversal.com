#!/bin/bash
# create-all-issues.sh - Create phase implementation issues for Leeha Haywood Universal Law Firm

REPO="DaBigHomie/leeha-haywooduniversal.com"

echo "📋 Creating 5 GitHub issues for Leeha Haywood Universal Law Firm..."
echo ""

# Issue 1: Phase 2 - Conversion Triggers
echo "Creating Issue 1: Phase 2 - Conversion Triggers..."
gh issue create --repo "$REPO" \
  --title "Phase 2: Implement Conversion Triggers (Payment Options, Urgency, Trust)" \
  --body "## Phase 2: Conversion Triggers Implementation

**Objective**: Implement psychological triggers that convert legal research into client engagement.

**Duration**: 3 business days  
**Priority**: 🔴 HIGH  
**Dependencies**: Phase 1 (Foundation) completed

---

### Deliverables

1. **InvestmentOptions Component** - Afterpay/Klarna legal services payment
2. **UrgencyTimer Component** - Consultation slot countdown (limited availability)
3. **TrustSignals Component** - Bar certifications, case results, client reviews
4. **SocialProof Component** - Real-time notification feed (\"John D. just booked a consultation\")

---

### Implementation Guide

See: **implement-conversion-triggers.prompt.md** (1,200+ lines)

Includes:
- Full TypeScript React components
- Cultural context for legal service clients
- Success metrics (15%+ consultation bookings)
- Integration checklist
- Testing requirements

---

### Cultural Context

**Target**: Legal service seekers ages 25-55 in Metro Atlanta  
**Pain Point**: \"Can I afford an attorney?\"  
**Solution**: Payment flexibility + urgency signals + trust indicators

---

### Success Metrics

- [ ] 15%+ increase in consultation bookings
- [ ] 60%+ clients use payment options
- [ ] 5+ minutes avg. engagement with trust signals
- [ ] 80%+ positive feedback on transparency

---

### Technical Requirements

- [ ] Stripe integration for Afterpay/Klarna
- [ ] Real-time timer with timezone handling
- [ ] Lazy loading for performance
- [ ] Mobile-first responsive design
- [ ] Accessibility (WCAG 2.1 AA)

---

**Assignee**: @github-copilot  
**Label**: phase-implementation, enhancement, ugwtf, phase-2" \
  --label "phase-implementation,enhancement,ugwtf,phase-2"

sleep 2

# Issue 2: Phase 3 - Booking Experience
echo "Creating Issue 2: Phase 3 - Booking Experience..."
gh issue create --repo "$REPO" \
  --title "Phase 3: Implement Premium Booking Experience (Office Gallery, Policy, Testimonials)" \
  --body "## Phase 3: Premium Booking Experience Implementation

**Objective**: Create a respectful, transparent booking flow that positions the law firm as premium but accessible.

**Duration**: 4 business days  
**Priority**: 🔴 HIGH  
**Dependencies**: Phase 2 completed

---

### Deliverables

1. **OfficeGallery Component** - Buckhead office photos with lightbox
2. **BookingPolicy Component** - Respectful consultation terms (no \"fine print\")
3. **VideoTestimonials Component** - Client success stories carousel
4. **AttorneyBio Component** - Leeha Haywood's credentials & approach

---

### Implementation Guide

See: **implement-booking-experience.prompt.md** (1,100+ lines)

Includes:
- Full TypeScript React components
- Professional service UX patterns
- Success metrics (35%+ booking-to-retention)
- Accessibility requirements
- Video optimization

---

### Cultural Context

**Target**: High-net-worth professionals seeking legal counsel  
**Expectation**: Transparency, respect, no pressure tactics  
**Solution**: Concierge-style booking with full visibility

---

### Success Metrics

- [ ] 80%+ clients feel respected by policy language
- [ ] 90%+ trust video testimonials as authentic
- [ ] 35%+ booking-to-client conversion rate
- [ ] 4.8/5.0 avg. booking experience rating

---

### Technical Requirements

- [ ] Video player with accessibility controls
- [ ] Image optimization (WebP, lazy loading)
- [ ] Calendar integration (Google Calendar/Calendly)
- [ ] Mobile-optimized gallery (swipe gestures)
- [ ] Screen reader compatibility

---

**Assignee**: @github-copilot  
**Label**: phase-implementation, enhancement, ugwtf, phase-3" \
  --label "phase-implementation,enhancement,ugwtf,phase-3"

sleep 2

# Issue 3: Phase 4 - Digital Products
echo "Creating Issue 3: Phase 4 - Digital Products..."
gh issue create --repo "$REPO" \
  --title "Phase 4: Implement Digital Products (Legal Guides, Templates, Courses)" \
  --body "## Phase 4: Digital Products Implementation

**Objective**: Offer additional revenue through legal guides, document templates, and educational courses.

**Duration**: 3 business days  
**Priority**: 🟠 MEDIUM  
**Dependencies**: Phase 3 completed

---

### Deliverables

1. **LegalGuides Component** - Downloadable PDF guides (Divorce, Immigration, Business)
2. **DocumentTemplates Component** - Legal templates with customization wizard
3. **OnlineCourses Component** - Video courses on legal topics (\$197-\$497)
4. **DigitalProductTangibility Component** - Preview certificates, workbooks

---

### Implementation Guide

See: **implement-digital-products.prompt.md** (1,300+ lines)

Includes:
- Full TypeScript React components
- Stripe product catalog integration
- Success metrics (10%+ explore digital products)
- Email automation (Mailchimp/SendGrid)
- Content protection (watermarking)

---

### Cultural Context

**Target**: DIY-minded clients or those seeking education before hiring  
**Value Proposition**: \"Boss Up\" your legal knowledge  
**Pricing Strategy**: \$49 guides, \$197 templates, \$497 courses

---

### Success Metrics

- [ ] 60%+ willing to pay for premium guides
- [ ] 70%+ rate templates as good value
- [ ] 10%+ site visitors explore digital products
- [ ] \$5K+ monthly digital product revenue

---

### Technical Requirements

- [ ] Stripe product catalog integration
- [ ] PDF download with email capture
- [ ] Video course platform (Vimeo/Wistia)
- [ ] Content DRM/watermarking
- [ ] Email automation workflows

---

**Assignee**: @github-copilot  
**Label**: phase-implementation, enhancement, ugwtf, phase-4" \
  --label "phase-implementation,enhancement,ugwtf,phase-4"

sleep 2

# Issue 4: Phase 5 - Atlanta Local Advantage
echo "Creating Issue 4: Phase 5 - Atlanta Local Advantage..."
gh issue create --repo "$REPO" \
  --title "Phase 5: Implement Atlanta Local Advantage (Events, Community, Referrals)" \
  --body "## Phase 5: Atlanta Local Advantage Implementation

**Objective**: Leverage hyper-local Atlanta positioning for geographic conversion advantage.

**Duration**: 3 business days  
**Priority**: 🟠 MEDIUM  
**Dependencies**: Phase 4 completed

---

### Deliverables

1. **AtlantaEventsCalendar Component** - Legal workshops at The Gathering Spot, etc.
2. **CommunityPartnerships Component** - Local business, church, nonprofit partnerships
3. **ReferralProgram Component** - Bronze/Silver/Gold referral tiers
4. **LocalPresence Component** - Fulton County court info, office locations

---

### Implementation Guide

See: **implement-atlanta-local.prompt.md** (1,200+ lines)

Includes:
- Full TypeScript React components
- Atlanta cultural context integration
- Success metrics (25%+ referral signups)
- Social sharing functionality
- Google Maps/Calendar integrations

---

### Cultural Context

**Geographic Advantage**: Metro Atlanta legal expertise  
**Community Focus**: Church partnerships, local events  
**Referral Culture**: Word-of-mouth in tight-knit communities

---

### Success Metrics

- [ ] 80%+ find events relevant to their needs
- [ ] 70%+ share referral link with friends
- [ ] 25%+ site visitors sign up for referral program
- [ ] 15%+ new clients from community partnerships

---

### Technical Requirements

- [ ] Google Calendar API integration
- [ ] Social sharing (Facebook, Twitter, LinkedIn)
- [ ] Referral tracking system
- [ ] Google Maps embed for office locations
- [ ] Event RSVP with email confirmation

---

**Assignee**: @github-copilot  
**Label**: phase-implementation, enhancement, ugwtf, phase-5" \
  --label "phase-implementation,enhancement,ugwtf,phase-5"

sleep 2

# Issue 5: Phase 6 - Technical Polish
echo "Creating Issue 5: Phase 6 - Technical Polish..."
gh issue create --repo "$REPO" \
  --title "Phase 6: Implement Technical Polish (Performance, UX, Chatbot)" \
  --body "## Phase 6: Technical Polish Implementation

**Objective**: Achieve technical weightlessness through performance optimization and UX polish.

**Duration**: 4 business days  
**Priority**: 🟡 MEDIUM  
**Dependencies**: Phases 1-5 completed

---

### Deliverables

1. **StoryNavigation Component** - IG story-style case study browsing
2. **ConciergeChatbot Component** - AI assistant with Atlanta legal context
3. **Performance Optimization** - Image optimization, code splitting, lazy loading
4. **Accessibility Compliance** - WCAG 2.1 AA for legal industry

---

### Implementation Guide

See: **implement-technical-polish.prompt.md** (1,400+ lines)

Includes:
- Full TypeScript React components
- Performance optimization scripts
- Success metrics (Lighthouse 90+ mobile)
- Core Web Vitals requirements
- Security & privacy compliance

---

### Cultural Context

**Professional Excellence**: Speed = credibility for legal services  
**Trust Factor**: Smooth UX = organized law firm  
**Accessibility**: WCAG compliance for all client types

---

### Success Metrics

- [ ] LCP <2.5s (Largest Contentful Paint)
- [ ] FID <100ms (First Input Delay)
- [ ] CLS <0.1 (Cumulative Layout Shift)
- [ ] Lighthouse 90+ mobile, 95+ desktop
- [ ] WCAG 2.1 AA compliance verified

---

### Technical Requirements

- [ ] Image optimization (Sharp + WebP)
- [ ] Code splitting (React lazy/Suspense)
- [ ] Chatbot AI integration (OpenAI API)
- [ ] Screen reader testing (JAWS, VoiceOver)
- [ ] HTTPS enforcement + CSRF protection

---

**Assignee**: @github-copilot  
**Label**: phase-implementation, enhancement, ugwtf, phase-6" \
  --label "phase-implementation,enhancement,ugwtf,phase-6"

echo ""
echo "✅ All 5 phase issues created!"
echo ""
echo "View issues: https://github.com/$REPO/issues?q=label%3Augwtf"
echo ""
echo "Next steps:"
echo "1. Run: bash .github/scripts/ugwtf-auto-assign.sh <issue_numbers>"
echo "2. Monitor PRs: bash .github/scripts/ugwtf-monitor.sh"
echo "3. Review & merge: bash .github/scripts/ugwtf-auto-review.sh"

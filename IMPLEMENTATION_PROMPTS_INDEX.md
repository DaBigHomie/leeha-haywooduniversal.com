# Leeha Haywood Universal Law Firm - Implementation Prompts Master Index

**Date Created**: February 4, 2026  
**Project**: Leeha Haywood Universal Law Firm  
**Repository**: DaBigHomie/leeha-haywooduniversal.com  
**Purpose**: Ultra-specific implementation prompts for GitHub Copilot assignments

---

## 📋 Prompt Files Overview

This document contains an index of all implementation prompt files created for the UGWTF (Ultra-Guided Workflow Template Framework) automation. Each prompt file provides detailed instructions for Copilot to implement specific phases of the legal services website.

---

## 🏛️ Phase-Based Implementation Prompts

### Phase 2: Conversion Triggers ✅
**File**: `.workflow-templates/prompts/implement-conversion-triggers.prompt.md`  
**Issue**: #3  
**PR**: #12 (In Progress)  
**Priority**: 🔴 HIGH  
**Estimated Effort**: ⏱️ 3 business days  
**Status**: ✅ Prompt created, Copilot assigned

**What This Prompt Contains**:
- **Objective**: Implement psychological triggers that convert legal research into client engagement
- **Components**:
  1. InvestmentOptions - Afterpay/Klarna legal services payment
  2. UrgencyTimer - Consultation slot countdown (limited availability)
  3. TrustSignals - Bar certifications, case results, client reviews
  4. SocialProof - Real-time notification feed ("John D. just booked a consultation")

**Cultural Context**:
- **Target**: Legal service seekers ages 25-55 in Metro Atlanta
- **Pain Point**: "Can I afford an attorney?"
- **Solution**: Payment flexibility + urgency signals + trust indicators

**Success Metrics**:
- 15%+ increase in consultation bookings
- 60%+ clients use payment options
- 5+ minutes avg. engagement with trust signals
- 80%+ positive feedback on transparency

**Technical Requirements**:
- Stripe integration for Afterpay/Klarna
- Real-time timer with timezone handling
- Lazy loading for performance
- Mobile-first responsive design
- WCAG 2.1 AA accessibility

**How to Use**:
```bash
# Issue already created
gh issue view 3 --repo DaBigHomie/leeha-haywooduniversal.com

# PR already created by Copilot
gh pr view 12 --repo DaBigHomie/leeha-haywooduniversal.com
```

---

### Phase 3: Premium Booking Experience ✅
**File**: `.workflow-templates/prompts/implement-booking-experience.prompt.md`  
**Issue**: #4  
**PR**: #10 (In Progress)  
**Priority**: 🔴 HIGH  
**Estimated Effort**: ⏱️ 4 business days  
**Status**: ✅ Prompt created, Copilot assigned

**What This Prompt Contains**:
- **Objective**: Create respectful, transparent booking flow that positions law firm as premium but accessible
- **Components**:
  1. OfficeGallery - Buckhead office photos with lightbox
  2. BookingPolicy - Respectful consultation terms (no "fine print")
  3. VideoTestimonials - Client success stories carousel
  4. AttorneyBio - Leeha Haywood's credentials & approach

**Cultural Context**:
- **Target**: High-net-worth professionals seeking legal counsel
- **Expectation**: Transparency, respect, no pressure tactics
- **Solution**: Concierge-style booking with full visibility

**Success Metrics**:
- 80%+ clients feel respected by policy language
- 90%+ trust video testimonials as authentic
- 35%+ booking-to-client conversion rate
- 4.8/5.0 avg. booking experience rating

**Technical Requirements**:
- Video player with accessibility controls
- Image optimization (WebP, lazy loading)
- Calendar integration (Google Calendar/Calendly)
- Mobile-optimized gallery (swipe gestures)
- Screen reader compatibility

---

### Phase 4: Digital Products ✅
**File**: `.workflow-templates/prompts/implement-digital-products.prompt.md`  
**Issue**: #5  
**PR**: #8 (In Progress)  
**Priority**: 🟡 MEDIUM  
**Estimated Effort**: ⏱️ 5 business days  
**Status**: ✅ Prompt created, Copilot assigned

**What This Prompt Contains**:
- **Objective**: Create revenue-generating legal knowledge products for DIY clients
- **Components**:
  1. LegalGuides - Downloadable PDFs (Estate Planning, Business Formation)
  2. DocumentTemplates - Editable legal templates (NDA, Operating Agreement)
  3. OnlineCourses - Video courses (Small Business Law 101)
  4. ChecklistLibrary - Interactive compliance checklists

**Cultural Context**:
- **Target**: Small business owners, startups, individuals seeking affordable legal guidance
- **Pain Point**: "I can't afford full legal representation but need help"
- **Solution**: Self-service legal products at accessible price points

**Success Metrics**:
- $5K+ monthly digital product revenue
- 50+ product downloads per month
- 4.5/5.0 avg. product rating
- 25%+ upgrade to full consultation

**Technical Requirements**:
- Stripe payment integration
- Secure file delivery (authenticated downloads)
- Video hosting (Vimeo/Wistia)
- Progress tracking for courses
- Email automation (Mailchimp/SendGrid)

---

### Phase 5: Atlanta Local Advantage ✅
**File**: `.workflow-templates/prompts/implement-atlanta-local.prompt.md`  
**Issue**: #6  
**PR**: #11 (In Progress)  
**Priority**: 🟡 MEDIUM  
**Estimated Effort**: ⏱️ 4 business days  
**Status**: ✅ Prompt created, Copilot assigned

**What This Prompt Contains**:
- **Objective**: Leverage Atlanta local connections for community engagement and referrals
- **Components**:
  1. EventsCalendar - Metro Atlanta legal workshops (Buckhead, Midtown, Sandy Springs)
  2. CommunityPartners - Local business associations, chambers of commerce
  3. ReferralNetwork - Attorney referral system for specialized needs
  4. LocalResources - Georgia-specific legal resources (courts, agencies)

**Cultural Context**:
- **Target**: Metro Atlanta residents and businesses
- **Keywords**: Buckhead attorney, Midtown lawyer, Sandy Springs legal services, Atlanta business law
- **Solution**: Hyper-local SEO + community involvement

**Success Metrics**:
- Top 3 Google results for "Buckhead attorney"
- 20+ event attendees per quarter
- 30%+ new clients from referrals
- 50%+ traffic from Atlanta metro searches

**Technical Requirements**:
- Google Maps integration
- Event RSVP system
- Atlanta keyword optimization
- Local schema markup (LocalBusiness)
- Georgia-specific legal disclaimers

---

### Phase 6: Technical Polish ✅
**File**: `.workflow-templates/prompts/implement-technical-polish.prompt.md`  
**Issue**: #7  
**PR**: #9 (In Progress)  
**Priority**: 🟢 LOW (but important for UX)  
**Estimated Effort**: ⏱️ 3 business days  
**Status**: ✅ Prompt created, Copilot assigned

**What This Prompt Contains**:
- **Objective**: Achieve professional-grade UX, performance, and accessibility
- **Components**:
  1. StoryNavigation - Case study IG-style carousel
  2. ConciergeChatbot - AI assistant with Atlanta legal context
  3. PerformanceOptimization - Sharp + WebP image conversion scripts
  4. AccessibilityAudit - WCAG 2.1 AA compliance

**Cultural Context**:
- **Target**: All users, especially mobile visitors and accessibility needs
- **Expectation**: Fast, smooth, professional experience
- **Solution**: Lighthouse 90+ mobile, sub-2.5s load times

**Success Metrics**:
- Lighthouse 90+ mobile / 95+ desktop
- LCP <2.5s, FID <100ms, CLS <0.1
- WCAG 2.1 AA compliant
- 70%+ mobile traffic conversion

**Technical Requirements**:
- Sharp + WebP image optimization
- Code splitting (React.lazy)
- HTTPS enforcement
- CSRF protection
- Attorney-client privilege compliance
- Screen reader testing
- Keyboard navigation

---

## 🎯 Prompt File Usage Pattern

### Standard Workflow

1. **Create Issue from Prompt**:
```bash
# Prompt file already referenced in issue body
gh issue view 3 --repo DaBigHomie/leeha-haywooduniversal.com
```

2. **Assign to Copilot** (via MCP API):
```javascript
// Already done via Claude agent
mcp_github_assign_copilot_to_issue({
  owner: "DaBigHomie",
  repo: "leeha-haywooduniversal.com",
  issue_number: 3,
  base_ref: "main",
  custom_instructions: "Implement Phase 2 following detailed prompt file..."
});
```

3. **Monitor PR Progress**:
```bash
bash .github/scripts/ugwtf-monitor.sh
```

4. **Review PR When Ready**:
```bash
gh pr view 12 --repo DaBigHomie/leeha-haywooduniversal.com
```

---

## 📊 Implementation Status

| Phase | Issue | PR | Status | Completeness |
|-------|-------|----|--------|--------------|
| Phase 2: Conversion Triggers | #3 | #12 | 🟡 In Progress | [████░░░░░░░░] 30% |
| Phase 3: Booking Experience | #4 | #10 | 🟡 In Progress | [████░░░░░░░░] 30% |
| Phase 4: Digital Products | #5 | #8 | 🟡 In Progress | [████░░░░░░░░] 30% |
| Phase 5: Atlanta Local | #6 | #11 | 🟡 In Progress | [████░░░░░░░░] 30% |
| Phase 6: Technical Polish | #7 | #9 | 🟡 In Progress | [████░░░░░░░░] 30% |

**Overall Progress**: 🟡 **30%** (5/5 issues assigned, 5/5 PRs created, 0/5 PRs merged)

---

## 🔍 Prompt Quality Checklist

Each prompt file should contain:

- ✅ **Clear Objective**: What problem does this solve?
- ✅ **Specific Deliverables**: Exact components to create
- ✅ **Cultural Context**: Who are the users? What do they need?
- ✅ **Success Metrics**: How do we measure success?
- ✅ **Technical Requirements**: Tools, libraries, integrations
- ✅ **Code Examples**: Sample implementations
- ✅ **Testing Checklist**: Acceptance criteria
- ✅ **File Locations**: Where to put components
- ✅ **Dependencies**: What must exist first?

---

## 🚀 Next Steps

### Monitor PRs
```bash
# Watch PR progress
bash .github/scripts/ugwtf-monitor.sh

# Check specific PR
gh pr view 12 --repo DaBigHomie/leeha-haywooduniversal.com
```

### Review & Approve
```bash
# When PRs ready, auto-review
bash .github/scripts/ugwtf-auto-review.sh

# Or manual review
gh pr review 12 --repo DaBigHomie/leeha-haywooduniversal.com --approve
```

### Merge & Validate
```bash
# After approval, merge
gh pr merge 12 --repo DaBigHomie/leeha-haywooduniversal.com --squash

# Pull changes
git pull origin main

# Validate deployment
bash .github/scripts/validate-deployment.sh
```

---

## 🔗 Related Documentation

- **UGWTF Scripts Inventory**: `.workflow-templates/UGWTF_SCRIPTS_INVENTORY.md`
- **Git Commands Reference**: `.workflow-templates/UGWTF_GIT_COMMANDS.md`
- **Label Sync Summary**: `UGWTF_FIX_SUMMARY.md`
- **Validation Checklist**: `.github/scripts/validate-deployment.sh`

---

## 📝 Lessons Learned

### What Worked
- ✅ Ultra-specific prompts (800+ lines) give Copilot clear direction
- ✅ Cultural context helps Copilot understand user needs
- ✅ Success metrics provide clear goals
- ✅ Code examples reduce ambiguity
- ✅ MCP API assignment creates PRs immediately

### What to Improve
- ⚠️ Add mobile-specific screenshots to prompts
- ⚠️ Include accessibility testing checklist
- ⚠️ Add performance budget (bundle size limits)
- ⚠️ Specify exact library versions to avoid conflicts

---

**Last Updated**: February 4, 2026  
**Status**: ✅ All Prompts Created, Copilot Assigned  
**Next**: Monitor PRs #8-12 until completion

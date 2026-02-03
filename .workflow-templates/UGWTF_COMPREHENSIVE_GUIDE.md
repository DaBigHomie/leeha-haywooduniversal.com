# Ultimate Git Workflow Template Framework (UGWTF)
## Comprehensive Technical Guide

**Version**: 2.0.0  
**Last Updated**: February 3, 2026  
**Document Size**: 400+ lines of technical depth

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Action Item Parser](#action-item-parser)
3. [Priority Analyzer](#priority-analyzer)
4. [Phase Mapper](#phase-mapper)
5. [Issue Generator](#issue-generator)
6. [AI Agents System](#ai-agents-system)
7. [Cultural Validation](#cultural-validation)
8. [Accessibility Validation](#accessibility-validation)
9. [Performance Monitoring](#performance-monitoring)
10. [PR Automation](#pr-automation)
11. [Advanced Configuration](#advanced-configuration)
12. [API Reference](#api-reference)

---

## System Architecture

### Core Components

```
UGWTF System
│
├── Input Layer
│   ├── Action Item Parser (Markdown, JSON, Code comments)
│   ├── TODO Extractor (grep-based scanning)
│   └── Agent Report Importer (AI agent outputs)
│
├── Analysis Layer
│   ├── Priority Analyzer (P0/P1/P2 classification)
│   ├── Phase Mapper (Dependency graph builder)
│   ├── Keyword Detector (Cultural validation prep)
│   └── Complexity Estimator (Time/effort scoring)
│
├── Generation Layer
│   ├── Issue Generator (GitHub issue creation)
│   ├── Prompt Builder (Implementation guide generation)
│   ├── PR Template Builder (Context-aware checklists)
│   └── Documentation Generator (Auto-docs)
│
├── Validation Layer
│   ├── Code Review Agent (Quality + cultural)
│   ├── Cultural Validator (Keyword density)
│   ├── Accessibility Validator (WCAG AA)
│   ├── Performance Monitor (Lighthouse CI)
│   └── Security Scanner (Dependency audit)
│
└── Automation Layer
    ├── PR Manager (Auto-create, review, merge)
    ├── Deploy Agent (Staging/production)
    ├── Rollback Manager (Auto-revert on failure)
    └── Notification System (Slack, email, Discord)
```

---

## Action Item Parser

### Supported Input Formats

#### 1. Markdown Action Items

**Input**:
```markdown
# Critical Blockers
- ❌ **BLOCKING** - Stripe integration missing
- 🔴 **P0** - Database migration not applied

# High Priority Tasks
- ⚠️ Missing HeroVideo component
- 🟡 Accessibility violations in navigation

# Documentation Needs
- 📝 API reference incomplete
- 📚 README needs update

# Performance Issues
- 🐢 Bundle size 350KB (target 250KB)
- ⚡ LCP 4.5s (target <2.5s)
```

**Parser Output**:
```json
{
  "action_items": [
    {
      "id": "ai_001",
      "title": "Stripe integration missing",
      "priority": "p0",
      "type": "blocker",
      "area": "payment",
      "phase": null,
      "estimate": "8h",
      "keywords": ["blocking", "stripe", "integration"]
    },
    {
      "id": "ai_002",
      "title": "Database migration not applied",
      "priority": "p0",
      "type": "fix",
      "area": "database",
      "phase": null,
      "estimate": "2h",
      "keywords": ["p0", "database", "migration"]
    }
  ]
}
```

#### 2. Code Comment TODOs

**Input** (TypeScript):
```typescript
// TODO: Implement HeroVideo component with 60fps playback
// FIXME: Accessibility - missing aria-labels on buttons
// CRITICAL: Performance bottleneck in cart reducer
// HACK: Temporary workaround for API timeout
```

**Parser Command**:
```bash
ugwtf.sh scan-code src/ --extract-todos
```

**Output**:
```json
{
  "todos": [
    {
      "file": "src/components/Hero.tsx",
      "line": 45,
      "type": "TODO",
      "priority": "p1",
      "text": "Implement HeroVideo component with 60fps playback",
      "assignee": null
    },
    {
      "file": "src/components/Navigation.tsx",
      "line": 23,
      "type": "FIXME",
      "priority": "p0",
      "text": "Accessibility - missing aria-labels on buttons",
      "area": "wcag-aa"
    },
    {
      "file": "src/store/cart.ts",
      "line": 67,
      "type": "CRITICAL",
      "priority": "p0",
      "text": "Performance bottleneck in cart reducer",
      "area": "performance"
    }
  ]
}
```

#### 3. AI Agent Reports

**Input**:
```markdown
## Code Review Agent Report
**Date**: 2026-02-03
**Files Reviewed**: 45

### Critical Issues (P0)
1. Missing cultural keywords in 8 components
2. 12 WCAG AA violations (color contrast)
3. Bundle size 320KB (exceeds 250KB limit)

### High Priority (P1)
1. Generic "luxury" language in 15 files
2. Missing aria-labels on 23 interactive elements
3. LCP 3.8s on homepage (target <2.5s)

### Recommendations
- Add "The Melt" keyword to hero section
- Update color palette for AA compliance
- Implement code splitting for cart module
```

**Parser Command**:
```bash
ugwtf.sh import agent-report.md --agent code-review
```

**Parsed Issues**:
- 3 P0 issues → Assigned to Phase 1
- 3 P1 issues → Assigned to Phases 1-2
- Recommendations → Converted to implementation prompts

---

## Priority Analyzer

### Priority Classification Rules

| Keyword | Priority | Rationale |
|---------|----------|-----------|
| BLOCKING, CRITICAL, ❌, 🔴 | **P0** | Prevents progress, must fix immediately |
| HIGH, IMPORTANT, ⚠️, 🟡 | **P1** | Significant impact, fix in current phase |
| TODO, NICE-TO-HAVE, 📝, 🟢 | **P2** | Enhancement, backlog item |
| SECURITY, VULNERABILITY | **P0** | Security always highest priority |
| ACCESSIBILITY, WCAG | **P0** (if violations) | Legal/ethical requirement |
| PERFORMANCE (severe) | **P0** | User experience blocker |
| PERFORMANCE (minor) | **P1** | Optimization opportunity |
| DOCUMENTATION | **P2** | Important but not blocking |

### Dependency Detection

UGWTF analyzes dependencies between action items:

```yaml
# Example dependency chain
HeroVideo component (P0)
  └─ requires: Video hosting setup (P0)
      └─ requires: CDN configuration (P1)
  
LaceMatchViewer (P0)
  └─ depends on: HeroVideo foundation (P0)
  
Typography Update (P1)
  └─ can run parallel to: HeroVideo
```

**Auto-Generated Phase Mapping**:
```
Phase 1 (Foundation - Sequential):
  1. Video hosting setup (P0) → blocks #2
  2. HeroVideo component (P0) → blocks #3
  3. LaceMatchViewer (P0) → depends on #2

Phase 1 (Parallel Track):
  4. Typography Update (P1) → independent
  5. CEO bio update (P1) → independent
```

---

## Phase Mapper

### Phase Detection Algorithm

```typescript
interface PhaseMapping {
  phase_number: number;
  phase_name: string;
  tasks: ActionItem[];
  dependencies: number[];  // phase numbers
  duration_estimate: string;
  priority: 'p0' | 'p1' | 'p2';
}

function mapToPhases(actionItems: ActionItem[]): PhaseMapping[] {
  // 1. Identify foundational items (no dependencies)
  const foundation = actionItems.filter(item => 
    item.dependencies.length === 0 && item.priority === 'p0'
  );
  
  // 2. Group by dependency depth
  const phases: PhaseMapping[] = [];
  let currentPhase = 1;
  
  while (actionItems.length > 0) {
    const readyItems = actionItems.filter(item =>
      item.dependencies.every(dep => 
        isCompleted(dep) || isInPreviousPhase(dep)
      )
    );
    
    if (readyItems.length > 0) {
      phases.push({
        phase_number: currentPhase++,
        phase_name: inferPhaseName(readyItems),
        tasks: readyItems,
        dependencies: getPhaseDependencies(readyItems),
        duration_estimate: estimateDuration(readyItems),
        priority: getHighestPriority(readyItems)
      });
    }
    
    actionItems = actionItems.filter(item => !readyItems.includes(item));
  }
  
  return phases;
}
```

### Phase Naming Intelligence

UGWTF auto-names phases based on task clusters:

| Task Pattern | Auto-Generated Name | Rationale |
|--------------|---------------------|-----------|
| Video, Images, Typography | **Visual Foundation** | UI/visual components |
| Keywords, Brand Voice | **Cultural Identity** | Brand/messaging |
| Testimonials, Social Proof | **Conversion Triggers** | Psychology/trust |
| Calendar, Booking, Deposits | **Booking Experience** | User flow |
| Workbook, Membership, Certs | **Digital Products** | Monetization |
| Events, Maps, Partnerships | **Local Integration** | Community/location |
| Lighthouse, A/B, Analytics | **Technical Polish** | Performance/data |

---

## Issue Generator

### Issue Template Structure

```yaml
---
name: Phase {PHASE_NUM}: {PHASE_NAME}
about: Auto-generated from UGWTF action item analysis
labels:
  - phase-{PHASE_NUM}-{PHASE_SLUG}
  - priority:{PRIORITY}
  - {AUTO_DETECTED_AREA_LABELS}
assignees:
  - {PROJECT_OWNER}
milestone: Phase {PHASE_NUM}: {PHASE_NAME}
---

## Phase {PHASE_NUM}: {PHASE_NAME}

**Priority**: {PRIORITY_DESCRIPTION}
**Duration**: {ESTIMATED_DURATION}
**Dependencies**: {DEPENDENCY_LIST}

### 🎯 Objectives

{AUTO_GENERATED_OBJECTIVE_LIST}

### ✅ Action Items from Analysis

{ACTION_ITEMS_CHECKLIST}

### 📖 Implementation Guide

See: `implement-{phase-slug}.prompt.md` (auto-generated)

### 🎨 Cultural Validation Requirements

- [ ] Min 3 Atlanta keywords per 500 words
- [ ] Avoid generic luxury terms: {TERMS_TO_AVOID}
- [ ] Include: {REQUIRED_KEYWORDS}

### ♿ Accessibility Requirements

- [ ] WCAG AA color contrast (≥4.5:1)
- [ ] Keyboard navigation functional
- [ ] aria-labels on all interactive elements
- [ ] Screen reader tested

### ⚡ Performance Requirements

- [ ] Lighthouse score ≥ 90
- [ ] LCP < 2.5s
- [ ] Bundle impact < 10KB
- [ ] Images optimized (WebP, lazy loading)

### 📊 Success Criteria

{AUTO_GENERATED_SUCCESS_METRICS}

### 🤖 Automated Validation

Code Review Agent will validate:
{AGENT_VALIDATION_CHECKLIST}
```

### Implementation Prompt Generation

UGWTF auto-generates detailed implementation prompts:

```markdown
# Phase {NUM}: {NAME} Implementation Prompt

## Context
{PROJECT_DESCRIPTION}
{CULTURAL_CONTEXT}

## Action Items to Implement
{DETAILED_TASK_LIST_WITH_CODE_EXAMPLES}

## Component Structure
\`\`\`typescript
// Auto-generated component skeleton
interface {ComponentName}Props {
  // Inferred props from action item description
}

export function {ComponentName}({ ... }: {ComponentName}Props) {
  // TODO: Implement according to action items
}
\`\`\`

## Cultural Keywords to Include
{KEYWORD_PLACEMENT_SUGGESTIONS}

## Accessibility Implementation
{WCAG_CODE_EXAMPLES}

## Testing Checklist
{AUTO_GENERATED_TEST_CASES}
```

---

## AI Agents System

### 1. Code Review Agent

**Triggers**: PR opened, PR updated  
**Capabilities**:
- TypeScript compilation check
- ESLint error detection
- Cultural keyword validation (14 terms)
- Generic term detection (6 terms to avoid)
- Conversion killer detection (6 phrases)
- WCAG AA quick scan
- Bundle size impact analysis

**Configuration**:
```yaml
agents:
  code_review:
    enabled: true
    auto_approve_score: 9  # 0-10 scale
    checks:
      - typescript_compilation
      - eslint_errors
      - cultural_keywords_density
      - avoid_generic_terms
      - wcag_aa_contrast
      - bundle_size_impact
```

### 2. Cultural Validator Agent

**Triggers**: PR opened, schedule (daily)  
**Capabilities**:
- Keyword density scoring (0-10 scale)
- Brand voice consistency check
- AI-powered keyword suggestions
- Visual asset cultural analysis
- Testimonial language validation

**Scoring Algorithm**:
```typescript
function calculateCulturalScore(content: string): number {
  const words = content.split(/\s+/).length;
  const keywordMatches = countKeywords(content, CULTURAL_KEYWORDS);
  const genericTerms = countKeywords(content, AVOID_TERMS);
  
  const density = (keywordMatches / words) * 1000;
  const densityScore = Math.min(density / MIN_DENSITY * 5, 5);
  const avoidanceScore = Math.max(5 - genericTerms, 0);
  
  return densityScore + avoidanceScore; // 0-10 scale
}
```

### 3. Accessibility Validator Agent

**Triggers**: PR opened, schedule (nightly)  
**Capabilities**:
- WCAG 2.1 AA automated testing (Axe-core)
- Color contrast validation
- Keyboard navigation testing
- Screen reader compatibility
- aria-label completeness

**Auto-Fix Features**:
```bash
# Agent can auto-generate fixes
ugwtf.sh agent accessibility --auto-fix

# Generates:
# - aria-label suggestions
# - Color palette adjustments
# - Keyboard handler code
```

---

## Cultural Validation

### Keyword Density System

**Configuration**:
```yaml
cultural_keywords:
  primary:  # Must appear
    - "The Melt"
    - "Soft Life"
    - "Boss Up"
    - "Inner Circle"
  
  secondary:  # Should appear
    - "Atlanta"
    - "Metro ATL"
    - "Buckhead"
    - "Midtown"
  
  contextual:  # Use when appropriate
    - "Investment" (not "price")
    - "Boss Babe"
    - "CEO"
    - "Exclusive"
    - "Limited"
    - "Access"
  
  density_targets:
    min: 3   # per 500 words
    target: 5
    max: 8   # avoid keyword stuffing
```

### AI-Powered Keyword Suggestions

UGWTF uses AI to suggest keyword placements:

**Input**: Component without keywords
```tsx
<section className="hero">
  <h1>Welcome to CAE Luxury Hair</h1>
  <p>We offer premium hair extensions</p>
  <button>Shop Now</button>
</section>
```

**AI Analysis**:
```bash
ugwtf.sh analyze-keywords Hero.tsx
```

**Output**:
```typescript
// Suggested improvements:
<section className="hero">
  <h1>Experience The Melt™ - Atlanta's Premier Hair Studio</h1>
  <p>Boss Up with luxury bundles crafted for Metro ATL's Inner Circle</p>
  <button>Explore Investment Options</button>
</section>

// Keywords added: 4 (The Melt, Boss Up, Metro ATL, Inner Circle, Investment)
// Density: 4/15 words = 26.7% ✅ (target 20-30%)
```

---

## Accessibility Validation

### WCAG AA Automated Checks

```yaml
accessibility:
  wcag_level: "AA"
  automated_checks:
    - color_contrast: 4.5  # normal text
    - color_contrast_large: 3.0  # large text (18pt+)
    - aria_labels: required
    - keyboard_navigation: required
    - focus_indicators: required
    - heading_hierarchy: required
    - alt_text: required
    - form_labels: required
```

### Auto-Fix Examples

**Before** (Accessibility violations):
```tsx
<button onClick={handleClick}>
  <ChevronDown />
</button>

<img src="/hero.jpg" />

<div className="clickable" onClick={handleClick}>
  Click me
</div>
```

**After** (Auto-fixed):
```tsx
<button 
  onClick={handleClick}
  aria-label="Expand details"
  aria-expanded={isExpanded}
>
  <ChevronDown aria-hidden="true" />
</button>

<img 
  src="/hero.jpg" 
  alt="Luxury hair installation showcasing The Melt technique on natural hair texture"
  loading="lazy"
/>

<button 
  className="clickable" 
  onClick={handleClick}
  type="button"
  aria-label="Submit form"
>
  Click me
</button>
```

---

## Performance Monitoring

### Lighthouse CI Integration

```yaml
performance:
  lighthouse:
    enabled: true
    thresholds:
      performance: 90
      accessibility: 100
      best_practices: 90
      seo: 90
    
    metrics:
      lcp: 2.5  # Largest Contentful Paint (seconds)
      fid: 100  # First Input Delay (ms)
      cls: 0.1  # Cumulative Layout Shift
    
    budget:
      bundle_js: 250  # KB
      bundle_css: 50  # KB
      images_total: 1000  # KB
```

### Bundle Size Analysis

```bash
# Auto-analyze bundle size impact
ugwtf.sh analyze-bundle

# Output:
╔════════════════════════════════════════════════════════╗
║           BUNDLE SIZE ANALYSIS                        ║
╚════════════════════════════════════════════════════════╝

Current: 285KB (target: 250KB) ⚠️ 14% over budget

Top 5 largest modules:
  1. lucide-react (45KB) - Consider tree-shaking
  2. @supabase/supabase-js (38KB) - OK
  3. react-router-dom (32KB) - OK
  4. zustand (28KB) - OK
  5. tailwindcss (142KB output) - Consider PurgeCSS

Recommendations:
  ✅ Implement code splitting for /shop route (-25KB)
  ✅ Lazy load HeroVideo component (-15KB)
  ✅ Optimize images with WebP (-20KB)
  
Estimated savings: 60KB (final: 225KB ✅)
```

---

## Advanced Configuration

### Complete config.yml Reference

```yaml
# UGWTF Configuration v2.0

project:
  name: "CAE Luxury Hair"
  type: "e-commerce"  # e-commerce, saas, blog, portfolio
  repository: "DaBigHomie/Cae"
  target_demographic: "African American women, ages 21-35, Metro Atlanta"
  
# Cultural validation
cultural_keywords:
  enabled: true
  primary: ["The Melt", "Soft Life", "Boss Up"]
  min_density: 3
  target_density: 5
  auto_suggest: true
  
avoid_terms:
  - "premium quality"
  - "luxury items"
  
# Accessibility
accessibility:
  wcag_level: "AA"
  auto_fix: true
  screen_reader_test: false  # requires manual
  
# Performance
performance:
  lighthouse_ci: true
  bundle_budget:
    js: 250
    css: 50
  
# Phases
phases:
  auto_detect: true  # AI-powered phase detection
  manual_override: false
  
  phase_1:
    name: "Visual Trust Foundation"
    duration_days: 5
    priority: "p0"
    dependencies: []
  
  # ... (phases 2-6)

# AI Agents
agents:
  code_review:
    enabled: true
    auto_approve_score: 9
  
  cultural_validator:
    enabled: false  # planned
    keyword_density_min: 3
  
  accessibility_validator:
    enabled: false  # planned
    wcag_level: "AA"
  
  performance_monitor:
    enabled: false  # planned
    lighthouse_threshold: 90
  
  pr_manager:
    enabled: false  # planned
    auto_merge: false
    review_timeout_hours: 24

# GitHub integration
github:
  auto_create_issues: true
  auto_create_milestones: true
  auto_create_labels: true
  issue_template_path: ".workflow-templates/templates/issue-template.yml"
  pr_template_path: ".workflow-templates/templates/pr-template.md"

# Notifications
notifications:
  slack:
    enabled: false
    webhook_url: ""
  
  email:
    enabled: false
    recipients: []
  
  discord:
    enabled: false
    webhook_url: ""
```

---

## API Reference

### Command Line Interface

```bash
# Import & Analysis
ugwtf.sh import <file>              # Import action items
ugwtf.sh scan-code <directory>      # Scan for TODOs
ugwtf.sh analyze                    # Analyze and map phases
ugwtf.sh preview                    # Preview without creating

# Issue Management
ugwtf.sh create-issues              # Create all GitHub issues
ugwtf.sh create-issues --phase N    # Create specific phase
ugwtf.sh update-issues              # Update existing issues

# Deployment
ugwtf.sh deploy                     # Full automated deployment
ugwtf.sh deploy --phase N           # Deploy specific phase
ugwtf.sh rollback --phase N         # Rollback deployment

# Monitoring
ugwtf.sh status                     # Status dashboard
ugwtf.sh report                     # Generate report
ugwtf.sh metrics                    # Show metrics

# Configuration
ugwtf.sh config show                # Show configuration
ugwtf.sh config edit                # Edit configuration
ugwtf.sh config validate            # Validate configuration

# Utilities
ugwtf.sh export <path>              # Export to new repo
ugwtf.sh validate                   # Validate current state
ugwtf.sh clean                      # Clean temporary files
```

### TypeScript API

```typescript
import { UGWTF } from './.workflow-templates/core';

// Initialize
const ugwtf = new UGWTF({
  configPath: '.workflow-templates/config.yml',
  githubToken: process.env.GITHUB_TOKEN
});

// Import action items
const actionItems = await ugwtf.import('ACTION_ITEMS.md');

// Analyze and map phases
const phases = await ugwtf.analyze(actionItems);

// Create GitHub issues
const issues = await ugwtf.createIssues(phases);

// Deploy phase
await ugwtf.deployPhase(1);

// Get status
const status = await ugwtf.getStatus();
```

---

## Next Steps

1. **Read**: [UGWTF_QUICK_START.md](UGWTF_QUICK_START.md) for 5-minute setup
2. **Import**: Your action items with `ugwtf.sh import`
3. **Analyze**: Auto-detect phases with `ugwtf.sh analyze`
4. **Deploy**: Start automation with `ugwtf.sh deploy`
5. **Monitor**: Track progress with `ugwtf.sh status`

---

**Version**: 2.0.0 - Comprehensive Guide  
**Last Updated**: February 3, 2026  
**Next**: [UGWTF_API_REFERENCE.md](UGWTF_API_REFERENCE.md)

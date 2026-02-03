# CAE Atlanta 20X - Reusable Workflow Templates

**Version**: 1.0.0  
**Created**: February 3, 2026  
**Purpose**: Portable phased deployment system for culturally-specific e-commerce

---

## 📦 What's Included

This `.workflow-templates/` folder contains everything needed to implement the CAE Atlanta 20X phased deployment system in any repository:

- **GitHub Actions workflows** - Code review, cultural validation, phase gates
- **Issue templates** - Phase 1-6 implementation with dependencies
- **PR templates** - Cultural + accessibility checklists
- **AI agents** - Code review, cultural validation, PR management
- **Labels & Milestones** - Complete GitHub configuration
- **Automation scripts** - Phase orchestration and validation

---

## 🚀 Quick Setup (Copy to New Repository)

```bash
# 1. Copy templates to new repo
cd /path/to/new-repo
cp -R /path/to/cae-luxury-hair/.workflow-templates .

# 2. Run setup script
bash .workflow-templates/setup-workflow.sh

# 3. Configure for your project
# Edit .workflow-templates/config.yml with your:
# - Target demographic keywords
# - Cultural values
# - Conversion triggers
# - Success metrics
```

---

## 📋 Folder Structure

```
.workflow-templates/
├── README.md                           # This file
├── setup-workflow.sh                   # One-command setup script
├── config.yml                          # Project-specific configuration
│
├── workflows/                          # GitHub Actions (.github/workflows/)
│   ├── agent-code-review.yml          # Code Review Agent
│   ├── agent-cultural-validation.yml  # Cultural Validation Agent
│   ├── agent-pr-manager.yml           # PR Manager Agent
│   └── phase-gate-validator.yml       # Phase dependency validation
│
├── issue-templates/                    # GitHub issue templates
│   ├── phase-1-implementation.yml     # Phase 1: Visual Trust
│   ├── phase-2-implementation.yml     # Phase 2: Conversion Triggers
│   ├── phase-3-implementation.yml     # Phase 3: Booking Experience
│   ├── phase-4-implementation.yml     # Phase 4: Digital Products
│   ├── phase-5-implementation.yml     # Phase 5: Local Integration
│   └── phase-6-implementation.yml     # Phase 6: Technical Polish
│
├── pr-templates/                       # PR templates
│   ├── pull_request_template.md       # Default PR template
│   └── phase-pr-checklist.md          # Phase-specific checklist
│
├── agents/                             # TypeScript AI agents
│   ├── package.json                   # Agent dependencies
│   ├── code-review-agent.ts           # Code quality + cultural keywords
│   ├── cultural-validator-agent.ts    # Atlanta keyword validation
│   └── pr-manager-agent.ts            # Phase gate enforcement
│
├── labels.json                         # GitHub label definitions
├── milestones.json                     # Phase milestones with dates
│
└── automation/                         # Automation scripts
    ├── phase-orchestrator.sh          # Interactive menu
    ├── quick-phase.sh                 # One-command operations
    └── validate-phase.sh              # Validation checks
```

---

## 🏷️ GitHub Labels

**Phases** (sequential):
- `phase-1-visual-trust` - Foundation (HeroVideo, LaceMatchViewer, Typography)
- `phase-2-conversion-triggers` - Psychology (Testimonials, Social Proof, FOMO)
- `phase-3-booking-experience` - Scheduling (Calendar, Deposits, Confirmations)
- `phase-4-digital-products` - Commerce (Workbook, Membership, Certificates)
- `phase-5-atlanta-local` - Integration (Events, Maps, Partnerships)
- `phase-6-technical-polish` - Performance (Lighthouse, A/B Testing, Analytics)

**Priority**:
- `priority:p0` - Blocking (must fix before merge)
- `priority:p1` - High (fix in current phase)
- `priority:p2` - Nice-to-have (backlog)

**Type**:
- `type:feature` - New functionality
- `type:fix` - Bug fix
- `type:docs` - Documentation
- `type:refactor` - Code improvement

**Area**:
- `area:atlanta-keywords` - Cultural keyword validation
- `area:wcag-aa` - Accessibility compliance
- `area:conversion-psychology` - Conversion optimization
- `area:performance` - Speed/bundle size

**Status**:
- `status:blocked` - Waiting on dependency
- `status:in-review` - Agent/human review in progress
- `status:approved` - Ready to merge
- `status:deployed` - Live in production

---

## 📅 Milestones

| Milestone | Duration | Dependencies | Issues |
|-----------|----------|--------------|--------|
| Phase 1: Visual Trust | 5 days | None (foundation) | #2 |
| Phase 2: Conversion Triggers | 4 days | Phase 1 complete | #3 |
| Phase 3: Booking Experience | 3 days | Phase 1 complete | #4 |
| Phase 4: Digital Products | 2 days | Phase 1 complete | #5 |
| Phase 5: Atlanta Local | 3 days | Phases 1-4 | #6 |
| Phase 6: Technical Polish | 3 days | Phases 1-5 | #7 |

**Total Timeline**: 20 business days

---

## 🤖 AI Agents

### 1. Code Review Agent
**Status**: ✅ Active  
**Triggers**: PR opened/updated  
**Validates**:
- Atlanta cultural keywords (14 terms, min 3 per 500 words)
- Generic terms to avoid (6 terms: "premium quality", "luxury items", etc.)
- Conversion killers (6 phrases: "strict policy", "limited availability", etc.)
- TypeScript compilation (0 errors)
- ESLint (0 errors, warnings OK)
- WCAG AA compliance

### 2. Cultural Validation Agent
**Status**: ⏳ Planned  
**Triggers**: PR opened, schedule (daily)  
**Validates**:
- Keyword density scoring (0-10 scale)
- Brand voice consistency ("The Melt", "Soft Life", "Boss Up")
- Visual asset cultural authenticity
- Testimonial language patterns

### 3. PR Manager Agent
**Status**: ⏳ Planned  
**Triggers**: Push, schedule (hourly)  
**Manages**:
- Phase gate enforcement (can't merge Phase 2 before Phase 1)
- 24-hour review rule (auto-comment after 24h)
- Auto-merge approved PRs
- Branch cleanup

---

## 🎯 Configuration

Edit `.workflow-templates/config.yml` for your project:

```yaml
project:
  name: "My Project"
  target_demographic: "African American women, ages 21-35, Metro Atlanta"
  
cultural_keywords:
  primary:
    - "The Melt"
    - "Soft Life"
    - "Boss Up"
  min_density: 3  # per 500 words
  
avoid_terms:
  - "premium quality"
  - "luxury items"
  
conversion_triggers:
  - "Investment Options"  # instead of "buy now pay later"
  - "Inner Circle"       # instead of "exclusive membership"
  
success_metrics:
  homepage_to_shop: 60%
  product_to_cart: 40%
  booking_to_deposit: 35%
```

---

## 📝 Usage Examples

### Start Phase 1
```bash
./.workflow-templates/automation/quick-phase.sh 1 start
```

### Create PR
```bash
./.workflow-templates/automation/quick-phase.sh 1 pr
```

### Check Status
```bash
./.workflow-templates/automation/phase-orchestrator.sh
# Select option 3: Check Phase Status
```

---

## 🔄 Copying to New Repository

```bash
# 1. Navigate to new repo
cd /path/to/new-repo

# 2. Copy workflow templates
cp -R /path/to/cae-luxury-hair/.workflow-templates .

# 3. Run setup
bash .workflow-templates/setup-workflow.sh

# 4. Follow prompts to configure:
#    - Repository name
#    - Cultural keywords
#    - Target demographic
#    - Success metrics

# 5. Setup creates:
#    - .github/workflows/ from templates
#    - .github/ISSUE_TEMPLATE/ from templates
#    - .github/PULL_REQUEST_TEMPLATE.md
#    - GitHub labels via gh CLI
#    - GitHub milestones via gh CLI
```

---

## 🛠️ Maintenance

### Update Templates
```bash
# Pull latest from CAE repo
cd /path/to/cae-luxury-hair
git pull origin main

# Copy to your repo
cd /path/to/your-repo
cp -R /path/to/cae-luxury-hair/.workflow-templates .
```

### Customize Agents
Edit `.workflow-templates/agents/*.ts` files to modify validation rules.

### Add New Phases
1. Create `phase-N-implementation.yml` in `issue-templates/`
2. Add milestone to `milestones.json`
3. Update `automation/quick-phase.sh` with new phase name
4. Re-run setup script

---

## 📊 Success Metrics

Track these KPIs to measure workflow effectiveness:

- **Time to Deployment**: Target 20 business days
- **Cultural Score**: ≥8/10 on keyword density
- **Accessibility Score**: 100% WCAG AA compliance
- **Conversion Rate**: 60% homepage→shop, 40% product→cart, 35% booking→deposit
- **Agent Efficiency**: ≥90% PRs auto-reviewed within 5 minutes

---

## 🆘 Troubleshooting

**Issue: Agents not running on PR**
- Check `.github/workflows/*.yml` are in place
- Verify GitHub Actions enabled in repo settings
- Check `agents/package.json` dependencies installed

**Issue: Phase gate blocking incorrect phase**
- Review milestones in GitHub (Settings → Milestones)
- Check issue numbers match milestone assignments
- Verify PR references correct issue number

**Issue: Cultural validation false positives**
- Edit `.workflow-templates/config.yml` keywords
- Adjust `min_density` threshold
- Update `code-review-agent.ts` validation logic

---

## 📚 References

- [Atlanta 20X Roadmap](../ATLANTA_20X_ROADMAP.md)
- [Agents Documentation](../AGENTS.md)
- [Implementation Prompts](../)
- [Ramanministries Agent System](https://github.com/DaBigHomie/Ramanministries/blob/main/AGENTS.md)

---

**Last Updated**: February 3, 2026  
**Maintainer**: DaBigHomie  
**License**: Proprietary - Reusable within organization

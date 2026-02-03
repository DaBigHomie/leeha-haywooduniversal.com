# UGWTF Master Instructions
**Ultimate Git Workflow Template Framework - Implementation Guide**  
**Version**: 2.0.0  
**Last Updated**: February 3, 2026  
**Status**: Production Ready

---

## 📋 Overview

This document provides **explicit rules, implicit patterns, and critical do's/don'ts** for implementing UGWTF on any repository. Read this BEFORE applying the framework to avoid common pitfalls.

---

## ✅ DO'S - Critical Success Patterns

### 1. DO Read the Entire Repository First
```
BEFORE running ugwtf.sh, an AI agent MUST:
- Read README.md (understand project purpose)
- Check package.json (understand tech stack)
- Scan existing file structure (identify patterns)
- Read any existing AGENTS.md or workflow docs
- Understand the target demographic/users
```

**Why**: UGWTF adapts to your project. Cultural keywords, phase structure, and validation rules depend on context.

**Example**:
- E-commerce site → Cultural validation needed (keywords, conversion psychology)
- API server → Performance validation critical (latency, throughput)
- Documentation site → Accessibility validation priority (WCAG AA, screen readers)

---

### 2. DO Customize config.yml FIRST
```yaml
# .workflow-templates/config.yml
project:
  name: "YOUR_PROJECT_NAME"  # ← CHANGE THIS
  type: "e-commerce"          # ← CHANGE THIS (e-commerce, saas, blog, api, etc.)
  target_demographic: "..."   # ← BE SPECIFIC

cultural_keywords:
  primary: [...]              # ← PROJECT-SPECIFIC (not Atlanta if not Atlanta!)
  
phases:
  auto_detect: true           # ← Keep true for intelligent mapping
  manual_override: false      # ← Set true if you want custom phases
```

**Why**: Generic configuration = generic results. UGWTF's power comes from customization.

**Don't Copy/Paste**:
- ❌ Don't use "Atlanta keywords" if your project isn't Atlanta-focused
- ❌ Don't use "luxury hair" terms if you're building a SaaS app
- ❌ Don't keep default 6-phase structure if your project needs different phases

**Do Adapt**:
- ✅ Replace cultural keywords with YOUR brand voice
- ✅ Adjust phase count/names to your project timeline
- ✅ Set target demographic to YOUR actual users

---

### 3. DO Import Action Items from Multiple Sources
```bash
# Good: Combine multiple sources
ugwtf.sh import AGENT_IDENTIFIED_ACTION_ITEMS.md
ugwtf.sh import BACKLOG_TODOS.md
ugwtf.sh import CODE_REVIEW_ISSUES.md
ugwtf.sh analyze  # Analyzes ALL imported items together
```

**Why**: UGWTF is smarter when it sees the full picture. It can detect dependencies across different sources.

**Supported Sources**:
1. **Markdown files** with action items
2. **Code TODO comments** (use `ugwtf.sh scan-code src/`)
3. **GitHub Issues export** (JSON format)
4. **AI Agent Reports** (Code Review Agent, Cultural Validator, etc.)
5. **Manual lists** in any markdown format

---

### 4. DO Validate Priority Detection
```bash
# After running analyze, CHECK the output:
ugwtf.sh analyze

# Output shows:
# ✅ Identified 2 P0 blockers, 3 P1 high, 5 P2 nice-to-have

# VERIFY this makes sense for your project!
```

**If priorities look wrong**:
1. Check your action item keywords (use CRITICAL, BLOCKING for P0)
2. Add priority hints in your markdown: `- 🔴 P0: Critical blocker`
3. Manually adjust in GitHub after issue creation

**Priority Keywords** (case-insensitive):
- **P0**: CRITICAL, BLOCKING, BLOCKER, ❌, 🔴, SECURITY, VULNERABILITY
- **P1**: HIGH, IMPORTANT, ⚠️, 🟡, URGENT
- **P2**: TODO, NICE-TO-HAVE, 📝, 🟢, ENHANCEMENT

---

### 5. DO Review Phase Mapping Before Creating Issues
```bash
# Dry run to preview:
ugwtf.sh analyze --dry-run

# Shows phase mapping WITHOUT creating issues
# Review, adjust if needed, then:
ugwtf.sh create-issues
```

**Why**: Once GitHub issues are created, it's harder to reorganize. Better to validate the plan first.

**Check for**:
- ✅ Phase dependencies make sense (Phase 1 should block dependent phases)
- ✅ No circular dependencies (Phase 2 depends on Phase 3 which depends on Phase 2)
- ✅ Balanced workload (no phase with 20 items while others have 2)

---

### 6. DO Use Semantic Commit Messages
```bash
# Good commit messages for UGWTF implementation:
git commit -m "feat(ugwtf): Initialize workflow template system for [project-name]"
git commit -m "config(ugwtf): Customize for [demographic] targeting [goal]"
git commit -m "feat(phase-1): Implement [feature] with [cultural-keyword] integration"
```

**Pattern**: `type(scope): description`
- **type**: feat, fix, docs, config, refactor
- **scope**: ugwtf, phase-1, phase-2, agent, automation
- **description**: Clear, actionable, includes cultural context if relevant

---

### 7. DO Test Locally Before Deploying
```bash
# ALWAYS run these BEFORE creating PR:
npm run build          # Must succeed
npx tsc --noEmit       # 0 TypeScript errors
npm run lint           # 0 ESLint errors (warnings OK)
npm test -- --run      # All tests pass

# THEN run UGWTF validation:
./.automation/validate-phase.sh
```

**Why**: UGWTF automates workflow, but can't fix broken code. Validate locally first.

---

### 8. DO Document Custom Configurations
```markdown
# In your project README.md, add:

## UGWTF Configuration

**Cultural Keywords**: [List your project-specific keywords]
**Target Demographic**: [Your actual users]
**Phase Structure**: [Your custom phases if different from default 6]
**Validation Rules**: [Any custom rules you added]

See `.workflow-templates/config.yml` for full configuration.
```

**Why**: Future developers (or future you) need to understand WHY you configured UGWTF this way.

---

## ❌ DON'T'S - Critical Failure Patterns

### 1. DON'T Copy Without Customization
```bash
# ❌ WRONG: Just copy and run
cp -R cae-luxury-hair/.workflow-templates my-project/
cd my-project
bash .workflow-templates/setup-workflow.sh  # FAIL!
```

**Why It Fails**:
- Creates GitHub labels for "Atlanta keywords" on a non-Atlanta project
- Sets milestones for "luxury hair" phases on a SaaS app
- Validates against wrong cultural keywords

**✅ CORRECT**:
```bash
cp -R cae-luxury-hair/.workflow-templates my-project/
cd my-project
# 1. Edit .workflow-templates/config.yml FIRST
# 2. Customize labels.json for your project
# 3. Update milestones.json for your timeline
# 4. THEN run setup
bash .workflow-templates/setup-workflow.sh
```

---

### 2. DON'T Skip config.yml Customization
```yaml
# ❌ WRONG: Leaving default CAE Luxury Hair config
cultural_keywords:
  primary:
    - "The Melt"        # Makes no sense for a SaaS app!
    - "Boss Up"         # Wrong audience!
    - "Soft Life"       # Wrong brand voice!
```

**✅ CORRECT**:
```yaml
# For a B2B SaaS app targeting developers:
cultural_keywords:
  primary:
    - "Ship faster"
    - "Developer experience"
    - "Zero config"
    - "Just works"
  
avoid_terms:
    - "enterprise-grade"  # Vague
    - "world-class"       # Generic
    - "cutting-edge"      # Overused
```

---

### 3. DON'T Ignore Validation Failures
```bash
# ❌ WRONG: Continuing despite failures
./.automation/validate-phase.sh
# Output: ❌ 12 accessibility violations
# Output: ❌ Missing 8 cultural keywords
# You: "I'll fix it later" → Proceeds to create PR

# Result: Code Review Agent rejects PR, wasted time
```

**✅ CORRECT**:
```bash
./.automation/validate-phase.sh
# Output: ❌ 12 accessibility violations
# You: Fix the violations NOW
# Re-run: ✅ All checks pass
# Then: Create PR
```

**Why**: Automation agents are unforgiving. Fix issues before they multiply.

---

### 4. DON'T Create Issues Without Analyzing First
```bash
# ❌ WRONG: Skip analysis, go straight to issues
ugwtf.sh import ACTION_ITEMS.md
ugwtf.sh create-issues  # Creates 50 unorganized issues!
```

**Result**: GitHub issue chaos - no structure, no priorities, no dependencies.

**✅ CORRECT**:
```bash
ugwtf.sh import ACTION_ITEMS.md
ugwtf.sh analyze        # Map to phases, detect dependencies
# Review the output
ugwtf.sh create-issues  # Now creates organized, linked issues
```

---

### 5. DON'T Mix Action Item Formats Carelessly
```markdown
# ❌ WRONG: Inconsistent formatting confuses parser
- TODO: Fix bug
- ❌ Critical blocker
- High priority item
- 🔴 P0 issue
# Parser struggles to detect priorities consistently
```

**✅ CORRECT**:
```markdown
# Use consistent format:
## Critical Blockers (P0)
- ❌ **BLOCKING**: Stripe integration missing
- 🔴 **CRITICAL**: Database migration not applied

## High Priority (P1)
- ⚠️ Missing HeroVideo component
- 🟡 Accessibility violations in navigation

## Documentation (P2)
- 📝 API reference incomplete
- 📚 README needs update
```

**Why**: Consistent format = accurate parsing = correct priorities.

---

### 6. DON'T Hardcode Paths
```bash
# ❌ WRONG: Hardcoded paths in scripts
VIDEO_PATH="/Users/dame/management-git/cae-luxury-hair/videos/hero.mp4"

# Breaks when copied to new repo!
```

**✅ CORRECT**:
```bash
# Use relative paths or environment variables
VIDEO_PATH="./public/videos/hero.mp4"
# or
VIDEO_PATH="${PROJECT_ROOT}/videos/hero.mp4"
```

**Why**: Portability is UGWTF's core feature. Hardcoded paths break it.

---

### 7. DON'T Ignore Agent Feedback
```markdown
# Code Review Agent comments:
# "Missing aria-label on button (line 45)"

# ❌ WRONG: "I'll ignore it, it's just a warning"
# Result: Accessibility violations pile up, legal issues later
```

**✅ CORRECT**:
```tsx
// Fix immediately:
<Button aria-label="Shop Collection">
  Shop Now
</Button>
```

**Why**: Agents are trained on best practices. Their feedback prevents future problems.

---

### 8. DON'T Deploy Without Testing
```bash
# ❌ WRONG: Skip testing, deploy directly
git push
vercel --prod  # Breaks in production!
```

**✅ CORRECT**:
```bash
# Test locally first
npm run dev       # Test in browser
npm run build     # Verify build succeeds
npm test          # All tests pass

# THEN deploy
vercel --prod
```

---

## 🎯 Implicit Rules - Unwritten Patterns

### 1. Phase 1 Always Sets Foundation
**Implicit Rule**: Phase 1 should contain foundational items that ALL other phases depend on.

**Examples**:
- **E-commerce**: Product catalog structure, payment integration, user auth
- **SaaS**: User authentication, database schema, API structure
- **Blog**: Typography system, content model, image optimization

**Why**: If Phase 1 is wrong, all subsequent phases build on a flawed foundation.

---

### 2. Cultural Keywords Must Match Brand Voice
**Implicit Rule**: Cultural keywords should sound like your brand would actually say them.

**Test**:
```
Ask: "Would our CEO say this in a company presentation?"
- If yes → Good keyword
- If no → Wrong keyword
```

**Examples**:
- **Atlanta luxury hair**: "The Melt", "Boss Up", "Soft Life" ✅
- **Developer tools**: "Ship faster", "Zero config", "Just works" ✅
- **Corporate B2B**: "The Melt", "Boss Up" ❌ (wrong voice)

---

### 3. Accessibility Is Not Optional
**Implicit Rule**: Every interactive element MUST have proper accessibility.

**Non-negotiable**:
- ✅ All buttons have aria-labels
- ✅ Color contrast ≥ 4.5:1 (WCAG AA)
- ✅ Keyboard navigation works
- ✅ Screen reader compatible

**Why**: Legal requirement + moral responsibility + better UX for everyone.

---

### 4. Performance Budgets Are Hard Limits
**Implicit Rule**: If bundle exceeds budget, feature is blocked until optimized.

**Default Budgets**:
- JavaScript: 250KB
- CSS: 50KB
- Images (per page): 1MB

**If exceeded**:
1. Code splitting (lazy load routes)
2. Tree shaking (remove unused code)
3. Image optimization (WebP, lazy loading)
4. Remove dependencies (do you REALLY need that 100KB library?)

---

### 5. Documentation Updates With Code
**Implicit Rule**: Every code change requires corresponding documentation update.

**Pattern**:
```bash
# Changed code → Update docs in SAME commit
git add src/components/HeroVideo.tsx
git add docs/COMPONENTS.md  # Document the new component
git commit -m "feat: Add HeroVideo component with documentation"
```

**Why**: Docs drift from code = confusion = bugs = wasted time.

---

### 6. Mobile-First Is Default
**Implicit Rule**: All components designed for mobile FIRST, then desktop.

**Development Order**:
1. Design for 375x667 (iPhone SE)
2. Test at 768x1024 (iPad)
3. Test at 1920x1080 (Desktop)

**Why**: Easier to expand from mobile → desktop than shrink desktop → mobile.

---

### 7. Git Commits Are Atomic
**Implicit Rule**: One commit = one logical change.

**Good**:
```
✅ "feat: Add HeroVideo component"
✅ "fix: Correct aria-labels on buttons"
✅ "docs: Update README with deployment steps"
```

**Bad**:
```
❌ "fix stuff" (what stuff?)
❌ "WIP" (not atomic, not descriptive)
❌ "feat: Add HeroVideo, fix bugs, update docs, refactor store" (too many things)
```

---

### 8. Dependencies Are Justified
**Implicit Rule**: Every new dependency must answer: "Why can't we build this ourselves?"

**Before adding dependency**:
1. Check bundle size impact
2. Check maintenance status (last commit date)
3. Check security vulnerabilities
4. Estimate: "Could we implement this in 1 day?"
   - If yes → Build it yourself
   - If no → Use dependency

---

## 🚨 Common Pitfalls & Solutions

### Pitfall 1: "My action items weren't detected"
**Symptom**: `ugwtf.sh analyze` shows 0 items after import.

**Causes**:
- File not in expected markdown format
- No keywords (CRITICAL, TODO, HIGH, etc.)
- File path wrong

**Solution**:
```bash
# Validate input file first
ugwtf.sh validate ACTION_ITEMS.md

# Shows what it detected:
# ✅ 5 P0 items found
# ✅ 3 P1 items found
# ❌ 0 P2 items found (add TODO: to items)
```

---

### Pitfall 2: "GitHub labels not created"
**Symptom**: `setup-workflow.sh` runs but no labels appear.

**Causes**:
- `gh` CLI not authenticated
- No permissions on repository
- labels.json malformed

**Solution**:
```bash
# Check gh CLI authentication
gh auth status

# If not authenticated:
gh auth login

# Manually create labels to test:
gh label create "test-label" --color "FF0000"
```

---

### Pitfall 3: "Agent keeps rejecting my PRs"
**Symptom**: Code Review Agent always comments "Missing cultural keywords".

**Causes**:
- Cultural keywords configured but not used in code
- Wrong keywords for your project type
- Keyword density too low

**Solution**:
```bash
# Check current keyword density
./.automation/validate-phase.sh

# Shows:
# Cultural keywords: 2/500 words = 0.4% (target ≥0.6%)

# Fix: Add more keywords to your content
```

---

### Pitfall 4: "Phases have circular dependencies"
**Symptom**: Phase 2 depends on Phase 3 which depends on Phase 2.

**Causes**:
- Poorly defined action items
- Dependencies not clear in descriptions

**Solution**:
```markdown
# Be explicit about dependencies in action items:

## Phase 1: Foundation
- [ ] User authentication system (NO DEPENDENCIES)

## Phase 2: User Features
- [ ] User profile page (DEPENDS: Phase 1 auth)

## Phase 3: Admin Dashboard
- [ ] Admin user management (DEPENDS: Phase 1 auth, Phase 2 profiles)
```

---

### Pitfall 5: "Build works locally, fails in production"
**Symptom**: `npm run build` succeeds locally, fails on Vercel/Netlify.

**Causes**:
- Environment variables missing
- Different Node version
- Dependencies in devDependencies instead of dependencies

**Solution**:
```bash
# Simulate production build locally
NODE_ENV=production npm run build

# Check environment variables
cat .env | grep -v "^#"  # List all env vars
```

---

## 📊 Success Metrics

### How to Know UGWTF Is Working

**Week 1** (Setup):
- ✅ config.yml customized for your project
- ✅ GitHub labels created (21 labels)
- ✅ Milestones created (6 milestones)
- ✅ First action items imported and analyzed

**Week 2** (Phase 1):
- ✅ Phase 1 issues created
- ✅ Phase 1 components implemented
- ✅ Code Review Agent approved PR
- ✅ Phase 1 merged to main

**Week 3-4** (Phases 2-6):
- ✅ Phases 2-6 running in parallel
- ✅ Cultural validation passing
- ✅ Accessibility validation passing
- ✅ Performance metrics within budget

**Month 2** (Optimization):
- ✅ All 6 phases complete
- ✅ Production deployed
- ✅ Metrics tracking active
- ✅ User feedback incorporated

---

## 🎓 Learning Path for New Teams

### Phase 1: Understanding (Week 1)
**Goal**: Understand UGWTF concepts without implementing.

**Tasks**:
1. Read UGWTF_QUICK_START.md
2. Read UGWTF_COMPREHENSIVE_GUIDE.md
3. Study one example project (e.g., CAE Luxury Hair)
4. Review config.yml and understand each section

**Deliverable**: Can explain UGWTF to teammate in 5 minutes.

---

### Phase 2: Customization (Week 2)
**Goal**: Customize UGWTF for your project.

**Tasks**:
1. Copy `.workflow-templates/` to your repo
2. Customize config.yml
3. Update labels.json for your project
4. Update milestones.json for your timeline
5. Run setup-workflow.sh

**Deliverable**: GitHub labels and milestones created for your project.

---

### Phase 3: Import & Analyze (Week 3)
**Goal**: Import action items and validate phase mapping.

**Tasks**:
1. Create ACTION_ITEMS.md with your backlog
2. Import: `ugwtf.sh import ACTION_ITEMS.md`
3. Analyze: `ugwtf.sh analyze`
4. Review phase mapping (makes sense?)
5. Adjust if needed, re-analyze

**Deliverable**: Clean phase mapping ready for issue creation.

---

### Phase 4: Implement Phase 1 (Week 4-5)
**Goal**: Implement and merge Phase 1.

**Tasks**:
1. Create issues: `ugwtf.sh create-issues --phase 1`
2. Implement Phase 1 components
3. Validate: `./.automation/validate-phase.sh`
4. Create PR
5. Code Review Agent validates
6. Merge to main

**Deliverable**: Phase 1 complete, foundation established.

---

### Phase 5: Scale to Phases 2-6 (Week 6-10)
**Goal**: Complete all phases using UGWTF automation.

**Tasks**:
1. Create all remaining issues
2. Implement phases (can run in parallel if no dependencies)
3. Validate each phase
4. Create PRs
5. Merge sequentially

**Deliverable**: All 6 phases complete, project shipped.

---

## 🔄 Maintenance & Updates

### When to Update UGWTF

**Update config.yml when**:
- Target demographic changes
- Brand voice evolves
- New cultural keywords emerge
- Performance budgets change

**Update labels/milestones when**:
- Project scope changes
- Timeline shifts
- New priority categories needed

**Update agents when**:
- New validation rules needed
- False positives/negatives detected
- New tools integrated (e.g., new Lighthouse version)

### Version Control for UGWTF
```bash
# .workflow-templates/ should be version controlled
git add .workflow-templates/
git commit -m "config(ugwtf): Update cultural keywords for Q2 campaign"
```

**Why**: Team needs to see when/why UGWTF configuration changed.

---

## 🆘 Getting Help

### Troubleshooting Hierarchy

1. **Check MASTER_INSTRUCTIONS.md** (this file)
2. **Read UGWTF_COMPREHENSIVE_GUIDE.md**
3. **Run with --help flag**: `ugwtf.sh --help`
4. **Check logs**: `.workflow-templates/.temp/*.log`
5. **Search issues**: GitHub issues with `ugwtf` label
6. **Ask team**: Slack/Discord with `#ugwtf` tag

### Debug Mode
```bash
# Run UGWTF with verbose logging
DEBUG=1 ugwtf.sh import ACTION_ITEMS.md

# Output shows detailed parsing logic
```

---

## ✨ Final Checklist Before Going Live

Before deploying UGWTF to production:

- [ ] config.yml customized for project
- [ ] labels.json matches project needs
- [ ] milestones.json reflects timeline
- [ ] Cultural keywords match brand voice
- [ ] Avoid terms list is project-specific
- [ ] Performance budgets set appropriately
- [ ] Accessibility requirements clear (WCAG AA minimum)
- [ ] All team members trained on UGWTF
- [ ] Documentation updated with UGWTF info
- [ ] Validation scripts tested locally
- [ ] Code Review Agent configured
- [ ] GitHub permissions verified
- [ ] Environment variables set
- [ ] First action items imported and validated
- [ ] Phase 1 planned and ready to start

**If all checked**: You're ready to ship! 🚀

---

**Version**: 2.0.0  
**Last Updated**: February 3, 2026  
**Maintainer**: DaBigHomie  
**License**: Proprietary - Reusable within organization

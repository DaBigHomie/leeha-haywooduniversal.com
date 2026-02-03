# UGWTF Agent Onboarding Prompts
**Step-by-Step Instructions for AI Agents After Copying UGWTF**

**Purpose**: Feed these prompts to an AI agent (GitHub Copilot, Claude, ChatGPT) in sequence after copying `.workflow-templates/` to a new repository.

---

## 🤖 How to Use This Document

1. **Copy UGWTF to new repo**:
   ```bash
   cp -R /path/to/cae-luxury-hair/.workflow-templates /path/to/new-repo/
   cd /path/to/new-repo
   ```

2. **Feed prompts to AI agent in order** (Prompt 1 → Prompt 10)

3. **Agent completes each step** before moving to next prompt

4. **Validate output** after each prompt

---

## 📋 Prompt 1: Repository Analysis

**Copy/paste this to agent:**

```
You are setting up the Ultimate Git Workflow Template Framework (UGWTF) on this repository.

STEP 1: Repository Analysis

Analyze this repository and provide:

1. **Project Type**: (e-commerce, saas, blog, api, portfolio, etc.)
2. **Tech Stack**: (React, Vue, Next.js, Node.js, Python, etc.)
3. **Target Demographic**: Who are the users? (be specific: age, location, industry, etc.)
4. **Core Features**: What are the 3-5 main features?
5. **Current State**: What percentage complete is this project?

Based on this analysis, recommend:
- Appropriate cultural keywords (5-10 keywords that match the brand voice)
- Terms to avoid (generic/overused terms for this industry)
- Suggested phase structure (how many phases, what goes in each)

Output format:
```yaml
repository_analysis:
  project_type: "..."
  tech_stack: [...]
  target_demographic: "..."
  core_features: [...]
  completion_percentage: X%
  
recommendations:
  cultural_keywords: [...]
  avoid_terms: [...]
  phases:
    phase_1: {...}
    phase_2: {...}
    # etc.
```

Do NOT make changes yet. Just analyze and recommend.
```

**Expected Output**: YAML file with repository analysis and recommendations.

---

## 📋 Prompt 2: Customize config.yml

**Copy/paste this to agent:**

```
Using the repository analysis from Prompt 1, customize the UGWTF configuration.

STEP 2: Customize config.yml

File to edit: `.workflow-templates/config.yml`

Replace ALL default CAE Luxury Hair values with values specific to THIS repository:

1. **Project section**:
   - Update `name` to this repository's name
   - Update `type` to the project type identified
   - Update `target_demographic` with specific user details
   - Update `repository` to the correct GitHub repo path

2. **Cultural keywords section**:
   - Replace "The Melt", "Boss Up", "Soft Life" etc. with keywords from recommendations
   - Update `min_density` based on project type (e-commerce: 3, blog: 5, api: 1)
   - Update `avoid_terms` with generic terms for THIS industry

3. **Accessibility section**:
   - Keep `wcag_level: "AA"` (minimum legal requirement)
   - Adjust if project has higher accessibility needs

4. **Performance section**:
   - Adjust `bundle_budget` based on project type:
     - E-commerce: js=250, css=50
     - Blog: js=150, css=30
     - SaaS app: js=300, css=75
     - API: N/A

5. **Phases section**:
   - Keep `auto_detect: true` unless you have custom phases
   - If custom phases, set `manual_override: true` and define each phase

Show me the FULL updated config.yml file before making changes.
```

**Expected Output**: Complete config.yml file ready to replace the default one.

---

## 📋 Prompt 3: Customize labels.json

**Copy/paste this to agent:**

```
Customize GitHub labels for THIS project.

STEP 3: Customize labels.json

File to edit: `.workflow-templates/labels.json`

Current labels are CAE-specific (phase-1-visual-trust, area:atlanta-keywords, etc.).
Update to match THIS project:

1. **Phase labels** (6 labels):
   - Keep green/blue/purple/orange/yellow/teal color scheme
   - Rename phases to match recommendations from Prompt 1
   - Example: "phase-1-visual-trust" → "phase-1-api-foundation"

2. **Area labels** (4 labels):
   - Replace "area:atlanta-keywords" with relevant area for THIS project
   - Examples:
     - API: "area:performance", "area:security", "area:documentation"
     - E-commerce: "area:conversion", "area:payment", "area:user-experience"
   - Keep WCAG AA area if UI project

3. **Keep these unchanged**:
   - Priority labels (p0, p1, p2)
   - Type labels (feature, fix, docs, refactor)
   - Status labels (blocked, in-review, approved, deployed)

Show me the updated labels.json before making changes.
```

**Expected Output**: Complete labels.json with project-specific labels.

---

## 📋 Prompt 4: Customize milestones.json

**Copy/paste this to agent:**

```
Customize GitHub milestones timeline for THIS project.

STEP 4: Customize milestones.json

File to edit: `.workflow-templates/milestones.json`

Update milestone structure based on project timeline:

1. **Review current milestones**:
   - 6 phases: 5, 4, 3, 2, 3, 3 days = 20 days total
   - Is this realistic for THIS project?

2. **Adjust timeline**:
   - If project is larger/more complex: increase days per phase
   - If project is smaller/simpler: decrease days per phase
   - If project needs different number of phases: add/remove milestones

3. **Update milestone names**:
   - Match phase names from Prompt 3 labels
   - Example: "Phase 1: Visual Trust" → "Phase 1: API Foundation"

4. **Verify dependencies**:
   - Phase 1 should have no dependencies
   - Phases 2-4 should depend on Phase 1
   - Phase 5 should depend on Phases 1-4
   - Phase 6 should depend on all previous phases

Show me the updated milestones.json with timeline justification.
```

**Expected Output**: Complete milestones.json with adjusted timeline and names.

---

## 📋 Prompt 5: Update Issue Templates

**Copy/paste this to agent:**

```
Update issue templates for THIS project's phases.

STEP 5: Update Issue Templates

Files to edit: `.workflow-templates/issue-templates/phase[2-6].md`

For EACH issue template (phase2.md through phase6.md):

1. **Update phase name** in title and description
   - Match names from Prompt 3/4

2. **Update cultural validation requirements**:
   - Replace Atlanta keywords with THIS project's keywords (from config.yml)
   - Update avoid terms list

3. **Update accessibility requirements**:
   - Keep WCAG AA if UI project
   - Remove/adjust if API-only project

4. **Update performance requirements**:
   - Adjust bundle size limits based on config.yml
   - For API projects: replace with latency/throughput requirements

5. **Update success criteria**:
   - Replace "80%+ visitors feel site represents them" with metrics relevant to THIS project
   - Examples:
     - API: "p99 latency < 100ms"
     - SaaS: "90% task completion rate"
     - E-commerce: "60% add-to-cart rate"

Update phase2.md first and show me the result before proceeding to others.
```

**Expected Output**: Updated phase2.md, then repeat for phase3-6.md.

---

## 📋 Prompt 6: Update PR Template

**Copy/paste this to agent:**

```
Customize the Pull Request template for THIS project.

STEP 6: Update PR Template

File to edit: `.workflow-templates/pr-templates/pull_request_template.md`

Update the PR template to match THIS project:

1. **Cultural Validation Checklist**:
   - Replace Atlanta keywords with THIS project's keywords
   - Replace "luxury hair" examples with relevant examples
   - Keep the density check formula

2. **Accessibility Checklist**:
   - Keep WCAG AA items if UI project
   - For API projects: replace with API-specific checks:
     - [ ] OpenAPI spec updated
     - [ ] Authentication documented
     - [ ] Rate limits specified
     - [ ] Error codes documented

3. **Performance Checklist**:
   - Adjust Lighthouse thresholds based on project type
   - For API projects: replace with:
     - [ ] Load tested (target RPS)
     - [ ] Latency benchmarked (p50, p95, p99)
     - [ ] Memory profiled (no leaks)

4. **Testing Checklist**:
   - Keep unit tests, E2E tests
   - Add project-specific tests (integration, contract, etc.)

Show me the updated PR template.
```

**Expected Output**: Complete pull_request_template.md for this project.

---

## 📋 Prompt 7: Run Setup Script

**Copy/paste this to agent:**

```
Run the UGWTF setup script to create GitHub labels and milestones.

STEP 7: Run Setup Script

BEFORE running setup:
1. Verify you're in the correct repository directory
2. Verify gh CLI is authenticated: `gh auth status`
3. Verify you have write access to the repository

Run setup:
```bash
cd /path/to/your-repo
bash .workflow-templates/setup-workflow.sh
```

The script will:
- ✅ Copy workflows to `.github/workflows/`
- ✅ Copy issue templates to `.github/ISSUE_TEMPLATE/`
- ✅ Copy PR template to `.github/`
- ✅ Copy agents to `.github/scripts/agents/`
- ✅ Install agent dependencies (npm install in agents/)
- ✅ Create 21 GitHub labels
- ✅ Create 6 milestones with due dates

Expected output:
```
✅ Workflows copied
✅ Templates copied
✅ Agents copied and dependencies installed
✅ Created 21 labels
✅ Created 6 milestones
🎉 UGWTF setup complete!
```

If any step fails, report the error and stop.
```

**Expected Output**: Setup script completes successfully, GitHub has labels and milestones.

---

## 📋 Prompt 8: Import Action Items

**Copy/paste this to agent:**

```
Import existing action items, TODOs, and backlog into UGWTF.

STEP 8: Import Action Items

Create a comprehensive action items file by scanning:

1. **Existing TODO comments** in code:
   ```bash
   # Scan codebase for TODOs
   ugwtf.sh scan-code src/
   ```

2. **Existing GitHub issues** (if any):
   ```bash
   gh issue list --json number,title,body > existing-issues.json
   ugwtf.sh import existing-issues.json
   ```

3. **Manual backlog** (create ACTION_ITEMS.md):
   - List all features not yet implemented
   - List all known bugs
   - List all documentation gaps
   - Use proper formatting (P0/P1/P2 markers)

Then import:
```bash
ugwtf.sh import ACTION_ITEMS.md
```

Show me:
1. The ACTION_ITEMS.md file you created
2. The import output (how many P0/P1/P2 detected)
```

**Expected Output**: 
- ACTION_ITEMS.md file with comprehensive backlog
- Import confirmation showing item counts

---

## 📋 Prompt 9: Analyze & Map Phases

**Copy/paste this to agent:**

```
Analyze imported action items and map to phases.

STEP 9: Analyze & Map Phases

Run analysis:
```bash
ugwtf.sh analyze
```

The output will show:
- Total action items detected
- Priority breakdown (P0/P1/P2)
- Suggested phase mapping

Review the phase mapping and verify:

1. **Phase 1 contains foundational items**:
   - Items that ALL other phases depend on
   - Examples: auth system, database schema, core API, UI foundation
   - Should be P0 or high P1

2. **No circular dependencies**:
   - Phase 2 shouldn't depend on Phase 3 which depends on Phase 2

3. **Balanced workload**:
   - No phase with 20 items while others have 2
   - Aim for roughly equal effort per phase

4. **Logical grouping**:
   - Related features in same phase
   - Independent features can be in parallel phases

If phase mapping looks wrong:
- Adjust action items to clarify dependencies
- Re-import and re-analyze
- Or use manual phase override in config.yml

Show me the phase mapping output and your assessment of whether it's correct.
```

**Expected Output**: 
- Phase mapping output from UGWTF
- Agent's assessment of whether mapping is logical
- Recommendations for adjustments if needed

---

## 📋 Prompt 10: Create GitHub Issues

**Copy/paste this to agent:**

```
Create GitHub issues for all phases.

STEP 10: Create GitHub Issues

If phase mapping from Prompt 9 looks good, create issues:

```bash
# Option A: Create all issues at once
ugwtf.sh create-issues

# Option B: Create Phase 1 only first
ugwtf.sh create-issues --phase 1
```

IMPORTANT: Before running, verify:
- [ ] config.yml is customized ✅
- [ ] labels.json is customized ✅
- [ ] milestones.json is customized ✅
- [ ] Issue templates are updated ✅
- [ ] Phase mapping is verified ✅

After running, verify in GitHub:
1. Check Issues tab: Should see new issues created
2. Verify labels applied correctly
3. Verify milestones assigned
4. Verify issue descriptions have correct cultural keywords
5. Verify checklists are project-appropriate

If anything looks wrong:
- Close the incorrectly created issues
- Fix the configuration
- Re-run create-issues

Show me:
1. Confirmation that issues were created
2. Link to one example issue (e.g., Phase 1 issue)
3. Verification that labels and milestones are correct
```

**Expected Output**:
- Confirmation that GitHub issues were created
- Link to example issue
- Verification that configuration applied correctly

---

## 🎉 Completion Checklist

After completing all 10 prompts, verify:

- [ ] **Prompt 1**: Repository analyzed ✅
- [ ] **Prompt 2**: config.yml customized ✅
- [ ] **Prompt 3**: labels.json customized ✅
- [ ] **Prompt 4**: milestones.json customized ✅
- [ ] **Prompt 5**: Issue templates updated ✅
- [ ] **Prompt 6**: PR template updated ✅
- [ ] **Prompt 7**: Setup script ran successfully ✅
- [ ] **Prompt 8**: Action items imported ✅
- [ ] **Prompt 9**: Phase mapping validated ✅
- [ ] **Prompt 10**: GitHub issues created ✅

**Additional Verification**:
- [ ] GitHub has 21 labels (check Labels tab)
- [ ] GitHub has 6 milestones (check Milestones tab)
- [ ] GitHub has issues for all phases (check Issues tab)
- [ ] All files committed to git
- [ ] Documentation updated (README mentions UGWTF)

---

## 🚀 Next Steps After Onboarding

Once UGWTF is set up, the agent should:

1. **Start Phase 1**:
   ```bash
   git checkout -b feature/phase-1-[phase-name]
   # Implement Phase 1 components
   ```

2. **Validate Before PR**:
   ```bash
   ./.automation/validate-phase.sh
   ```

3. **Create PR**:
   ```bash
   gh pr create --title "Phase 1: [Phase Name]" \
     --body "$(cat .github/pull_request_template.md)" \
     --base main --head feature/phase-1-[phase-name]
   ```

4. **Code Review Agent validates automatically**

5. **Merge and continue to Phase 2-6**

---

## 🐛 Troubleshooting During Onboarding

### "setup-workflow.sh fails at label creation"
**Cause**: gh CLI not authenticated or no write access

**Fix**:
```bash
gh auth login
gh auth status  # Verify authentication
```

### "Phase mapping seems wrong"
**Cause**: Action items don't have clear dependencies

**Fix**: Update ACTION_ITEMS.md with explicit dependencies:
```markdown
## Phase 1: Foundation
- [ ] User auth (NO DEPENDENCIES)

## Phase 2: Features  
- [ ] User profile (DEPENDS: Phase 1 auth)
```

### "Cultural keywords don't match brand"
**Cause**: Didn't customize config.yml properly

**Fix**: Re-do Prompt 2, replace ALL CAE-specific keywords

### "Too many/few phases detected"
**Cause**: Backlog too large/small for default 6-phase structure

**Fix**: 
- Set `manual_override: true` in config.yml
- Define custom phases (3-10 phases recommended)

---

## 📚 Reference Documents

After onboarding, agent should read:
1. **MASTER_INSTRUCTIONS.md** - Do's and don'ts
2. **UGWTF_COMPREHENSIVE_GUIDE.md** - Technical reference
3. **README.md** - System overview

---

**Version**: 2.0.0  
**Last Updated**: February 3, 2026  
**Purpose**: AI Agent onboarding for UGWTF implementation  
**Estimated Time**: 2-3 hours for complete onboarding

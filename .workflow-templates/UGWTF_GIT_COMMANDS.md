# UGWTF Successful Git Commands Reference

**Date**: February 4, 2026  
**Project**: Leeha Haywood Universal Law Firm (DaBigHomie/leeha-haywooduniversal.com)  
**Session**: Full UGWTF Automation Workflow Execution

---

## ✅ Git Commands Used Successfully

### 1. Status & Information
```bash
# Check current git status
git status

# Check status with short format (staged files)
git status --short

# Check current branch
git branch --show-current

# List all branches
git branch -a

# Show commit log (latest 5)
git log --oneline -5

# Show current commit hash
git rev-parse HEAD
git rev-parse --short HEAD
```

### 2. Pulling & Syncing
```bash
# Pull latest from remote (after PRs merged)
git pull origin main

# Fast-forward merge (auto when behind)
# Output: Updating 803ec5f..547797c
# Fast-forward

# Pull with rebase (alternative)
git pull --rebase origin main
```

### 3. Staging Files
```bash
# Add all files (modified, untracked, deleted)
git add -A

# Alternative: Add all in current directory
git add .

# Add specific files
git add .workflow-templates/
git add *.prompt.md
git add UGWTF_*.md

# Check what's staged before commit
git status --short
# Output format:
# M  = Modified
# A  = Added (new file)
# ?? = Untracked
```

### 4. Committing Changes
```bash
# Commit with multi-line message using heredoc
git commit -F - <<'EOF'
docs: Add UGWTF implementation prompts for legal services

- Created 5 phase-specific prompt.md files for Copilot
- Added UGWTF_FEATURE_REQUESTS.md (workflow improvements)
- Created IMPLEMENTATION_PROMPTS_INDEX.md (master guide)
- Synced GitHub labels from labels.json

Testing Evidence:
- ✅ Build: Success
- ✅ TypeScript: 0 errors
- ✅ 5 PRs created successfully (#8, #9, #10, #11, #12)
- ✅ All issues assigned to Copilot
EOF

# Simple single-line commit
git commit -m "docs: Add implementation prompts"

# Commit staged files only
git commit

# Amend last commit (if needed)
git commit --amend -m "Updated message"
```

### 5. Pushing to Remote
```bash
# Push to main branch
git push origin main

# Push current branch (auto-detect)
git push

# Force push (USE WITH CAUTION)
git push --force-with-lease

# Set upstream and push
git push --set-upstream origin branch-name
```

### 6. Working with Worktrees (Advanced)
```bash
# List all worktrees
git worktree list

# Example output:
# /Users/dame/management-git/leeha-haywooduniversal.com    547797c [main]
# /tmp/copilot-worktree-2026-02-04                         abc1234 [copilot-phase-2]

# Navigate to worktree
cd /tmp/copilot-worktree-2026-02-04
```

---

## 📊 Full Workflow Command Sequence

### Complete Git Workflow (Leeha Project)
```bash
# 1. Navigate to project
cd /Users/dame/management-git/leeha-haywooduniversal.com

# 2. Check current status
git status
# Output: On branch main, changes not staged

# 3. Pull latest changes (from merged PRs)
git pull origin main
# Output: Fast-forward, files changed

# 4. Verify clean state
git status
# Output: Changes not staged for commit

# 5. Stage all files (including new docs)
git add -A

# 6. Verify what's staged
git status --short
# Output:
# A  .workflow-templates/UGWTF_GIT_COMMANDS.md
# A  .workflow-templates/UGWTF_SCRIPTS_INVENTORY.md
# A  IMPLEMENTATION_PROMPTS_INDEX.md
# A  .workflow-templates/prompts/implement-conversion-triggers.prompt.md
# A  .workflow-templates/prompts/implement-booking-experience.prompt.md
# A  .workflow-templates/prompts/implement-digital-products.prompt.md
# A  .workflow-templates/prompts/implement-atlanta-local.prompt.md
# A  .workflow-templates/prompts/implement-technical-polish.prompt.md
# M  .workflow-templates/automation/create-all-issues.sh
# A  UGWTF_FIX_SUMMARY.md

# 7. Commit with evidence
git commit -F - <<'EOF'
docs: Add UGWTF reference documentation and workflow guides

Created:
- UGWTF_GIT_COMMANDS.md (git workflow reference)
- UGWTF_SCRIPTS_INVENTORY.md (automation scripts catalog)
- IMPLEMENTATION_PROMPTS_INDEX.md (prompt file index)
- UGWTF_FIX_SUMMARY.md (label sync documentation)

Updated:
- create-all-issues.sh (fixed label references)
- sync-labels.sh (automated label upload)

Testing Evidence:
- ✅ Build: Success
- ✅ TypeScript: 0 errors
- ✅ ESLint: 0 errors
- ✅ 5 issues created (#3-7)
- ✅ 5 PRs created by Copilot (#8-12)
- ✅ Labels synced (21 labels)
EOF

# 8. Push to GitHub
git push origin main

# 9. Verify remote updated
git log origin/main -1
```

---

## 🔧 Git Commands for Debugging

### Check File Changes
```bash
# Show files changed in last commit
git diff HEAD~1 --name-only

# Show detailed diff of specific file
git diff HEAD~1 .workflow-templates/automation/create-all-issues.sh

# Show changes in specific directory
git diff HEAD~1 .workflow-templates/

# Compare with remote
git diff origin/main
```

### Branch Management
```bash
# Create new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main

# Delete branch (local)
git branch -d feature/old-feature

# Delete branch (remote)
git push origin --delete feature/old-feature
```

### Undoing Changes
```bash
# Discard unstaged changes to file
git restore file.txt

# Unstage file (keep changes)
git restore --staged file.txt

# Discard all unstaged changes
git restore .

# Reset to specific commit (keep changes)
git reset --soft HEAD~1

# Reset to specific commit (discard changes)
git reset --hard HEAD~1
```

---

## 🚀 UGWTF-Specific Git Patterns

### After Label Sync
```bash
# Sync labels then commit
bash .workflow-templates/automation/sync-labels.sh
git add .workflow-templates/labels.json
git commit -m "feat: Sync GitHub labels for UGWTF workflow"
git push origin main
```

### After Issue Creation
```bash
# Create issues then document
bash .workflow-templates/automation/create-all-issues.sh
# (Issues #3-7 created)

git add UGWTF_FIX_SUMMARY.md
git commit -m "docs: Document issue creation results"
git push origin main
```

### After PR Merges
```bash
# Pull merged PRs
git pull origin main

# Check what changed
git log --oneline -5
git show HEAD~1

# Continue workflow
bash .github/scripts/ugwtf-monitor.sh  # Next phase
```

---

## 📝 Commit Message Conventions

### Format
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code change that neither fixes bug nor adds feature
- `test`: Adding tests
- `chore`: Updating build tasks, package manager configs, etc.

### Examples (Leeha Project)
```bash
# Feature
git commit -m "feat(booking): Add consultation booking flow"

# Fix
git commit -m "fix(navigation): Correct attorney bio link routing"

# Documentation
git commit -m "docs(ugwtf): Add workflow automation reference"

# Multiple changes
git commit -F - <<'EOF'
feat(legal-services): Implement Phase 2 conversion triggers

- Added InvestmentOptions component (Afterpay/Klarna)
- Created UrgencyTimer for consultation slots
- Implemented TrustSignals with bar certifications

Closes #3
EOF
```

---

## 🎯 Common Workflows

### 1. Complete UGWTF Cycle
```bash
# Navigate to project
cd /Users/dame/management-git/leeha-haywooduniversal.com

# Run validation
bash .github/scripts/validate-deployment.sh

# Create issues (if needed)
bash .workflow-templates/automation/create-all-issues.sh

# Assign to Copilot (via MCP API)
# (Done via Claude agent or UI)

# Monitor PRs
bash .github/scripts/ugwtf-monitor.sh

# After PRs ready, pull changes
git pull origin main

# Commit documentation
git add UGWTF_*.md
git commit -m "docs: Update UGWTF execution summary"
git push origin main
```

### 2. Quick Status Check
```bash
# Check git status
git status --short

# Check GitHub PRs
gh pr list --repo DaBigHomie/leeha-haywooduniversal.com

# Check issues
gh issue list --repo DaBigHomie/leeha-haywooduniversal.com
```

### 3. Emergency Rollback
```bash
# Identify bad commit
git log --oneline -10

# Reset to previous commit (keep changes)
git reset --soft HEAD~1

# Or reset completely (DANGEROUS)
git reset --hard HEAD~1
git push --force-with-lease origin main
```

---

## ✅ Best Practices

### Before Commit
- ✅ Run `git status --short` to verify files
- ✅ Check `npx tsc --noEmit` (no TypeScript errors)
- ✅ Check `npm run lint` (no ESLint errors)
- ✅ Test in browser if UI changes

### Commit Messages
- ✅ Use conventional commit format
- ✅ Include testing evidence
- ✅ Reference issue numbers (`Closes #3`)
- ✅ Explain WHY not just WHAT

### After Commit
- ✅ Verify remote updated: `git log origin/main -1`
- ✅ Check GitHub Actions (if configured)
- ✅ Monitor deployment (Vercel/Netlify)

---

## 🔗 Related Documentation

- **UGWTF Scripts**: `.workflow-templates/UGWTF_SCRIPTS_INVENTORY.md`
- **Implementation Prompts**: `IMPLEMENTATION_PROMPTS_INDEX.md`
- **Validation Guide**: `.github/scripts/validate-deployment.sh`
- **Label Sync**: `.workflow-templates/automation/sync-labels.sh`

---

**Last Updated**: February 4, 2026  
**Status**: ✅ Production Ready  
**Next**: Monitor PRs #8-12 for Copilot completion

#!/bin/bash
# validate-deployment.sh - Comprehensive pre-deployment validation
# Ensures UGWTF system and codebase are ready for deployment

set -e  # Exit on any error

PROJECT_NAME="Leeha Haywood Universal Law Firm"
REPO="DaBigHomie/leeha-haywooduniversal.com"

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  UGWTF Pre-Deployment Validation                            ║"
echo "║  Project: $PROJECT_NAME"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Function to report results
pass() {
    echo -e "${GREEN}✅ PASS${NC}: $1"
}

fail() {
    echo -e "${RED}❌ FAIL${NC}: $1"
    ((ERRORS++))
}

warn() {
    echo -e "${YELLOW}⚠️  WARN${NC}: $1"
    ((WARNINGS++))
}

echo "📋 Phase 1: File Structure Validation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check prompt files
PROMPT_FILES=(
    "implement-conversion-triggers.prompt.md"
    "implement-booking-experience.prompt.md"
    "implement-digital-products.prompt.md"
    "implement-atlanta-local.prompt.md"
    "implement-technical-polish.prompt.md"
)

for file in "${PROMPT_FILES[@]}"; do
    if [ -f "$file" ]; then
        pass "Prompt file exists: $file"
    else
        fail "Missing prompt file: $file"
    fi
done

# Check UGWTF scripts
UGWTF_SCRIPTS=(
    ".github/scripts/ugwtf-monitor.sh"
    ".github/scripts/ugwtf-auto-review.sh"
    ".github/scripts/ugwtf-auto-assign.sh"
    ".github/scripts/ugwtf-complete-workflow.sh"
)

for script in "${UGWTF_SCRIPTS[@]}"; do
    if [ -f "$script" ] && [ -x "$script" ]; then
        pass "UGWTF script exists and is executable: $script"
    elif [ -f "$script" ]; then
        warn "UGWTF script exists but not executable: $script"
    else
        fail "Missing UGWTF script: $script"
    fi
done

# Check issue creation script
if [ -f ".workflow-templates/automation/create-all-issues.sh" ] && [ -x ".workflow-templates/automation/create-all-issues.sh" ]; then
    pass "Issue creation script exists and is executable"
else
    fail "Missing or non-executable: .workflow-templates/automation/create-all-issues.sh"
fi

# Check issue templates
ISSUE_TEMPLATES=(
    ".workflow-templates/issue-templates/phase2.md"
    ".workflow-templates/issue-templates/phase3.md"
    ".workflow-templates/issue-templates/phase4.md"
    ".workflow-templates/issue-templates/phase5.md"
    ".workflow-templates/issue-templates/phase6.md"
)

for template in "${ISSUE_TEMPLATES[@]}"; do
    if [ -f "$template" ]; then
        pass "Issue template exists: $template"
    else
        fail "Missing issue template: $template"
    fi
done

echo ""
echo "🔍 Phase 2: Code Quality Validation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if package.json exists
if [ ! -f "package.json" ]; then
    warn "No package.json found - skipping npm checks"
else
    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        warn "node_modules not found - run 'npm install' first"
    else
        pass "node_modules directory exists"
    fi

    # TypeScript check (if tsconfig exists)
    if [ -f "tsconfig.json" ]; then
        echo "  → Running TypeScript check..."
        if npx tsc --noEmit 2>&1 | tee /tmp/tsc-output.txt; then
            pass "TypeScript compilation successful (0 errors)"
        else
            ERROR_COUNT=$(grep -c "error TS" /tmp/tsc-output.txt || echo "0")
            fail "TypeScript has $ERROR_COUNT errors - run 'npx tsc --noEmit'"
        fi
    else
        warn "No tsconfig.json found - skipping TypeScript check"
    fi

    # ESLint check (if eslint config exists)
    if [ -f "eslint.config.js" ] || [ -f ".eslintrc.js" ] || [ -f ".eslintrc.json" ]; then
        echo "  → Running ESLint check..."
        if npm run lint --silent 2>&1 | tee /tmp/eslint-output.txt; then
            pass "ESLint passed (0 errors)"
        else
            ERROR_COUNT=$(grep -c "error" /tmp/eslint-output.txt || echo "0")
            if [ "$ERROR_COUNT" -gt 0 ]; then
                fail "ESLint has $ERROR_COUNT errors - run 'npm run lint'"
            else
                pass "ESLint passed (warnings acceptable)"
            fi
        fi
    else
        warn "No ESLint config found - skipping lint check"
    fi

    # Build check
    if grep -q '"build"' package.json; then
        echo "  → Running build check..."
        if npm run build 2>&1 | tee /tmp/build-output.txt; then
            pass "Build successful"
        else
            fail "Build failed - check /tmp/build-output.txt"
        fi
    else
        warn "No build script in package.json - skipping build check"
    fi
fi

echo ""
echo "🔐 Phase 3: Git Repository Validation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if git repo
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    fail "Not a git repository"
else
    pass "Valid git repository"
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" = "main" ]; then
    pass "On main branch"
else
    warn "Not on main branch (current: $CURRENT_BRANCH)"
fi

# Check for uncommitted changes
if git diff-index --quiet HEAD --; then
    pass "No uncommitted changes"
else
    warn "Uncommitted changes detected - commit before deployment"
fi

# Check if synced with remote
if git fetch origin &> /dev/null; then
    LOCAL=$(git rev-parse @)
    REMOTE=$(git rev-parse @{u})
    
    if [ "$LOCAL" = "$REMOTE" ]; then
        pass "Repository synced with remote"
    else
        warn "Local and remote are out of sync - run 'git pull' or 'git push'"
    fi
else
    warn "Could not fetch from remote - check network connection"
fi

echo ""
echo "🌐 Phase 4: GitHub Connection Validation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check GitHub CLI
if command -v gh &> /dev/null; then
    pass "GitHub CLI (gh) installed"
    
    # Check authentication
    if gh auth status &> /dev/null; then
        pass "GitHub CLI authenticated"
    else
        fail "GitHub CLI not authenticated - run 'gh auth login'"
    fi
else
    fail "GitHub CLI (gh) not installed - required for UGWTF"
fi

# Check repository access
if gh repo view "$REPO" &> /dev/null; then
    pass "Can access repository: $REPO"
else
    fail "Cannot access repository: $REPO"
fi

echo ""
echo "📊 Phase 5: UGWTF System Validation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Count prompt files
PROMPT_COUNT=$(ls -1 implement-*.prompt.md 2>/dev/null | wc -l)
if [ "$PROMPT_COUNT" -eq 5 ]; then
    pass "All 5 prompt files present (100%)"
else
    fail "Only $PROMPT_COUNT/5 prompt files found"
fi

# Check prompt file sizes (should be substantial)
for file in "${PROMPT_FILES[@]}"; do
    if [ -f "$file" ]; then
        SIZE=$(wc -l < "$file" | xargs)
        if [ "$SIZE" -gt 500 ]; then
            pass "Prompt file has substantial content: $file ($SIZE lines)"
        else
            warn "Prompt file seems short: $file ($SIZE lines)"
        fi
    fi
done

# Check if issues already exist
ISSUE_COUNT=$(gh issue list --repo "$REPO" --label "ugwtf" --json number --jq '. | length' 2>/dev/null || echo "0")
if [ "$ISSUE_COUNT" -eq 0 ]; then
    pass "No UGWTF issues exist yet (ready to create)"
elif [ "$ISSUE_COUNT" -eq 5 ]; then
    warn "5 UGWTF issues already exist - may create duplicates"
else
    warn "$ISSUE_COUNT UGWTF issues exist - expected 0 or 5"
fi

# Check for open PRs
PR_COUNT=$(gh pr list --repo "$REPO" --json number --jq '. | length' 2>/dev/null || echo "0")
if [ "$PR_COUNT" -eq 0 ]; then
    pass "No open PRs (clean state)"
else
    warn "$PR_COUNT open PRs exist"
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "📈 Validation Summary"
echo "═══════════════════════════════════════════════════════════════"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✅ ALL CHECKS PASSED${NC}"
    echo ""
    echo "🚀 UGWTF system is 100% ready for deployment!"
    echo ""
    echo "Next steps:"
    echo "  1. Run: bash .workflow-templates/automation/create-all-issues.sh"
    echo "  2. Copy issue numbers from output"
    echo "  3. Run: bash .github/scripts/ugwtf-auto-assign.sh <numbers>"
    echo "  4. Run: bash .github/scripts/ugwtf-monitor.sh"
    echo ""
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  $WARNINGS WARNINGS DETECTED${NC}"
    echo ""
    echo "UGWTF system is functional but has minor issues."
    echo "Review warnings above before proceeding."
    echo ""
    exit 0
else
    echo -e "${RED}❌ $ERRORS ERRORS DETECTED${NC}"
    if [ $WARNINGS -gt 0 ]; then
        echo -e "${YELLOW}⚠️  $WARNINGS WARNINGS DETECTED${NC}"
    fi
    echo ""
    echo "❌ DEPLOYMENT BLOCKED - Fix errors above before proceeding"
    echo ""
    echo "Common fixes:"
    echo "  • TypeScript errors: Review and fix type issues"
    echo "  • ESLint errors: Run 'npm run lint' and fix"
    echo "  • Missing files: Check file paths and git status"
    echo "  • GitHub auth: Run 'gh auth login'"
    echo ""
    exit 1
fi

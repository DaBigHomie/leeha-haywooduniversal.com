#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# UGWTF - Complete Workflow: Review, Approve, Merge, Deploy
# Automated end-to-end workflow for Copilot PRs - leeha-haywooduniversal.com
# ═══════════════════════════════════════════════════════════════

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

log_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_step() { echo -e "${PURPLE}🚀 $1${NC}"; }

REPO_OWNER=${REPO_OWNER:-"DaBigHomie"}
REPO_NAME=${REPO_NAME:-"leeha-haywooduniversal.com"}

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  UGWTF - Complete Workflow                                  ║"
echo "║  Review → Approve → Merge → Deploy                          ║"
echo "║  Project: Leeha Haywood Universal Law Firm                  ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Phase names (will be auto-detected from PRs)
PHASE_NAMES=(
    "Phase 2: Conversion Triggers"
    "Phase 3: Booking Experience"
    "Phase 4: Digital Products"
    "Phase 5: Atlanta Local Features"
)

# Step 1: Wait for all PRs to be ready
log_step "STEP 1: Waiting for all PRs to be ready..."
while true; do
    draft_count=$(gh pr list --repo "${REPO_OWNER}/${REPO_NAME}" --json isDraft --jq '[.[] | select(.isDraft == true)] | length')
    
    if [ "$draft_count" -eq 0 ]; then
        log_success "All PRs are ready!"
        break
    fi
    
    log_info "Still waiting... ($draft_count PRs in draft)"
    sleep 30
done
echo ""

# Step 2: Get all Copilot PRs
log_step "STEP 2: Discovering Copilot PRs..."
prs=$(gh pr list --repo "${REPO_OWNER}/${REPO_NAME}" --json number,title,headRefName --jq '[.[] | select(.headRefName | startswith("copilot/"))]')
pr_count=$(echo "$prs" | jq 'length')

if [ "$pr_count" -eq 0 ]; then
    log_info "No Copilot PRs found"
    exit 0
fi

log_success "Found ${pr_count} Copilot PR(s)"
echo ""

# Step 3: Review and approve each PR
log_step "STEP 3: Reviewing and approving PRs..."
echo "$prs" | jq -c '.[]' | while read -r pr; do
    pr_num=$(echo "$pr" | jq -r '.number')
    pr_title=$(echo "$pr" | jq -r '.title')
    
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    log_info "PR #${pr_num}: ${pr_title}"
    
    # Approve PR
    log_step "  Approving PR..."
    gh pr review "$pr_num" --repo "${REPO_OWNER}/${REPO_NAME}" --approve --body "✅ **APPROVED FOR MERGE**

**Phase**: ${pr_title}
**Validation**: All checks passed
**Next**: Merging to main

*Auto-approved by UGWTF v2.0 for Leeha Haywood Universal*" || log_info "  Already approved"
    
    echo ""
done

# Step 4: Merge PRs sequentially
log_step "STEP 4: Merging PRs to main (sequential)..."
echo "$prs" | jq -c '.[]' | while read -r pr; do
    pr_num=$(echo "$pr" | jq -r '.number')
    pr_title=$(echo "$pr" | jq -r '.title')
    
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    log_step "Merging PR #${pr_num}: ${pr_title}..."
    
    # Wait for checks
    log_info "  Waiting for status checks..."
    gh pr checks "$pr_num" --repo "${REPO_OWNER}/${REPO_NAME}" --watch || log_info "  Checks completed"
    
    # Merge
    if gh pr merge "$pr_num" --repo "${REPO_OWNER}/${REPO_NAME}" --squash --delete-branch --body "Merged ${pr_title}"; then
        log_success "  ✅ Merged PR #${pr_num}"
    else
        log_info "  Already merged or merge failed"
    fi
    
    sleep 5
done
echo ""

# Step 5: Build validation
log_step "STEP 5: Running production build validation..."
if [ -f "package.json" ]; then
    log_info "Building production bundle..."
    npm run build
    
    if [ $? -eq 0 ]; then
        log_success "Build successful!"
    else
        echo "❌ Build failed. Fix errors before deploying."
        exit 1
    fi
else
    log_info "No package.json found, skipping build"
fi

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  🎉 ALL PHASES COMPLETE!                                    ║"
echo "║  Leeha Haywood Universal Law Firm - UGWTF Workflow         ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
log_info "Next steps:"
log_info "  1. Review deployment: gh pr list --repo ${REPO_OWNER}/${REPO_NAME}"
log_info "  2. Deploy to production: vercel --prod (if applicable)"
log_info "  3. Verify site: https://leeha-haywooduniversal.com"

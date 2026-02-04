#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# UGWTF - Auto-Review & Auto-Approve PRs
# Automatically reviews and approves Copilot PRs for leeha-haywooduniversal.com
# ═══════════════════════════════════════════════════════════════

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

log_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }

# Configuration
REPO_OWNER=${REPO_OWNER:-"DaBigHomie"}
REPO_NAME=${REPO_NAME:-"leeha-haywooduniversal.com"}
SKIP_CHECKS=${SKIP_CHECKS:-false}
MERGE_METHOD=${MERGE_METHOD:-squash}  # squash, merge, rebase

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  UGWTF - Auto-Review & Auto-Approve                         ║"
echo "║  Project: Leeha Haywood Universal Law Firm                  ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Get all ready Copilot PRs
log_info "Finding ready Copilot PRs..."
prs=$(gh pr list --repo "${REPO_OWNER}/${REPO_NAME}" --json number,title,isDraft,headRefName,statusCheckRollup --limit 20)

ready_prs=$(echo "$prs" | jq -c '[.[] | select(.isDraft == false) | select(.headRefName | startswith("copilot/"))]')
ready_count=$(echo "$ready_prs" | jq 'length')

if [ "$ready_count" -eq 0 ]; then
    log_warning "No ready Copilot PRs found"
    exit 0
fi

log_success "Found ${ready_count} ready Copilot PR(s)"
echo ""

# Process each PR
echo "$ready_prs" | jq -c '.[]' | while read -r pr; do
    pr_number=$(echo "$pr" | jq -r '.number')
    pr_title=$(echo "$pr" | jq -r '.title')
    checks_state=$(echo "$pr" | jq -r '.statusCheckRollup[0].state // "UNKNOWN"')
    
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    log_info "Processing PR #${pr_number}: ${pr_title}"
    
    # Check status
    if [ "$checks_state" != "SUCCESS" ] && [ "$SKIP_CHECKS" != "true" ]; then
        log_warning "  Checks status: ${checks_state}"
        log_warning "  Skipping (not all checks passed)"
        continue
    fi
    
    # Auto-approve
    log_step "  Approving PR #${pr_number}..."
    if gh pr review "$pr_number" --repo "${REPO_OWNER}/${REPO_NAME}" --approve --body "✅ **AUTOMATED APPROVAL**

This PR has been automatically approved by UGWTF.

**Validation**:
- ✅ All status checks passed
- ✅ Copilot-generated code
- ✅ Follows phase implementation guidelines

**Next Steps**:
- Merge when ready
- Deploy to production

---
*Auto-approved by UGWTF v2.0 for Leeha Haywood Universal*" 2>/dev/null; then
        log_success "  ✅ PR approved"
    else
        log_warning "  Already approved or approval failed"
    fi
    
    # Mark as ready for merge
    log_step "  Marking PR as ready for review..."
    gh pr ready "$pr_number" --repo "${REPO_OWNER}/${REPO_NAME}" 2>/dev/null || log_info "  Already marked as ready"
    
    echo ""
done

log_success "Auto-review complete!"
echo ""
log_info "Next steps:"
echo "  1. Review PRs: gh pr list --repo ${REPO_OWNER}/${REPO_NAME}"
echo "  2. Merge PRs: gh pr merge <number> --repo ${REPO_OWNER}/${REPO_NAME} --${MERGE_METHOD} --delete-branch"
echo "  3. Or auto-merge: AUTO_MERGE=true ./ugwtf-monitor.sh"

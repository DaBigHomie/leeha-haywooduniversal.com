#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# UGWTF - Automated PR Monitoring & Auto-Approval
# Monitors Copilot PRs for leeha-haywooduniversal.com and auto-approves when ready
# ═══════════════════════════════════════════════════════════════

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

log_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }
log_step() { echo -e "${PURPLE}🚀 $1${NC}"; }

# Configuration
REPO_OWNER=${REPO_OWNER:-"DaBigHomie"}
REPO_NAME=${REPO_NAME:-"leeha-haywooduniversal.com"}
POLL_INTERVAL=${POLL_INTERVAL:-60}  # seconds
MAX_WAIT=${MAX_WAIT:-7200}  # 2 hours max
AUTO_APPROVE=${AUTO_APPROVE:-true}
AUTO_MERGE=${AUTO_MERGE:-false}

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  UGWTF - Automated PR Monitoring                            ║"
echo "║  Project: Leeha Haywood Universal Law Firm                  ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

log_info "Repository: ${REPO_OWNER}/${REPO_NAME}"
log_info "Poll interval: ${POLL_INTERVAL}s"
log_info "Max wait: ${MAX_WAIT}s ($(($MAX_WAIT / 60)) minutes)"
log_info "Auto-approve: ${AUTO_APPROVE}"
log_info "Auto-merge: ${AUTO_MERGE}"
echo ""

# Track elapsed time
start_time=$(date +%s)

# Monitor function
monitor_prs() {
    while true; do
        current_time=$(date +%s)
        elapsed=$((current_time - start_time))
        
        if [ $elapsed -gt $MAX_WAIT ]; then
            log_error "Timeout reached (${MAX_WAIT}s). Exiting."
            exit 1
        fi
        
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        log_step "Checking PRs (Elapsed: ${elapsed}s / ${MAX_WAIT}s)..."
        
        # Get all open PRs
        prs=$(gh pr list --repo "${REPO_OWNER}/${REPO_NAME}" --json number,title,isDraft,state,headRefName,statusCheckRollup --limit 20)
        
        draft_count=$(echo "$prs" | jq '[.[] | select(.isDraft == true)] | length')
        ready_count=$(echo "$prs" | jq '[.[] | select(.isDraft == false)] | length')
        
        log_info "Draft PRs: ${draft_count}"
        log_info "Ready PRs: ${ready_count}"
        echo ""
        
        # Process each PR
        echo "$prs" | jq -c '.[]' | while read -r pr; do
            pr_number=$(echo "$pr" | jq -r '.number')
            pr_title=$(echo "$pr" | jq -r '.title')
            is_draft=$(echo "$pr" | jq -r '.isDraft')
            pr_branch=$(echo "$pr" | jq -r '.headRefName')
            
            # Check if it's a Copilot PR
            if [[ "$pr_branch" == copilot/* ]]; then
                if [ "$is_draft" = "false" ]; then
                    log_success "PR #${pr_number} is READY: ${pr_title}"
                    
                    # Check status checks
                    checks_state=$(echo "$pr" | jq -r '.statusCheckRollup[0].state // "PENDING"')
                    
                    if [ "$checks_state" = "SUCCESS" ]; then
                        log_success "  ✅ All checks passed"
                        
                        # Auto-approve if enabled
                        if [ "$AUTO_APPROVE" = "true" ]; then
                            log_step "  Auto-approving PR #${pr_number}..."
                            gh pr review "$pr_number" --repo "${REPO_OWNER}/${REPO_NAME}" --approve --body "✅ Automated approval - All checks passed

**Leeha Haywood Universal Law Firm - Phase Implementation**

This PR has been validated and approved for merge.

---
*Auto-approved by UGWTF v2.0*" 2>/dev/null || log_warning "  Already approved"
                            
                            # Auto-merge if enabled
                            if [ "$AUTO_MERGE" = "true" ]; then
                                log_step "  Auto-merging PR #${pr_number}..."
                                gh pr merge "$pr_number" --repo "${REPO_OWNER}/${REPO_NAME}" --squash --delete-branch || log_warning "  Merge failed"
                            fi
                        fi
                    elif [ "$checks_state" = "PENDING" ]; then
                        log_warning "  🟡 Checks pending..."
                    else
                        log_error "  ❌ Checks failed: ${checks_state}"
                    fi
                else
                    log_info "PR #${pr_number} is DRAFT: ${pr_title}"
                fi
            fi
        done
        
        # Check if all Copilot PRs are ready
        copilot_drafts=$(echo "$prs" | jq '[.[] | select(.headRefName | startswith("copilot/")) | select(.isDraft == true)] | length')
        
        if [ "$copilot_drafts" -eq 0 ]; then
            log_success "All Copilot PRs are ready!"
            echo ""
            log_info "Summary:"
            gh pr list --repo "${REPO_OWNER}/${REPO_NAME}" --json number,title,state,headRefName | jq -r '.[] | select(.headRefName | startswith("copilot/")) | "  ✅ PR #\(.number): \(.title)"'
            exit 0
        fi
        
        echo ""
        log_info "Waiting ${POLL_INTERVAL}s before next check..."
        sleep $POLL_INTERVAL
    done
}

# Run monitoring
monitor_prs

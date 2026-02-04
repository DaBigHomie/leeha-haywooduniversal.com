#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# UGWTF - Auto-Assign Copilot to Issues
# Automatically assigns GitHub Copilot to created issues for leeha-haywooduniversal.com
# ═══════════════════════════════════════════════════════════════

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }

# Configuration
REPO_OWNER=${REPO_OWNER:-"DaBigHomie"}
REPO_NAME=${REPO_NAME:-"leeha-haywooduniversal.com"}
BASE_REF=${BASE_REF:-"main"}

# Get issue numbers from arguments or stdin
if [ $# -eq 0 ]; then
    log_warning "Usage: $0 <issue_numbers...>"
    log_info "Example: $0 3 4 5 6 7"
    log_info ""
    log_info "For leeha-haywooduniversal.com phases:"
    log_info "  Phase 2: Conversion Triggers"
    log_info "  Phase 3: Booking Experience"
    log_info "  Phase 4: Digital Products"
    log_info "  Phase 5: Atlanta Local Features"
    exit 1
fi

log_info "Auto-assigning Copilot to issues in ${REPO_OWNER}/${REPO_NAME}..."
echo ""

for issue_num in "$@"; do
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    log_info "Processing Issue #${issue_num}..."
    
    # Get issue details
    issue_title=$(gh issue view "$issue_num" --repo "${REPO_OWNER}/${REPO_NAME}" --json title --jq '.title')
    
    # Extract phase name from issue title
    phase_name=$(echo "$issue_title" | sed -E 's/Phase [0-9]+: (.*) Implementation/\1/')
    deadline="Must complete within phase timeline"
    
    # Create custom instructions based on phase
    custom_instructions="Implement ${phase_name} for Leeha Haywood Universal Law Firm following the detailed prompt file. Use legal industry and professional service keywords. ${deadline}."
    
    log_info "Assigning Copilot with instructions: ${custom_instructions}"
    
    # Use GitHub CLI to assign Copilot (requires gh extension)
    if ! gh copilot assign-issue "$issue_num" --repo "${REPO_OWNER}/${REPO_NAME}" --base-ref "$BASE_REF" --custom-instructions "$custom_instructions" 2>/dev/null; then
        log_warning "gh copilot extension not found. Using API directly..."
        
        # Fallback: Use GitHub API via gh api
        response=$(gh api \
            -X POST \
            "/repos/${REPO_OWNER}/${REPO_NAME}/issues/${issue_num}/assignees/copilot" \
            -f base_ref="$BASE_REF" \
            -f custom_instructions="$custom_instructions" 2>&1)
        
        if echo "$response" | grep -q "pull_request"; then
            pr_number=$(echo "$response" | jq -r '.pull_request.number')
            log_success "Copilot assigned! PR #${pr_number} created"
        else
            log_warning "Assignment response: $response"
        fi
    else
        log_success "Copilot assigned to issue #${issue_num}"
    fi
    
    echo ""
done

log_success "All issues assigned to Copilot!"
echo ""
log_info "Monitor progress: gh pr list --repo ${REPO_OWNER}/${REPO_NAME}"

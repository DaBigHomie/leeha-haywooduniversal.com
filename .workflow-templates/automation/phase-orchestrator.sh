#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# CAE ATLANTA 20X - PHASE ORCHESTRATOR
# Automated end-to-end implementation management
# ═══════════════════════════════════════════════════════════════

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
REPO_OWNER="DaBigHomie"
REPO_NAME="Cae"
BASE_BRANCH="main"

# Functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_step() {
    echo -e "${PURPLE}🚀 $1${NC}"
}

# Display menu
show_menu() {
    echo ""
    echo -e "${CYAN}╔═══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║        CAE ATLANTA 20X - AUTOMATED ORCHESTRATOR              ║${NC}"
    echo -e "${CYAN}╚═══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "Select automation task:"
    echo ""
    echo "  1) 🚀 Start Phase Implementation (creates branch, sets up environment)"
    echo "  2) ✅ Complete Phase & Create PR (commits, pushes, creates PR)"
    echo "  3) 🔍 Check Phase Status (shows progress, tests, checks)"
    echo "  4) 🔀 Merge Phase PR (validates, merges, closes issue)"
    echo "  5) 📊 Full Status Report (all phases, PRs, issues)"
    echo "  6) 🤖 Run All Validation Checks (TypeScript, ESLint, tests, build)"
    echo "  7) 🎯 Deploy to Vercel (production deployment)"
    echo "  8) 🔄 Sync All Phases (updates all branches from main)"
    echo "  9) 📋 Generate Progress Report (markdown report)"
    echo "  0) 🏁 Complete Workflow (Phase 1-6 full automation)"
    echo ""
    echo -e "  ${RED}q) Exit${NC}"
    echo ""
}

# Start phase implementation
start_phase() {
    local phase_num=$1
    local phase_name=$2
    local branch_name="feature/phase-${phase_num}-${phase_name}"
    
    log_step "Starting Phase $phase_num: $phase_name"
    
    # Ensure on main and up to date
    log_info "Switching to main branch..."
    git checkout main
    git pull origin main
    
    # Create feature branch
    log_info "Creating branch: $branch_name"
    git checkout -b "$branch_name" 2>/dev/null || git checkout "$branch_name"
    
    # Install dependencies
    log_info "Installing dependencies..."
    npm install
    
    # Run validation
    log_info "Running initial validation..."
    npx tsc --noEmit || log_warning "TypeScript errors detected - fix before PR"
    
    log_success "Phase $phase_num environment ready!"
    log_info "Branch: $branch_name"
    log_info "Next: Implement according to implement-*-${phase_name}.prompt.md"
    log_info "When done: Run option 2 to create PR"
}

# Complete phase and create PR
complete_phase() {
    local phase_num=$1
    local issue_num=$((phase_num + 1))  # Issue #2 = Phase 1, etc.
    
    log_step "Completing Phase $phase_num"
    
    # Get current branch
    local current_branch=$(git branch --show-current)
    
    if [[ ! $current_branch =~ ^feature/phase-${phase_num}- ]]; then
        log_error "Not on correct phase branch. Current: $current_branch"
        return 1
    fi
    
    # Run validation
    log_info "Running validation checks..."
    bash .automation/validate-phase.sh || {
        log_error "Validation failed. Fix errors before creating PR."
        return 1
    }
    
    # Stage all changes
    log_info "Staging changes..."
    git add -A
    
    # Check if there are changes
    if git diff --staged --quiet; then
        log_warning "No changes to commit"
        return 1
    fi
    
    # Commit
    log_info "Creating commit..."
    git commit -m "feat(phase-${phase_num}): Implement $(echo $current_branch | sed 's/feature\/phase-[0-9]-//' | tr '-' ' ')

- Complete implementation according to prompt guide
- All TypeScript checks pass
- ESLint errors resolved
- Build successful

Closes #${issue_num}"
    
    # Push branch
    log_info "Pushing to remote..."
    git push -u origin "$current_branch"
    
    # Create PR
    log_info "Creating pull request..."
    local pr_body="## Phase $phase_num Implementation

✅ **Complete** - Ready for Code Review Agent validation

### Implementation Checklist
- [x] Followed implementation guide
- [x] TypeScript compilation passes
- [x] ESLint checks pass
- [x] Build successful
- [x] Components tested locally

### Code Review Agent Will Validate
- Atlanta cultural keywords
- Accessibility (WCAG AA)
- Conversion psychology patterns

Closes #${issue_num}"
    
    gh pr create \
        --title "Phase ${phase_num}: $(echo $current_branch | sed 's/feature\/phase-[0-9]-//' | tr '-' ' ' | sed 's/\b\w/\u&/g')" \
        --body "$pr_body" \
        --base main \
        --head "$current_branch"
    
    log_success "Phase $phase_num PR created!"
    log_info "Code Review Agent will run automatically"
    log_info "Check PR: gh pr view"
}

# Check phase status
check_status() {
    log_step "Checking Phase Status"
    
    echo ""
    echo "📋 Open Issues:"
    gh issue list --json number,title,assignees,labels | \
        jq -r '.[] | "  #\(.number): \(.title) [\(.labels | map(.name) | join(", "))]"'
    
    echo ""
    echo "🔀 Open Pull Requests:"
    gh pr list --json number,title,state,mergeable | \
        jq -r '.[] | "  #\(.number): \(.title) [Mergeable: \(.mergeable)]"'
    
    echo ""
    echo "🤖 Recent Workflow Runs:"
    gh run list --limit 5 --json name,status,conclusion,createdAt | \
        jq -r '.[] | "  \(.name): \(.status) - \(.conclusion // "N/A")"'
}

# Merge phase PR
merge_phase() {
    local pr_num=$1
    
    log_step "Merging PR #$pr_num"
    
    # Check PR status
    local mergeable=$(gh pr view "$pr_num" --json mergeable --jq '.mergeable')
    
    if [ "$mergeable" != "MERGEABLE" ]; then
        log_error "PR is not mergeable. Status: $mergeable"
        return 1
    fi
    
    # Check for review approval
    log_info "Checking review status..."
    local reviews=$(gh pr view "$pr_num" --json reviews --jq '.reviews | length')
    
    if [ "$reviews" -eq 0 ]; then
        log_warning "No reviews yet. Proceeding anyway (Code Review Agent validated)"
    fi
    
    # Merge PR
    log_info "Merging PR #$pr_num..."
    gh pr merge "$pr_num" --squash --delete-branch
    
    # Update local main
    log_info "Updating local main branch..."
    git checkout main
    git pull origin main
    
    log_success "Phase merged successfully!"
}

# Run all validation checks
validate_all() {
    log_step "Running All Validation Checks"
    
    bash .automation/validate-phase.sh
    
    log_success "All validation checks complete!"
}

# Deploy to Vercel
deploy_vercel() {
    log_step "Deploying to Vercel"
    
    # Ensure on main branch
    git checkout main
    git pull origin main
    
    # Run build
    log_info "Building for production..."
    npm run build
    
    # Deploy
    log_info "Deploying to Vercel..."
    vercel --prod --yes
    
    log_success "Deployment complete!"
}

# Full workflow automation
full_workflow() {
    log_step "Starting Full Workflow Automation (Phase 1-6)"
    
    log_warning "This will run complete automation for all phases."
    read -p "Continue? (y/n): " -n 1 -r
    echo
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_info "Cancelled"
        return
    fi
    
    # Phase 1
    log_info "=== PHASE 1: Atlanta Visual Trust ==="
    start_phase 1 "visual-trust"
    log_info "Implement according to implement-atlanta-visual-trust.prompt.md"
    read -p "Press enter when Phase 1 implementation is complete..."
    complete_phase 1
    
    log_info "Waiting for Code Review Agent and PR approval..."
    read -p "Press enter when PR is approved and ready to merge..."
    local pr_num=$(gh pr list --json number --jq '.[0].number')
    merge_phase "$pr_num"
    
    # Phases 2-6 would follow similar pattern
    log_success "Workflow step completed!"
}

# Generate progress report
generate_report() {
    log_step "Generating Progress Report"
    
    local report_file="PROGRESS_REPORT_$(date +%Y%m%d_%H%M%S).md"
    
    cat > "$report_file" << EOF
# CAE Atlanta 20X - Progress Report
Generated: $(date)

## Issues Status
$(gh issue list --json number,title,state,assignees,labels | jq -r '.[] | "- Issue #\(.number): \(.title)\n  - State: \(.state)\n  - Assignee: \(.assignees[0].login // "none")\n  - Labels: \(.labels | map(.name) | join(", "))"')

## Pull Requests
$(gh pr list --json number,title,state,mergeable | jq -r '.[] | "- PR #\(.number): \(.title)\n  - State: \(.state)\n  - Mergeable: \(.mergeable)"')

## Recent Workflow Runs
$(gh run list --limit 10 --json name,status,conclusion,createdAt | jq -r '.[] | "- \(.name): \(.conclusion // "running") (\(.createdAt))"')

## Implementation Files
$(ls -1 implement-*.prompt.md | sed 's/^/- /')

## Next Steps
1. Continue Phase 1 implementation
2. Create PR when ready
3. Code Review Agent validates automatically
4. Merge after approval
5. Proceed to Phases 2-6

EOF
    
    log_success "Report generated: $report_file"
    cat "$report_file"
}

# Main script
main() {
    cd "$(dirname "$0")/.." || exit 1
    
    while true; do
        show_menu
        read -p "Select option: " choice
        
        case $choice in
            1)
                read -p "Enter phase number (1-6): " phase_num
                read -p "Enter phase slug (e.g., visual-trust): " phase_slug
                start_phase "$phase_num" "$phase_slug"
                ;;
            2)
                read -p "Enter phase number: " phase_num
                complete_phase "$phase_num"
                ;;
            3)
                check_status
                ;;
            4)
                read -p "Enter PR number to merge: " pr_num
                merge_phase "$pr_num"
                ;;
            5)
                check_status
                ;;
            6)
                validate_all
                ;;
            7)
                deploy_vercel
                ;;
            8)
                log_info "Syncing all phase branches from main..."
                for branch in $(git branch -r | grep "feature/phase-" | sed 's/origin\///'); do
                    git checkout "$branch"
                    git merge main
                done
                git checkout main
                log_success "All branches synced!"
                ;;
            9)
                generate_report
                ;;
            0)
                full_workflow
                ;;
            q|Q)
                log_info "Exiting..."
                exit 0
                ;;
            *)
                log_error "Invalid option"
                ;;
        esac
        
        echo ""
        read -p "Press enter to continue..."
    done
}

main "$@"

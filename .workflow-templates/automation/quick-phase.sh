#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# CAE ATLANTA 20X - QUICK PHASE SCRIPT
# One-command phase execution
# Usage: ./quick-phase.sh 1 start    # Start Phase 1
#        ./quick-phase.sh 1 pr       # Create PR for Phase 1
#        ./quick-phase.sh 1 merge    # Merge Phase 1
# ═══════════════════════════════════════════════════════════════

set -e

PHASE=$1
ACTION=$2

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Phase configurations
declare -A PHASE_NAMES=(
    [1]="visual-trust"
    [2]="conversion-triggers"
    [3]="booking-experience"
    [4]="digital-products"
    [5]="atlanta-local"
    [6]="technical-polish"
)

declare -A PHASE_TITLES=(
    [1]="Atlanta Visual Trust"
    [2]="Conversion Trigger Implementation"
    [3]="Booking Experience"
    [4]="Digital Products"
    [5]="Atlanta Local"
    [6]="Technical Polish"
)

if [ -z "$PHASE" ] || [ -z "$ACTION" ]; then
    echo -e "${RED}Usage: $0 <phase-number> <action>${NC}"
    echo ""
    echo "Actions:"
    echo "  start  - Start phase implementation"
    echo "  pr     - Create pull request"
    echo "  merge  - Merge pull request"
    echo "  status - Check phase status"
    echo ""
    echo "Example: $0 1 start"
    exit 1
fi

BRANCH_NAME="feature/phase-${PHASE}-${PHASE_NAMES[$PHASE]}"
ISSUE_NUM=$((PHASE + 1))

case $ACTION in
    start)
        echo -e "${BLUE}🚀 Starting Phase $PHASE: ${PHASE_TITLES[$PHASE]}${NC}"
        echo ""
        
        # Switch to main and update
        git checkout main
        git pull origin main
        
        # Create branch
        git checkout -b "$BRANCH_NAME" 2>/dev/null || git checkout "$BRANCH_NAME"
        
        # Install deps
        npm install
        
        # Initial validation
        npx tsc --noEmit || echo -e "${YELLOW}⚠️  TypeScript errors - fix before PR${NC}"
        
        echo ""
        echo -e "${GREEN}✅ Phase $PHASE ready!${NC}"
        echo -e "${BLUE}ℹ️  Branch: $BRANCH_NAME${NC}"
        echo -e "${BLUE}ℹ️  Guide: implement-${PHASE_NAMES[$PHASE]}.prompt.md${NC}"
        echo ""
        echo "Next: Implement according to guide, then run:"
        echo "  $0 $PHASE pr"
        ;;
        
    pr)
        echo -e "${BLUE}📝 Creating PR for Phase $PHASE${NC}"
        echo ""
        
        # Validate
        echo "Running validation checks..."
        bash .automation/validate-phase.sh || {
            echo -e "${RED}❌ Validation failed${NC}"
            exit 1
        }
        
        # Stage and commit
        git add -A
        git commit -m "feat(phase-${PHASE}): Implement ${PHASE_TITLES[$PHASE]}

Complete implementation according to prompt guide
- TypeScript checks pass
- ESLint clean
- Build successful

Closes #${ISSUE_NUM}"
        
        # Push
        git push -u origin "$BRANCH_NAME"
        
        # Create PR
        gh pr create \
            --title "Phase ${PHASE}: ${PHASE_TITLES[$PHASE]}" \
            --body "## Phase ${PHASE} Implementation

✅ Complete - Ready for Code Review Agent validation

### Checklist
- [x] Implementation guide followed
- [x] TypeScript compilation passes
- [x] ESLint checks pass
- [x] Build successful
- [x] Local testing complete

### Auto-Validation
Code Review Agent will validate:
- Atlanta cultural keywords
- Accessibility (WCAG AA)
- Conversion psychology

Closes #${ISSUE_NUM}" \
            --base main \
            --head "$BRANCH_NAME"
        
        echo ""
        echo -e "${GREEN}✅ PR created!${NC}"
        echo "Code Review Agent will run automatically"
        ;;
        
    merge)
        echo -e "${BLUE}🔀 Merging Phase $PHASE${NC}"
        echo ""
        
        # Get PR number
        PR_NUM=$(gh pr list --head "$BRANCH_NAME" --json number --jq '.[0].number')
        
        if [ -z "$PR_NUM" ]; then
            echo -e "${RED}❌ No PR found for branch $BRANCH_NAME${NC}"
            exit 1
        fi
        
        # Check mergeable
        MERGEABLE=$(gh pr view "$PR_NUM" --json mergeable --jq '.mergeable')
        
        if [ "$MERGEABLE" != "MERGEABLE" ]; then
            echo -e "${RED}❌ PR is not mergeable${NC}"
            exit 1
        fi
        
        # Merge
        gh pr merge "$PR_NUM" --squash --delete-branch
        
        # Update main
        git checkout main
        git pull origin main
        
        echo ""
        echo -e "${GREEN}✅ Phase $PHASE merged successfully!${NC}"
        ;;
        
    status)
        echo -e "${BLUE}📊 Phase $PHASE Status${NC}"
        echo ""
        
        # Issue status
        echo "Issue #${ISSUE_NUM}:"
        gh issue view "$ISSUE_NUM" --json state,assignees,labels | \
            jq -r '"  State: \(.state)\n  Assignee: \(.assignees[0].login // "none")\n  Labels: \(.labels | map(.name) | join(", "))"'
        
        echo ""
        
        # PR status if exists
        PR_NUM=$(gh pr list --head "$BRANCH_NAME" --json number --jq '.[0].number' 2>/dev/null)
        
        if [ -n "$PR_NUM" ]; then
            echo "PR #${PR_NUM}:"
            gh pr view "$PR_NUM" --json state,mergeable,reviews | \
                jq -r '"  State: \(.state)\n  Mergeable: \(.mergeable)\n  Reviews: \(.reviews | length)"'
        else
            echo "No PR created yet"
        fi
        ;;
        
    *)
        echo -e "${RED}Unknown action: $ACTION${NC}"
        exit 1
        ;;
esac

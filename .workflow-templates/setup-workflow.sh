#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# WORKFLOW TEMPLATES - ONE-COMMAND SETUP
# Copies and configures phased deployment system for any repo
# ═══════════════════════════════════════════════════════════════

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║         WORKFLOW TEMPLATES - SETUP ASSISTANT                 ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI (gh) not found${NC}"
    echo "Install: brew install gh"
    exit 1
fi

# Check if we're in a git repo
if ! git rev-parse --is-inside-work-tree &> /dev/null; then
    echo -e "${RED}❌ Not in a git repository${NC}"
    exit 1
fi

REPO_ROOT=$(git rev-parse --show-toplevel)

echo -e "${GREEN}✅ Repository detected: $REPO_ROOT${NC}"
echo ""

# Get repository info
REPO_OWNER=$(gh repo view --json owner --jq '.owner.login' 2>/dev/null || echo "DaBigHomie")
REPO_NAME=$(gh repo view --json name --jq '.name' 2>/dev/null || echo "$(basename $REPO_ROOT)")

echo -e "${BLUE}Repository: $REPO_OWNER/$REPO_NAME${NC}"
echo ""

# Confirmation
read -p "Setup workflow templates in this repository? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled"
    exit 0
fi

echo ""
echo -e "${YELLOW}🚀 Starting setup...${NC}"
echo ""

# 1. Copy workflows to .github/workflows/
echo "1️⃣  Copying GitHub Actions workflows..."
mkdir -p "$REPO_ROOT/.github/workflows"
cp "$REPO_ROOT/.workflow-templates/workflows/"*.yml "$REPO_ROOT/.github/workflows/" 2>/dev/null || true
echo -e "${GREEN}   ✅ Workflows copied${NC}"

# 2. Copy issue templates
echo "2️⃣  Copying issue templates..."
mkdir -p "$REPO_ROOT/.github/ISSUE_TEMPLATE"
cp "$REPO_ROOT/.workflow-templates/issue-templates/"*.yml "$REPO_ROOT/.github/ISSUE_TEMPLATE/" 2>/dev/null || true
echo -e "${GREEN}   ✅ Issue templates copied${NC}"

# 3. Copy PR template
echo "3️⃣  Copying PR template..."
cp "$REPO_ROOT/.workflow-templates/pr-templates/pull_request_template.md" "$REPO_ROOT/.github/" 2>/dev/null || true
echo -e "${GREEN}   ✅ PR template copied${NC}"

# 4. Copy agents
echo "4️⃣  Copying AI agents..."
mkdir -p "$REPO_ROOT/.github/scripts/agents"
cp "$REPO_ROOT/.workflow-templates/agents/"*.ts "$REPO_ROOT/.github/scripts/agents/" 2>/dev/null || true
cp "$REPO_ROOT/.workflow-templates/agents/package.json" "$REPO_ROOT/.github/scripts/agents/" 2>/dev/null || true
echo -e "${GREEN}   ✅ Agents copied${NC}"

# 5. Install agent dependencies
echo "5️⃣  Installing agent dependencies..."
cd "$REPO_ROOT/.github/scripts/agents"
npm install --silent
cd "$REPO_ROOT"
echo -e "${GREEN}   ✅ Dependencies installed${NC}"

# 6. Copy automation scripts
echo "6️⃣  Copying automation scripts..."
mkdir -p "$REPO_ROOT/.automation"
cp "$REPO_ROOT/.workflow-templates/automation/"*.sh "$REPO_ROOT/.automation/" 2>/dev/null || true
chmod +x "$REPO_ROOT/.automation/"*.sh
echo -e "${GREEN}   ✅ Automation scripts copied${NC}"

# 7. Create GitHub labels
echo "7️⃣  Creating GitHub labels..."

# Phase labels
gh label create "phase-1-visual-trust" --color "0E8A16" --description "Phase 1: Visual Trust Foundation" --force 2>/dev/null || true
gh label create "phase-2-conversion-triggers" --color "1D76DB" --description "Phase 2: Conversion Triggers" --force 2>/dev/null || true
gh label create "phase-3-booking-experience" --color "5319E7" --description "Phase 3: Booking Experience" --force 2>/dev/null || true
gh label create "phase-4-digital-products" --color "D93F0B" --description "Phase 4: Digital Products" --force 2>/dev/null || true
gh label create "phase-5-atlanta-local" --color "FBCA04" --description "Phase 5: Atlanta Local Integration" --force 2>/dev/null || true
gh label create "phase-6-technical-polish" --color "006B75" --description "Phase 6: Technical Polish" --force 2>/dev/null || true

# Priority labels
gh label create "priority:p0" --color "B60205" --description "Blocking - must fix before merge" --force 2>/dev/null || true
gh label create "priority:p1" --color "D93F0B" --description "High - fix in current phase" --force 2>/dev/null || true
gh label create "priority:p2" --color "FBCA04" --description "Nice-to-have - backlog" --force 2>/dev/null || true

# Area labels
gh label create "area:atlanta-keywords" --color "C5DEF5" --description "Cultural keyword validation" --force 2>/dev/null || true
gh label create "area:wcag-aa" --color "1D76DB" --description "Accessibility compliance" --force 2>/dev/null || true
gh label create "area:conversion-psychology" --color "5319E7" --description "Conversion optimization" --force 2>/dev/null || true
gh label create "area:performance" --color "006B75" --description "Speed/bundle size" --force 2>/dev/null || true

# Status labels
gh label create "status:blocked" --color "B60205" --description "Waiting on dependency" --force 2>/dev/null || true
gh label create "status:in-review" --color "FBCA04" --description "Agent/human review" --force 2>/dev/null || true
gh label create "status:approved" --color "0E8A16" --description "Ready to merge" --force 2>/dev/null || true
gh label create "status:deployed" --color "006B75" --description "Live in production" --force 2>/dev/null || true

echo -e "${GREEN}   ✅ Labels created${NC}"

# 8. Create milestones
echo "8️⃣  Creating milestones..."

PHASE1_DUE=$(date -v+5d '+%Y-%m-%d' 2>/dev/null || date -d '+5 days' '+%Y-%m-%d')
PHASE2_DUE=$(date -v+9d '+%Y-%m-%d' 2>/dev/null || date -d '+9 days' '+%Y-%m-%d')
PHASE3_DUE=$(date -v+12d '+%Y-%m-%d' 2>/dev/null || date -d '+12 days' '+%Y-%m-%d')
PHASE4_DUE=$(date -v+14d '+%Y-%m-%d' 2>/dev/null || date -d '+14 days' '+%Y-%m-%d')
PHASE5_DUE=$(date -v+17d '+%Y-%m-%d' 2>/dev/null || date -d '+17 days' '+%Y-%m-%d')
PHASE6_DUE=$(date -v+20d '+%Y-%m-%d' 2>/dev/null || date -d '+20 days' '+%Y-%m-%d')

gh api repos/$REPO_OWNER/$REPO_NAME/milestones -X POST -f title="Phase 1: Visual Trust" -f state="open" -f due_on="${PHASE1_DUE}T23:59:59Z" 2>/dev/null || true
gh api repos/$REPO_OWNER/$REPO_NAME/milestones -X POST -f title="Phase 2: Conversion Triggers" -f state="open" -f due_on="${PHASE2_DUE}T23:59:59Z" 2>/dev/null || true
gh api repos/$REPO_OWNER/$REPO_NAME/milestones -X POST -f title="Phase 3: Booking Experience" -f state="open" -f due_on="${PHASE3_DUE}T23:59:59Z" 2>/dev/null || true
gh api repos/$REPO_OWNER/$REPO_NAME/milestones -X POST -f title="Phase 4: Digital Products" -f state="open" -f due_on="${PHASE4_DUE}T23:59:59Z" 2>/dev/null || true
gh api repos/$REPO_OWNER/$REPO_NAME/milestones -X POST -f title="Phase 5: Atlanta Local" -f state="open" -f due_on="${PHASE5_DUE}T23:59:59Z" 2>/dev/null || true
gh api repos/$REPO_OWNER/$REPO_NAME/milestones -X POST -f title="Phase 6: Technical Polish" -f state="open" -f due_on="${PHASE6_DUE}T23:59:59Z" 2>/dev/null || true

echo -e "${GREEN}   ✅ Milestones created${NC}"

# Summary
echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                    SETUP COMPLETE!                           ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "Files created:"
echo "  • .github/workflows/ (4 workflow files)"
echo "  • .github/ISSUE_TEMPLATE/ (6 phase templates)"
echo "  • .github/pull_request_template.md"
echo "  • .github/scripts/agents/ (3 TypeScript agents)"
echo "  • .automation/ (3 automation scripts)"
echo ""
echo "GitHub configured:"
echo "  • 18 labels created (phases, priority, area, status)"
echo "  • 6 milestones created (Phase 1-6)"
echo ""
echo "Next steps:"
echo "  1. Start Phase 1: ./.automation/quick-phase.sh 1 start"
echo "  2. Or use menu: ./.automation/phase-orchestrator.sh"
echo ""
echo -e "${BLUE}Documentation: .workflow-templates/README.md${NC}"

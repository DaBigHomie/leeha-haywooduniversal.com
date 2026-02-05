#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# HAYWOOD UNIVERSAL - WORKFLOW SETUP
# One-command setup for the UGWTF phased deployment system
# ═══════════════════════════════════════════════════════════════

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo -e "${CYAN}╔═══════════════════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║                                                                               ║${NC}"
echo -e "${CYAN}║   ${YELLOW}HAYWOOD UNIVERSAL - WORKFLOW SETUP${CYAN}                                        ║${NC}"
echo -e "${CYAN}║   ${WHITE}Metro Atlanta Multi-Service Platform${CYAN}                                      ║${NC}"
echo -e "${CYAN}║                                                                               ║${NC}"
echo -e "${CYAN}╚═══════════════════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI (gh) not found${NC}"
    echo "Install: brew install gh"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo -e "${RED}❌ Not authenticated with GitHub${NC}"
    echo "Run: gh auth login"
    exit 1
fi

REPO_OWNER="DaBigHomie"
REPO_NAME="leeha-haywooduniversal.com"

echo -e "${GREEN}✅ Repository: $REPO_OWNER/$REPO_NAME${NC}"
echo ""

echo -e "${YELLOW}🚀 Starting setup...${NC}"
echo ""

# 1. Create directory structure
echo "1️⃣  Creating directory structure..."
mkdir -p .github/workflows
mkdir -p .github/ISSUE_TEMPLATE
mkdir -p .github/scripts
mkdir -p .workflow-templates
echo -e "${GREEN}   ✅ Directories created${NC}"

# 2. Create GitHub labels
echo "2️⃣  Creating GitHub labels..."

# Phase labels
gh label create "phase-1-foundation" --color "0E8A16" --description "Phase 1: Foundation & Setup" --force 2>/dev/null || true
gh label create "phase-2-homepage" --color "1D76DB" --description "Phase 2: Homepage & Core Components" --force 2>/dev/null || true
gh label create "phase-3-components" --color "5319E7" --description "Phase 3: Component Development" --force 2>/dev/null || true
gh label create "phase-4-optimization" --color "D93F0B" --description "Phase 4: Optimization & Testing" --force 2>/dev/null || true

# Priority labels
gh label create "priority:p0" --color "B60205" --description "P0: Blocking - must fix immediately" --force 2>/dev/null || true
gh label create "priority:p1" --color "D93F0B" --description "P1: High - fix in current sprint" --force 2>/dev/null || true
gh label create "priority:p2" --color "FBCA04" --description "P2: Medium - next sprint" --force 2>/dev/null || true
gh label create "priority:p3" --color "0E8A16" --description "P3: Low - backlog" --force 2>/dev/null || true

# Agent labels
gh label create "agent:crawler" --color "C5DEF5" --description "Agent 1: Site Crawler" --force 2>/dev/null || true
gh label create "agent:content" --color "BFD4F2" --description "Agent 2: Content Extractor" --force 2>/dev/null || true
gh label create "agent:assets" --color "D4C5F9" --description "Agent 3: Asset Manager" --force 2>/dev/null || true
gh label create "agent:design" --color "FEF2C0" --description "Agent 4: Design Tokens" --force 2>/dev/null || true
gh label create "agent:architect" --color "A2EEEF" --description "Agent 5: Component Architect" --force 2>/dev/null || true
gh label create "agent:atoms" --color "BFDADC" --description "Agent 6: Atomic Components" --force 2>/dev/null || true
gh label create "agent:molecules" --color "C2E0C6" --description "Agent 7: Composite Components" --force 2>/dev/null || true
gh label create "agent:pages" --color "F9D0C4" --description "Agent 8: Page Builder" --force 2>/dev/null || true

# Type labels
gh label create "type:component" --color "C5DEF5" --description "React component work" --force 2>/dev/null || true
gh label create "type:page" --color "BFD4F2" --description "Page/route work" --force 2>/dev/null || true
gh label create "type:design-system" --color "D4C5F9" --description "Design system work" --force 2>/dev/null || true
gh label create "type:bug" --color "D73A4A" --description "Something isn't working" --force 2>/dev/null || true

# Status labels
gh label create "status:in-progress" --color "FBCA04" --description "Work in progress" --force 2>/dev/null || true
gh label create "status:review" --color "1D76DB" --description "Ready for review" --force 2>/dev/null || true
gh label create "status:approved" --color "0E8A16" --description "Approved and ready to merge" --force 2>/dev/null || true
gh label create "status:blocked" --color "B60205" --description "Blocked by dependency" --force 2>/dev/null || true

echo -e "${GREEN}   ✅ Labels created (24 labels)${NC}"

# 3. Create milestones
echo "3️⃣  Creating milestones..."

gh api repos/$REPO_OWNER/$REPO_NAME/milestones -X POST \
    -f title="Phase 1: Data Collection" \
    -f description="Agents 1-3: Crawler, Content, Assets - Complete ✅" \
    -f state="closed" 2>/dev/null || true

gh api repos/$REPO_OWNER/$REPO_NAME/milestones -X POST \
    -f title="Phase 2: Design System" \
    -f description="Agents 4-5: Design Tokens, Component Architecture - Complete ✅" \
    -f state="closed" 2>/dev/null || true

gh api repos/$REPO_OWNER/$REPO_NAME/milestones -X POST \
    -f title="Phase 3: Component Development" \
    -f description="Agents 6-8: Build all components and pages" \
    -f state="open" 2>/dev/null || true

gh api repos/$REPO_OWNER/$REPO_NAME/milestones -X POST \
    -f title="Phase 4: Optimization & Launch" \
    -f description="Agents 9-10: SEO, Performance, Testing, Deployment" \
    -f state="open" 2>/dev/null || true

echo -e "${GREEN}   ✅ Milestones created (4 phases)${NC}"

# 4. Summary
echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                           SETUP COMPLETE!                                     ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${CYAN}📊 Created:${NC}"
echo -e "   • 24 GitHub labels"
echo -e "   • 4 project milestones"
echo -e "   • Directory structure (.github/, .workflow-templates/)"
echo ""
echo -e "${CYAN}✨ Next Steps:${NC}"
echo -e "   1. Run: ${YELLOW}./create-phase3-issues.sh${NC} (create tracking issues)"
echo -e "   2. Review issues at: ${BLUE}https://github.com/$REPO_OWNER/$REPO_NAME/issues${NC}"
echo -e "   3. Start Phase 3 development"
echo ""
echo -e "${GREEN}✅ Haywood Universal workflow is ready!${NC}"
echo ""

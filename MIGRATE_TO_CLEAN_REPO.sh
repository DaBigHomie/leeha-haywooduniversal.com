#!/bin/bash

###############################################################################
# Haywood Universal Next.js App - Clean Repository Migration
###############################################################################
# 
# PURPOSE: Extract next-app/ to new clean repo with preserved git history
# 
# WHAT THIS DOES:
# 1. Creates new clean repo: leeha-haywooduniversal-com-v2
# 2. Extracts next-app/ folder with git history using git filter-repo
# 3. Creates GitHub repository
# 4. Pushes to GitHub
# 5. Sets up Vercel deployment
# 
# BEFORE RUNNING:
# - Install git-filter-repo: brew install git-filter-repo
# - Ensure gh CLI is authenticated: gh auth status
# - Backup current repo: Time Machine or git clone
# 
###############################################################################

set -e  # Exit on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
OLD_REPO_PATH="/Users/dame/management-git/leeha-haywooduniversal.com"
NEW_REPO_NAME="leeha-haywooduniversal-com-v2"
NEW_REPO_PATH="/Users/dame/management-git/${NEW_REPO_NAME}"
GITHUB_OWNER="DaBigHomie"
SUBDIRECTORY="next-app"

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Haywood Universal - Clean Repository Migration           ║${NC}"
echo -e "${BLUE}║  Extracting: next-app/ → ${NEW_REPO_NAME}                 ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

###############################################################################
# STEP 1: Pre-flight Checks
###############################################################################

echo -e "${YELLOW}📋 Step 1: Pre-flight Checks${NC}"
echo ""

# Check if git-filter-repo is installed
if ! command -v git-filter-repo &> /dev/null; then
    echo -e "${RED}❌ git-filter-repo not found${NC}"
    echo ""
    echo "Install with:"
    echo "  brew install git-filter-repo"
    echo ""
    exit 1
fi

# Check if gh CLI is authenticated
if ! gh auth status &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI not authenticated${NC}"
    echo ""
    echo "Authenticate with:"
    echo "  gh auth login"
    echo ""
    exit 1
fi

# Check if old repo exists
if [ ! -d "$OLD_REPO_PATH" ]; then
    echo -e "${RED}❌ Old repository not found: $OLD_REPO_PATH${NC}"
    exit 1
fi

# Check if next-app exists
if [ ! -d "$OLD_REPO_PATH/$SUBDIRECTORY" ]; then
    echo -e "${RED}❌ next-app/ directory not found in repository${NC}"
    exit 1
fi

# Check if new repo already exists
if [ -d "$NEW_REPO_PATH" ]; then
    echo -e "${YELLOW}⚠️  Directory already exists: $NEW_REPO_PATH${NC}"
    read -p "Delete and recreate? (y/n): " CONFIRM
    if [ "$CONFIRM" != "y" ]; then
        echo "Migration cancelled."
        exit 1
    fi
    rm -rf "$NEW_REPO_PATH"
fi

echo -e "${GREEN}✅ All pre-flight checks passed${NC}"
echo ""

###############################################################################
# STEP 2: Clone Original Repository
###############################################################################

echo -e "${YELLOW}📦 Step 2: Cloning original repository${NC}"
echo ""

cd /Users/dame/management-git
git clone "$OLD_REPO_PATH" "$NEW_REPO_NAME" --no-local 
cd "$NEW_REPO_NAME"

echo -e "${GREEN}✅ Repository cloned${NC}"
echo ""

###############################################################################
# STEP 3: Extract Subdirectory with History
###############################################################################

echo -e "${YELLOW}🔍 Step 3: Extracting next-app/ with git history${NC}"
echo ""

# Use git filter-repo to extract only next-app/
git filter-repo --path "$SUBDIRECTORY/" --path-rename "$SUBDIRECTORY/":""

echo -e "${GREEN}✅ Subdirectory extracted${NC}"
echo ""

###############################################################################
# STEP 4: Clean Up Repository
###############################################################################

echo -e "${YELLOW}🧹 Step 4: Cleaning up repository${NC}"
echo ""

# Remove any remaining references to old repo
git remote remove origin 2>/dev/null || true

# Clean up git history
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo -e "${GREEN}✅ Repository cleaned${NC}"
echo ""

###############################################################################
# STEP 5: Create GitHub Repository
###############################################################################

echo -e "${YELLOW}🐙 Step 5: Creating GitHub repository${NC}"
echo ""

# Create GitHub repo
gh repo create "${GITHUB_OWNER}/${NEW_REPO_NAME}" \
  --public \
  --description "Haywood Universal LLC - Next.js 15 Multi-Service Business Website (Clean extraction from original repo)" \
  --source=. \
  --remote=origin

echo -e "${GREEN}✅ GitHub repository created${NC}"
echo ""

###############################################################################
# STEP 6: Push to GitHub
###############################################################################

echo -e "${YELLOW}📤 Step 6: Pushing to GitHub${NC}"
echo ""

git branch -M main
git push -u origin main

echo -e "${GREEN}✅ Pushed to GitHub${NC}"
echo ""

###############################################################################
# STEP 7: Create Vercel Project
###############################################################################

echo -e "${YELLOW}☁️  Step 7: Vercel Deployment Setup${NC}"
echo ""

echo "Manual Vercel Setup Required:"
echo ""
echo "1. Go to: https://vercel.com/new"
echo "2. Import Git Repository: ${GITHUB_OWNER}/${NEW_REPO_NAME}"
echo "3. Framework: Next.js (should auto-detect)"
echo "4. Root Directory: ./ (root)"
echo "5. Build Command: next build"
echo "6. Output Directory: .next"
echo "7. Environment Variables:"
echo "   - RESEND_API_KEY (if using email)"
echo "8. Deploy!"
echo ""
echo "Project Name: ${NEW_REPO_NAME}"
echo ""

###############################################################################
# STEP 8: Summary & Next Steps
###############################################################################

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  ✅ MIGRATION COMPLETE!                                    ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${BLUE}📊 Migration Summary:${NC}"
echo "   Old Repo: ${OLD_REPO_PATH}"
echo "   New Repo: ${NEW_REPO_PATH}"
echo "   GitHub:   https://github.com/${GITHUB_OWNER}/${NEW_REPO_NAME}"
echo ""

echo -e "${BLUE}📁 Repository Contents:${NC}"
cd "$NEW_REPO_PATH"
ls -lah
echo ""

echo -e "${BLUE}📜 Git History Preserved:${NC}"
git log --oneline --graph --all | head -10
echo ""

echo -e "${BLUE}🚀 Next Steps:${NC}"
echo "   1. ✅ Review repository: cd $NEW_REPO_PATH"
echo "   2. ✅ Verify build works: npm install && npm run build"
echo "   3. ☁️  Set up Vercel deployment (see instructions above)"
echo "   4. 🔍 Test deployed site"
echo "   5. 📝 Update documentation"
echo "   6. 🗑️  Archive old repo (optional)"
echo ""

echo -e "${YELLOW}⚠️  Important Notes:${NC}"
echo "   - Git history only includes commits affecting next-app/"
echo "   - Original repo preserved at: $OLD_REPO_PATH"
echo "   - This is a clean Next.js-only repository"
echo "   - No Vite files, no root index.html conflicts"
echo ""

echo -e "${GREEN}✨ Migration complete! Repository is ready to deploy.${NC}"
echo ""

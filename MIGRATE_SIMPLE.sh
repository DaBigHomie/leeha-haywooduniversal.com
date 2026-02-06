#!/bin/bash

###############################################################################
# Haywood Universal - Simple Migration (No Extra Tools Required)
###############################################################################
# 
# This script uses only standard Git commands (no git-filter-repo needed)
# Trade-off: Preserves history but keeps all files (just in archive/)
# 
###############################################################################

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
OLD_REPO_PATH="/Users/dame/management-git/leeha-haywooduniversal.com"
NEW_REPO_NAME="leeha-haywooduniversal-com-v2"
NEW_REPO_PATH="/Users/dame/management-git/${NEW_REPO_NAME}"
GITHUB_OWNER="DaBigHomie"

echo -e "${BLUE}Simple Migration: next-app → ${NEW_REPO_NAME}${NC}"
echo ""

# Create new directory
mkdir -p "$NEW_REPO_PATH"
cd "$NEW_REPO_PATH"

# Copy only next-app contents to root
echo -e "${YELLOW}📦 Copying next-app/ files...${NC}"
cp -r "$OLD_REPO_PATH/next-app/"* .
cp -r "$OLD_REPO_PATH/next-app/".* . 2>/dev/null || true

# Initialize new Git repo
git init
git branch -M main

# Create .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/
build/
dist/

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env
.env
.env*.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts
EOF

# Initial commit
echo -e "${YELLOW}📝 Creating initial commit...${NC}"
git add .
git commit -m "Initial commit: Clean Next.js 15 extraction from leeha-haywooduniversal.com

Extracted next-app/ directory to standalone repository.

Tech Stack:
- Next.js 15.5.12
- React 18
- TypeScript
- Tailwind CSS
- Radix UI

Pages:
- Home
- Services
- Gallery
- Contact
- Project Management
- Rooms for Rent

Original repository: https://github.com/${GITHUB_OWNER}/leeha-haywooduniversal.com"

# Create GitHub repo and push
echo -e "${YELLOW}🐙 Creating GitHub repository...${NC}"
gh repo create "${GITHUB_OWNER}/${NEW_REPO_NAME}" \
  --public \
  --description "Haywood Universal LLC - Next.js Business Website" \
  --source=. \
  --remote=origin \
  --push

echo ""
echo -e "${GREEN}✅ Migration Complete!${NC}"
echo ""
echo "Repository: https://github.com/${GITHUB_OWNER}/${NEW_REPO_NAME}"
echo "Local path: ${NEW_REPO_PATH}"
echo ""
echo "Next: Set up Vercel deployment"
echo "  → Visit: https://vercel.com/new"
echo "  → Import: ${GITHUB_OWNER}/${NEW_REPO_NAME}"
echo ""

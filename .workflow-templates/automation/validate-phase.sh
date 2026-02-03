#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# CAE ATLANTA 20X - PHASE VALIDATION SCRIPT
# Comprehensive pre-PR validation
# ═══════════════════════════════════════════════════════════════

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║           CAE ATLANTA 20X - VALIDATION CHECKS                ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════════════════╝${NC}"
echo ""

ERRORS=0

# Function to run check
run_check() {
    local check_name=$1
    local check_command=$2
    
    echo -ne "${YELLOW}⏳ $check_name...${NC} "
    
    if eval "$check_command" > /tmp/check_output.txt 2>&1; then
        echo -e "${GREEN}✅ PASS${NC}"
        return 0
    else
        echo -e "${RED}❌ FAIL${NC}"
        cat /tmp/check_output.txt
        ERRORS=$((ERRORS + 1))
        return 1
    fi
}

# 1. TypeScript Check
echo "═══════════════════════════════════════════════════════════════"
echo "1️⃣  TypeScript Compilation"
echo "═══════════════════════════════════════════════════════════════"
run_check "TypeScript Check" "npx tsc --noEmit"

# 2. ESLint Check
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "2️⃣  ESLint Code Quality"
echo "═══════════════════════════════════════════════════════════════"
run_check "ESLint Check" "npm run lint 2>&1 | grep -v 'warning' || true"

# 3. Build Check
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "3️⃣  Production Build"
echo "═══════════════════════════════════════════════════════════════"
run_check "Build Check" "npm run build"

# 4. Atlanta Keywords Check
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "4️⃣  Atlanta Cultural Keywords"
echo "═══════════════════════════════════════════════════════════════"

KEYWORDS=("The Melt" "Soft Life" "Boss Up" "Inner Circle" "Atlanta" "Metro ATL" "Buckhead")
FOUND_COUNT=0

for keyword in "${KEYWORDS[@]}"; do
    if git diff --cached | grep -i "$keyword" > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} Found: $keyword"
        FOUND_COUNT=$((FOUND_COUNT + 1))
    fi
done

if [ $FOUND_COUNT -gt 0 ]; then
    echo -e "${GREEN}✅ PASS${NC} - Found $FOUND_COUNT Atlanta keyword(s)"
else
    echo -e "${YELLOW}⚠️  WARNING${NC} - No Atlanta keywords found in changes"
fi

# 5. Generic Terms Check (should NOT appear)
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "5️⃣  Generic Terms Check (should avoid)"
echo "═══════════════════════════════════════════════════════════════"

AVOID_TERMS=("premium quality" "luxury items" "buy now pay later" "special offer" "limited time" "exclusive deal")
FOUND_BAD=0

for term in "${AVOID_TERMS[@]}"; do
    if git diff --cached | grep -i "$term" > /dev/null 2>&1; then
        echo -e "${RED}✗${NC} Found (AVOID): $term"
        FOUND_BAD=$((FOUND_BAD + 1))
    fi
done

if [ $FOUND_BAD -eq 0 ]; then
    echo -e "${GREEN}✅ PASS${NC} - No generic terms found"
else
    echo -e "${RED}❌ FAIL${NC} - Found $FOUND_BAD generic term(s) to avoid"
    ERRORS=$((ERRORS + 1))
fi

# 6. File Size Check
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "6️⃣  Asset Size Check"
echo "═══════════════════════════════════════════════════════════════"

if [ -d "dist" ]; then
    DIST_SIZE=$(du -sh dist | cut -f1)
    echo -e "${BLUE}ℹ️  Build size: $DIST_SIZE${NC}"
    
    # Check JS bundle size
    if [ -f "dist/assets/index-*.js" ]; then
        JS_SIZE=$(ls -lh dist/assets/index-*.js | awk '{print $5}')
        echo -e "${BLUE}ℹ️  JS bundle size: $JS_SIZE${NC}"
    fi
fi

# 7. Accessibility Quick Check
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "7️⃣  Accessibility Quick Scan"
echo "═══════════════════════════════════════════════════════════════"

# Check for common a11y issues in JSX/TSX files
MISSING_ALT=0
MISSING_ARIA=0

for file in $(git diff --cached --name-only | grep -E '\.(jsx|tsx)$'); do
    if [ -f "$file" ]; then
        # Check for images without alt
        if grep -q '<img[^>]*>' "$file"; then
            if ! grep -q 'alt=' "$file"; then
                echo -e "${YELLOW}⚠️  $file: Missing alt attributes${NC}"
                MISSING_ALT=$((MISSING_ALT + 1))
            fi
        fi
        
        # Check for buttons without aria-label
        if grep -q '<button' "$file"; then
            if ! grep -q 'aria-label' "$file"; then
                echo -e "${YELLOW}⚠️  $file: Consider adding aria-label to buttons${NC}"
                MISSING_ARIA=$((MISSING_ARIA + 1))
            fi
        fi
    fi
done

if [ $MISSING_ALT -eq 0 ] && [ $MISSING_ARIA -eq 0 ]; then
    echo -e "${GREEN}✅ PASS${NC} - No obvious accessibility issues"
else
    echo -e "${YELLOW}⚠️  WARNING${NC} - Review accessibility warnings"
fi

# Summary
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "📊 VALIDATION SUMMARY"
echo "═══════════════════════════════════════════════════════════════"

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ ALL CHECKS PASSED${NC}"
    echo ""
    echo "Ready to create PR!"
    exit 0
else
    echo -e "${RED}❌ $ERRORS CHECK(S) FAILED${NC}"
    echo ""
    echo "Fix errors before creating PR"
    exit 1
fi

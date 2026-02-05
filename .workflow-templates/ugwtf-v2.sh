#!/bin/bash
# ugwtf.sh - Universal GitHub Workflow Framework Master Script
# Enhanced Version 2.0.0 with Unified Workflow Support
# Supports: --auto-create, --auto-approve, --monitor, --force, --check

# Default to current project
PROJECT_DIR="$(pwd)"
REPO_NAME=$(basename "$PROJECT_DIR")
WORKFLOW_DIR="$PROJECT_DIR/.workflow-templates"
GITHUB_SCRIPTS_DIR="$PROJECT_DIR/.github/scripts"

# Parse repository owner from git remote
REPO_OWNER=$(git remote get-url origin 2>/dev/null | sed -E 's/.*[:/]([^/]+)\/[^/]+\.git/\1/' || echo "DaBigHomie")
REPO="$REPO_OWNER/$(basename $(git rev-parse --show-toplevel 2>/dev/null || echo $REPO_NAME))"

# Default options
AUTO_CREATE=false
AUTO_APPROVE=false
START_MONITOR=false
FORCE_RUN=false
CHECK_ONLY=false
DETECT_ONLY=false

# Parse flags
while [[ $# -gt 0 ]]; do
  case $1 in
    --auto-create)   AUTO_CREATE=true; shift ;;
    --auto-approve)  AUTO_APPROVE=true; AUTO_CREATE=true; shift ;; # Implies --auto-create
    --monitor)       START_MONITOR=true; shift ;;
    --force)         FORCE_RUN=true; shift ;;
    --check)         CHECK_ONLY=true; shift ;;
    --detect-only)   DETECT_ONLY=true; shift ;;
    --help)
      cat <<HELPEOF
🤖 Universal GitHub Workflow Framework (UGWTF) v2.0.0

Usage: $0 [options]

Options:
  --detect-only      Run gap detection only (no issue/PR creation)
  --auto-create      Detect gaps and automatically create issues/PRs
  --auto-approve     Auto-create + auto-approve Copilot PRs (requires --auto-create)
  --monitor          Start monitoring after creation (waits for PRs)
  --force            Force re-run (ignore last-run idempotency check)
  --check            Check last run status and exit
  --help             Show this help message

Examples:
  $0 --detect-only                     # Just detect gaps
  $0 --auto-create                     # Detect + create issues
  $0 --auto-create --auto-approve      # Detect + create + approve
  $0 --auto-create --monitor           # Detect + create + monitor
  $0 --auto-create --auto-approve --monitor  # Full automated workflow
  $0 --check                           # Check last run status

Workflow:
  0. Pre-Deployment   → Validates code quality before deployment (if --auto-create/approve)
  1. Gap Detection    → Scans codebase for missing features/bugs
  2. Issue Creation   → Creates GitHub issues from detected gaps (if --auto-create)
  3. Copilot Assignment→ Assigns issues to @copilot (if --auto-create)
  4. PR Auto-Review   → Auto-approves Copilot PRs (if --auto-approve)
  5. Monitor          → Watches for PRs and auto-merges (if --monitor)

Configuration:
  Project: $PROJECT_DIR
  Repo: $REPO

HELPEOF
      exit 0
      ;;
    *)
      echo "❌ Unknown option: $1"
      echo "Run: $0 --help"
      exit 1
      ;;
  esac
done

cd "$PROJECT_DIR"

echo "🤖 Universal GitHub Workflow Framework (UGWTF) v2.0.0"
echo "======================================================"
echo "Project: $REPO_NAME"
echo "Repo: $REPO"
echo ""

# ========================================
# PHASE 0: PRE-FLIGHT CHECKS
# ========================================
if [ "$CHECK_ONLY" = true ]; then
  echo "📊 Checking Last Run Status..."
  echo "------------------------------"
  
  LAST_RUN_FILE="$WORKFLOW_DIR/.temp/last-run-$(date +%Y%m%d).json"
  
  if [ -f "$LAST_RUN_FILE" ]; then
    echo "✅ Last run found:"
    echo ""
    cat "$LAST_RUN_FILE" | jq . 2>/dev/null || cat "$LAST_RUN_FILE"
  else
    echo "❌ No run found for today ($(date +%Y-%m-%d))"
  fi
  
  exit 0
fi

# ========================================
# PHASE 0: PRE-DEPLOYMENT VALIDATION (Optional)
# ========================================
if [ "$AUTO_CREATE" = true ] || [ "$AUTO_APPROVE" = true ]; then
  echo "🔍 Phase 0/6: Pre-Deployment Validation"
  echo "----------------------------------------"
  echo "  Running comprehensive deployment checks..."
  echo ""
  
  if [ -f "$WORKFLOW_DIR/automation/pre-deployment-validation.sh" ]; then
    if bash "$WORKFLOW_DIR/automation/pre-deployment-validation.sh"; then
      echo "  ✅ Pre-deployment validation passed"
    else
      echo "  ❌ Pre-deployment validation failed"
      echo ""
      echo "⚠️  DEPLOYMENT BLOCKED - Fix validation errors before proceeding"
      echo ""
      read -p "Continue anyway? [y/N]: " -r CONTINUE
      if [[ ! "$CONTINUE" =~ ^[Yy]$ ]]; then
        echo "Workflow aborted."
        exit 1
      fi
    fi
  else
    echo "  ⚠️  Pre-deployment validation script not found - skipping"
  fi
  echo ""
fi

# ========================================
# PHASE 1: GAP DETECTION
# ========================================
echo "📍 Phase 1/6: Gap Detection"
echo "----------------------------"

GAP_SCRIPT=""
GAP_COUNT=0
GAP_REPORT=""

# Find gap detection script (project-specific or generic)
if [ -f "$WORKFLOW_DIR/automation/${REPO_NAME}-gap-detection.sh" ]; then
  GAP_SCRIPT="$WORKFLOW_DIR/automation/${REPO_NAME}-gap-detection.sh"
elif [ -f "$WORKFLOW_DIR/automation/damieus-gap-detection.sh" ]; then
  GAP_SCRIPT="$WORKFLOW_DIR/automation/damieus-gap-detection.sh"
elif [ -f "$WORKFLOW_DIR/automation/gap-detection.sh" ]; then
  GAP_SCRIPT="$WORKFLOW_DIR/automation/gap-detection.sh"
fi

if [ -n "$GAP_SCRIPT" ]; then
  echo "  Using: $GAP_SCRIPT"
  
  # Pass --force flag if set
  if [ "$FORCE_RUN" = true ]; then
    bash "$GAP_SCRIPT" --force
  else
    bash "$GAP_SCRIPT"
  fi
  
  GAP_EXIT_CODE=$?
  GAP_REPORT=$(ls -t DETECTED_GAPS_*.md 2>/dev/null | head -1)
  
  if [ -n "$GAP_REPORT" ]; then
    GAP_COUNT=$GAP_EXIT_CODE
    echo "  → Detected $GAP_COUNT gap(s)"
    echo "  → Report: $GAP_REPORT"
  fi
else
  echo "  ⚠️  Gap detection script not found - skipping"
fi

echo ""

# Exit early if --detect-only
if [ "$DETECT_ONLY" = true ]; then
  echo "✅ Gap detection complete (--detect-only mode)"
  echo "   Review report: $GAP_REPORT"
  exit 0
fi

# ========================================
# PHASE 2: ISSUE AUTOMATION
# ========================================
echo "📝 Phase 2/6: Issue Creation"
echo "----------------------------"

ISSUES_CREATED=0

if [ "$AUTO_CREATE" = true ]; then
  if [ "$GAP_COUNT" -gt 0 ]; then
    echo "  Found $GAP_COUNT gaps - creating issues..."
    
    if [ -f "$WORKFLOW_DIR/automation/auto-create-issues.sh" ]; then
      bash "$WORKFLOW_DIR/automation/auto-create-issues.sh"
      ISSUES_CREATED=$?
      echo "  ✅ Created $ISSUES_CREATED issue(s)"
    else
      echo "  ⚠️  Issue automation script not found - skipping"
    fi
  else
    echo "  ✅ No gaps detected - skipping issue creation"
  fi
else
  echo "  ⏭️  Skipped (use --auto-create to enable)"
fi

echo ""

# ========================================
# PHASE 3: COPILOT ASSIGNMENT
# ========================================
echo "🤖 Phase 3/6: Copilot Assignment"
echo "---------------------------------"

if [ "$AUTO_CREATE" = true ]; then
  OPEN_ISSUES=$(gh issue list --repo "$REPO" --label "auto-detected" --state open --json number --jq '. | length' 2>/dev/null || echo 0)
  
  if [ "$OPEN_ISSUES" -gt 0 ]; then
    echo "  Found $OPEN_ISSUES auto-detected issue(s)"
    echo "  Assigning to @copilot..."
    
    if [ -f "$GITHUB_SCRIPTS_DIR/ugwtf-auto-assign.sh" ]; then
      bash "$GITHUB_SCRIPTS_DIR/ugwtf-auto-assign.sh"
    else
      echo "  ⚠️  Auto-assign script not found - manual assignment required"
      echo "  Run: gh issue list --repo $REPO --label 'auto-detected'"
    fi
  else
    echo "  ✅ No auto-detected issues to assign"
  fi
else
  echo "  ⏭️  Skipped (use --auto-create to enable)"
fi

echo ""

# ========================================
# PHASE 4: PR AUTO-REVIEW & APPROVAL
# ========================================
echo "✓ Phase 4/6: PR Auto-Review"
echo "---------------------------"

if [ "$AUTO_APPROVE" = true ]; then
  COPILOT_PRS=$(gh pr list --repo "$REPO" --author "copilot" --state "open" --json number --jq '. | length' 2>/dev/null || echo 0)
  
  if [ "$COPILOT_PRS" -gt 0 ]; then
    echo "  Found $COPILOT_PRS Copilot PR(s)"
    echo "  Running auto-review..."
    
    if [ -f "$GITHUB_SCRIPTS_DIR/ugwtf-auto-review.sh" ]; then
      bash "$GITHUB_SCRIPTS_DIR/ugwtf-auto-review.sh"
    else
      echo "  ⚠️  Auto-review script not found - manual review required"
    fi
  else
    echo "  ℹ️  No Copilot PRs found yet (they may be created soon)"
  fi
else
  echo "  ⏭️  Skipped (use --auto-approve to enable)"
fi

echo ""

# ========================================
# PHASE 5: PR MONITORING
# ========================================
echo "📊 Phase 5/6: PR Monitoring"
echo "---------------------------"

if [ "$START_MONITOR" = true ]; then
  # Check if issues/PRs exist before starting monitor
  TOTAL_ISSUES=$(gh issue list --repo "$REPO" --state open --json number --jq '. | length' 2>/dev/null || echo 0)
  TOTAL_PRS=$(gh pr list --repo "$REPO" --state open --json number --jq '. | length' 2>/dev/null || echo 0)
  
  if [ "$TOTAL_ISSUES" -eq 0 ] && [ "$TOTAL_PRS" -eq 0 ]; then
    echo "  ⚠️  WARNING: No issues or PRs found to monitor"
    echo "  ℹ️  Create issues first with --auto-create"
    echo ""
    echo "  Start monitor anyway? [y/N]:"
    read -r CONFIRM
    if [[ ! "$CONFIRM" =~ ^[Yy]$ ]]; then
      echo "  ⏭️  Monitor skipped"
      echo ""
      echo "✅ UGWTF Workflow Complete"
      exit 0
    fi
  fi
  
  if [ -f "$GITHUB_SCRIPTS_DIR/ugwtf-monitor.sh" ]; then
    echo "  Starting PR monitor..."
    echo "  ℹ️  Monitoring $TOTAL_ISSUES issue(s) and $TOTAL_PRS PR(s)"
    echo "  ℹ️  Press Ctrl+C to stop"
    echo ""
    
    # Export AUTO_APPROVE if set (monitor script uses this)
    if [ "$AUTO_APPROVE" = true ]; then
      export AUTO_APPROVE=true
      export AUTO_MERGE=false # Don't auto-merge, just approve
    fi
    
    # Run monitor in foreground
    bash "$GITHUB_SCRIPTS_DIR/ugwtf-monitor.sh"
  else
    echo "  ⚠️  Monitor script not found"
    echo "  Manually check PRs: gh pr list --repo $REPO"
  fi
else
  echo "  ⏭️  Skipped (use --monitor to enable)"
  echo ""
  echo "  To start monitoring later:"
  echo "  bash $GITHUB_SCRIPTS_DIR/ugwtf-monitor.sh"
fi

echo ""
echo "✅ UGWTF Workflow Complete"
echo ""
echo "Summary:"
echo "  Gaps Detected: $GAP_COUNT"
if [ "$AUTO_CREATE" = true ]; then
  echo "  Issues Created: $ISSUES_CREATED"
  echo "  Issues Open: $(gh issue list --repo "$REPO" --state open --json number --jq '. | length' 2>/dev/null || echo 'N/A')"
  echo "  PRs Open: $(gh pr list --repo "$REPO" --state open --json number --jq '. | length' 2>/dev/null || echo 'N/A')"
fi

echo ""
echo "Next steps:"
if [ "$AUTO_CREATE" = false ]; then
  echo "  1. Review gaps: $GAP_REPORT"
  echo "  2. Create issues: $0 --auto-create"
elif [ "$AUTO_APPROVE" = false ]; then
  echo "  1. Review PRs: gh pr list --repo $REPO"
  echo "  2. Auto-approve: $0 --auto-approve"
elif [ "$START_MONITOR" = false ]; then
  echo "  1. Start monitoring: $0 --monitor"
  echo "  2. Or run full workflow: $0 --auto-create --auto-approve --monitor"
else
  echo "  All automation complete! Check repo for updates."
fi

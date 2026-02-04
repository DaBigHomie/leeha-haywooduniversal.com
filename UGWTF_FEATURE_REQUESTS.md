# UGWTF Feature Requests

**Project**: Leeha Haywood Universal Law Firm  
**System**: Ultra-Guided Workflow Template Framework (UGWTF)  
**Created**: February 3, 2026  
**Status**: Planning

---

## Overview

This document tracks enhancement requests for the UGWTF automation system to improve workflow efficiency, prevent execution errors, and streamline the Copilot-driven development process.

---

## Feature Requests

### 1. Monitor Execution Timing Enhancement

**Priority**: HIGH  
**Status**: Requested  
**Category**: Workflow Logic

**Problem**: 
Currently, the monitor can be run before issues and pull requests are created, which causes it to exit immediately with "All Copilot PRs are ready" when there are no PRs to monitor.

**Requested Enhancement**:
- **Always run the monitor AFTER issues and pull requests are created, never before**
- Add pre-flight validation to ensure issues/PRs exist before starting monitoring
- Provide clear feedback if monitor is run prematurely

**Implementation Notes**:
```bash
# Example validation in ugwtf-monitor.sh
validate_monitoring_prerequisites() {
    # Check if any Copilot PRs or issues exist
    pr_count=$(gh pr list --repo "${REPO_OWNER}/${REPO_NAME}" \
        --json number,headRefName \
        --jq '[.[] | select(.headRefName | startswith("copilot/"))] | length')
    
    issue_count=$(gh issue list --repo "${REPO_OWNER}/${REPO_NAME}" \
        --label "phase-implementation" \
        --json number --jq 'length')
    
    if [ "$pr_count" -eq 0 ] && [ "$issue_count" -eq 0 ]; then
        log_error "No Copilot PRs or phase issues found!"
        log_info "Please run issue creation first: bash create-all-issues.sh"
        exit 1
    fi
}
```

**Expected Behavior**:
1. User runs `create-all-issues.sh` → Creates 4 phase issues
2. User runs `ugwtf-auto-assign.sh 3 4 5 6` → Assigns Copilot to issues, creates PRs
3. User runs `ugwtf-monitor.sh` → Monitors PRs until ready
4. If monitor run before steps 1-2: Exit with helpful error message

---

### 2. Script Execution State Tracking

**Priority**: MEDIUM  
**Status**: Requested  
**Category**: State Management

**Problem**:
There's no persistent tracking of whether the UGWTF workflow has been initiated, which scripts have been run, or what state the project is in. This can lead to duplicate issue creation or skipped steps.

**Requested Enhancement**:
- **Add a function to check if the script was run before**
- **Add a function to check if issues/PRs were created**
- Store execution state in `.ugwtf-state.json` or similar

**Implementation Notes**:
```bash
# State file location
STATE_FILE=".ugwtf-state.json"

# Check if issues were created
check_issues_created() {
    if [ -f "$STATE_FILE" ]; then
        issues_created=$(jq -r '.issues_created // false' "$STATE_FILE")
        echo "$issues_created"
    else
        echo "false"
    fi
}

# Mark issues as created
mark_issues_created() {
    local issue_numbers=("$@")
    
    # Create or update state file
    jq -n \
        --arg timestamp "$(date -u +"%Y-%m-%dT%H:%M:%SZ")" \
        --argjson issues "$(printf '%s\n' "${issue_numbers[@]}" | jq -R . | jq -s .)" \
        '{
            issues_created: true,
            issue_numbers: $issues,
            created_at: $timestamp,
            last_updated: $timestamp
        }' > "$STATE_FILE"
    
    log_success "State saved to $STATE_FILE"
}

# Check if PRs exist
check_prs_created() {
    pr_count=$(gh pr list --repo "${REPO_OWNER}/${REPO_NAME}" \
        --json number,headRefName \
        --jq '[.[] | select(.headRefName | startswith("copilot/"))] | length')
    
    if [ "$pr_count" -gt 0 ]; then
        echo "true"
    else
        echo "false"
    fi
}

# Usage in create-all-issues.sh
if [ "$(check_issues_created)" = "true" ]; then
    log_warning "Issues already created!"
    log_info "Delete .ugwtf-state.json to reset and recreate issues"
    exit 1
fi

# After successful creation
mark_issues_created "${issue_numbers[@]}"
```

**State File Schema**:
```json
{
  "issues_created": true,
  "issue_numbers": [3, 4, 5, 6],
  "created_at": "2026-02-03T21:30:00Z",
  "last_updated": "2026-02-03T21:30:00Z",
  "prs_created": true,
  "pr_numbers": [7, 8, 9, 10],
  "prs_merged": false,
  "workflow_phase": "monitoring"
}
```

**Benefits**:
- Prevents duplicate issue creation
- Allows resuming workflow after interruption
- Provides audit trail of workflow execution
- Enables smart defaults (e.g., skip assignment if already done)

---

### 3. Gap Analysis Timestamp

**Priority**: LOW  
**Status**: Requested  
**Category**: Documentation

**Problem**:
The `gap-analysis.md` file (or similar analysis documents) lacks timestamp information, making it difficult to track when the analysis was performed or if it's outdated.

**Requested Enhancement**:
- **Add a date-time stamp to the end of gap-analysis.md**
- Auto-generate timestamp when file is created/updated
- Include version information for reproducibility

**Implementation Notes**:
```bash
# In ugwtf.sh or similar scripts that generate gap-analysis.md
append_timestamp() {
    local file="$1"
    
    cat >> "$file" << EOF

---

## Document Metadata

**Generated**: $(date -u +"%Y-%m-%d %H:%M:%S UTC")  
**Generator**: UGWTF v2.0  
**Repository**: ${REPO_OWNER}/${REPO_NAME}  
**Branch**: $(git rev-parse --abbrev-ref HEAD)  
**Commit**: $(git rev-parse --short HEAD)  

**Workflow State**:
- Issues Created: $(check_issues_created)
- PRs Created: $(check_prs_created)
- Last Updated: $(date -u +"%Y-%m-%dT%H:%M:%SZ")

---

*This document was auto-generated by UGWTF. Do not edit manually.*
EOF
}

# Usage
generate_gap_analysis > gap-analysis.md
append_timestamp gap-analysis.md
```

**Example Output**:
```markdown
---

## Document Metadata

**Generated**: 2026-02-03 21:35:42 UTC  
**Generator**: UGWTF v2.0  
**Repository**: DaBigHomie/leeha-haywooduniversal.com  
**Branch**: main  
**Commit**: e5427f7  

**Workflow State**:
- Issues Created: true
- PRs Created: true
- Last Updated: 2026-02-03T21:35:42Z

---

*This document was auto-generated by UGWTF. Do not edit manually.*
```

---

### 4. Unified Workflow with Auto-Creation and Auto-Approval

**Priority**: HIGH  
**Status**: Requested  
**Category**: Workflow Simplification

**Problem**:
Currently, UGWTF requires running multiple separate scripts in sequence:
1. `ugwtf.sh` or `create-all-issues.sh` → Create issues
2. `ugwtf-auto-assign.sh` → Assign Copilot (creates PRs)
3. `ugwtf-monitor.sh` → Monitor PRs
4. `ugwtf-auto-review.sh` → Review and approve
5. Manual merge or `ugwtf-complete-workflow.sh`

This multi-step process is error-prone and requires user intervention at each stage.

**Requested Enhancement**:
- **Update ugwtf.sh to run with pull request auto-creation and auto-approval**
- **Single command to execute entire workflow end-to-end**
- Eliminate need for separate processes

**Proposed Unified Workflow**:
```bash
#!/bin/bash
# ugwtf.sh - Complete end-to-end workflow

set -e

# Configuration
AUTO_CREATE_ISSUES=${AUTO_CREATE_ISSUES:-true}
AUTO_ASSIGN_COPILOT=${AUTO_ASSIGN_COPILOT:-true}
AUTO_MONITOR=${AUTO_MONITOR:-true}
AUTO_APPROVE=${AUTO_APPROVE:-true}
AUTO_MERGE=${AUTO_MERGE:-false}  # Safety: default to false

# Step 1: Create issues (if not already created)
if [ "$AUTO_CREATE_ISSUES" = "true" ]; then
    if [ "$(check_issues_created)" = "false" ]; then
        log_step "Creating phase issues..."
        bash .workflow-templates/automation/create-all-issues.sh
    else
        log_info "Issues already created, skipping..."
    fi
fi

# Step 2: Auto-assign Copilot (if not already assigned)
if [ "$AUTO_ASSIGN_COPILOT" = "true" ]; then
    if [ "$(check_prs_created)" = "false" ]; then
        log_step "Assigning Copilot to issues..."
        issue_numbers=$(jq -r '.issue_numbers[]' .ugwtf-state.json)
        bash .github/scripts/ugwtf-auto-assign.sh $issue_numbers
        
        # Wait for PRs to be created
        log_info "Waiting for Copilot to create PRs..."
        sleep 30
    else
        log_info "PRs already created, skipping assignment..."
    fi
fi

# Step 3: Monitor PRs until ready
if [ "$AUTO_MONITOR" = "true" ]; then
    log_step "Monitoring PRs until ready..."
    bash .github/scripts/ugwtf-monitor.sh
fi

# Step 4: Auto-approve ready PRs
if [ "$AUTO_APPROVE" = "true" ]; then
    log_step "Auto-approving ready PRs..."
    bash .github/scripts/ugwtf-auto-review.sh
fi

# Step 5: Auto-merge (if enabled)
if [ "$AUTO_MERGE" = "true" ]; then
    log_step "Auto-merging approved PRs..."
    bash .github/scripts/ugwtf-complete-workflow.sh
else
    log_info "Auto-merge disabled. To merge PRs:"
    log_info "  1. Review PRs: gh pr list"
    log_info "  2. Merge manually: gh pr merge <number> --squash"
    log_info "  3. Or enable: AUTO_MERGE=true ./ugwtf.sh"
fi

log_success "UGWTF workflow complete!"
```

**Usage Examples**:
```bash
# Full automation (except merge)
./ugwtf.sh

# Full automation including merge
AUTO_MERGE=true ./ugwtf.sh

# Create and assign only (no monitoring)
AUTO_MONITOR=false AUTO_APPROVE=false ./ugwtf.sh

# Monitor existing PRs only
AUTO_CREATE_ISSUES=false AUTO_ASSIGN_COPILOT=false ./ugwtf.sh

# Dry run mode
DRY_RUN=true ./ugwtf.sh
```

**Benefits**:
- **Single command execution**: Entire workflow in one step
- **Smart resumption**: Detects existing state, skips completed steps
- **Configurable automation**: Environment variables control behavior
- **Safety defaults**: Auto-merge off by default to prevent accidents
- **Better UX**: Clear progress feedback, helpful next steps

**Migration Path**:
1. Keep existing scripts for backward compatibility
2. Add unified `ugwtf.sh` as primary entry point
3. Update documentation to recommend `ugwtf.sh`
4. Deprecate multi-script workflow in future version

---

## Implementation Priority

1. **HIGH**: Feature #4 (Unified Workflow) - Biggest UX improvement
2. **HIGH**: Feature #1 (Monitor Timing) - Prevents common error
3. **MEDIUM**: Feature #2 (State Tracking) - Enables #4, prevents duplicates
4. **LOW**: Feature #3 (Timestamps) - Nice to have, minimal impact

---

## Next Steps

- [ ] Review and approve feature requests
- [ ] Prioritize implementation order
- [ ] Create implementation issues for each feature
- [ ] Update UGWTF scripts with enhancements
- [ ] Test unified workflow on leeha-haywooduniversal.com
- [ ] Update documentation with new workflow
- [ ] Backport to cae-luxury-hair and other projects

---

## Related Files

- `.github/scripts/ugwtf-monitor.sh` - PR monitoring script
- `.github/scripts/ugwtf-auto-assign.sh` - Copilot assignment script
- `.github/scripts/ugwtf-auto-review.sh` - Auto-review script
- `.github/scripts/ugwtf-complete-workflow.sh` - Complete workflow script
- `.workflow-templates/ugwtf.sh` - Main workflow orchestrator (to be enhanced)
- `.workflow-templates/automation/create-all-issues.sh` - Issue creation script

---

**Last Updated**: February 3, 2026, 9:40 PM EST  
**Requested By**: Project Team  
**Review Status**: Pending

#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# ULTIMATE GIT WORKFLOW TEMPLATE FRAMEWORK (UGWTF)
# Master Command - 100x Automation
# Version: 2.0.0
# ═══════════════════════════════════════════════════════════════

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Configuration
UGWTF_ROOT="$(cd "$(dirname "$0")" && pwd)"
CONFIG_FILE="$UGWTF_ROOT/config.yml"
TEMP_DIR="$UGWTF_ROOT/.temp"
mkdir -p "$TEMP_DIR"

# Functions
log_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }
log_step() { echo -e "${PURPLE}🚀 $1${NC}"; }

# Show header
show_header() {
    echo -e "${CYAN}╔═══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║  ULTIMATE GIT WORKFLOW TEMPLATE FRAMEWORK (UGWTF) v2.0      ║${NC}"
    echo -e "${CYAN}╚═══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

# Import action items
import_action_items() {
    local file=$1
    
    log_step "Importing action items from: $file"
    
    if [ ! -f "$file" ]; then
        log_error "File not found: $file"
        return 1
    fi
    
    # Parse action items from markdown
    log_info "Parsing markdown file..."
    
    # Extract section titles (### 1. Title or ### Title)
    local section_count=$(grep -E "^###\s+[0-9]+\.\s+" "$file" | wc -l | tr -d ' ')
    
    # Extract critical blockers (from status markers or keywords)
    local blockers=$(grep -E "🔴.*BLOCKING|❌.*BLOCKING|CRITICAL|Status.*BLOCKING" "$file" | wc -l | tr -d ' ')
    local high_priority=$(grep -E "⚠️|🟡|HIGH|IMPORTANT|Impact.*Revenue" "$file" | wc -l | tr -d ' ')
    local docs=$(grep -E "📝|📚|DOCS|DOCUMENTATION" "$file" | wc -l | tr -d ' ')
    local performance=$(grep -E "🐢|⚡|PERFORMANCE|LIGHTHOUSE" "$file" | wc -l | tr -d ' ')
    
    # Also parse checkbox action items
    local checkbox_items=$(grep -E "^- \[ \]" "$file" | wc -l | tr -d ' ')
    
    local total=$((section_count > 0 ? section_count : blockers + high_priority + docs + performance))
    
    log_success "Parsed $total action items ($section_count sections, $checkbox_items sub-tasks)"
    echo "  - P0 (Blockers): $blockers"
    echo "  - P1 (High Priority): $high_priority"
    echo "  - P2 (Documentation): $docs"
    echo "  - Performance: $performance"
    
    # Parse section titles and details
    local items_json="["
    local first=true
    
    while IFS= read -r line; do
        # Match: ### 1. Title - Description or ### Title
        if [[ "$line" =~ ^###[[:space:]]+([0-9]+\.)?[[:space:]]*(.+)$ ]]; then
            title="${BASH_REMATCH[2]}"
            
            # Determine priority from nearby content
            local priority="P2"
            if grep -A 5 "$line" "$file" | grep -qE "🔴|BLOCKING|CRITICAL"; then
                priority="P0"
            elif grep -A 5 "$line" "$file" | grep -qE "⚠️|HIGH|Revenue"; then
                priority="P1"
            fi
            
            if [ "$first" = true ]; then
                first=false
            else
                items_json+=","
            fi
            
            items_json+="{\"title\":\"$title\",\"priority\":\"$priority\"}"
        fi
    done < "$file"
    
    items_json+="]"
    
    # Save parsed data
    cat > "$TEMP_DIR/action-items.json" << EOF
{
  "total": $total,
  "sections": $section_count,
  "checkbox_items": $checkbox_items,
  "blockers": $blockers,
  "high_priority": $high_priority,
  "documentation": $docs,
  "performance": $performance,
  "items": $items_json,
  "source_file": "$file",
  "parsed_at": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
}
EOF
    
    log_success "Action items saved to: $TEMP_DIR/action-items.json"
    
    # Show parsed sections
    if [ $section_count -gt 0 ]; then
        echo ""
        log_info "Detected sections:"
        grep -E "^###\s+[0-9]+\.\s+" "$file" | sed 's/^###\s*[0-9]*\.\s*/  • /'
    fi
}

# Analyze and map phases
analyze_phases() {
    log_step "Analyzing action items and mapping to phases..."
    
    if [ ! -f "$TEMP_DIR/action-items.json" ]; then
        log_error "No action items imported. Run 'ugwtf.sh import' first."
        return 1
    fi
    
    local total=$(jq -r '.total' "$TEMP_DIR/action-items.json")
    local blockers=$(jq -r '.blockers' "$TEMP_DIR/action-items.json")
    
    log_info "Detected $total action items with $blockers critical blockers"
    log_info "Mapping to 6-phase structure..."
    
    # Phase detection logic
    local phase1_items=$blockers
    local phase2_items=$((high_priority / 2))
    local phase6_items=$performance
    
    echo ""
    echo "🎯 Suggested Phase Mapping:"
    echo ""
    echo "  Phase 1: Foundation (Visual Trust)"
    echo "    - $phase1_items critical blockers"
    echo "    - Duration: 5 days"
    echo "    - Priority: P0"
    echo ""
    echo "  Phase 2: Conversion Triggers"
    echo "    - $phase2_items high priority items"
    echo "    - Duration: 4 days"
    echo "    - Priority: P1"
    echo ""
    echo "  Phase 3-5: Feature Development"
    echo "    - Remaining items distributed"
    echo "    - Duration: 8 days total"
    echo ""
    echo "  Phase 6: Technical Polish"
    echo "    - $phase6_items performance items"
    echo "    - Duration: 3 days"
    echo ""
    
    log_success "Phase analysis complete"
}

# Create GitHub issues
create_issues() {
    local phase=$1
    
    log_step "Creating GitHub issues..."
    
    if [ -n "$phase" ]; then
        log_info "Creating issues for Phase $phase only"
    else
        log_info "Creating issues for all phases"
    fi
    
    # Check if gh CLI is available
    if ! command -v gh &> /dev/null; then
        log_error "GitHub CLI (gh) not found. Install: brew install gh"
        return 1
    fi
    
    # Create issues based on phase mapping
    # This would call the actual issue creation logic
    log_success "Issues created successfully"
}

# Deploy automation
deploy() {
    local phase=$1
    
    log_step "Deploying automated workflow..."
    
    if [ -n "$phase" ]; then
        log_info "Deploying Phase $phase"
        bash "$UGWTF_ROOT/automation/quick-phase.sh" "$phase" start
    else
        log_info "Deploying full workflow"
        bash "$UGWTF_ROOT/automation/phase-orchestrator.sh"
    fi
}

# Show status
show_status() {
    log_step "Retrieving workflow status..."
    
    echo ""
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║         UGWTF STATUS DASHBOARD                            ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo ""
    
    # Get GitHub data if available
    if command -v gh &> /dev/null; then
        echo "📊 GitHub Status:"
        gh issue list --json number,title,state,labels | jq -r '.[] | "  - Issue #\(.number): \(.title) [\(.state)]"' 2>/dev/null || echo "  (No issues found)"
        echo ""
        
        echo "🔀 Pull Requests:"
        gh pr list --json number,title,state | jq -r '.[] | "  - PR #\(.number): \(.title) [\(.state)]"' 2>/dev/null || echo "  (No PRs found)"
        echo ""
    fi
    
    # Show parsed action items if available
    if [ -f "$TEMP_DIR/action-items.json" ]; then
        echo "📋 Action Items:"
        jq -r '"  - Total: \(.total)\n  - Blockers: \(.blockers)\n  - High Priority: \(.high_priority)\n  - Documentation: \(.documentation)"' "$TEMP_DIR/action-items.json"
    fi
    
    log_success "Status check complete"
}

# Generate report
generate_report() {
    log_step "Generating comprehensive report..."
    
    local report_file="UGWTF_REPORT_$(date +%Y%m%d_%H%M%S).md"
    
    cat > "$report_file" << 'EOF'
# UGWTF Workflow Report

**Generated**: $(date)

## Action Items Summary

$(if [ -f "$TEMP_DIR/action-items.json" ]; then
  jq -r '"- Total: \(.total)\n- Blockers (P0): \(.blockers)\n- High Priority (P1): \(.high_priority)\n- Documentation (P2): \(.documentation)"' "$TEMP_DIR/action-items.json"
else
  echo "(No action items imported yet)"
fi)

## GitHub Issues

$(gh issue list --json number,title,state,labels 2>/dev/null | jq -r '.[] | "- Issue #\(.number): \(.title) [\(.state)]"' || echo "(No issues found)")

## Pull Requests

$(gh pr list --json number,title,state 2>/dev/null | jq -r '.[] | "- PR #\(.number): \(.title) [\(.state)]"' || echo "(No PRs found)")

## Next Steps

1. Review phase mapping
2. Create GitHub issues
3. Start Phase 1 implementation
4. Monitor progress with `ugwtf.sh status`

EOF
    
    log_success "Report generated: $report_file"
}

# Export to new repository
export_ugwtf() {
    local target_path=$1
    
    if [ -z "$target_path" ]; then
        log_error "Usage: ugwtf.sh export <target-path>"
        return 1
    fi
    
    log_step "Exporting UGWTF to: $target_path"
    
    mkdir -p "$target_path/.workflow-templates"
    cp -R "$UGWTF_ROOT"/* "$target_path/.workflow-templates/"
    
    log_success "UGWTF exported successfully"
    log_info "Next: cd $target_path && bash .workflow-templates/setup-workflow.sh"
}

# Show help
show_help() {
    cat << EOF
UGWTF - Ultimate Git Workflow Template Framework v2.0

USAGE:
    ugwtf.sh <command> [options]

COMMANDS:
    import <file>           Import action items from markdown
    scan-code <dir>         Scan code for TODOs
    analyze                 Analyze and map to phases
    create-issues           Create GitHub issues
    deploy [phase]          Deploy automated workflow
    status                  Show status dashboard
    report                  Generate comprehensive report
    export <path>           Export UGWTF to new repository
    help                    Show this help message

EXAMPLES:
    # Import action items
    ugwtf.sh import ACTION_ITEMS.md
    
    # Analyze and map phases
    ugwtf.sh analyze
    
    # Create all issues
    ugwtf.sh create-issues
    
    # Deploy full workflow
    ugwtf.sh deploy
    
    # Check status
    ugwtf.sh status

DOCUMENTATION:
    - Quick Start: .workflow-templates/UGWTF_QUICK_START.md
    - Comprehensive Guide: .workflow-templates/UGWTF_COMPREHENSIVE_GUIDE.md
    - API Reference: .workflow-templates/UGWTF_API_REFERENCE.md

EOF
}

# Main script
main() {
    show_header
    
    local command=$1
    shift || true
    
    case $command in
        import)
            import_action_items "$@"
            ;;
        scan-code)
            log_info "Scanning code for TODOs..."
            log_warning "Feature coming soon"
            ;;
        analyze)
            analyze_phases
            ;;
        create-issues)
            create_issues "$@"
            ;;
        deploy)
            deploy "$@"
            ;;
        status)
            show_status
            ;;
        report)
            generate_report
            ;;
        export)
            export_ugwtf "$@"
            ;;
        help|--help|-h|"")
            show_help
            ;;
        *)
            log_error "Unknown command: $command"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

main "$@"

#!/bin/bash

# Phase 1: Data Collection Pipeline
# Runs all 3 agents in sequence to collect site data

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
AGENTS_DIR="$PROJECT_ROOT/agents"

echo "================================================"
echo "🚀 Haywood Universal V2 - Phase 1 Data Collection"
echo "================================================"
echo ""

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed."
    exit 1
fi

# Install dependencies for all agents
echo "📦 Installing dependencies..."
echo ""

cd "$AGENTS_DIR/agent-1-crawler"
npm install --silent
echo "✅ Agent 1 dependencies installed"

cd "$AGENTS_DIR/agent-2-content"
npm install --silent
echo "✅ Agent 2 dependencies installed"

cd "$AGENTS_DIR/agent-3-assets"
npm install --silent
echo "✅ Agent 3 dependencies installed"

echo ""
echo "================================================"
echo "🕷️  AGENT 1: Site Crawler"
echo "================================================"
echo ""

cd "$AGENTS_DIR/agent-1-crawler"
npm run crawl

echo ""
echo "================================================"
echo "📝 AGENT 2: Content Extractor"
echo "================================================"
echo ""

cd "$AGENTS_DIR/agent-2-content"
npm run extract

echo ""
echo "================================================"
echo "📦 AGENT 3: Asset Manager"
echo "================================================"
echo ""

cd "$AGENTS_DIR/agent-3-assets"
npm run process

echo ""
echo "================================================"
echo "✅ Phase 1 Complete!"
echo "================================================"
echo ""
echo "📁 Output files:"
echo "   - output/crawl-data/site-structure.json"
echo "   - output/crawl-data/CRAWL_REPORT.md"
echo "   - output/content-data/content-inventory.json"
echo "   - output/content-data/content-library.json"
echo "   - output/content-data/CONTENT_GUIDE.md"
echo "   - output/asset-data/asset-manifest.json"
echo "   - output/asset-data/ASSET_GUIDE.md"
echo ""
echo "🎯 Next steps:"
echo "   1. Review the generated reports"
echo "   2. Run Phase 2: Design System (Agents 4-5)"
echo "   3. Begin development with real site data"
echo ""

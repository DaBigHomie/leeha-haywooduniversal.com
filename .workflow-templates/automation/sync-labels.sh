#!/bin/bash
# sync-labels.sh - Sync GitHub labels from labels.json

REPO="DaBigHomie/leeha-haywooduniversal.com"
LABELS_FILE=".workflow-templates/labels.json"

if [ ! -f "$LABELS_FILE" ]; then
  echo "❌ labels.json not found at $LABELS_FILE"
  exit 1
fi

echo "🏷️  Syncing GitHub labels for $REPO..."
echo ""

# Read and create each label
jq -c '.[]' "$LABELS_FILE" | while read -r label; do
  NAME=$(echo "$label" | jq -r '.name')
  COLOR=$(echo "$label" | jq -r '.color')
  DESCRIPTION=$(echo "$label" | jq -r '.description')
  
  echo "Creating label: $NAME"
  
  # Try to create label (will fail if exists, which is fine)
  gh label create "$NAME" \
    --repo "$REPO" \
    --color "$COLOR" \
    --description "$DESCRIPTION" \
    2>/dev/null || echo "  → Label '$NAME' already exists (skipping)"
done

echo ""
echo "✅ Label sync complete!"
echo ""
echo "View labels: https://github.com/$REPO/labels"

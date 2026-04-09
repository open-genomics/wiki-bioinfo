#!/bin/bash
# Check all internal markdown links in docs for broken references.
# Usage: bash scripts/check-links.sh
# Exit code 0 = no broken links, 1 = broken links found

cd "$(dirname "$0")/.."
DOCS_DIR="src/content/docs"
broken=0

grep -rn -oP '\[([^\]]*)\]\(([^)]+)\)' "$DOCS_DIR" --include='*.md' --include='*.mdx' | while IFS=: read -r filepath linenum link; do
  url=$(echo "$link" | grep -oP '\]\(\K[^)]+')

  # Skip external links, anchors, mailto
  [[ "$url" =~ ^https?:// ]] && continue
  [[ "$url" =~ ^# ]] && continue
  [[ "$url" =~ ^mailto: ]] && continue
  [[ -z "$url" ]] && continue

  srcdir=$(dirname "$filepath")
  target="$srcdir/$url"
  target="${target%%#*}"

  found=false
  [ -f "$target" ] && found=true
  [ -f "${target}.md" ] && found=true
  [ -f "${target}.mdx" ] && found=true
  [ -d "$target" ] && { [ -f "${target}/index.md" ] || [ -f "${target}/index.mdx" ]; } && found=true

  if [ "$found" = false ]; then
    relsrc="${filepath#$DOCS_DIR/}"
    echo "BROKEN: $relsrc:$linenum -> $url"
    broken=1
  fi
done

exit $broken

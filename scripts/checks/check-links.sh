#!/bin/bash
# Check all internal markdown links in docs for broken references.
# Usage: bash scripts/check-links.sh
# Exit code 0 = no broken links, 1 = broken links found

cd "$(dirname "$0")/.."
DOCS_BASE="$(pwd)/src/content/docs"
broken=0

# Use process substitution instead of pipe to avoid subshell issues
while IFS=: read -r filepath linenum link; do
  url=$(echo "$link" | grep -oP '\]\(\K[^)]+')

  # Skip external links, anchors, mailto, absolute paths
  [[ "$url" =~ ^https?:// ]] && continue
  [[ "$url" =~ ^# ]] && continue
  [[ "$url" =~ ^mailto: ]] && continue
  [[ "$url" =~ ^/ ]] && continue  # Skip absolute paths (relative to site root)
  [[ -z "$url" ]] && continue
  [[ "$url" == "..." ]] && continue  # Skip placeholder ellipsis

  # Get source directory and resolve target path
  srcdir=$(dirname "$filepath")
  # Normalize the path by removing . and processing ..
  target=$(cd "$srcdir" && realpath -m -q "$url" 2>/dev/null)
  
  # If realpath failed, use basic path
  [[ -z "$target" ]] && target="$srcdir/$url"
  
  # Remove anchor and extensions for checking
  target="${target%%#*}"
  target="${target%.md}"
  target="${target%.mdx}"
  target="${target%/}"  # Remove trailing slash

  found=false
  [ -f "$target" ] && found=true
  [ -f "${target}.md" ] && found=true
  [ -f "${target}.mdx" ] && found=true
  [ -d "$target" ] && { [ -f "${target}/index.md" ] || [ -f "${target}/index.mdx" ]; } && found=true

  if [ "$found" = false ]; then
    relsrc="${filepath#$DOCS_BASE/}"
    relsrc="${relsrc#src/content/docs/}"
    echo "BROKEN: $relsrc:$linenum -> $url"
    broken=1
  fi
done < <(grep -rn -oP '\[([^\]]*)\]\(([^)]+)\)' "$DOCS_BASE" --include='*.md' --include='*.mdx')

exit $broken

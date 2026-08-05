#!/bin/bash
# Check all internal links in docs for broken references.
# Covers both markdown links [text](url) and component props (to:/href:).
# Usage: bash scripts/checks/check-links.sh
# Exit code 0 = no broken links, 1 = broken links found
#
# Requires GNU grep (-P flag) and GNU realpath (-m flag).
# Runs on Linux and macOS with GNU coreutils (brew install grep coreutils).

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
DOCS_BASE="$PROJECT_ROOT/src/content/docs"
# 从 site-config.ts 单源读取 base，去掉首尾斜杠后用于匹配带前缀的绝对路径
SITE_BASE="$(node --input-type=module -e "import('$PROJECT_ROOT/src/data/site-config.ts').then(m => console.log(m.siteConfig.base.replace(/^\//,'').replace(/\/$/,'')))" 2>/dev/null)"
if [[ -z "$SITE_BASE" ]]; then
  echo "ERROR: 无法从 site-config.ts 读取 base 配置" >&2
  exit 2
fi
broken=0

check_slug() {
  local slug="$1"
  local target="$DOCS_BASE/$slug"
  target="${target%%#*}"
  target="${target%/}"
  [ -f "$target" ] && return 0
  [ -f "${target}.md" ] && return 0
  [ -f "${target}.mdx" ] && return 0
  [ -d "$target" ] && { [ -f "${target}/index.md" ] || [ -f "${target}/index.mdx" ]; } && return 0
  return 1
}

# --- Pass 1: markdown inline links [text](url) ---
while IFS=: read -r filepath linenum link; do
  url=$(echo "$link" | grep -oP '\]\(\K[^)]+')
  [[ "$url" =~ ^https?:// ]] && continue
  [[ "$url" =~ ^# ]] && continue
  [[ "$url" =~ ^mailto: ]] && continue
  [[ -z "$url" ]] && continue
  [[ "$url" == "..." ]] && continue

  # 目录 index 页的规范链接是 .../ 形式；/index 或 /index/ 在生产环境要么 404 要么非规范
  if [[ "$url" =~ (^|/)index/?$ ]]; then
    relsrc="${filepath#"$DOCS_BASE"/}"
    echo "BROKEN: $relsrc:$linenum -> $url (链接不应以 /index 结尾，目录页请用 .../ 形式)"
    broken=1
    continue
  fi

  if [[ "$url" =~ ^/ ]]; then
    relsrc="${filepath#"$DOCS_BASE"/}"
    if [[ "$url" == "$SITE_BASE/"* ]]; then
      slug="${url#"$SITE_BASE"/}"
      if ! check_slug "$slug"; then
        echo "BROKEN: $relsrc:$linenum -> $url"
        broken=1
      fi
    else
      # 无 base 前缀的根绝对路径：markdown 链接不会被 Astro 自动加 base，
      # 在 GitHub Pages 生产环境必然 404。markdown 链接应使用相对路径。
      echo "BROKEN: $relsrc:$linenum -> $url (根绝对路径缺少 base 前缀，应改用相对路径)"
      broken=1
    fi
    continue
  fi

  srcdir=$(dirname "$filepath")
  target=$(cd "$srcdir" && realpath -m -q "$url" 2>/dev/null)
  [[ -z "$target" ]] && target="$srcdir/$url"
  target="${target%%#*}"
  target="${target%.md}"
  target="${target%.mdx}"
  target="${target%/}"

  found=false
  [ -f "$target" ] && found=true
  [ -f "${target}.md" ] && found=true
  [ -f "${target}.mdx" ] && found=true
  [ -d "$target" ] && { [ -f "${target}/index.md" ] || [ -f "${target}/index.mdx" ]; } && found=true

  if [ "$found" = false ]; then
    relsrc="${filepath#"$DOCS_BASE"/}"
    echo "BROKEN: $relsrc:$linenum -> $url"
    broken=1
  fi
done < <(grep -rn -oP '\[([^\]]*)\]\(([^)]+)\)' "$DOCS_BASE" --include='*.md' --include='*.mdx')

# --- Pass 2: component props (to: '/...' and href: '/...') ---
while IFS=: read -r filepath linenum match; do
  path=$(echo "$match" | grep -oP "(?:to|href): '\K[^']+")
  [[ -z "$path" ]] && continue
  [[ "$path" =~ ^https?:// ]] && continue
  [[ "$path" =~ ^# ]] && continue

  if [[ "$path" =~ (^|/)index/?$ ]]; then
    relsrc="${filepath#"$DOCS_BASE"/}"
    echo "BROKEN: $relsrc:$linenum -> $path (链接不应以 /index 结尾，目录页请用 .../ 形式)"
    broken=1
    continue
  fi

  slug="$path"
  if [[ "$slug" == "$SITE_BASE/"* ]]; then
    slug="${slug#"$SITE_BASE"/}"
  fi
  slug="${slug#/}"
  [[ "$slug" == img/* ]] && continue

  if ! check_slug "$slug"; then
    relsrc="${filepath#"$DOCS_BASE"/}"
    echo "BROKEN: $relsrc:$linenum -> $path"
    broken=1
  fi
done < <(grep -rn -oP "(?:to|href): '[^']+'" "$DOCS_BASE" --include='*.mdx')

exit $broken

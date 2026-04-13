import fs from 'fs';
import path from 'path';

const DOCS_DIR = '/home/shane/current/wiki-bioinfo/src/content/docs';
const brokenLinks = [];

// Get all valid doc files (both .md and .mdx)
function getAllDocFiles(dir, prefix = '') {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(prefix, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getAllDocFiles(fullPath, relPath));
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      results.push(relPath);
    }
  }
  return results;
}

const docFiles = getAllDocFiles(DOCS_DIR);

function fileExists(relPath) {
  relPath = relPath.replace(/^\//, '');
  
  // Check exact .mdx
  if (fs.existsSync(path.join(DOCS_DIR, relPath + '.mdx'))) return true;
  // Check exact .md
  if (fs.existsSync(path.join(DOCS_DIR, relPath + '.md'))) return true;
  // Check as-is (might have extension)
  if (fs.existsSync(path.join(DOCS_DIR, relPath))) return true;
  
  // Check if it's a directory index
  if (fs.existsSync(path.join(DOCS_DIR, relPath, 'index.mdx'))) return true;
  if (fs.existsSync(path.join(DOCS_DIR, relPath, 'index.md'))) return true;
  
  // Handle trailing slashes
  if (relPath.endsWith('/')) {
    const withoutSlash = relPath.slice(0, -1);
    if (fs.existsSync(path.join(DOCS_DIR, withoutSlash, 'index.mdx'))) return true;
    if (fs.existsSync(path.join(DOCS_DIR, withoutSlash, 'index.md'))) return true;
  }
  
  // Handle "section/index" -> "section/index.mdx"
  if (relPath.endsWith('/index')) {
    if (fs.existsSync(path.join(DOCS_DIR, relPath + '.mdx'))) return true;
    if (fs.existsSync(path.join(DOCS_DIR, relPath + '.md'))) return true;
  }
  
  return false;
}

function resolveRelativeLink(sourceFile, link) {
  // Remove any anchor or title
  link = link.split('#')[0];
  const sourceDir = path.dirname(sourceFile);
  const resolved = path.posix.normalize(path.posix.join(sourceDir, link));
  return resolved;
}

function suggestFix(target) {
  // Remove /index suffix for suggestion
  let clean = target.replace(/\/?index$/, '').replace(/\/+$/, '');
  
  // Try to find similar files
  const parts = clean.split('/');
  const dir = parts.slice(0, -1).join('/');
  const name = parts[parts.length - 1];
  
  for (const f of docFiles) {
    const fNoExt = f.replace(/\.(md|mdx)$/, '');
    if (fNoExt.endsWith(name) || fNoExt.includes(name)) {
      return fNoExt;
    }
  }
  return null;
}

// Extract and check links from each file
for (const docFile of docFiles) {
  const content = fs.readFileSync(path.join(DOCS_DIR, docFile), 'utf-8');
  const lines = content.split('\n');
  
  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    const line = lines[lineNum];
    
    // Pattern 1: Markdown links with relative paths: [text](./xxx) or [text](../xxx)
    const mdRelativeRegex = /\[([^\]]*)\]\((\.\/[^)]+)\)/g;
    let match;
    while ((match = mdRelativeRegex.exec(line)) !== null) {
      let link = match[2].split(' ')[0].split('"')[0];
      link = link.split('#')[0]; // Remove anchors
      const resolved = resolveRelativeLink(docFile, link);
      if (!fileExists(resolved)) {
        brokenLinks.push({
          source: docFile,
          line: lineNum + 1,
          link: match[2],
          target: resolved,
          type: 'markdown-relative'
        });
      }
    }
    
    // Pattern 2: Markdown links with /wiki-bioinfo/ prefix
    const mdWikiBioinfoRegex = /\[([^\]]*)\]\(\/wiki-bioinfo\/([^)]+)\)/g;
    while ((match = mdWikiBioinfoRegex.exec(line)) !== null) {
      let link = match[2].split(' ')[0].split('"')[0];
      link = link.split('#')[0];
      if (!fileExists(link)) {
        brokenLinks.push({
          source: docFile,
          line: lineNum + 1,
          link: match[2],
          target: link,
          type: 'markdown-/wiki-bioinfo/'
        });
      }
    }
    
    // Pattern 3: Markdown links with /wiki/ prefix (shortcut)
    const mdWikiRegex = /\[([^\]]*)\]\(\/wiki\/([^)]+)\)/g;
    while ((match = mdWikiRegex.exec(line)) !== null) {
      let link = match[2].split(' ')[0].split('"')[0];
      link = link.split('#')[0];
      if (!fileExists(link)) {
        brokenLinks.push({
          source: docFile,
          line: lineNum + 1,
          link: match[2],
          target: link,
          type: 'markdown-/wiki/'
        });
      }
    }
    
    // Pattern 4: Markdown links with /docs/ prefix (shortcut)
    const mdDocsRegex = /\[([^\]]*)\]\(\/docs\/([^)]+)\)/g;
    while ((match = mdDocsRegex.exec(line)) !== null) {
      let link = match[2].split(' ')[0].split('"')[0];
      link = link.split('#')[0];
      if (!fileExists(link)) {
        brokenLinks.push({
          source: docFile,
          line: lineNum + 1,
          link: match[2],
          target: link,
          type: 'markdown-/docs/'
        });
      }
    }
    
    // Pattern 5: to: '/wiki-bioinfo/...'
    const toWikiBioinfoRegex = /to:\s*['"]\/wiki-bioinfo\/([^'"]+)['"]/g;
    while ((match = toWikiBioinfoRegex.exec(line)) !== null) {
      let link = match[1].split('#')[0];
      if (!fileExists(link)) {
        brokenLinks.push({
          source: docFile,
          line: lineNum + 1,
          link: `to: '/wiki-bioinfo/${match[1]}'`,
          target: link,
          type: 'to:/wiki-bioinfo/'
        });
      }
    }
    
    // Pattern 6: to: '/wiki/...'
    const toWikiRegex = /to:\s*['"]\/wiki\/([^'"]+)['"]/g;
    while ((match = toWikiRegex.exec(line)) !== null) {
      let link = match[1].split('#')[0];
      if (!fileExists(link)) {
        brokenLinks.push({
          source: docFile,
          line: lineNum + 1,
          link: `to: '/wiki/${match[1]}'`,
          target: link,
          type: 'to:/wiki/'
        });
      }
    }
    
    // Pattern 7: to: '/docs/...'
    const toDocsRegex = /to:\s*['"]\/docs\/([^'"]+)['"]/g;
    while ((match = toDocsRegex.exec(line)) !== null) {
      let link = match[1].split('#')[0];
      if (!fileExists(link)) {
        brokenLinks.push({
          source: docFile,
          line: lineNum + 1,
          link: `to: '/docs/${match[1]}'`,
          target: link,
          type: 'to:/docs/'
        });
      }
    }
    
    // Pattern 8: href: '/wiki-bioinfo/...'
    const hrefWikiBioinfoRegex = /href:\s*['"]\/wiki-bioinfo\/([^'"]+)['"]/g;
    while ((match = hrefWikiBioinfoRegex.exec(line)) !== null) {
      let link = match[1].split('#')[0];
      if (!fileExists(link)) {
        brokenLinks.push({
          source: docFile,
          line: lineNum + 1,
          link: `href: '/wiki-bioinfo/${match[1]}'`,
          target: link,
          type: 'href:/wiki-bioinfo/'
        });
      }
    }
    
    // Pattern 9: href: '/wiki/...'
    const hrefWikiRegex = /href:\s*['"]\/wiki\/([^'"]+)['"]/g;
    while ((match = hrefWikiRegex.exec(line)) !== null) {
      let link = match[1].split('#')[0];
      if (!fileExists(link)) {
        brokenLinks.push({
          source: docFile,
          line: lineNum + 1,
          link: `href: '/wiki/${match[1]}'`,
          target: link,
          type: 'href:/wiki/'
        });
      }
    }
    
    // Pattern 10: href: '/docs/...'
    const hrefDocsRegex = /href:\s*['"]\/docs\/([^'"]+)['"]/g;
    while ((match = hrefDocsRegex.exec(line)) !== null) {
      let link = match[1].split('#')[0];
      if (!fileExists(link)) {
        brokenLinks.push({
          source: docFile,
          line: lineNum + 1,
          link: `href: '/docs/${match[1]}'`,
          target: link,
          type: 'href:/docs/'
        });
      }
    }
  }
}

// Sort and output
brokenLinks.sort((a, b) => a.source.localeCompare(b.source) || a.target.localeCompare(b.target));

console.log(`\n=== BROKEN LINKS REPORT ===`);
console.log(`Total broken links found: ${brokenLinks.length}\n`);

for (const bl of brokenLinks) {
  const fix = suggestFix(bl.target);
  console.log(`Source: ${bl.source}:${bl.line}`);
  console.log(`  Link: ${bl.link}`);
  console.log(`  Target: ${bl.target}`);
  console.log(`  Type: ${bl.type}`);
  if (fix) {
    console.log(`  Suggested fix: ${fix}`);
  }
  console.log('');
}

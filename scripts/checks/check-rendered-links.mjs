#!/usr/bin/env node
/**
 * 校验构建产物中的站内链接是否指向真实存在的页面/资源。
 *
 * check-links.sh 只检查源码树，无法发现"源码相对链接在渲染后按页面 URL 解析
 * 落到 404"的问题；本脚本按浏览器语义解析 dist 中每个 <a href> 并检查目标文件。
 *
 * 用法：node scripts/checks/check-rendered-links.mjs [distDir]
 * 退出码 0 = 无断链，1 = 存在断链。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(fileURLToPath(new URL('../..', import.meta.url)));
const distDir = path.resolve(process.argv[2] ?? path.join(ROOT, 'dist'));

function readBase() {
  const configPath = path.join(ROOT, 'src/data/site-config.ts');
  const source = fs.readFileSync(configPath, 'utf8');
  const match = source.match(/^\s*base:\s*'([^']+)'/m);
  if (!match) {
    throw new Error(`无法从 ${configPath} 读取 base 配置`);
  }
  const base = `/${match[1].replace(/^\/+|\/+$/g, '')}/`;
  return base === '//' ? '/' : base;
}

const SITE_BASE = readBase();

function walkHtml(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkHtml(fullPath, files);
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

function pageUrl(file) {
  const rel = path.relative(distDir, file).split(path.sep).join('/');
  if (rel === 'index.html') {
    return '/';
  }
  if (rel.endsWith('/index.html')) {
    return `/${rel.slice(0, -'index.html'.length)}`;
  }
  return `/${rel}`;
}

function decodeEntities(value) {
  return value.replace(/&amp;/g, '&').replace(/&#38;/g, '&');
}

const SKIP_RE = /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i;

function resolveTarget(pathname) {
  if (pathname.endsWith('/')) {
    return path.join(distDir, pathname, 'index.html');
  }
  const ext = path.extname(pathname);
  if (ext) {
    return path.join(distDir, pathname);
  }
  return path.join(distDir, pathname, 'index.html');
}

const broken = [];
let checked = 0;

for (const file of walkHtml(distDir)) {
  const html = fs.readFileSync(file, 'utf8');
  const from = pageUrl(file);
  const seen = new Set();

  for (const match of html.matchAll(/<a\b[^>]*?\bhref="([^"]*)"/g)) {
    const href = decodeEntities(match[1]);
    if (!href || SKIP_RE.test(href) || seen.has(href)) {
      continue;
    }
    seen.add(href);
    checked += 1;

    const url = new URL(href, `https://example.invalid${SITE_BASE}${from.replace(/^\//, '')}`);
    if (!url.pathname.startsWith(SITE_BASE)) {
      broken.push({ page: from, href, reason: `链接超出站点 base ${SITE_BASE}` });
      continue;
    }

    const target = resolveTarget(url.pathname.slice(SITE_BASE.length - 1));
    if (!fs.existsSync(target)) {
      broken.push({ page: from, href, reason: '目标文件不存在' });
    }
  }
}

if (broken.length > 0) {
  console.error(`FAIL: ${broken.length} 处渲染后断链（共检查 ${checked} 个站内链接）`);
  for (const item of broken) {
    console.error(`  ${item.page} -> ${item.href} (${item.reason})`);
  }
  process.exit(1);
}

console.log(`OK: ${checked} 个渲染后站内链接全部有效`);

#!/usr/bin/env node
/**
 * 校验构建产物中的 SEO / 社交分享元数据。
 *
 * 背景：Starlight 内置 Head 已经输出 <title>、canonical、og:title/description/
 * url/type/locale/site_name、twitter:card 等标签。覆盖层
 * src/components/overrides/Head.astro 若再次输出这些标签，会产生互相矛盾的
 * 重复 meta；同时 Starlight 渲染 <Head /> 时不传 props，从 props 读标题会让
 * 每页 og:title / twitter:title 恒为站点名。
 *
 * 本脚本检查 dist 中每个 HTML：
 *   1. 单例标签（meta property/name、canonical、title）不重复；
 *   2. og:title / twitter:title 等于页面自身的标题（<title> 去掉站点后缀），
 *      而不是站点名；
 *   3. 必需的 SEO 标签存在且各一份，描述/图片类标签内容一致。
 *
 * 用法：node scripts/checks/check-head-meta.mjs [distDir]
 * 退出码 0 = 通过，1 = 存在问题。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(fileURLToPath(new URL('../..', import.meta.url)));
const distDir = path.resolve(process.argv[2] ?? path.join(ROOT, 'dist'));
// Starlight 的 <title> 形如 `${页面标题} | ${站点标题}`，分隔符为默认值。
const TITLE_DELIMITER = ' | ';
const SITE_TITLE = readSiteTitle();

function readSiteTitle() {
  const configPath = path.join(ROOT, 'src/data/site-config.ts');
  const source = fs.readFileSync(configPath, 'utf8');
  const match = source.match(/^\s*title:\s*'([^']+)'/m);
  if (!match) {
    throw new Error(`无法从 ${configPath} 读取站点标题`);
  }
  return match[1];
}

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
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  return `/${rel}`;
}

function decodeEntities(value) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

/** 解析 <head> 中的 meta 标签，返回 key -> content[]（key 为 property 或 name）。 */
function parseMeta(head) {
  const metas = new Map();
  for (const match of head.matchAll(/<meta\b([^>]*?)\/?>/gi)) {
    const attrs = {};
    for (const attr of match[1].matchAll(/([\w:-]+)="([^"]*)"/g)) {
      attrs[attr[1].toLowerCase()] = decodeEntities(attr[2]);
    }
    const key = attrs.property ?? attrs.name;
    if (!key) continue;
    const values = metas.get(key) ?? [];
    values.push(attrs.content ?? '');
    metas.set(key, values);
  }
  return metas;
}

// 必需标签：Starlight 内置输出 + 覆盖层补充的社交标签。
const REQUIRED_META = [
  'description',
  'og:title',
  'og:description',
  'og:url',
  'og:type',
  'og:locale',
  'og:site_name',
  'og:image',
  'og:image:alt',
  'twitter:card',
  'twitter:title',
  'twitter:description',
  'twitter:image',
  'author',
  'keywords',
  'theme-color',
];

// 允许重复的 meta：Astro 与 Starlight 各输出一个 generator。
const DUPLICATE_ALLOWED = new Set(['generator']);

const issues = [];
let checked = 0;

for (const file of walkHtml(distDir)) {
  checked += 1;
  const page = pageUrl(file);
  const html = fs.readFileSync(file, 'utf8');
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? '';
  const metas = parseMeta(head);
  const addIssue = (message) => issues.push(`${page}: ${message}`);

  // 1. 单例标签不得重复
  for (const [key, values] of metas) {
    if (values.length > 1 && !DUPLICATE_ALLOWED.has(key)) {
      addIssue(`<meta ${key}> 重复 ${values.length} 次（${values.map((v) => JSON.stringify(v)).join(' / ')}）`);
    }
  }
  const canonicalCount = [...head.matchAll(/<link\b[^>]*\brel="canonical"/gi)].length;
  if (canonicalCount !== 1) addIssue(`<link rel="canonical"> 出现 ${canonicalCount} 次`);
  const titleCount = [...head.matchAll(/<title\b[^>]*>/gi)].length;
  if (titleCount !== 1) addIssue(`<title> 出现 ${titleCount} 次`);

  // 2. 必需的 meta 存在且各一份
  for (const key of REQUIRED_META) {
    const values = metas.get(key) ?? [];
    if (values.length === 0) addIssue(`缺少 <meta ${key}>`);
  }

  // 3. 页面标题与社交标题一致（页面标题 = <title> 去掉站点后缀）
  const fullTitle = decodeEntities(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '');
  const suffix = `${TITLE_DELIMITER}${SITE_TITLE}`;
  const pageTitle = fullTitle.endsWith(suffix) ? fullTitle.slice(0, -suffix.length) : fullTitle;
  for (const key of ['og:title', 'twitter:title']) {
    for (const value of metas.get(key) ?? []) {
      if (value !== pageTitle) {
        addIssue(`<meta ${key}> 为 ${JSON.stringify(value)}，应为页面标题 ${JSON.stringify(pageTitle)}`);
      }
    }
  }

  // 4. 同一信息的描述/图片标签内容一致
  const sameValue = (a, b) => {
    const av = metas.get(a) ?? [];
    const bv = metas.get(b) ?? [];
    if (av.length === 1 && bv.length === 1 && av[0] !== bv[0]) {
      addIssue(`<meta ${a}> 与 <meta ${b}> 内容不一致`);
    }
  };
  sameValue('og:title', 'twitter:title');
  sameValue('og:image', 'twitter:image');
  sameValue('og:description', 'twitter:description');
  sameValue('description', 'og:description');
}

if (issues.length > 0) {
  console.error(`FAIL: ${issues.length} 处 head 元数据问题（共检查 ${checked} 个页面）`);
  for (const issue of issues.slice(0, 30)) console.error(`  ${issue}`);
  if (issues.length > 30) console.error(`  ... 其余 ${issues.length - 30} 处省略`);
  process.exit(1);
}

console.log(`OK: ${checked} 个页面的 head 元数据均通过校验`);

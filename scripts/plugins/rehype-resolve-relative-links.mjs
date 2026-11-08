/**
 * 将 MDX 中的相对链接（./、../）解析为带 base 前缀的站点根路径。
 *
 * 背景：Astro 6 不会重写 Markdown/MDX 中的相对链接，而是原样输出 href。
 * 由于 Starlight 以目录格式构建，非 index 页面的 URL 比源文件所在目录多一层，
 * 浏览器按当前页面 URL 解析后必然 404。此插件在构建期把相对链接换算成
 * 目标文档的真实 URL，保持源文档"相对路径"的书写约定不变。
 *
 * 选项：
 * - base: 站点 base（如 '/wiki-bioinfo/'），默认 '/'。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DOCS_DIR = fileURLToPath(new URL('../../src/content/docs', import.meta.url));

function normalizeBase(base) {
  if (!base || base === '/') {
    return '';
  }
  return `/${base.replace(/^\/+|\/+$/g, '')}`;
}

/** 拆分 pathname 与 #hash/?query 后缀 */
function splitSuffix(href) {
  const index = href.search(/[?#]/);
  return index === -1 ? [href, ''] : [href.slice(0, index), href.slice(index)];
}

/** 把源文件绝对路径转换为站点内的目录格式 slug */
function sourceToSlug(sourceFile) {
  const rel = path.relative(DOCS_DIR, sourceFile).split(path.sep).join('/');
  const relNoExt = rel.replace(/\.(md|mdx)$/, '');
  if (relNoExt === 'index') {
    return '';
  }
  if (relNoExt.endsWith('/index')) {
    return `${relNoExt.slice(0, -'/index'.length)}/`;
  }
  return `${relNoExt}/`;
}

/** 解析相对链接指向的内容文件；无法解析时返回 null（保持原样） */
function resolveSourceTarget(sourceDir, pathname) {
  const target = path.resolve(sourceDir, pathname);
  // foo.mdx 与 foo/index.mdx 都会渲染到 /foo/，因此两种形式都要匹配
  const candidates = [
    `${target}.mdx`,
    `${target}.md`,
    path.join(target, 'index.mdx'),
    path.join(target, 'index.md'),
  ];

  for (const candidate of candidates) {
    if (candidate.startsWith(DOCS_DIR + path.sep) && fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

/** 递归遍历 hast，收集所有 a[href] */
function walk(node, callback) {
  if (!node || typeof node !== 'object') {
    return;
  }
  if (node.type === 'element' && node.tagName === 'a' && node.properties) {
    callback(node);
  }
  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      walk(child, callback);
    }
  }
}

export default function rehypeResolveRelativeLinks(options = {}) {
  const base = normalizeBase(options.base);

  return (tree, file) => {
    const filePath = typeof file?.path === 'string' ? file.path.replace(/\?.*$/, '') : '';
    if (!filePath) {
      return;
    }
    const sourceFile = path.resolve(filePath);
    if (!sourceFile.startsWith(DOCS_DIR + path.sep) || !/\.(md|mdx)$/.test(sourceFile)) {
      return;
    }
    const sourceDir = path.dirname(sourceFile);

    walk(tree, (node) => {
      const href = node.properties.href;
      if (typeof href !== 'string' || !/^\.\.?\//.test(href)) {
        return;
      }

      const [pathname, suffix] = splitSuffix(href);
      const target = resolveSourceTarget(sourceDir, pathname);
      if (!target) {
        return;
      }

      const slug = sourceToSlug(target);
      node.properties.href = slug ? `${base}/${slug}${suffix}` : `${base}/${suffix}`;
    });
  };
}

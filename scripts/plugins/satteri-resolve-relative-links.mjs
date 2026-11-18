/**
 * 将 MDX/Markdown 中的相对链接（./、../）解析为带 base 前缀的站点根路径。
 *
 * Sätteri 的 HAST 插件接收文档 fileURL，可以在渲染前把源文件相对路径换算为
 * Starlight 的目录格式 URL。相比在浏览器端按当前页面 URL 解析，构建期解析
 * 不会因目录型路由多一层而 404。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineHastPlugin } from 'satteri';

const DOCS_DIR = fileURLToPath(new URL('../../src/content/docs', import.meta.url));

function normalizeBase(base) {
  if (!base || base === '/') {
    return '';
  }
  return `/${base.replace(/^\/+|\/+$/g, '')}`;
}

function splitSuffix(href) {
  const index = href.search(/[?#]/);
  return index === -1 ? [href, ''] : [href.slice(0, index), href.slice(index)];
}

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

function resolveSourceTarget(sourceDir, pathname) {
  const target = path.resolve(sourceDir, pathname);
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

export default function satteriResolveRelativeLinks(options = {}) {
  const base = normalizeBase(options.base);

  return defineHastPlugin({
    name: 'satteri-resolve-relative-links',
    element: {
      filter: ['a'],
      visit(node, ctx) {
        const href = node.properties?.href;
        if (typeof href !== 'string' || !/^\.\.?\//.test(href) || !ctx.fileURL) {
          return;
        }

        const sourceFile = fileURLToPath(ctx.fileURL);
        if (!sourceFile.startsWith(DOCS_DIR + path.sep) || !/\.(md|mdx)$/.test(sourceFile)) {
          return;
        }

        const [pathname, suffix] = splitSuffix(href);
        const target = resolveSourceTarget(path.dirname(sourceFile), pathname);
        if (!target) {
          return;
        }

        const slug = sourceToSlug(target);
        ctx.setProperty(node, 'href', slug ? `${base}/${slug}${suffix}` : `${base}/${suffix}`);
      },
    },
  });
}

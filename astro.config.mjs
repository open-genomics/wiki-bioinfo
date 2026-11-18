import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { satteriKatex } from './scripts/plugins/satteri-katex.mjs';
import satteriResolveRelativeLinks from './scripts/plugins/satteri-resolve-relative-links.mjs';
import { getSidebarConfig } from './src/data/sections';
import { siteConfig } from './src/data/site-config';

export default defineConfig({
  site: siteConfig.site,
  base: siteConfig.base,
  // Astro 7 默认使用 Sätteri。它的原生 math 解析发生在 MDX 表达式解析之前，
  // 因此公式里的 {...} 不会再触发 acorn 的 JSX 表达式错误；KaTeX 通过 MDAST
  // 插件输出 HTML，相对链接通过 HAST 插件在构建期解析。
  markdown: {
    processor: satteri({
      features: { math: true },
      mdastPlugins: [satteriKatex()],
      hastPlugins: [satteriResolveRelativeLinks({ base: siteConfig.base })],
    }),
  },

  integrations: [
    starlight({
      title: siteConfig.title,
      description: siteConfig.description,
      defaultLocale: 'root',
      locales: {
        root: {
          label: '简体中文',
          lang: siteConfig.locale,
        },
      },
      logo: {
        src: './src/assets/bioinfo-logo.svg',
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: siteConfig.repoUrl,
        },
      ],
      editLink: {
        baseUrl: `${siteConfig.repoUrl}/tree/${siteConfig.contentBranch}/`,
      },
      lastUpdated: true,
      components: {
        Head: './src/components/overrides/Head.astro',
      },
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
      expressiveCode: {
        themes: ['github-dark', 'github-light'],
        styleOverrides: {
          borderRadius: '0.75rem',
          borderColor: 'var(--sl-color-gray-5)',
        },
      },
      customCss: [
        'katex/dist/katex.min.css',
        './src/styles/custom.css',
        './src/styles/katex.css',
      ],
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: `${siteConfig.base}fonts.css`,
          },
        },
      ],
      sidebar: getSidebarConfig(),
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
});

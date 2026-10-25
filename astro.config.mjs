import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { getSidebarConfig } from './src/data/sections';
import { siteConfig } from './src/data/site-config';

export default defineConfig({
  site: siteConfig.site,
  base: siteConfig.base,
  // 注意：Astro 6 已将顶层 remarkPlugins/rehypePlugins 标记为废弃，
  // 但迁移到 unified() processor 后 @astrojs/mdx 不再对 MDX 应用 remark-math，
  // 会把 $...$ 公式误当 JSX 表达式解析导致构建失败；
  // 待 Starlight/@astrojs/mdx 适配新 API 后再迁移。
  //
  // 2026-10-25 已实测 Astro 7.4.2（Sätteri 默认处理器 + @astrojs/markdown-remark
  // 兼容包）：依赖漏洞可清零，但 math-on-MDX 的上述不兼容依旧存在（含公式的 MDX
  // 页面报 acorn "Expecting Unicode escape sequence" 构建失败，影响 120+ 页面）。
  // 结论：维持 Astro 6.x + 非破坏性安全修复，待上游适配后再评估升级。
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
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

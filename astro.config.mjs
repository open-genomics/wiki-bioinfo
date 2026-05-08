import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { getSidebarConfig } from './src/data/sections.js';

const siteBase = '/wiki-bioinfo/';

export default defineConfig({
  site: 'https://lessup.github.io',
  base: siteBase,
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

  integrations: [
    starlight({
      title: 'BioInfo Wiki',
      description: '面向中文社区的生物信息学体系化知识库',
      defaultLocale: 'root',
      locales: {
        root: {
          label: '简体中文',
          lang: 'zh-CN',
        },
      },
      logo: {
        src: './src/assets/bioinfo-logo.svg',
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/LessUp/wiki-bioinfo',
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/LessUp/wiki-bioinfo/tree/master/',
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
        './src/styles/custom.css',
        './src/styles/katex.css',
      ],
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css',
          },
        },
      ],
      sidebar: getSidebarConfig(),
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
});

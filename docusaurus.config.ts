import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

const config: Config = {
  title: 'BioInfo Wiki',
  tagline: '面向中文社区的开源生物信息学知识库',
  favicon: 'img/favicon.ico',
  future: {
    v4: true,
  },
  url: 'https://lessup.github.io',
  baseUrl: '/wiki-bioinfo/',
  organizationName: 'LessUp',
  projectName: 'wiki-bioinfo',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/LessUp/wiki-bioinfo/tree/master/',
          showLastUpdateTime: true,
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en', 'zh'],
        indexBlog: false,
        docsRouteBasePath: '/docs',
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
        searchBarShortcutHint: true,
        searchBarPosition: 'right',
      },
    ],
  ],
  stylesheets: ['https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css'],
  themeConfig: {
    image: 'img/illustrations/home-hero.svg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      hideOnScroll: true,
      title: 'BioInfo Wiki',
      logo: {
        alt: 'BioInfo Wiki Logo',
        src: 'img/bioinfo-logo.svg',
      },
      items: [
        {
          to: '/docs/intro/',
          label: '开始这里',
          position: 'left',
        },
        {
          to: '/docs/foundations/',
          label: '基础与数学',
          position: 'left',
        },
        {
          to: '/docs/core-methods/',
          label: '核心方法',
          position: 'left',
        },
        {
          to: '/docs/applications/',
          label: '分析方向',
          position: 'left',
        },
        {
          to: '/docs/data-references/',
          label: '数据与资源',
          position: 'left',
        },
        {
          to: '/docs/appendix/',
          label: '附录',
          position: 'left',
        },
        {
          href: 'https://github.com/LessUp/wiki-bioinfo',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '入门',
          items: [
            { label: '项目简介', to: '/docs/intro/' },
            { label: '学习路线', to: '/docs/intro/roadmap' },
            { label: '写作规范', to: '/docs/intro/style-guide' },
            { label: '参与贡献', to: '/docs/intro/contributing' },
          ],
        },
        {
          title: '知识主干',
          items: [
            { label: '基础与数学', to: '/docs/foundations/' },
            { label: '核心方法', to: '/docs/core-methods/' },
            { label: '分析方向与案例', to: '/docs/applications/' },
            { label: '数据与资源', to: '/docs/data-references/' },
          ],
        },
        {
          title: '核心方法',
          items: [
            { label: '序列索引', to: '/docs/sequence/' },
            { label: '序列比对', to: '/docs/alignment/' },
            { label: '组装与图算法', to: '/docs/assembly/' },
            { label: '概率模型', to: '/docs/models/' },
          ],
        },
        {
          title: '社区',
          items: [
            { label: 'GitHub', href: 'https://github.com/LessUp/wiki-bioinfo' },
            { label: 'Issues', href: 'https://github.com/LessUp/wiki-bioinfo/issues' },
            { label: '附录与术语表', to: '/docs/appendix/' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} BioInfo Wiki Contributors · Open Source · Built with Docusaurus`,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'python', 'r', 'yaml', 'json', 'markdown'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

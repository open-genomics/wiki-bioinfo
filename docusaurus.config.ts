import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
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
  stylesheets: ['https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css'],
  themeConfig: {
    image: 'img/illustrations/home-hero.svg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'BioInfo Wiki',
      logo: {
        alt: 'BioInfo Wiki Logo',
        src: 'img/bioinfo-logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: '知识库',
        },
        {
          to: '/docs/intro/roadmap',
          label: '学习路线',
          position: 'left',
        },
        {
          to: '/docs/formats/',
          label: '数据格式',
          position: 'left',
        },
        {
          to: '/docs/workflows/',
          label: '工作流',
          position: 'left',
        },
        {
          to: '/docs/intro/contributing',
          label: '参与贡献',
          position: 'left',
        },
        {
          href: 'https://github.com/LessUp/wiki-bioinfo',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '学习路径',
          items: [
            {
              label: '项目简介',
              to: '/docs/intro/',
            },
            {
              label: '学习路线',
              to: '/docs/intro/roadmap',
            },
            {
              label: '工作流与案例',
              to: '/docs/workflows/',
            },
          ],
        },
        {
          title: '核心专题',
          items: [
            {
              label: '序列表示与索引',
              to: '/docs/sequence/',
            },
            {
              label: '序列比对',
              to: '/docs/alignment/',
            },
            {
              label: '数据库、注释与数据格式',
              to: '/docs/databases/',
            },
          ],
        },
        {
          title: '社区',
          items: [
            {
              label: '如何贡献',
              to: '/docs/intro/contributing',
            },
            {
              label: '写作规范',
              to: '/docs/intro/style-guide',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/LessUp/wiki-bioinfo',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} BioInfo Wiki Contributors. Built with Docusaurus.`,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: false,
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

/**
 * 站点配置 - 单一真相源
 *
 * 作为 Seam，统一管理站点级常量，供以下消费者使用：
 * - astro.config.mjs → 构建配置
 * - Head.astro → SEO 元数据
 *
 * 消除了 Head.astro 与 astro.config.mjs 之间的硬编码耦合
 */

export interface SiteConfig {
  title: string;
  description: string;
  site: string;
  base: string;
  locale: string;
  ogImage: string;
  themeColor: string;
  keywords: string;
  /** GitHub 仓库地址（供 social 链接、editLink、首页 hero 等消费） */
  repoUrl: string;
  /** 内容分支名（供 editLink 拼接源码路径） */
  contentBranch: string;
}

export const siteConfig: SiteConfig = {
  title: 'BioInfo Wiki',
  description: '面向中文社区的生物信息学体系化知识库',
  site: 'https://open-genomics.github.io',
  base: '/wiki-bioinfo/',
  locale: 'zh-CN',
  ogImage: 'img/og-image.png',
  themeColor: '#4f46e5',
  keywords: 'bioinformatics, 生物信息学, sequence analysis, genomics, algorithms, RNA-seq',
  repoUrl: 'https://github.com/open-genomics/wiki-bioinfo',
  contentBranch: 'master',
};

/**
 * 拼接 URL 片段，容忍任一侧多余的首尾斜杠
 */
function joinUrl(a: string, b: string): string {
  return `${a.replace(/\/$/, '')}/${b.replace(/^\//, '')}`;
}

/**
 * 拼接完整的站点 URL（site + base）
 */
export const siteUrl = joinUrl(siteConfig.site, siteConfig.base);

/**
 * 拼接完整的 OG 图片 URL
 */
export const ogImageUrl = joinUrl(siteUrl, siteConfig.ogImage);

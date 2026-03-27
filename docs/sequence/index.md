---
sidebar_position: 1
slug: /sequence
---

import SectionNavigator from '@site/src/components/docs/SectionNavigator';
import RelatedLinks from '@site/src/components/docs/RelatedLinks';

# 序列表示与索引

本部分关注如何把生物序列组织成可高效计算的结构。

它是比对、组装、检索和压缩等任务的共同起点。

## 这一部分在全站中的位置

这一节位于“核心方法”大板块内部，连接基础对象层和比对 / 组装算法层，是整站从“序列是什么”走向“如何在大规模数据上搜索与定位”的桥梁。

## 推荐阅读顺序

1. [k-mer 与序列表示](./kmers.md)
2. [索引结构概览](./indexing.md)
3. [精确匹配与近似匹配](./exact-vs-approximate.md)
4. [Suffix Array、BWT 与索引压缩](./suffix-array-bwt.md)
5. [FM-index](./fm-index.mdx)

## 子主题导航

<SectionNavigator
  items={[
    {
      title: 'k-mer 与序列表示',
      to: '/docs/sequence/kmers',
      description: '理解为什么局部片段可以成为索引、组装和分类任务的共同基础。',
    },
    {
      title: '索引结构概览',
      to: '/docs/sequence/indexing',
      description: '建立 suffix array、BWT、FM-index 等结构在方法图谱中的位置。',
    },
    {
      title: '精确匹配与近似匹配',
      to: '/docs/sequence/exact-vs-approximate',
      description: '理解为什么现代 read mapping 通常是搜索和扩展的组合。',
    },
    {
      title: 'Suffix Array、BWT 与索引压缩',
      to: '/docs/sequence/suffix-array-bwt',
      description: '从后缀排序和 BWT 出发，理解压缩索引的动机。',
    },
    {
      title: 'FM-index',
      to: '/docs/sequence/fm-index',
      description: '把 BWT 与 backward search 连接起来，理解高效 exact matching。',
    },
  ]}
/>

## 与其他板块的连接

<RelatedLinks
  links={[
    {
      title: '基础与数学',
      to: '/docs/foundations/',
      description: '序列表示和索引建立在对象、坐标、图与概率直觉之上。',
    },
    {
      title: '序列比对',
      to: '/docs/alignment/',
      description: '索引层是比对算法进入真实工程实现的第一站。',
    },
    {
      title: '组装与图算法',
      to: '/docs/assembly/',
      description: 'k-mer 等表示也会进一步进入组装和图建模。',
    },
  ]}
/>

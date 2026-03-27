---
sidebar_position: 1
slug: /databases
---

import SectionNavigator from '@site/src/components/docs/SectionNavigator';
import RelatedLinks from '@site/src/components/docs/RelatedLinks';

# 数据库与资源

工具和算法最终都要落回具体数据资源。

这一部分汇总学习和分析中最常见的数据库、参考资源和注释对象入口。

## 这一部分在全站中的位置

这一节属于“数据、注释与资源”大板块，重点帮助读者理解：分析结果最终会映射到哪些数据库对象、版本体系和外部资源上。

## 推荐阅读顺序

1. [常用数据库与资源](./common-resources.md)
2. [参考基因组、坐标系统与注释](../foundations/reference-and-annotation.md)
3. [常见数据格式](../formats/index.mdx)

## 子主题导航

<SectionNavigator
  items={[
    {
      title: '常用数据库与资源',
      to: '/docs/databases/common-resources',
      description: '集中了解 NCBI、Ensembl、UniProt、PDB、KEGG、GEO / SRA 等核心入口。',
    },
  ]}
/>

## 与其他板块的连接

<RelatedLinks
  links={[
    {
      title: '数据、注释与资源',
      to: '/docs/data-references/',
      description: '先从上层入口理解参考、格式、数据库三者为什么应该一起看。',
    },
    {
      title: '参考基因组、坐标系统与注释',
      to: '/docs/foundations/reference-and-annotation',
      description: '数据库对象和参考体系必须与坐标系统和版本选择一起理解。',
    },
    {
      title: '常见数据格式',
      to: '/docs/formats/',
      description: '很多数据库资源最终都通过特定文件格式进入分析流程。',
    },
  ]}
/>

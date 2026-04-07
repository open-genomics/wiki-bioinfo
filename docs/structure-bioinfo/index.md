---
sidebar_position: 1
slug: /structure-bioinfo
---

import SectionNavigator from '@site/src/components/docs/SectionNavigator';

# 结构生物信息学

结构生物信息学研究蛋白质、RNA 与复合体的三维结构如何被预测、比较和解释。它连接了序列、进化、物理约束与功能机制。

## 这一部分讲什么

本章聚焦：

- 蛋白结构的基本层次；
- AlphaFold 与现代结构预测；
- 结构比对与 fold 概念。

## 为什么重要

- 相似序列不一定意味着完全相同功能，但结构往往更接近功能层；
- 很多致病变异、活性位点和结合位点只能放到三维结构中更好解释；
- 结构预测显著改变了蛋白功能注释与假设生成方式。

## 推荐阅读顺序

1. [蛋白结构基础](./protein-structure-basics.md)
2. [AlphaFold 与结构预测](./alphafold-and-structure-prediction.md)
3. [结构比对与 fold](./structure-alignment-and-fold.md)

## 子主题导航

<SectionNavigator
  items={[
    {
      title: '蛋白结构基础',
      to: '/docs/structure-bioinfo/protein-structure-basics',
      description: '理解一级到四级结构、domain、motif 与稳定性来源。',
    },
    {
      title: 'AlphaFold 与结构预测',
      to: '/docs/structure-bioinfo/alphafold-and-structure-prediction',
      description: '理解现代结构预测的输入、输出、置信度与局限。',
    },
    {
      title: '结构比对与 fold',
      to: '/docs/structure-bioinfo/structure-alignment-and-fold',
      description: '从 RMSD、TM-score 到 fold family，理解结构相似性的比较方式。',
    },
  ]}
/>

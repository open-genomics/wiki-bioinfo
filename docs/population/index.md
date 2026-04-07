---
sidebar_position: 1
slug: /population
---

import SectionNavigator from '@site/src/components/docs/SectionNavigator';

# 群体遗传学

群体遗传学研究等位基因频率如何在群体中分布、变化并被自然选择、遗传漂变、迁移和重组塑造。

## 这一部分讲什么

本章聚焦人群尺度和种群尺度的数据分析，包括：

- Hardy–Weinberg 平衡；
- 连锁不平衡（LD）与重组；
- GWAS 的统计框架；
- 群体结构、PCA 与祖源分析。

## 为什么重要

- 很多变异解释不能只看单个位点，还要放到人群背景里；
- 群体结构会影响 GWAS 假阳性；
- LD 决定了变异之间的相关性，也是 fine-mapping 的基础。

## 推荐阅读顺序

1. [Hardy–Weinberg 平衡](./hardy-weinberg.md)
2. [连锁不平衡](./linkage-disequilibrium.md)
3. [GWAS](./gwas.md)
4. [群体结构](./population-structure.md)

## 子主题导航

<SectionNavigator
  items={[
    {
      title: 'Hardy–Weinberg 平衡',
      to: '/docs/population/hardy-weinberg',
      description: '理解基因型频率、等位基因频率与偏离平衡的原因。',
    },
    {
      title: '连锁不平衡',
      to: '/docs/population/linkage-disequilibrium',
      description: '理解 LD、重组、haplotype block 与 tag SNP。',
    },
    {
      title: 'GWAS',
      to: '/docs/population/gwas',
      description: '从关联检验到 Manhattan plot 和群体校正。',
    },
    {
      title: '群体结构',
      to: '/docs/population/population-structure',
      description: 'PCA、ADMIXTURE 与群体分层校正。',
    },
  ]}
/>

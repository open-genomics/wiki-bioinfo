---
sidebar_position: 1
slug: /multi-omics
---

import SectionNavigator from '@site/src/components/docs/SectionNavigator';

# 多组学整合

多组学整合试图把 DNA、RNA、蛋白、表观组和空间/单细胞等不同层次的数据联合起来，建立比单一组学更完整的生物学解释。

## 这一部分讲什么

本章聚焦：

- 多组学整合的基本策略；
- 批次效应与 harmonization；
- 单细胞 multiome；
- 整合算法：矩阵分解、图方法与深度学习。

## 为什么重要

- 同一个系统在 DNA、RNA、protein 和 chromatin 层面会呈现不同信号；
- 单一组学常只能看到结果或局部机制；
- 整合分析更接近真实调控链条，但也更容易被批次和技术差异误导。

## 推荐阅读顺序

1. [整合策略](./integration-strategies.md)
2. [批次效应与 harmonization](./batch-effect-and-harmonization.md)
3. [单细胞 multiome](./single-cell-multiome.md)
4. [整合算法概览](./integration-algorithms.md)
5. [详细算法](#详细算法)

## 子主题导航

<SectionNavigator
  items={[
    {
      title: '整合策略',
      to: '/docs/multi-omics/integration-strategies',
      description: '理解早期整合、中期整合和后期整合等常见思路。',
    },
    {
      title: '批次效应与 harmonization',
      to: '/docs/multi-omics/batch-effect-and-harmonization',
      description: '理解技术差异、批次校正与整合评估。',
    },
    {
      title: '单细胞 multiome',
      to: '/docs/multi-omics/single-cell-multiome',
      description: '理解同一细胞中联合测 RNA 与 ATAC 等多模态数据。',
    },
    {
      title: '整合算法',
      to: '/docs/multi-omics/integration-algorithms',
      description: '矩阵分解、图方法与深度学习等多组学整合核心算法。',
    },
  ]}
/>

## 详细算法

以下页面提供多组学整合核心算法的详细教材式讲解：

- [联合非负矩阵分解（Joint NMF）](./joint-nmf.md)：通过共享基矩阵实现多组学数据的低维对齐
- [典型相关分析（CCA）](./canonical-correlation-analysis.md)：寻找两组变量间的最大相关性
- [MOFA+](./mofa-plus.md)：基于贝叶斯因子分析的多组学整合方法，可处理缺失数据
- [相似性网络融合（SNF）](./similarity-network-fusion.md)：通过迭代融合多组学相似性网络

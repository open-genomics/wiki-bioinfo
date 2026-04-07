---
sidebar_position: 1
slug: /single-cell
---

import SectionNavigator from '@site/src/components/docs/SectionNavigator';

# 单细胞组学

单细胞测序技术把"整体"打散成"个体"——让我们能在细胞分辨率下看到转录组、表观组甚至基因组的异质性。

## 这一部分讲什么

传统 bulk RNA-seq 给出的是样本中所有细胞的平均信号，而单细胞 RNA-seq（scRNA-seq）能为每个细胞独立建库、测序，揭示细胞类型、发育轨迹和稀有亚群。

本章覆盖从测序原理、数据预处理，到细胞聚类、降维、轨迹推断的核心方法。

## 为什么重要

- **细胞异质性**：肿瘤、大脑和免疫系统都包含高度异质的细胞亚群，bulk 平均无法呈现。
- **发育轨迹**：scRNA-seq 可以在"伪时间"上推断细胞从前体到终态的分化路径。
- **细胞通讯**：配体–受体分析让我们理解不同细胞间的信号交流。

## 推荐阅读顺序

1. [scRNA-seq 总览](./scrna-seq-overview.md)
2. [细胞 Barcode 与 UMI](./cell-barcode-umi.md)
3. [聚类与 UMAP 降维](./clustering-and-umap.md)
4. [轨迹推断](./trajectory-analysis.md)

## 子主题导航

<SectionNavigator
  items={[
    {
      title: 'scRNA-seq 总览',
      to: '/docs/single-cell/scrna-seq-overview',
      description: '测序原理、实验流程与标准分析管道概述。',
    },
    {
      title: '细胞 Barcode 与 UMI',
      to: '/docs/single-cell/cell-barcode-umi',
      description: 'Barcode 去重、UMI 计数与 count matrix 的生成。',
    },
    {
      title: '聚类与 UMAP 降维',
      to: '/docs/single-cell/clustering-and-umap',
      description: '主成分分析、Leiden/Louvain 聚类与 UMAP 可视化。',
    },
    {
      title: '轨迹推断',
      to: '/docs/single-cell/trajectory-analysis',
      description: '伪时间、RNA velocity 与细胞分化路径分析。',
    },
  ]}
/>

## 与其他板块的连接

- 数据预处理依赖 [测序质控](../workflows/qc-overview.md)；
- 差异表达分析参见 [转录组章节](../transcriptomics/differential-expression.mdx)；
- 与组织定位结合可继续看 [空间转录组](../spatial/index.md)；
- 聚类算法基础见 [系统发育与聚类](../phylogeny/hierarchical-clustering.md)。

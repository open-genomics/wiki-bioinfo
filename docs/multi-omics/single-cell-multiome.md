---
sidebar_position: 4
description: 单细胞多模态数据，如 RNA+ATAC 联合测量与分析。
---

# 单细胞 multiome

## 是什么

单细胞 multiome 指在同一细胞层面同时获取两种或多种模态，例如：

- RNA + ATAC
- RNA + protein（CITE-seq）
- RNA + chromatin

这和“分别做两个实验再整合”不同，因为它们天然共享同一个细胞索引。

<figure>
  <img src="/wiki-bioinfo/img/illustrations/single-cell-multiome.svg" alt="single-cell multiome" />
  <figcaption>单细胞 multiome 让我们能在同一细胞中同时观察转录状态和调控状态，从而更直接地连接基因表达与开放染色质。</figcaption>
</figure>

## 为什么重要

它可以更直接回答：

- 某个开放染色质变化是否伴随目标基因表达变化？
- 哪些调控元件可能驱动某类细胞状态？
- 单细胞状态转换在多个模态中是否一致？

## 分析难点

- 不同模态噪声分布不同；
- RNA 与 ATAC 的稀疏度差异很大；
- 同一细胞的多模态不一定完全同步；
- 模态权重设置会显著影响聚类与表示学习。

## 常见误区

- **同一细胞多模态就没有批次问题**：仍然有技术差异；
- **RNA 和 ATAC 一定一一对应**：调控变化和表达变化可能存在时间滞后；
- **多模态一定优于单模态**：也要看问题与数据质量。

## 相关页面

- [单细胞组学](../single-cell/index.md)
- [表观基因组学](../epigenomics/index.md)
- [整合策略](./integration-strategies.md)

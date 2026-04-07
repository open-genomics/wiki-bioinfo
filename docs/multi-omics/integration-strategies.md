---
sidebar_position: 2
description: 多组学整合中的常见策略与问题定义。
---

# 整合策略

## 核心问题

多组学整合不是简单把多个矩阵拼起来，而是要先想清楚：

- 这些数据是否来自同一样本、同一细胞或同一病人？
- 我们要回答的是预测问题、分群问题，还是机制解释问题？
- 不同组学的噪声、维度和缺失模式差异有多大？

<figure>
  <img src="/wiki-bioinfo/img/illustrations/multiomics-integration.svg" alt="multi-omics integration" />
  <figcaption>多组学整合常常发生在 DNA → RNA → 蛋白 → 表型的多层链条上，核心挑战是让不同层次的数据进入同一个可比较的表示空间。</figcaption>
</figure>

## 常见策略

### 早期整合（early integration）

直接把特征拼接后送入同一个模型。优点是简单，缺点是不同组学尺度差异大、缺失值麻烦。

### 中期整合（intermediate integration）

先为每种组学学习低维表示，再在共享表示空间中整合。现代方法多采用这一思路。

### 后期整合（late integration）

先分别分析每种组学，再整合结果层证据。优点是解释清晰，缺点是跨组学交互利用不足。

## 常见误区

- **组学越多越好**：如果问题不清晰，更多数据只会增加噪声；
- **整合就是拼接矩阵**：往往不够；
- **所有组学都该强行映射到统一空间**：有些时候结果层整合更合理。

## 相关页面

- [批次效应与 harmonization](./batch-effect-and-harmonization.md)
- [单细胞 multiome](./single-cell-multiome.md)
- [单细胞组学](../single-cell/index.md)
- [表观基因组学](../epigenomics/index.md)

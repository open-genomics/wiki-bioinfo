---
description: RNA-seq 中 TPM/FPKM/CPM 与 effective length 的定义与直觉。
title: "TPM、FPKM、CPM 与有效长度"
---


## 是什么

在 RNA-seq 中，“表达量”常用不同单位表示：

- **counts**：原始 read 或 fragment 计数；
- **CPM**（counts per million）：按测序深度归一化的计数；
- **FPKM**（fragments per kilobase per million）：按转录本长度和测序深度归一化；
- **TPM**（transcripts per million）：先按长度归一化，再按样本内总量归一化。

这些单位背后隐含了不同的假设和“比较方式”，理解它们的关系有助于解释表达矩阵。

## 为什么重要

原始 counts 受多种因素影响：

- 样本的总测序深度；
- 基因/转录本的长度；
- 文库复杂度和技术噪声。

如果直接比较 counts：

- 长基因天然得到更多 reads；
- 深度更高的样本整体 counts 更大。

因此，需要先做至少两类归一化：

1. 按测序深度归一化；
2. 按序列长度归一化。

## 核心概念

### CPM

**CPM（counts per million）** 是最简单的一种：

- 先计算每个样本的总计数；
- 再把每个基因的 counts 除以总计数并乘以一百万。

适合：

- 粗略比较同一任务中不同基因的表达；
- 做简单过滤（例如去掉 CPM 太低的基因）。

### FPKM

**FPKM** 试图进一步把基因长度纳入考虑：

- 先按长度（kb）对 counts 做归一化；
- 再按测序深度（per million fragments）归一化。

它试图回答：“在同样深度下，单位长度上的表达有多高？”

### TPM

**TPM** 改变了归一化顺序：

1. 先按长度对每个转录本的 counts 做归一化；
2. 再在样本内把所有归一化值加总并 rescale 到一百万。

这样带来的好处是：

- 不同样本之间的 TPM 总和相同；
- 更易于跨样本对比表达份额（相对量）。

### 有效长度（effective length）

在真实 RNA-seq 数据中，有效能够产生 reads 的长度往往不是简单的转录本长度，还会受到：

- read 长度；
- 序列两端不能完整覆盖的区域；
- 某些区域质量低或难以比对；

等因素影响。

因此很多定量方法会使用**有效长度**来让长度归一化更接近真实可观测表达。

## worked example

如果两个转录本真实分子数相近，但其中一个长度是另一个的两倍，那么更长的转录本通常会捕获更多 reads。

这说明：

- 直接比较 counts 会偏向长转录本；
- TPM / FPKM 试图纠正这种偏差；
- 差异分析时仍通常回到原始 counts 配合合适统计模型。

## 与真实工具或流程的连接

- 做下游差异分析时，通常使用的是**原始 counts**，而不是直接在 TPM 上做检验；
- 做可视化和样本间粗略比较时，更常使用 TPM 或 log-TPM；
- CPM 常用于过滤或简单 QC；
- effective length 常由定量工具在内部建模，而不是手工直接指定。

## 常见误区

- 不加说明地混用 FPKM、TPM 和 CPM；
- 直接在 TPM 上做简单 t-test；
- 把 TPM 理解成“绝对分子数”；
- 忽略 effective length 对转录本层定量的影响。

## 相关页面

- [RNA-seq 工作流概览](../workflows/rna-seq.md)
- [Pseudo-alignment 与表达定量](./pseudo-alignment-and-quantification.mdx)
- [差异表达分析](./differential-expression.mdx)
- [数据库与资源](../databases/common-resources.md)

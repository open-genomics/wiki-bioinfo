---
sidebar_position: 4
description: 空间去卷积、细胞类型映射与单细胞参考整合。
---

# 去卷积与细胞映射

## 核心问题

一个空间 spot 里常常混有多个细胞类型。去卷积（deconvolution）要回答的是：

- 这个 spot 里可能包含哪些细胞类型？
- 每种细胞类型大概占多少比例？

## 基本思路

通常先有一个来自 scRNA-seq 的参考表达谱，再把空间 spot 表达写成多个参考细胞类型的线性组合：

$$y_{spot} \approx \sum_k w_k \mu_k$$

其中：

- $\mu_k$ 是第 $k$ 类细胞的参考表达；
- $w_k$ 是该细胞类型在 spot 中的权重。

## 常见工具

- RCTD
- cell2location
- SPOTlight
- Tangram

不同工具的差异主要在：

- 统计模型（线性、贝叶斯、生成式）；
- 是否显式建模捕获效率和平台差异；
- 是输出比例，还是直接做单细胞到空间位置的映射。

## 结果如何解释

去卷积结果通常比“这个 spot 就是某细胞类型”更谨慎，它更像：

- spot A：T cell 0.4 + macrophage 0.3 + stromal 0.3

这在肿瘤微环境和组织边界区尤其常见。

## 常见误区

- **去卷积比例就是精确细胞数**：通常只是相对贡献估计；
- **参考 scRNA-seq 越大越好**：如果参考批次或组织背景不匹配，反而会误导；
- **每个 spot 一定有清晰主导细胞类型**：很多区域本来就是混合态。

## 相关页面

- [空间转录组总览](./spatial-transcriptomics-overview.md)
- [spot 与单细胞](./spot-vs-single-cell.md)
- [单细胞组学](../single-cell/index.md)

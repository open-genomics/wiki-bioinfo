---
sidebar_position: 4
description: label-free、TMT 和蛋白丰度比较的基本思路。
---

# 定量蛋白质组学

## 核心问题

蛋白鉴定告诉我们“有哪些蛋白”，而定量分析要进一步回答：

- 哪些蛋白在条件 A 和 B 间发生变化？
- 变化幅度有多大？
- 这些变化是否稳定且可重复？

## 常见策略

### Label-free quantification

不加同位素标签，直接比较不同样本中 peptide / protein 的峰面积或谱图强度。

优点：流程灵活；缺点：批次和运行间变异更难控制。

### TMT / iTRAQ

用同位素标签把多个样本混合后一起上机测量，在同一 run 中比较相对丰度。

优点：多路复用；缺点：存在 ratio compression 等问题。

## 从 peptide 到 protein

定量往往先发生在 peptide 层，再汇总到 protein 层。但这一步并不简单，因为：

- 不同 peptide 的响应不同；
- 有些 peptide 被多个 protein 共享；
- 缺失值和批次效应很常见。

## 常见误区

- **protein fold change 直接等于 peptide fold change**：中间有汇总与缺失处理；
- **缺失值就是 0**：蛋白质组学中的 missingness 常有复杂来源；
- **多重检验在蛋白质组里不重要**：差异蛋白分析同样需要 FDR 控制。

## 相关页面

- [质谱基础](./mass-spectrometry-basics.md)
- [数据库搜索与 FDR](./database-search-and-fdr.md)

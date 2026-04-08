---
description: 蛋白结构的层次、domain、motif 与功能解释基础。
title: "蛋白结构基础"
---


## 是什么

蛋白质不是一条简单的氨基酸字符串。它在细胞环境中会折叠成特定的三维结构，而结构又强烈影响：

- 活性位点是否形成；
- 是否能结合底物、DNA、RNA 或其他蛋白；
- 稳定性、可溶性和动态变化。

<figure>
  <img src="/wiki-bioinfo/img/illustrations/protein-folding.svg" alt="protein folding basics" />
  <figcaption>蛋白从一级序列到局部二级结构、再到整体折叠和多亚基复合体，功能通常依赖三维构象而不是线性序列本身。</figcaption>
</figure>

## 结构层次

- **一级结构**：氨基酸序列；
- **二级结构**：α-helix、β-sheet、loop；
- **三级结构**：单条多肽链的整体折叠；
- **四级结构**：多个亚基形成复合体。

## domain 与 motif

### motif

motif 更偏局部模式：

- 一段短序列或局部结构反复出现；
- 常与催化、结合或修饰位点相关。

### domain

domain 是更大的结构/功能单元：

- 常能相对独立折叠；
- 一个蛋白可包含多个 domain；
- 蛋白功能经常来自多个 domain 的组合。

## 为什么结构比序列更接近功能

两个蛋白的序列可能差别较大，但如果折叠到类似三维结构、保留关键活性位点，它们仍可能执行相近功能。这也是为什么远缘同源常常更容易在结构层被发现。

## 常见误区

- **同一序列只对应一个固定结构**：很多蛋白具有构象变化甚至无序区域；
- **结构相似就一定功能相同**：还要看活性位点、结合表面和上下文；
- **低复杂度或无序区不重要**：它们在调控和相互作用中常常很关键。

## 相关页面

- [AlphaFold 与结构预测](./alphafold-and-structure-prediction.md)
- [结构比对与 fold](./structure-alignment-and-fold.md)
- [蛋白质组学](../proteomics/index.md)

---
sidebar_position: 3
description: 加法系统发育（additive phylogeny）的假设、距离矩阵条件与树重建直觉。
pagination_label: 加法系统发育
---

# 加法系统发育（Additive Phylogeny）

## 是什么

加法系统发育关注的是这样一个问题：

> 如果一组样本之间的距离矩阵正好来自某棵带边权的树，那么能否把这棵树重建出来？

这里的“加法”指的是：

- 任意两个叶子之间的距离，等于它们在树上路径边权之和；
- 如果一张距离矩阵满足这种性质，就称它是 **additive**。

## 为什么重要

这类问题提供了一个非常清晰的桥梁：

- 一边是数据层的“距离矩阵”；
- 一边是结构层的“系统发育树”；
- 中间的关键假设是：距离可以被树结构完全解释。

在真实数据中，这个假设通常只是近似成立，但它仍然是理解 distance-based phylogeny 的重要理想模型。

## additive matrix 的直觉

如果一张距离矩阵是 additive，那么：

- 不同物种之间的距离不是随意给出的；
- 它们之间存在一棵潜在树，使这些距离都能由树上路径长度解释；
- 因此树结构在某种意义上被“编码”进了矩阵里。

这也是为什么 additive phylogeny 常被当作一个很有教材价值的算法问题：

- 目标明确；
- 假设清晰；
- 可以展示如何从距离恢复树。

## 四点条件与树一致性直觉

在教材里，一个常见判断工具是四点条件（four-point condition）的直觉：

- 对任意 4 个叶子，比较三种成对距离和；
- 如果矩阵真来自一棵树，这些和之间会满足特定关系；
- 这种关系帮助判断距离矩阵是否“树一致”。

不需要死记公式，关键是理解：

- additive 矩阵不是任意矩阵；
- 树结构会对距离组合施加约束。

## 构造思路

一种典型的递归思路是：

1. 找到一个叶子，把它临时“摘掉”；
2. 在剩余样本的距离矩阵上递归构建树；
3. 再根据该叶子与其他叶子的距离，把它接回树上的合适位置；
4. 最终恢复整棵树。

这类算法的重点不在代码实现，而在于：

- 距离矩阵里已经包含了叶子应当接回的位置和边长信息；
- additive 假设让这种递归是可行的。

## 与邻接法和 UPGMA 的区别

- **UPGMA**：
  - 更偏聚类；
  - 还要求分子钟/ultrametric 假设；
- **Neighbor Joining**：
  - 更通用，适合近似 distance-based tree reconstruction；
- **Additive phylogeny**：
  - 假设输入矩阵本身就是树精确生成的；
  - 更偏“理想化、可精确恢复”的算法问题。

因此，加法系统发育更像 distance-based phylogeny 的“理论骨架”。

## 在真实分析中的位置

现实中的距离矩阵通常：

- 会受噪声影响；
- 不完全满足 additive 假设；
- 也可能受模型偏差和对齐误差影响；

所以真实工具更常使用 neighbor joining、maximum likelihood 等更鲁棒或更灵活的方法。

但 additive phylogeny 仍然很重要，因为它帮助我们理解：

- 什么时候“距离 → 树”是理论上可恢复的；
- 树结构到底怎样反映在距离矩阵中。

## 相关页面

- [距离方法概览](./distance-methods.md)
- [Parsimony](./parsimony.md)
- [Maximum Likelihood](./maximum-likelihood.md)
- [多序列比对（MSA）](../alignment/multiple-sequence-alignment.md)

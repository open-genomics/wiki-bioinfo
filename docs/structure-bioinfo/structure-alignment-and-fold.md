---
sidebar_position: 4
description: RMSD、TM-score、fold 与结构相似性比较的基础。
---

# 结构比对与 fold

## 核心问题

序列比对问的是“字符是否相似”，结构比对更关心：

- 两个蛋白的三维形状是否相近？
- 它们是否共享类似 fold 或 domain architecture？
- 这种相似性是全局的，还是只限于局部结构域？

## 常见指标

### RMSD

RMSD 衡量对应原子之间的平均偏差，但它：

- 对局部大偏差很敏感；
- 受蛋白长度影响明显；
- 更适合比较已知对应关系下的接近程度。

### TM-score

TM-score 尝试减少长度依赖，更适合比较整体 fold 是否相似。在远缘结构比较中通常比 RMSD 更稳健。

## fold 的概念

fold 可以粗略理解为蛋白主链的总体拓扑组织方式。它不只是“长得像”，而是更接近：

- 二级结构如何排列；
- domain 如何组织；
- 是否共享同类结构骨架。

## 常见误区

- **RMSD 小就一定同源**：还需结合长度、比对覆盖范围和生物学背景；
- **结构相似一定来自共同祖先**：也可能有功能收敛；
- **只看全局分数**：很多功能只依赖局部 pocket 或 interface。

## 相关页面

- [蛋白结构基础](./protein-structure-basics.md)
- [AlphaFold 与结构预测](./alphafold-and-structure-prediction.md)
- [系统发育与进化](../phylogeny/index.md)

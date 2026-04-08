---
description: suffix tree 的核心直觉：从 suffix trie 压缩得到高效子串查询结构。
title: "Suffix Tree"
---


## 是什么

Suffix tree 是一种为单个长文本构建的索引结构，它的目标是：

> 让大量子串查询变得高效。

可以把它理解为：

- 先把文本的所有后缀组织成一棵 suffix trie；
- 再把其中所有“只有单一路径的链”压缩掉；
- 得到一棵空间上更合理、查询上更高效的结构。

## 从 suffix trie 到 suffix tree

假设文本为：

```text
BANANA$
```

如果枚举所有后缀：

- `BANANA$`
- `ANANA$`
- `NANA$`
- `ANA$`
- `NA$`
- `A$`
- `$`

把它们全部插入 trie，就得到一棵 **suffix trie**：

- 每个后缀对应一条从根出发的路径；
- 共享前缀的后缀会共用前面的边；
- 但很多节点只是线性链，空间浪费大。

**Suffix tree** 就是在这个基础上进一步压缩：

- 把连续的单分支路径合并成一条边；
- 边标签变成一个子串区间，而不是单个字符；
- 从而在保持查询能力的同时减少节点数。

## 为什么它重要

Suffix tree 支持很多经典字符串查询，例如：

- pattern 是否出现；
- pattern 出现在哪些位置；
- 最长重复子串；
- 最长公共子串；
- 某些家族级字符串比较问题。

也就是说，它不是只解决一个问题，而是一个“可回答多种子串问题”的通用索引骨架。

## 查询的直觉

如果要查一个模式 `P`：

- 从根开始，沿边标签逐字符匹配；
- 如果整个模式都能沿着某条路径匹配完成，则说明 `P` 出现在文本中；
- 最终所在的子树叶子对应的后缀起点，给出所有出现位置。

与朴素扫描不同，这里利用的是：

- 文本已经被整体预处理；
- 所有后缀共享前缀结构；
- 查询只需在树上走一遍，而不必在文本每个位置重新尝试。

## 与 suffix array 的关系

Suffix tree 和 suffix array 都是在组织“所有后缀”的结构，只是表达方式不同：

- **Suffix tree**：树结构，查询直觉强，功能丰富；
- **Suffix array**：数组结构，更紧凑，更接近实际工程实现；
- **BWT / FM-index**：进一步把 suffix-based 思想推进到压缩和高效查询。

因此可以把它们看成一条连续的技术演化路线：

```text
suffix trie -> suffix tree -> suffix array -> BWT / FM-index
```

## 在生物信息学中的位置

Suffix tree 对教材和算法理解非常重要，因为它提供了：

- 多种子串问题的统一视角；
- 从“所有后缀”到“共享前缀压缩”的结构化思路；
- 对后续 suffix array/BWT/FM-index 的直观桥梁。

在现代工程里，人们更常用 suffix array 或 FM-index，但 suffix tree 仍然是理解这些结构最自然的中间站。

## 常见误区

### Suffix tree 已经过时，不用学

不是。虽然工程上常用更紧凑的结构，但 suffix tree 对理解字符串索引的核心思想非常重要。

### Suffix tree 和 trie 是两种完全无关的结构

不对。Suffix tree 正是由 suffix trie 压缩而来。

## 相关页面

- [精确字符串匹配](./exact-string-matching.md)
- [Trie 与多模式匹配](./trie-and-multi-pattern-matching.md)
- [Suffix Array、BWT 与索引压缩](./suffix-array-bwt.md)
- [FM-index](./fm-index.mdx)

---
sidebar_position: 3
---

# Suffix Array、BWT 与索引压缩

## 是什么

当参考序列越来越长、query 数量越来越多时，逐字符从头扫描显然不够快。Suffix array 和 Burrows–Wheeler Transform（BWT）是现代序列索引的核心桥梁：前者帮助我们把“所有后缀”组织成有序结构，后者进一步支持压缩和高效匹配。

## 要解决什么生物信息学问题

在 read mapping、数据库搜索和海量参考序列检索中，我们需要回答：

- 一个 pattern 是否出现在参考中；
- 如果出现，可能出现在哪些位置；
- 如何在不保存巨大冗余索引的情况下仍然快速搜索。

Suffix array 与 BWT 的价值就在于：它们让“快速搜索”和“空间压缩”可以兼得。

## 输入与输出

- 输入：参考序列 `T`
- 中间结构：suffix array、BWT 字符串、rank/select 或类似辅助结构
- 输出：可支持 exact matching、再进一步支持 approximate matching 的索引骨架

## 核心思想 / 数学模型

### Suffix array

把一个字符串 `T` 的所有后缀按字典序排序，并记录它们在原串中的起始位置。

如果我们想找一个 pattern `P`，就可以在这些后缀中做区间查找，而不必在整个原串上逐一尝试。

### BWT

BWT 可以看成：在所有循环位移排序之后，取每一行的最后一个字符组成的新串。

它的重要意义不在“变换后更好看”，而在于：

- 相同上下文的字符容易聚在一起；
- 更适合压缩；
- 可以配合 backward search 做高效匹配。

## worked example

对一个很短的示意串，可以这样理解：

1. 枚举所有后缀；
2. 按字典序排序；
3. 得到 suffix array；
4. 再从排序矩阵构造 BWT；
5. 用 pattern 的最后一个字符开始，逐步收缩候选区间。

真正重要的不是手算每个字符，而是理解：

- 排序后的后缀形成了“连续区间”；
- BWT + backward search 让我们可以用区间更新替代逐位置比对。

## 与真实工具或流程的连接

BWT 和 suffix array 是很多经典 read mapping 工具背后的索引思想核心。即使工程实现各不相同，它们通常都依赖这样的事实：

- 参考序列可以先被预处理成压缩索引；
- 搜索过程主要是在索引上缩小候选区间；
- 精确定位后，再结合更复杂的策略处理 mismatch / gap。

## 常见误区

### suffix array 只是一个理论结构

不是。它和 BWT 一起构成了现代序列搜索系统的工程基础之一。

### 有了 BWT 就直接解决 approximate matching

不对。BWT 更擅长支持 exact matching；允许错配、gap 和更复杂评分时，还需要额外策略。

### 压缩索引只是为了省内存

也不止如此。压缩索引不仅减少空间，也改变了搜索过程的组织方式。

## 相关页面

- [索引结构概览](./indexing.md)
- [FM-index](./fm-index.mdx)
- [精确匹配与近似匹配](./exact-vs-approximate.md)
- [Seed-and-extend](../alignment/seed-and-extend.md)

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

- 输入：参考序列 `T`（通常在末尾加一个特殊终止符 `$`，且 `$` 在字典序上最小）；
- 中间结构：suffix array、BWT 字符串、C/Occ 等辅助数组；
- 输出：可支持 exact matching、再进一步支持 approximate matching 的索引骨架。

## 核心思想 / 数学模型

### Suffix array

把一个字符串 `T` 的所有后缀按字典序排序，并记录它们在原串中的起始位置。

如果我们想找一个 pattern `P`，就可以在这些后缀中做区间查找，而不必在整个原串上逐一尝试。

### BWT

BWT 可以看成：在所有循环位移排序之后，取每一行的最后一个字符组成的新串。

<figure>
  <img src="/wiki-bioinfo/img/illustrations/bwt-construction.svg" alt="BWT 构造示意图" />
  <figcaption>BWT 通过重排把相似上下文的字符聚到一起，是 FM-index 压缩与 backward search 的基础。</figcaption>
</figure>

它的重要意义不在“变换后更好看”，而在于：

- 相同上下文的字符容易聚在一起；
- 更适合压缩；
- 可以配合 backward search 做高效匹配。

## worked example：从 suffix array 到 BWT

考虑一个示意串：

```text
T = "GATTACA$"
```

1. 列出所有后缀及其起点索引：

```text
0: GATTACA$
1: ATTACA$
2: TTACA$
3: TACA$
4: ACA$
5: CA$
6: A$
7: $
```

2. 按字典序排序这些后缀，并记录起始位置（suffix array）：

```text
SA  后缀
7   $
4   ACA$
6   A$
1   ATTACA$
5   CA$
0   GATTACA$
3   TACA$
2   TTACA$
```

3. 构造 BWT：对排序后的每一行，取“该后缀起始位置左边的那个字符”（对起点在 0 的后缀，左边视为最后一个字符）：

```text
行  SA[i]  后缀       左边字符
0   7      $          A  (T[6])
1   4      ACA$       T  (T[3])
2   6      A$         C  (T[5])
3   1      ATTACA$    G  (T[0])
4   5      CA$        A  (T[4])
5   0      GATTACA$   $  (T[7])
6   3      TACA$      T  (T[2])
7   2      TTACA$     T  (T[1])
```

于是 BWT 串为：

```text
BWT = "ATCGA$TT"
```

真实实现中不会直接保存完整“排序矩阵”，而是保存 SA 和 BWT 及其辅助结构。

## backward search 的直觉

借助 BWT，我们可以用“从后往前”的方式（backward search）搜索 pattern：

- 对于 pattern 的最后一个字符，我们在 BWT 中找到所有该字符对应的区间；
- 然后逐步向前扩展 pattern，每次更新候选区间；
- 如果最终区间非空，就说明 pattern 在原串中存在匹配；
- 区间的大小代表匹配数量，区间对应的 SA 范围给出匹配位置。

细节需要 C 数组（每个字符在 BWT 中的全局起始位置）和 Occ/rank 结构（某字符在某位置之前出现的次数）。这里更重要的是要理解：

- 我们不再在原串上逐字符比对，而是在“排序后的后缀”所形成的区间上做更新；
- BWT 的压缩性让这些结构在大参考上仍然可行。

## 与真实工具或流程的连接

BWT 和 suffix array 是很多经典 read mapping 工具背后的索引思想核心。即使工程实现各不相同，它们通常都依赖这样的事实：

- 参考序列可以先被预处理成压缩索引；
- 搜索过程主要是在索引上缩小候选区间；
- 精确定位后，再结合更复杂的策略处理 mismatch / gap；
- 例如：BWA 在 FM-index 上做 MEM seeding，再用局部 DP 扩展。

## 常见误区

### suffix array 只是一个理论结构

不是。它和 BWT 一起构成了现代序列搜索系统的工程基础之一。

### 有了 BWT 就直接解决 approximate matching

不对。BWT 更擅长支持 exact matching；允许错配、gap 和更复杂评分时，还需要额外策略，例如 seed-and-extend 或在索引上做剪枝搜索。

### 压缩索引只是为了省内存

也不止如此。压缩索引不仅减少空间，也改变了搜索过程的组织方式，让“先缩小候选区间，再做局部精细比对”成为可行的主流策略。

## 相关页面

- [索引结构概览](./indexing.md)
- [FM-index](./fm-index.mdx)
- [精确匹配与近似匹配](./exact-vs-approximate.md)
- [Seed-and-extend](../alignment/seed-and-extend.md)

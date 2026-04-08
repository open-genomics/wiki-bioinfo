---
description: 多序列比对（MSA）的目标、难点与 progressive alignment 的核心思路。
title: "多序列比对（MSA）"
---


## 是什么

如果 pairwise alignment 关注的是“两条序列如何对齐”，那么 **multiple sequence alignment（MSA）** 关注的是：

> 给定多条同源序列，如何在同一个对齐框架里同时比较它们的共同保守位点和变异模式？

MSA 是很多高级分析的上游步骤，例如：

- motif 或保守位点识别；
- profile / profile HMM 构建；
- 系统发育树推断；
- 家族级同源比较。

## 为什么比 pairwise alignment 难得多

两条序列时，经典动态规划还能在二维矩阵中做精确求解；

但当序列条数增加到 `k` 条时，精确动态规划需要在 `k` 维空间中递推，复杂度会快速爆炸。

这意味着：

- pairwise alignment 中可行的精确 DP，到了 MSA 中通常不再可行；
- 真实软件往往必须依赖近似、启发式和分步构建策略。

## MSA 想优化什么

一个直观目标是：

- 让真正同源的位置尽量落在同一列；
- 让插入/缺失在整体结构中解释得更合理；
- 保留保守位点和家族特异模式；
- 为后续 profile 或树构建提供稳定输入。

常见的一个概念是 **sum-of-pairs score**：

- 把多序列比对的一列看成很多 pairwise 比较；
- 整体分数是所有序列两两对齐分数的总和。

这给了我们一个直观但仍然困难的优化目标。

## Progressive alignment 的核心思路

最常见的 MSA 思路是 **progressive alignment**：

1. 先计算各序列之间的粗略距离或相似性；
2. 基于这些距离构建一棵 guide tree；
3. 按 guide tree 的顺序，从最相近的序列/簇开始逐步合并；
4. 在合并过程中使用 profile-profile 或 profile-sequence alignment。

这类方法的优点是：

- 计算可行；
- 和生物学“家族关系”直觉比较一致；
- 很容易和后续 profile / phylogeny 相衔接。

但它也有局限：

- 早期错误会被后续步骤继承；
- guide tree 本身只是构造工具，不一定等于真实 phylogeny；
- 对高度可变或局部重排的序列，结果可能不稳定。

## Profile 在 MSA 中的作用

当已经对齐好一组序列后，可以把它们压缩成一个 **profile**：

- 每一列记录频率或偏好；
- 后续新序列不是直接和某一条序列对齐，而是和 profile 对齐；
- 这让 MSA 从“序列对序列”自然过渡到“序列对群体模式”。

这也是 MSA 与 PWM / profile HMM / motif 分析之间的重要桥梁。

## 与 phylogeny 的关系

MSA 与系统发育高度相关，但二者不是同一件事：

- MSA 负责把“同源位点排到一列”；
- phylogeny 负责根据这些位点去推断树结构；
- guide tree 在 progressive alignment 中只是构造顺序的工具，不一定代表真实演化树。

也就是说，MSA 常是 phylogeny 的前置步骤，但不能简单把 alignment tree 当作 phylogeny。

## 常见误区

### 多序列比对只是把 pairwise alignment 多做几次

不是。MSA 的目标、复杂度和输出解释都更复杂，不能简单叠加 pairwise 结果。

### guide tree 就是真实进化树

不一定。它通常只是为了指导 progressive alignment 的构造顺序。

### MSA 一定有唯一正确答案

不一定。不同 scoring scheme、guide tree、gap 处理方法都可能导致不同 alignment。

## 相关页面

- [全局比对与局部比对](./global-local.md)
- [打分矩阵与 gap 罚分](./scoring-matrices.md)
- [PWM 与 PSSM](../models/pwm-pssm.md)
- [系统发育与进化](../phylogeny/index.md)

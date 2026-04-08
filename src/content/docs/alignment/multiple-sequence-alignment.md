---
description: 多序列比对（MSA）的目标、难点与 progressive alignment 的核心思路。
title: "多序列比对（MSA）"
---


## 是什么

如果说 pairwise alignment 关注"两条序列如何对齐"，那么 **multiple sequence alignment（MSA，多序列比对）** 关注的是：

> 给定多条同源序列，如何在同一对齐框架中同时比较保守位点和变异模式？

MSA 是以下分析的上游基础：motif/保守位点识别、profile HMM 构建、系统发育树推断、家族级同源比较。

## 为什么比 pairwise alignment 难得多

| 序列数量 | 动态规划空间 | 复杂度 |
|---------|-----------|--------|
| 2 条 | 二维矩阵 | O(m²) 可行 |
| k 条 | k 维空间 | 指数级爆炸 |

**实际影响：**
- 精确 DP 在 MSA 中通常不可行
- 真实软件依赖近似、启发式和分步构建策略

## MSA 的优化目标

**直观目标：**
- 同源位置落在同一列
- 插入/缺失在整体结构中解释合理
- 保留保守位点和家族特异模式
- 为后续 profile 或树构建提供稳定输入

**常用评分：sum-of-pairs score**
- 每一列视为多组 pairwise 比较
- 整体分数 = 所有序列对两两对齐分数的总和

这是一个直观但计算困难的优化目标。

## Progressive alignment 的核心思路

最常见的 MSA 策略是 **progressive alignment（渐进式比对）**：

```
步骤1: 计算序列间的粗略距离/相似性
    ↓
步骤2: 构建 guide tree（指导树）
    ↓
步骤3: 按 guide tree 顺序，从最近似序列开始逐步合并
    ↓
步骤4: 使用 profile-profile 或 profile-sequence alignment 完成合并
```

**优点：**
- 计算可行
- 与生物学"家族关系"直觉一致
- 便于衔接 profile / phylogeny 分析

**局限：**
- 早期错误会被后续步骤继承（"贪心"特性）
- guide tree 是构造工具，不一定等于真实系统发育树
- 对高度可变或局部重排序列效果不稳定

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

---
description: peptide-spectrum match、target-decoy 与 FDR 控制。
title: "数据库搜索与 FDR"
---


## 核心问题

质谱输出的是谱图，不是直接的肽段名字。数据库搜索要解决的是：

- 这个 MS2 谱图最可能对应哪个 peptide？
- 这种匹配有多可信？

## peptide-spectrum match

每个实验谱图会与数据库中的候选 peptide 理论碎裂谱比较，形成 **PSM（peptide-spectrum match）**。

<figure>
  <img src="/wiki-bioinfo/img/illustrations/peptide-spectrum-match.svg" alt="peptide spectrum match" />
  <figcaption>数据库搜索本质上是在比较实验谱图与理论碎裂谱的相似程度，PSM 是蛋白鉴定的最小证据单位。</figcaption>
</figure>

## FDR 为什么重要

数据库很大，随机匹配不可避免。如果不控制错误发现率（FDR），高分但错误的匹配会大量混入结果。

最常见策略是 **target-decoy**：

- 用真实蛋白序列构建 target 数据库；
- 再构建一个打乱/反转的 decoy 数据库；
- 同时搜索 target + decoy；
- 用 decoy 命中估计假阳性比例。

## 常见误区

- **分数最高就一定正确**：仍需结合 FDR 阈值；
- **PSM、peptide、protein 是同一层结果**：它们是不同层级；
- **1% FDR 表示每个蛋白 99% 正确**：FDR 是集合层面的期望错误比例。

## 相关页面

- [质谱基础](./mass-spectrometry-basics.md)
- [定量蛋白质组学](./quantitative-proteomics.md)

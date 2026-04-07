---
sidebar_position: 7
description: 测序杂交（SBH）：使用DNA芯片进行测序的替代方法。理解SBH的原理、图论模型（欧拉路径）及其局限性。
pagination_label: 测序杂交（SBH）
---

import SummaryBox from '@site/src/components/docs/SummaryBox';

# 测序杂交（Sequencing by Hybridization, SBH）

<SummaryBox
  summary="测序杂交是一种基于DNA芯片的测序方法，通过杂交反应确定目标DNA序列的所有l-mer组成，然后利用图论算法重构原始序列。SBH展示了如何将生物问题转化为图论问题。"
  bullets={[
    '理解SBH的生物学原理和实验流程',
    '掌握SBH问题的图论建模：哈密顿路径 vs 欧拉路径',
    '学习欧拉路径的线性时间算法',
    '了解SBH在实际应用中的局限性和现代应用'
  ]}
/>

## 生物学背景

### 传统测序的挑战

在人类基因组计划开始时，DNA测序是一项耗时且难以自动化的程序。1988年，四组生物学家独立提出了一种不同的测序技术——**测序杂交（SBH）**。

### DNA芯片技术

SBH的核心是构建微型DNA阵列（DNA芯片）：
- 包含数千个短的DNA片段，称为"探针"（probes）
- 每个探针揭示目标DNA序列中是否包含某个已知短序列
- 所有信息组合起来可以揭示目标DNA序列的身份

### 杂交原理

给定一个短探针（8-30个核苷酸的单链合成DNA片段）和单链目标DNA片段：
- 如果探针是目标Watson-Crick补链的子串，则目标会与探针杂交
- 探针和目标混合后形成弱化学键并粘在一起

**示例**：
- 探针：ACCGTGGA
- 目标：CCCTGGCACCTA
- 杂交：探针与目标的子串 TGGCACCT 互补

## SBH实验流程

### 通用DNA阵列

通用DNA阵列包含所有 4^l 个长度为 l 的探针，应用流程如下：

1. **构建阵列**：将所有可能的长度为 l 的探针附着在平面上，每个探针位于独特且已知的位置
2. **应用样品**：将含有荧光标记的DNA片段溶液施加到阵列上
3. **杂交反应**：DNA片段与互补于其长度为 l 的子串的探针杂交
4. **检测信号**：使用光谱检测器确定哪些探针与DNA片段杂交，获得目标DNA片段的 l-mer 组成
5. **序列重构**：应用组合算法从 l-mer 组成重构目标DNA片段的序列

### l-mer 组成（谱）

对于字符串 s，其 **l-mer 组成**或**谱**（spectrum）是 s 中所有长度为 l 的子串的多重集，记为 Spectrum(s, l)。

**示例**：
- s = TATGGTGC
- l = 3
- `Spectrum(s, l) = {TAT, ATG, TGG, GGT, GTG, TGC}`

## SBH问题形式化

### 问题定义

**测序杂交（SBH）问题**：

**输入**：一个集合 S，表示未知字符串 s 的所有 l-mer

**输出**：字符串 s，使得 Spectrum(s, l) = S

### 与最短超串问题的关系

虽然传统DNA测序和SBH是不同的实验方法，但对应的计算问题非常相似：
- SBH 是最短超串问题的特殊情况
- 当字符串 s₁, ..., sₙ 代表 s 的所有固定大小子串时
- 与最短超串问题不同，SBH 存在简单的线性时间算法

注意：最短超串问题是 NP-完全的，但 SBH 有多项式时间算法，这并不矛盾，因为最短超串问题是更一般的问题。

## 图论模型：哈密顿路径

### 第一种建模方式

构建一个有向图：
- 每个顶点对应一个 l-mer
- 如果两个 l-mer 有 l-1 个字符的重叠，则在它们之间添加边
- 找到访问每个顶点恰好一次的路径（哈密顿路径）

### 复杂性问题

哈密顿路径问题是 NP-完全的，因此这种建模方式不能产生高效算法。

## 图论模型：欧拉路径

### 第二种建模方式（高效）

构建一个不同的有向图：
- 顶点对应所有 (l-1)-mer
- 边对应 l-mer
- 如果一个 l-mer 的前 l-1 个字符等于顶点 v，后 l-1 个字符等于顶点 w，则添加从 v 到 w 的边

**示例**：
- l-mer: ATG
- 顶点: AT, TG
- 边: AT → TG

### 欧拉路径 vs 哈密顿路径

- **哈密顿路径**：访问每个顶点恰好一次（NP-完全）
- **欧拉路径**：访问每条边恰好一次（多项式时间可解）

在SBH的第二种建模中：
- 找到包含所有 l-mer 的DNA片段等价于找到访问图中所有边的路径
- 这是欧拉路径问题，可以在线性时间内解决

### 图的构建示例

考虑谱 `S = {ATG, TGG, GCG, TGC, GTG, GGC, GCA, CGT}`

**(l-1)-mer 顶点**：
AT, TG, GG, GC, CG, GT, CA

**边（l-mer）**：
- ATG: AT → TG
- TGG: TG → GG
- GCG: GC → CG
- TGC: TG → GC
- GTG: GT → TG
- GGC: GG → GC
- GCA: GC → CA
- CGT: CG → GT

### 欧拉路径算法

#### 平衡顶点

一个顶点 v 是**平衡的**，如果入度等于出度：
- indegree(v) = outdegree(v)

**定理**：一个连通图是欧拉的（包含欧拉回路）当且仅当其每个顶点都是平衡的。

#### 半平衡顶点

一个顶点 v 是**半平衡的**，如果 |indegree(v) - outdegree(v)| = 1

**定理**：一个连通图包含欧拉路径当且仅当它最多有两个半平衡顶点，且其他所有顶点都是平衡的。

#### 算法描述

```
EULERIANPATH(G)
1 if G has more than 2 semi-balanced vertices
2   return "no Eulerian path"
3 if G has 2 semi-balanced vertices
4   Add edge between them to make all vertices balanced
5 Find an Eulerian cycle in the balanced graph
6 Remove the added edge to get an Eulerian path
7 return the path
```

**寻找欧拉回路**：
```
EULERIANCYCLE(G)
1 Start from arbitrary vertex v
2 Form a path by traversing unused edges until returning to v
3 If path is not Eulerian
4   Find vertex w with unused edges
5   Find another cycle starting and ending at w
6   Merge cycles
7 Repeat until no unused edges remain
```

#### 复杂度

- 时间复杂度：O(E)，其中 E 是边数
- 空间复杂度：O(V + E)

### 从欧拉路径重构序列

找到欧拉路径后，可以重构原始DNA序列：
1. 遍历路径上的边
2. 对于每条边，添加其对应 l-mer 的最后一个字符
3. 初始序列是第一个顶点（第一个 (l-1)-mer）

## SBH的局限性

### 杂交信号的不确定性

SBH在实际应用中面临的主要挑战：
- 难以区分完美匹配和高稳定性的错配
- 短探针（8-30 nt）特别容易产生假阳性/假阴性
- 杂交信号的强度和特异性问题

### 当前应用

由于上述挑战，DNA阵列现在更多用于：
- **基因表达分析**：使用较长的探针（20-30 nt）
- **遗传变异检测**：已知序列中寻找突变
- 而非从头测序

### 为什么SBH未能成为主流

1. **探针长度权衡**：
   - 短探针：杂交特异性差，假阳性高
   - 长探针：需要更多探针，成本高

2. **测序错误**：
   - 实际数据包含错误
   - 需要容错算法

3. **重复序列**：
   - 类似于传统组装，重复序列导致歧义

4. **技术竞争**：
   - 第二代测序技术（Illumina等）快速发展
   - 成本大幅下降，通量大幅提升

## SBH的现代应用

尽管SBH未能成为主流测序方法，但其思想仍在其他领域应用：

### 1. 基因分型

- 使用已知位点的探针阵列
- 检测SNP和其他遗传变异

### 2. 基因表达分析

- 检测mRNA表达水平
- 识别差异表达基因

### 3. 蛋白质-DNA相互作用

- ChIP-on-chip技术
- 识别转录因子结合位点

### 4. 微生物鉴定

- 使用特定探针鉴定病原体
- 快速诊断

## 算法启示

SBH问题提供了重要的算法设计启示：

### 1. 问题转化的重要性

- 同一个生物问题可以有不同的计算建模
- 哈密顿路径建模 → NP-完全
- 欧拉路径建模 → 线性时间

### 2. 选择正确的抽象

- 顶点 vs 边的选择至关重要
- 简单的改变可以使问题从难解变为易解

### 3. 图论的威力

- 许多生物问题可以自然地建模为图问题
- 图论算法是生物信息学的重要工具

## 与现代组装的联系

虽然SBH本身未成为主流，但其思想影响了现代组装算法：

### de Bruijn 图

- 现代组装器（如Velvet、SPAdes）使用de Bruijn图
- de Bruijn图与SBH的欧拉路径建模有相似之处
- 将读段分解为k-mer，构建图，寻找欧拉路径

### k-mer 分析

- k-mer 频谱分析
- 错误校正
- 基因组特征估计

## 总结

测序杂交（SBH）：

1. **历史意义**：早期提出的替代测序方法，推动了DNA芯片技术发展
2. **算法价值**：展示了问题转化的重要性，从哈密顿路径到欧拉路径
3. **技术局限**：杂交信号的不确定性限制了其在测序中的应用
4. **现代传承**：其思想在de Bruijn图组装和k-mer分析中得到延续

虽然SBH本身未能成为主流测序技术，但它为理解生物信息学中的图论方法提供了经典案例。

## 相关页面

- [最短超串问题](/docs/assembly/shortest-superstring)
- [de Bruijn 图组装](/docs/assembly/de-bruijn)
- [图遍历算法](/docs/assembly/graph-traversal-algorithms)
- [k-mer](/docs/sequence/kmers)

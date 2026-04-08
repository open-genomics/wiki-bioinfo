---
description: Corrupted Cliques问题与CAST算法：基因表达数据中的鲁棒聚类方法，处理噪声和误差。
title: "Corrupted Cliques 与 CAST 算法"
---

import SummaryBox from '@/components/docs/SummaryBox.astro';
import PrerequisitesBox from '@/components/docs/PrerequisitesBox.astro';

<SummaryBox
  summary="基因表达数据常含噪声，导致距离图偏离理想的团图（clique graph）结构。Corrupted Cliques问题研究如何用最少的边增删恢复团图结构，CAST算法是一种实用的启发式解决方案。"
  bullets={[
    '理解 Corrupted Cliques 问题的计算复杂性（NP-hard）',
    '掌握 CAST 算法的核心思想：簇亲和力搜索',
    '了解距离图、团图与聚类的联系',
    '认识基因表达聚类中的噪声处理策略'
  ]}
/>

<PrerequisitesBox
  items={[
    { name: '层次聚类', href: '/wiki/phylogeny/hierarchical-clustering' },
    { name: 'k-means 聚类', href: '/wiki/phylogeny/k-means-bioinformatics' },
    { name: '图算法基础', href: '/wiki/foundations/graph-algorithms' }
  ]}
/>

## 背景：基因表达聚类的挑战

### 噪声与误差

基因表达数据通常包含大量噪声：
- **实验误差**：DNA 芯片杂交信号的不确定性
- **生物学变异**：细胞间固有差异
- **技术偏差**：批次效应、仪器差异

这些噪声导致聚类结果不稳定，相同的基因可能在不同实验中归入不同簇。

### 距离图的表示

将表达数据转化为**距离图** $G(\theta)$：
- **顶点**：基因
- **边**：当 $d(i,j) < \theta$ 时连接基因 $i$ 和 $j$

其中 $\theta$ 是距离阈值，$d(i,j)$ 是基因 $i$ 和 $j$ 表达模式的距离（如欧氏距离或 $1 - |\rho_{ij}|$）。

## 团图（Clique Graph）

### 定义

**完全图** $K_n$：具有 $n$ 个顶点，每对顶点间都有边相连的图。

**团图（Clique Graph）**：每个连通分量都是完全图的图。

换句话说，团图是由若干个互不相连的完全子图（团）组成的图。

### 与聚类的联系

理想的聚类结果对应团图：
- 每个簇内的基因两两相似（形成团）
- 不同簇的基因不相似（无跨簇边）

因此，如果距离图 $G(\theta)$ 是团图，则它直接定义了一个满足**同质性**和**分离性**的聚类。

### 示例

```
团图示例：        非团图示例：
  ●—●              ●—●
  |\|              |
  ●—●              ●   ●—●
                   
（两个 K₃）       （不是团图）
```

## Corrupted Cliques 问题

### 问题定义

由于噪声，实际距离图很少是完美的团图。有些相关基因的边被遗漏，有些无关基因间出现了错误边。

**Corrupted Cliques Problem**：

给定图 $G$，找到需要添加或删除的最少边数，使 $G$ 变成团图。

**输入**：图 $G = (V, E)$

**输出**：最小的边集 $A$（添加）和 $R$（删除），使得 $(V, (E \cup A) \setminus R)$ 是团图

### 计算复杂性

**定理**：Corrupted Cliques 问题是 **NP-hard**。

这意味着：
- 不存在已知的多项式时间精确算法
- 对于大规模基因表达数据，需要启发式方法
- 近似算法是实际选择

## CAST 算法

### 核心思想

**CAST（Cluster Affinity Search Technique）**由 Ben-Dor、Shamir 和 Yakhini 于 1999 年提出，是一种实用的启发式算法。

**直觉**：
- 基因对簇的"亲和力"（affinity）决定它是否属于该簇
- 迭代构建簇，不断调整直到满足"一致性"条件

### 关键定义

**距离定义**：基因 $i$ 到簇 $C$ 的距离

$$d(i, C) = \frac{1}{|C|} \sum_{j \in C} d(i,j)$$

即基因 $i$ 与簇 $C$ 中所有基因的平均距离。

**远近判断**（给定阈值 $\theta$）：
- **Close**：$d(i, C) < \theta$（基因与簇足够接近）
- **Distant**：$d(i, C) \geq \theta$（基因与簇足够远离）

### CAST 算法伪代码

```
CAST(G, θ)
1  S ← 图的顶点集
2  P ← ∅                           // 初始化空划分
3  while S ≠ ∅
4    v ← S 中度数最大的顶点        // 选择种子
5    C ← {v}                      // 初始化新簇
6    while 存在 distant 基因 i ∈ C 或 close 基因 i ∉ C
7      找到最近的 distant 基因 i ∈ C，从 C 中移除
8      找到最近的 close 基因 i ∉ C，加入 C
9    P ← P ∪ {C}                  // 添加新簇到划分
10   S ← S \ C                     // 移除已聚类基因
11   从图 G 中移除 C 的顶点
12 return P
```

### 算法执行示例

假设阈值 $\theta = 5$，距离矩阵：

|     | g₁ | g₂ | g₃ | g₄ | g₅ |
|-----|----|----|----|----|----|
| g₁  | 0  | 2  | 8  | 9  | 10 |
| g₂  | 2  | 0  | 7  | 8  | 9  |
| g₃  | 8  | 7  | 0  | 3  | 4  |
| g₄  | 9  | 8  | 3  | 0  | 2  |
| g₅  | 10 | 9  | 4  | 2  | 0  |

**第 1 轮**：
- 选择度数最高的基因作为种子（假设 g₁）
- 初始簇 C = {g₁}
- g₂ 距离 C = 2 < θ，是 close，加入 C
- g₃, g₄, g₅ 距离 C > θ，是 distant，不加入
- C = {g₁, g₂}，无内部 distant 基因，停止

**第 2 轮**：
- 剩余 {g₃, g₄, g₅}，选择种子 g₃
- g₄ 距离 C = 3 < θ，加入
- g₅ 距离 C = 4 < θ，加入
- C = {g₃, g₄, g₅}

最终聚类：{g₁, g₂} 和 {g₃, g₄, g₅}

### 算法特性

**优点**：
- 在实践中表现良好，即使缺乏理论保证
- 能处理噪声较大的表达数据
- 不需要预先指定簇的数量
- 对异常值有一定鲁棒性

**局限性**：
- 不保证收敛（理论上可能无限循环）
- 结果依赖于种子选择顺序
- 对阈值 $\theta$ 敏感
- 无性能保证（不是近似算法）

## PCC 算法（理论参考）

### 思想

**PCC（Parallel Classification with Cores）**是 CAST 的理论 predecessor。

**关键假设**：如果一个小子集的"正确"聚类已知，可以扩展到全集。

**算法框架**：
1. 随机选择很小的"核心"子集 $S'$
2. 枚举 $S'$ 的所有可能聚类（$k^{|S'|}$ 种）
3. 对每种聚类，使用最大亲和力方法扩展到全集
4. 选择评分最好的结果

**评分函数**：将距离图转换为团图所需的边增删数

### 复杂度

PCC 的运行时间：$O(n^2 (\log n)^{\log_2 k})$

虽然多项式时间，但对于实际应用仍太慢，因此 CAST 作为更快启发式被提出。

## 实际应用建议

### 阈值 $\theta$ 的选择

- **过小**：产生太多小簇，过度分割
- **过大**：所有基因归入一个簇
- **经验法则**：尝试多个值，观察聚类稳定性
- **可视化辅助**：观察距离图在不同阈值下的结构

### CAST 的使用场景

CAST 特别适合：
- 基因表达矩阵聚类
- 需要快速结果的探索性分析
- 数据噪声较大的情况
- 簇数量未知的情况

### 与其他方法的比较

| 方法 | 速度 | 需指定 k | 处理噪声 | 理论基础 |
|------|------|----------|----------|----------|
| **CAST** | 快 | 否 | 好 | 启发式 |
| **k-means** | 快 | 是 | 中 | 优化框架 |
| **层次聚类** | 中 | 否 | 中 | 贪心策略 |
| **PCC** | 慢 | 否 | 好 | 概率框架 |

## 历史与文献

- **1999**：Ben-Dor、Shamir 和 Yakhini 在 *Journal of Computational Biology* 发表 CAST 算法
- **1998**：Eisen 等人将层次聚类应用于基因表达分析（Nature）
- **相关概念**：Corrupted Cliques 问题是图聚类理论中的经典问题

## 相关页面

- [层次聚类](./hierarchical-clustering.md) — 基因表达聚类的经典方法
- [k-means 聚类](./k-means-bioinformatics.md) — 基于中心的聚类方法
- [UPGMA](./upgma.mdx) — 基于距离矩阵的树构建
- [基因预测](../models/gene-prediction.mdx) — 聚类结果的功能注释

## 总结

- **Corrupted Cliques 问题是 NP-hard**，需要启发式方法
- **CAST 算法**通过"亲和力"概念迭代构建簇，在实践中表现良好
- **基因表达聚类**需要处理噪声，团图提供了理想的数学模型
- **阈值选择**和**种子顺序**影响 CAST 的结果，需要谨慎调参

---
description: 层次聚类在基因表达与样本关系分析中的作用，以及它与树形表示的联系。包含HIERARCHICALCLUSTERING算法、距离更新策略和与UPGMA的联系。
title: "层次聚类"
---

import PageHeaderMeta from '@/components/docs/PageHeaderMeta.astro';
import SummaryBox from '@/components/docs/SummaryBox.astro';
import PrerequisitesBox from '@/components/docs/PrerequisitesBox.astro';
import PitfallsBox from '@/components/docs/PitfallsBox.astro';
import ToolMappingBox from '@/components/docs/ToolMappingBox.astro';
import RelatedLinks from '@/components/docs/RelatedLinks.astro';

<PageHeaderMeta
  section="系统发育与聚类"
  audience="需要分析基因表达数据、理解聚类算法原理的研究者"
  startWith="阅读本文了解层次聚类核心算法，然后学习 UPGMA 或 Neighbor-Joining 算法"
/>

<SummaryBox
  summary="层次聚类（Hierarchical Clustering）是基因表达数据分析的核心方法，通过迭代合并最相似的簇构建树状结构（dendrogram）。"
  bullets={[
    '理解 agglomerative 层次聚类的核心算法流程',
    '掌握三种距离更新策略：single、complete、average linkage',
    '了解与 UPGMA 算法的深层联系',
    '理解层次聚类与系统发育树的区别'
  ]}
/>

<PrerequisitesBox
  items={[
    '[距离矩阵与相似性度量](../alignment/distance-matrices.md) — 理解欧氏距离、相关系数等基本概念',
    '[树形结构基础](./index.mdx) — 了解 dendrogram、枝长、根节点等术语'
  ]}
/>

## 是什么

层次聚类（hierarchical clustering）是一类把对象逐步合并成树状结构的方法。

在生物信息学中，它常用于：

- 基因表达矩阵中的基因聚类；
- 样本之间的相似性分析；
- 初步构造"树状"关系图（dendrogram）。

它与系统发育树不完全相同，但在视觉形式和构造直觉上非常接近，因此也是理解树构建的重要桥梁。

## 要解决什么生物信息学问题

在基因表达数据中，研究者面对的是一个大矩阵：

| 维度 | 含义 |
|------|------|
| 行 | 基因（数千到数万个） |
| 列 | 样本或时间点 |
| 单元格 | 表达值（TPM、FPKM、CPM 等） |

**核心问题**：仅凭原始矩阵难以快速判断：
- 哪些基因具有相似的表达模式；
- 哪些样本在表达谱上更接近；
- 数据是否存在明显的亚群或时间序列结构。

**层次聚类的解决方案**：
- 将表达模式相似的对象自动分组；
- 用树状图（dendrogram）可视化整个合并过程；
- 提供从精细到粗粒度多个分辨率的分组结果。

## 输入与输出

**输入**：
- $n$ 个对象（基因或样本）
- $n \times n$ 的距离矩阵 $d$，其中 $d(i,j)$ 表示对象 $i$ 和 $j$ 之间的相异程度

**输出**：
- 一棵树 $T$（dendrogram），包含 $n$ 个叶节点和 $n-1$ 个内部节点
- 每个内部节点标注两个子簇合并时的距离值

---

## 核心思路与算法

层次聚类采用**贪心策略**：每一步选择当前最接近的两个簇进行合并，直到所有对象归为一簇。

### HIERARCHICALCLUSTERING 算法（伪代码）

一种典型的 agglomerative hierarchical clustering 流程：

```
HIERARCHICALCLUSTERING(d, n)
1  Form n clusters, each with 1 element
2  Construct a graph T by assigning an isolated vertex to each cluster
3  while there is more than 1 cluster
4    Find the two closest clusters C₁ and C₂
5    Merge C₁ and C₂ into new cluster C with |C₁| + |C₂| elements
6    Compute distance from C to all other clusters
7    Add a new vertex C to T and connect to vertices C₁ and C₂
8    Remove rows and columns of d corresponding to C₁ and C₂
9    Add a row and column to d for the new cluster C
10 return T
```

**关键性质**：该算法生成 n 个不同的划分（partitions），从 n 个单元素簇到 1 个包含所有元素的簇。

### 算法执行示例（worked example）

假设有 5 个基因的表达数据，初始距离矩阵为：

|     | g₁  | g₂  | g₃  | g₄  | g₅  |
|-----|-----|-----|-----|-----|-----|
| g₁  | 0   | 2   | 6   | 10  | 12  |
| g₂  | 2   | 0   | 5   | 9   | 11  |
| g₃  | 6   | 5   | 0   | 4   | 8   |
| g₄  | 10  | 9   | 4   | 0   | 3   |
| g₅  | 12  | 11  | 8   | 3   | 0   |

**第 1 步**：扫描矩阵，找到最小值 $d(g_1, g_2) = 2$
- 合并 g₁ 和 g₂ 为新簇 $C_{12} = \{g_1, g_2\}$
- 簇数从 5 减为 4

**第 2 步**：使用 Average Linkage 更新距离（以 g₃ 为例）：
$$d(C_{12}, g_3) = \frac{d(g_1, g_3) + d(g_2, g_3)}{2} = \frac{6 + 5}{2} = 5.5$$

更新后的矩阵片段：

|         | $C_{12}$ | g₃  | g₄  | g₅  |
|---------|----------|-----|-----|-----|
| $C_{12}$ | 0        | 5.5 | 9.5 | 11.5 |
| g₃      | 5.5      | 0   | 4   | 8   |
| g₄      | 9.5      | 4   | 0   | **3** |
| g₅      | 11.5     | 8   | **3** | 0   |

找到最小值 $d(g_4, g_5) = 3$，合并为 $C_{45} = \{g_4, g_5\}$

**第 3-4 步**：重复上述过程，依次合并 $C_{12}$ 与 g₃，最终 $C_{123}$ 与 $C_{45}$ 合并。

最终生成的 dendrogram 结构：
```
         ┌───────────┐
         │   Root    │ (高度=最终合并距离)
         └─────┬─────┘
        ┌──────┴──────┐
      ┌─┴─┐       ┌───┴───┐
      │C₁₂₃│       │  C₄₅  │
     ┌┴───┴┐      ┌┴───┴──┐
    g₁    g₂    g₃       g₄    g₅
```

## 距离更新策略（Linkage）

在簇之间更新距离时，不同策略会显著影响树的形态：

### Single Linkage（最小距离）

$$d_{min}(C^*, C) = \min_{x \in C^*, y \in C} d(x, y)$$

- 取两个簇中**最近**的两个点之间的距离
- 容易产生"链状"结构（chaining effect）
- 对噪声较敏感

### Complete Linkage（最大距离）

$$d_{max}(C^*, C) = \max_{x \in C^*, y \in C} d(x, y)$$  

- 取两个簇中**最远**的两个点之间的距离
- 倾向于生成紧凑的球形簇
- 对异常值敏感

### Average Linkage（平均距离）

$$d_{avg}(C^*, C) = \frac{1}{|C^*||C|} \sum_{x \in C^*} \sum_{y \in C} d(x, y)$$

- 取两个簇中**所有点对**的平均距离
- 平衡了 single 和 complete 的极端性
- **UPGMA 使用的就是这种策略**

### 与 UPGMA 的联系

**UPGMA（Unweighted Pair Group Method with Arithmetic mean）**本质上是层次聚类的特例：

| 特性 | 层次聚类 | UPGMA |
|------|----------|-------|
| 距离更新 | single/complete/average | 固定使用 average |
| 枝长计算 | 可选 | 必须计算 |
| 分子钟假设 | 无 | 假设等速进化 |
| 距离可加性 | 不要求 | 要求 |

因此层次聚类的算法框架与 UPGMA 完全一致，区别仅在于：
- UPGMA 额外计算枝长
- UPGMA 假设距离是可加性的
- 层次聚类更灵活，可尝试不同 linkage 策略

## 表达数据中的常见距离

在 expression data 中，"距离"不一定是编辑距离或序列差异。

更常见的是：

- **欧氏距离**（Euclidean distance）：$d(i,j) = \sqrt{\sum_k (I_{i,k} - I_{j,k})^2}$
- **相关系数转化的距离**：如 $1 - |\rho_{ij}|$ 或 $1 - \rho_{ij}^2$
- **Manhattan 距离**：$d(i,j) = \sum_k |I_{i,k} - I_{j,k}|$

因此，层次聚类的结果高度依赖：

- 表达矩阵是否已做归一化；
- 是否进行了 log 变换；
- 选择了什么距离和 linkage 方式。

## 聚类质量的评价

### 同质性（Homogeneity）

簇内元素应高度相似：
- 对于簇 $C$，内部距离应较小
- 用 $d(i,j)$（$i,j \in C$）衡量

### 分离性（Separation）

不同簇的元素应明显不同：
- 对于簇 $C_1$ 和 $C_2$，簇间距离应较大
- 用 $d(C_1, C_2)$ 衡量

### 实际应用中的权衡

Michael Eisen 等人在 1998 年的经典研究中，使用层次聚类分析了 8600 个基因在 13 个时间点的表达数据：
- 发现了 5 个主要子树
- 每个子树中的基因功能相似
- 验证了聚类结果的生物学意义

## 与系统发育的关系

层次聚类和系统发育树都长得像树，但语义不同：

| 特性 | 层次聚类树 | 系统发育树 |
|------|-----------|-----------|
| **目的** | 数据组织和可视化 | 推断演化历史 |
| **输入** | 表达矩阵或任意距离 | 序列比对或特征矩阵 |
| **假设** | 无特定生物学假设 | 替换模型、分子钟等 |
| **枝长含义** | 合并时的距离值 | 进化时间或替换数 |
| **根节点** | 通常是任意的 | 外群或分子钟确定 |

因此：

- 层次聚类很适合做 **exploratory analysis**；
- 但不能简单把基因表达 dendrogram 当作真正的 evolution tree；
- 两者在算法框架上密切相关（都是贪心合并策略）。

<ToolMappingBox
  items={[
    '**R 语言**：`hclust()` 函数 —— stats 包核心实现，支持 single/complete/average/ward 等方法',
    '**Python**：`scipy.cluster.hierarchy` —— `linkage()` 函数提供完整算法实现',
    '**R 语言**：`pheatmap` / `ComplexHeatmap` —— 专为表达数据优化的热图+聚类可视化',
    '**经典应用**：Eisen et al. (1998) 酵母细胞周期基因聚类 —— 层次聚类在表达数据分析的开创性应用'
  ]}
/>

## 常见误区

<PitfallsBox
  items={[
    '**误将 dendrogram 当作系统发育树**：层次聚类树的枝长反映合并距离，而非进化时间；根节点位置通常是任意的',
    '**忽视数据预处理的影响**：未归一化或 log 变换的数据会导致错误的聚类结果；务必先检查表达值的分布',
    '**linkage 选择不当**：Single linkage 容易产生"链式"伪簇，Complete linkage 对异常值敏感，Average linkage 是较为稳健的选择',
    '**过度解读簇边界**：层次聚类在何处"剪枝"得到 k 个簇是人为决定的，不同高度会给出不同分组'
  ]}
/>

## 计算复杂度

HIERARCHICALCLUSTERING 算法的复杂度：

- **朴素实现**：$O(n^3)$ — 每次合并后重新计算所有簇间距离
- **优化实现**：$O(n^2 \log n)$ — 使用优先队列维护最近簇对
- **空间复杂度**：$O(n^2)$ — 存储距离矩阵

对于大规模基因表达数据（$n > 10,000$），可能需要：
- 先进行降维（PCA、t-SNE）
- 使用 k-means 等更快的方法做初步聚类
- 再对簇中心进行层次聚类

## 参考资料

1. **Eisen, M. B., et al. (1998)**. Cluster analysis and display of genome-wide expression patterns. *PNAS*, 95(25), 14863-14868. —— 层次聚类在基因表达分析中的经典应用
2. **Jain, A. K., & Dubes, R. C. (1988)**. *Algorithms for Clustering Data*. Prentice Hall. —— 聚类算法的系统教材
3. **Sokal, R. R., & Michener, C. D. (1958)**. A statistical method for evaluating systematic relationships. *University of Kansas Science Bulletin*, 38, 1409-1438. —— UPGMA 方法原始论文

<RelatedLinks
  links={[
    { title: 'UPGMA', url: './upgma.mdx', description: '基于平均连接的树构建方法' },
    { title: 'Neighbor-Joining', url: './neighbor-joining.mdx', description: '不假设分子钟的树构建方法' },
    { title: '距离矩阵方法', url: './distance-methods.md', description: '系统发育推断的距离方法总览' },
    { title: 'k-means 聚类', url: './k-means-bioinformatics.md', description: '更快但非层次化的聚类方法' },
    { title: 'RNA-seq 工作流概览', url: '../workflows/rna-seq.md', description: '表达数据分析的完整流程' },
    { title: 'TPM、FPKM、CPM 与有效长度', url: '../transcriptomics/tpm-fpkm-cpm.mdx', description: '表达矩阵的定量方法' }
  ]}
/>

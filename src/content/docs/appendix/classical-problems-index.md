---
title: 经典计算问题索引
description: 生物信息学教材中常见的计算问题定义速查，及其在 BioInfo Wiki 中的对应页面。
---

import PageHeaderMeta from '@/components/docs/PageHeaderMeta.astro';
import SummaryBox from '@/components/docs/SummaryBox.astro';
import RelatedLinks from '@/components/docs/RelatedLinks.astro';

<PageHeaderMeta
  section="Appendix"
  estimatedTime="15 分钟"
  difficulty="参考"
/>

# 经典计算问题索引

本页整理生物信息学教材（如 Jones & Pevzner《An Introduction to Bioinformatics Algorithms》）中的经典计算问题，作为全站知识地图的补充索引。

---

## 按范式组织的问题

### 1. 穷举搜索类问题

| 问题名称 | 问题描述 | 算法策略 | Wiki 对应 |
|---------|---------|---------|-----------|
| **Partial Digest Problem (PDP)** | 给定所有点对距离的多重集，重构点的位置 | 穷举 + 分支定界 | [限制图谱](../foundations/restriction-mapping.mdx) |
| **Motif Finding Problem** | 在 t 个序列中找到 l-mer，使最小汉明距离最小 | 穷举所有位置组合 | [Motif 发现](../models/motif-finding.mdx) |
| **Median String Problem** | 找到与所有序列最接近的模式串 | 穷举 4^l 空间 | [Median String](../models/median-string.mdx) |
| **Turnpike Problem** | PDP 的等价表述，求一维点集 | 分支定界 | [限制图谱](../foundations/restriction-mapping.mdx) |

**关键概念**：
- **分支定界**（Branch and Bound）：通过上下界剪枝减少搜索空间
- **模式驱动 vs 序列驱动**：枚举模式 vs 枚举位置

---

### 2. 贪心算法类问题

| 问题名称 | 问题描述 | 算法策略 | Wiki 对应 |
|---------|---------|---------|-----------|
| **Sorting by Reversals** | 用最少的反转操作将排列排序 | 断点贪心 | [基因组重排](../foundations/genome-rearrangements.mdx) |
| **Reversal Distance Problem** | 计算两个排列之间的反转距离 | 近似算法（断点） | [基因组重排](../foundations/genome-rearrangements.mdx) |
| **Greedy Motif Search** | 用贪心策略改进 Motif 搜索 | 逐步构建谱 | [Motif 发现算法](../models/motif-discovery-algorithms.mdx) |

**关键概念**：
- **断点**（Breakpoint）：排列中相邻元素不连续的位置
- **近似比**（Approximation Ratio）：贪心解与最优解的比值上界

---

### 3. 动态规划类问题

| 问题名称 | 问题描述 | DP 结构 | Wiki 对应 |
|---------|---------|---------|-----------|
| **Change Problem** | 用最少的硬币组合出金额 M | 一维 DP | [动态规划基础](../foundations/dynamic-programming-basics.mdx) |
| **Manhattan Tourist Problem** | 在加权网格中找最长路径 | 二维网格 DP | [动态规划基础](../foundations/dynamic-programming-basics.mdx) |
| **Edit Distance** | 两个字符串间的最小编辑操作数 | 二维 DP | [编辑距离](../alignment/edit-distance.mdx) |
| **Longest Common Subsequence (LCS)** | 最长公共子序列 | 二维 DP | [动态规划基础](../foundations/dynamic-programming-basics.mdx) |
| **Global Alignment Problem** | 全局序列比对（Needleman-Wunsch） | 网格 DP | [Needleman-Wunsch](../alignment/needleman-wunsch.mdx) |
| **Local Alignment Problem** | 局部序列比对（Smith-Waterman） | 网格 DP，允许负分重置 | [Smith-Waterman](../alignment/smith-waterman.mdx) |
| **Fitting Alignment** | 将一个序列比对到另一个的子串 | 网格 DP，特殊边界 | - |
| **Overlap Alignment** | 一个后缀与另一个前缀的最优比对 | 网格 DP，特殊边界 | - |
| **Semiglobal Alignment** | 不计末端间隙的全局比对 | 网格 DP，特殊边界 | [半全局比对](../alignment/semi-global-alignment.mdx) |
| **Affine Gap Penalty Alignment** | 带仿射间隙惩罚的比对 | 三维 DP 状态 | [Gotoh 算法](../alignment/gotoh.mdx) |
| **Multiple Alignment** | 多个序列的同时比对 | 多维 DP（NP-hard，启发式） | [多序列比对](../alignment/multiple-sequence-alignment.mdx) |
| **Spliced Alignment** | 考虑剪接的外显子链比对 | DAG 上的路径 DP | [基因预测](../models/gene-prediction.mdx) |
| **Exon Chaining** | 选择非重叠外显子使总权重最大 | 加权区间调度 DP | [基因预测](../models/gene-prediction.mdx) |
| **Block Alignment** | 块比对（Four Russians 技术） | 分块 DP | [分治算法](../foundations/divide-and-conquer.mdx) |

**关键概念**：
- **递推关系**（Recurrence）：DP 的核心数学表达
- **回溯指针**（Backtracking Pointers）：重构最优解的路径信息
- **DAG 上的 DP**：拓扑序保证无循环依赖

---

### 4. 图算法类问题

| 问题名称 | 问题描述 | 图论概念 | Wiki 对应 |
|---------|---------|---------|-----------|
| **Shortest Path Problem** | 图中两点间最短路径 | Dijkstra, Bellman-Ford | [图算法基础](../foundations/graph-algorithms.mdx) |
| **Longest Path in DAG** | DAG 中最长路径 | 拓扑序 + DP | [图算法基础](../foundations/graph-algorithms.mdx) |
| **Eulerian Cycle Problem** | 图中经过每条边一次的回路 | 欧拉路径理论 | [de Bruijn 图](../assembly/de-bruijn.mdx) |
| **Hamiltonian Cycle Problem** | 图中经过每个顶点一次的回路 | NP-hard | [测序杂交](../assembly/sequencing-by-hybridization.mdx) |
| **Shortest Superstring Problem** | 包含所有输入字符串的最短超串 | Overlap 图 | [最短超串](../assembly/shortest-superstring.mdx) |
| **Sequencing by Hybridization (SBH)** | 从杂交数据重构序列 | de Bruijn 图 | [测序杂交](../assembly/sequencing-by-hybridization.mdx) |
| **Peptide Sequencing Problem** | 从质谱数据推导肽段序列 | 谱图 | [蛋白质组学](../proteomics/) |
| **Spectral Alignment** | 实验谱与理论谱的对齐 | 谱图比对 | [蛋白质组学](../proteomics/) |

**关键概念**：
- **de Bruijn 图**：k-mer 重叠关系的图表示
- **谱图**（Spectrum Graph）：质谱数据的质量-节点图
- **欧拉路径 vs 哈密顿路径**：计算复杂度天壤之别

---

### 5. 聚类与树类问题

| 问题名称 | 问题描述 | 算法 | Wiki 对应 |
|---------|---------|------|-----------|
| **Hierarchical Clustering** | 层次化聚类基因表达数据 | UPGMA, 邻接法 | [层次聚类](../phylogeny/hierarchical-clustering.mdx) |
| **k-Means Clustering** | 将数据划分为 k 个聚类 | 迭代优化 | [k-Means](../phylogeny/k-means-bioinformatics.mdx) |
| **Corrupted Cliques** | 在噪声中寻找紧密子图 | 启发式搜索 | - |
| **Distance-Based Phylogeny** | 从距离矩阵构建进化树 | 邻接法、UPGMA | [邻接法](../phylogeny/neighbor-joining.mdx), [UPGMA](../phylogeny/upgma.mdx) |
| **Additive Phylogeny** | 从可加矩阵构建树 | 递归降维 | [可加性系统发育](../phylogeny/additive-phylogeny.mdx) |
| **Small Parsimony Problem** | 给定树结构，求最节俭标签 | Fitch、Sankoff 算法 | [简约法](../phylogeny/parsimony.mdx) |
| **Large Parsimony Problem** | 同时优化树结构和标签 | NP-hard，启发式 | [简约法](../phylogeny/parsimony.mdx) |

**关键概念**：
- **可加矩阵**（Additive Matrix）：满足四点条件的距离矩阵
- **简约法**（Parsimony）：突变步数最小的进化假设

---

### 6. 概率模型与 HMM 类问题

| 问题名称 | 问题描述 | 算法 | Wiki 对应 |
|---------|---------|------|-----------|
| **Decoding Problem** | HMM 最可能状态序列 | Viterbi 算法 | [Viterbi 算法](../models/viterbi-forward-backward.mdx) |
| **Evaluation Problem** | 序列在 HMM 下的概率 | Forward 算法 | [Forward-Backward](../models/viterbi-forward-backward.mdx) |
| **HMM Parameter Estimation** | 估计 HMM 参数 | Baum-Welch (EM) | [EM 算法](../models/em-algorithm.mdx) |
| **Profile HMM Alignment** | 用 Profile HMM 比对序列 | Viterbi / Forward | [Profile HMM](../models/profile-hmm.mdx) |
| **Gene Prediction** | 识别基因结构 | 结合 HMM 与 DP | [基因预测](../models/gene-prediction.mdx) |
| **CG-Island Detection** | 识别高 CG 含量区域 | HMM（Fair Bet Casino） | [HMM 基础](../models/hmm.mdx) |

**关键概念**：
- **Viterbi**：DP 求解 HMM 最可能路径
- **Forward-Backward**：计算状态后验概率
- **Baum-Welch**：EM 算法估计 HMM 参数

---

### 7. 组合模式匹配类问题

| 问题名称 | 问题描述 | 算法 | Wiki 对应 |
|---------|---------|------|-----------|
| **Exact Pattern Matching** | 精确字符串匹配 | KMP、Boyer-Moore、Rabin-Karp | [精确匹配](../sequence/exact-string-matching.mdx) |
| **Multiple Pattern Matching** | 多模式同时匹配 | Aho-Corasick、后缀树 | [多模式匹配](../sequence/trie-and-multi-pattern-matching.mdx) |
| **Approximate Pattern Matching** | 允许错误的匹配 | DP、索引过滤 | [近似模式匹配](../alignment/) |
| **Suffix Tree Construction** | 构建后缀树 | Ukkonen 算法 | [后缀树](../sequence/suffix-tree.mdx) |
| **Tandem Repeat Finding** | 发现串联重复 | 后缀树、过滤 | - |
| **Repeat Finding** | 发现序列重复 | 散列表、后缀结构 | - |

**关键概念**：
- **最坏情况线性时间**：KMP、Boyer-Moore 的复杂度保证
- **后缀树**：线性空间，支持多种查询

---

### 8. 随机化与近似算法类问题

| 问题名称 | 问题描述 | 算法 | Wiki 对应 |
|---------|---------|------|-----------|
| **Gibbs Sampling for Motif** | 随机采样找 Motif | Gibbs 采样 | [随机化算法](../foundations/randomized-algorithms.mdx) |
| **Random Projections** | 随机投影降维搜索 | 局部敏感哈希 | [随机化算法](../foundations/randomized-algorithms.mdx) |
| **Randomized QuickSort** | 随机 pivot 快速排序 | 随机化 | [随机化算法](../foundations/randomized-algorithms.mdx) |
| **Approximation for Reversal** | 反转排序近似算法 | 断点近似 | [近似算法](../foundations/approximation-algorithms.mdx) |

---

## 复杂度速查

| 复杂度 | 典型算法 | 适用规模 |
|--------|---------|---------|
| O(n) | KMP、Boyer-Moore、欧拉路径 | 大规模数据 |
| O(n log n) | 后缀数组构建、归并排序 | 大规模数据 |
| O(n²) | 标准 DP 比对 | 中等规模序列 |
| O(n³) | 三维 DP（仿射间隙） | 短序列 |
| O(n^m) | 多序列比对（m 条序列） | 少量短序列 |
| 指数 | 穷举搜索、哈密顿路径 | 小规模验证 |

---

<SummaryBox>
**使用建议：**

1. **教材学习者**：通过此索引快速定位教材问题在 Wiki 中的详细解释
2. **问题建模者**：参考类似问题的建模方式，启发新问题的算法选择
3. **工具使用者**：理解工具底层解决的计算问题，判断适用边界
4. **研究者**：识别哪些问题是 NP-hard，避免尝试精确解
</SummaryBox>

---

## 从问题到范式的映射

```text
字符串处理问题 → 字符串算法 / 索引 / DP
距离/相似度问题 → DP / 图算法 / 统计模型
组合优化问题 → 穷举 / 贪心 / 近似 / 随机化
推断问题 → 概率模型 / EM / 贝叶斯
分类/聚类问题 → 机器学习 / 统计方法
进化问题 → 图论（树） / 简约法 / 距离方法
```

## 常见误区

### 教材中的问题定义可以直接用于实际分析

不可以。教材中的问题定义通常是经过简化的理想化模型——例如全局比对假设两条完整序列、编辑距离忽略生物学约束。实际生物信息学分析需要处理测序错误、重复序列、数据库规模、内存限制等现实因素。教材问题建立的是算法直觉，实际工具实现包含大量工程优化和启发式规则，两者之间存在显著鸿沟。

### NP-hard 问题就不值得学习

不是。理解 NP-hard 问题的证明过程有助于认清问题的内在难度，避免在不存在高效精确算法的问题上浪费精力。更重要的是，很多实用算法（如启发式搜索、近似算法、随机化算法）正是针对 NP-hard 问题设计的。知道"为什么精确解不可行"才能理解"为什么近似方法是必要的"。

### 时间复杂度决定了实际运行速度

不完全对。理论时间复杂度只描述增长趋势，不反映常数因子和实际工程优化。例如，BWA-MEM 的理论复杂度与基于 FM-index 的比对相同，但工程优化（SIMD 指令、多线程、缓存优化）使其比朴素实现快数百倍。实际工具选择需要同时考虑理论复杂度和工程实现质量。

### 掌握了算法就能解决所有分析问题

不能。算法只是分析流程的一部分。实际生物信息学工作还需要：理解生物学背景以提出正确的问题、掌握数据质量控制以避免"垃圾进垃圾出"、了解统计方法以正确解读结果、具备实验设计知识以规划有效的分析方案。算法是工具箱中的核心工具，但不是唯一需要的工具。

---

<RelatedLinks
  links={[
    {
      title: '算法设计范式',
      to: '/wiki-bioinfo/core-methods/algorithm-design-paradigms',
      description: '六大算法设计范式的核心思想与应用。',
    },
    {
      title: '算法与复杂度',
      to: '/wiki-bioinfo/foundations/algorithms-and-complexity',
      description: '复杂度分析和算法效率的基础。',
    },
    {
      title: '动态规划基础',
      to: '/wiki-bioinfo/foundations/dynamic-programming-basics',
      description: 'DP 问题的统一视角。',
    },
    {
      title: '图算法基础',
      to: '/wiki-bioinfo/foundations/graph-algorithms',
      description: '图论问题与算法。',
    },
  ]}
/>

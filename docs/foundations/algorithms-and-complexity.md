---
sidebar_position: 6
description: Bioinformatics 中常见算法范式与复杂度直觉总览：从穷举到 DP、图算法与随机化方法。
pagination_label: 算法与复杂度
---

# 算法与复杂度

## 为什么在 BioInfo Wiki 里单独讲算法与复杂度

很多读者第一次接触生物信息学时，会感觉问题描述往往并不难：

- 序列怎么对齐；
- motif 怎么找；
- 树怎么建；
- 变异怎么筛；

真正困难的地方常常是：

- 数据量巨大；
- 搜索空间爆炸；
- 噪声和不确定性很强；
- 某些问题在理论上就很难精确求解。

因此，理解“算法与复杂度”并不是为了学抽象的理论，而是为了知道：

- 为什么有些问题能精确求；
- 为什么有些问题必须用启发式；
- 为什么现实工具常常是多种方法的折中。

## 1. 穷举搜索：最直接，但经常不可扩展

穷举搜索（exhaustive search）常常是最容易想到的第一步：

- motif discovery：枚举所有可能 motif；
- 树搜索：枚举所有拓扑；
- 组合优化：尝试所有候选解；

它的优点是：

- 概念清楚；
- 容易作为“理论基线”；

但难点也最明显：

- 搜索空间往往呈指数增长；
- 在真实生物数据规模下通常不可行。

因此，穷举很重要，但更多时候是“帮助我们理解问题到底难在哪”。

## 2. 贪心与启发式：先找到一个足够好的答案

当精确求解太难时，一个常见策略是：

- 每一步先做当前看起来最合理的选择；
- 或者用经验规则快速构造一个还不错的解；
- 再不断改进。

在 BioInfo 中，很多现实工具都有这种味道：

- MSA 里的 progressive alignment；
- motif discovery 中的 greedy/profile heuristic；
- 系统发育树搜索中的启发式拓扑更新；
- assembly graph 的简化与清理步骤。

贪心/启发式的意义不在于“最优”，而在于：

- 在巨大问题空间里尽快找到可用答案；
- 让分析在现实时间和资源内完成。

## 3. 动态规划：把全局最优分解成局部状态

动态规划（DP）是本 wiki 里最核心的算法范式之一。

它适用于：

- 问题可以被拆成重叠子问题；
- 全局最优可以由局部状态递推得到；
- 状态空间还能承受。

典型例子：

- [编辑距离](../alignment/edit-distance.md)
- [全局比对与局部比对](../alignment/global-local.md)
- [Affine gap penalty](../alignment/affine-gap-penalty.md)
- [Viterbi、Forward 与 Backward](../models/viterbi-forward-backward.md)

DP 很强大，但也有限制：

- 状态维数一高，复杂度会迅速上升；
- 例如从 pairwise alignment 到 MSA，就会遇到高维 DP 爆炸的问题。

## 4. 图算法：把生物问题转成路径、连通和结构问题

许多生物信息学问题都可以重述成图问题：

- assembly：de Bruijn graph / overlap graph；
- HMM：状态转移图；
- phylogeny：树结构；
- 有时比对本身也可看成网格图上的路径问题。

图视角的价值在于：

- 它让问题结构更清晰；
- 很多看似不同的任务，会共享同一类算法直觉（路径、剪枝、连通、最短路/最长路等）；
- 便于把局部观测整合成整体结构。

## 5. 字符串算法与索引：把大规模搜索做快

生物序列首先是字符串，因此：

- exact string matching；
- trie / Aho–Corasick；
- suffix tree；
- suffix array / BWT / FM-index；

这些结构的共同目标，是：

- 避免在长序列上反复从头扫描；
- 利用共享结构和预处理，让搜索更高效；
- 把后续的近似匹配、mapping、数据库检索建立在可承受的计算基础上。

## 6. 概率模型：把噪声与不确定性纳入计算

生物数据往往不干净，也不完全确定：

- reads 有错误；
- motif 允许变异；
- gene structure 不是直接可见；
- 定量结果带有抽样噪声。

因此我们需要概率模型：

- PWM / PSSM：位置偏好；
- HMM：隐藏状态与观测；
- profile HMM：序列家族模式；
- 统计模型：RNA-seq 差异表达中的离散度、FDR 等。

概率模型的价值是：

- 不是只问“哪个最像”；
- 而是问“在这个模型下，什么解释最可能”。

## 7. 随机化算法：在巨大搜索空间里更聪明地探索

当既不能穷举，也很难写出精确 DP 时，随机化方法就很重要。

典型场景：

- motif discovery 中的 randomized search / Gibbs sampling；
- 大树空间中的启发式搜索；
- 某些近似统计推断和采样方法。

随机化并不等于“不可靠”，而是：

- 在大搜索空间中，用概率方法避免陷入局部最优；
- 通过多次重启或采样来找到更好的近似解。

## 8. 为什么很多 BioInfo 工具是“混合体”

现实中的工具很少只用一种算法范式。

例如：

- **BWA / minimap2**：索引结构 + seed-and-extend + 局部 DP；
- **variant calling**：比对 + 统计过滤 + 数据库注释；
- **RNA-seq quantification**：索引搜索 + 概率分配 + 统计归一化；
- **MSA/phylogeny**：启发式构造 + scoring + 树搜索 / 模型评估。

因此，一个成熟的 BioInfo 视角不是“这个工具属于哪一种算法”，而是：

> 它把哪些算法范式拼接在一起，分别解决了流程中的哪一层问题？

## 如何用这页来读整个 Wiki

你可以把全站内容粗略映射成：

- Foundations：对象、数学与复杂度直觉；
- Sequence / Alignment：字符串算法、DP、索引；
- Assembly：图算法；
- Models：概率模型与随机化；
- Applications：把这些算法放回 DNA-seq、RNA-seq、phylogeny 等任务中。

这样读时，就不会把各页看成分散的词条，而是看成几条连续的方法主线。

## 相关页面

- [概率、图与动态规划预备](./probability-and-graphs.md)
- [序列表示与索引](../sequence/index.md)
- [序列比对](../alignment/index.md)
- [组装与图算法](../assembly/index.md)
- [概率模型与模式识别](../models/index.md)

---
sidebar_position: 4
---

# 打分矩阵与 gap 罚分

## 是什么

当我们从“编辑距离”走向更真实的序列比对时，第一件事往往就是放弃“所有错误代价都一样”的假设。

这时就会引入两类更细致的设计：

- **打分矩阵（scoring matrix）**：区分不同字符替换的合理性；
- **gap 罚分（gap penalty）**：区分插入/缺失的不同代价模式。

## 要解决什么生物信息学问题

如果把所有 mismatch 都记成同一个代价，那么下列情况都无法很好区分：

- 某些氨基酸替换在生化性质上很接近；
- 一段连续缺失和多次零散缺失可能有不同生物学意义；
- 某些任务希望更敏感，另一些任务希望更保守。

因此，比对评分系统其实是在回答：**什么样的序列变化更像真实进化或真实测序误差？**

## 数学或算法模型

在带得分的动态规划中，常把对齐得分写成：

$$
  score = \sum \text{match/mismatch score} + \sum \text{gap penalty}
$$

如果使用替换矩阵 `s(a,b)`，那么两个字符 `a` 和 `b` 的配对分数由矩阵给出。

### 简单 gap 模型

最简单的方式是每个 gap 字符统一罚分 `g`。

### affine gap penalty

更常见的做法是 affine gap penalty：

$$
  \text{GapCost}(k) = g_o + k \cdot g_e
$$

其中：

- `g_o`：开启一个 gap 的代价（gap open）
- `g_e`：延长 gap 的代价（gap extend）
- `k`：gap 长度

它表达了一个直观想法：开一个新的缺口通常比把已有缺口再延长一点更“昂贵”。

## PAM 与 BLOSUM

在蛋白质比对中，最常见的替换矩阵是：

- **PAM**：更偏进化模型推导；
- **BLOSUM**：更偏从保守区块统计得到。

虽然它们都用来给替换赋分，但构建思路不同，因此适合的相似度范围也可能不同。

| 矩阵 | 主要来源 | 更适合理解为 |
|---|---|---|
| PAM | 进化模型外推 | 进化距离上的替换倾向 |
| BLOSUM | 保守区块统计 | 实际观测到的保守替换模式 |

## worked example

假设在某个简化模型里：

- match = `+2`
- mismatch = `-1`
- gap open = `-2`
- gap extend = `-1`

那么长度为 3 的一个连续 gap 代价为：

$$
  -2 + 3 \times (-1) = -5
$$

如果把它拆成三个独立 gap，每次都重新开启，则会更昂贵。这正是 affine gap penalty 想表达的结构偏好：连续 indel 往往比多个离散 indel 更合理。

## 为什么这更符合生物学直觉

### 替换不等价

在蛋白质里，某些氨基酸替换保留了相近的电荷、大小或疏水性，因此可能比其他替换更容易被接受。

### gap 不等价

一个长度为 5 的连续缺失，往往比在 5 个位置各发生一次独立缺失更像真实事件。

### 任务目标不同

- 做远缘同源搜索时，可能需要更敏感的评分；
- 做精确定位或变异解释时，可能需要更保守的评分。

## 与真实工具或流程的连接

- 教学中的 Needleman–Wunsch / Smith–Waterman 通常会结合打分矩阵与 gap 罚分来讲解；
- BLAST 等工具使用更复杂的 seed-and-extend 思想，但其 extension 阶段仍离不开得分体系；
- 蛋白比对和结构域搜索尤其依赖替换矩阵；
- read mapping 和 variant calling 中对 indel 的处理也会受到 gap 模型影响。

## 常见误区

### 核酸和蛋白都应该使用同一套打分矩阵

不应该。数据类型不同，统计背景和替换含义也不同。

### gap 只是一个实现细节

不是。gap 模型会直接影响最优路径和结果解释。

### BLOSUM 一定优于 PAM

没有绝对优劣，要看任务、序列相似度范围和分析目标。

## 参考资料

- Biological Sequence Analysis
- An Introduction to Bioinformatics Algorithms
- PAM / BLOSUM 相关原始文献

## 相关页面

- [编辑距离](./edit-distance.md)
- [全局比对与局部比对](./global-local.md)
- [隐马尔可夫模型](../models/hmm.md)
- [RNA-seq 工作流概览](../workflows/rna-seq.md)

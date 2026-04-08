---
title: "打分矩阵与 gap 罚分"
---


## 是什么

从"编辑距离"走向真实序列比对时，首先需要放弃"所有错误代价相同"的假设。两类更精细的设计：

| 设计 | 作用 |
|-----|------|
| **打分矩阵（scoring matrix）** | 区分不同字符替换的合理性 |
| **gap 罚分（gap penalty）** | 区分插入/缺失的不同代价模式 |

## 要解决什么生物信息学问题

统一 mismatch 代价无法区分：
- 生化性质相近的氨基酸替换 vs 性质差异大的替换
- 连续缺失 vs 多次零散缺失（不同生物学意义）
- 任务需求差异（敏感性 vs 保守性）

评分系统的核心问题：**什么样的序列变化更可能反映真实进化或测序误差？**

## 数学或算法模型

在带得分的动态规划中，常把对齐得分写成：

$$
  score = \sum \text{match/mismatch score} + \sum \text{gap penalty}
$$

如果使用替换矩阵 `s(a,b)`，那么两个字符 `a` 和 `b` 的配对分数由矩阵给出。

### 简单 gap 模型

最简单的方式是每个 gap 字符统一罚分 `g`。

### affine gap penalty

更常用的**仿射 gap 罚分（affine gap penalty）**：

$$
\text{GapCost}(k) = g_o + k \cdot g_e
$$

**参数说明：**
- `g_o`：gap 开启代价（gap open）——启动一个新缺口的固定成本
- `g_e`：gap 延长代价（gap extend）——每增加一个 gap 字符的额外成本
- `k`：gap 长度

**核心思想**：开启新缺口比延长已有缺口更"昂贵"，这与生物学直觉一致——一个连续indel事件比多个独立indel更可能发生。

## PAM 与 BLOSUM

蛋白质比对中最常用的替换矩阵：

| 矩阵 | 构建方法 | 适用理解 |
|-----|---------|---------|
| **PAM** | 进化模型外推 | 特定进化距离上的氨基酸替换倾向 |
| **BLOSUM** | 保守区块统计 | 实际观测到的保守/可接受替换模式 |

**关键区别**：构建思路不同 → 适用场景不同。PAM 更适合远缘同源检测，BLOSUM 更适合识别保守结构域。

## Worked Example

**参数设置：**
- match = `+2`
- mismatch = `-1`
- gap open = `-2`
- gap extend = `-1`

**情景对比：**

| 场景 | 计算 | 总代价 |
|-----|------|--------|
| 连续 gap（长度3） | $g_o + 3 \times g_e = -2 + 3 \times (-1)$ | **-5** |
| 3个独立 gap | $3 \times (g_o + g_e) = 3 \times (-3)$ | **-9** |

连续 gap 代价更低，这正是 affine gap penalty 的结构偏好：连续 indel 比多个离散 indel 更合理。

## 为什么这更符合生物学直觉

### 替换不等价

蛋白质中，电荷/大小/疏水性相近的氨基酸替换（如 Leu↔Ile）比性质差异大的替换（如 Asp↔Trp）更易被接受。

### gap 不等价

一个长度为 5 的连续缺失（单次 indel 事件）比 5 个位置各发生独立缺失更可能发生。

### 任务目标差异

| 任务类型 | 评分偏好 |
|---------|---------|
| 远缘同源搜索 | 更敏感，允许更多错配/gap |
| 精确定位/变异解释 | 更保守，降低假阳性 |

## 与真实工具或流程的连接

| 工具/场景 | 打分体系应用 |
|----------|-------------|
| Needleman–Wunsch / Smith–Waterman（教学） | 结合打分矩阵与 gap 罚分讲解 |
| BLAST | seed-and-extend 策略，extension 阶段依赖得分体系 |
| 蛋白质比对/结构域搜索 | 高度依赖 PAM/BLOSUM 等替换矩阵 |
| Read mapping / Variant calling | indel 处理受 gap 模型直接影响 |

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

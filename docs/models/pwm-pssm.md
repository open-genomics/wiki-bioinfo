---
sidebar_position: 4
---

# PWM 与 PSSM

## 是什么

PWM（Position Weight Matrix）和 PSSM（Position-Specific Scoring Matrix）是描述序列 motif 的经典表示方式。

它们的核心思想是：一个 motif 不是要求每个位置都完全一样，而是允许每个位置对不同字符有不同偏好。

## 要解决什么生物信息学问题

很多真实序列模式并不是“固定字符串”，而是：

- 某些位置非常保守；
- 某些位置允许多种字符；
- 整体上呈现统计偏好而不是绝对规则。

PWM / PSSM 让我们可以用矩阵形式刻画这种偏好，并用一个统一框架来“打分”候选序列片段。

## 位置频率矩阵（PFM）与 PWM

假设我们有若干 motif 实例（例如多个转录因子结合区域），可以统计每个位置上各字符的频率，得到 **PFM（Position Frequency Matrix）**：

- 行代表字符（如 A/C/G/T）；
- 列代表 motif 中的位置；
- 每个单元是该位置上该字符出现的次数或频率。

**PWM** 则在此基础上把频率转成“权重”，常见做法是：

- 使用对数比值，例如：
  - `w(i, b) = log2( p(i, b) / q(b) )`
  - 其中 `p(i, b)` 是 motif 第 i 位上碱基 b 的频率，`q(b)` 是背景频率；
- 从而，当某个片段在第 i 位上使用更偏好的字符时，会获得正分；
- 使用非偏好字符时，则会得到负分。

## PSSM：位置特异打分矩阵

PSSM（Position-Specific Scoring Matrix）在形式上与 PWM 非常类似，常见用法上更强调“打分矩阵”的角色：

- 输入：一个候选序列片段；
- 计算：沿着 motif 长度，把片段在每一位的字符对应的打分相加；
- 输出：总分，表示这个片段“像不像”该 motif。

这种做法可以统一用于：

- motif 扫描（在长序列上滑动窗口计算每个位置的分数）；
- 比较不同 motif 与同一片段的兼容程度；
- 直观可视化 motif 偏好（logo 图 等）。

## 与真实工具或流程的连接

这类表示广泛用于：

- motif 扫描；
- 转录因子结合位点分析；
- profile-style 模式识别；
- 作为更复杂概率模型（如 profile HMM）的基础直觉。

在实际流程中，你往往会看到：

- 从 motif discovery 工具输出的 PFM/PWM；
- 使用 PSSM 进行 genome-wide 扫描，给出高分候选位点；
- 再结合进化保守性、表达数据和实验验证进行过滤。

## 常见误区

### motif 一定对应一个固定的 consensus 串

不对。很多 motif 的本质正是“位置相关的偏好”，不是单个固定字符串。

### 高分 motif 就等于真实结合位点

不一定。高分说明片段与模型相似，但是否真实绑定还需要结合背景频率、局部结构和实验数据。

## 相关页面

- [Motif 寻找](./motif-finding.md)
- [隐马尔可夫模型](./hmm.md)
- [Pseudo-alignment 与表达定量](../transcriptomics/pseudo-alignment-and-quantification.mdx)

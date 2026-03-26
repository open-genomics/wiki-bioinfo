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

PWM / PSSM 让我们可以用矩阵形式刻画这种偏好。

## 核心思想

对 motif 的每个位置，记录不同字符的频率或打分：

- PWM 更强调频率 / 概率；
- PSSM 更常用于与背景分布比较后的打分表示。

## 与真实工具或流程的连接

这类表示广泛用于：

- motif 扫描；
- 转录因子结合位点分析；
- profile-style 模式识别；
- 作为更复杂概率模型的基础直觉。

## 常见误区

### motif 一定对应一个固定的 consensus 串

不对。很多 motif 的本质正是“位置相关的偏好”，不是单个固定字符串。

## 相关页面

- [Motif 寻找](./motif-finding.md)
- [隐马尔可夫模型](./hmm.md)
- [Pseudo-alignment 与表达定量](../transcriptomics/pseudo-alignment-and-quantification.mdx)

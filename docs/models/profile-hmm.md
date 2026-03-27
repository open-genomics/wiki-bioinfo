---
sidebar_position: 7
description: Profile HMM 如何扩展 PWM/PSSM，用于表示带插入缺失的序列家族模式。
pagination_label: Profile HMM
---

# Profile HMM

## 是什么

PWM/PSSM 很适合描述一个**固定长度**的 motif：

- 每个位置都有字符偏好；
- 候选片段通常与 motif 长度相同；
- 不擅长显式表示插入和缺失。

而 **Profile HMM** 则进一步解决：

> 如果一个序列家族在不同成员之间存在插入、缺失和长度变化，如何仍然用概率模型刻画它的“家族结构”？

## 为什么 PWM 不够用

对于简单 DNA motif，PWM 已经足够强大。

但对于蛋白家族或更复杂的序列模式，常见问题是：

- 某些位置可以缺失；
- 某些位置允许插入额外残基；
- 不同成员的长度并不完全一致；
- 只靠固定长度窗口会把这些变化都当成“糟糕匹配”。

这时，需要一个能显式表示“匹配 / 插入 / 缺失”的模型。

## Profile HMM 的核心结构

Profile HMM 通常由三类状态构成：

- **Match states (M)**：表示家族中的保守列；
- **Insert states (I)**：表示相对于保守骨架插入的字符；
- **Delete states (D)**：表示某个保守位置被跳过。

因此，一条序列与 profile 的关系不再只是：

- “每个位点得多少分”；

而是：

- “它沿着这条 match/insert/delete 状态路径走了一遍”。

## 一个直观例子

假设一个蛋白家族的保守骨架大致是：

```text
A - G - T
```

其中第二和第四位置之间可能允许插入一些残基，那么 Profile HMM 可以表示为：

- `M1`：偏好 `A`
- `M2`：偏好 `G`
- `M3`：偏好 `T`
- 在相邻 match 状态之间插入 `I` 状态
- 对某些 match 位置允许通过 `D` 状态跳过

这样，序列：

- `AGT`
- `AQGRT`
- `AT`

都可以被统一地解释为“属于这个家族”，只是经过的状态路径不同。

## 与 Viterbi / Forward 的关系

Profile HMM 的推断方式和一般 HMM 一样，也依赖：

- **Viterbi**：找最可能的 match/insert/delete 路径；
- **Forward/Backward**：评估序列和 profile 的总体兼容程度；

因此，Profile HMM 可以被看作：

- PWM/PSSM 的更强表达形式；
- 又是一般 HMM 思想在序列家族问题中的专门化版本。

## 与 gene prediction 的区别

- **Profile HMM**：
  - 强调一个序列是否符合某个家族/域的 profile；
  - 常用于蛋白家族比对、结构域搜索；
- **Gene prediction HMM**：
  - 强调把一段长基因组序列切分成 exon/intron/intergenic 等状态；
  - 更关注整条基因结构的解释。

两者都属于 HMM，但应用目标不同。

## 与真实工具或流程的连接

Profile HMM 在蛋白家族分析中非常重要，典型用途包括：

- family/domain search；
- 远缘同源检测；
- 蛋白功能注释；
- 结构域边界判断。

它是从“简单 motif 打分”走向“序列家族概率建模”的关键一步。

## 常见误区

### Profile HMM 只是更长的 PWM

不是。它的关键优势不是“更长”，而是显式建模插入和缺失。

### 有了 PWM 就没必要用 Profile HMM

不一定。对于带 gap 和长度变化的序列家族，Profile HMM 往往更自然、更强大。

### Profile HMM 只能用于蛋白序列

虽然在蛋白家族分析中特别常见，但它本质上是一般的序列 profile 概率模型，也可推广到其他类型的序列家族问题。

## 相关页面

- [PWM 与 PSSM](./pwm-pssm.md)
- [隐马尔可夫模型](./hmm.md)
- [Viterbi、Forward 与 Backward](./viterbi-forward-backward.md)
- [Gene prediction](./gene-prediction.md)

---
sidebar_position: 6
description: HMM 中 forward、backward、Viterbi 三类核心算法的角色与差异。
pagination_label: Viterbi / Forward / Backward
---

# Viterbi、Forward 与 Backward

## 是什么

在 HMM 中，最常见的三个核心问题是：

- **Evaluation**：给定模型和观测序列，这段观测出现的概率有多大？
- **Decoding**：最可能的隐藏状态路径是什么？
- **Posterior inference**：某个位置属于某个状态的概率有多大？

对应地，最经典的算法是：

- **Forward algorithm**：解决 evaluation；
- **Backward algorithm**：从反方向补充概率信息；
- **Viterbi algorithm**：解决最可能路径的 decoding；
- **Forward-backward**：把前向和后向信息结合起来，得到位点级的 posterior 解释。

## 为什么不能只看局部最优

如果只看某一个位置最像哪个状态，很容易忽略“整条路径的结构约束”：

- 当前状态是否容易从上一个状态转移而来；
- 未来观测是否支持这次选择；
- 整体路径是否比局部最优更重要。

这就是为什么 HMM 的推断通常要靠动态规划，而不是逐位独立判断。

## Forward：观测序列的总体概率

Forward 的目标是：

- 给定 HMM 参数；
- 给定观测序列 `o_1, o_2, ..., o_T`；
- 计算这段观测在模型下出现的总概率。

定义：

$$
\alpha_t(j) = P(o_1, o_2, ..., o_t, z_t = j)
$$

它表示：

- 到时间 `t` 为止，已经观察到前 `t` 个符号；
- 且此刻处于状态 `j`；
- 的联合概率。

递推核心在于：

- 把前一时刻所有可能状态的概率加总；
- 再乘以转移概率和当前状态的发射概率。

## Backward：从未来观测往回看

Backward 的思路与 Forward 对称。

定义：

$$
\beta_t(i) = P(o_{t+1}, o_{t+2}, ..., o_T \mid z_t = i)
$$

它表示：

- 如果在时刻 `t` 已经知道当前状态是 `i`；
- 那么从 `t+1` 到结尾剩余观测出现的概率是多少。

Backward 提供的是“未来支持信息”，它本身很少单独解释，但与 Forward 结合后非常有用。

## Viterbi：最可能的单一路径

Viterbi 解决的是：

> 在所有可能的隐藏状态路径中，哪一条的概率最大？

定义：

$$
V_t(j) = \max_i \left[V_{t-1}(i) \cdot a_{ij} \cdot b_j(o_t)\right]
$$

与 Forward 的区别在于：

- Forward 对前一时刻的所有路径做“求和”；
- Viterbi 只保留概率最大的那一条路径（求最大值）。

因此：

- Forward 更关心“总体可能性”；
- Viterbi 更关心“最佳解释”。

## Forward-backward：位点级 posterior

把前向和后向信息结合起来，可以得到：

- 某个位置 `t` 属于状态 `j` 的 posterior 概率；
- 即便这条状态不在整体最优路径中，它也可能在该位置上具有很高局部概率。

这就引出了一个很重要的概念区分：

- **最可能路径**（Viterbi path）
- **每个位点最可能状态**（posterior decoding）

它们并不一定一样。

## 一个直观例子

假设我们想判断一条 DNA 序列中的位置更像：

- `H`：高 GC 区域；
- `L`：低 GC 区域；

对于序列：

```text
G C G A
```

- Forward 会告诉我们：这整段观测在模型下整体有多可能；
- Viterbi 会告诉我们：最可能的一整条状态路径是什么，例如 `H H H L`；
- Forward-backward 则可能告诉我们：
  - 第 1 位有 0.9 概率是 `H`；
  - 第 4 位有 0.6 概率是 `L`；

这两种解释都很有用，但回答的是不同问题。

## 与 gene prediction / profile HMM 的关系

- **Gene prediction**：
  - Viterbi 常用于输出最可能的 exon/intron 结构路径；
- **Profile HMM**：
  - Forward/Backward 常用于评估一条序列与某个 profile 的匹配程度；
- **一般 HMM 分析**：
  - 需要根据任务目标选择“整体路径”还是“位点后验”。

## 常见误区

### Viterbi 等于 HMM 的全部

不是。它只是 decoding 问题的经典解法之一；Forward 和 Backward 处理的是不同问题。

### 每个位点最可能状态拼起来，就是最可能路径

不一定。局部最优的逐位选择不一定构成全局最优路径。

### Forward / Backward 只是理论公式，没有实际作用

不是。它们是评估模型和做 posterior 推断的核心，也是很多学习算法的基础。

## 相关页面

- [隐马尔可夫模型](./hmm.md)
- [Profile HMM](./profile-hmm.md)
- [Gene prediction](./gene-prediction.md)

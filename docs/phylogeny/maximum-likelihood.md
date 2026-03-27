---
sidebar_position: 5
description: maximum likelihood 系统发育的核心思想：在给定演化模型下寻找最可能产生观测序列的树。
pagination_label: Maximum Likelihood
---

# Maximum Likelihood

## 是什么

Maximum likelihood（最大似然）在系统发育中的核心问题是：

> 在给定演化模型的前提下，哪一棵树最可能生成当前观察到的序列数据？

与 parsimony 的“最少变化”不同，这里关心的是：

- 如果替换、分支长度、状态转移都遵循某个概率模型；
- 那么当前数据在某棵树上的概率有多大。

## 为什么它比 parsimony 更模型化

Parsimony 更像在问：

- 最少需要多少步变化？

Maximum likelihood 则在问：

- 在这套演化模型下，这样的观测有多可能？

因此它需要更多输入：

- 树拓扑；
- 分支长度；
- 替换模型（不同碱基之间变化概率如何）；
- 可能还包括位点间变异率差异等因素。

## 直观理解

想象一棵候选树已经给定，那么：

- 每个内节点的祖先状态虽然不可见，但可以被边缘化；
- 对于每个位点，都可以计算：
  - 在这棵树和这个替换模型下，观察到当前叶子状态的概率；
- 所有位点组合起来，就得到这棵树的整体 likelihood。

于是，树推断的目标就变成：

- 在所有候选树和参数中，找到 likelihood 最大的那一组。

## 为什么它更困难

Maximum likelihood 通常比距离法和 parsimony 都更重：

- 候选树空间巨大；
- 每棵树都要结合演化模型计算 likelihood；
- 分支长度等参数往往还要同时优化；

因此在实际中：

- 也常依赖启发式树搜索；
- 需要较高的计算代价；
- 但在很多场景下，结果更灵活也更可信。

## 它的优势

Maximum likelihood 的优势在于：

- 能显式表达演化过程假设；
- 可以区分不同替换模式；
- 能把 branch length 和位点变化率纳入统一框架；
- 比单纯最少变化更适合复杂数据。

这也是为什么现代系统发育中，likelihood（以及后续 Bayesian）方法通常被视为更主流的模型化路线。

## 它的代价与局限

- 对模型选择敏感；
- 计算量通常很大；
- 对 alignment 质量高度依赖；
- 不同模型、分区和参数设定会改变结果。

也就是说，maximum likelihood 更强，但也更依赖“输入数据 + 模型 + 计算搜索”三者的质量。

## 与 MSA 的关系

Maximum likelihood 系统发育通常建立在多序列比对之上：

- MSA 提供每个位点的对应关系；
- likelihood 方法再基于这些列去评估树；

因此，如果 MSA 本身不稳定，后续 likelihood tree 的解释也会受到影响。

## 与 parsimony 的关系

可以把这两类方法简单对照为：

- **Parsimony**：
  - 最少变化；
  - 更偏组合优化；
- **Maximum likelihood**：
  - 在模型下数据最可能；
  - 更偏概率建模。

它们都试图解释同一批序列数据，但采用了不同的“什么叫好树”的标准。

## 相关页面

- [Parsimony](./parsimony.md)
- [距离方法概览](./distance-methods.md)
- [加法系统发育（Additive Phylogeny）](./additive-phylogeny.md)
- [多序列比对（MSA）](../alignment/multiple-sequence-alignment.md)

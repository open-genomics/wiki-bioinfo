---
sidebar_position: 5
description: Maximum Likelihood系统发育算法详解：通过Pruning算法计算似然值，理解替换模型和参数优化的树推断方法。
pagination_label: Maximum Likelihood算法
---

import SummaryBox from '@site/src/components/docs/SummaryBox';
import DefinitionList from '@site/src/components/docs/DefinitionList';

# Maximum Likelihood算法

<SummaryBox
  summary="Maximum Likelihood（最大似然）通过在给定演化模型下寻找最可能产生观测序列的系统发育树，使用Pruning算法高效计算似然值，是现代系统发育分析的主流方法。"
  bullets={[
    '核心思想是在给定替换模型下，找到使观测数据概率最大的树和参数',
    'Pruning算法（Felsenstein的pruning algorithm）通过动态规划高效计算似然值',
    '是理解模型化系统发育推断的关键，连接了概率论和进化生物学',
  ]}
/>

## 是什么

Maximum Likelihood（最大似然）在系统发育中的核心问题是：

> 在给定演化模型的前提下，哪一棵树最可能生成当前观察到的序列数据？

与parsimony的"最少变化"不同，这里关心的是：

- 如果替换、分支长度、状态转移都遵循某个概率模型
- 那么当前数据在某棵树上的概率有多大

## 要解决什么生物信息学问题

Maximum Likelihood解决的是：
- 给定多序列比对结果和演化模型，如何找到最可能产生这些数据的系统发育树
- 如何同时优化树拓扑、分支长度和模型参数
- 如何在概率框架下评估不同树的相对优劣

## 为什么重要

Maximum Likelihood的重要性体现在：
- **统计基础**：建立在严格的统计推断框架上
- **模型化**：显式建模演化过程，更符合生物学直觉
- **准确性**：在复杂场景下通常比距离法和parsimony更准确
- **主流地位**：是现代系统发育分析的标准方法

## 核心思想

<DefinitionList
  items={[
    {
      term: '似然函数 L(T, θ|D)',
      definition: '给定树T和参数θ下，观测数据D的概率。目标是找到使L最大的T和θ。',
    },
    {
      term: '替换模型',
      definition: '描述不同字符状态之间如何随时间变化的概率模型，如Jukes-Cantor、HKY、GTR等。',
    },
    {
      term: '分支长度',
      definition: '表示演化量的参数，通常用期望替换数衡量。',
    },
  ]}
/>

### 与Parsimony的区别

- **Parsimony**：
  - 最少需要多少步变化
  - 更偏组合优化
  - 不考虑概率
- **Maximum Likelihood**：
  - 在模型下数据最可能
  - 更偏概率建模
  - 显式考虑替换概率

## 数学模型

### 似然函数定义

给定树T、分支长度向量b、替换模型参数θ，观测数据D（多序列比对）的似然为：

$$
L(T, b, \theta | D) = P(D | T, b, \theta)
$$

### 位点独立假设

假设不同位点独立演化，总似然是各位点似然的乘积：

$$
L(T, b, \theta | D) = \prod_{k=1}^{L} P(D_k | T, b, \theta)
$$

其中 $D_k$ 是第k个位点的观测状态。

### 对数似然

为避免数值下溢，通常使用对数似然：

$$
\ell(T, b, \theta | D) = \sum_{k=1}^{L} \log P(D_k | T, b, \theta)
$$

### 替换模型

常见的替换模型包括：

**Jukes-Cantor (JC69)**：
- 所有替换速率相同
- 碱基频率相等

**HKY85**：
- 转换和颠换速率不同
- 碱基频率可以不等

**GTR**：
- 最一般的可逆模型
- 不同替换对有不同速率

### 转移概率矩阵

对于分支长度t，转移概率矩阵P(t)描述状态随时间变化的概率：

$$
P_{ij}(t) = P(\text{状态} j \text{ 在时间} t \text{ 后} | \text{状态} i \text{ 在时间} 0)
$$

## Pruning算法（Felsenstein's Pruning Algorithm）

Pruning算法是计算似然值的核心技术，使用动态规划避免枚举所有可能的祖先状态。

### 算法思想

对于每个内节点，计算条件似然向量：

<DefinitionList
  items={[
    {
      term: '条件似然 L_v(a)',
      definition: '节点v的子树在v取状态a时的似然值。',
    },
    {
      term: '后序遍历',
      definition: '从叶子到根计算条件似然，避免重复计算。',
    },
    {
      term: '边缘化',
      definition: '对祖先状态求和，考虑所有可能的祖先状态。',
    },
  ]}
/>

### 算法步骤

**算法1：Pruning算法（计算单个位点的似然）**

```
输入：树T，第k个位点的叶子节点状态，转移概率矩阵P(t)，分支长度
输出：该位点的似然值

1. 后序遍历树T
2. 对于每个节点v：
   a. 如果v是叶子节点，观测状态为s：
      L_v(a) = 1 if a == s else 0
   b. 如果v是内节点，有子节点left和right：
      for each state a:
         L_v(a) = [∑_b P_{ab}(t_left) · L_left(b)] ·
                  [∑_c P_{ac}(t_right) · L_right(c)]
3. 计算根节点的似然：
   L_root = ∑_a π_a · L_root(a)
   其中π是平衡频率向量
4. 返回 L_root
```

**时间复杂度**：$O(n \cdot |\Sigma|^2)$，其中n是节点数，$|\Sigma|$是状态数
**空间复杂度**：$O(n \cdot |\Sigma|)$

## Worked Example（Pruning算法）

考虑3个物种的某个位点，状态为：A、C、G

树结构：
```
    root
   /    \
  n1     n2
 / \      \
A   C      G
```

假设使用Jukes-Cantor模型，分支长度为：
- root→n1: t1 = 0.1
- root→n2: t2 = 0.2
- n1→A: t3 = 0.05
- n1→C: t4 = 0.05
- n2→G: t5 = 0.1

### 转移概率（简化）

对于小t，Jukes-Cantor转移概率近似为：
- P(a→a) ≈ 1 - 3αt
- P(a→b) ≈ αt (b≠a)

其中α = 1/4。

### 后序遍历计算

**叶子节点**：
- L_A(A) = 1, L_A(C) = L_A(G) = L_A(T) = 0
- L_C(C) = 1, L_C(A) = L_C(G) = L_C(T) = 0
- L_G(G) = 1, L_G(A) = L_G(C) = L_G(T) = 0

**节点n1**：
- L_n1(A) = P(A→A, t3)·L_A(A)·P(A→C, t4)·L_C(C) + P(A→C, t3)·L_A(C)·P(C→C, t4)·L_C(C) + ...
- 简化：L_n1(A) ≈ (1-3α·0.05)·1·(α·0.05)·1 + (α·0.05)·0·(1-3α·0.05)·1 ≈ α·0.05
- 类似计算其他状态...

**节点n2**：
- L_n2(G) = P(G→G, t5)·L_G(G) ≈ 1-3α·0.1
- 其他状态接近0

**节点root**：
- L_root = ∑_a π_a · L_root(a)
- 其中π_a = 0.25（JC69假设等频率）

最终得到该位点的似然值。

## 参数优化

Maximum Likelihood不仅优化树拓扑，还要优化分支长度和模型参数。

### 优化目标

$$
\max_{T, b, \theta} \ell(T, b, \theta | D)
$$

### 优化策略

1. **固定树拓扑，优化参数**：
   - 使用牛顿法、BFGS等优化算法
   - 分别优化分支长度和模型参数

2. **树拓扑搜索**：
   - NNI (Nearest Neighbor Interchange)
   - SPR (Subtree Pruning and Regrafting)
   - TBR (Tree Bisection and Reconnection)

3. **交替优化**：
   - 在固定拓扑下优化参数
   - 在固定参数下搜索拓扑
   - 重复直到收敛

## 常见替换模型

### Jukes-Cantor (JC69)

最简单的模型：
- 所有替换速率相同
- 碱基频率相等（π_A = π_C = π_G = π_T = 0.25）

参数数量：0（除了分支长度）

### HKY85

- 转换（A↔G, C↔T）和颠换速率不同
- 碱基频率可以不等

参数数量：1（转换/颠换比率κ）+ 3（碱基频率）

### GTR (General Time Reversible)

最一般的可逆模型：
- 不同替换对有不同速率
- 碱基频率可以不等

参数数量：5（相对替换速率）+ 3（碱基频率）

### Γ模型（Gamma分布）

考虑位点间速率变异：
- 位点速率服从Gamma分布
- 用形状参数α描述变异程度

## 复杂度分析

### 计算单个位点似然

- Pruning算法：$O(n \cdot |\Sigma|^2)$ 时间，$O(n \cdot |\Sigma|)$ 空间

### 计算所有位点似然

- 总时间：$O(n \cdot |\Sigma|^2 \cdot L)$，其中L是序列长度

### 搜索最优树

- 启发式搜索：取决于具体策略，通常为多项式时间但不保证最优
- 实际中：对于中等规模数据（n<100），可以在合理时间内完成

## 适用场景

### 适合使用Maximum Likelihood的情况

- 需要准确的系统发育推断
- 序列差异较大，需要考虑多次替换
- 不同分支演化速率不均匀
- 需要统计置信度评估（bootstrap）

### 不适合使用Maximum Likelihood的情况

- 数据量非常大（计算代价高）
- 序列很短（模型参数估计不稳定）
- 需要快速初步分析（此时可用NJ等距离法）

## 与Bayesian方法的关系

Maximum Likelihood是Bayesian方法的特例：

- **Maximum Likelihood**：
  - 找到使似然最大的参数
  - 不考虑先验分布
  - 点估计

- **Bayesian**：
  - 计算后验分布 P(T, θ | D)
  - 考虑先验分布 P(T, θ)
  - 区间估计

## 优缺点总结

### 优点

- 建立在严格的统计框架上
- 显式建模演化过程
- 对复杂演化模式鲁棒
- 可以提供统计置信度
- 是现代系统发育的标准方法

### 缺点

- 计算代价高
- 对模型选择敏感
- 依赖alignment质量
- 可能陷入局部最优
- 需要较多的计算资源

## 常见误区

### Maximum Likelihood总是得到正确答案

不是。Maximum Likelihood找到的是在给定模型下最可能产生数据的树，但如果模型错误，结果也可能错误。

### Maximum Likelihood不需要任何假设

不是。Maximum Likelihood依赖于：
- 位点独立演化
- 替换模型的正确性
- 树的拓扑结构（虽然搜索）
- 序列比对的准确性

### Maximum Likelihood比Parsimony总是更好

不一定。在某些情况下（如序列非常相似、演化速率恒定），Parsimony可能同样有效且更快。

### Maximum Likelihood只能用于DNA序列

不是。Maximum Likelihood可以用于蛋白质序列、密码子序列、形态学数据等，只需要合适的替换模型。

## 与真实工具的连接

Maximum Likelihood在真实工具中的应用：

- **RAxML**：最快的ML实现之一，支持大规模数据
- **IQ-TREE**：支持模型选择和超快bootstrap
- **PhyML**：经典的ML实现
- **PAUP***：支持多种系统发育方法包括ML

现代应用中，Maximum Likelihood是：
- 发表高质量系统发育研究的标准方法
- 大规模基因组分析的首选
- 与其他方法（如Bayesian）对比的基准

## 算法优化

### 快速似然计算

- 向量化计算（SIMD指令）
- GPU加速
- 近似算法

### 并行化

- 位点级并行
- 树搜索并行
- 参数优化并行

## 参考资料

- Felsenstein, J. (1981). Evolutionary trees from DNA sequences: a maximum likelihood approach. *Journal of molecular evolution*, 17(6), 368-376.
- Felsenstein, J. (2004). *Inferring phylogenies*. Sinauer associates.
- Yang, Z. (2006). *Computational molecular evolution*. Oxford University Press.

## 相关页面

- [Parsimony](./parsimony.md)
- [距离方法概览](./distance-methods.md)
- [UPGMA算法](./upgma.md)
- [Neighbor-Joining算法](./neighbor-joining.md)
- [多序列比对（MSA）](../alignment/multiple-sequence-alignment.md)

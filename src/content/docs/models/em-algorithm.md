---
description: EM算法详解：理解如何处理含隐变量的概率模型参数估计，是motif discovery和聚类等任务的核心算法。
title: "EM算法"
---

import SummaryBox from '@site/src/components/docs/SummaryBox';
import DefinitionList from '@site/src/components/docs/DefinitionList';


<SummaryBox
  summary="EM算法（Expectation-Maximization）是处理含隐变量概率模型参数估计的通用框架，在motif discovery、聚类和HMM训练中有广泛应用。"
  bullets={[
    '重点理解E步和M步的交替迭代过程',
    'EM算法不保证全局最优，但保证单调改进似然',
  ]}
/>

## 是什么

EM算法（Expectation-Maximization，期望最大化算法）是一种用于寻找含隐变量（latent variable）概率模型参数最大似然估计的迭代算法。

它的核心思想是：
- 当直接优化似然函数困难时，引入隐变量
- 交替进行E步（计算期望）和M步（最大化期望）
- 逐步改进参数估计，直到收敛

## 为什么重要

在生物信息学中，EM算法的价值体现在：

- **Motif discovery**：MEME等工具使用EM算法寻找转录因子结合位点
- **聚类**：Gaussian Mixture Model的参数估计
- **HMM训练**：Baum-Welch算法是EM算法在HMM上的特例
- **缺失数据处理**：处理观测数据不完整的情况

EM算法提供了一个统一的框架，处理那些"如果能知道隐变量，问题就很简单"的场景。

## 核心思想

### 问题设定

给定观测数据 $X = \{x_1, x_2, ..., x_n\}$ 和隐变量 $Z = \{z_1, z_2, ..., z_n\}$，我们希望找到参数 $\theta$ 使得对数似然最大化：

$$
\ell(\theta) = \log P(X; \theta) = \log \sum_Z P(X, Z; \theta)
$$

由于求和在对数内部，直接优化很困难。

### EM的洞察

如果我们知道隐变量 $Z$，那么完整数据的对数似然为：

$$
\ell_c(\theta) = \log P(X, Z; \theta)
$$

这个函数通常更容易优化。EM算法的思想是：
- 在不知道 $Z$ 的情况下，用当前参数估计 $Z$ 的分布
- 基于这个分布，计算完整数据似然的期望
- 最大化这个期望得到新参数

## 算法描述

<DefinitionList
  items={[
    {
      term: 'E步（Expectation）',
      definition: '基于当前参数 $\theta^{(t)}$，计算隐变量 $Z$ 的后验分布 $P(Z|X, \theta^{(t)})$。',
    },
    {
      term: 'M步（Maximization）',
      definition: '基于E步得到的分布，计算Q函数并最大化，得到新参数 $\theta^{(t+1)}$。',
    },
    {
      term: 'Q函数',
      definition: '完整数据对数似然在隐变量分布下的期望：$Q(\theta, \theta^{(t)}) = E_{Z|X,\theta^{(t)}}[\log P(X, Z; \theta)]$。',
    },
  ]}
/>

### 通用EM算法

**算法1：通用EM算法**

```
输入：观测数据 X，初始参数 θ^(0)，收敛阈值 ε
输出：估计参数 θ

1. t = 0
2. repeat:
   // E步：计算Q函数
   a. Q(θ, θ^(t)) = E_{Z|X,θ^(t)}[log P(X, Z; θ)]
   
   // M步：最大化Q函数
   b. θ^(t+1) = argmax_θ Q(θ, θ^(t))
   
   c. t = t + 1
3. until |ℓ(θ^(t)) - ℓ(θ^(t-1))| < ε
4. return θ^(t)
```

**时间复杂度**：取决于具体模型，通常每次迭代 $O(n \cdot d)$，其中 $n$ 为数据量，$d$ 为参数维度

**收敛性**：保证单调增加似然，但不保证全局最优

## 在Motif Discovery中的应用

### 问题设定

给定一组序列，寻找一个共同的motif模式：
- 每个序列中motif的位置是隐变量
- motif的PWM（位置权重矩阵）是需要估计的参数

### EM for Motif Discovery

**算法2：EM算法用于motif discovery**

```
输入：序列集合 S = {s_1, s_2, ..., s_n}，motif长度 L
输出：motif的PWM M

1. 初始化：随机选择每个序列中motif的起始位置
2. repeat:
   // E步：计算每个序列每个位置是motif起始位置的概率
   a. for each 序列 s_i:
      for each 可能起始位置 j:
         P(位置 j 是motif | s_i, M) ∝ P(s_i[j:j+L] | M) · P(j)
   
   // M步：基于概率更新PWM
   b. for each motif位置 k = 1 to L:
      for each 字符 c ∈ {A, C, G, T}:
         M[k][c] = (1 + Σ_i Σ_j P(位置 j 是motif | s_i, M) · I(s_i[j+k-1] = c)) / (4 + Σ_i Σ_j P(...))
3. until 收敛
4. return M
```

**时间复杂度**：每次迭代 $O(n \cdot |s| \cdot L)$，其中 $|s|$ 为平均序列长度

## 在Gaussian Mixture Model中的应用

### 问题设定

给定数据点，假设它们来自多个高斯分布的混合：
- 每个数据点来自哪个高斯分布是隐变量
- 每个高斯分布的均值、方差和混合权重是需要估计的参数

### EM for GMM

**算法3：EM算法用于GMM**

```
输入：数据 X = {x_1, x_2, ..., x_n}，混合分量数 K
输出：每个高斯分量的参数 {μ_k, Σ_k, π_k}

1. 初始化：随机初始化 μ_k, Σ_k, π_k
2. repeat:
   // E步：计算每个数据点来自每个分量的概率
   a. for each 数据点 x_i:
      for each 分量 k:
         γ_ik = P(z_i = k | x_i, θ) = π_k · N(x_i | μ_k, Σ_k) / Σ_j π_j · N(x_i | μ_j, Σ_j)
   
   // M步：更新参数
   b. N_k = Σ_i γ_ik
   c. π_k = N_k / n
   d. μ_k = Σ_i γ_ik · x_i / N_k
   e. Σ_k = Σ_i γ_ik · (x_i - μ_k)(x_i - μ_k)^T / N_k
3. until 收敛
4. return {μ_k, Σ_k, π_k}
```

**时间复杂度**：每次迭代 $O(n \cdot K \cdot d^2)$，其中 $d$ 为数据维度

## worked example

### 简单的硬币抛掷问题

假设有两枚硬币A和B，但不知道哪枚是哪枚。我们进行了5轮实验，每轮抛掷10次：

```
轮次: 1  2  3  4  5
结果: H T T T H  (5 heads, 5 tails)
      T H T H T  (5 heads, 5 tails)
      H H T H T  (7 heads, 3 tails)
      H T H T T  (4 heads, 6 tails)
      T H H H T  (6 heads, 4 tails)
```

每轮随机选择硬币A或B，但我们不知道选了哪枚。

### EM求解

**初始化**：假设 $\theta_A = 0.6$, $\theta_B = 0.5$

**第1轮迭代**：

E步：计算每轮使用硬币A的概率
- 第1轮：$P(A|data) \propto 0.6^5 \cdot 0.4^5 = 0.6^5 \cdot 0.4^5$
- 第2轮：$P(A|data) \propto 0.5^5 \cdot 0.5^5 = 0.5^{10}$
- ...

M步：基于概率更新 $\theta_A$ 和 $\theta_B$
- $\theta_A = \frac{\text{期望的heads数}}{\text{期望的总抛掷数}}$
- $\theta_B = \frac{\text{期望的heads数}}{\text{期望的总抛掷数}}$

**收敛**：重复直到参数变化很小。

## 复杂度与收敛性

### 收敛性保证

- **单调性**：每次迭代保证不降低对数似然
- **收敛到局部最优**：可能收敛到局部最优，不保证全局最优
- **收敛速度**：通常是线性收敛，在某些情况下可以是二次收敛

### 初始化敏感性

EM算法对初始化敏感：
- 不同的初始参数可能收敛到不同的局部最优
- 实践中常用多次随机初始化，选择似然最高的结果

### 常见变体

- **Hard EM**：在E步中选择最可能的隐变量值（而非分布）
- **Generalized EM**：在M步只部分改进Q函数（而非完全最大化）
- **Stochastic EM**：在E步中使用采样而非精确计算

## 在生物信息学中的位置

EM算法在生物信息学中的核心应用：

- **Motif discovery**：MEME等工具的核心算法
- **聚类**：单细胞数据聚类、基因表达模式识别
- **HMM训练**：Baum-Welch算法是EM算法的特例
- **基因预测**：某些基因预测工具使用EM估计参数

## 与其他算法的关系

| 算法 | 与EM的关系 | 应用场景 |
|------|-----------|---------|
| Baum-Welch | EM在HMM上的特例 | HMM参数估计 |
| K-means | Hard EM在GMM上的特例 | 聚类 |
| Gibbs sampling | MCMC方法，可用于近似E步 | 复杂模型的近似推断 |
| Variational inference | 确定性近似，可用于加速E步 | 大规模模型的近似推断 |

## 常见误区

### EM总能找到全局最优

不能。EM保证单调改进似然，但可能收敛到局部最优。需要多次随机初始化。

### EM总是收敛

在大多数实际情况下EM会收敛，但在某些病态情况下可能不收敛或收敛很慢。

### EM比梯度下降慢

不一定。EM在某些问题上比梯度下降更快，特别是在E步和M步都有解析解的情况下。

### EM只能用于离散隐变量

不是。EM可以处理连续隐变量，只要能计算E步的期望和M步的优化。

## 参考资料

- Dempster, A. P., Laird, N. M., & Rubin, D. B. (1977). "Maximum likelihood from incomplete data via the EM algorithm"
- Bishop, C. M. *Pattern Recognition and Machine Learning*, Chapter 9
- Bailey, T. L., & Elkan, C. (1994). "Fitting a mixture model by expectation maximization to discover motifs in biopolymers"

## 相关页面

- [Motif discovery的算法路线](./motif-discovery-algorithms.md)
- [PWM与PSSM](./pwm-pssm.md)
- [隐马尔可夫模型](./hmm.md)
- [Viterbi、Forward与Backward](./viterbi-forward-backward.md)

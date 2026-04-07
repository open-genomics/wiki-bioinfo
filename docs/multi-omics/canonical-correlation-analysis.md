---
sidebar_position: 7
description: 典型相关分析详解：寻找两组变量间的最大相关性，理解多组学整合的经典统计方法。
pagination_label: 典型相关分析
---

import SummaryBox from '@site/src/components/docs/SummaryBox';
import DefinitionList from '@site/src/components/docs/DefinitionList';

# 典型相关分析（CCA）

<SummaryBox
  summary="CCA 通过寻找两组变量的线性组合使它们之间的相关性最大化，是分析两组数据关联的经典统计方法，也是多组学整合的重要基础。"
  bullets={[
    '核心是最大化跨组学相关性，而非重构误差',
    '可扩展到多组学（Group CCA）和非线性场景（Kernel CCA、Deep CCA）',
    '是理解现代深度多模态学习对比损失的思想源头',
  ]}
/>

## 是什么

典型相关分析（Canonical Correlation Analysis, CCA）是 Pearson 相关分析在多变量场景下的自然扩展。

给定两组数据：
- $X \in \mathbb{R}^{n \times p}$：第一组变量（如基因表达）
- $Y \in \mathbb{R}^{n \times q}$：第二组变量（如甲基化）

CCA 寻找线性组合：
- $u = X w_x$（$X$ 的典型变量）
- $v = Y w_y$（$Y$ 的典型变量）

使得 $u$ 和 $v$ 之间的相关性最大化。

## 为什么重要

在生物信息学中，CCA 的价值体现在：

- **关联发现**：直接优化跨组学相关性，适合发现两组数据间的关联模式
- **理论基础**：是理解多模态学习、对比学习等现代方法的基础
- **可扩展性**：可扩展到多组学（Group CCA）、非线性（Kernel CCA）、深度学习（Deep CCA）
- **解释性**：典型变量和权重具有统计学解释

虽然现代深度学习方法在灵活性上更强，但 CCA 仍然是理解多组学关联分析的重要工具。

## 核心思想

### Pearson 相关的回顾

对于两个标量变量 $x$ 和 $y$，Pearson 相关系数为：

$$
\rho = \frac{\text{Cov}(x, y)}{\sqrt{\text{Var}(x) \text{Var}(y)}}
$$

### CCA 的扩展

对于两组变量，CCA 寻找投影方向 $w_x$ 和 $w_y$，使得：

$$
\max_{w_x, w_y} \frac{w_x^T \Sigma_{xy} w_y}{\sqrt{w_x^T \Sigma_{xx} w_x \cdot w_y^T \Sigma_{yy} w_y}}
$$

其中：
- $\Sigma_{xx} = X^T X$ 是 $X$ 的协方差矩阵
- $\Sigma_{yy} = Y^T Y$ 是 $Y$ 的协方差矩阵
- $\Sigma_{xy} = X^T Y$ 是 $X$ 和 $Y$ 的交叉协方差矩阵

### 直观理解

- $w_x$ 和 $w_y$ 是"权重向量"，告诉我们如何组合原始变量
- $u = X w_x$ 和 $v = Y w_y$ 是"典型变量"，代表两组数据的综合指标
- CCA 找到使 $u$ 和 $v$ 最相关的组合方式

## 数学模型

### 优化问题

CCA 的优化问题可以等价地写成：

$$
\max_{w_x, w_y} w_x^T \Sigma_{xy} w_y
$$

约束条件：
$$
w_x^T \Sigma_{xx} w_x = 1, \quad w_y^T \Sigma_{yy} w_y = 1
$$

这个约束确保典型变量的方差为 1，避免平凡解。

### 多对典型变量

CCA 可以找到多对典型变量 $(u_1, v_1), (u_2, v_2), ..., (u_r, v_r)$，其中 $r = \min(p, q)$。

约束：
- 不同对的典型变量之间互不相关：
  - $\text{Cov}(u_i, u_j) = 0$ for $i \neq j$
  - $\text{Cov}(v_i, v_j) = 0$ for $i \neq j$
- 相关性递减：$\rho_1 \geq \rho_2 \geq ... \geq \rho_r$

<DefinitionList
  items={[
    {
      term: '典型相关系数 $\rho_k$',
      definition: '第 k 对典型变量之间的相关系数，衡量两组数据在第 k 个方向上的关联强度。',
    },
    {
      term: '典型变量 $u_k, v_k$',
      definition: '通过线性组合得到的综合变量，代表了两组数据在某个关联方向上的投影。',
    },
    {
      term: '权重向量 $w_x^{(k)}, w_y^{(k)}$',
      definition: '决定如何组合原始变量以得到典型变量的系数，可用于特征选择和解释。',
    },
  ]}
/>

## 算法步骤

### 步骤 1：数据标准化

**算法1：数据标准化**

```
输入：原始矩阵 X ∈ R^{n×p}, Y ∈ R^{n×q}
输出：标准化后的 X', Y'

1. 对 X：
   a. 计算每列均值 μ_j = mean(X[:,j])
   b. 计算每列标准差 σ_j = std(X[:,j])
   c. X'[i,j] = (X[i,j] - μ_j) / σ_j

2. 对 Y：重复相同步骤

3. return X', Y'
```

### 步骤 2：计算协方差矩阵

**算法2：计算协方差矩阵**

```
输入：标准化后的 X, Y
输出：Σ_xx, Σ_yy, Σ_xy

1. Σ_xx = (X^T X) / (n-1)
2. Σ_yy = (Y^T Y) / (n-1)
3. Σ_xy = (X^T Y) / (n-1)

4. return Σ_xx, Σ_yy, Σ_xy
```

### 步骤 3：求解广义特征值问题

CCA 的求解可以转化为广义特征值问题：

$$
\begin{bmatrix}
0 & \Sigma_{xy} \\
\Sigma_{yx} & 0
\end{bmatrix}
\begin{bmatrix}
w_x \\
w_y
\end{bmatrix}
= \rho
\begin{bmatrix}
\Sigma_{xx} & 0 \\
0 & \Sigma_{yy}
\end{bmatrix}
\begin{bmatrix}
w_x \\
w_y
\end{bmatrix}
$$

**算法3：求解 CCA**

```
输入：Σ_xx, Σ_yy, Σ_xy，典型变量对数 r
输出：权重矩阵 W_x, W_y，典型相关系数 ρ

1. 计算 M = Σ_xx^{-1} Σ_xy Σ_yy^{-1} Σ_yx

2. 求解 M 的特征值分解：
   M w_x = λ w_x
   得到特征值 λ_1 ≥ λ_2 ≥ ... ≥ λ_r 和特征向量 w_x^{(1)}, ..., w_x^{(r)}

3. 典型相关系数：ρ_k = sqrt(λ_k)

4. 计算对应的 w_y：
   w_y^{(k)} = (1/ρ_k) Σ_yy^{-1} Σ_yx w_x^{(k)}

5. 组装权重矩阵：
   W_x = [w_x^{(1)}, w_x^{(2)}, ..., w_x^{(r)}]
   W_y = [w_y^{(1)}, w_y^{(2)}, ..., w_y^{(r)}]

6. return W_x, W_y, ρ
```

**时间复杂度**：
- 矩阵求逆：$O(p^3 + q^3)$
- 特征值分解：$O(p^3)$
- 总计：$O(p^3 + q^3)$

### 步骤 4：计算典型变量

**算法4：计算典型变量**

```
输入：X, Y, W_x, W_y
输出：典型变量 U, V

1. U = X @ W_x  // n × r
2. V = Y @ W_y  // n × r

3. return U, V
```

## Worked Example

考虑两个组学数据：
- 基因表达：3 个样本，2 个基因
- 甲基化：3 个样本，2 个位点

$$
X = \begin{bmatrix}
1 & 2 \\
2 & 3 \\
3 & 1
\end{bmatrix}, \quad
Y = \begin{bmatrix}
2 & 1 \\
3 & 2 \\
1 & 3
\end{bmatrix}
$$

### 步骤 1：标准化

假设已标准化（均值为 0，方差为 1）：

$$
X' = \begin{bmatrix}
-1 & 0 \\
0 & 1 \\
1 & -1
\end{bmatrix}, \quad
Y' = \begin{bmatrix}
0 & -1 \\
1 & 0 \\
-1 & 1
\end{bmatrix}
$$

### 步骤 2：计算协方差矩阵

$$
\Sigma_{xx} = \frac{1}{2} \begin{bmatrix}
2 & -1 \\
-1 & 2
\end{bmatrix} = \begin{bmatrix}
1 & -0.5 \\
-0.5 & 1
\end{bmatrix}
$$

$$
\Sigma_{yy} = \frac{1}{2} \begin{bmatrix}
2 & -1 \\
-1 & 2
\end{bmatrix} = \begin{bmatrix}
1 & -0.5 \\
-0.5 & 1
\end{bmatrix}
$$

$$
\Sigma_{xy} = \frac{1}{2} \begin{bmatrix}
-1 & 1 \\
1 & -1 \\
0 & 0
\end{bmatrix}^T \begin{bmatrix}
0 & -1 \\
1 & 0 \\
-1 & 1
\end{bmatrix} = \begin{bmatrix}
-0.5 & 0.5 \\
0.5 & -0.5
\end{bmatrix}
$$

### 步骤 3：求解 CCA

计算 $\Sigma_{xx}^{-1}$：

$$
\Sigma_{xx}^{-1} = \frac{1}{1 - 0.25} \begin{bmatrix}
1 & 0.5 \\
0.5 & 1
\end{bmatrix} = \begin{bmatrix}
1.33 & 0.67 \\
0.67 & 1.33
\end{bmatrix}
$$

计算 $M = \Sigma_{xx}^{-1} \Sigma_{xy} \Sigma_{yy}^{-1} \Sigma_{yx}$：

由于 $\Sigma_{yy}^{-1} = \Sigma_{xx}^{-1}$，$\Sigma_{yx} = \Sigma_{xy}^T$：

$$
M = \begin{bmatrix}
1.33 & 0.67 \\
0.67 & 1.33
\end{bmatrix}
\begin{bmatrix}
-0.5 & 0.5 \\
0.5 & -0.5
\end{bmatrix}
\begin{bmatrix}
1.33 & 0.67 \\
0.67 & 1.33
\end{bmatrix}
\begin{bmatrix}
-0.5 & 0.5 \\
0.5 & -0.5
\end{bmatrix}
$$

简化计算（省略中间步骤），得到特征值 $\lambda_1$ 和 $\lambda_2$。

假设 $\lambda_1 = 0.64$，则典型相关系数 $\rho_1 = \sqrt{0.64} = 0.8$。

对应的特征向量 $w_x^{(1)}$ 和 $w_y^{(1)}$ 给出第一对典型变量的权重。

### 步骤 4：解释结果

- 典型相关系数 0.8 表示两组数据在第一个方向上有较强的关联
- 权重向量告诉我们哪些基因和甲基化位点对这种关联贡献最大

## 复杂度分析

### 时间复杂度

- 协方差矩阵计算：$O(n p^2 + n q^2)$
- 矩阵求逆：$O(p^3 + q^3)$
- 特征值分解：$O(p^3)$
- 总计：$O(n p^2 + n q^2 + p^3 + q^3)$

当 $n > p, q$ 时，主导项是 $O(n p^2 + n q^2)$。

### 空间复杂度

- 存储协方差矩阵：$O(p^2 + q^2 + p q)$
- 存储权重矩阵：$O(p r + q r)$
- 总计：$O(p^2 + q^2)$

## 算法变体

### Sparse CCA

在目标函数中加入 L1 正则项：

$$
\max_{w_x, w_y} w_x^T \Sigma_{xy} w_y - \lambda_x \|w_x\|_1 - \lambda_y \|w_y\|_1
$$

**优点**：
- 实现特征选择
- 提高可解释性
- 适合高维数据

**缺点**：
- 优化更复杂
- 需要调参

### Kernel CCA

通过核函数处理非线性关系：

$$
\max_{\alpha, \beta} \alpha^T K_x K_y \beta
$$

约束：$\alpha^T K_x^2 \alpha = 1$，$\beta^T K_y^2 \beta = 1$

其中 $K_x$ 和 $K_y$ 是核矩阵。

**优点**：
- 捕捉非线性关系
- 灵活性高

**缺点**：
- 计算复杂度高
- 核函数选择影响结果

### Group CCA

扩展到多组学（>2 组）：

$$
\max_{w_1, ..., w_K} \sum_{i < j} w_i^T \Sigma_{ij} w_j
$$

### Deep CCA

使用深度神经网络学习非线性映射：

$$
\max_{f, g} \text{Corr}(f(X), g(Y))
$$

其中 $f$ 和 $g$ 是深度网络。

## 参数选择

### 典型变量对数 r

- **肘部法则**：绘制典型相关系数，选择拐点
- **显著性检验**：使用 Wilks' Lambda 检验
- **解释性**：选择能产生可解释结果的 r
- **经验值**：保留典型相关系数 > 0.3 的对

### 正则化参数（Sparse CCA）

- **交叉验证**：在下游任务上交叉验证
- **稳定性选择**：多次运行，选择稳定的特征
- **BIC/AIC**：使用信息准则

## 适用场景

### 适合使用 CCA 的情况

- 两组匹配的样本数据
- 寻找两组变量间的关联模式
- 样本量相对充足（n > p + q）
- 线性关系假设合理
- 需要可解释的权重

### 不适合使用 CCA 的情况

- 样本量不足（n < p + q）
- 非线性关系强（考虑 Kernel CCA 或 Deep CCA）
- 多于两组数据（考虑 Group CCA 或其他方法）
- 需要处理缺失数据（考虑 MOFA+ 等贝叶斯方法）
- 高维稀疏数据（考虑 Sparse CCA）

## 与其他方法的比较

| 方法 | 目标 | 线性 | 可解释性 | 计算效率 | 扩展性 |
|------|------|------|---------|---------|--------|
| CCA | 最大化相关 | 是 | 高 | 高 | 中 |
| Sparse CCA | 最大化相关 + 稀疏 | 是 | 很高 | 中 | 中 |
| Kernel CCA | 最大化相关（非线性） | 否 | 中 | 低 | 低 |
| Deep CCA | 最大化相关（深度） | 否 | 低 | 低 | 高 |
| Joint NMF | 最小化重构误差 | 是 | 高 | 高 | 中 |
| PLS | 最大化协方差 | 是 | 中 | 高 | 中 |

## 在真实工具中的实现

### Python 实现

```python
import numpy as np
from sklearn.cross_decomposition import CCA
from scipy.linalg import eigh

def canonical_correlation_analysis(X, Y, n_components=None):
    """
    CCA 实现
    
    参数:
        X: 第一组数据 (n_samples, n_features_x)
        Y: 第二组数据 (n_samples, n_features_y)
        n_components: 典型变量对数，默认为 min(p, q)
    
    返回:
        W_x: X 的权重矩阵
        W_y: Y 的权重矩阵
        correlations: 典型相关系数
        U: X 的典型变量
        V: Y 的典型变量
    """
    n, p = X.shape
    _, q = Y.shape
    
    if n_components is None:
        n_components = min(p, q)
    
    # 标准化
    X = (X - X.mean(axis=0)) / X.std(axis=0)
    Y = (Y - Y.mean(axis=0)) / Y.std(axis=0)
    
    # 计算协方差矩阵
    Sigma_xx = X.T @ X / (n - 1)
    Sigma_yy = Y.T @ Y / (n - 1)
    Sigma_xy = X.T @ Y / (n - 1)
    
    # 使用 sklearn 的实现
    cca = CCA(n_components=n_components)
    cca.fit(X, Y)
    
    U, V = cca.transform(X, Y)
    W_x = cca.x_weights_
    W_y = cca.y_weights_
    
    # 计算典型相关系数
    correlations = [np.corrcoef(U[:, i], V[:, i])[0, 1] 
                    for i in range(n_components)]
    
    return W_x, W_y, correlations, U, V


# 使用示例
X = np.random.randn(100, 50)  # 100 样本，50 基因
Y = np.random.randn(100, 30)  # 100 样本，30 甲基化位点

W_x, W_y, correlations, U, V = canonical_correlation_analysis(X, Y, n_components=5)

print(f"典型相关系数: {correlations}")
```

### R 实现

```r
# 使用 CCA 包
library(CCA)

# 假设 X 和 Y 是数据矩阵
result <- cc(X, Y)

# 提取结果
canonical_correlations <- result$cor
x_weights <- result$xcoef
y_weights <- result$ycoef
canonical_vars_X <- result$scores$xscores
canonical_vars_Y <- result$scores$yscores
```

## 统计检验

### 显著性检验

检验典型相关系数是否显著不为零：

**Wilks' Lambda**：

$$
\Lambda = \prod_{i=1}^{r} (1 - \rho_i^2)
$$

转换为 F 统计量进行检验。

**Bartlett 检验**：

基于 $\chi^2$ 分布的近似检验。

### 置换检验

非参数方法，通过置换标签计算零分布。

## 常见误区

### 典型相关系数高意味着因果关系

不是。CCA 只能发现关联，不能推断因果方向。

### CCA 可以处理缺失数据

标准 CCA 不能。需要：
- 删除缺失样本
- 填充缺失值
- 使用改进方法（如 probabilistic CCA）

### 典型变量越多越好

不是。后面的典型变量相关性很低，可能只是噪声。应该选择显著的前几对。

### 权重大的特征更重要

不一定。权重受特征尺度影响。需要结合：
- 标准化后的权重
- 特征的原始方差
- 生物学先验知识

### CCA 只能用于两组数据

不是。可以通过 Group CCA 扩展到多组学，或者使用其他整合方法。

## 与深度学习的联系

### 对比学习

现代对比学习（如 CLIP）的思想与 CCA 相关：
- CCA：最大化线性组合的相关性
- 对比学习：最大化神经网络输出的相似度

### 多模态学习

Deep CCA 是多模态深度学习的早期方法，影响了后续的：
- 多模态自编码器
- 跨模态检索
- 联合表示学习

## 参考资料

- Hotelling, H. (1936). "Relations between two sets of variates"
- Hardoon, D. R., et al. (2004). "Canonical Correlation Analysis: An Overview with Application to Learning Methods"
- Witten, D. M., et al. (2009). "A penalized matrix decomposition, with applications to sparse principal components and canonical correlation analysis"
- Andrew, G., et al. (2013). "Deep Canonical Correlation Analysis"

## 相关页面

- [整合算法概览](./integration-algorithms.md)
- [联合NMF](./joint-nmf.md)
- [MOFA+](./mofa-plus.md)
- [机器学习基础](../ml-bioinfo/index.md)
- [统计方法](../ml-bioinfo/statistical-methods.md)

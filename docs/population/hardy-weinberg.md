---
sidebar_position: 2
description: Hardy–Weinberg 平衡的定义、推导与生物信息学中的用途。
---

# Hardy–Weinberg 平衡

## 是什么

Hardy–Weinberg equilibrium（HWE）描述了在一个理想随机交配群体中，如果没有选择、迁移、突变、遗传漂变和非随机交配，那么等位基因频率和基因型频率将在代际间保持稳定。

对于两个等位基因 `A` 和 `a`，若它们的频率分别为：

$$p = f(A), \quad q = f(a), \quad p + q = 1$$

则基因型频率满足：

$$f(AA)=p^2, \quad f(Aa)=2pq, \quad f(aa)=q^2$$

## 为什么重要

HWE 是群体遗传学中的基线模型。它本身并不复杂，但应用非常广：

- 检查基因型数据是否存在系统偏差；
- 在 GWAS 中做变异级别质控；
- 判断某个位点是否受到选择、分层或测序/分型错误影响。

## 推导直觉

一代随机交配时，配子中 `A` 的概率是 `p`，`a` 的概率是 `q`。两个配子独立结合，因此下一代的基因型频率就是二项展开：

$$(p+q)^2 = p^2 + 2pq + q^2$$

这也是 HWE 最常见的来源解释。

## 在数据分析中的用途

### 变异质控

在 SNP 芯片和测序数据中，若某个位点显著偏离 HWE，可能意味着：

- 分型错误；
- 比对错误或重复区域问题；
- 样本污染；
- 群体分层；
- 真正的生物学选择压力。

常见做法是对对照组样本做 HWE 检验，显著偏离的位点作为低质量候选进行过滤。

### 检验方法

最常用的是卡方检验或精确检验。若观察到的基因型计数为：

- `n_AA`
- `n_Aa`
- `n_aa`

则可先估计：

$$\hat p = \frac{2n_{AA}+n_{Aa}}{2N}, \quad \hat q = 1-\hat p$$

再得到期望计数：

$$E_{AA}=N\hat p^2, \quad E_{Aa}=2N\hat p\hat q, \quad E_{aa}=N\hat q^2$$

比较观察值和期望值即可。

## 常见误区

- **偏离 HWE 就一定是错的**：也可能是真实的选择或分层；
- **病例组也应强制满足 HWE**：疾病相关位点在病例组偏离并不奇怪；
- **所有位点都适合卡方检验**：低频变异更适合精确检验；
- **HWE 只与数学推导有关**：它在质控里非常实用。

## 参考资料

- Hartl & Clark, *Principles of Population Genetics*
- PLINK 文档中的 HWE 过滤说明

## 相关页面

- [GWAS](./gwas.md)
- [群体结构](./population-structure.md)
- [变异检测概览](../variants/variant-calling-overview.mdx)

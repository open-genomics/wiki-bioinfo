---
description: 空间去卷积（deconvolution）的数学模型、算法实现与单细胞参考整合策略
title: "去卷积与细胞映射"
---

import RelatedLinks from '@/components/docs/RelatedLinks.astro';
import PrerequisitesBox from '@/components/docs/PrerequisitesBox.astro';

## 是什么

**空间去卷积（Spatial Deconvolution）** 是一类将空间转录组 spot 的混合表达信号分解为各细胞类型贡献比例的计算方法。由于大多数空间平台（如 10x Visium）的一个 spot 包含多个细胞，直接读取的表达值是这些细胞表达谱的加权平均。去卷积的目标是利用单细胞 RNA-seq（scRNA-seq）提供的参考图谱，反推每个 spot 中各细胞类型的组成比例。

<PrerequisitesBox
  items={[
    { title: '空间转录组总览', to: '/wiki-bioinfo/spatial/spatial-transcriptomics-overview' },
    { title: 'spot 与单细胞', to: '/wiki-bioinfo/spatial/spot-vs-single-cell' },
    { title: '单细胞组学', to: '/wiki-bioinfo/single-cell/index' },
  ]}
/>

## 要解决什么生物信息学问题

### 问题背景

在肿瘤微环境、胚胎发育、神经组织等研究中，我们常遇到以下场景：

- 观察到某个空间区域高表达免疫相关基因，但无法确定是哪种免疫细胞富集
- 肿瘤-正常边界区域的 spot 同时表达肿瘤和基质 marker，难以定性注释
- 需要量化不同细胞类型在空间上的共定位模式

### 形式化问题定义

**输入**：
- 空间转录组数据：$Y \in \mathbb{R}^{G \times S}$，基因 × spot 的表达矩阵
- scRNA-seq 参考：细胞类型 $k$ 的参考表达谱 $\mu_k \in \mathbb{R}^G$

**输出**：
- 细胞类型比例矩阵：$W \in \mathbb{R}^{K \times S}$，其中 $W_{k,s}$ 表示细胞类型 $k$ 在 spot $s$ 中的比例

**约束**：
- $\sum_{k=1}^K W_{k,s} = 1$（每个 spot 的比例之和为 1）
- $W_{k,s} \geq 0$（比例非负）

## 核心思想与数学模型

### 线性混合模型

最基本的去卷积假设是 spot 表达为各细胞类型表达的线性组合：

$$
y_{s} = \sum_{k=1}^K w_{k,s} \cdot \mu_k + \epsilon_s
$$

其中：
- $y_s \in \mathbb{R}^G$：spot $s$ 的观测表达向量
- $\mu_k \in \mathbb{R}^G$：细胞类型 $k$ 的参考表达谱
- $w_{k,s} \in [0, 1]$：细胞类型 $k$ 在 spot $s$ 中的比例
- $\epsilon_s$：噪声项（通常假设为高斯或泊松分布）

矩阵形式：

$$
Y = M \cdot W + E
$$

其中 $M \in \mathbb{R}^{G \times K}$ 为参考表达矩阵，$W \in \mathbb{R}^{K \times S}$ 为待求比例矩阵。

### 统计模型扩展

不同工具在基础线性模型上引入不同扩展：

| 工具 | 核心模型 | 关键扩展 |
|------|----------|----------|
| **SPOTlight** | NMF + 约束 | 非负矩阵分解，加入互斥约束 |
| **RCTD** | 泊松模型 + EM | 显式建模平台效应、捕获效率差异 |
| **cell2location** | 贝叶斯层次模型 | 建模 spot 特异的总 mRNA 丰度，支持多切片 |
| **Tangram** | 深度学习映射 | 学习 scRNA-seq 到空间的最优映射函数 |

### cell2location 的生成模型示例

cell2location 使用以下生成过程：

$$
w_{k,s} \sim \text{Gamma}(\alpha_k, \beta_k) \quad \text{(细胞类型先验)}
$$

$$
\lambda_{g,s} = \sum_{k} w_{k,s} \cdot \mu_{g,k} \cdot \gamma_s \quad \text{(期望表达)}
$$

$$
y_{g,s} \sim \text{Poisson}(\lambda_{g,s}) \quad \text{(观测似然)}
$$

其中 $\gamma_s$ 是 spot 特异的总 mRNA 丰度（反映细胞密度差异）。

## 关键算法与实现

### 1. 非负最小二乘法（NNLS）

最简单的实现方式：

$$
\min_{w} \|y - Mw\|_2^2 \quad \text{s.t.} \quad w \geq 0, \sum w = 1
$$

**优点**：简单、快速、可解释
**缺点**：忽略技术噪声、基因间相关性

### 2. 期望最大化（EM）算法

RCTD 使用 EM 算法估计参数：

**E-step**：给定当前参数，计算隐变量的后验分布

$$
P(z_{c} = k | y_s, \theta^{(t)}) \propto w_k^{(t)} \cdot \text{Poisson}(y_c | \mu_k)
$$

**M-step**：最大化期望对数似然，更新参数

$$
w_k^{(t+1)} = \frac{1}{C_s} \sum_{c} P(z_c = k | y_s, \theta^{(t)})
$$

### 3. 变分推断

cell2location 使用变分推断近似后验分布：

- 引入变分分布 $q(w_s)$ 近似真实后验 $p(w_s | y_s)$
- 最大化证据下界（ELBO）：

$$
\mathcal{L} = \mathbb{E}_q[\log p(y_s | w_s)] - \text{KL}(q(w_s) \| p(w_s))
$$

## Worked Example

### 简单案例：两种细胞类型的混合

假设一个 spot 包含肿瘤细胞和基质细胞，我们有以下简化数据：

**参考表达谱**（仅考虑 3 个 marker 基因）：

| 基因 | 肿瘤细胞 | 基质细胞 |
|------|----------|----------|
| EPCAM | 5.0 | 0.1 |
| VIM | 0.2 | 4.0 |
| MKI67 | 3.0 | 0.5 |

**观测到的 spot 表达**（经过标准化）：

| 基因 | 观测值 |
|------|--------|
| EPCAM | 2.5 |
| VIM | 2.0 |
| MKI67 | 1.5 |

**求解**：

设肿瘤细胞比例为 $w_1$，基质细胞为 $w_2 = 1 - w_1$：

$$
\begin{cases}
2.5 \approx 5.0 w_1 + 0.1 w_2 \\
2.0 \approx 0.2 w_1 + 4.0 w_2 \\
1.5 \approx 3.0 w_1 + 0.5 w_2
\end{cases}
$$

使用 NNLS 求解得：$w_1 \approx 0.52$，$w_2 \approx 0.48$

**解释**：该 spot 约含 52% 肿瘤细胞和 48% 基质细胞，符合肿瘤-边界区域的预期。

## 复杂度与适用前提

### 计算复杂度

| 工具 | 时间复杂度 | 空间复杂度 | 适用规模 |
|------|-----------|-----------|----------|
| SPOTlight (NMF) | $O(GKS \cdot I)$ | $O(GK + GS)$ | 中等规模（<10k spots） |
| RCTD | $O(GKS \cdot I)$ | $O(GK + GS)$ | 中等规模 |
| cell2location | $O(GKS \cdot I \cdot V)$ | $O(GK + GS + KV)$ | 大规模（需 GPU 加速） |

注：$I$ 为迭代次数，$V$ 为变分推断的采样数。

### 适用前提与潜在陷阱

| 前提假设 | 潜在问题 | 应对策略 |
|----------|----------|----------|
| 参考包含所有细胞类型 | 缺失细胞类型会被错误分配 | 先进行无监督聚类检测 novel types |
| 参考表达与空间表达可比 | 技术平台差异 | 标准化、批次校正、平台效应建模 |
| 线性混合假设成立 | 细胞间相互作用改变表达 | 考虑邻域效应建模 |
| spot 覆盖区域细胞均匀 | 细胞大小差异导致偏差 | 使用细胞体积加权模型 |

## 与真实工具或流程的连接

### 标准分析流程中的位置

```
scRNA-seq 参考数据
    ↓
聚类注释 → 构建参考表达谱
    ↓
空间数据预处理（质控、标准化）
    ↓
去卷积算法
    ├─ RCTD（推荐用于 10x Visium）
    ├─ cell2location（推荐用于多切片分析）
    ├─ SPOTlight（快速初步分析）
    └─ Tangram（需要单细胞级映射时）
    ↓
细胞类型比例矩阵
    ↓
可视化（空间热图）+ 下游分析（邻域富集、微环境聚类）
```

### 工具选择决策

| 场景 | 推荐工具 | 理由 |
|------|----------|------|
| 单样本、快速分析 | SPOTlight | 无需 GPU，运行快 |
| 多切片、批次复杂 | cell2location | 显式建模批次效应 |
| 需要不确定性估计 | RCTD / cell2location | 提供置信区间 |
| 需要单细胞级映射 | Tangram | 输出单细胞空间坐标 |
| 稀有细胞类型 | cell2location | 对低丰度细胞更敏感 |

## 结果如何解释

### 正确解读比例

去卷积输出的是**相对贡献估计**，而非精确细胞数：

- **比例形式**：spot A = T cell 0.4 + macrophage 0.3 + stromal 0.3
- **解释**：该 spot 的表达信号约 40% 来自 T 细胞，30% 来自巨噬细胞，30% 来自基质细胞
- **不等于**：该 spot 有 4 个 T 细胞、3 个巨噬细胞、3 个基质细胞

### 不确定性评估

贝叶斯方法（cell2location、RCTD）提供比例的后验分布：
- 检查 $w_k$ 的置信区间宽度
- 宽区间表示该 spot 的细胞类型组成难以确定（可能是参考中缺失的类型）

### 生物学解释要点

- **边界区域**：通常显示混合比例（如肿瘤-基质界面）
- **富集区域**：某些区域可能由单一类型主导（如淋巴滤泡）
- **异常模式**：纯肿瘤区域内出现免疫细胞比例，可能提示浸润

## 常见误区

- **"去卷积比例就是精确细胞数"**
  - 比例反映的是对表达信号的贡献，受细胞大小、RNA 含量影响

- **"参考 scRNA-seq 数据集越大越好"**
  - 参考的组织来源、实验条件、病理状态应与空间样本匹配，而非单纯追求细胞数

- **"每个 spot 应该有清晰的主导细胞类型"**
  - 许多生物学区域（如炎症区、发育过渡区）本来就是混合态，均匀比例本身可能是有效信号

- **"去卷积可以检测参考中没有的细胞类型"**
  - 去卷积只能分配已知类型，novel cell type detection 需先进行无监督分析

- **"去卷积结果与组织图像不一致就是错误"**
  - 组织图像（H&E）反映形态学，去卷积反映分子特征，两者可以互补

## 参考资料

- Cable et al., 2022. *Robust decomposition of cell type mixtures in spatial transcriptomics.* Nature Biotechnology (RCTD)
- Kleshchevnikov et al., 2022. *Cell2location maps fine-grained cell types in spatial transcriptomics.* Nature Biotechnology
- Andersson & Lundeberg, 2021. *SPOTlight: seeded NMF regression to deconvolute spatial transcriptomics spots.* Bioinformatics
- Biancalani et al., 2021. *Deep learning and alignment of spatially resolved single-cell transcriptomes with Tangram.* Nature Methods
- Arnold et al., 2023. *Spatial deconvolution of HER2-positive breast cancer delineates tumor-associated cell type interactions.* Nature Communications

<RelatedLinks
  links={[
    { title: '空间转录组总览', to: '/wiki-bioinfo/spatial/spatial-transcriptomics-overview', description: '理解空间数据的产生与技术背景' },
    { title: 'spot 与单细胞', to: '/wiki-bioinfo/spatial/spot-vs-single-cell', description: '理解为什么要进行去卷积' },
    { title: '单细胞组学', to: '/wiki-bioinfo/single-cell/index', description: '构建去卷积所需的参考图谱' },
    { title: '联合 NMF', to: '/wiki-bioinfo/multi-omics/joint-nmf', description: 'NMF 去卷积的数学原理' }
  ]}
/>

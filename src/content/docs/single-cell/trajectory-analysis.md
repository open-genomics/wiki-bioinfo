---
description: 单细胞轨迹推断（trajectory inference）的算法原理，涵盖伪时间（pseudotime）建模、分支轨迹分析、RNA velocity 动态推断及 Monocle、Slingshot、PAGA 等工具的方法论基础。
title: "轨迹推断"
---


## 核心问题

### 从静态快照到动态过程

单细胞 RNA 测序在单个时间点对每个细胞进行采样，产生的是发育或分化过程的**离散快照**。然而，许多生物学问题是动态性质的：

- 干细胞如何逐步分化为功能细胞？
- 免疫激活经历哪些中间状态？
- 肿瘤细胞状态如何转换？

**轨迹推断（Trajectory Inference）** 的核心目标是从这些离散的静态样本中，重建潜在的连续生物学过程。

### 生物学应用场景

| 应用场景 | 研究问题 | 典型系统 |
|---------|---------|---------|
| **发育生物学** | 胚胎发育中的谱系决定和分化路径 | 造血分化、神经发育 |
| **免疫学** | 免疫细胞激活、耗竭和分化轨迹 | T 细胞激活、B 细胞类别转换 |
| **肿瘤学** | 肿瘤进展、耐药性演化 | 肿瘤微环境、治疗响应 |
| **再生医学** | 重编程和转分化过程 | iPSC 诱导、直接转分化 |

## 伪时间（Pseudotime）

### 概念定义

**伪时间**是一个基于细胞状态相似性的连续坐标，用于排序细胞在生物学过程中的相对位置。

**关键特性**：
- 不等于真实时间（实验时间或发育时间）
- 基于转录组相似性的相对排序
- 需预先指定或推断"起点"（root）

### 数学形式化

给定细胞集合 $C = \{c_1, c_2, \ldots, c_N\}$，轨迹推断旨在：

1. 发现潜在的低维流形结构 $M \subset \mathbb{R}^d$
2. 为每个细胞分配伪时间坐标 $\tau_i \in \mathbb{R}_{\geq 0}$
3. 识别分支点和终末状态

### 伪时间能回答的问题

- **时间顺序**：哪些细胞处于过程的早期/晚期？
- **基因动态**：哪些基因随伪时间上/下调（变化基因）？
- **分支命运**：在分支点，哪些因素决定细胞走向哪条路径？
- **关键调控**：哪些转录因子或通路驱动状态转换？

## 轨迹推断算法原理

### 通用框架

大多数轨迹推断方法遵循以下步骤：

$$
\text{高维表达数据} \xrightarrow{\text{降维}} \text{低维嵌入} \xrightarrow{\text{图构建}} \text{细胞图} \xrightarrow{\text{路径搜索}} \text{轨迹} \xrightarrow{\text{伪时间}} \text{排序}$$

**详细流程**：

1. **降维**：PCA、UMAP 或 diffusion map 压缩维度
2. **图构建**：基于 k-NN 或核密度估计构建细胞相似性图
3. **骨架提取**：识别主路径（principal curves）、最小生成树（MST）或主图（principal graph）
4. **根节点指定**：生物学先验指定起点，或算法自动推断
5. **伪时间计算**：沿轨迹测量细胞到根节点的距离

### 主要算法类别

| 方法类别 | 代表工具 | 核心策略 |
|---------|---------|---------|
| **主曲线/流形学习** | Slingshot | 拟合平滑主曲线通过数据中心 |
| **图基方法** | PAGA、Monocle | 构建细胞图，寻找最小生成树 |
| **概率模型** | SCORPIUS、TSCAN | 基于概率分布的状态转移 |
| **深度学习** | DeepCycle、LatentPredict | 神经网络建模连续动态 |

## 分支轨迹处理

### 生物学的分支现象

真实生物过程很少是简单的线性路径，常常存在**分支结构**：

- **造血分化**：造血干细胞 → 髓系/淋巴系分支 → 多种终末血细胞
- **神经发育**：神经前体细胞 → 神经元/胶质细胞分支
- **肿瘤演化**：治疗前 → 敏感/耐药分支

### 分支点识别

轨迹算法通过以下方式识别分支：

1. **拓扑分析**：在细胞图中检测度 > 2 的节点
2. **密度分析**：识别多个高密度区域之间的低密度连接点
3. **谱系标记**：结合已知标记基因验证分支方向

### 谱系追踪挑战

| 挑战 | 说明 | 应对策略 |
|-----|------|---------|
| **循环结构** | 生物学过程可能存在反馈回路 | 打破循环为 DAG（有向无环图）|
| **汇合结构** | 不同来源细胞汇合（如细胞融合）| 多数算法假设树状结构 |
| **异步采样** | 不同分支的细胞可能来自不同时间点 | 跨条件整合需谨慎 |

## RNA Velocity：动态方向推断

### 核心原理

**RNA velocity** 利用未剪接（unspliced）和已剪接（spliced）mRNA 的比例，估计基因表达的瞬时变化方向。

**分子生物学基础**：
- **未剪接 mRNA**：包含内含子的前体转录本，刚转录产生
- **已剪接 mRNA**：成熟转录本，可翻译为蛋白质

### 数学模型

对于单个基因，建立动力学模型：

$$\frac{ds}{dt} = \alpha u - \beta s$$

其中：
- $u$：未剪接 mRNA 丰度
- $s$：已剪接 mRNA 丰度
- $\alpha$：剪接速率
- $\beta$：降解速率
- $\frac{ds}{dt}$：已剪接 mRNA 的变化率（velocity）

### 稳态偏离与方向推断

**稳态假设**：在稳定状态下，未剪接与已剪接 mRNA 保持恒定比例。

**偏离稳态意味着动态变化**：
- **未剪接 ↑，已剪接稳定**：基因即将上调（稳态高于当前）
- **未剪接 ↓，已剪接稳定**：基因即将下调（稳态低于当前）
- **两者比例接近稳态**：基因表达稳定

### 多基因联合与细胞方向

通过聚合所有基因的 velocity 向量，估计细胞在表达空间的**瞬时移动方向**：

$$\mathbf{v}_{\text{cell}} = \sum_{g \in \text{genes}} \mathbf{e}_g \cdot v_g$$

可视化时，将 velocity 向量投影到 UMAP 或 PCA 空间，显示细胞"接下来可能去哪"。

### 工具与实现

**scVelo** 提供三种模式：

| 模式 | 假设 | 适用场景 |
|-----|------|---------|
| **Steady-state** | 系统处于稳态 | 快速初步分析 |
| **Deterministic** | 确定性动力学 | 数据质量高、噪声低 |
| **Stochastic** | 考虑随机波动 | 标准推荐模式 |

## 主流工具对比

### Monocle 3

**算法基础**：
- 反向图嵌入（Reversed Graph Embedding）
- 学习低维流形和伪时间同时优化

**特点**：
- 支持复杂分支结构
- 可整合先验知识（已知标记基因）
- 适合大规模数据集

### Slingshot

**算法基础**：
- 主曲线（Principal Curves）拟合
- 在降维空间中拟合平滑曲线通过细胞云

**特点**：
- 可同时拟合多条谱系
- 提供统计置信度评估
- 与 Bioconductor 生态集成良好

### PAGA（Partition-based Graph Abstraction）

**算法基础**：
- 在聚类层面构建抽象图
- 保留生物过程的拓扑结构

**特点**：
- 速度快，适合超大规模数据
- 与 Scanpy 无缝集成
- 可视化直观，展示 cluster 间连接关系

## 常见误区与注意事项

### 误区一：伪时间 = 真实时间

**澄清**：
- 伪时间是基于转录组相似性的排序，非真实时间
- 细胞可能在真实时间中异步（不同速度通过过程）
- 某些细胞可能处于"停滞"状态，不沿轨迹进展

### 误区二：UMAP 形状等同于轨迹

**澄清**：
- UMAP 是为可视化优化的非线性投影
- 其几何形状受算法参数强烈影响
- 轨迹应基于高维空间或 PCA 空间推断，非 UMAP 坐标

### 误区三：所有分支都代表真实命运决定

**澄清**：
- 批次效应可能模拟分支结构
- 细胞周期效应可能产生"循环"伪轨迹
- 技术噪声可能制造虚假分支

**验证方法**：
- 检查分支点细胞的已知标记基因表达
- 跨批次验证轨迹结构是否重现
- 结合 RNA velocity 验证方向一致性

### 误区四：RNA velocity 总是可靠的

**限制条件**：
- 需要足够的 unspliced/spliced reads 覆盖率
- 稳态假设可能不适用于快速变化系统
- 某些细胞类型（如神经元）剪接动力学特殊

**质量检查**：
- 检查 velocity 置信度估计
- 验证已知变化基因的方向是否正确
- 注意 RNA velocity 推断的是短期动态，非长期命运

## 最佳实践建议

### 轨迹分析流程

1. **数据准备**：完成 QC、归一化、批次校正（如需要）
2. **降维与聚类**：PCA → UMAP → Leiden 聚类
3. **轨迹推断**：基于 PCA 或 diffusion map 空间（非 UMAP）
4. **根节点指定**：结合生物学先验或标记基因
5. **基因动态分析**：识别随伪时间变化的基因
6. **验证**：RNA velocity 一致性、跨批次重现性

### 工具选择建议

| 场景 | 推荐工具 | 理由 |
|-----|---------|------|
| 简单线性分化 | Slingshot | 拟合平滑主曲线，统计严谨 |
| 复杂多分支 | Monocle 3 | 支持复杂拓扑结构 |
| 超大规模数据 | PAGA | 速度快，可扩展性强 |
| Python 生态 | PAGA + scVelo | Scanpy 集成，文档丰富 |
| 需要统计推断 | Slingshot | 提供置信区间估计 |

## 参考资料

### 方法学论文

- Trapnell et al., *The dynamics and regulators of cell fate decisions are revealed by pseudotemporal ordering of single cells* (Nature Biotechnology, 2014) — Monocle 原始论文
- Cao et al., *The single-cell transcriptional landscape of mammalian organogenesis* (Nature, 2019) — Monocle 3
- Street et al., *Slingshot: cell lineage and pseudotime inference for single-cell transcriptomics* (BMC Genomics, 2018)
- Wolf et al., *PAGA: graph abstraction reconciles clustering with trajectory inference through a topology preserving map of single cells* (Genome Biology, 2019)
- Bergen et al., *Generalizing RNA velocity to transient cell states through dynamical modeling* (Nature Biotechnology, 2020) — scVelo

### 综述与应用

- Saelens et al., *A comparison of single-cell trajectory inference methods* (Nature Biotechnology, 2019) — 14 种方法系统对比
- Cannoodt et al., *Computational methods for trajectory inference from single-cell transcriptomics* (European Journal of Immunology, 2016)

### 工具文档

- [Monocle 3 文档](https://cole-trapnell-lab.github.io/monocle3/)
- [Slingshot Bioconductor](https://bioconductor.org/packages/release/bioc/html/slingshot.html)
- [scVelo 文档](https://scvelo.readthedocs.io/)
- [PAGA 教程](https://scanpy-tutorials.readthedocs.io/en/latest/paga-paul15.html)

## 相关页面

- [scRNA-seq 总览](./scrna-seq-overview.md) — 基础分析流程
- [聚类与 UMAP 降维](./clustering-and-umap.md) — 降维和可视化基础
- [Doublet 检测](./doublet-detection.md) — 数据质量控制
- [差异表达分析](../transcriptomics/differential-expression.mdx) — 基因统计检验

---
description: spot-based 空间数据与 scRNA-seq 在分辨率、噪声模型与解释上的差异
title: "spot 与单细胞"
---


## 核心差别

单细胞 RNA-seq（scRNA-seq）与空间转录组（ST）最根本的差别在于**基本测量单位**的不同：

| 维度 | scRNA-seq | spot-based ST |
|------|-----------|---------------|
| **基本单位** | 单个细胞（cell） | 捕获区域（spot） |
| **测量对象** | 单个细胞的转录组 | 局部区域内所有细胞的混合转录组 |
| **空间信息** | ❌ 解离后丢失 | ✅ 保留二维坐标 |
| **分辨率** | 单细胞 | 取决于 spot 大小（通常多细胞） |

### 形式化描述

**scRNA-seq** 输出的表达矩阵：

$$
X^{(sc)} \in \mathbb{R}^{n_{genes} \times n_{cells}}
$$

其中 $X^{(sc)}_{g,c}$ 表示基因 $g$ 在细胞 $c$ 中的表达量。

**空间转录组** 输出的表达矩阵：

$$
X^{(st)} \in \mathbb{R}^{n_{genes} \times n_{spots}}
$$

其中 $X^{(st)}_{g,s}$ 表示基因 $g$ 在 spot $s$ 中的**混合表达量**：

$$
X^{(st)}_{g,s} = \sum_{c \in \mathcal{C}_s} w_{c,s} \cdot x_{g,c} + \epsilon_s
$$

- $\mathcal{C}_s$：覆盖 spot $s$ 的所有细胞集合
- $w_{c,s}$：细胞 $c$ 对 spot $s$ 的贡献权重（取决于细胞大小、位置、捕获效率）
- $\epsilon_s$：技术噪声（捕获效率、测序深度等）

## 为什么要区分 spot 和 cell

混淆这两个概念会导致错误的生物学解释：

| 错误理解 | 问题所在 | 正确理解 |
|----------|----------|----------|
| "spot A 高表达 marker X，所以 spot A 是细胞类型 X" | spot 含多种细胞，marker 可能来自 minority 细胞类型 | 需要去卷积推断各细胞类型贡献比例 |
| "空间热点 = 单细胞在该位置的定位" | spot 热点可能是多个细胞共同贡献 | 热点反映局部区域的整体表达特征 |
| "可以直接把单细胞注释映射到每个 spot" | 忽略 spot 的混合性质 | 需要统计模型整合单细胞参考 |

## 信息取舍：分辨率与空间信息的权衡

### scRNA-seq 的优势与代价

**优势**：
- 单细胞分辨率，可识别稀有细胞类型
- 检测灵敏度高（通常 2,000–5,000 基因/细胞）
- 细胞状态（cell state）分析能力强

**代价**：
- 组织解离破坏空间上下文
- 解离过程可能引入应激表达偏差
- 无法研究空间排布相关的生物学问题

### 空间转录组的优势与代价

**优势**：
- 保留组织空间结构
- 可研究空间梯度、边界效应、微环境
- 与组织图像结合进行形态学注释

**代价**：
- 分辨率受限（spot 通常包含 1–10 个细胞）
- 检测灵敏度较低（通常 1,000–3,000 基因/spot）
- 批次效应与技术噪声更复杂（捕获效率空间异质性）

### 互补性而非替代性

```
scRNA-seq          空间转录组
    ↓                    ↓
高分辨率细胞类型图谱    细胞类型的空间分布
    ↘                  ↙
         整合分析
            ↓
    空间分辨的细胞类型注释
```

## 为什么两者经常联合分析

空间转录组的**分辨率限制**可以通过与 scRNA-seq 整合来克服，这已成为标准分析范式：

### 整合策略

1. **去卷积（Deconvolution）**
   - 输入：scRNA-seq 参考图谱 + 空间数据
   - 输出：每个 spot 的细胞类型组成比例
   - 代表工具：RCTD、SPOTlight、cell2location

2. **映射/插值（Mapping/Integration）**
   - 将单细胞映射到空间位置
   - 或学习共享的潜在空间进行联合嵌入
   - 代表工具：Tangram、Scanorama、Harmony

3. **空间基因表达重建**
   - 利用单细胞数据预测未测量空间位置的表达
   - 代表工具：SPACEL、DestVI

### 联合分析的典型流程

```
scRNA-seq 数据
    ↓
聚类 → 细胞类型注释 → 构建参考表达谱
    ↓                    ↘
                        整合算法
    ↑                       ↓
空间数据                    ↓
    ↘                  空间细胞类型组成
质控过滤 → 预处理           ↓
                      空间可视化 + 下游分析
```

## 复杂度与适用前提

### 联合分析的假设前提

| 假设 | 潜在问题 | 检验方法 |
|------|----------|----------|
| scRNA-seq 样本与空间样本来自同一组织/状态 | 批次效应、组织差异 | 检查共享 marker 表达一致性 |
| 参考图谱包含空间样本中所有细胞类型 | 缺失细胞类型导致错误分配 | 留一法验证、novel cell type detection |
| 基因表达在两种技术间可比较 | 技术偏差、捕获效率差异 | 标准化策略、平台效应校正 |

### 当整合失败时

- **参考与空间样本组织不匹配**：构建特定于该组织的参考图谱
- **空间数据质量过低**：增加测序深度或更换技术平台
- **存在空间特有的细胞状态**：scRNA-seq 可能无法捕获（如特定微环境下的细胞）

## 常见误区

- **"空间数据一定比单细胞更高级"**
  - 两者解决的是不同问题，不存在绝对优劣

- **"单细胞注释可以直接搬到每个 spot"**
  - spot 的混合性质必须通过统计模型处理

- **"spot 边界就是真实组织边界"**
  - spot 是人工采样单位，可能与解剖边界错位

- **"高分辨率空间平台可以完全替代 scRNA-seq"**
  - 即使达到单细胞分辨率，检测深度和基因覆盖仍可能受限

- **"整合分析可以恢复完美单细胞分辨率"**
  - 去卷积是概率推断，存在不确定性

## 参考资料

- Andersson et al., 2020. *Single-cell and spatial transcriptomics enables probabilistic inference of cell type topography.* Communications Biology
- Kleshchevnikov et al., 2022. *Cell2location maps fine-grained cell types in spatial transcriptomics.* Nature Biotechnology
- Biancalani et al., 2021. *Deep learning and alignment of spatially resolved single-cell transcriptomes with Tangram.* Nature Methods

## 相关页面

- **[空间转录组总览](./spatial-transcriptomics-overview.md)** — 理解空间技术的原理与数据结构
- **[去卷积与细胞映射](./deconvolution-and-mapping.md)** — 学习如何整合 scRNA-seq 与空间数据的具体方法
- **[单细胞组学](../single-cell/index.md)** — 建立单细胞分析基础
- **[概率模型](../algorithms/probabilistic-models.md)** — 理解去卷积的统计基础

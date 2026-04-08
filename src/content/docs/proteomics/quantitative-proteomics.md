---
description: 蛋白质定量方法：Label-free、TMT/iTRAQ等标记策略与差异蛋白统计分析
title: "定量蛋白质组学"
---

import SummaryBox from '@/components/docs/SummaryBox.astro';
import PrerequisitesBox from '@/components/docs/PrerequisitesBox.astro';
import RelatedLinks from '@/components/docs/RelatedLinks.astro';

<SummaryBox
  summary="定量蛋白质组学旨在比较不同生物条件下蛋白质的相对或绝对丰度。本章介绍基于质谱的定量策略（Label-free、SILAC、TMT/iTRAQ）以及差异蛋白鉴定的统计方法。"
  bullets={[
    '理解肽层面与蛋白层面定量的关系与挑战',
    '掌握Label-free定量的原理与归一化方法',
    '了解同位素标记策略（SILAC、TMT/iTRAQ）',
    '理解差异蛋白分析中的统计检验与多重检验校正'
  ]}
/>

<PrerequisitesBox
  items={[
    { name: '质谱基础', href: '/wiki/proteomics/mass-spectrometry-basics' },
    { name: '数据库搜索与FDR', href: '/wiki/proteomics/database-search-and-fdr' },
    { name: '统计检验基础', href: '/wiki/foundations/statistical-testing' }
  ]}
/>

## 问题背景

### 蛋白质定量问题

**问题定义**：给定多个生物学条件下的质谱数据，定量比较各条件下蛋白质的相对或绝对丰度。

**输入**：
- $n$ 个生物学样本的条件标签（如：对照组、处理组、时间点）
- 每个样本的质谱数据（MS1 和 MS2）
- 蛋白质鉴定结果（PSM、肽段、蛋白质列表）

**输出**：
- 各样本中可定量蛋白质的丰度估计
- 差异表达蛋白质的统计显著性（p-value、FDR）
- 丰度变化的倍数（fold change）

### 为什么定量困难？

蛋白质组学定量面临多重挑战：

1. **动态范围**：细胞内蛋白质丰度跨越 6-12 个数量级，远超质谱检测线性范围
2. **肽段响应差异**：不同肽段的电离效率和碎裂效率差异巨大
3. **缺失值**：蛋白质在部分样本中可能无法被检测到（missing values）
4. **批次效应**：不同时间、不同仪器运行的系统性偏差
5. **共享肽段**：某些肽段可能映射到多个蛋白质，导致定量歧义

## 定量策略概述

### 基于质谱的定量方法分类

```
质谱定量策略
├── 无标记定量（Label-free）
│   ├── DDA（数据依赖采集）
│   └── DIA（数据非依赖采集，如SWATH）
│
└── 标记定量（Labeled）
    ├── 代谢标记（Metabolic labeling）
    │   └── SILAC（Stable Isotope Labeling by Amino acids in Cell culture）
    │
    └── 化学标记（Chemical labeling）
        ├── TMT（Tandem Mass Tag）
        ├── iTRAQ（isobaric Tags for Relative and Absolute Quantitation）
        └── Dimethyl labeling
```

## Label-free 定量

### 原理

Label-free 定量不使用同位素标记，直接比较不同样本中肽段的 MS1 峰面积或谱图计数。

**两种主要策略**：

| 方法 | 定量依据 | 优点 | 缺点 |
|------|---------|------|------|
| **MS1 峰面积法** | 母离子提取离子流色谱（XIC）峰面积 | 精度高、线性范围好 | 需要色谱对齐、计算量大 |
| **谱图计数法** | 鉴定到的谱图数量 | 简单、无需峰提取 | 动态范围窄、非线性响应 |

### 工作流程

```
样本 A          样本 B          样本 C
  ↓               ↓               ↓
LC-MS/MS      LC-MS/MS        LC-MS/MS
  ↓               ↓               ↓
峰检测与匹配（需保留时间对齐）
  ↓
肽段强度矩阵（Peptide × Sample）
  ↓
归一化与汇总（肽段 → 蛋白质）
  ↓
差异分析（统计检验）
```

### 数据处理关键步骤

#### 1. 色谱对齐（Retention Time Alignment）

由于不同运行的色谱保留时间存在漂移，需要对齐：
- **线性对齐**：假设全局线性漂移
- **非线性对齐**：使用局部回归或动态规划（如 DTW）
- **特征匹配对齐**：基于共同鉴定的肽段建立映射

#### 2. 归一化（Normalization）

消除系统偏差：
- **总信号归一化**：假设总蛋白量相等
- **中位数归一化**：使用强度中位数作为缩放因子
- **分位数归一化**：使所有样本的强度分布相同
- **内部标准归一化**：添加已知量的标准蛋白

$$I'_{ij} = I_{ij} \times \frac{\text{RefSum}}{\sum_j I_{ij}}$$

其中 $I_{ij}$ 是样本 $i$ 中肽段 $j$ 的强度。

#### 3. 缺失值处理

蛋白质组学中的缺失值（missing values）来源复杂：
- **随机缺失（MCAR）**：检测灵敏度限制
- **非随机缺失（MNAR）**：蛋白质丰度低于检测限

**处理方法**：
- 过滤：仅保留检测率高于阈值的蛋白质
- 插补：使用最小值、KNN、或基于分布的插补
- 专用方法：MaxLFQ、MSstats 等工具的特殊处理

## 同位素标记定量

### SILAC（代谢标记）

**原理**：在细胞培养基中加入稳定同位素标记的氨基酸（如 $^{13}$C-赖氨酸、$^{13}$C-精氨酸），新合成的蛋白质自然掺入标记氨基酸。

**工作流程**：
```
轻标记培养基（Lys-0, Arg-0）    重标记培养基（Lys-8, Arg-10）
        ↓                              ↓
    对照组细胞                      处理组细胞
        ↓                              ↓
    蛋白质提取                      蛋白质提取
        ↓______________________________↓
                    ↓
                1:1 混合
                    ↓
                质谱分析
```

**优点**：
- 样本在蛋白质水平混合，消除后续操作误差
- 轻/重肽段共洗脱，保留时间一致
- 定量精度高（CV < 10%）

**缺点**：
- 仅适用于可培养的细胞/微生物
- 标记成本高
- 不适用于临床样本（组织、体液）

### TMT/iTRAQ（化学标记）

**原理**：用化学标签标记肽段的氨基基团，标签在 MS1 中表现相同（isobaric），在 MS2 中碎裂产生不同质量的报告离子（reporter ions）。

**TMT 标签结构**：
- **质量平衡基团（balance group）**：与报告基团质量互补
- **肽段反应基团**：与肽段 N-端和赖氨酸侧链反应
- **报告基团（reporter group）**：MS2 中释放，用于定量

| TMT 试剂 | 通道数 | 报告离子质量 |
|---------|--------|-------------|
| TMT 6-plex | 6 | 126-131 Da |
| TMT 10-plex | 10 | 126-131, 127N, 127C, ... |
| TMT 16-plex | 16 | 扩展质量范围 |
| TMTPro 18-plex | 18 | 最新一代 |

**工作流程**：
```
样本 1      样本 2      ...      样本 n
   ↓          ↓                  ↓
TMT-126    TMT-127            TMT-131
   ↓__________↓__________________↓
              ↓
         混合样本
              ↓
         LC-MS/MS
              ↓
     MS1: 标记肽段（相同质量）
              ↓
     MS2: 报告离子（不同质量，用于定量）
              ↓
     碎片离子（用于序列鉴定）
```

**优点**：
- 多路复用（multiplexing），提高通量
- 适用于任何样本类型（细胞、组织、体液）
- 减少运行间变异

**缺点**：
- **Ratio compression**：共碎裂干扰导致比率压缩
- 动态范围限制（ reporter ion 检测范围）
- 成本较高

### Ratio Compression 问题

在标记定量中，MS2 隔离窗口内的共碎裂肽段会导致信号混合：

```
理论情况：        实际情况（共碎裂）：
Protein A ↑↑      Protein A ↑
Protein B ↓↓      Protein B ↓
                  混合信号 → 压缩的比率
```

**解决方案**：
- 高分辨 MS2（减少隔离窗口）
- 多级碎裂（MS3）
- 计算校正方法

## 从肽段到蛋白质

### 肽段定量汇总

通常先在肽层面定量，然后汇总到蛋白层面：

**汇总方法**：
- **Razor peptide**：仅使用独特肽段
- **MaxLFQ**：使用 MaxQuant 的 label-free 定量算法
- **iBAQ**：基于绝对定量的强度计算
- **Top3**：取强度最高的 3 个肽段平均值

### 共享肽段问题

某些肽段可能映射到多个蛋白质（同源蛋白或家族成员）：

**处理策略**：
- **忽略共享肽段**：仅使用独特肽段（保守但信息损失）
- **蛋白分组**：将共享肽段的蛋白分为一组
- **概率分配**：基于独特肽段信息分配共享肽段贡献

## 差异蛋白分析

### 统计检验

比较两组或多组间的蛋白质丰度：

| 比较类型 | 检验方法 | 适用场景 |
|---------|---------|---------|
| 两组比较 | t-test / Mann-Whitney U | 正态/非正态分布 |
| 多组比较 | ANOVA / Kruskal-Wallis | 3+ 组间比较 |
| 时间序列 | 重复测量 ANOVA | 纵向数据 |
| 配对样本 | 配对 t-test | 配对设计 |

### 多重检验校正

当同时检验数千个蛋白质时，需要控制假阳性：

| 校正方法 | 控制目标 | 严格程度 |
|---------|---------|---------|
| Bonferroni | 族错误率（FWER） | 最严格 |
| Benjamini-Hochberg | 错误发现率（FDR） | 中等 |
| q-value | 局部 FDR | 较宽松 |

**常用阈值**：
- 调整后 p-value (q-value) < 0.05
- 倍数变化 |log2 FC| > 0.5 或 1.0

### 统计显著性 vs 生物学意义

统计显著性不等于生物学意义：
- 大样本量可能导致微小差异也显著
- 应结合效应量（fold change）和生物学背景解释

## 常见误区

| 误区 | 正确理解 |
|------|---------|
| 蛋白质丰度 = 肽段丰度直接平均 | 需考虑肽段响应差异、归一化和缺失值处理 |
| 缺失值就是零 | 缺失可能是检测限以下，不一定是真正缺失 |
| TMT 的比率可以直接比较不同通道 | Ratio compression 使不同通道间比率不可直接比较 |
| Fold change 显著 = 生物学重要 | 需结合统计显著性和生物学背景综合判断 |
| Label-free 不如标记定量准确 | 现代 Label-free 方法（DIA）精度可媲美 SILAC |

## 常用定量分析软件

| 软件 | 主要功能 | 适用方法 |
|------|---------|---------|
| **MaxQuant** | 完整 LFQ 流程 | Label-free, SILAC |
| **Proteome Discoverer** | 完整定量流程 | TMT, Label-free |
| **MSstats** | 统计差异分析 | 通用，R 包 |
| **Perseus** | 下游统计分析 | 通用，MaxQuant 配套 |
| **DIA-NN** | DIA 数据分析 | Label-free DIA |
| **OpenSWATH** | DIA 靶向分析 | SWATH-MS |

## 相关页面

<RelatedLinks
  links={[
    { title: '质谱基础', to: '/wiki/proteomics/mass-spectrometry-basics', description: 'MS1/MS2 测量原理' },
    { title: '数据库搜索与 FDR', to: '/wiki/proteomics/database-search-and-fdr', description: '蛋白质鉴定与FDR控制' },
    { title: '统计检验基础', to: '/wiki/foundations/statistical-testing', description: '假设检验与多重检验校正' }
  ]}
/>

## 参考文献

- Ong, S.E., et al. (2002). Stable isotope labeling by amino acids in cell culture, SILAC, as a simple and accurate approach to expression proteomics. *Molecular & Cellular Proteomics*, 1(5), 376-386.
- Thompson, A., et al. (2003). Tandem mass tags: a novel quantification strategy for comparative analysis of complex protein mixtures by MS/MS. *Analytical Chemistry*, 75(8), 1895-1904.
- Cox, J., et al. (2014). Accurate proteome-wide label-free quantification by delayed normalization and maximal peptide ratio extraction, termed MaxLFQ. *Molecular & Cellular Proteomics*, 13(9), 2513-2526.
- Choi, M., et al. (2017). MSstats: an R package for statistical analysis of quantitative mass spectrometry-based proteomic experiments. *Bioinformatics*, 30(17), 2524-2526.
- Tyanova, S., et al. (2016). The Perseus computational platform for comprehensive analysis of (prote)omics data. *Nature Methods*, 13(9), 731-740.

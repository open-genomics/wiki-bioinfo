---
description: small variant（SNP / 短 indel）与结构变异（SV）的区别与边界。
title: "Small variants 与结构变异（SV）"
---


## 问题背景

变异检测算法的选择取决于待检测变异的尺度。DNA-seq 中的变异可依据其大小和结构复杂度分为两大类：

| 维度 | Small Variants | Structural Variants (SV) |
|-----|---------------|-------------------------|
| **大小范围** | 1 bp（SNP）至 ~50 bp（短 indel） | ~50 bp 至 Mb 级别 |
| **主要类型** | SNP、短插入/缺失（indel） | 大片段缺失、插入、倒位、易位、拷贝数变异（CNV） |
| **检测证据** | 局部 pileup、CIGAR 字符串 | 配对端距离、split reads、read depth、组装断点 |
| **常用工具** | GATK HaplotypeCaller、bcftools、DeepVariant | DELLY、Manta、LUMPY、GRIDSS |
| **表示格式** | 标准 VCF | VCF with SVTYPE/END 或专门格式（BEDPE） |

这种分类不仅是操作性的——不同尺度的变异需要不同的统计模型、算法策略和验证方法。

## 定义与分类

### Small Variants

**定义**：在单条测序 read（通常 100-300 bp）范围内可完整观测到的 DNA 序列变异。

**子类型**：

- **SNP（Single Nucleotide Polymorphism）**：单个碱基的替换，如 $A \rightarrow G$。
  - 生物学意义：可能改变蛋白质编码（非同义突变）、影响调控区域、或为沉默突变。
  - 检测挑战：区分真实 SNP 与测序错误（Illumina 错误率 ~0.1-1%）。

- **短 Indel（Insertion/Deletion）**：50 bp 以内的插入或缺失。
  - 生物学意义：移码突变（frameshift）常导致蛋白质功能丧失；非移码 indel 可能改变蛋白结构。
  - 检测挑战：比对软件在 indel 边界处的对齐失败（misalignment）可产生假阳性。

### Structural Variants (SV)

**定义**：大于 50 bp 的基因组结构重排，通常超出单条 read 的观测范围，需要跨 reads 的统计证据。

**子类型**：

| SV 类型 | 描述 | 典型大小 | 检测信号 |
|--------|------|---------|---------|
| **DEL（Deletion）** | 基因组片段缺失 | 50 bp - Mb | 异常短的插入片段、覆盖度降低 |
| **DUP（Duplication）** | 片段拷贝数增加 | 50 bp - Mb | 覆盖度升高、异常 read 配对 |
| **INS（Insertion）** | 新序列插入 | 50 bp - 10+ kb | split reads、断点组装 |
| **INV（Inversion）** | 片段方向反转 | 50 bp - Mb | read 方向异常、断点配对模式 |
| **BND（Breakend）** | 染色体间或染色体内易位 | 可变 | 跨染色体 read 配对、组装断点 |
| **CNV（Copy Number Variation）** | 拷贝数变化（通常 $>1$ kb） | 1 kb - Mb | 覆盖度统计、分段检测 |

## 检测原理的差异

### Small Variant Detection

**核心算法**：基于**局部 pileup** 的统计推断

对于每个候选位点，caller 收集覆盖该位置的所有 reads，分析：

- **SNP 检测**：计算 $P(\text{变异} | \text{碱基观测})$，区分真实变异与测序错误；
  - 使用碱基质量分数（Phred score）加权
  - 考虑链偏好性（strand bias）

- **Indel 检测**：分析 CIGAR 字符串中的 I/D 操作符，结合局部重比对（local realignment）提高准确性。

**统计模型**：
- 贝叶斯基因型推断：$P(G | D) \propto P(D | G) \cdot P(G)$
- 错误率校准：根据测序平台特性校准碱基质量分数

### Structural Variant Detection

**核心算法**：基于**全基因组信号的整合**

SV caller 需要整合多种非局部信号：

| 信号类型 | 数学描述 | 适用 SV 类型 |
|---------|---------|-----------|
| **Read Pair（RP）** | 异常插入片段大小：$|\text{fragment\_size} - \mu_{\text{LIB}}| > 3\sigma_{\text{LIB}}$ | DEL、DUP、INV、易位 |
| **Split Read（SR）** | 单条 read 的两部分比对到不同位置 | 精确断点定位 |
| **Read Depth（RD）** | 标准化覆盖度 $Z = \frac{X - \mu}{\sigma}$ 显著偏离 | CNV、DUP、DEL |
| **De Novo Assembly** | 局部 de Bruijn 图组装检测断点 | 复杂 SV、小插入 |

**算法挑战**：
- 需要建立测序文库的"正常"统计模型；
- 重复区域导致断点定位不精确；
- 肿瘤样本中的克隆异质性影响 VAF 估计。

## 区分两者的必要性

### 1. 算法复杂度

| 方面 | Small Variants | SV |
|-----|---------------|-----|
| **时间复杂度** | $O(N \cdot L)$，$N$=位点数，$L$=深度 | $O(R \cdot \log R)$ 或更高，需全局分析 |
| **内存需求** | 局部 pileup，内存占用低 | 需缓存插入片段分布、配对信息，内存占用高 |
| **并行化** | 按基因组位置分块 | 需考虑跨块信号，实现更复杂 |

### 2. 错误模式

**Small Variants 的主要假阳性来源**：
- 测序错误（尤其是 homopolymer 区域）；
- 比对失败（indel 周围 soft-clipping）；
- 重复区域的多重比对。

**SV 的主要假阳性来源**：
- 测序文库的片段大小变异；
- 重复序列导致的断点模糊；
- 参考基因组组装缺口（gaps）。

### 3. 生物学功能

| 变异类型 | 功能影响 | 临床相关性 |
|---------|---------|-----------|
| SNP | 点突变影响蛋白质功能或调控 | 药物代谢（CYP）、遗传病 |
| 短 indel | 移码突变导致蛋白截短或功能改变 | BRCA1/2 中的致病 indel |
| SV | 基因融合、剂量效应、调控区重排 | 癌症中的基因融合（BCR-ABL）、神经发育疾病 |

## 分析流程中的位置

在典型 DNA-seq 分析管线中，small variant calling 和 SV calling 是**两个独立且互补的流程**:

```
FASTQ
  ├── QC → Trimming
  ├── Alignment → BAM
  │       ├── Small Variant Pipeline
  │       │     ├── Local Realignment
  │       │     ├── Base Quality Recalibration
  │       │     ├── Variant Calling (GATK/DeepVariant)
  │       │     ├── VQSR / Hard Filtering
  │       │     └── SNP/Indel VCF
  │       │
  │       └── SV Pipeline
  │             ├── Insert Size Analysis
  │             ├── Discordant Pair Detection
  │             ├── Split Read Analysis
  │             ├── CNV Segmentation
  │             └── SV VCF / BEDPE
  └── Joint Analysis (optional)
```

**整合策略**：
- 某些 caller（如 Manta）可同时检测 small indel 和 SV，实现无缝过渡；
- 对于复杂区域（如 CYP 基因家族），建议同时运行两种 pipeline 并交叉验证；
- 功能注释时，需使用适配不同变异类型的工具（如 VEP 支持 SV 注释）。

## 注意事项

- 不要期望一个 small variant caller 自动覆盖所有 SV；
- 对于明显涉及大片段结构改变的问题（如融合基因、大缺失），应优先选用 SV 工具；
- 在报告中要清楚区分 small variants 和 SV 的来源、工具和证据类型。

## 相关页面

- [DNA-seq 变异检测总览](./variant-calling-overview.mdx)
- [DNA-seq 变异过滤与质量控制](./variant-filtering.mdx)
- [测序 reads、coverage 与错误模型](../foundations/sequencing-reads-coverage.md)

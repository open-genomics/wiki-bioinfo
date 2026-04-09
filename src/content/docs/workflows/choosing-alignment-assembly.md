---
title: "如何选择 alignment、assembly 或 pseudo-alignment"
description: 根据研究目标（变异检测、定量分析、基因组重建）和数据特征，选择合适的序列分析策略。
---


## 任务目标

不同任务面对的核心问题并不相同，因此"该先比对、先组装，还是直接做 pseudo-alignment"并没有统一答案。

这一页的目标，是帮助你根据研究问题、参考条件和输出需求做选择。

## 输入输出

- 输入：研究问题、样本类型、参考条件、下游目标
- 输出：更合适的主流程方向与其背后的理由

## 前置知识

- [序列比对](../alignment/index.mdx)
- [组装与图算法](../assembly/index.mdx)
- [转录组](../transcriptomics/index.mdx)
- [NGS 流程总览](./ngs-overview.md)

## 步骤总览

### 第一步：明确研究问题

选择流程的第一步不是看工具，而是回答：你最终要回答的生物学问题是什么？

- **变异检测**：关注样本与参考之间的差异（SNV、InDel、结构变异），需要精确的碱基级定位。
- **表达定量**：关注基因或转录本的相对丰度，需要高效的 read 分配策略。
- **基因组重建**：关注从头构建未知序列，不依赖已有参考。
- **功能注释**：关注"这段序列编码了什么"或"这个区域有哪些功能元件"。

不同的研究问题天然对应不同的分析策略。在明确问题之前讨论工具选择，往往会导致方向性错误。

### 第二步：评估参考条件

参考基因组的质量和可用性是决定策略的关键因素：

| 参考条件 | 推荐策略 | 原因 |
| :--- | :--- | :--- |
| 有高质量参考基因组（如 GRCh38） | alignment 或 pseudo-alignment | 可利用已有坐标系统，结果可比性强 |
| 有近缘物种参考（但非同种） | 宽松 alignment + 组装 | 严格比对可能遗漏大量 reads，需结合组装发现新序列 |
| 无可用参考 | de novo assembly | 没有参考可依靠，只能从 reads 本身重建序列 |
| 参考存在但高度不完整 | hybrid 策略 | 先做初步比对，对未比对 reads 进行组装补充 |

**注意**：参考基因组的质量不仅取决于"有没有"，还取决于参考与样本之间的进化距离、结构变异程度和版本是否匹配。例如，用 GRCh37 比对 GRCh38 数据集，即使流程跑通，坐标和注释也会不匹配。

### 第三步：根据任务类型选择策略

#### 更适合 alignment 的情况

- 有高质量参考基因组；
- 目标是定位 reads、做 variant calling、做注释驱动分析；
- 需要精确坐标；
- 需要检测结构变异（Structural Variant, SV）或拷贝数变异（Copy Number Variation, CNV）；
- 需要查看比对质量指标（如 MAPQ、insert size 分布）来辅助判断。

alignment 的核心优势在于提供**精确的碱基级定位**，使得每个 read 都能被映射到参考序列的特定位置。这对于变异检测至关重要，因为变异的定义本身就依赖于参考坐标。

#### 更适合 assembly 的情况

- 缺少合适参考；
- 目标是重建新序列、新转录本或混合样本结构；
- 更关心整体结构恢复而不是已有坐标上的定位；
- 样本与参考差异过大（如肿瘤样本与正常参考）；
- 需要发现新的基因、转录本或非编码 RNA。

assembly 的核心优势在于**不依赖已有参考**，因此能发现参考中不存在的序列。在宏基因组学、转录组学和非模式生物研究中，assembly 是不可替代的策略。

#### 更适合 pseudo-alignment 的情况

- 任务重点是 RNA-seq 表达定量；
- 更关心转录本兼容性与丰度估计；
- 不要求精确碱基级路径解释；
- 样本量大、需要快速处理大量 RNA-seq 数据。

pseudo-alignment 的核心优势在于**速度**：它跳过了精确比对的昂贵步骤，直接根据 k-mer 兼容性将 reads 分配给转录本，速度可比传统 alignment 快 10-50 倍。但代价是牺牲了碱基级的精确性，因此不适合用于变异检测或需要查看具体比对位置的下游分析。

### 第四步：考虑数据特征

除了研究问题和参考条件，数据本身的特征也会影响策略选择：

- **读长（read length）**：短读长（Illumina）适合 alignment-based 流程；长读长（PacBio、Nanopore）在 assembly 中有天然优势，因为长读长更容易跨越重复区域。
- **测序深度（coverage）**：低深度数据（<10x）不适合 de novo assembly，因为覆盖不均匀会导致大量 gap；高深度数据（>50x）更适合 assembly 和变异检测。
- **数据类型**：DNA-seq 通常需要 alignment 或 assembly；RNA-seq 的表达定量可以用 pseudo-alignment；ChIP-seq 需要精确的 peak 定位，依赖 alignment。

## 每步依赖与常见错误

最常见的问题不是"工具选错"，而是目标没说清楚：

- 如果你要精确定位变异，却选了只强调兼容性判断的方法，结果就会失去解释力；
- 如果你没有高质量参考，却强行把所有问题都放到 alignment 框架里，很多结构信息会被错过；
- 如果你真正只关心表达定量，却仍做很重的全流程精确比对，可能只是增加了计算成本。

### 典型错误案例

**错误 1：用 pseudo-alignment 做 variant calling**

pseudo-alignment 工具（如 Salmon、Kallisto）的设计目标是定量而非定位。它们不输出标准的比对文件（BAM/SAM），也无法提供每个碱基的比对质量。如果你需要检测变异，必须使用 BWA-MEM、minimap2 等工具做精确 alignment。

**错误 2：在低质量参考上做严格 alignment**

如果参考基因组与实际样本差异较大（如不同亚种、肿瘤样本），严格的 alignment 参数会导致大量 reads 无法比对（unmapped），从而丢失重要的生物学信息。这种情况下，应考虑放宽参数或结合 assembly 策略。

**错误 3：对宏基因组样本做标准 alignment**

宏基因组样本包含多种物种的混合 DNA，使用单一参考基因组做 alignment 会浪费大量计算资源，且无法回答"样本中有哪些物种"这个核心问题。应使用专门的宏基因组分类工具或进行 de novo metagenomic assembly。

## 对应算法模块

| 策略 | 核心算法模块 | 代表工具 |
| :--- | :--- | :--- |
| alignment | 字符串索引、动态规划、Seeding-Extension | BWA-MEM, Bowtie2, minimap2, HISAT2 |
| assembly | de Bruijn 图、OLC、路径搜索、共识计算 | SPAdes, SOAPdenovo2, Canu, Flye |
| pseudo-alignment | k-mer 索引、兼容性分类、EM 定量 | Salmon, Kallisto |

## worked example

假设你有一组人类肿瘤样本的 RNA-seq 数据，研究目标是：

1. 检测肿瘤特异性融合基因；
2. 同时比较肿瘤与正常组织的基因表达差异。

这种情况下，单一策略无法满足两个目标。合理的方案是：

```text
RNA-seq FASTQ
  -> STAR alignment (精确比对，用于融合基因检测)
  -> Salmon quant (利用 alignment 结果做定量，或直接用 quasi-mapping)
  -> DESeq2 (差异表达分析)
```

STAR 能提供剪接感知的精确比对，是融合基因检测的常用工具；而 Salmon 可以基于 STAR 的比对结果做快速定量，也可以独立运行 quasi-mapping。两者互补，覆盖了不同层面的分析需求。

## 注意事项

- **策略不是非此即彼**：很多实际项目需要组合使用多种策略，例如"先 alignment 再对未比对 reads 做 assembly"。
- **考虑计算资源**：全基因组精确 alignment 的计算成本远高于 pseudo-alignment，在资源有限时需要权衡精度与效率。
- **结果的可比性**：alignment 结果使用参考坐标系统，不同样本之间的结果天然可比；assembly 结果的坐标是样本特异的，跨样本比较需要额外的处理步骤（如共线性分析）。
- **版本管理**：无论选择哪种策略，都应记录参考基因组版本、注释版本和工具版本，以确保结果可复现。

## 后续阅读

- 如果选择 alignment 路径，继续阅读 [DNA-seq 变异检测总览](../variants/variant-calling-overview.mdx)；
- 如果选择定量路径，继续阅读 [RNA-seq 工作流概览](./rna-seq.mdx)；
- 如果选择 assembly 路径，继续阅读 [de Bruijn graph 组装](../assembly/de-bruijn.mdx)。

## 相关页面

- [DNA-seq 变异检测总览](../variants/variant-calling-overview.mdx)
- [RNA-seq 工作流概览](./rna-seq.mdx)
- [Pseudo-alignment 与表达定量](../transcriptomics/pseudo-alignment-and-quantification.mdx)
- [de Bruijn graph 组装](../assembly/de-bruijn.mdx)
- [质控与数据预处理](./qc-overview.md)

---
description: 映射质量（MAPQ）、CIGAR 与多重比对的概览，解释这些字段如何影响下游变异检测与表达定量。
title: "MAPQ、CIGAR 与多重比对"
---


## 是什么

在 read mapping 之后，BAM/SAM 记录中的三个关键字段直接影响下游分析质量：

| 字段 | 含义 | 核心问题 |
|-----|------|---------|
| **CIGAR** | 描述 read 与参考之间的对齐操作序列 | read 如何被解释为参考上的路径？ |
| **MAPQ** | 估计当前比对位置可靠性的质量值 | 这个位置可信吗？ |
| **多重比对** | 同一条 read 能在多个位置得到相近得分 | 哪个位置才是正确的？ |

这些字段决定：变异检测中哪些 reads 作为有效证据、RNA-seq 定量中 reads 如何分配、以及结果解释的不确定性评估。

## CIGAR：对齐操作的序列描述

CIGAR 字符串由一系列"长度+操作符"组成：

| 示例 | 含义 |
|------|------|
| `76M` | 76 个匹配/错配 |
| `10M1I20M` | 10 匹配 → 1 插入 → 20 匹配 |
| `5S70M1D5M` | 5 软剪切 → 70 匹配 → 1 缺失 → 5 匹配 |

**常见操作符：**

| 操作符 | 含义 | 序列保留 |
|-------|------|---------|
| `M` | 匹配或错配 | read 中保留 |
| `I` | 插入（相对于参考） | read 中保留 |
| `D` | 缺失（相对于参考） | read 中不保留 |
| `S` | 软剪切（末端未参与比对） | read 中保留 |
| `H` | 硬剪切 | read 中不保留 |
| `N` | 大跨度跳跃（如 RNA-seq 跨 intron） | - |

CIGAR 揭示：read 如何被解释为参考路径、indel/剪切等结构特征、以及 RNA-seq 中的跨 exon 剪接事件。

## MAPQ：映射质量的直观含义

MAPQ 的定义：

> 在当前比对模型下，read 对齐到"错误位置"概率的 phred 标度近似。

**直观理解：**
- **MAPQ 高** → mapper 对当前位置有较高置信度
- **MAPQ 低** → 存在其他相近得分的候选位置，或比对本身不稳定

**重要区分：**
- MAPQ 是**定位质量**（位置是否可信）
- 不是**测序质量**（base quality，来自 FASTQ）
- 不同 mapper 的 MAPQ 计算略有差异

## 多重比对：一条 read 的多个候选位置

在重复序列或低复杂度区域，同一条 read 可能在多个位置得到相似得分：

**mapper 的处理方式：**
- 选"主比对"（primary），标记次要比对（secondary/supplementary）
- 或在 flag/tag 中记录多重比对信息
- MAPQ 反映不确定性：候选越多、得分越接近，MAPQ 越低

**RNA-seq 中的影响：**
- isoform 重叠、基因家族重复产生多重比对 reads
- 处理方式（丢弃/等分/模型分配）直接影响表达定量结果

## 这些字段如何影响下游分析

### 1. 变异检测

在 DNA-seq variant calling 中：

- CIGAR 决定了 indel 周围 reads 如何对齐；
- MAPQ 影响哪些 reads 被视为可信证据；
- 多重比对 reads 如果不当处理，可能引入假阳性或假阴性。

variant caller 通常会：

- 对低 MAPQ 的 reads 降低权重或直接过滤；
- 对复杂 CIGAR（例如长 indel 附近）更谨慎地看待；
- 在重复区域的变异解释上给出额外提示或过滤规则。

### 2. RNA-seq 表达定量

在 RNA-seq 中：

- 多重映射到多个转录本或基因的 reads 需要分配策略；
- 忽略多重比对会低估某些高度相似基因的表达；
- 处理方式（等分、基于模型分配等）会影响 TPM/FPKM 等指标。

因此，理解 mapper 如何标记多重比对，对解释定量结果非常重要。

## 常见误区

- **只看 CIGAR，不关心 MAPQ**：
  - 即使 CIGAR 看起来“整齐”，如果 MAPQ 很低，定位仍然不可靠；
- **把 MAPQ 当成 base quality 使用**：
  - MAPQ 反映的是“对齐位置是否可信”，不是测序错误率本身；
- **忽略多重比对 reads**：
  - 在很多表达定量和重复富集区域，忽略 multi-mapping 会系统性偏差结果。

## 相关页面

- [常见文件格式概览](../formats/common-file-formats.mdx)
- [Seed-and-extend](./seed-and-extend.md)
- [BWA 与 minimap2](./bwa-minimap2.md)
- [DNA-seq 变异检测总览](../variants/variant-calling-overview.mdx)
- [RNA-seq 工作流概览](../workflows/rna-seq.md)

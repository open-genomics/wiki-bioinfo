---
description: 映射质量（MAPQ）、CIGAR 与多重比对的概览，解释这些字段如何影响下游变异检测与表达定量。
title: "MAPQ、CIGAR 与多重比对"
---


## 是什么

在 read mapping 之后，BAM/SAM 记录中会出现很多字段：

- **CIGAR**：描述 read 与参考之间的对齐操作序列；
- **MAPQ**（mapping quality）：估计当前比对位置可靠性的一个质量值；
- **多重比对**（multi-mapping）：同一条 read 能在多个位置得到相近得分。

这些字段经常被一笔带过，但它们直接影响：

- 变异检测中哪些 reads 被视为有效证据；
- RNA-seq 定量中 reads 如何在多个位置之间分配；
- 结果解释时我们对不确定性的认识。

## CIGAR：对齐操作的序列描述

CIGAR 字符串由一系列“长度 + 操作符”组成，例如：

- `76M`：76 个匹配/错配；
- `10M1I20M`：10 个匹配，1 个插入，再 20 个匹配；
- `5S70M1D5M`：5 个软剪切、70 个匹配、1 个缺失、5 个匹配。

常见操作符包括：

- `M`：匹配或错配（match/mismatch）
- `I`：插入（insertion，相对于参考）
- `D`：缺失（deletion，相对于参考）
- `S`：软剪切（soft clip，read 末端未参与比对）
- `H`：硬剪切（hard clip，不再保留在 read 序列里）
- `N`：在参考上的大跨度跳跃（如 RNA-seq 中跨 intron 的剪接）

CIGAR 告诉我们：

- read 是如何被“解释”为参考上的路径的；
- 是否存在 indel、剪切等结构特征；
- 在 RNA-seq 中，是否存在跨 exon 的剪接事件。

## MAPQ：映射质量的直观含义

MAPQ 通常被解释为：

> 在当前比对模型下，这条 read **对齐到“错误位置”的概率”** 的 phred 标度近似。

简单来说：

- MAPQ 越高，说明 mapper 相信“这个位置是正确的”概率越大；
- MAPQ 越低，说明存在其他相近得分的候选位置，或者比对本身不稳定。

需要注意的是：

- 不同 mapper 对 MAPQ 的具体定义和缩放略有差异；
- 它不是测序质量（那是 FASTQ 中的 base quality），而是“定位质量”。

## 多重比对：一条 read 有多个候选位置

在重复序列或低复杂度区域，一条 read 常常能在多个位置得到类似的 alignment 得分：

- 某些 mapper 会选一个位置作为“主比对”（primary alignment），并附带次要比对（secondary/supplementary）；
- 某些会在 flag 或 tag 中标记多重比对信息；
- MAPQ 往往会反映这种不确定性——候选越多、得分越接近，MAPQ 越低。

在 RNA-seq 中，isoform 重叠、基因家族重复等都会产生多重比对 reads，它们如何被处理会直接影响表达定量结果。

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

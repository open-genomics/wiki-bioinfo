---
description: small variant（SNP / 短 indel）与结构变异（SV）的区别与边界。
title: "Small variants 与结构变异（SV）"
---


## 是什么

在 DNA-seq 里，“变异”可以大致分成两大类：

- **small variants**：
  - SNP（single nucleotide polymorphism）
  - 短 indel（通常几十 bp 以内）
- **结构变异（structural variants, SV）**：
  - 较大的插入/缺失（几十 bp 到 Mb）
  - 倒位、易位、拷贝数变化等

small variants 常通过标准 variant caller（如 GATK, bcftools）从 BAM pileup 中直接检测；
而 SV 往往需要专门的 caller 和信号（配对信息、split reads、depth 模式等）。

## small variants 的典型特点

- 尺度小，多数在 read 长度范围内局部可见；
- 主要证据来自：
  - 局部碱基替换模式；
  - 短 indel 在 CIGAR 中的表现；
  - 局部 base quality 与 mapping quality；
- 通常以 VCF 中的一行表示一个位置（或局部窗口）上的 REF/ALT 差异。

## 结构变异的典型特点

- 尺度大，往往超出单条 read 的长度；
- 主要证据来自：
  - paired-end insert size 异常；
  - read orientation 异常；
  - split reads（同一 read 在不同位置比对）；
  - coverage 的大规模升降；
- 表达方式可能是：
  - VCF 中带有 SVTYPE, END 等字段；
  - 专门格式或轨道（bedpe, bigWig 等）。

## 为什么要区分这两类

1. **工具和参数差异巨大**：
   - small variant caller 侧重碱基层 pileup 模型；
   - SV caller 侧重跨位置的结构信号和统计模式；

2. **错误模式不同**：
   - small variants 更容易被测序错误、mapping 错位干扰；
   - SV 更容易被测序文库设计、重复结构和组装不完善干扰；

3. **生物学解释层级不同**：
   - small variants 常用于蛋白质编码改变、剪接位点改变等解释；
   - SV 则涉及染色体重排、拷贝数变化、大尺度结构变化。

## 在分析流程中的位置

在一个典型 DNA-seq 管线中，可以大致这样看待：

- small variant calling：
  - FASTQ → QC → alignment → small variant caller → VCF（SNP/indel）；
- SV calling：
  - FASTQ → QC → alignment → SV caller → SV VCF / bedpe / tracks；

两者常常需要不同的 caller、不同的过滤逻辑，甚至不同的可视化和解释工具。

## 注意事项

- 不要期望一个 small variant caller 自动覆盖所有 SV；
- 对于明显涉及大片段结构改变的问题（如融合基因、大缺失），应优先选用 SV 工具；
- 在报告中要清楚区分 small variants 和 SV 的来源、工具和证据类型。

## 相关页面

- [DNA-seq 变异检测总览](./variant-calling-overview.mdx)
- [DNA-seq 变异过滤与质量控制](./variant-filtering.mdx)
- [测序 reads、coverage 与错误模型](../foundations/sequencing-reads-coverage.md)

---
sidebar_position: 2
description: ChIP-seq 的实验原理、峰调用、对照样本和常见下游分析。
---

# ChIP-seq 概览

## 是什么

ChIP-seq（Chromatin Immunoprecipitation sequencing）用于检测某种蛋白质或某类组蛋白修饰在基因组上的富集位置。最常见的应用包括：

- 转录因子结合位点定位；
- 组蛋白修饰图谱绘制（如 H3K27ac、H3K4me3）；
- 比较不同条件下的调控状态差异。

实验流程是：交联 → 打断染色质 → 用抗体富集目标蛋白结合的 DNA 片段 → 建库测序 → 比对参考基因组 → 峰调用。

<figure>
  <img src="/wiki-bioinfo/img/illustrations/chip-seq-workflow.svg" alt="ChIP-seq workflow" />
  <figcaption>ChIP-seq 的核心思想是把目标蛋白结合或修饰富集的 DNA 片段挑出来，再通过测序还原它们在基因组上的位置。</figcaption>
</figure>

## 数据特征

ChIP-seq 的最终信号不是"逐位点的绝对量"，而是相对富集：目标样本在某些区域的读段覆盖度高于背景对照。

常见两类峰：

- **窄峰（narrow peaks）**：如转录因子、H3K4me3，峰尖锐；
- **宽峰（broad peaks）**：如 H3K27me3、H3K36me3，分布更平缓、更宽。

因此峰调用工具和参数必须与目标类型匹配。

## 标准分析流程

### 1. 原始质控与比对

先做 FASTQ 质控（碱基质量、接头、重复度），然后将 reads 比对到参考基因组：

- 常用比对器：**Bowtie2**、**BWA**；
- 输出：排序后的 BAM；
- 通常要去除低质量比对、PCR duplicates 和黑名单区域（ENCODE blacklist）。

### 2. 峰调用（Peak Calling）

峰调用是 ChIP-seq 的核心。典型工具是 **MACS2 / MACS3**。

思想：在基因组上扫描局部区域，判断目标样本的覆盖度是否显著高于背景（input DNA 或 IgG 对照）。

```bash
macs2 callpeak \
  -t chip.bam \
  -c input.bam \
  -f BAM \
  -g hs \
  -n H3K27ac \
  --outdir macs2_out
```

关键输出：

- `narrowPeak` / `broadPeak`：峰区间；
- `summits.bed`：峰顶位置；
- `pileup.bdg`：覆盖度轨迹。

### 3. 峰注释

把峰与注释文件结合，回答：

- 峰在 promoter、enhancer 还是 gene body？
- 峰附近有哪些基因？
- 不同样本差异峰可能影响哪些通路？

常用工具：**Homer**、**ChIPseeker**、**bedtools closest**。

### 4. motif 分析

如果目标是转录因子或开放区，常进一步做序列 motif 富集分析：

- de novo motif discovery；
- 与已知 motif 数据库（JASPAR、HOCOMOCO）比较；
- 判断可能的协同因子。

这一步与 [PWM / PSSM](../models/pwm-pssm.md) 的概念直接相关。

## 统计视角

ChIP-seq 中每个窗口的 read count 常被视为近似计数数据，峰调用本质上是在做局部富集检验。后续做差异结合分析时，常把每个峰在不同样本中的覆盖度汇总为 count matrix，再用负二项模型分析（类似 RNA-seq 差异表达）。

常用工具：

- **DiffBind**
- **csaw**
- **DESeq2 / edgeR**（在峰计数矩阵上）

## 可视化

最常见的三类图：

1. **Genome browser track**：IGV / UCSC 看局部峰形；
2. **Heatmap / profile plot**：围绕 TSS 或峰中心画覆盖度分布；
3. **Venn / upset plot**：比较不同条件共享与特异峰。

## 常见质量指标

| 指标 | 含义 |
|------|------|
| FRiP | Fraction of Reads in Peaks，峰内 reads 比例 |
| NSC / RSC | Strand cross-correlation，衡量峰信号质量 |
| Duplicate rate | 重复率 |
| Peak number | 峰数量，过多或过少都需警惕 |

## 常见误区

- **没有 input 对照也能稳定解释峰**：很多情况下背景偏好会误导峰调用；
- **峰越高越说明调控越强**：峰高受文库深度、抗体效率、区域可比对性等多因素影响；
- **最近基因一定是靶基因**：增强子可能跨越很远调控目标基因；
- **不同抗体结果可以直接比较**：抗体特异性和实验条件差异会显著影响结果。

## 参考资料

- ENCODE ChIP-seq Guidelines
- Zhang et al., *MACS* (Genome Biology, 2008)
- Bailey et al., motif analysis 相关文献

## 相关页面

- [ATAC-seq](./atac-seq.md)
- [DNA 甲基化](./dna-methylation.md)
- [PWM / PSSM](../models/pwm-pssm.md)
- [参考基因组与注释](../foundations/reference-and-annotation.md)

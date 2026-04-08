---
description: DNA 甲基化测序、甲基化比例、DMR 与功能解释。
title: "DNA 甲基化"
---


## 是什么

DNA 甲基化是最常见的表观修饰之一，哺乳动物中最典型的是 **CpG 位点的胞嘧啶甲基化（5mC）**。它与基因沉默、印记、X 染色体失活、发育和肿瘤密切相关。

常见测量技术包括：

- **WGBS（whole-genome bisulfite sequencing）**：全基因组亚硫酸氢盐测序；
- **RRBS**：富集 CpG-rich 区域的简化版；
- **甲基化芯片**：如 Illumina 450K / EPIC。

## 亚硫酸氢盐测序原理

亚硫酸氢盐处理会把**未甲基化的 C 转成 U**，后续测序中表现为 T；而甲基化的 C 会保留下来。于是一个位点的甲基化比例可用：

$$m = \frac{\#C}{\#C + \#T}$$

其中 `#C` 是支持甲基化的 reads 数，`#T` 是支持未甲基化的 reads 数。

## 比对难点

由于 C/T 转换，普通 DNA 比对器不再适用。WGBS 常用专门的比对器：

- **Bismark**
- **BSMAP**
- **bwa-meth**

这些工具会对参考和 reads 做转换后再匹配，以适应 bisulfite-induced mismatch。

## 分析层级

### 单位点甲基化（CpG-level）

每个 CpG 位点给出一个甲基化比例和覆盖深度，适合精细分析，但噪声较大。

### 区域甲基化（DMR）

更常见的是寻找差异甲基化区域（Differentially Methylated Regions, DMRs）：

- 启动子区甲基化变化；
- 增强子区甲基化变化；
- CpG island / shore / shelf 的差异。

区域层分析更稳健，也更容易连接功能解释。

## 与表达的关系

甲基化和表达之间并不是简单的"高甲基化 = 低表达"：

- **启动子高甲基化** 常与转录抑制相关；
- **gene body 甲基化** 有时反而与活跃转录相关；
- 增强子甲基化、印记区和重复元件的关系也各不相同。

因此解释时必须结合注释、染色质状态和上下文。

## 常见统计问题

- 覆盖深度差异很大，低覆盖位点不稳定；
- 样本间存在细胞组成差异，尤其是在 bulk 组织中；
- 甲基化比例是 0–1 之间的比例数据，常使用 beta-binomial 等模型。

常用工具：

- **methylKit**
- **DSS**
- **bsseq**

## 常见误区

- **甲基化结果可以脱离参考版本解释**：CpG 坐标极度依赖参考和注释；
- **CpG 岛一定低甲基化**：在特定发育状态或疾病中会改变；
- **单个位点差异就足够说明调控变化**：更稳健的是区域和多证据整合；
- **bulk 甲基化变化代表细胞内变化**：也可能只是细胞组成变化。

## 参考资料

- Bismark 文档
- Hansen et al., bsseq 相关论文
- ENCODE / Roadmap Epigenomics 资源

## 相关页面

- [ChIP-seq 概览](./chip-seq-overview.md)
- [ATAC-seq](./atac-seq.md)
- [参考基因组与注释](../foundations/reference-and-annotation.md)

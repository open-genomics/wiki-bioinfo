---
sidebar_position: 2
---

# 生物信息学中的基础对象

## 是什么

生物信息学并不是直接研究“抽象算法”本身，而是在研究一组会不断互相转换、互相约束的生物学对象。最常见的基础对象包括：

- DNA 序列；
- RNA 序列；
- 蛋白质序列；
- 基因组（genome）与转录组（transcriptome）；
- 测序读段（reads）；
- 参考基因组（reference genome）与注释（annotation）。

这些对象最终都会被表示成计算系统能够处理的数据结构，例如字符串、区间、图、计数矩阵或带版本信息的注释记录。

## 为什么重要

如果不先分清这些对象，就很难真正理解后面的算法和工作流在处理什么问题：

- 为什么比对问题可以看成字符串匹配；
- 为什么组装问题会转化成图问题；
- 为什么表达量分析依赖转录本注释和有效长度；
- 为什么变异解释必须回到参考基因组、坐标系统和注释版本；
- 为什么同一个 gene 在 DNA、RNA 和 protein 层面会对应不同的问题表述。

很多初学者的困惑并不是算法太难，而是没有先区分“当前结果对应的到底是什么对象”。

## 核心概念

### DNA、RNA 与蛋白质不是同一层对象

- **DNA** 更常作为基因组层信息的载体；
- **RNA** 更接近表达与剪接层；
- **蛋白质** 更接近功能与结构层。

因此，“一个基因的结果”在不同语境下可能分别指：

- 某段基因组区间；
- 某个转录本及其外显子结构；
- 某个蛋白及其功能域；
- 某个样本里该基因的表达量或变异状态。

### 基因组、转录组与 reads 之间的关系

一个常见的数据流是：

1. 生物样本被测序，产生 reads；
2. reads 与参考基因组或转录组进行比对，或直接做 de novo 组装；
3. 比对或组装结果再结合注释文件进行解释；
4. 最终输出表达量、变异、结构特征或进化关系。

在这个过程中，reads 是观测数据，参考基因组和注释更像解释框架，而 gene / transcript / protein 则是最终被解释的对象层。

### 参考与注释是分析语境的一部分

“参考基因组”和“注释文件”并不是背景资料，而是分析定义的一部分。它们决定：

- 坐标如何解释；
- 一个 read 能被分配给哪些 transcript；
- 一个 variant 会不会落在 coding region；
- 最终统计单位是 gene-level 还是 transcript-level。

因此，脱离参考版本和注释版本谈结果，往往会造成误解。

## worked example

以 RNA-seq 为例，同一个“基因结果”可能对应多个不同层面：

- 在原始数据层，它是支持某个区域的 reads；
- 在定量层，它可能是 gene-level counts 或 transcript-level abundance；
- 在功能层，它又可能对应某个蛋白功能变化或通路变化。

如果不先区分对象层，就很容易把“表达变化”“剪接变化”和“蛋白功能变化”混成同一件事。

## 与真实工具或流程的连接

这些基础对象会在不同任务里以不同组合出现：

- **WGS/WES 变异检测**：reads、reference genome、alignment、variant、annotation；
- **RNA-seq 表达分析**：reads、transcriptome、gene/transcript quantification、annotation；
- **宏基因组组装与分类**：reads、contig、scaffold、taxonomic / functional annotation；
- **蛋白功能预测**：gene/transcript 到 protein 的映射、功能注释与结构资源。

理解对象层的差别，能帮助你判断一个分析到底是在做“定位”“计数”“拼接”“注释”还是“解释”。

## 常见误区

- 把 gene、transcript 和 protein 当成同一个对象来讨论；
- 只记住 gene symbol，却不关心稳定 ID、转录本层级和版本背景；
- 把注释文件当成附属材料，而忽略它会直接改变定量和功能解释；
- 认为 reads 只要比上参考就算“知道答案”，忽略 multi-mapping、重复序列和剪接结构带来的不确定性；
- 看到“某个基因有变化”时，不区分这是 DNA 层变异、RNA 层表达变化，还是 protein 层功能变化。

## 相关页面

- [序列、字符串与坐标系统](./sequences-and-strings.md)
- [测序读段、覆盖度与误差模型](./sequencing-reads-coverage.md)
- [参考基因组与注释](./reference-and-annotation.md)
- [NGS 流程总览](../workflows/ngs-overview.md)
- [数据库与注释系统一览](../data-references/databases-and-annotations.mdx)

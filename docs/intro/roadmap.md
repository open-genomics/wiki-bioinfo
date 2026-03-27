---
sidebar_position: 3
---

# 学习路线

BioInfo Wiki 的目标不是只提供零散词条，而是把**基础对象、核心方法、数据与资源、分析方向与真实工作流**连成一张可以反复回溯的知识地图。

如果你不知道从哪里开始，可以先按下面三条主线之一推进。

## 路线一：初学者路线

适合刚进入生物信息学、希望先建立整体框架的读者。

1. [开始这里](./index.md)
2. [基础与数学](../foundations/index.md)
3. [生物信息学中的基础对象](../foundations/biology-basics.md)
4. [测序 reads、coverage 与错误模型](../foundations/sequencing-reads-coverage.md)
5. [数据、注释与资源](../data-references/index.mdx)
6. [常见文件格式概览](../formats/common-file-formats.mdx)
7. [分析方向与案例](../applications/index.mdx)
8. [NGS 流程总览](../workflows/ngs-overview.md)

## 路线二：算法路线

适合有计算机、数学或算法背景，想从教材主线切入的读者。

1. [基础与数学](../foundations/index.md)
2. [算法与复杂度](../foundations/algorithms-and-complexity.md)
3. [核心方法](../core-methods/index.mdx)
4. [序列表示与索引](../sequence/index.md)
5. [精确字符串匹配](../sequence/exact-string-matching.md)
6. [Suffix Array、BWT 与索引压缩](../sequence/suffix-array-bwt.md)
7. [FM-index](../sequence/fm-index.mdx)
8. [序列比对](../alignment/index.md)
9. [编辑距离](../alignment/edit-distance.md)
10. [多序列比对（MSA）](../alignment/multiple-sequence-alignment.md)
11. [系统发育与进化](../phylogeny/index.md)
12. [概率模型与模式识别](../models/index.md)
13. [隐马尔可夫模型](../models/hmm.md)
14. [Gene prediction](../models/gene-prediction.md)

## 路线三：实战流程路线

适合已经接触测序数据、想把工具和原理串起来的读者。

1. [基础与数学](../foundations/index.md)
2. [数据、注释与资源](../data-references/index.mdx)
3. [常见文件格式概览](../formats/common-file-formats.mdx)
4. [分析方向与案例](../applications/index.mdx)
5. [工作流与案例](../workflows/index.md)
6. [RNA-seq 工作流概览](../workflows/rna-seq.md)
7. [DNA-seq 变异检测总览](../variants/variant-calling-overview.mdx)
8. [Pseudo-alignment 与表达定量](../transcriptomics/pseudo-alignment-and-quantification.mdx)

## 第一波重点专题

如果你希望先快速建立“教材到实践”的骨架，可以先读下面这些页面：

- [生物信息学中的基础对象](../foundations/biology-basics.md)
- [参考基因组、坐标系统与注释](../foundations/reference-and-annotation.md)
- [数据、注释与资源](../data-references/index.mdx)
- [常见文件格式概览](../formats/common-file-formats.mdx)
- [k-mer 与序列表示](../sequence/kmers.md)
- [FM-index](../sequence/fm-index.mdx)
- [编辑距离](../alignment/edit-distance.md)
- [Seed-and-extend](../alignment/seed-and-extend.md)
- [DNA-seq 变异检测总览](../variants/variant-calling-overview.mdx)
- [RNA-seq 工作流概览](../workflows/rna-seq.md)

## 怎样把教材与实践结合起来

推荐采用“**概念 → 方法 → 数据格式 → 工作流 → 工具解释**”的顺序：

- 学一个算法主题时，同时看它对应的数据格式与输入输出；
- 学一个流程环节时，回头追溯它依赖的索引、动态规划、图模型或概率模型；
- 学一个工具时，先问清楚它解决的是哪一类问题，而不是只记命令；
- 尽量把“样本设计、数据输入、建模、计算、结果解释”串成一条连续链路。

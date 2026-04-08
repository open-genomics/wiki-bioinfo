---
title: "质量控制（QC）总览"
---


## 是什么

质量控制（quality control, QC）关注的是：在 raw reads 进入比对、组装、定量或变异检测之前，先判断数据质量是否达到了可分析的基本条件，以及有哪些系统性问题需要先识别和处理。

它的目标不是“尽可能删掉更多 reads”，而是建立一套对数据状态的解释框架：哪些问题只是轻微噪声，哪些问题会在后续流程里被放大，哪些问题说明样本或文库本身就存在结构性偏差。

## 为什么重要

QC 往往是整个 NGS workflow 中最容易被低估、但最直接影响后续结果的一步。原因在于：

- 低质量碱基会影响 mapping 和 variant calling；
- 接头污染会扭曲 read 内容与长度分布；
- GC 偏好、文库复杂度不足和重复偏高会改变 coverage 结构；
- 样本之间的系统性偏差会在差异表达或比较分析中被误当成生物学信号。

换句话说，很多“下游结果很奇怪”的问题，其实在 QC 阶段已经给出了线索。

## 任务目标

QC 页面通常要帮助回答：

- 这批 FASTQ 数据是否适合直接进入下游；
- 是否存在接头污染、低质量尾部、过度重复、GC 偏差或污染；
- 是否需要 trimming、过滤或重新评估样本设计；
- 多个样本之间是否存在明显 outlier；
- 哪些异常会影响下游的比对、组装、表达定量或变异检测。

## 输入输出

### 输入

常见输入包括：

- 原始 FASTQ 文件；
- paired-end / single-end 信息；
- 文库和样本元数据；
- 可选的比对后统计或多样本汇总结果。

### 输出

常见输出包括：

- per-base quality、per-sequence quality 等质量概览；
- adapter contamination、GC distribution、length distribution 等指标；
- duplication、overrepresented sequences 等提示；
- 一个面向下游分析的判断：直接继续、先处理再继续、还是需要回到实验设计和样本层重新检查。

## 常见 QC 问题

### 低质量碱基

许多测序数据在 read 尾部质量下降更明显。这会导致：

- mapping 不稳定；
- mismatch 增多；
- 变异检测中的假阳性上升；
- 某些组装路径被错误 k-mer 污染。

### 接头污染

当 insert 太短或建库条件导致 read 穿过插入片段边界时，接头序列可能保留在 FASTQ 中。如果不处理，它会：

- 影响比对率；
- 扭曲 k-mer 频率；
- 给定量和组装带来非生物学模式。

### GC 偏差与覆盖不均

GC distribution 异常并不总意味着数据错误，但它常提示：

- 文库构建偏好；
- 特定样本类型的组成特征；
- 某些区域系统性更难被测到。

这类偏差会进一步影响 coverage、定量和比较分析。

### 重复与文库复杂度

高重复率可能意味着：

- PCR duplication 偏高；
- 文库复杂度不足；
- 输入量偏低；
- 某些实验本身就强烈富集特定序列。

因此，“重复多”不是一句话就能下结论，必须结合实验类型来解释。

### 污染与异常序列

overrepresented sequences、异常 k-mer 或意外的序列组成，有时提示：

- adapter/primer 残留；
- rRNA 或宿主污染；
- 样本混入；
- 测序或建库流程中的系统性杂质。

## worked example

设想你有一批 RNA-seq FASTQ：

1. per-base quality 在尾部明显下滑；
2. overrepresented sequences 指向接头残留；
3. 某个样本的 GC 分布与其他样本明显不同；
4. duplication rate 异常高。

这些现象分别可能意味着：

- 需要 trimming；
- 某些 reads 末端并非真实转录本序列；
- 该样本可能存在文库偏差、污染或不同组成；
- 下游差异分析中这个样本可能成为 outlier。

这说明 QC 的意义不只是“看图”，而是把图上的异常翻译成对 workflow 的判断。

## 与真实 workflow 的连接

QC 并不是独立步骤，而是后续决策的前提：

- 对 **mapping / alignment** 来说，低质量尾部和接头会直接影响定位质量；
- 对 **assembly** 来说，错误碱基和异常 k-mer 会污染图结构；
- 对 **RNA-seq quantification / DE** 来说，样本偏差、污染和 composition 问题会影响归一化与统计解释；
- 对 **variant calling** 来说，质量问题会改变假阳性与假阴性平衡。

很多时候，真正的工作不是“跑一次 QC 工具”，而是决定：哪些问题需要修复，哪些问题应该在解释阶段被明确记录。

## 常见误区

### QC 就是看平均质量值

不对。平均质量只能反映很粗的趋势，很多关键问题来自 read 尾部、序列组成、重复结构或样本间差异。

### 发现问题就一定要把 reads 大量删掉

不对。QC 的目标是理解问题，而不是机械删除数据。过度 trimming 或过滤同样可能伤害下游分析。

### 所有高重复率都说明实验失败

不一定。不同实验类型对重复的容忍度和解释方式不同，必须结合实验背景理解。

### QC 正常就说明下游一定没问题

也不对。QC 只是排查上游明显异常，不能代替后续比对、定量和统计建模中的质量判断。

## 后续阅读

- [NGS 流程总览](./ngs-overview.md)
- [RNA-seq 工作流概览](./rna-seq.md)
- [常见文件格式概览](../formats/common-file-formats.mdx)
- [测序 reads、coverage 与错误模型](../foundations/sequencing-reads-coverage.md)

## 相关页面

- [NGS 流程总览](./ngs-overview.md)
- [RNA-seq 工作流概览](./rna-seq.md)
- [差异表达：从 counts 到统计检验](../transcriptomics/differential-expression.mdx)
- [常见文件格式概览](../formats/common-file-formats.mdx)
- [测序 reads、coverage 与错误模型](../foundations/sequencing-reads-coverage.md)

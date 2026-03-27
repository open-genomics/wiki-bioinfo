---
sidebar_position: 7
description: BWA 与 minimap2 的原理概览，从 FM-index 与 minimizer 出发解释短读长和长读长 mapper 的共同思路。
pagination_label: BWA 与 minimap2
---

# BWA 与 minimap2：现代 read mapper 的索引与扩展

## 是什么

BWA 和 minimap2 是现代测序数据分析中最常用的两类 read mapper：

- **BWA**：以短读长（short reads）为主的 FM-index 基 mapper 家族；
- **minimap2**：以长读长（long reads）和多任务支持著称，基于 minimizer / sketch 的 mapper。

它们都采用了“索引 + seed-and-extend”的总体思路，只是针对不同读长和误差特性做了不同工程设计。

## 要解决什么生物信息学问题

核心问题是：

> 给定大量测序 reads，如何在参考基因组上找到它们最合理的定位，同时兼顾速度、内存和准确性？

典型场景：

- WGS / WES 中为 variant calling 做前置比对；
- RNA-seq 中为伪比对或 splice-aware mapper 提供补充；
- 长读长组装、结构变异分析中的初始 read-to-reference 对齐。

## 输入与输出

- **输入**：
  - reads（FASTQ）；
  - 索引化的参考基因组（由工具预处理得到）；
  - 若干参数（最大错配数、seed 长度、scoring scheme 等）；
- **输出**：
  - BAM/SAM 中的一系列 alignment 记录；
  - 每条 read 的 CIGAR、MAPQ、多重比对信息等。

## BWA 的核心思路（以 BWA-MEM 为例）

### 1. 参考索引：FM-index

BWA 使用的是基于 BWT 的 FM-index：

- 对参考基因组构建 BWT；
- 基于 BWT 建立 `C` 数组和 `Occ` 结构；
- 利用 backward search 做高效 exact matching。

### 2. seeding：最大匹配种子

BWA-MEM 会尝试为每条 read 找到一组“最长匹配种子”（maximal exact matches, MEMs）：

- 利用 FM-index 在参考上找到 read 的 exact 匹配片段；
- 过滤过短或明显冗余的种子；
- 这些种子作为后续扩展的起点。

### 3. extend：局部比对与评分

在选定的 MEM 附近，BWA 会执行更精细的局部比对：

- 允许 mismatch 和 indel；
- 使用打分矩阵和 gap 罚分估计 alignment 质量；
- 将多个候选路径中的最佳者作为主比对结果。

### 4. MAPQ 与多重比对

BWA 会根据候选比对的相对得分生成一个映射质量（MAPQ）：

- 候选越唯一、得分差距越大，MAPQ 越高；
- 如果存在多个得分相近的候选位置，MAPQ 会下降；
- 多重比对（multi-mapping）的信息会体现在 flag 或辅助标签中。

## minimap2 的核心思路

### 1. 参考索引：minimizer / sketch

与依赖 FM-index 不同，minimap2 通过 minimizer 技术构建更适合长读长的索引：

- 将参考序列分解为一组 `k`-mer；
- 在滑动窗口内选择“最小”的 `k`-mer 作为 minimizer；
- 只保存 minimizer 及其位置，从而压缩索引规模。

### 2. seeding：基于 minimizer 的 anchor

对于每条 read：

- 也提取 minimizer 集合；
- 在参考索引中查找这些 minimizer 的匹配位置；
- 根据 minimizer 在 read 和参考中的相对位置，构建候选“anchor 链”。

### 3. chaining 与局部比对

minimap2 会对 minimizer anchor 做 **chaining**：

- 找到一组在坐标系中近似共线的 anchor；
- 认为它们大致位于同一条真实 alignment 路径上；
- 再对这些 anchor 之间的空隙进行局部比对和 gap 估计。

这种方式非常适合：

- 存在较多 indel 的长读长；
- 结构变异和大型重排的检测；
- 转录本对齐等任务。

## BWA 与 minimap2 的对比

- **索引结构**：
  - BWA：FM-index，适合大规模 exact matching，偏短读长；
  - minimap2：minimizer-based 索引，更偏向长读长和高误差率数据。
- **seeding 策略**：
  - BWA：基于最长 exact match（MEM）；
  - minimap2：基于 minimizer anchor 和 chaining。
- **典型任务**：
  - BWA：Illumina 短读长 WGS/WES mapping；
  - minimap2：PacBio / ONT 长读长，对参考或转录本的 mapping。

## 与种子/扩展和比对模型的关系

两者都在实际工程中把我们在本 wiki 里讲过的对象结合起来：

- FM-index / minimizer 索引来自 [序列表示与索引](../sequence/index.md)；
- 局部比对和打分来自 [全局比对与局部比对](./global-local.md) 和 [打分矩阵与 gap 罚分](./scoring-matrices.md)；
- 种子策略与扩展源于 [Seed-and-extend](./seed-and-extend.md)。

可以把它们看成是：

> 「索引结构」+「seed-and-extend」+「局部比对」在真实 NGS 工具中的具体落地。

## 常见误区

- **以为 BWA / minimap2 输出的是“绝对正确”的 read 位置**：
  - 实际上它们总是在各种启发式与得分模型下找“最合理”的候选位置；
- **忽略 MAPQ、多重比对信息**：
  - 后续 variant calling / RNA-seq 定量必须理解这些字段含义；
- **把 BWA 和 minimap2 看成“完全不同的世界”**：
  - 它们在方法论上有大量共享部分，只是对不同数据特性做了不同优化。

## 相关页面

- [FM-index](../sequence/fm-index.mdx)
- [Seed-and-extend](./seed-and-extend.md)
- [常见文件格式概览](../formats/common-file-formats.mdx)
- [DNA-seq 变异检测总览](../variants/variant-calling-overview.mdx)
- [RNA-seq 工作流概览](../workflows/rna-seq.md)

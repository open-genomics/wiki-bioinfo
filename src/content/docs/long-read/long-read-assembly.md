---
description: 长读长组装的基本流程、纠错与评估方法。
title: "长读长组装"
---


## 为什么长读长改变了组装

短读长组装最大的困难之一是重复区：如果重复长度长于 read 长度，那么图结构会出现分叉，很难判断正确路径。长读长可以跨越更多重复区，因此更容易把复杂区域连起来。

## 基本流程

长读长组装常见流程包括：

1. **预处理与筛选**：去除低质量 read；
2. **重叠检测（overlap）**：找出 reads 间可能拼接的关系；
3. **布局与共识**：构建 contig；
4. **polishing**：用原始 reads 或额外短读长提高共识质量；
5. **评估**：看连续性、完整性和错误率。

## 主流策略

### OLC（Overlap-Layout-Consensus）

长读长组装常更适合 OLC，因为 read 数量相对短读长少，但单条更长。流程是：

- 先找 read-read overlap；
- 再做布局；
- 最后生成共识序列。

典型工具：**Canu、Flye、Miniasm + Racon**。

### string graph / repeat graph

现代工具往往不会直接构建传统 OLC 图，而是进一步压缩和简化为 string graph 或 repeat graph，以更高效处理重复结构。

## polishing

即使组装成 contig，初始共识也可能仍有错误。常见 polishing 方式：

- 用长读长自身做 polishing（Racon、Medaka、Arrow）；
- 用高精度短读长做 polishing（Pilon）；
- PacBio HiFi 则往往能显著减少 polishing 压力。

## 评估指标

### 连续性

- **N50**：把 contig 按长度排序，累计到总长度 50% 时对应的 contig 长度；
- 但 N50 不是越大越好，错误拼接也会抬高 N50。

### 完整性

- **BUSCO**：看保守单拷贝基因是否完整；
- 与参考比对时可看覆盖率、错配率和结构一致性。

### 正确性

- misassembly 数量；
- SNP / indel 错误率；
- haplotig 冗余与塌陷问题。

## 常见误区

- **N50 高就代表组装好**：还必须看错误率和完整性；
- **长读长一定不需要 polishing**：很多数据集仍需要；
- **contig 更长就一定更接近真实染色体**：可能只是错误跨越重复区拼起来了。

## 参考资料

- Canu, Flye, Hifiasm 文档
- [组装评估](../assembly/assembly-evaluation.md)
- 长读长组装综述

## 相关页面

- [PacBio 与 Nanopore](./pacbio-nanopore.md)
- [重复序列与图清理](../assembly/repeats-and-graph-cleaning.md)
- [组装评估](../assembly/assembly-evaluation.md)

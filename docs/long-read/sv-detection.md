---
sidebar_position: 4
description: 基于长读长的结构变异检测思路与证据类型。
---

# 结构变异检测

## 是什么

结构变异（Structural Variants, SV）通常指长度大于约 50 bp 的基因组变异，包括：

- 插入（INS）
- 缺失（DEL）
- 倒位（INV）
- 重复（DUP）
- 易位（TRA）

与小变异相比，SV 更难被短读长完整覆盖，而长读长更容易直接跨越断点，因此是 SV 检测的重要技术路线。

<figure>
  <img src="/wiki-bioinfo/img/illustrations/long-read-sv.svg" alt="long-read SV evidence" />
  <figcaption>长读长能更直接地跨越结构变异断点，通过 split-read、覆盖变化和长跨度比对模式提供证据。</figcaption>
</figure>

## 主要证据类型

### split-read

一条长 read 的不同部分比对到参考基因组的不同位置或方向，这通常直接提示断点。

### read depth

局部覆盖度升高或下降可提示重复或缺失，但在长读长中深度波动较大，常作为辅助证据。

### discordant alignment pattern

比对到参考时出现大 gap、异常方向或长距离跳跃，也可提示复杂重排。

## 常见工具

- **Sniffles2**
- **SVIM**
- **cuteSV**
- **pbsv**（PacBio 生态）

这些工具通常从 BAM/CRAM 出发，整合 split-read 和覆盖证据，输出 VCF。

## 结果解释

SV 的解释通常要结合：

- 重复区域注释；
- 基因和外显子注释；
- 已知 SV 数据库；
- 祖源背景和群体频率。

一个落在重复区的插入/缺失，往往更难精确定位；一个跨越基因关键外显子的缺失，则可能具有明显功能后果。

## 常见误区

- **长读长看到一个异常比对就能确定 SV**：仍需多条 reads 支持和过滤；
- **所有断点都能精确到单碱基**：复杂重复区往往做不到；
- **SV 结果只靠长度判断重要性**：位置、基因背景和调控上下文更关键。

## 参考资料

- Sniffles2 / cuteSV / SVIM 文档
- 人类 SV 图谱相关综述

## 相关页面

- [PacBio 与 Nanopore](./pacbio-nanopore.md)
- [变异检测概览](../variants/variant-calling-overview.mdx)
- [重复与低复杂度区域](../variants/repeats-and-low-complexity.mdx)

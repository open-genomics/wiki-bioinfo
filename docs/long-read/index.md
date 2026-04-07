---
sidebar_position: 1
slug: /long-read
---

import SectionNavigator from '@site/src/components/docs/SectionNavigator';

# 长读长测序

长读长测序把单条 read 的长度从传统短读长的 100–300 bp，提升到数 kb 乃至数十 kb，显著改善了重复区域解析、结构变异检测和复杂组装问题。

## 这一部分讲什么

本章聚焦：

- PacBio 与 Oxford Nanopore 两大主流平台；
- 长读长组装与纠错；
- 结构变异（SV）检测。

## 为什么重要

- 重复序列是短读长组装和比对的核心难点，而长读长可以跨越更多重复区；
- SV 常常大于短读长长度，长读长更容易直接观测；
- 复杂转录本、haplotype phasing 和 de novo assembly 都受益于更长的读段；
- 临床中的大型缺失、插入和重排解释也越来越依赖长读长证据。

## 推荐阅读顺序

1. [PacBio 与 Nanopore](./pacbio-nanopore.md)
2. [长读长组装](./long-read-assembly.md)
3. [重叠检测算法](./overlap-detection.md)
4. [Consensus 算法](./consensus-algorithm.md)
5. [Minimap2 比对算法](./minimap2-alignment.md)
6. [Basecalling 算法](./basecalling-algorithm.md)
7. [结构变异检测](./sv-detection.md)

## 与其他板块的连接

- 组装理论基础见 [组装与图算法](../assembly/index.md)；
- 小变异与大变异的区别见 [small variants vs SV](../variants/small-variants-vs-sv.mdx)；
- 临床场景下的进一步解释见 [临床变异解释](../clinical-variants/index.md)。

## 子主题导航

<SectionNavigator
  items={[
    {
      title: 'PacBio 与 Nanopore',
      to: '/docs/long-read/pacbio-nanopore',
      description: '理解两类平台的测序原理、误差模式与适用场景。',
    },
    {
      title: '长读长组装',
      to: '/docs/long-read/long-read-assembly',
      description: '从 overlap 到 contig，再到 polishing 和评估。',
    },
    {
      title: '重叠检测算法',
      to: '/docs/long-read/overlap-detection',
      description: 'Minimap 的 minimizer 采样和 MHAP 的 MinHash 算法。',
    },
    {
      title: 'Consensus 算法',
      to: '/docs/long-read/consensus-algorithm',
      description: 'Racon 的 POA 动态规划和 Medaka 的神经网络模型。',
    },
    {
      title: 'Minimap2 比对算法',
      to: '/docs/long-read/minimap2-alignment',
      description: 'Seed-chain-align 流程与带状动态规划实现。',
    },
    {
      title: 'Basecalling 算法',
      to: '/docs/long-read/basecalling-algorithm',
      description: 'Nanopore 信号处理的 HMM 模型与神经网络架构。',
    },
    {
      title: '结构变异检测',
      to: '/docs/long-read/sv-detection',
      description: '利用 split-read、coverage 和断点证据检测大型插入、缺失和重排。',
    },
  ]}
/>

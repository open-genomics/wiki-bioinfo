---
sidebar_position: 1
slug: /epigenomics
---

import SectionNavigator from '@site/src/components/docs/SectionNavigator';

# 表观基因组学

表观基因组学研究 DNA 序列之外、但会影响基因表达与染色质状态的调控层，包括转录因子结合、组蛋白修饰、染色质可及性和 DNA 甲基化。

## 这一部分讲什么

这一章重点介绍三类最常见的数据与分析思路：

- **ChIP-seq**：看蛋白质与 DNA 的结合或特定组蛋白修饰的分布；
- **ATAC-seq**：看开放染色质区域；
- **DNA methylation**：看 CpG 位点及区域的甲基化状态。

## 为什么重要

- 基因表达不是只由序列决定，还受到调控区域和染色质状态影响；
- 同样的基因组，在不同细胞类型中可以有完全不同的开放状态和修饰图谱；
- 癌症、发育和免疫反应中，表观层变化往往是关键机制。

## 推荐阅读顺序

1. [ChIP-seq 概览](./chip-seq-overview.md)
2. [ATAC-seq](./atac-seq.md)
3. [DNA 甲基化](./dna-methylation.md)

## 子主题导航

<SectionNavigator
  items={[
    {
      title: 'ChIP-seq 概览',
      to: '/docs/epigenomics/chip-seq-overview',
      description: '理解峰调用、背景校正、输入对照与 motif 分析。',
    },
    {
      title: 'ATAC-seq',
      to: '/docs/epigenomics/atac-seq',
      description: '从 Tn5 插入偏好到 peak、footprint 与开放染色质分析。',
    },
    {
      title: 'DNA 甲基化',
      to: '/docs/epigenomics/dna-methylation',
      description: 'WGBS、甲基化比例、DMR 与注释解释。',
    },
  ]}
/>

## 与其他板块的连接

- 基因结构和注释基础见 [参考基因组与注释](../foundations/reference-and-annotation.md)；
- motif 与概率模型见 [PWM / PSSM](../models/pwm-pssm.md)；
- 单细胞扩展可衔接 scATAC-seq 与多组学分析。

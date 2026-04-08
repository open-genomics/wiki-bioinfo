---
title: "蛋白质组学"
---

import SectionNavigator from '@site/src/components/docs/SectionNavigator';


蛋白质组学关注的是：在样本中真正被翻译出来并可被检测到的蛋白质有哪些，它们的丰度、修饰和相互作用如何变化。

## 这一部分讲什么

本章聚焦基于质谱（mass spectrometry, MS）的蛋白质组学分析：

- 质谱测量原理；
- 数据库搜索与 FDR；
- 定量蛋白质组学。

## 为什么重要

- RNA 不等于 protein，表达调控还发生在翻译后层面；
- 蛋白质修饰、降解和复合体决定了更多直接功能；
- 临床 biomarker 和药物靶点常常更接近蛋白层证据。

## 推荐阅读顺序

1. [质谱基础](./mass-spectrometry-basics.md)
2. [数据库搜索与 FDR](./database-search-and-fdr.md)
3. [定量蛋白质组学](./quantitative-proteomics.md)

## 与其他板块的连接

- 蛋白语言模型可继续看 [机器学习与基础模型](../ml-bioinfo/index.md)；
- 蛋白层证据可与 [临床变异解释](../clinical-variants/index.md) 形成互补；
- 上游序列与基因结构基础见 [基础与数学](../foundations/index.md)。

## 子主题导航

<SectionNavigator
  items={[
    {
      title: '质谱基础',
      to: '/docs/proteomics/mass-spectrometry-basics',
      description: '从 peptide、m/z 到 MS1 / MS2 的基本测量逻辑。',
    },
    {
      title: '数据库搜索与 FDR',
      to: '/docs/proteomics/database-search-and-fdr',
      description: '理解 peptide-spectrum match、target-decoy 和鉴定置信度控制。',
    },
    {
      title: '定量蛋白质组学',
      to: '/docs/proteomics/quantitative-proteomics',
      description: '理解 label-free、TMT 和蛋白丰度比较。',
    },
  ]}
/>

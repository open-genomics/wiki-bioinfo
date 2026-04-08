---
title: "空间转录组"
---

import SectionNavigator from '@site/src/components/docs/SectionNavigator';


空间转录组学试图同时回答两个问题：**细胞/区域里表达了什么**，以及**这些表达发生在组织的什么位置**。

## 这一部分讲什么

本章聚焦空间转录组的核心概念：

- 空间条码与 spot-based 测量；
- 与单细胞 RNA-seq 的关系；
- 空间去卷积与细胞映射。

## 为什么重要

- bulk 和 scRNA-seq 往往丢失组织空间上下文；
- 肿瘤微环境、发育分层和组织结构都强依赖空间位置；
- 许多细胞通讯关系只有放回空间后才更容易解释。

## 推荐阅读顺序

1. [空间转录组总览](./spatial-transcriptomics-overview.md)
2. [spot 与单细胞](./spot-vs-single-cell.md)
3. [去卷积与细胞映射](./deconvolution-and-mapping.md)

## 子主题导航

<SectionNavigator
  items={[
    {
      title: '空间转录组总览',
      to: '/docs/spatial/spatial-transcriptomics-overview',
      description: '理解 capture spot、空间条码、组织切片与标准分析流程。',
    },
    {
      title: 'spot 与单细胞',
      to: '/docs/spatial/spot-vs-single-cell',
      description: '比较空间组学和 scRNA-seq 在分辨率、噪声与解释上的差异。',
    },
    {
      title: '去卷积与细胞映射',
      to: '/docs/spatial/deconvolution-and-mapping',
      description: '利用单细胞参考把空间 spot 分解成细胞类型组成。',
    },
  ]}
/>

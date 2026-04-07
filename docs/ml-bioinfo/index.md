---
sidebar_position: 1
slug: /ml-bioinfo
---

import SectionNavigator from '@site/src/components/docs/SectionNavigator';

# 生物信息学中的机器学习

机器学习正在快速改变生物信息学：从 motif 预测、蛋白结构预测，到单细胞嵌入、序列语言模型和多组学整合，越来越多问题被重新表述为表示学习和预测问题。

## 这一部分讲什么

本章聚焦两个入口：

- **序列深度学习**：CNN、Transformer、结构化输入；
- **生物序列嵌入与语言模型**：DNA/RNA/protein foundation models。

## 为什么重要

- 很多经典手工特征正在被端到端表示学习替代；
- 预训练模型显著降低了下游任务的数据门槛；
- 机器学习不再只是“加一个分类器”，而是成为建模复杂生物规律的重要工具。

## 推荐阅读顺序

1. [序列深度学习](./deep-learning-for-sequences.md)
2. [嵌入与语言模型](./embeddings-and-language-models.md)

## 子主题导航

<SectionNavigator
  items={[
    {
      title: '序列深度学习',
      to: '/docs/ml-bioinfo/deep-learning-for-sequences',
      description: '从 one-hot 编码到 CNN、Transformer 和下游监督任务。',
    },
    {
      title: '嵌入与语言模型',
      to: '/docs/ml-bioinfo/embeddings-and-language-models',
      description: '理解 DNA、RNA、蛋白语言模型及其表示迁移。',
    },
  ]}
/>

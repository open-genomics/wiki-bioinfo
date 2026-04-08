---
title: "生物信息学中的机器学习"
---

import SectionNavigator from '@site/src/components/docs/SectionNavigator';


机器学习正在快速改变生物信息学：从 motif 预测、蛋白结构预测，到单细胞嵌入、序列语言模型和多组学整合，越来越多问题被重新表述为表示学习和预测问题。

## 这一部分讲什么

本章聚焦三个核心算法架构：

- **序列深度学习概览**：CNN、Transformer、RNN 的基本概念；
- **CNN for Sequences**：卷积神经网络在序列中的详细算法实现；
- **RNN/LSTM for Sequences**：循环神经网络和长短期记忆网络的详细算法实现；
- **Transformer for Sequences**：自注意力机制和 Transformer 的详细算法实现；
- **生物序列嵌入与语言模型**：DNA/RNA/protein foundation models。

## 为什么重要

- 很多经典手工特征正在被端到端表示学习替代；
- 预训练模型显著降低了下游任务的数据门槛；
- 机器学习不再只是“加一个分类器”，而是成为建模复杂生物规律的重要工具。

## 推荐阅读顺序

1. [序列深度学习](./deep-learning-for-sequences.md)
2. [CNN for Sequences](./cnn-for-sequences.md)
3. [RNN/LSTM for Sequences](./rnn-lstm-for-sequences.md)
4. [Transformer for Sequences](./transformer-for-sequences.md)
5. [嵌入与语言模型](./embeddings-and-language-models.md)

## 子主题导航

<SectionNavigator
  items={[
    {
      title: '序列深度学习',
      to: '/docs/ml-bioinfo/deep-learning-for-sequences',
      description: '从 one-hot 编码到 CNN、Transformer 和下游监督任务。',
    },
    {
      title: 'CNN for Sequences',
      to: '/docs/ml-bioinfo/cnn-for-sequences',
      description: '卷积神经网络在序列中的详细算法实现，包括卷积操作、池化和 worked example。',
    },
    {
      title: 'RNN/LSTM for Sequences',
      to: '/docs/ml-bioinfo/rnn-lstm-for-sequences',
      description: '循环神经网络和长短期记忆网络的详细算法实现，包括门控机制和 worked example。',
    },
    {
      title: 'Transformer for Sequences',
      to: '/docs/ml-bioinfo/transformer-for-sequences',
      description: '自注意力机制和 Transformer 的详细算法实现，包括位置编码和 worked example。',
    },
    {
      title: '嵌入与语言模型',
      to: '/docs/ml-bioinfo/embeddings-and-language-models',
      description: '理解 DNA、RNA、蛋白语言模型及其表示迁移。',
    },
  ]}
/>

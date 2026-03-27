---
sidebar_position: 1
slug: /models
---

import SectionNavigator from '@site/src/components/docs/SectionNavigator';
import RelatedLinks from '@site/src/components/docs/RelatedLinks';

# 概率模型与模式识别

从 motif 到基因预测，很多任务都需要用统计和概率模型描述“观察到的序列是如何产生的”。

## 这一部分在全站中的位置

这一节位于“核心方法”大板块内部，是字符串 / 图模型之外的另一条核心主线，重点回答：面对噪声、隐藏状态和模糊模式时，如何进行概率化建模与推断。

## 推荐阅读顺序

1. [隐马尔可夫模型](./hmm.md)
2. [Motif 寻找](./motif-finding.md)
3. [PWM 与 PSSM](./pwm-pssm.md)
4. [Gene prediction](./gene-prediction.md)

## 子主题导航

<SectionNavigator
  items={[
    {
      title: '隐马尔可夫模型',
      to: '/docs/models/hmm',
      description: '理解隐藏状态、观测序列与 Viterbi 等推断框架。',
    },
    {
      title: 'Motif 寻找',
      to: '/docs/models/motif-finding',
      description: '把模式发现问题放回生物序列分析的真实上下文。',
    },
    {
      title: 'PWM 与 PSSM',
      to: '/docs/models/pwm-pssm',
      description: '理解位置相关的 motif 表示为什么比固定字符串更接近现实。',
    },
    {
      title: 'Gene prediction',
      to: '/docs/models/gene-prediction',
      description: '把序列分段、概率模型和注释生成联系起来。',
    },
  ]}
/>

## 与其他板块的连接

<RelatedLinks
  links={[
    {
      title: '基础与数学',
      to: '/docs/foundations/',
      description: '概率、图与动态规划预备为这里的模型层提供共同语言。',
    },
    {
      title: '分析方向与案例',
      to: '/docs/applications/',
      description: 'RNA-seq、gene prediction 和 motif 分析都会把这些模型重新放回具体任务。',
    },
    {
      title: '数据、注释与资源',
      to: '/docs/data-references/',
      description: '很多概率模型最终都要依赖参考、注释和数据库对象解释结果。',
    },
  ]}
/>

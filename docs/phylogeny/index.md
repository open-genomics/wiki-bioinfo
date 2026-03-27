---
sidebar_position: 1
slug: /phylogeny
---

import PageHeaderMeta from '@site/src/components/docs/PageHeaderMeta';
import SectionNavigator from '@site/src/components/docs/SectionNavigator';

# 系统发育与进化

<PageHeaderMeta
  section="Applications"
  audience="已经理解比对与距离概念，希望进一步理解树结构与进化关系解释的读者"
  startWith="先从距离方法概览切入，再回头联系比对和 workflow 背景"
/>

系统发育分析试图根据序列或特征差异重建物种、基因或样本之间的进化关系。

## 这一部分在全站中的位置

它位于“分析方向与案例”之下，承担的是应用层中的一个经典方向：把序列相似性和距离方法重新组织成树结构与进化解释。

## 为什么这一节重要

系统发育把比对、距离、模型和统计推断的结果，转换成更高层的关系结构。它既是一个独立主题，也是很多比较分析和进化研究中的解释层。

## 推荐阅读顺序

1. [多序列比对（MSA）](../alignment/multiple-sequence-alignment.md)
2. [距离方法概览](./distance-methods.md)
3. [加法系统发育（Additive Phylogeny）](./additive-phylogeny.md)
4. [Parsimony](./parsimony.md)
5. [Maximum Likelihood](./maximum-likelihood.md)

## 子主题导航

<SectionNavigator
  items={[
    {
      title: '距离方法概览',
      to: '/docs/phylogeny/distance-methods',
      badge: '起点',
      meta: 'distance-based',
      description: '从相似性、距离矩阵和聚类视角理解树是如何被构建出来的。',
    },
    {
      title: '加法系统发育（Additive Phylogeny）',
      to: '/docs/phylogeny/additive-phylogeny',
      badge: '理论骨架',
      meta: 'additive matrix',
      description: '理解当距离矩阵精确来自一棵树时，树结构如何被恢复出来。',
    },
    {
      title: 'Parsimony',
      to: '/docs/phylogeny/parsimony',
      badge: '位点方法',
      meta: 'minimum changes',
      description: '从位点变化次数最少的角度理解树推断。',
    },
    {
      title: 'Maximum Likelihood',
      to: '/docs/phylogeny/maximum-likelihood',
      badge: '模型方法',
      meta: 'likelihood',
      description: '在演化模型下，寻找最可能产生当前观测序列的树。',
    },
  ]}
/>

## 与其他板块的连接

- 上游依赖 [多序列比对（MSA）](../alignment/multiple-sequence-alignment.md) 和 [序列比对](../alignment/index.md) 提供同源位点基础；
- 作为 [分析方向与案例](../applications/index.mdx) 中的一个专题入口；
- 也和概率模型页中对 HMM、profile 的理解形成方法论对照：一个是序列状态模型，一个是树结构模型。

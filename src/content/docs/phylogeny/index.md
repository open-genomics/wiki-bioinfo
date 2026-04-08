---
title: "系统发育与进化"
---

import PageHeaderMeta from '@site/src/components/docs/PageHeaderMeta';
import SectionNavigator from '@site/src/components/docs/SectionNavigator';


<PageHeaderMeta
  section="Applications"
  audience="已经理解比对与距离概念，希望进一步理解树结构与进化关系解释的读者"
  startWith="先从层次聚类和 k-means 建立数据分群直觉，再进入 MSA 与系统发育方法。"
/>

系统发育分析试图根据序列或特征差异重建物种、基因或样本之间的进化关系。

<figure>
  <img src="/wiki-bioinfo/img/illustrations/phylogeny-tree.svg" alt="phylogeny tree concepts" />
  <figcaption>系统发育树用叶节点、内部节点和分支结构来表达样本之间的关系；但不同建树方法对应的统计假设并不相同。</figcaption>
</figure>

## 这一部分在全站中的位置

它位于“分析方向与案例”之下，承担的是应用层中的一个经典方向：把序列相似性、表达模式相似性与树方法重新组织成结构解释。

## 为什么这一节重要

系统发育把比对、距离、模型和统计推断的结果，转换成更高层的关系结构。它既是一个独立主题，也是很多比较分析和进化研究中的解释层。

## 推荐阅读顺序

1. [层次聚类](./hierarchical-clustering.md)
2. [k-means 在生物信息学中的应用](./k-means-bioinformatics.md)
3. [多序列比对（MSA）](../alignment/multiple-sequence-alignment.md)
4. [距离方法概览](./distance-methods.md)
5. [加法系统发育（Additive Phylogeny）](./additive-phylogeny.md)
6. [Parsimony](./parsimony.md)
7. [Maximum Likelihood](./maximum-likelihood.md)

## 子主题导航

<SectionNavigator
  items={[
    {
      title: '层次聚类',
      to: '/docs/phylogeny/hierarchical-clustering',
      badge: '表达数据',
      meta: 'dendrogram',
      description: '从 gene/sample expression matrix 出发，理解 dendrogram 和树状结构的直觉。',
    },
    {
      title: 'k-means 在生物信息学中的应用',
      to: '/docs/phylogeny/k-means-bioinformatics',
      badge: '表达数据',
      meta: 'partition clustering',
      description: '理解基因表达聚类与样本分群中的 k-means 目标函数和局限。',
    },
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

## 与表达数据分析的连接

- [RNA-seq 工作流概览](../workflows/rna-seq.md) 中的表达矩阵常用层次聚类或 k-means 做初步模式探索；
- [TPM、FPKM、CPM 与有效长度](../transcriptomics/tpm-fpkm-cpm.mdx) 提供 expression matrix 的输入背景；
- 树状图在 expression analysis 中更偏相似性可视化，不应直接等同于真实进化树。

## 与其他板块的连接

- 上游依赖 [多序列比对（MSA）](../alignment/multiple-sequence-alignment.md) 和 [序列比对](../alignment/index.md) 提供同源位点基础；
- 作为 [分析方向与案例](../applications/index.mdx) 中的一个专题入口；
- 也和概率模型页中对 HMM、profile 的理解形成方法论对照：一个是序列状态模型，一个是树结构模型。

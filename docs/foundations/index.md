---
sidebar_position: 1
slug: /foundations
description: 基础与数学板块入口，帮助读者建立对象层、坐标系统、coverage 与概率图模型的共同语言。
pagination_label: 基础与数学
---

import PageHeaderMeta from '@site/src/components/docs/PageHeaderMeta';
import SectionNavigator from '@site/src/components/docs/SectionNavigator';
import RelatedLinks from '@site/src/components/docs/RelatedLinks';

# 基础与数学

<PageHeaderMeta
  section="Foundations"
  audience="第一次系统学习生物信息学，或希望补齐对象层与数学直觉的读者"
  startWith="先读生物信息学中的基础对象，再进入 reads/coverage 与坐标系统"
/>

生物信息学的很多问题都可以抽象成对序列、图、矩阵和概率模型的计算。

但在进入算法之前，先要明确几个基本对象：

- 序列是什么；
- 读段和参考基因组是什么；
- coverage、错误模型和坐标系统怎样影响后续分析；
- 注释和特征区间如何把序列映射到生物学对象；
- 为什么图模型、动态规划和概率模型会反复出现。

## 这一部分在全站中的位置

这一节是整站的对象层与方法入口。后面的索引、比对、组装、变异检测、转录组分析几乎都依赖这里的术语和直觉。

## 为什么这一节重要

如果这层基础不稳，读者很容易在后面的页面里只记住工具名和术语，而无法理解：

- 输入输出到底对应什么对象；
- 某个方法为什么适合这个问题；
- 错误和不确定性从哪里进入流程。

## 推荐阅读顺序

1. [生物信息学中的基础对象](./biology-basics.md)
2. [序列、字符串与坐标系统](./sequences-and-strings.md)
3. [测序 reads、coverage 与错误模型](./sequencing-reads-coverage.md)
4. [参考基因组、坐标系统与注释](./reference-and-annotation.md)
5. [概率、图与动态规划预备](./probability-and-graphs.md)
6. [算法与复杂度](./algorithms-and-complexity.md)
7. [图算法基础](./graph-algorithms.md)
8. [字符串模式匹配](./string-pattern-matching.md)
9. [分治算法基础](./divide-and-conquer.md)
10. [近似算法](./approximation-algorithms.md)

## 子主题导航

<SectionNavigator
  items={[
    {
      title: '生物信息学中的基础对象',
      to: '/docs/foundations/biology-basics',
      badge: '起点',
      meta: '对象层',
      description: '先建立 DNA、RNA、蛋白质、基因组、reads 和注释等基本对象的整体认识。',
    },
    {
      title: '序列、字符串与坐标系统',
      to: '/docs/foundations/sequences-and-strings',
      badge: '基础',
      meta: '表示层',
      description: '把生物对象和字符串表示、坐标系、区间概念连接起来。',
    },
    {
      title: '测序 reads、coverage 与错误模型',
      to: '/docs/foundations/sequencing-reads-coverage',
      badge: '核心',
      meta: '观测层',
      description: '理解原始观测如何影响后续比对、组装、变异检测与定量。',
    },
    {
      title: '参考基因组、坐标系统与注释',
      to: '/docs/foundations/reference-and-annotation',
      badge: '关键',
      meta: '资源层接口',
      description: '建立参考版本、注释层级与坐标系统的基本直觉。',
    },
    {
      title: '概率、图与动态规划预备',
      to: '/docs/foundations/probability-and-graphs',
      badge: '衔接',
      meta: '方法预备',
      description: '为后续比对、组装和概率模型页建立共通数学语言。',
    },
    {
      title: '算法与复杂度',
      to: '/docs/foundations/algorithms-and-complexity',
      badge: '总纲',
      meta: '方法论',
      description: '从穷举、DP、图算法、索引到随机化方法，建立整站的算法主线。',
    },
    {
      title: '图算法基础',
      to: '/docs/foundations/graph-algorithms',
      badge: '算法',
      meta: '图方法',
      description: 'BFS、DFS、最短路径与连通性，在组装、系统发育树和序列比对中的应用。',
    },
    {
      title: '字符串模式匹配',
      to: '/docs/foundations/string-pattern-matching',
      badge: '算法',
      meta: '字符串',
      description: 'KMP、Boyer-Moore、Rabin-Karp，在序列比对、motif 搜索和数据库检索中的应用。',
    },
    {
      title: '分治算法基础',
      to: '/docs/foundations/divide-and-conquer',
      badge: '算法',
      meta: '分治',
      description: '归并排序、快速排序、最近点对，在序列排序、树构建和距离计算中的应用。',
    },
    {
      title: '近似算法',
      to: '/docs/foundations/approximation-algorithms',
      badge: '算法',
      meta: '近似',
      description: '处理 NP-hard 问题的实用策略，在系统发育树、Motif 发现和序列比对中的应用。',
    },
  ]}
/>

## 与其他板块的连接

<RelatedLinks
  links={[
    {
      title: '核心方法',
      to: '/docs/core-methods/',
      label: '下一步',
      description: '基础层负责回答“对象是什么”，方法层再回答“怎么计算”。',
    },
    {
      title: '数据、注释与资源',
      to: '/docs/data-references/',
      label: '并行理解',
      description: '参考、坐标和格式与这里的对象概念天然相连。',
    },
    {
      title: '分析方向与案例',
      to: '/docs/applications/',
      label: '应用层',
      description: '应用层会把这里的对象和方法重新放回 DNA-seq、RNA-seq 等任务里。',
    },
  ]}
/>

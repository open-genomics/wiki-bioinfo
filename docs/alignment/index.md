---
sidebar_position: 1
slug: /alignment
description: 序列比对板块入口，串联编辑距离、全局/局部比对、打分矩阵、seed-and-extend 以及现代 mapper 原理。
pagination_label: 序列比对
---

import SectionNavigator from '@site/src/components/docs/SectionNavigator';
import RelatedLinks from '@site/src/components/docs/RelatedLinks';

# 序列比对

序列比对是生物信息学最核心的基础任务之一。

它既是独立问题，也是很多流程的入口：mapping、注释、同源分析、组装和系统发育都与它密切相关。

## 这一部分在全站中的位置

这一节位于“核心方法”大板块内部，把前面的字符串、索引、动态规划与后面的 DNA-seq、RNA-seq、注释和进化分析真正接起来。

## 推荐阅读顺序

1. [编辑距离](./edit-distance.md)
2. [全局比对与局部比对](./global-local.md)
3. [打分矩阵与 gap 罚分](./scoring-matrices.md)
4. [半全局比对](./semi-global-alignment.md)
5. [Affine gap penalty](./affine-gap-penalty.md)
6. [Needleman-Wunsch 算法](./needleman-wunsch.md)
7. [Smith-Waterman 算法](./smith-waterman.md)
8. [Gotoh 算法](./gotoh.md)
9. [Hirschberg 算法](./hirschberg.md)
10. [带状动态规划](./banded-dp.md)
11. [Seed-and-extend](./seed-and-extend.md)
12. [BLAST：基于 seed-and-extend 的局部搜索](./blast.md)
13. [BWA 与 minimap2](./bwa-minimap2.md)
14. [MAPQ、CIGAR 与多重比对](./mapping-quality-and-multi-mapping.md)
15. [多序列比对（MSA）](./multiple-sequence-alignment.md)


## 子主题导航

<SectionNavigator
  items={[
    {
      title: '编辑距离',
      to: '/docs/alignment/edit-distance',
      description: '从最基础的动态规划问题出发，建立比对的最短路径直觉。',
    },
    {
      title: '全局比对与局部比对',
      to: '/docs/alignment/global-local',
      description: '理解不同任务为什么需要不同的目标函数与路径边界。',
    },
    {
      title: '打分矩阵与 gap 罚分',
      to: '/docs/alignment/scoring-matrices',
      description: '把字符替换和 gap 代价引入更真实的模型。',
    },
    {
      title: '半全局比对',
      to: '/docs/alignment/semi-global-alignment',
      badge: '比对变体',
      description: '理解如何处理序列端部的gap，适用于read mapping和重叠检测等场景。',
    },
    {
      title: 'Affine gap penalty',
      to: '/docs/alignment/affine-gap-penalty',
      description: '理解为什么连续 gap 和碎片 gap 不该被同样对待。',
    },
    {
      title: 'Needleman-Wunsch 算法',
      to: '/docs/alignment/needleman-wunsch',
      badge: '经典算法',
      description: '全局比对的标准动态规划算法，包括完整递推公式与回溯过程。',
    },
    {
      title: 'Smith-Waterman 算法',
      to: '/docs/alignment/smith-waterman',
      badge: '经典算法',
      description: '局部比对的标准动态规划算法，理解如何寻找最优局部相似片段。',
    },
    {
      title: 'Gotoh 算法',
      to: '/docs/alignment/gotoh',
      badge: '算法优化',
      description: '处理 affine gap penalty 的三状态动态规划算法。',
    },
    {
      title: 'Hirschberg 算法',
      to: '/docs/alignment/hirschberg',
      badge: '算法优化',
      description: '线性空间全局比对算法，通过分治策略优化空间复杂度。',
    },
    {
      title: '带状动态规划',
      to: '/docs/alignment/banded-dp',
      badge: '算法优化',
      description: '限制搜索范围的加速技术，适用于高相似度序列比对。',
    },
    {
      title: 'Seed-and-extend',
      to: '/docs/alignment/seed-and-extend',
      description: '连接索引结构与局部扩展，形成现代比对的工程骨架。',
    },
    {
      title: 'BLAST：基于 seed-and-extend 的局部搜索',
      to: '/docs/alignment/blast',
      badge: '数据库搜索',
      description: '理解经典 BLAST 如何在大型数据库中结合 seed-and-extend 做局部相似性搜索。',
    },
    {
      title: 'BWA 与 minimap2',
      to: '/docs/alignment/bwa-minimap2',
      badge: 'read mapping',
      description: '从短读长到长读长，理解现代 mapper 如何结合 FM-index / minimizer 与扩展策略。',
    },
    {
      title: 'MAPQ、CIGAR 与多重比对',
      to: '/docs/alignment/mapping-quality-and-multi-mapping',
      badge: '结果解释',
      description: '把 mapper 输出的字段真正放回变异检测与表达定量的解释框架里。',
    },
    {
      title: '多序列比对（MSA）',
      to: '/docs/alignment/multiple-sequence-alignment',
      badge: '进阶对齐',
      description: '理解为什么多条序列不能简单重复 pairwise DP，以及 progressive alignment 的核心思路。',
    },
  ]}
/>

## 视觉化：alignment 方法与 mapper 技术栈

<figure>
  <img src="/wiki-bioinfo/img/figures/alignment-mapper-stack.png" alt="Layered diagram showing sequence representations, alignment models, seed-and-extend strategy, and real-world tools like BLAST, BWA, and minimap2" />
  <figcaption>从序列表示与索引，到编辑距离与动态规划，再到 seed-and-extend 与具体工具（BLAST / BWA / minimap2）的技术栈示意。</figcaption>
</figure>

## 与其他板块的连接

<RelatedLinks
  links={[
    {
      title: '序列表示与索引',
      to: '/docs/sequence/',
      description: '很多现代比对策略都建立在索引层的候选搜索之上。',
    },
    {
      title: '分析方向与案例',
      to: '/docs/applications/',
      description: '变异检测、RNA-seq 和系统发育都把比对作为前置任务。',
    },
    {
      title: '数据、注释与资源',
      to: '/docs/data-references/',
      description: '比对的坐标、参考版本和输出格式都要依赖资源层约束。',
    },
  ]}
/>

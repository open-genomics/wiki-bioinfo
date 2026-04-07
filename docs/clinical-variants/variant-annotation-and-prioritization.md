---
sidebar_position: 2
description: 临床场景中的变异注释、过滤与优先级排序。
---

# 变异注释与优先级排序

## 核心问题

临床测序往往会产生数万到数百万个变异。真正困难的不是“找到所有变异”，而是从中筛出最可能与患者表型相关的那一小部分。

<figure>
  <img src="/wiki-bioinfo/img/illustrations/variant-prioritization.svg" alt="variant prioritization" />
  <figcaption>临床变异优先级排序通常会综合频率、功能影响、遗传模式、家系分离和表型匹配，而不是只看单一分数。</figcaption>
</figure>

## 常见筛选维度

- **群体频率**：罕见病场景下，常优先关注低频或极罕见变异；
- **功能影响**：nonsense、frameshift、canonical splice site 常更受关注；
- **遗传模式**：de novo、纯合、复合杂合、X-linked 等；
- **基因-表型匹配**：基因已知疾病关联是否与患者表型一致；
- **文献和数据库证据**：ClinVar、OMIM、HGMD、gnomAD 等。

## 为什么不能只看一个分数

例如一个变异即使是罕见 missense：

- 如果基因与表型无关，证据仍很弱；
- 如果位于对疾病无已知意义的转录本，也可能不重要；
- 如果家系分离不支持，也不应高优先级解释。

## 常见误区

- **罕见 = 致病**：绝大多数罕见变异仍是良性或意义不明；
- **预测软件说有害就够了**：in silico 证据只是辅助项；
- **ClinVar 有记录就一定可直接采用**：还要看 review status 和提交来源。

## 相关页面

- [ACMG 指南](./acmg-guidelines.md)
- [CNV 与 SV 解释](./cnv-and-sv-interpretation.md)
- [变异检测概览](../variants/variant-calling-overview.mdx)

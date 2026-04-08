---
title: "Metagenomics 流程总览"
---


## 任务目标

宏基因组分析关注的是：从混合样本的测序数据中推断其中有哪些物种、它们的相对丰度如何，以及可能携带哪些功能特征。

## 输入输出

- 输入：混合样本 FASTQ
- 中间结果：质控结果、分类候选、组装片段、功能注释
- 输出：物种组成、丰度估计、功能概览或组装结果

## 前置知识

- [测序 reads、coverage 与错误模型](../foundations/sequencing-reads-coverage.md)
- [常见文件格式概览](../formats/common-file-formats.mdx)
- [组装与图算法](../assembly/index.md)
- [数据库与资源](../databases/index.md)

## 步骤总览

1. 质控与宿主污染去除
2. 分类或比对到参考数据库
3. 可选的组装与 binning
4. 功能注释与通路解释

## 每步依赖与常见错误

宏基因组的难点在于样本是混合的，因此：

- coverage 非均匀更严重；
- 低丰度物种容易丢失；
- 数据库偏差会直接影响分类与注释；
- 组装和功能解释都比单物种任务更复杂。

## 对应算法模块

- 字符串索引与快速分类
- 图算法与混合样本组装
- 数据库映射与功能注释
- 统计丰度估计

## worked example

一个简化流程可以写成：

```text
FASTQ -> QC -> host removal -> taxonomic classification -> optional assembly -> functional annotation
```

如果分类结果和组装结果严重不一致，就需要回头检查：

- 数据库是否合适；
- 低丰度物种是否被过滤；
- coverage 与污染情况是否影响了下游解释。

## 注意事项

- 数据库选择会极大影响结果；
- 宏基因组中的 absence of evidence 更不能简单等于不存在；
- 组装、分类和功能注释往往需要联合解读。

## 相关页面

- [NGS 流程总览](./ngs-overview.md)
- [组装与图算法](../assembly/index.md)
- [数据库与资源](../databases/index.md)

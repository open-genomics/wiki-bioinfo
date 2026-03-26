---
sidebar_position: 4
---

# 如何选择 alignment、assembly 或 pseudo-alignment

## 任务目标

不同任务面对的核心问题并不相同，因此“该先比对、先组装，还是直接做 pseudo-alignment”并没有统一答案。

这一页的目标，是帮助你根据研究问题、参考条件和输出需求做选择。

## 输入输出

- 输入：研究问题、样本类型、参考条件、下游目标
- 输出：更合适的主流程方向与其背后的理由

## 前置知识

- [序列比对](../alignment/index.md)
- [组装与图算法](../assembly/index.md)
- [转录组](../transcriptomics/index.mdx)
- [NGS 流程总览](./ngs-overview.md)

## 步骤总览

### 更适合 alignment 的情况

- 有高质量参考基因组；
- 目标是定位 reads、做 variant calling、做注释驱动分析；
- 需要精确坐标。

### 更适合 assembly 的情况

- 缺少合适参考；
- 目标是重建新序列、新转录本或混合样本结构；
- 更关心整体结构恢复而不是已有坐标上的定位。

### 更适合 pseudo-alignment 的情况

- 任务重点是 RNA-seq 表达定量；
- 更关心转录本兼容性与丰度估计；
- 不要求精确碱基级路径解释。

## 每步依赖与常见错误

最常见的问题不是“工具选错”，而是目标没说清楚：

- 如果你要精确定位变异，却选了只强调兼容性判断的方法，结果就会失去解释力；
- 如果你没有高质量参考，却强行把所有问题都放到 alignment 框架里，很多结构信息会被错过；
- 如果你真正只关心表达定量，却仍做很重的全流程精确比对，可能只是增加了计算成本。

## 相关页面

- [DNA-seq 变异检测总览](../variants/variant-calling-overview.mdx)
- [RNA-seq 工作流概览](./rna-seq.md)
- [Pseudo-alignment 与表达定量](../transcriptomics/pseudo-alignment-and-quantification.mdx)
- [de Bruijn graph 组装](../assembly/de-bruijn.md)

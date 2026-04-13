---
title: "学习路线"
description: 针对不同背景读者的系统化学习路径与知识骨架推荐
---


本知识库按层次化结构组织内容。根据你的背景和学习目标，可以选择以下三条主线之一系统推进。

## 路线一：初学者路线（生物学背景优先）

**适合读者**：刚进入生物信息学领域，希望先建立整体知识框架的生物学背景学习者。

**学习目标**：理解生物信息学的基本对象、数据来源和分析流程，能够读懂常见分析结果。

### 推荐阅读顺序

| 序号 | 主题 | 核心内容 |
|------|------|----------|
| 1 | [导论](index.mdx) | 知识库结构导览 |
| 2 | [基础与数学](../foundations/index.mdx) | 必需的计算与数学基础 |
| 3 | [生物信息学中的基础对象](../foundations/biology-basics.mdx) | DNA、RNA、蛋白质、基因组 |
| 4 | [测序技术原理](../foundations/sequencing-reads-coverage.mdx) | reads、coverage、错误模型 |
| 5 | [数据与资源](../data-references/index.mdx) | 参考基因组、注释、数据库 |
| 6 | [常见文件格式](../formats/common-file-formats.mdx) | FASTA、FASTQ、BAM、VCF 等 |
| 7 | [分析方向概览](../applications/index.mdx) | 主要应用领域与问题类型 |
| 8 | [NGS 流程总览](../workflows/ngs-overview.md) | 标准分析流程框架 |

### 关键检查点

完成本路线后，你应该能够：
- 解释测序数据的基本结构和质量特征
- 理解 reference genome、annotation 的作用
- 识别常见文件格式的用途
- 描述一个标准 NGS 分析流程的主要步骤

---

## 路线二：算法路线（计算机背景优先）

**适合读者**：有计算机、数学或算法基础，希望从计算角度切入生物信息学的学习者。

**学习目标**：掌握生物信息学的核心算法思想，理解算法设计与生物学问题的对应关系。

### 推荐阅读顺序

| 阶段 | 主题 | 算法焦点 |
|------|------|----------|
| **导论** | [算法入门](./algorithms-intro.mdx) | 生物信息学算法的整体框架 |
| **基础** | [算法与复杂度](../foundations/algorithms-and-complexity.mdx) | 复杂度分析与算法设计原则 |
| **字符串** | [序列表示与索引](../sequence/index.mdx) | 字符串模型、k-mer |
| | [精确字符串匹配](../sequence/exact-string-matching.mdx) | 模式匹配算法 |
| | [Suffix Array 与 BWT](../sequence/suffix-array-bwt.mdx) | 后缀数组、Burrows-Wheeler 变换 |
| | [FM-index](../sequence/fm-index.mdx) | 压缩索引结构 |
| **比对** | [序列比对](../alignment/index.mdx) | 比对问题的计算本质 |
| | [编辑距离](../alignment/edit-distance.mdx) | 动态规划基础 |
| | [多序列比对](../alignment/multiple-sequence-alignment.mdx) | MSA 算法策略 |
| **进化** | [系统发育](../phylogeny/index.mdx) | 树重构算法 |
| **模型** | [概率模型](../models/index.mdx) | 统计建模框架 |
| | [隐马尔可夫模型](../models/hmm.mdx) | HMM 及其应用 |
| | [基因预测](../models/gene-prediction.mdx) | 基于模型的预测方法 |

### 关键检查点

完成本路线后，你应该能够：
- 解释动态规划在序列分析中的应用原理
- 描述字符串索引的基本思想和复杂度优势
- 理解概率模型如何处理生物数据的噪声和不确定性
- 为特定生物学问题选择合适的算法范式

---

## 路线三：实战路线（数据驱动学习）

**适合读者**：已有测序数据，希望把工具使用与原理理解结合起来的实践者。

**学习目标**：能够设计和执行完整的生物信息学分析流程，并理解各步骤的计算原理。

### 推荐阅读顺序

| 阶段 | 主题 | 实战焦点 |
|------|------|----------|
| **准备** | [数据与资源](../data-references/index.mdx) | 获取参考数据和注释 |
| | [常见文件格式](../formats/common-file-formats.mdx) | 理解输入输出格式 |
| **定量** | [Pseudo-alignment](../transcriptomics/pseudo-alignment-and-quantification.mdx) | 快速表达定量 |
| **变异** | [变异检测总览](../variants/variant-calling-overview.mdx) | 从测序到变异调用 |
| **RNA** | [RNA-seq 工作流](../workflows/rna-seq.mdx) | 差异表达分析完整流程 |
| **整合** | [分析方向](../applications/index.mdx) | 不同场景的方法选择 |

### 学习建议

本路线强调"**概念 → 方法 → 数据格式 → 工作流 → 工具解释**"的循环：

1. **学算法时**：关注它处理的数据格式和输入输出要求
2. **学流程时**：追溯各步骤依赖的算法原理（索引、动态规划、概率模型）
3. **用工具时**：先明确它解决什么问题，再理解参数含义
4. **做分析时**：把"样本设计、数据输入、建模、计算、结果解释"串成完整链条

---

## 核心知识骨架（速成参考）

如果你时间有限，建议优先阅读以下页面建立"最小可行知识结构"：

### 基础层
- [生物信息学中的基础对象](../foundations/biology-basics.mdx)
- [参考基因组与注释](../foundations/reference-and-annotation.mdx)
- [常见文件格式概览](../formats/common-file-formats.mdx)

### 算法层
- [k-mer 与序列表示](../sequence/kmers.mdx)
- [编辑距离](../alignment/edit-distance.mdx)
- [FM-index](../sequence/fm-index.mdx)

### 流程层
- [DNA-seq 变异检测总览](../variants/variant-calling-overview.mdx)
- [RNA-seq 工作流概览](../workflows/rna-seq.mdx)

---

## 如何结合教材与实践

生物信息学的学习需要在理论与实践之间反复迭代：

```text
理论理解 ← → 动手实践
   ↑              ↓
问题驱动 ← → 结果验证
```

**推荐的学习模式**：

1. **问题导向**：从一个具体的生物学问题出发，而非从算法或工具出发
2. **分层深入**：先建立概念框架，再深入数学细节，最后对接实际工具
3. **交叉验证**：用教材中的算法思想解释工具行为，用工具输出验证算法假设
4. **横向连接**：注意不同主题间的联系（如动态规划既用于比对也用于 RNA 结构预测）

## 相关页面

- [关于本项目](about.mdx) — 知识库的设计理念
- [算法入门](./algorithms-intro.mdx) — 算法思维的系统介绍
- [写作规范](style-guide.mdx) — 页面类型与内容模板

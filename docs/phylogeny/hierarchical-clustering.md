---
sidebar_position: 6
description: 层次聚类在基因表达与样本关系分析中的作用，以及它与树形表示的联系。
pagination_label: 层次聚类
---

# 层次聚类

## 是什么

层次聚类（hierarchical clustering）是一类把对象逐步合并成树状结构的方法。

在生物信息学中，它常用于：

- 基因表达矩阵中的基因聚类；
- 样本之间的相似性分析；
- 初步构造“树状”关系图（dendrogram）。

它与系统发育树不完全相同，但在视觉形式和构造直觉上非常接近，因此也是理解树构建的重要桥梁。

## 为什么它对 expression data 很重要

在基因表达数据中，我们往往面对的是一个大矩阵：

- 行：基因；
- 列：样本或时间点；
- 单元格：表达值。

如果只看原始矩阵，很难快速判断：

- 哪些基因表达模式相似；
- 哪些样本更接近；
- 是否存在明显的亚群或时间序列结构。

层次聚类正好提供了一种直观办法：

- 把“相似表达模式”的对象放在一起；
- 用树状图表示它们合并的过程。

## 核心思路

一种典型的 agglomerative hierarchical clustering 流程是：

1. 初始时，每个对象都是一个单独簇；
2. 计算对象之间的距离；
3. 找到最接近的两个簇，将它们合并；
4. 更新簇之间的距离；
5. 重复，直到所有对象合并成一棵树。

这和 UPGMA 非常接近，因此很多读者第一次接触 phylogeny 时，会先从层次聚类建立直觉。

## 表达数据中的常见距离

在 expression data 中，“距离”不一定是编辑距离或序列差异。

更常见的是：

- 欧氏距离（Euclidean distance）
- 相关系数转化的距离（如 1 − correlation）
- 其他标准化后距离

因此，层次聚类的结果高度依赖：

- 表达矩阵是否已做归一化；
- 是否进行了 log 变换；
- 选择了什么距离和 linkage 方式。

## linkage 的直觉

在簇之间更新距离时，常见策略包括：

- single linkage：取最近点距离；
- complete linkage：取最远点距离；
- average linkage：取平均距离；

这些不同 linkage 会显著改变 dendrogram 的形态，因此：

- dendrogram 不只是“数据自然长出来的树”；
- 它也编码了你选用的距离和聚类规则。

## 与系统发育的关系

层次聚类和系统发育树都长得像树，但语义不同：

- **层次聚类树**：
  - 主要表示相似性组织方式；
  - 常用于表达模式探索和可视化；
- **系统发育树**：
  - 试图解释真实演化关系；
  - 更强调生物学替换模型和祖先关系。

因此：

- 层次聚类很适合做 exploratory analysis；
- 但不能简单把基因表达 dendrogram 当作真正的 evolution tree。

## 相关页面

- [距离矩阵方法](./distance-methods.md)
- [RNA-seq 工作流概览](../workflows/rna-seq.md)
- [TPM、FPKM、CPM 与有效长度](../transcriptomics/tpm-fpkm-cpm.mdx)

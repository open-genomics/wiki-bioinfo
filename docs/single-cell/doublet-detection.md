---
sidebar_position: 6
description: Doublet 的来源、识别方法与对单细胞分析的影响。
---

# Doublet 检测

## 是什么

在液滴法 scRNA-seq 中，理想情况是“一个液滴一个细胞”。但现实中有些液滴会同时包进两个细胞，这就形成了 **doublet**；如果是更多细胞，则称为 multiplet。

Doublet 的结果是：一个 barcode 下混合了两个细胞的转录组信号，后续分析中它可能表现成一个看起来“介于两类细胞之间”的假细胞。

## 为什么危险

Doublet 会影响：

- 聚类结果：产生假的过渡群或稀有群；
- marker gene 解释：一个细胞同时表达两类标记；
- 轨迹推断：制造假的分支或中间态；
- 细胞类型注释：误判为新亚型。

## 常见识别思路

### 1. 基于模拟双联体

工具会从现有细胞表达矩阵中，随机选两细胞求和，生成“人工 doublet”，再比较真实细胞与这些模拟 doublet 的相似性。

代表工具：

- **Scrublet**
- **DoubletFinder**

### 2. 基于异常统计特征

doublet 往往具有：

- 更高的 UMI 数；
- 更多检测到的基因数；
- 同时表达互斥 marker genes。

但仅靠这些阈值通常不够稳健。

## 何时更容易出现

- 上样细胞浓度过高；
- 追求极高通量时；
- 大细胞和小细胞混合体系；
- 不同样本混池时。

## 实践建议

- 在 QC 和初步归一化后、正式聚类前做 doublet 检测；
- 不要只依赖一个分数阈值，结合 marker 和 UMAP 检查；
- 样本混池时可结合 genotype demultiplexing 做更可靠识别。

## 常见误区

- **高 UMI 细胞一定是 doublet**：活跃细胞类型本来就可能高表达；
- **doublet 检测分数高就必须删**：建议结合生物学标记核查；
- **只有异类细胞组合才有影响**：同类细胞 doublet 也会影响计数和下游统计。

## 参考资料

- Scrublet / DoubletFinder 文档
- 单细胞 best practices 综述

## 相关页面

- [scRNA-seq 总览](./scrna-seq-overview.md)
- [聚类与 UMAP 降维](./clustering-and-umap.md)
- [轨迹推断](./trajectory-analysis.md)

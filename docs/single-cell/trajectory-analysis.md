---
sidebar_position: 5
description: 轨迹推断、伪时间和 RNA velocity 的基本思想。
---

# 轨迹推断

## 核心问题

很多单细胞数据并不是静态的“细胞类型快照”，而是在捕捉一个连续变化过程，例如：

- 干细胞分化；
- 免疫激活；
- 肿瘤细胞状态转换；
- 发育时间轴上的细胞命运决定。

轨迹推断（trajectory inference）试图根据这些离散采样到的细胞，重建其潜在的连续变化路径。

## 伪时间（Pseudotime）

伪时间并不等于真实时间，而是一个按细胞状态顺序排列的连续坐标。它回答的是：

- 哪些细胞更“早期”？
- 哪些细胞更“晚期”？
- 哪些基因在状态变化过程中逐渐上调或下调？

常见工具包括：

- **Monocle 3**
- **Slingshot**
- **PAGA**（Scanpy 生态）

## 基本思想

轨迹推断通常基于低维嵌入或邻域图：

1. 在 PCA / UMAP / diffusion map 空间中构建细胞图；
2. 寻找主路径或最小生成树；
3. 指定或推断根节点（root）；
4. 沿路径给每个细胞分配伪时间值。

## 分支结构

真实生物过程往往不是一条线，而是会分叉：

- 一个前体细胞群分化为多个终末谱系；
- 肿瘤细胞进入耐药和非耐药两条路径；
- 免疫细胞在不同活化状态之间分化。

因此轨迹模型经常需要处理 **branching trajectories**。

## RNA velocity

RNA velocity 利用未剪接（unspliced）和已剪接（spliced）转录本比例，估计细胞表达状态的“局部变化方向”。

直觉上：

- 某基因若未剪接 RNA 增多，可能表示它即将上调；
- 若已剪接高但未剪接低，可能表示趋于稳定或下降。

这让我们不仅能看到“细胞现在在哪”，还可推断“它接下来往哪走”。

常用工具：**scVelo**。

## 常见误区

- **伪时间就是实验时间**：它只是状态排序，不能直接替代真实时间；
- **UMAP 的形状就是轨迹**：UMAP 是可视化投影，形状可能受参数影响；
- **分支一定代表命运决定**：也可能是批次或细胞周期等混杂因素；
- **RNA velocity 一定可靠**：需要较好的数据质量和合适模型假设。

## 参考资料

- Trapnell et al., Monocle 系列论文
- Bergen et al., scVelo
- Scanpy / scVelo 文档

## 相关页面

- [scRNA-seq 总览](./scrna-seq-overview.md)
- [聚类与 UMAP 降维](./clustering-and-umap.md)
- [差异表达分析](../transcriptomics/differential-expression.mdx)

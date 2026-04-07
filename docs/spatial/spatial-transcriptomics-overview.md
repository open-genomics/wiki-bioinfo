---
sidebar_position: 2
description: 空间转录组学的技术原理、数据结构与标准分析流程。
---

# 空间转录组总览

## 是什么

空间转录组（spatial transcriptomics）在组织切片上保留位置坐标的同时测量 RNA 表达。与 scRNA-seq 相比，它不再只输出一个 `gene × cell` 矩阵，而是更接近 `gene × location` 矩阵。

<figure>
  <img src="/wiki-bioinfo/img/illustrations/spatial-workflow.svg" alt="spatial transcriptomics workflow" />
  <figcaption>空间转录组把组织切片、显微图像和带空间条码的表达矩阵结合起来，使表达结果可以重新投影回组织结构。</figcaption>
</figure>

## 主流平台

### spot-based 平台

最常见的是 **10x Visium**。它在玻片上预先布置空间条码 capture spot：

1. 组织切片铺在玻片上并染色成像；
2. spot 捕获附近区域释放出的 mRNA；
3. 逆转录时附加 spot barcode；
4. 输出每个 spot 的表达谱与二维坐标。

特点：

- 保留空间信息；
- 分辨率通常不是单细胞，一个 spot 可能包含多个细胞。

### 高分辨率平台

如 Slide-seq、Stereo-seq、HDST 等，试图把空间分辨率推到更细尺度，但通常伴随更稀疏的数据和更复杂的噪声结构。

## 输出数据长什么样

典型空间转录组数据包含三层：

- **表达矩阵**：gene × spot；
- **空间坐标**：每个 spot 在切片上的 `(x, y)` 位置；
- **组织图像**：H&E 或免疫染色图像。

因此分析时经常要在表达空间和图像空间之间来回切换。

## 标准分析流程

1. reads 比对与 UMI 计数；
2. 生成 gene × spot count matrix；
3. 与图像和 spot 坐标对齐；
4. 过滤低质量 spot；
5. 归一化、降维、聚类；
6. 做空间可变基因、邻域分析和去卷积。

## 空间可变基因

空间分析中的一个核心任务是找出 **spatially variable genes**：

- 这些基因不是随机分布，而是在组织上呈现分区、梯度或局部富集；
- 它们常与组织结构、病灶边缘或发育分层有关。

常见工具：SPARK、SpatialDE、Squidpy。

## 常见误区

- **有空间坐标就等于单细胞分辨率**：很多平台一个 spot 里有多细胞混合；
- **空间图上颜色深浅就是绝对表达强弱**：仍然受归一化和局部捕获效率影响；
- **空间聚类一定对应真实组织分区**：图像质量和组织处理也会影响结果。

## 参考资料

- 10x Visium 文档
- SpatialDE / SPARK / Squidpy 文档
- 空间转录组综述

## 相关页面

- [单细胞组学](../single-cell/index.md)
- [去卷积与细胞映射](./deconvolution-and-mapping.md)
- [RNA-seq 工作流](../workflows/rna-seq.md)

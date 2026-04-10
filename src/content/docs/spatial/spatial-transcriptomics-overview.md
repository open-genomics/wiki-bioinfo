---
description: 空间转录组学的技术原理、数据结构与标准分析流程
title: "空间转录组总览"
---

import RelatedLinks from '@/components/docs/RelatedLinks.astro';
import PrerequisitesBox from '@/components/docs/PrerequisitesBox.astro';

## 是什么

**空间转录组学（Spatial Transcriptomics）** 是一类在保留组织切片空间位置信息的同时，测量基因表达水平的技术。与单细胞 RNA-seq（scRNA-seq）输出 `gene × cell` 矩阵不同，空间转录组输出的是 `gene × location` 矩阵，其中 location 带有二维空间坐标。

<PrerequisitesBox
  items={[
    { title: '单细胞组学', to: '/wiki-bioinfo/single-cell/index' },
    { title: 'RNA-seq 工作流', to: '/wiki-bioinfo/workflows/rna-seq' },
    { title: '常见文件格式概览', to: '/wiki-bioinfo/formats/common-file-formats' },
  ]}
/>

<figure>
  <img src="/wiki-bioinfo/img/illustrations/spatial-workflow.svg" alt="spatial transcriptomics workflow" />
  <figcaption>空间转录组把组织切片、显微图像和带空间条码的表达矩阵结合起来，使表达结果可以重新投影回组织结构。</figcaption>
</figure>

### 核心思想

将传统 RNA-seq 的"湿实验"部分与一个预先布置了空间条码（spatial barcode）的捕获玻片结合：

1. **空间锚定**：每个捕获位置（spot）有唯一的 barcode，与物理位置绑定；
2. **原位捕获**：组织切片的 mRNA 在 spot 附近被捕获并逆转录；
3. **位置还原**：测序后将 reads 按 barcode 分组，还原回原始空间位置。

这样，每个测量单位都知道自己来自组织的哪个位置。

## 为什么重要

许多生物学问题的答案本质上是**空间性**的：

| 生物学问题 | 为什么需要空间信息 |
|-----------|------------------|
| 肿瘤微环境中免疫细胞如何浸润 | 需要知道免疫细胞与肿瘤边界的相对位置 |
| 胚胎发育中的基因表达梯度 | 需要沿胚胎轴的位置坐标 |
| 神经元之间的连接与通讯 | 需要神经元的解剖位置 |
| 感染或炎症的扩散模式 | 需要病灶中心到边缘的空间信息 |

失去空间上下文后，这些信息可能被细胞群体平均信号掩盖，或在单细胞解离过程中丢失。

## 主流技术平台

### 1. spot-based 平台（代表：10x Visium）

**原理**：在玻片上预先布置阵列式捕获 spot（典型间距 55–100 μm）。

**工作流程**：

1. 组织切片（5–10 μm）铺在玻片上；
2. H&E 或免疫荧光染色成像；
3. 组织透化使 mRNA 释放到 spot 上；
4. spot 上的引物捕获 mRNA 并逆转录，附加 spot barcode；
5. 构建文库并测序；
6. 将测序数据按 barcode 映射回空间坐标。

**关键参数**：

| 参数 | 典型值 | 含义 |
|------|--------|------|
| spot 直径 | 55 μm | 捕获区域大小 |
| spot 间距 | 100 μm | 相邻 spot 中心距离 |
| 每 spot 细胞数 | 1–10 个 | 取决于组织密度 |
| 检测灵敏度 | ~1,000–5,000 基因/spot | 低于单细胞水平 |

**特点**：平衡了空间信息与数据质量，是当前最主流的技术路线。

### 2. 高分辨率平台

| 技术 | 分辨率 | 主要特点 | 局限性 |
|------|--------|----------|--------|
| Slide-seq | 10 μm（接近单细胞） | 磁珠阵列、高通量 | 检测稀疏、需要更高测序深度 |
| Stereo-seq | 0.5–1 μm（亚细胞） | 纳米球阵列、极高分辨率 | 数据极其稀疏、分析挑战大 |
| HDST | 2 μm | 微孔阵列 | 实验复杂度较高 |
| MERFISH / seqFISH | 单分子 | 原位杂交、单细胞分辨率 | 通量受限、需预设探针 |
| Xenium | 单细胞 | 原位分析、亚细胞定位 | 基因 panel 受限 |

**分辨率与稀疏性的权衡**：分辨率越高，每个测量单位内的 mRNA 分子越少，数据越稀疏，分析难度越大。

## 数据结构

### 核心数据层

典型的空间转录组数据包含三个互相关联的层：

```
┌─────────────────┐
│   表达矩阵       │  gene × spot 的 count 矩阵
│  (gene × spot)  │
└────────┬────────┘
         │
    spot barcode
         │
┌────────▼────────┐
│   空间坐标       │  每个 spot 的 (x, y) 坐标
│   (x, y)        │  定义在切片坐标系中
└────────┬────────┘
         │
    图像对齐
         │
┌────────▼────────┐
│   组织图像       │  H&E 或免疫荧光图像
│  (H&E image)    │  用于可视化和注释
└─────────────────┘
```

### 常用文件格式

| 格式 | 用途 | 说明 |
|------|------|------|
| `spatial/` | 空间坐标 | 10x 格式，含 `tissue_positions_list.csv` |
| `filtered_feature_bc_matrix/` | 表达矩阵 | 与单细胞相同的 h5 或 mtx 格式 |
| `tissue_hires_image.png` | 高分辨率图像 | 用于可视化 |
| `scalefactors_json.json` | 对齐参数 | 图像与 spot 坐标之间的缩放比例 |

## 标准分析流程

```
原始数据
    ↓
reads 比对 → 参考基因组 / 转录组
    ↓
UMI 计数 → gene × spot 矩阵
    ↓
质控过滤 → 去除低 UMI、边缘 spot
    ↓
归一化 → 消除文库大小差异
    ↓
降维聚类 → PCA + 聚类 / 图嵌入
    ↓
空间分析 → 空间可变基因、邻域富集
    ↓
细胞注释 → 去卷积或映射单细胞标签
    ↓
生物学解释 → 结合组织图像分析
```

### 关键分析任务

1. **空间可变基因识别（SVG）**
   - 寻找表达呈现空间模式的基因
   - 常用方法：SpatialDE、SPARK、Moran's I

2. **邻域富集分析**
   - 检测特定细胞类型或基因集是否在空间上聚集
   - 例如：肿瘤-免疫边界处的基因表达变化

3. **区域注释与分割**
   - 基于表达或图像将切片分割为组织区域
   - 例如：肿瘤核心区、浸润区、正常组织区

## 复杂度与限制

### 技术限制

| 限制因素 | 影响 | 应对策略 |
|----------|------|----------|
| 分辨率不足 | 一个 spot 含多个细胞 | 去卷积分析 |
| 捕获效率不均 | 不同区域 mRNA 捕获差异 | 标准化、批次校正 |
| 切片深度 | 仅测得组织薄片（5–10 μm） | 多切片重建 3D |
| 组织透化 | mRNA 可能扩散 | 优化实验条件 |

### 与 scRNA-seq 的互补性

空间转录组通常**不能替代** scRNA-seq，而是与之互补：

- **scRNA-seq 提供**：高分辨率的细胞类型参考图谱
- **空间转录组提供**：这些细胞类型在组织中的空间排布

两者整合是空间转录组分析的标准范式。

## 常见误区

- **"有空间坐标就等于单细胞分辨率"**
  - 多数平台一个 spot 包含多个细胞，需经过去卷积才能推断细胞组成

- **"空间图上颜色深浅反映绝对表达量"**
  - 颜色深浅受归一化方法、捕获效率、显示范围影响，不能直接比较

- **"空间聚类结果一定对应真实解剖区域"**
  - 聚类受图像质量、批次效应、技术噪声影响，需要结合组织学验证

- **"空间转录组可以完全替代原位杂交"**
  - 空间转录组是高通量筛选工具，验证仍需靶向的原位技术

## 参考资料

- Ståhl et al., 2016. *Visualization and analysis of gene expression in tissue sections by spatial transcriptomics.* Science
- 10x Genomics Visium 官方文档: https://www.10xgenomics.com/products/spatial-gene-expression
- Svensson et al., 2018. *SpatialDE: identification of spatially variable genes.* Nature Methods
- Palla et al., 2022. *Squidpy: a scalable tool-kit for single-cell spatial omics analysis.* Nature Methods

<RelatedLinks
  links={[
    { title: 'spot 与单细胞', to: '/wiki-bioinfo/spatial/spot-vs-single-cell', description: '空间数据与单细胞数据的差异与互补性' },
    { title: '去卷积与细胞映射', to: '/wiki-bioinfo/spatial/deconvolution-and-mapping', description: '从混合 spot 解析细胞组成的方法' },
    { title: '单细胞组学', to: '/wiki-bioinfo/single-cell/index', description: '建立单细胞分析基础' },
    { title: 'RNA-seq 工作流', to: '/wiki-bioinfo/workflows/rna-seq', description: '转录组测序的基础流程' }
  ]}
/>

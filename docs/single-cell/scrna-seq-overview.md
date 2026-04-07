---
sidebar_position: 2
description: 单细胞 RNA-seq 的测序原理、实验流程与标准分析管道概述。
---

# scRNA-seq 总览

## 是什么

单细胞 RNA 测序（scRNA-seq）是一类能够同时对数千乃至数十万个单细胞的转录组进行测序的技术。它把每个细胞的 mRNA 分子转化为可测序的 cDNA 文库，最终输出每个细胞中每个基因的表达量矩阵（count matrix）。

<figure>
  <img src="/wiki-bioinfo/img/illustrations/scrna-seq-workflow.svg" alt="scRNA-seq 标准分析流程" />
  <figcaption>scRNA-seq 从样本解离到细胞图谱的完整分析流程：测序 → 比对定量 → 质控过滤 → 降维聚类 → 细胞类型注释。</figcaption>
</figure>

## 主要技术平台

### 液滴法（Droplet-based）

10x Genomics Chromium 是目前最主流的平台。原理是将单个细胞和含有 Barcode 的凝胶珠（GEM）一起封装到纳升级液滴中：

1. 细胞裂解后，mRNA 被捕获到凝胶珠上；
2. 凝胶珠携带唯一的细胞 **Barcode**（用于区分细胞）和随机 **UMI**（用于去除 PCR 扩增重复）；
3. 逆转录在液滴内发生；
4. 文库合并后统一测序。

优点是通量高（单次可测 5,000–20,000 细胞），缺点是每个细胞捕获的 mRNA 数量偏少（低灵敏度）。

### 平板法（Plate-based）

Smart-seq2 等方法将单个细胞分选到 96/384 孔板中，逐个建库测序。优点是覆盖度高（全长转录本），缺点是通量低，成本贵。

### 其他单细胞组学

| 技术 | 测量对象 |
|------|---------|
| scATAC-seq | 染色质可及性 |
| snRNA-seq | 细胞核 RNA（适用于冻存组织） |
| CITE-seq | RNA + 蛋白（抗体标签） |
| Spatial transcriptomics | RNA + 空间坐标 |

## 标准分析管道

### 第一步：原始数据处理（FASTQ → count matrix）

主要工具：**Cell Ranger**（10x 官方）或 **STARsolo**、**Salmon/alevin**。

流程：
1. Barcode 过滤与纠错；
2. UMI 去重；
3. 读段比对到参考基因组/转录组；
4. 生成基因 × 细胞的 count matrix（通常以 Market Exchange Format **.mtx** 存储）。

### 第二步：质量控制（QC）

对每个细胞计算三个核心指标：

| 指标 | 含义 | 异常提示 |
|------|------|---------|
| `n_genes_by_counts` | 检测到的基因数 | 过低 → 空液滴；过高 → 双联体 |
| `total_counts` | UMI 总数 | 过低 → 死细胞/低质量 |
| `pct_counts_mt` | 线粒体基因占比 | 过高 → 细胞损伤 |

典型过滤阈值（需根据实验调整）：

```python
# Scanpy 示例
import scanpy as sc

adata = sc.read_10x_mtx('filtered_feature_bc_matrix/')
sc.pp.filter_cells(adata, min_genes=200)
sc.pp.filter_genes(adata, min_cells=3)
adata = adata[adata.obs.pct_counts_mt < 20, :]
```

> **重要说明**：上述阈值（如 `min_genes=200`、`pct_counts_mt < 20`）仅为示例，实际应用中必须根据以下因素调整：
> - 测序平台和实验 protocol
> - 组织类型和细胞状态
> - 数据预处理策略
> - 样本质量特征
>
> 不存在适用于所有实验的通用阈值。

### 第三步：归一化与特征选择

**归一化**：将每个细胞的计数除以其总 UMI 数，再乘以比例因子（通常为 10,000），然后取对数：

$$\text{norm}_{ij} = \log\!\left(\frac{x_{ij}}{\sum_j x_{ij}} \times 10{,}000 + 1\right)$$

**高变基因（Highly Variable Genes, HVGs）**：只保留细胞间变异最大的 2,000–5,000 个基因，去除管家基因的干扰，同时降低噪声。

### 第四步：降维与可视化

- **PCA**：将高维 HVG 矩阵压缩到 50 个主成分；
- **邻域图（k-NN graph）**：在 PCA 空间构建细胞间的 k 近邻图；
- **UMAP / t-SNE**：将邻域图投影到二维，用于可视化。

### 第五步：聚类与细胞类型注释

在邻域图上运行 **Leiden** 或 **Louvain** 算法得到细胞群（cluster），再通过以下方式注释细胞类型：

- 已知标记基因（marker genes）的点图（dot plot）；
- 自动注释工具（如 scType、SingleR）；
- 差异表达分析找每个 cluster 的特征基因。

## 数据规模与存储

一个典型的 10x scRNA-seq 实验：

- 原始 FASTQ：50–200 GB
- Count matrix（稀疏）：每细胞 ~20,000 基因，10,000 细胞 → 约 500 MB（.h5ad 格式）

推荐数据格式：**AnnData**（`.h5ad`），被 Scanpy 和 Seurat 的 H5 格式广泛使用。

## 常见分析场景

1. **细胞类型鉴定**：区分 T 细胞亚型、神经元亚群等；
2. **轨迹推断**：追踪干细胞分化路径；
3. **批次校正**：整合来自不同实验的数据（Harmony、scVI）；
4. **配体–受体通讯**：CellChat、NicheNet；
5. **多组学整合**：CITE-seq、WNN（加权最近邻）。

## 常见误区

- **UMI 计数 ≠ 分子绝对数量**：扩增偏好和捕获效率会影响计数；
- **UMAP 距离不反映真实生物学差异**：簇内和簇间的相对位置不能直接解释；
- **不经过 Doublet 检测就做分析**：双联体会产生假的"中间态"细胞群（见 [Doublet 检测](./doublet-detection.md)）；
- **跳过批次校正**：不同批次、样本间的技术差异可能掩盖生物学信号。

## 参考资料

- Luecken & Theis, *Best practices for single-cell analysis across modalities* (Nature Reviews Genetics, 2022)
- [Scanpy 官方教程](https://scanpy.readthedocs.io/)
- [Seurat 官方教程](https://satijalab.org/seurat/)
- 10x Genomics Cell Ranger 文档

## 相关页面

- [细胞 Barcode 与 UMI](./cell-barcode-umi.md)
- [聚类与 UMAP 降维](./clustering-and-umap.md)
- [轨迹推断](./trajectory-analysis.md)
- [差异表达分析](../transcriptomics/differential-expression.mdx)

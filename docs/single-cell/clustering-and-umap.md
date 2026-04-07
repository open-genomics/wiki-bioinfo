---
sidebar_position: 4
description: 主成分分析、Leiden/Louvain 图聚类与 UMAP 降维可视化的原理与实践。
---

# 聚类与 UMAP 降维

## 核心问题

scRNA-seq 数据是高维的：每个细胞是 ~20,000 维基因表达空间中的一个点。直接分析这个高维空间存在两个问题：

1. **维度灾难**：高维空间中距离度量失效，相似与不相似变得难以区分；
2. **稀疏噪声**：dropout 导致大量随机零值，噪声主导了原始计数空间。

解决方案是：**PCA 降维 → 构建邻域图 → 图聚类 → UMAP 可视化**。

## 第一步：PCA

对归一化后的 HVG 矩阵做**主成分分析（PCA）**，保留前 50 个主成分（PC）：

$$\mathbf{Z} = \mathbf{X}_{\text{HVG}} \cdot \mathbf{V}_{50}$$

PCA 捕获了基因间共变关系，每个 PC 代表一个生物学或技术变异轴（细胞周期、细胞类型等）。

**如何选择 PC 数量？** 通过 Elbow plot（碎石图）判断——方差贡献明显下降的拐点之前保留即可，通常 15–50 个 PC 是合理范围。

<figure>
  <img src="/wiki-bioinfo/img/illustrations/scrna-umap.svg" alt="scRNA-seq UMAP 聚类示意图" />
  <figcaption>UMAP 将高维 PCA 空间投影到二维平面。不同颜色代表不同细胞类型的 cluster，相邻 cluster 在生物学上更为接近。</figcaption>
</figure>

## 第二步：构建 k-NN 图

在 PCA 空间中，为每个细胞找 **k 个最近邻**（k-Nearest Neighbors），构建一个**细胞间邻域图**：

- 节点 = 细胞；
- 边 = 两细胞在 PCA 空间中相似（距离小于阈值）；
- 边权重 = 相似度（基于高斯核或 Jaccard 相似度）。

典型参数：`n_neighbors = 15`（Scanpy 默认）。

```python
sc.pp.neighbors(adata, n_neighbors=15, n_pcs=40)
```

**为什么用图而不是直接用距离矩阵？** 因为图结构允许后续用高效的图算法（Leiden、UMAP）做聚类和布局，而完整距离矩阵在大规模数据（>10 万细胞）上计算代价过高。

## 第三步：Leiden/Louvain 图聚类

在邻域图上运行**社区检测算法**，把联系紧密的细胞分配到同一个 cluster：

### Louvain 算法（2008）

优化**模块度（Modularity）**：

$$Q = \frac{1}{2m} \sum_{ij} \left[A_{ij} - \frac{k_i k_j}{2m}\right] \delta(c_i, c_j)$$

其中 $A_{ij}$ 是邻接矩阵，$k_i$ 是节点度，$c_i$ 是社区标签，$m$ 是总边数。

### Leiden 算法（2019，推荐）

Leiden 修复了 Louvain 可能产生内部连接不良的社区的问题，通过"细化"步骤保证每个社区内部的连通性。

**分辨率参数（resolution）**：

- 值越大 → cluster 越多、越细；
- 值越小 → cluster 越少、越粗。

```python
sc.tl.leiden(adata, resolution=0.5)
# 0.5 → 约 10-20 个 cluster（取决于数据）
# 1.0 → 更多、更细的 cluster
```

## 第四步：UMAP 降维可视化

**UMAP（Uniform Manifold Approximation and Projection）** 把高维邻域图投影到二维或三维空间，同时尽量保留：

- **局部结构**：相邻细胞在低维中依然相邻；
- **全局结构**（比 t-SNE 更好）：不同 cluster 之间的相对位置有一定意义。

### 数学直觉

UMAP 在高维空间和低维空间分别构建模糊拓扑图，然后最小化两者之间的**交叉熵**：

$$\mathcal{L} = \sum_{(i,j) \in \text{edges}} \left[ w_{ij} \log\frac{w_{ij}}{v_{ij}} + (1-w_{ij}) \log\frac{1-w_{ij}}{1-v_{ij}} \right]$$

其中 $w_{ij}$ 是高维图中的边权重，$v_{ij}$ 是低维嵌入中的边权重。

```python
sc.tl.umap(adata)
sc.pl.umap(adata, color=['leiden', 'n_genes_by_counts', 'CD3E'])
```

## UMAP 的正确解读

| 可以说 | 不能说 |
|--------|--------|
| cluster A 和 B 在 UMAP 上靠近 → 转录组相似 | cluster 间的具体距离反映精确的生物学差异 |
| 某个基因在 cluster C 中高表达 | UMAP 轴有明确的生物学含义 |
| UMAP 显示出明显的亚群分离 | 所有 UMAP 参数下结果都一样 |

**UMAP 是可视化工具，不是聚类的依据。** 聚类结果来自 Leiden 算法，UMAP 只是展示工具。

## 细胞类型注释

聚类完成后，需要将 cluster 对应到已知细胞类型：

### 方法1：标记基因（Marker Genes）

```python
sc.tl.rank_genes_groups(adata, 'leiden', method='wilcoxon')
sc.pl.rank_genes_groups_dotplot(adata, n_genes=5)
```

对照已知标记基因（如 T 细胞：CD3E/CD4/CD8A，B 细胞：CD19/MS4A1）。

### 方法2：自动注释（SingleR）

```r
library(SingleR)
ref <- celldex::HumanPrimaryCellAtlasData()
pred <- SingleR(test = sce, ref = ref, labels = ref$label.main)
```

### 方法3：基于参考图谱迁移

scArches、Symphony 等工具可以将新数据映射到已有的细胞图谱（如 Human Cell Atlas）。

## 批次效应与整合

来自不同实验批次、平台或样本的数据往往表现出技术差异，而非生物学差异。常用整合方法：

| 方法 | 策略 | 优点 |
|------|------|------|
| Harmony | 对 PCA 嵌入做迭代校正 | 快速，适合大数据集 |
| scVI | 变分自编码器，建模计数分布 | 强大，但需 GPU |
| Seurat CCA | 典型相关分析 | Seurat 生态友好 |
| BBKNN | 批次均衡 k-NN 图 | 简单有效 |

```python
import harmonypy
ho = harmonypy.run_harmony(adata.obsm['X_pca'], adata.obs, 'batch')
adata.obsm['X_pca_harmony'] = ho.Z_corr.T
sc.pp.neighbors(adata, use_rep='X_pca_harmony')
```

## 常见误区

- **cluster 数量越多越好**：过度聚类会把同一细胞类型拆成多个 cluster；
- **UMAP 上分开的就一定是不同细胞类型**：技术因素（线粒体比例、细胞周期）也会造成分离；
- **不做回归就去除混杂因素**：细胞周期效应可能主导 PC，需要在 PCA 前回归掉；
- **不同参数的 UMAP 直接比较**：`min_dist`、`spread` 等超参数会剧烈改变视觉效果。

## 参考资料

- McInnes et al., *UMAP: Uniform Manifold Approximation and Projection* (2018)
- Traag et al., *From Louvain to Leiden* (Scientific Reports, 2019)
- Luecken & Theis, *Best practices for single-cell analysis* (Nature Reviews Genetics, 2022)

## 相关页面

- [scRNA-seq 总览](./scrna-seq-overview.md)
- [轨迹推断](./trajectory-analysis.md)
- [层次聚类](../phylogeny/hierarchical-clustering.md)
- [k-means 在生物信息学中的应用](../phylogeny/k-means-bioinformatics.md)

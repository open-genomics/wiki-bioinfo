---
description: 单细胞数据降维与聚类的算法原理：PCA 线性降维、Leiden/Louvain 图社区检测、UMAP 非线性可视化，以及细胞类型注释策略。
title: "聚类与 UMAP 降维"
---


## 核心问题

### 高维数据分析的挑战

单细胞 RNA 测序数据将每个细胞表示为基因表达空间中的一个点。典型的人类 scRNA-seq 数据涉及约 20,000 个蛋白质编码基因，即每个细胞是一个约 20,000 维空间中的向量：

$$\mathbf{x}_i = (x_{i1}, x_{i2}, \ldots, x_{iG})^T \in \mathbb{R}_{\geq 0}^{G}, \quad G \approx 20{,}000$$

直接在这种高维空间中分析存在根本性困难：

1. **维度灾难（Curse of Dimensionality）**：
   - 高维空间中，欧氏距离的差异性减弱，任意两点距离趋于相近
   - 数据点稀疏分布，密度估计和距离度量变得不可靠
   - 可视化与直观理解几乎不可能

2. **噪声与稀疏性**：
   - dropout 现象导致表达矩阵中超过 90% 的元素为零
   - 随机技术性零值与真实的生物学不表达混杂
   - 信噪比低，直接距离计算受噪声主导

### 解决策略：降维-聚类-可视化管道

标准分析流程采用分层降维策略：

$$
\text{高维计数空间} \xrightarrow{\text{PCA}} \text{线性低维嵌入} \xrightarrow{k\text{-NN}} \text{邻域图} \xrightarrow{\text{Leiden}} \text{细胞聚类} \xrightarrow{\text{UMAP}} \text{二维可视化}$$

本页面依次介绍各步骤的算法原理、数学基础和参数选择策略。

## 第一步：主成分分析（PCA）

### 算法原理

主成分分析（Principal Component Analysis, PCA）是一种线性降维方法，通过正交变换将高维数据投影到低维子空间，同时保留最大方差：

$$\mathbf{Z} = \mathbf{X}_{\text{HVG}} \cdot \mathbf{V}_{k}$$

其中：
- $\mathbf{X}_{\text{HVG}} \in \mathbb{R}^{N \times H}$：归一化后的高变基因（HVG）表达矩阵（$N$ 细胞 × $H$ 基因，通常 $H = 2{,}000$）
- $\mathbf{V}_{k} \in \mathbb{R}^{H \times k}$：前 $k$ 个主成分方向（载荷矩阵）
- $\mathbf{Z} \in \mathbb{R}^{N \times k}$：降维后的细胞嵌入（得分矩阵）

**数学基础**：PCA 求解协方差矩阵的特征值分解：
$$\mathbf{C} = \frac{1}{N-1}\mathbf{X}^T\mathbf{X} = \mathbf{V}\mathbf{\Lambda}\mathbf{V}^T$$

特征值 $\lambda_i$ 表示第 $i$ 个主成分解释的方差量，特征向量 $\mathbf{v}_i$ 表示对应的基因权重组合。

### 生物学解释

每个主成分代表一种变异模式：
- **细胞类型差异**：通常在前几个 PC 中捕获
- **细胞周期阶段**：细胞分裂相关基因的贡献
- **技术批次效应**：实验条件引入的系统偏差
- **线粒体/应激反应**：细胞状态相关基因

### 主成分数目的选择

选择保留的 PC 数量 $k$ 是关键的参数决策：

**碎石图（Elbow Plot）法**：
- 绘制累计方差贡献随 PC 数的变化曲线
- 选择曲线斜率明显变缓的"肘部"位置
- 典型范围：$k = 15$–$50$（取决于数据复杂度）

**实践经验**：
- $k$ 过小：丢失细胞亚群区分信息
- $k$ 过大：引入噪声和批次效应，计算负担增加
- 标准实践：从 30–50 开始，根据聚类质量调整

<figure>
  <img src="/wiki-bioinfo/img/illustrations/scrna-umap.svg" alt="scRNA-seq UMAP 聚类示意图" />
  <figcaption>UMAP 将高维 PCA 空间投影到二维平面。不同颜色代表不同细胞类型的 cluster，相邻 cluster 在生物学上更为接近。</figcaption>
</figure>

## 第二步：构建 k-NN 邻域图

### 图结构的优势

在 PCA 降维后的空间中，直接计算所有细胞对的距离矩阵需要 $O(N^2)$ 时间和空间，对于 $N > 10^5$ 的大规模数据集不可行。k-NN 图通过仅保留每个细胞的 $k$ 个最近邻，将复杂度降至 $O(kN)$。

### 图构建过程

**节点**：每个细胞表示为一个节点，携带其在 PCA 空间的坐标 $\mathbf{z}_i \in \mathbb{R}^k$。

**边**：对每对细胞 $(i, j)$，计算欧氏距离：
$$d_{ij} = \|\mathbf{z}_i - \mathbf{z}_j\|_2$$

对每个细胞 $i$，找出距离最近的 $k$ 个邻居，建立有向边 $i \rightarrow j$。

**边权重转换**：
原始距离转换为相似度权重，常用方法：
- **高斯核**：$w_{ij} = \exp(-d_{ij}^2 / \sigma_i^2)$，其中 $\sigma_i$ 基于局部密度自适应确定
- **Jaccard 相似度**：两细胞邻居集合的重叠程度

### 参数选择

**邻居数 $k$**：
- $k$ 过小（如 $k < 5$）：图过于稀疏，丢失连接信息
- $k$ 过大（如 $k > 50$）：引入噪声连接，模糊细胞边界
- 典型值：$k = 10$–$20$（Scanpy 默认 $k = 15$）

```python
sc.pp.neighbors(adata, n_neighbors=15, n_pcs=40)
```

**使用的 PC 数**：指定 `n_pcs` 控制 PCA 子空间的维度，通常与之前选择的 $k$ 一致。

## 第三步：图社区检测聚类

### 问题定义

给定细胞邻域图 $G = (V, E)$，目标是识别**社区结构**（community structure）：将节点划分为若干组，使得组内连接密集、组间连接稀疏。这与单细胞数据中"转录相似的细胞属于同一类型"的生物学假设一致。

### Louvain 算法（2008）

**优化目标：模块度最大化**

模块度（Modularity）度量社区划分的质量：

$$Q = \frac{1}{2m} \sum_{ij} \left[A_{ij} - \frac{k_i k_j}{2m}\right] \delta(c_i, c_j)$$

其中：
- $A_{ij}$：邻接矩阵元素（节点 $i$ 和 $j$ 之间的边权重）
- $k_i = \sum_j A_{ij}$：节点 $i$ 的加权度
- $m = \frac{1}{2}\sum_i k_i$：图中所有边权重之和
- $c_i$：节点 $i$ 的社区标签
- $\delta(c_i, c_j)$：指示函数（当 $c_i = c_j$ 时为 1，否则为 0）

**算法流程**：
1. **初始化**：每个节点自成一社区
2. **局部移动**：对每个节点，尝试移动到邻居社区，选择使模块度增益最大的移动
3. **社区凝聚**：将每个社区收缩为单个"超级节点"，构建粗粒化图
4. **迭代**：重复步骤 2–3 直至模块度不再提升

### Leiden 算法（2019）

Louvain 的一个缺陷是可能产生**不连通的社区**（社区内部节点不互相连通）。Leiden 算法通过引入"细化"（refinement）步骤修正：

1. **局部移动阶段**：与 Louvain 类似，基于模块度增益移动节点
2. **细化阶段**：在每个候选社区内部，仅保留连通子集
3. **凝聚阶段**：将细化后的社区凝聚为超级节点

**推荐在单细胞分析中使用 Leiden**，因其产生生物学上更合理的连通聚类。

### 分辨率参数

标准模块度优化倾向于发现特定大小的社区。通过引入分辨率参数 $\gamma$ 控制社区粒度：

$$Q_\gamma = \frac{1}{2m} \sum_{ij} \left[A_{ij} - \gamma \frac{k_i k_j}{2m}\right] \delta(c_i, c_j)$$

- $\gamma < 1$：更大、更粗的 cluster
- $\gamma = 1$：默认模块度优化
- $\gamma > 1$：更多、更细的 cluster

```python
sc.tl.leiden(adata, resolution=0.5)  # 较粗的聚类
sc.tl.leiden(adata, resolution=1.0)  # 标准粒度
sc.tl.leiden(adata, resolution=2.0)  # 较细的聚类
```

**参数选择建议**：
- 初始探索：从 0.5–1.0 开始
- 亚群分析：提高到 1.5–2.0
- 结合标记基因表达评估聚类质量

## 第四步：UMAP 非线性降维可视化

### UMAP 的核心思想

UMAP（Uniform Manifold Approximation and Projection）是一种非线性降维技术，基于**流形学习**（manifold learning）和**拓扑数据分析**（topological data analysis）：

**假设**：高维数据实际上分布于一个低维流形（manifold）上，UMAP 旨在学习该流形的拓扑结构并将其投影到可视化的 2D/3D 空间。

### 算法原理

**步骤 1：高维模糊拓扑图构建**
- 在 PCA 空间中，对每个细胞 $i$，计算到邻居 $j$ 的局部距离
- 基于局部密度自适应地确定连接概率：
  $$w_{ij} = \exp\left(-\frac{d_{ij} - \rho_i}{\sigma_i}\right)$$
  其中 $\rho_i$ 是到最近邻居的距离，$\sigma_i$ 基于局部密度自适应选择

**步骤 2：低维布局优化**
- 在低维空间（2D/3D）初始化细胞位置
- 通过力导向布局模拟吸引-排斥动力学
- 优化目标：最小化高维与低维拓扑之间的交叉熵

**数学形式**：

$$\mathcal{L} = \sum_{(i,j) \in \text{edges}} \left[ w_{ij} \log\frac{w_{ij}}{v_{ij}} + (1-w_{ij}) \log\frac{1-w_{ij}}{1-v_{ij}} \right]$$

其中 $w_{ij}$ 是高维连接概率，$v_{ij}$ 是低维连接概率（基于距离通过 t 分布计算）。

### 参数选择

```python
sc.tl.umap(adata, min_dist=0.5, spread=1.0, n_components=2)
```

关键参数：
- **min_dist**：控制嵌入点的最小间距（越小点越聚集）
- **spread**：控制整体嵌入的分散程度
- **n_components**：输出维度（通常 2 用于可视化，也可 3）

**注意**：UMAP 结果对参数敏感，不同参数可能产生视觉上不同的布局，但应保持相对拓扑关系。

## UMAP 的正确解读与限制

### 解读准则

| 可以得出的结论 | 不应得出的结论 |
|---------------|---------------|
| Cluster A 和 B 在 UMAP 上靠近 → 转录组相似 | Cluster 间的具体距离精确反映生物学差异 |
| 某个基因在 cluster C 中高表达 | UMAP 的 x/y 轴具有特定生物学含义 |
| UMAP 显示出明显的亚群分离 | 所有 UMAP 参数设置下结果一致 |
| 两个 cluster 被清晰分开 | 被分开的 cluster 不能有任何相似细胞 |

### 关键认知

**UMAP 是可视化工具，不是聚类依据**
- 正式的细胞分组应基于 Leiden/Louvain 图聚类
- UMAP 仅用于可视化展示聚类结果
- 聚类算法直接在图结构上运行，不依赖 UMAP 坐标

**参数敏感性**
- `min_dist`、`spread`、`n_neighbors` 等参数显著影响视觉效果
- 不同参数可能导致视觉上不同的布局
- 重要的是相对拓扑关系（哪些 cluster 相邻），而非绝对坐标

**密度解释**
- UMAP 可能压缩或扩展局部密度
- cluster 的大小不反映细胞数量
- cluster 的紧密程度不完全反映转录组相似度

## 细胞类型注释策略

聚类算法将细胞分组为转录相似的 cluster，但 cluster 标签本身（如 0, 1, 2...）无生物学意义。**细胞类型注释**是将 cluster 映射到已知细胞类型的过程。

### 方法1：基于标记基因的人工注释

**原理**：每种细胞类型表达特定的标记基因组合，可作为分子指纹。

**常用标记基因示例**：
| 细胞类型 | 阳性标记基因 | 阴性标记基因 |
|---------|-------------|-------------|
| T 细胞 | CD3D, CD3E, CD4/CD8A | CD19, MS4A1 |
| B 细胞 | CD19, MS4A1, CD79A | CD3E |
| 单核/巨噬 | CD14, CD68, CSF1R | CD3E, CD19 |
| NK 细胞 | NKG7, KLRD1, GNLY | CD3E |
| 浆细胞 | CD38, CD138 (SDC1), XBP1 | CD19 |

**实践步骤**：
```python
# 1. 计算差异表达基因
sc.tl.rank_genes_groups(adata, 'leiden', method='wilcoxon')

# 2. 可视化 top 标记基因
sc.pl.rank_genes_groups_dotplot(adata, n_genes=5)

# 3. 结合领域知识人工标注
adata.obs['cell_type'] = adata.obs['leiden'].map({
    '0': 'CD4 T cell',
    '1': 'CD8 T cell',
    '2': 'B cell',
    # ...
})
```

### 方法2：自动注释工具

**SingleR**：基于参考数据集的最近邻分类
```r
library(SingleR)
ref <- celldex::HumanPrimaryCellAtlasData()
pred <- SingleR(test = sce, ref = ref, labels = ref$label.main)
```

**优点**：
- 快速、标准化
- 适合初步探索

**局限**：
- 依赖参考数据质量
- 可能无法识别 novel 细胞类型

### 方法3：参考图谱映射

对于大规模数据整合或发现稀有细胞类型，可将新数据映射到已建立的细胞图谱（如 Human Cell Atlas）：

- **scArches**：基于深度学习的参考映射
- **Symphony**：基于 k-NN 的快速映射
- **Azimuth**：Seurat 团队的在线注释工具

**优势**：利用大规模参考数据的丰富信息，提高注释准确性。

## 批次效应校正与数据整合

### 批次效应的来源

当整合来自不同实验条件的数据时，技术因素可能掩盖生物学信号：

**批次间差异来源**：
- 不同实验日期或操作者
- 不同测序平台或试剂批次
- 不同处理条件（如 fresh vs. frozen 样本）
- 不同捕获技术（10x Genomics vs. Drop-seq）

**表现**：相同细胞类型在不同批次中形成分离的 cluster，而非基于类型聚集。

### 整合策略对比

| 方法 | 核心策略 | 适用场景 | 计算需求 |
|------|---------|---------|---------|
| **Harmony** | 迭代软聚类校正 PCA 嵌入 | 大规模数据集 | 低（CPU 即可） |
| **scVI/scANVI** | 变分自编码器，建模计数生成过程 | 复杂批次结构，多组学 | 高（需 GPU） |
| **Seurat CCA** | 典型相关分析找共享相关结构 | Seurat 用户 | 中等 |
| **BBKNN** | 批次均衡的 k-NN 图构建 | 快速整合 | 低 |
| **Scanorama** | 基于 MNN（mutual nearest neighbors）的校正 | Python 生态 | 中等 |

### Harmony 算法示例

Harmony 是目前应用最广泛的批次校正方法之一：

```python
import harmonypy

# 在 PCA 空间运行 Harmony
ho = harmonypy.run_harmony(
    adata.obsm['X_pca'], 
    adata.obs, 
    'batch',           # 批次标签列
    max_iter_harmony=10
)

# 保存校正后的嵌入
adata.obsm['X_pca_harmony'] = ho.Z_corr.T

# 基于校正后的 PCA 重建邻域图
sc.pp.neighbors(adata, use_rep='X_pca_harmony')
sc.tl.leiden(adata)
sc.tl.umap(adata)
```

### 校正效果评估

有效的批次校正应满足：
1. **批次间混合**：相同细胞类型跨批次聚集
2. **生物学保留**：不同细胞类型仍保持分离
3. **无过度校正**：不强行合并应分离的生物学群体

**评估方法**：
- 可视化检查（UMAP 按批次和按细胞类型着色）
- k-NN 批次效应检验（kBET）
- 批次校正后 ANOVA 分析

## 常见误区与最佳实践

### 误区一：追求更多的 cluster 数量

**问题**：过度增加分辨率参数会产生过多的细粒度 cluster，将同一细胞类型拆分为多个亚群。

**后果**：
- 虚假亚群可能被误认为新发现
- 下游差异表达分析统计效力降低（样本量减少）
- 生物学解释复杂化

**建议**：
- 从较低分辨率开始（0.5–1.0）
- 结合标记基因表达判断 cluster 的生物学合理性
- 亚群分析可分层进行（先大群，再在各群内提高分辨率）

### 误区二：UMAP 上的分离等同于生物学差异

**问题**：UMAP 上的 cluster 分离可能由非生物学因素导致。

**常见混淆因素**：
- **细胞周期阶段**：增殖期与静息期细胞分离
- **线粒体含量**：高线粒体比例（应激或损伤细胞）形成独立群组
- **核糖体基因表达**：代谢活跃的细胞聚集
- **技术批次**：不同批次分离

**建议**：
- 检查已知混杂因素的分布
- 考虑回归或校正细胞周期等效应
- 不依赖 UMAP 距离做定量比较

### 误区三：混淆聚类与可视化的作用

**澄清**：
- **聚类**（Leiden/Louvain）是正式的分组依据，定义 cell type/cluster
- **UMAP** 仅是可视化工具，用于展示聚类结果
- 改变 UMAP 参数不应改变聚类结果

### 误区四：批次校正后不做验证

**风险**：
- 校正不足：批次效应仍主导差异
- 过度校正：抹消真实的生物学差异

**验证步骤**：
1. 检查标记基因在校正后是否仍保持差异表达
2. 确认已知细胞类型跨批次正确对齐
3. 评估新发现的"亚群"是否仅由批次驱动

## 参考资料

- McInnes et al., *UMAP: Uniform Manifold Approximation and Projection* (2018)
- Traag et al., *From Louvain to Leiden* (Scientific Reports, 2019)
- Luecken & Theis, *Best practices for single-cell analysis* (Nature Reviews Genetics, 2022)

## 相关页面

- [scRNA-seq 总览](./scrna-seq-overview.md)
- [轨迹推断](./trajectory-analysis.md)
- [层次聚类](../phylogeny/hierarchical-clustering.md)
- [k-means 在生物信息学中的应用](../phylogeny/k-means-bioinformatics.md)

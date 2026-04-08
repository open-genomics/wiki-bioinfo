---
description: 单细胞 RNA 测序（scRNA-seq）的技术原理、主流平台（10x Genomics、Smart-seq2）对比，以及从原始数据到细胞图谱的完整分析流程。
title: "scRNA-seq 总览"
---


## scRNA-seq 的定义与原理

### 技术定义

单细胞 RNA 测序（single-cell RNA sequencing, scRNA-seq）是指对单个细胞的全部转录本进行测序的技术。与 bulk RNA-seq 测量细胞群体的平均表达不同，scRNA-seq 为每个细胞独立构建测序文库，实现细胞分辨率的转录组分析。

### 核心技术步骤

**分子生物学流程**：

$$
\text{单细胞} \xrightarrow{\text{裂解}} \text{mRNA} \xrightarrow{\text{逆转录}} \text{cDNA} \xrightarrow{\text{扩增}} \text{文库} \xrightarrow{\text{测序}} \text{Reads}$$

1. **单细胞分离**：通过微流控（液滴法）或流式分选（平板法）获得单细胞
2. **细胞裂解与 mRNA 捕获**：裂解细胞，捕获 poly-A 尾 mRNA
3. **逆转录**：以寡聚 dT 引物合成 cDNA 第一链
4. **分子标记引入**：添加细胞 Barcode 和 UMI（Unique Molecular Identifier）
5. **PCR 扩增**：扩增 cDNA 至足够测序的量
6. **文库构建与测序**：构建标准测序文库，上机测序

### 最终输出

每个细胞的基因表达量矩阵：

$$\mathbf{X} = \{x_{ij}\} \in \mathbb{Z}_{\geq 0}^{G \times N}$$

其中 $x_{ij}$ 表示基因 $i$ 在细胞 $j$ 中的 UMI 计数。

<figure>
  <img src="/wiki-bioinfo/img/illustrations/scrna-seq-workflow.svg" alt="scRNA-seq 标准分析流程" />
  <figcaption>scRNA-seq 从样本解离到细胞图谱的完整分析流程：测序 → 比对定量 → 质控过滤 → 降维聚类 → 细胞类型注释。</figcaption>
</figure>

## 主要技术平台对比

### 液滴法（Droplet-based）

**代表平台**：10x Genomics Chromium、Drop-seq、inDrop

**技术原理**：
1. 微流控技术将单个细胞与带 Barcode 的凝胶珠（GEM）封装到纳升级液滴
2. 细胞裂解后，mRNA 与凝胶珠上的引物杂交
3. 每个凝胶珠携带唯一的细胞 Barcode 和随机 UMI
4. 液滴内完成逆转录，文库合并后测序

**特点**：
| 特性 | 表现 |
|------|------|
| 通量 | 高（5,000–20,000 细胞/样本） |
| 灵敏度 | 中低（捕获 5–20% mRNA） |
| 转录本覆盖 | 3' 或 5' 端偏好 |
| 成本 | 中等（试剂+测序） |
| 适用场景 | 大规模细胞图谱构建 |

### 平板法（Plate-based）

**代表平台**：Smart-seq2、Smart-seq3、PEAR

**技术原理**：
1. 流式分选或显微操作将单个细胞分选到 96/384 孔板
2. 每个孔独立进行裂解、逆转录和扩增
3. 文库构建后合并测序

**特点**：
| 特性 | 表现 |
|------|------|
| 通量 | 低（96–384 细胞/板） |
| 灵敏度 | 高（捕获 >50% mRNA） |
| 转录本覆盖 | 全长覆盖 |
| 成本 | 高（人工+试剂） |
| 适用场景 | 稀有细胞、低丰度转录本研究 |

### 平台选择决策

| 研究目标 | 推荐平台 | 理由 |
|---------|---------|------|
| 细胞类型图谱构建 | 10x Genomics | 高通量、成本可控 |
| 可变剪接分析 | Smart-seq2 | 全长覆盖 |
| 低丰度基因检测 | Smart-seq2 | 高灵敏度 |
| 冻存组织样本 | snRNA-seq | 细胞核 RNA 稳定 |
| 表面蛋白共检测 | CITE-seq | RNA + 蛋白联合 |
| 空间位置信息 | Visium/Slide-seq | 保留空间坐标 |

### 相关单细胞技术

| 技术 | 测量对象 | 应用场景 |
|------|---------|---------|
| **scATAC-seq** | 染色质可及性 | 顺式调控元件识别 |
| **snRNA-seq** | 细胞核 RNA | 冻存样本、大细胞 |
| **CITE-seq** | RNA + 表面蛋白 | 免疫分型、受体表达 |
| **scMultiome** | RNA + ATAC | 调控-表达联合分析 |
| **Spatial transcriptomics** | RNA + 空间坐标 | 组织结构、微环境 |

## 标准分析管道

### 第一阶段：原始数据处理（FASTQ → Count Matrix）

**目标**：将原始测序数据转换为基因 × 细胞的表达矩阵。

**主要工具**：
| 工具 | 特点 | 适用场景 |
|-----|------|---------|
| **Cell Ranger** | 10x 官方，全流程整合 | 10x Genomics 数据 |
| **STARsolo** | 快速，内存效率高 | 大规模数据集 |
| **alevin** | 基于轻量比对 | 快速定量 |

**处理流程**：

$$
\text{FASTQ} \xrightarrow{\text{Barcode 纠错}} \text{Clean Barcodes} \xrightarrow{\text{比对}} \text{Aligned Reads} \xrightarrow{\text{UMI 去重}} \text{Count Matrix}$$

1. **Barcode 过滤与纠错**：使用白名单纠正测序错误，过滤低质量 Barcode
2. **UMI 去重**：识别 PCR 重复，统计唯一的 UMI 数量
3. **读段比对**：将 cDNA 序列比对到参考基因组/转录组
4. **生成表达矩阵**：输出基因 × 细胞的 UMI 计数矩阵（MEX 或 HDF5 格式）

### 第二阶段：质量控制（QC）

**目标**：识别并过滤低质量细胞和虚假细胞（空液滴、doublet）。

**核心质控指标**：

| 指标 | 计算方法 | 生物学意义 | 典型异常值 |
|------|---------|-----------|-----------|
| `n_genes_by_counts` | 检测到表达的非零基因数 | 转录组复杂度 | < 200（低质量/空液滴）；过高（doublet） |
| `total_counts` | 总 UMI 数 | 测序深度/细胞大小 | < 500（死细胞/空液滴） |
| `pct_counts_mt` | 线粒体基因 UMI 占比 | 细胞损伤程度 | > 10–20%（细胞膜破裂，胞质 RNA 流失） |
| `n_counts_per_gene` | 各基因平均 UMI | 表达均匀性 | 用于基因过滤 |

**QC 实施示例**（Scanpy）：

```python
import scanpy as sc

# 读取数据
adata = sc.read_10x_mtx('filtered_feature_bc_matrix/')

# 计算质控指标
adata.var['mt'] = adata.var_names.str.startswith('MT-')  # 标记线粒体基因
sc.pp.calculate_qc_metrics(adata, qc_vars=['mt'], percent_top=None, log1p=False, inplace=True)

# 过滤低质量细胞
sc.pp.filter_cells(adata, min_genes=200)      # 至少检测 200 个基因
sc.pp.filter_genes(adata, min_cells=3)      # 基因至少在 3 个细胞中表达
adata = adata[adata.obs.pct_counts_mt < 20, :]  # 线粒体比例 < 20%
```

**重要提示**：上述阈值仅为示例，实际应用需考虑：
- 组织类型（脑组织细胞通常基因数较少）
- 测序深度（低深度数据阈值应放宽）
- 细胞状态（增殖期细胞代谢活跃，线粒体比例可能偏高）
- 无通用阈值，需结合数据分布判断

### 第三阶段：归一化与特征选择

**归一化目的**：消除细胞间测序深度和细胞大小的技术差异，使表达量具有可比性。

**CPM + Log 转换**（最常用）：

$$\tilde{x}_{ij} = \log\left(\frac{x_{ij}}{\sum_{g} x_{gj}} \times 10{,}000 + 1\right)$$

其中：
- $x_{ij}$：基因 $i$ 在细胞 $j$ 的原始 UMI 计数
- $\sum_g x_{gj}$：细胞 $j$ 的总 UMI 数
- $10{,}000$：比例因子（per million factor）
- $+1$：伪计数，避免 $\log(0)$

**更高级的归一化方法**：
- **scTransform**（Seurat）：基于 Pearson 残差，建模技术噪声
- **scran**：基于细胞池的 size factor 估计，适合不同细胞类型混合的情况

**高变基因选择（HVGs）**：

**原理**：仅保留细胞间变异最大的基因（通常 2,000 个），去除以下干扰：
- **管家基因**：在所有细胞中恒定表达，无区分信息
- **低表达基因**：技术噪声主导，信噪比低
- **批次特异性基因**：技术变异而非生物学信号

**计算方法**：
1. 对每个基因拟合均值-方差关系
2. 识别方差显著高于预期的基因
3. 保留 top 2,000 高变基因用于后续降维

### 第四阶段：降维与可视化

**降维策略**：

$$
\text{高维 HVG 矩阵} \xrightarrow{\text{PCA}} \text{50 PC} \xrightarrow{k\text{-NN}} \text{邻域图} \xrightarrow{\text{UMAP}} \text{2D 可视化}$$

1. **PCA 降维**：
   - 输入：$N \times 2{,}000$ HVG 表达矩阵
   - 输出：$N \times 50$ 主成分得分
   - 目的：压缩维度，去除噪声，保留主要变异轴

2. **k-NN 图构建**：
   - 在 PCA 空间计算细胞间欧氏距离
   - 每个细胞连接 $k$（通常 15）个最近邻
   - 形成稀疏图结构，便于高效聚类

3. **UMAP 可视化**：
   - 将高维邻域图投影到二维空间
   - 保留局部结构的同时拉开不同 cluster
   - 用于直观展示细胞类型分布

### 第五阶段：聚类与细胞类型注释

**图聚类**：

在 k-NN 图上运行 **Leiden**（推荐）或 **Louvain** 社区检测算法：
- 优化目标：模块度最大化（组内连接密集，组间连接稀疏）
- 分辨率参数：控制 cluster 粒度（高分辨率 → 更多、更细的 cluster）

**细胞类型注释流程**：

1. **差异表达分析**：鉴定每个 cluster 的标记基因
2. **文献比对**：对照已知细胞类型的 marker genes
3. **自动注释**：SingleR、scType 等工具参考数据库匹配
4. **人工审核**：结合生物学知识确认或修正注释

**示例标记基因**：
- T 细胞：CD3D/CD3E、CD4/CD8A
- B 细胞：CD19、MS4A1、CD79A
- 单核细胞：CD14、LYZ、S100A8
- NK 细胞：NKG7、KLRD1、GNLY

## 数据规模与存储格式

### 典型实验数据量

以 10x Genomics 标准实验为例（~10,000 细胞）：

| 数据类型 | 大小 | 说明 |
|---------|------|------|
| 原始 FASTQ | 50–200 GB | 双端测序，取决于测序深度 |
| 比对 BAM | 100–300 GB | 包含比对信息 |
| Count Matrix（稀疏） | ~500 MB | 10,000 细胞 × 20,000 基因 |
| 分析结果（AnnData） | 1–2 GB | 包含降维、聚类、注释结果 |

### 推荐数据格式

| 格式 | 适用场景 | 特点 |
|-----|---------|------|
| **AnnData (.h5ad)** | Python/Scanpy 分析 | 整合矩阵、注释、降维结果的标准格式 |
| **Seurat Object (.rds)** | R/Seurat 分析 | R 生态的标准格式 |
| **MTX + TSV** | 跨平台交换 | Cell Ranger 默认输出，通用性强 |
| ** loom** | 大规模数据 | 支持内存映射，适合超大矩阵 |

## 下游分析方向

完成基础分析（降维、聚类、注释）后，可进一步开展：

| 分析方向 | 研究问题 | 常用工具 |
|---------|---------|---------|
| **轨迹推断** | 细胞分化路径、发育过程 | Monocle 3、Slingshot、PAGA |
| **RNA velocity** | 细胞状态动态变化方向 | scVelo、velocyto |
| **细胞通讯** | 配体-受体信号网络 | CellChat、NicheNet、CellPhoneDB |
| **批次整合** | 多批次数据联合分析 | Harmony、scVI、Seurat CCA |
| **差异表达** | 条件/细胞类型间基因差异 | MAST、Wilcoxon、DESeq2 |
| **基因集富集** | 通路活性评估 | AUCell、GSVA、UCell |

## 常见误区与注意事项

### 误区一：UMI 计数 = 绝对分子数

**澄清**：
- UMI count 受捕获效率、逆转录效率、测序深度影响
- 是**相对丰度估计**，非绝对分子数
- 不同细胞/样本间比较需归一化

### 误区二：UMAP 距离反映生物学差异

**澄清**：
- UMAP 是**可视化工具**，非定量分析依据
- 簇间距离受算法参数影响，不一定反映真实生物学差异
- cluster 边界是算法定义的，不一定对应真实细胞类型边界

### 误区三：忽略 Doublet 检测

**风险**：
- Doublet 会形成虚假的"中间态"或"双阳性" cluster
- 误导细胞类型注释和轨迹推断

**建议**：
- 聚类前进行 Scrublet/DoubletFinder 检测
- 结合标记基因和 UMAP 位置验证 predicted doublets

### 误区四：批次校正过度或不足

**过度校正风险**：强行合并本应分离的生物学群体
**校正不足风险**：技术批次被误判为生物学差异

**建议**：
- 校正后验证标记基因是否保持差异
- 可视化检查批次混合程度
- 必要时做敏感性分析（校正 vs. 未校正）

## 参考资料

### 综述论文

- Luecken & Theis, *Current best practices in single-cell RNA-seq analysis: a tutorial* (Nature Reviews Genetics, 2019)
- Papalexi & Satija, *Single-cell RNA sequencing to explore immune cell heterogeneity* (Nature Reviews Immunology, 2018)
- Zheng et al., *Massively parallel digital transcriptional profiling of single cells* (Nature Communications, 2017) — 10x Genomics 原理

### 工具文档

- [Scanpy 官方文档](https://scanpy.readthedocs.io/)
- [Seurat 官方教程](https://satijalab.org/seurat/)
- [10x Genomics Cell Ranger 文档](https://support.10xgenomics.com/single-cell-gene-expression/software/pipelines/latest/what-is-cell-ranger)
- [scVI 文档](https://docs.scvi-tools.org/)

### 数据库与资源

- [CellMarker](http://biocc.hrbmu.edu.cn/CellMarker/)：细胞标记基因数据库
- [PanglaoDB](https://panglaodb.se/)：单细胞转录组数据库
- [ASAP](https://asap.epfl.ch/)：单细胞分析平台

## 相关页面

- [细胞 Barcode 与 UMI](./cell-barcode-umi.md) — 分子标签与定量原理
- [聚类与 UMAP 降维](./clustering-and-umap.md) — 降维算法与细胞聚类
- [Doublet 检测](./doublet-detection.md) — 双联体识别方法
- [轨迹推断](./trajectory-analysis.md) — 分化路径分析
- [差异表达分析](../transcriptomics/differential-expression.mdx) — 统计检验方法

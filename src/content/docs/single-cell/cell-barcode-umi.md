---
description: 细胞 Barcode（Cell Barcode）与 UMI（Unique Molecular Identifier）的定义、原理、纠错策略，以及从原始测序数据到基因表达矩阵的定量流程。
title: "细胞 Barcode 与 UMI"
---


## 核心问题

在高通量单细胞 RNA 测序（scRNA-seq）中，一次实验可产生数万个细胞的转录组数据。如何确定每条测序读段（read）来自哪个细胞？如何区分真实的 mRNA 分子与 PCR 扩增产生的重复拷贝？这两个问题通过两种分子标签解决：**细胞 Barcode** 与 **UMI**。

## 定义与结构

### 细胞 Barcode（Cell Barcode, CB）

细胞 Barcode 是一段短的寡核苷酸序列（如 10x Genomics v3 中为 16bp），在文库构建阶段通过微流控技术引入每个细胞。所有源自同一细胞的 mRNA 分子都会携带相同的 Barcode，从而使后续分析能够将读段分配到其原始细胞。

**关键特性**：
- 每个细胞对应唯一的 Barcode 序列
- Barcode 空间设计保证任意两个细胞的 Barcode 之间具有足够的汉明距离（Hamming distance），以容忍测序错误
- 不同样本的 Barcode 可能冲突，需通过样本前缀区分

### UMI（Unique Molecular Identifier）

UMI 是一段随机合成的短核苷酸序列（通常为 8–12bp），在逆转录前与每个 mRNA 分子连接。即使同一基因的多个 mRNA 分子，也会携带不同的 UMI 序列。

**关键特性**：
- 每个 mRNA 分子获得随机唯一的标识符
- PCR 扩增产生的所有拷贝保留相同的 UMI
- 通过 UMI 去重可准确估计原始分子数量，而非 read 数量

### 标签的物理连接

在液滴法 scRNA-seq（如 10x Genomics Chromium）中，一个凝胶珠（gel bead）同时携带：
- 细胞特异性 Barcode（所有引物相同）
- 随机 UMI（每个引物不同）
- 捕获序列（如 poly-dT 用于捕获 mRNA 的 poly-A 尾）

当细胞与凝胶珠在液滴中融合后，mRNA 被捕获并逆转录为 cDNA，Barcode 和 UMI 随之整合到 cDNA 序列中，后续测序一并读取。

## UMI 的必要性：PCR 扩增偏差校正

### 问题背景

scRNA-seq 文库构建需要多轮 PCR 扩增以产生足够测序的 DNA 量。由于不同序列的扩增效率存在差异，一个原始 mRNA 分子可能产生数十至数千个 PCR 拷贝。如果直接按 read 计数，高扩增效率的基因会被严重高估，导致表达量估计失真。

### UMI 的解决方案

**核心思想**：在逆转录之前，为每个 mRNA 分子分配一个随机的唯一标识符（UMI）。PCR 扩增后，源自同一分子的所有 read 携带相同的 UMI。通过统计唯一的 UMI 数量，而非 read 数量，可准确估计原始 mRNA 分子的丰度。

### 定量示例

考虑一个简化的场景：基因 A 和基因 B 各有一个 mRNA 分子，但扩增效率不同：

```
原始分子:   mRNA_A (UMI=ACGT)  +  mRNA_B (UMI=TGCA)
PCR 扩增后:
  mRNA_A → reads: ACGT, ACGT, ACGT, ACGT  (4 reads, 1 molecule)
  mRNA_B → reads: TGCA, TGCA              (2 reads, 1 molecule)

定量结果对比:
  Read count:    gene_A = 4,  gene_B = 2   ← 受扩增偏差影响
  UMI count:     gene_A = 1,  gene_B = 1   ← 反映真实分子数
```

在此例中，若使用 read count，基因 A 的表达量被高估为基因 B 的 2 倍；而 UMI count 正确反映两基因表达量相等。

## 真实细胞的识别：Barcode 白名单过滤

### 问题：区分真实细胞与空液滴

液滴法 scRNA-seq 中，微流控产生的液滴并非全都包含完整细胞。大量"空液滴"（empty droplets）会捕获环境背景 RNA（ambient RNA），产生低水平的转录组信号。如何在数万个检测到的 Barcode 中识别出真正对应细胞的那些？

### 膝点曲线法（Knee Plot）

基于一个核心观察：真实细胞包含的 RNA 量显著高于空液滴。按每个 Barcode 的总 UMI 数排序后，数据呈现明显的"膝点"（knee）或"肘部"（elbow）特征：

```
UMI 计数（log scale）
│
│  ████  ← 真实细胞（高 UMI，高斜率段）
│       ██
│         ████████████████  ← 空液滴（低 UMI，平缓段）
└──────────────────────────→ Barcodes（按 UMI 数降序排列）
              ↑
           膝点位置
```

**膝点检测原理**：曲线斜率发生突变的位置即为真实细胞与空液滴的分界。Cell Ranger 等工具自动检测该拐点，保留拐点以上的 Barcode 作为真实细胞。

### EmptyDrops 统计检验

膝点法的一个局限是可能误删低 RNA 含量的细胞类型（如静息态细胞）。EmptyDrops 算法（Lun et al. 2019）采用更严谨的统计方法：

1. **背景建模**：从最低 UMI 的 Barcode 估计环境 RNA 的分布
2. **显著性检验**：对每个 Barcode，检验其基因表达谱是否显著偏离背景分布
3. **多重检验校正**：控制 FDR（False Discovery Rate）确定最终细胞集合

该方法能更稳健地识别低含量细胞，同时减少空液滴的假阳性。

## UMI 去重的算法挑战

### 挑战一：测序错误导致的 UMI 变异

测序过程会引入随机错误（典型错误率约 0.1–1%）。一个真实的 UMI 序列可能因测序错误在部分 read 中表现为相差一个碱基的"变体"。若要求完全匹配，会错误地将这些变体计为独立的分子，导致分子数低估。

#### 解决方案：邻域图聚类

**UMI-tools**（Smith et al. 2017）提出基于邻域图的聚类方法：

1. **构建邻域图**：每个节点代表一个检测到的 UMI 序列，若两 UMI 的汉明距离（Hamming distance）≤ 1，则在它们之间添加边
2. **方向性合并**：对于相连的 UMI 对，若一个 UMI 的频次大于另一个的 2 倍，则将低频 UMI 归并到高频 UMI
3. **连通分量计数**：每个连通分量代表一个原始分子，计为 1

该方法有效纠正测序错误引入的 UMI 变异，同时避免过度合并不同分子。

### 挑战二：Barcode 测序错误的纠错

与 UMI 类似，Barcode 也可能发生测序错误。由于 Barcode 来自一个预先设计的白名单（whitelist），可利用这一结构信息进行纠错：

**Cell Ranger 纠错策略**：
1. 建立白名单中所有合法 Barcode 的索引
2. 对每个测序到的 Barcode，在白名单中查找汉明距离 ≤ 1 的候选序列
3. 若存在唯一候选，则将 read 分配到该白名单 Barcode
4. 若存在多个等距候选，则丢弃该 read（避免歧义分配）

**数学基础**：白名单设计时确保任意两个合法 Barcode 的汉明距离 ≥ 2，因此任何单碱基错误都能被唯一纠正。

## Count Matrix：最终的定量输出

### 矩阵结构

经过比对（alignment）、Barcode 纠错和 UMI 去重后，最终输出是一个**基因 × 细胞的表达矩阵**：

$$\mathbf{X} \in \mathbb{Z}_{\geq 0}^{G \times N}$$

其中：
- $G$：基因数量，通常 20,000–33,000（取决于参考基因组注释）
- $N$：细胞数量，通常 1,000–50,000
- $x_{ij}$：基因 $i$ 在细胞 $j$ 中的 UMI 计数（去重后的分子数估计）

### 稀疏性特征

单细胞数据矩阵极度稀疏：
- 典型细胞中仅 10–30% 的基因检测到非零表达
- 超过 90% 的矩阵元素为 0

这种稀疏性源于**"dropout"**现象——由于 mRNA 捕获效率有限（通常 5–20%），低丰度转录本可能未被捕获，产生技术性零值，而非真实的生物学不表达。

### 存储格式

鉴于矩阵的稀疏性，实际存储采用稀疏矩阵格式：

**Market Exchange Format (MEX) — Cell Ranger 默认输出**：
```
filtered_feature_bc_matrix/
├── matrix.mtx.gz   # 稀疏矩阵（行=基因，列=细胞，值=UMI数）
├── barcodes.tsv.gz # 细胞 Barcode 列表
└── features.tsv.gz # 基因信息（gene ID, gene name, feature type）
```

**AnnData (.h5ad) — Scanpy/Seurat 生态标准**：
```
adata.X                # 稀疏矩阵 (scipy.sparse.csr_matrix)
adata.obs              # 细胞元数据 DataFrame（行=细胞）
adata.var              # 基因元数据 DataFrame（行=基因）
adata.obsm['X_pca']    # 降维结果存储
adata.uns['neighbors'] # 邻域图参数
```

AnnData 格式将矩阵、注释、降维结果整合于单一文件，便于分析流程的传递和复现。

## 多样本整合的 Barcode 处理

### 问题：Barcode 冲突

当整合多个样本的数据时，可能出现 Barcode 冲突——不同样本的独立实验可能产生相同的 Barcode 序列。若不加以区分，这些 read 会被错误地合并为同一细胞。

### 解决方案：样本前缀标记

标准做法是在 Barcode 前添加样本标识符：

```
原始 Barcode:        ACGTACGTACGTACGT-1
样本1标记后:  Sample1_ACGTACGTACGTACGT-1
样本2标记后:  Sample2_ACGTACGTACGTACGT-1
                              ↑
                        相同 Barcode，不同样本 → 区分保留
```

### 下游分析意义

样本前缀不仅解决冲突，还为批次效应校正提供关键元数据：
- **批次校正算法**（Harmony、scVI、scANVI）依赖样本标签识别技术批次
- **样本特异性分析**（如差异表达）需要保留样本来源信息
- **质量追踪**便于追溯异常细胞到原始实验条件

## 常见误区与注意事项

### 误区一：UMI 去重完全消除了扩增偏差

UMI 去重仅纠正了 PCR 扩增步骤引入的偏差，但其他来源的技术偏差依然存在：
- **逆转录效率差异**：不同序列的 mRNA 逆转录效率不同
- **捕获效率差异**：低丰度转录本更容易在捕获步骤丢失
- **测序深度差异**：细胞间总 UMI 数的差异需要归一化校正

UMI count 是相对准确的分子数估计，但仍非绝对定量。

### 误区二：所有平台的 Barcode 长度相同

不同技术平台的 Barcode 设计各异：
| 平台 | Barcode 长度 | UMI 长度 |
|------|-------------|---------|
| 10x Genomics v2 | 16 bp | 10 bp |
| 10x Genomics v3 | 16 bp | 12 bp |
| Drop-seq | 12 bp | 8 bp |
| SPLiT-seq | 多段组合 | 10 bp |

分析时需根据实际平台参数调整软件设置。

### 误区三：Count matrix 中的 0 都表示基因不表达

单细胞数据中大量零值是技术性和生物性的混合：
- **技术性 dropout**：基因实际表达但未被捕获（低丰度基因尤其常见）
- **生物性不表达**：基因在该细胞类型中确实不转录
- **区分困难**：仅凭表达矩阵无法完全区分两者

下游分析需采用针对零膨胀数据的方法（如基于零膨胀模型的差异表达检验）。

### 误区四：使用 read count 代替 UMI count

Read count 受 PCR 扩增效率的强烈影响：
- 高 GC 含量或二级结构复杂的序列可能扩增效率更高
- 使用 read count 会系统性高估某些基因的表达量
- 差异表达分析中可能产生假阳性结果

**建议**：始终使用 UMI count 进行定量分析，read count 仅用于质控指标（如检测测序饱和度）。

## 参考资料

- [UMI-tools](https://github.com/CGATOxford/UMI-tools)
- Lun et al., *EmptyDrops* (Genome Biology, 2019)
- 10x Genomics Cell Ranger 算法文档

## 相关页面

- [scRNA-seq 总览](./scrna-seq-overview.md)
- [聚类与 UMAP 降维](./clustering-and-umap.md)
- [测序质控](../workflows/qc-overview.md)

---
description: 细胞 Barcode 与 UMI 的原理、去重策略及 count matrix 生成过程。
title: "细胞 Barcode 与 UMI"
---


## 是什么

在液滴法 scRNA-seq（如 10x Genomics）中，每个细胞的 mRNA 分子会被附加两段重要的核苷酸标签：

- **细胞 Barcode（Cell Barcode, CB）**：一段 16bp 的序列，用于标识"这条 read 来自哪个细胞"；
- **UMI（Unique Molecular Identifier）**：一段 12bp 的随机序列，用于标识"这条 read 来自哪个 mRNA 分子"。

这两段序列与 cDNA 读段连接在一起测序，从而在下游分析中区分细胞来源，并去除 PCR 扩增引入的重复。

## 为什么需要 UMI

mRNA 文库构建中必须经历多轮 PCR 扩增，一个分子可能被扩增出数十至数千个拷贝。如果不加以区分，高扩增效率的基因会被严重高估。

**UMI 的核心思路**：在逆转录步骤之前，给每个 mRNA 分子打上一个随机唯一标识符。扩增后，来自同一分子的所有 PCR 拷贝都携带相同的 UMI，计数时只数唯一的 UMI 即可。

```
原始分子:   mRNA_A (UMI=ACGT)  +  mRNA_B (UMI=TGCA)
PCR 扩增后:
  mRNA_A → reads: ACGT, ACGT, ACGT, ACGT  (4 reads, 1 molecule)
  mRNA_B → reads: TGCA, TGCA              (2 reads, 1 molecule)

UMI 去重后:
  gene_A = 1,  gene_B = 1   ← 真实分子数
  (不是 4 + 2 = 6)
```

## Barcode 白名单

并非所有检测到的 Barcode 都对应真实细胞。液滴实验中有大量"空液滴"（empty droplets）——这些液滴捕获了环境背景 RNA，但没有包含完整细胞。

**Cell Ranger** 等工具使用以下策略过滤真实细胞：

1. 以每个 Barcode 的 UMI 总数绘制**"膝点曲线"（knee plot）**；
2. 真实细胞的 UMI 数量显著高于空液滴；
3. EmptyDrops 算法（Lun et al. 2019）使用统计检验区分细胞与背景。

```
UMI 计数（log scale）
│
│  ████  ← 真实细胞（高 UMI）
│       ██
│         ████████████████  ← 空液滴（低 UMI）
└──────────────────────────→ Barcodes（排序后）
```

## UMI 去重的挑战

### 测序错误

测序本身会引入错误，导致真实 UMI 序列发生一个碱基的变化。直接比较 UMI 的完全匹配会低估分子数量。

**解决方案**：使用**邻域图（directional adjacency graph）**。若两个 UMI 只差 1 个碱基（Hamming distance = 1），且一个的频次大于另一个的两倍，则认为它们来自同一分子，合并为一个计数。

工具：**UMI-tools**（Smith et al. 2017）。

### Barcode 纠错

Cell Ranger 使用已知的 Barcode 白名单（包含所有可能的设计序列），将测序到的 Barcode 映射到最近的白名单序列（允许 1 个碱基的误差）。

## Count Matrix 的结构

经过比对和 UMI 去重后，输出一个**基因 × 细胞的稀疏矩阵**：

$$\mathbf{X} \in \mathbb{Z}_{\geq 0}^{G \times N}$$

其中 $G$ 是基因数（~20,000–33,000），$N$ 是细胞数（通常数千到数万）。

矩阵极度稀疏：典型细胞中只有 15–30% 的基因被检测到（其余为 0），这被称为**"dropout"**现象——部分基因的转录本由于数量极少，在建库时没有被捕获。

### 存储格式

```
# Market Exchange Format (MEX) — Cell Ranger 默认输出
filtered_feature_bc_matrix/
├── matrix.mtx.gz   # 稀疏矩阵（行=基因，列=细胞，值=UMI数）
├── barcodes.tsv.gz # 细胞 Barcode 列表
└── features.tsv.gz # 基因信息（gene ID, gene name, feature type）

# AnnData (.h5ad) — Scanpy 使用
adata.X          # 稀疏矩阵（scipy.sparse.csr_matrix）
adata.obs        # 细胞元数据 (DataFrame)
adata.var        # 基因元数据 (DataFrame)
adata.obsm['X_pca']   # 降维结果
adata.uns['neighbors'] # 邻域图参数
```

## 多样本与批次标记

整合多个样本时，需要为每个细胞的 Barcode 添加样本前缀，防止不同样本的 Barcode 冲突：

```
Sample1_ACGTACGTACGTACGT-1
Sample2_ACGTACGTACGTACGT-1  ← 相同 Barcode，不同样本
```

这个样本标签后续会用于批次校正（Harmony、scVI 等工具需要它）。

## 常见误区

- **UMI 去重等于完全消除扩增偏差**：不完全是，因为不同基因的建库效率（capture rate）差异依然存在；
- **Barcode 长度固定**：不同平台的 Barcode 长度不同（Drop-seq 是 12bp，10x v3 是 16bp）；
- **Count matrix 里的 0 都意味着基因不表达**：可能是 dropout——低表达基因在低质量细胞中尤其容易丢失；
- **直接用 read count 而非 UMI count**：会严重高估高扩增效率基因的表达量。

## 参考资料

- [UMI-tools](https://github.com/CGATOxford/UMI-tools)
- Lun et al., *EmptyDrops* (Genome Biology, 2019)
- 10x Genomics Cell Ranger 算法文档

## 相关页面

- [scRNA-seq 总览](./scrna-seq-overview.md)
- [聚类与 UMAP 降维](./clustering-and-umap.md)
- [测序质控](../workflows/qc-overview.md)

---
description: Doublet（双联体）的形成机制、统计特征，以及基于模拟和深度学习的检测算法原理与实践。
title: "Doublet 检测"
---


## 核心问题

### Doublet 的形成机制

液滴法 scRNA-seq（如 10x Genomics）的核心假设是：每个液滴恰好包裹一个细胞。然而，由于泊松分布的统计特性和实验参数设置，部分液滴可能捕获多个细胞：

- **Doublet**：一个液滴包含两个细胞
- **Multiplet**：一个液滴包含三个或更多细胞

从数据角度，doublet 表现为：
- 单一 Barcode 对应混合的转录组信号
- 表达特征"介于"两种真实细胞类型之间
- 可能被错误识别为新的"中间态"或"过渡态"细胞

### 为什么需要检测 Doublet

Doublet 的存在会系统性扭曲分析结果：

| 分析环节 | Doublet 的影响 |
|---------|--------------|
| **聚类** | 产生虚假的过渡群或"双阳性"群组 |
| **标记基因解释** | 同一细胞同时表达互斥的标记基因（如同时表达 T 细胞和 B 细胞标记） |
| **轨迹推断** | 制造假的分支点或中间态，误导分化路径解读 |
| **细胞类型注释** | 被误判为新的稀有亚型 |
| **差异表达** | 污染基因表达谱，降低检验效力 |

**发生率估算**：典型 10x 实验中，doublet 率约为 2–8%，与上样细胞密度正相关。

## Doublet 的统计特征

### 表达量特征

Doublet 携带两个细胞的 RNA 内容，因此通常表现出：

- **更高的总 UMI 数**：约为单细胞的 1.5–2 倍（取决于两细胞的相对大小）
- **更多检测到的基因**：基因集合的并集
- **混合的表达谱**：两个亲本细胞类型的基因表达叠加

### 双联体类型

| 类型 | 描述 | 检测难度 |
|-----|------|---------|
| **同质 Doublet**（Homotypic） | 同一细胞类型的两个细胞 | 困难，表达特征与单细胞高度相似 |
| **异质 Doublet**（Heterotypic） | 不同细胞类型的两个细胞 | 相对容易，表达谱"介于"两类之间 |

**注意**：同质 doublet 难以通过计算方法检测，其影响主要在定量层面（UMI 数偏高）。

## 检测算法原理

### 方法1：基于人工模拟的检测

**核心思想**：从真实数据生成人工 doublet，训练分类器识别真实的 doublet。

**Scrublet 算法流程**：

1. **人工 Doublet 生成**：
   - 从表达矩阵中随机选取两个细胞
   - 将它们的表达谱相加（模拟 doublet 的叠加效应）
   - 生成大量人工 doublet（通常 10-100 倍于真实细胞数）

2. **嵌入空间构建**：
   - 对真实细胞和人工 doublet 共同进行 PCA 降维
   - 计算细胞间的邻域关系

3. **Doublet 分数计算**：
   - 对每个真实细胞，统计其 k 个最近邻中人工 doublet 的比例
   - 该比例作为该细胞的"doublet score"

4. **阈值判定**：
   - 根据 score 分布自动确定阈值
   - 标记高 score 细胞为 predicted doublet

**DoubletFinder** 采用类似思路，但使用不同的统计框架和阈值策略。

### 方法2：基于统计异常值的检测

**核心思想**：识别表达量异常高或违反互斥基因规则的细胞。

**判断依据**：
- **UMI 数异常**：显著高于同类型细胞的 UMI 总量
- **互斥基因共表达**：同时高表达理论上不共存的标记基因（如 CD3E 和 CD19）
- **多类型特征基因**：包含多个细胞类型的 top marker genes

**局限**：简单阈值容易误删高代谢活性的正常细胞，或遗漏同质 doublet。

### 方法3：基于基因型信息的验证

当多个样本混池测序时，可利用基因型（SNP）信息识别 doublet：

**Demuxlet / Vireo 原理**：
- 不同供体具有独特的 SNP 模式
- Doublet 会显示两个供体的混合基因型
- 可精确识别异质 doublet 的来源

**优势**：最准确的 doublet 识别方法，可区分同质/异质 doublet
**局限**：需要多个样本混池设计，增加实验复杂度

## 何时 Doublet 率更高

以下实验条件会增加 doublet 发生率：

| 因素 | 机制 | 缓解策略 |
|-----|------|---------|
| **上样细胞浓度过高** | 液滴中细胞密度增加，多细胞包裹概率上升 | 遵循厂商推荐的上样密度 |
| **追求极高通量** | 相同体积下细胞密度必须提高 | 平衡通量与质量 |
| **细胞大小不均一** | 大小差异大的细胞体系更难优化液滴参数 | 预分选细胞至均一大小 |
| **样本混池** | 多个样本同时上样增加复杂性 | 结合基因型验证 |
| **脆弱/粘连细胞** | 细胞易聚集成团 | 优化解离条件，过滤细胞团 |

## 实践建议

### 分析流程中的位置

Doublet 检测应在分析流程的**早期**进行：

```
原始数据 → QC 过滤 → 归一化 → 【Doublet 检测】 → 聚类 → 注释
```

**原因**：
- Doublet 可能形成独立的 cluster，干扰 HVG 选择和降维
- 早期去除可提高后续聚类质量
- 但需在归一化之后（需要稳定的表达度量）

### 综合判定策略

不依赖单一指标，结合多维度证据：

1. **计算分数**：Scrublet/DoubletFinder 的 doublet score
2. **表达量检查**：UMI 数和基因数是否异常
3. **标记基因验证**：是否存在互斥基因共表达
4. **聚类位置**：是否位于两个 cluster 之间（UMAP 图）
5. **生物学合理性**：该"细胞类型"是否有文献支持

### 处理策略

| 策略 | 适用场景 | 注意事项 |
|-----|---------|---------|
| **保守删除** | 仅删除高置信度 doublet | 可能保留部分 doublet，但避免误删真实细胞 |
| **分层分析** | 高 doublet 率数据集 | 先聚类识别潜在 doublet cluster，再针对性检测 |
| **基因型过滤** | 混池实验 | 利用 Demuxlet 精确识别 |

## 常见误区与注意事项

### 误区一：高 UMI 细胞就是 doublet

**澄清**：
- 某些细胞类型天然高代谢活性（如增殖期细胞、浆细胞）
- 大细胞类型（如巨噬细胞）可能 UMIs 更多
- 应比较同类型细胞内的 UMI 分布，而非全局阈值

### 误区二：Doublet 分数高就必须删除

**建议**：
- Doublet score 是概率性预测，存在假阳性
- 结合 UMAP 位置和标记基因表达综合判断
- 对边缘案例，可保留并做敏感性分析

### 误区三：只关注异质 doublet

**澄清**：
- 同质 doublet 同样影响下游分析
- 定量分析中（如差异表达）会引入系统性偏差
- 严重时会形成虚假的"亚群"

### 误区四：Doublet 检测后不做验证

**验证步骤**：
1. 检查被标记细胞的 UMAP 分布（应在 cluster 间）
2. 查看 top 差异表达基因（应混合两类特征）
3. 统计各 cluster 的 doublet 比例（应大致均匀）
4. 去除后重新聚类，检查 cluster 结构是否更清晰

## 参考资料

- Wolock et al., *Scrublet: Computational Identification of Cell Doublets in Single-Cell Transcriptomic Data* (Cell Systems, 2019)
- McGinnis et al., *DoubletFinder: Doublet Detection in Single-Cell RNA Sequencing Data Using Artificial Nearest Neighbors* (Cell Systems, 2019)
- Kang et al., *Multiplexed droplet single-cell RNA-sequencing using natural genetic variation* (Nature Biotechnology, 2018) — Demuxlet
- Huang et al., *Vireo: Bayesian demultiplexing of pooled single-cell RNA-seq without genotype reference* (Genome Biology, 2019)
- Luecken & Theis, *Best practices for single-cell analysis* (Nature Reviews Genetics, 2022)

## 相关页面

- [scRNA-seq 总览](./scrna-seq-overview.md)
- [聚类与 UMAP 降维](./clustering-and-umap.md)
- [轨迹推断](./trajectory-analysis.md)
- [细胞 Barcode 与 UMI](./cell-barcode-umi.md)

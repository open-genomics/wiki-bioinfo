---
description: ATAC-seq（Assay for Transposase-Accessible Chromatin using sequencing）利用 Tn5 转座酶检测开放染色质区域，揭示基因组的调控元件。
title: "ATAC-seq"
---


## 问题背景

### 核心问题：染色质的开放状态是什么？

在细胞核内，DNA 并非裸露存在，而是与组蛋白形成核小体，并进一步折叠成紧密的染色质结构。然而，基因表达需要转录机器接触 DNA，这就产生了**染色质可及性（chromatin accessibility）**问题：

- 哪些区域的染色质处于"开放"状态，允许转录因子等调控蛋白进入？
- 这些开放区域如何决定基因表达的时空特异性？
- 不同细胞类型的开放图谱有何差异？

传统的 DNase-seq 可以回答这些问题，但它需要大量细胞（10⁶ 量级）、操作复杂、耗时较长。ATAC-seq 正是为了解决这些问题而诞生。

ATAC-seq（Assay for Transposase-Accessible Chromatin using sequencing）由 Buenrostro 等人在 2013 年提出。
它利用了**Tn5 转座酶**的特性：

> Tn5 转座酶倾向于插入到无核小体的开放染色质区域，同时在插入过程中自动完成测序接头的连接。

这一特性使 ATAC-seq 能够同时解决两个问题：
1. **标记开放区域**：Tn5 的插入位置直接标记了染色质可及区域
2. **简化建库**：在染色质片段化的同时完成接头连接，省去传统建库的片段化、末端修复等步骤

因此，ATAC-seq 可以回答：
- 基因组上哪些区域处于开放状态？
- 这些开放区域对应哪些潜在的调控元件？
- 不同条件下开放图谱如何变化？

## 数据生物学特征

ATAC-seq 的一个独特优势是：
插入片段长度本身携带了染色质结构信息。当 Tn5 转座酶切割开放染色质时，片段长度由以下因素决定：

- **片段 < 100 bp**：对应无核小体的开放区域，通常是转录因子结合位点或调控元件
- **片段 ~180 bp**：对应单个核小体保护的区域，即有一个核小体占据该位点
- **片段 ~360 bp**：对应两个核小体保护的区域

通过分析片段长度分布，我们不仅能定位开放区域，还能推断核小体在基因组上的排布，这是 ATAC-seq 相比其他方法的信息优势。

## 标准分析流程

ATAC-seq 的分析流程需要兼顾生物学信息的提取和技术噪声的控制：

### 1. 数据预处理

**质控**：评估测序质量、接头残留、重复率等指标。

**比对**：将 reads 比对到参考基因组。由于 ATAC-seq 的片段短，需要使用适合短片段比对的工具。

**去噪**：
- 去除线粒体 reads（通常占比很高，但不反映核内染色质状态）
- 去除 PCR 重复
- 去除 ENCODE 黑名单区域（测序假象热点）

### 2. Tn5 插入位点定位

Tn5 转座酶并非在 read 起始位置切割，而是存在一定的偏移：
- 正链 reads：实际插入位点在 read 起始 + 4 bp 处
- 负链 reads：实际插入位点在 read 结束 - 5 bp 处

这种偏移源于 Tn5 结合 DNA 的几何结构。准确校正偏移是后续分析的基础。

### 3. 峰调用（Peak Calling）

通过统计方法识别基因组上 Tn5 插入显著富集的区域。这些峰代表开放染色质区域，通常对应：
- 启动子（promoters）
- 增强子（enhancers）
- 其他调控元件

峰调用是 ATAC-seq 的核心步骤，常用工具为 MACS2。

### 4. 下游生物学分析

- **Motif 分析**：在峰区域中富集的 DNA 序列模式
- **Footprinting**：识别转录因子实际结合的位点
- **Peak-to-gene 关联**：将调控元件与目标基因联系起来

### 峰调用的参数考量

ATAC-seq 使用 MACS2 进行峰调用时，参数选择与 ChIP-seq 有所不同：

```bash
macs2 callpeak \
  -t atac.bam \
  -f BAMPE \
  -g hs \
  -n atac \
  --nomodel --shift -100 --extsize 200
```

**参数说明**：
- `--nomodel`：不估计 fragment size 模型，因为 ATAC-seq 的片段分布复杂（混合了无核小体片段和核小体保护片段）
- `--shift -100` 和 `--extsize 200`：将 reads 向中心偏移并扩展，模拟片段覆盖范围

这些参数调整反映了 ATAC-seq 数据与 ChIP-seq 数据在片段特性上的根本差异。

## 转录因子足迹分析（Footprinting）

### 问题：如何区分"开放"与"被占用"？

ATAC-seq 可以识别开放染色质区域，但开放区域不一定意味着转录因子正在结合。一个区域可能：
- 完全开放（无蛋白结合）
- 被转录因子占据（蛋白保护 DNA 不被 Tn5 切割）
- 被核小体占据

Footprinting 旨在解决：**在开放的区域中，哪些位置实际上被转录因子结合？**

### 足迹的基本原理

当转录因子结合到 DNA 上时，它会物理阻碍 Tn5 转座酶的插入。这导致：
- **Motif 中心区域**：Tn5 插入显著减少（被蛋白保护）
- **Motif 两侧区域**：T_n5 插入正常（开放染色质）

这种"凹陷"模式就是 footprint。通过检测这种模式，我们可以推断哪些转录因子正在活跃结合。

### 分析的挑战

Footprinting 虽然是推断转录因子活性的有力工具，但解释需谨慎：
- **数据深度**：需要高覆盖度数据才能检测到可靠的足迹信号
- **Tn5 序列偏好**：Tn5 本身有切割偏好，需要校正
- **Motif 质量**：依赖已知的 motif 数据库完整性

详细的统计方法见 [Footprinting 算法](./footprinting-algorithms.mdx)。

## 单细胞 ATAC-seq（scATAC-seq）

### 问题：异质性群体的调控差异

Bulk ATAC-seq 测量的是细胞群体的平均信号，但生物样本通常是异质性的。例如，肿瘤组织中包含癌细胞、免疫细胞、基质细胞等，它们的调控图谱各不相同。

scATAC-seq 将 ATAC-seq 推进到单细胞分辨率，使我们可以：
- 识别不同细胞类型的调控特征
- 发现稀有细胞亚群的调控程序
- 追踪细胞分化过程中的染色质动态

### 数据特性与挑战

单细胞数据的稀疏性带来了独特的分析挑战：
- **稀疏矩阵**：每个细胞只有数千个开放位点被检测到（vs. bulk 的数百万）
- **缺失数据**：许多位点的状态是"未观测到"而非"未开放"
- **批次效应**：不同实验批次的技术差异

### 核心分析策略

**降维与聚类**：
- 构建 peak × cell 矩阵
- 使用 LSI（Latent Semantic Indexing）或类似方法降维
- 聚类识别细胞群体

**Motif 偏差分析（chromVAR）**：
- 不直接检测 footprint（数据太稀疏）
- 计算每个细胞中 motif 的插入偏差
- 推断转录因子活性差异

**多组学整合**：
- 与 scRNA-seq 联合，关联染色质开放性与基因表达
- 构建基因调控网络

## 常见误区与正确理解

### 误区 1：开放染色质 = 基因一定在表达

**误解**：如果一个基因的启动子区域有 ATAC-seq 峰，这个基因一定在活跃转录。

**正确理解**：开放染色质是转录的**必要条件而非充分条件**。一个区域可以开放但不被使用：
- 转录因子可能未结合
- 必需的协同因子可能缺失
- 染色质可能需要额外的修饰才能激活

解释 ATAC-seq 结果时，需要结合基因表达数据（如 RNA-seq）才能确认调控是否转化为转录输出。

### 误区 2：峰附近的基因就是靶基因

**误解**：ATAC-seq 峰对应的基因就是其调控的基因。

**正确理解**：增强子可以调控远距离的基因，跨越数十甚至数百 kb。简单的"最近基因"策略会错过许多真实的调控关系。

正确的关联策略需要考虑：
- 三维基因组结构（如 Hi-C 数据）
- 已知增强子-启动子关联
- 表达相关性分析

### 误区 3：ATAC-seq 可以替代 ChIP-seq

**误解**：ATAC-seq 可以告诉我们哪些转录因子在结合，因此不需要再做特定转录因子的 ChIP-seq。

**正确理解**：ATAC-seq 和 ChIP-seq 回答不同层次的问题：
- ATAC-seq：哪里开放？哪些调控元件潜在活跃？
- ChIP-seq：某个特定因子在哪里结合？

ATAC-seq 的 footprint 分析只能**推断**转录因子活性，而 ChIP-seq 提供**直接**的结合证据。两者互补而非替代。

### 误区 4：Footprint 一定可靠

**误解**：检测到 footprint 就证明转录因子确实结合了。

**正确理解**：Footprint 是间接证据，存在多种假阳性来源：
- 数据覆盖度不足导致的随机波动
- Tn5 序列偏好校正不充分
- 核小体定位造成的类似信号

可靠的 footprint 分析需要：
- 高深度数据（通常 >50M reads）
- 严格的统计检验和多重校正
- 独立实验验证（如 ChIP-seq 或 motif 富集）

## 历史背景与关键文献

ATAC-seq 的发展代表了表观基因组学技术的进步轨迹：

**技术演进**：
- DNase-seq（2000s）：高细胞量需求、操作复杂
- FAIRE-seq：简便但分辨率有限
- ATAC-seq（2013）：低细胞量、快速、高分辨率

**关键文献**：
- Buenrostro et al. (2013). Transposition of native chromatin for fast and sensitive epigenomic profiling of open chromatin, DNA-binding proteins and nucleosome position. *Nature Methods*. （ATAC-seq 原始论文）
- Buenrostro et al. (2015). ATAC-seq: A method for assaying chromatin accessibility genome-wide. *Current Protocols in Molecular Biology*. （实验方案）
- Schep et al. (2017). chromVAR: inferring transcription-factor-associated accessibility from single-cell epigenomic data. *Nature Methods*. （单细胞分析）

**资源**：
- ENCODE ATAC-seq 数据标准和流程
- ATAC-seq 分析工具：MACS2, HOMER, chromVAR, ArchR, Signac

## 与其他页面的连接

- **上游基础**：理解染色质结构需要参考 [参考基因组与注释](../foundations/reference-and-annotation.mdx) 中的基因结构和调控元件注释
- **技术对比**：ATAC-seq 与 [ChIP-seq 概览](./chip-seq-overview.md) 是研究基因调控的两种互补技术
- **算法深入**：峰调用的统计原理见 [MACS2 峰调用算法](./macs2-peak-calling.mdx)，footprint 的算法细节见 [Footprinting 算法](./footprinting-algorithms.mdx)
- **序列模型**：motif 分析涉及 [PWM / PSSM](../models/pwm-pssm.mdx) 的概率模型
- **单细胞扩展**：scATAC-seq 可与单细胞组学整合分析

---
title: "术语表"
description: 生物信息学核心术语的中英文对照与简要定义，涵盖测序、比对、变异、转录组等领域。
---


## 是什么

术语表不是把英文名词简单翻成中文，而是帮助读者快速确认：当前页面讨论的到底是哪一层对象、哪一类算法、哪一种文件或流程概念。对 wiki 来说，它承担的是统一术语和减少跨页歧义的作用。

## 为什么重要

生物信息学里很多混乱并不是来自公式本身，而是来自术语层级混用，例如：

- 把 gene、transcript、protein 混成一个对象；
- 把 alignment、mapping、assembly 当成同一类任务；
- 把 reference version、annotation version、database record 混为一谈。

因此，术语表的目标不是求全，而是优先覆盖高频、易混淆、会跨板块反复出现的词。

## 核心术语

### 测序与数据基础

- **测序读段（read）**：测序仪直接产生的原始序列片段。Illumina 短读长通常为 75-300 bp，PacBio/Nanopore 长读长可达 10-100 kb。
- **配对末端读段（paired-end read, PE read）**：同一 DNA 片段两端分别测序产生的两条 read，已知它们之间的插入大小（insert size）范围。
- **覆盖度（coverage / depth）**：某段序列被读段覆盖的深度（平均每个碱基被多少条 read 覆盖）或广度（基因组中至少被一条 read 覆盖的比例）。
- **质量分数（quality score, Phred score）**：描述碱基被错误测定的概率。Q30 表示错误率约 0.1%。计算公式：$Q = -10 \log_{10}(P_e)$，其中 $P_e$ 为错误概率。
- **接头序列（adapter sequence）**：测序文库构建中添加到 DNA 片段两端的已知序列，用于在测序仪上锚定和启动测序。在分析前通常需要去除。
- **k-mer**：长度为 k 的子串，是索引、计数、组装图和伪比对（pseudo-alignment）的常见基本单位。例如，序列 "ACGTACG" 的 3-mer 集合为 {ACG, CGT, GTA, TAC, ACG}。
- **GC 含量（GC content）**：序列中鸟嘌呤（G）和胞嘧啶（C）碱基占总碱基的比例。影响测序均匀性和 PCR 偏好。
- **FASTQ 格式**：存储原始测序数据的常用文件格式，每条 read 包含序列和对应的质量分数。
- **SAM/BAM 格式**：存储序列比对结果的文件格式。SAM 为文本格式，BAM 为其二进制压缩版本。包含 read 序列、比对位置、CIGAR 字符串和比对质量（MAPQ）等信息。

### 参考基因组与注释

- **参考基因组（reference genome）**：作为比对、变异检测和注释解释的参考序列背景。人类参考基因组的主要版本包括 GRCh37 (hg19) 和 GRCh38 (hg38)。
- **注释（annotation）**：描述基因（gene）、转录本（transcript）、外显子（exon）、编码区（CDS, Coding Sequence）等特征（feature）的位置与属性。常用注释来源包括 GENCODE 和 RefSeq。
- **GTF/GFF 格式**：存储基因组注释信息的文件格式，描述基因、转录本、外显子等特征在参考序列上的坐标位置。
- **坐标系统（coordinate system）**：序列区间的编号方式、边界定义及链方向的解释规则。常见的约定包括 0-based 半开区间 [start, end)（如 BED 格式）和 1-based 闭区间 [start, end]（如 GTF 格式）。

### 比对与索引

- **比对（alignment）**：将序列与参考序列或另一条序列建立字符级对应关系。比对结果可以表示为匹配（match）、错配（mismatch）、插入（insertion）和缺失（deletion）。
- **定位（mapping）**：强调将读段（reads）定位到参考序列的候选位置，未必建立完整字符级对应。在某些语境中与 alignment 同义使用。
- **CIGAR 字符串**：描述比对细节的紧凑编码，如 "50M2I48M" 表示 50 个匹配、2 个插入、48 个匹配。
- **比对质量（MAPQ, Mapping Quality）**：衡量 read 被映射到正确位置的概率。MAPQ=60 意味着错误映射概率约为 $10^{-6}$。
- **多重比对（multi-mapping）**：一个读段可兼容多个参考位置或多个转录本的情况。在 RNA-seq 中很常见，因为基因间存在同源区域和可变剪接。
- **Burrows-Wheeler 变换（Burrows-Wheeler Transform, BWT）**：压缩索引与快速搜索的核心构件之一。通过循环位移和排序将相似上下文的字符聚集在一起。
- **FM-index**：建立在 Burrows-Wheeler 变换之上的压缩全文索引结构，可高效支持序列搜索。BWA-MEM 的核心索引结构。
- **Suffix Array（后缀数组）**：文本所有后缀按字典序排列后，记录各后缀起始位置的整数数组。BWT 和 FM-index 的构造基础。
- **Minimizer**：在滑动窗口中选取最小值的 k-mer 子集，用于降低序列索引的大小。minimap2 等工具使用 minimizer 做快速 seeding。

### 组装

- **组装（assembly）**：在无完整参考或不依赖参考的情况下，将读段重建成更长序列。
- **de novo 组装**：不依赖任何参考序列，仅从 reads 本身重建序列的组装方式。
- **连续组装片段（contig）**：由重叠或图路径拼接而成的连续序列，中间不含未知碱基（gap）。
- **骨架序列（scaffold）**：在连续组装片段（contig）基础上，利用配对信息、长读长或其他证据连接得到的更长序列，中间可能包含未知碱基（以 N 表示）。
- **de Bruijn 图**：将 k-mer 作为节点（或边），通过重叠关系构建的有向图。是现代短读长组装工具的核心数据结构。
- **OLC（Overlap-Layout-Consensus）**：经典的长读长组装策略：先计算 read 之间的重叠（Overlap），再确定 read 的排列顺序（Layout），最后生成共识序列（Consensus）。
- **N50**：将所有 contig 按长度从大到小排序后，累计长度达到总长度 50% 时的 contig 长度。是评估组装连续性的常用指标。
- **组装图（assembly graph）**：描述 contig 之间连接关系的图结构，其中节点是 contig 或序列片段，边表示它们之间的邻接或重叠关系。GFA 格式是常用的组装图存储格式。

### 变异检测

- **变异（variant）**：样本序列相对参考序列的差异，如单核苷酸变异（SNV, Single Nucleotide Variant）、插入缺失（indel）或结构变异（Structural Variant, SV）。
- **SNV（Single Nucleotide Variant）**：单核苷酸变异，即单个碱基的替换。
- **InDel（Insertion/Deletion）**：相对于参考序列的短片段插入或缺失。
- **结构变异（Structural Variant, SV）**：长度通常大于 50 bp 的基因组变异，包括缺失（deletion）、插入（insertion）、倒位（inversion）、易位（translocation）和拷贝数变异（Copy Number Variation, CNV）。
- **VCF 格式（Variant Call Format）**：存储变异检测结果的文件格式，包含变异位点坐标、参考碱基、变异碱基、基因型和质量信息。
- **基因型（genotype）**：某一位点上等位基因的组合，如 0/0（纯合参考）、0/1（杂合）、1/1（纯合变异）。
- **变异等位基因频率（Variant Allele Frequency, VAF）**：在混合样本（如肿瘤）中，携带特定变异的 reads 占该位点总覆盖 reads 的比例。

### 转录组与基因表达

- **基因（gene）**：功能或调控层的基本单位之一，但不等同于某一条具体转录本（transcript）。一个基因通常对应多条转录本。
- **转录本（transcript）**：基因表达后形成的 RNA 产物层对象，可能存在多个可变剪接形式（isoform）。
- **可变剪接形式（isoform）**：同一基因产生的不同转录本形式，常因可变剪接或不同转录起始/终止位点而产生。
- **外显子（exon）**：转录本中保留在成熟 mRNA 中的部分。
- **内含子（intron）**：转录本中被剪接去除的部分。
- **RPKM / FPKM / TPM**：基因表达定量的标准化指标。TPM（Transcripts Per Million）是目前最常用的标准化方式，使不同样本之间的表达量可直接比较。
- **差异表达（Differential Expression, DE）**：在不同实验条件下，基因或转录本表达水平具有统计学显著差异的现象。
- **伪比对（pseudo-alignment）**：不建立完整的碱基级比对，而是通过 k-mer 兼容性将 reads 快速分配给转录本，用于表达定量。代表工具包括 Salmon 和 Kallisto。
- **剪接位点（splice site）**：内含子与外显子之间的边界位置，由 GT-AG（或少数 GC-AG、AT-AC）等二核苷酸信号标记。

### 概率模型与机器学习

- **隐马尔可夫模型（Hidden Markov Model, HMM）**：用于建模隐藏状态与观测序列之间概率关系的概率图模型。在生物信息学中广泛用于序列比对（pairwise HMM）、蛋白质家族建模（Profile HMM）和基因结构预测。
- **谱隐马尔可夫模型（profile HMM）**：面向序列家族建模的 HMM，常用于蛋白家族与保守区域识别。每个位置具有匹配（Match）、插入（Insert）和删除（Delete）三种状态。
- **Viterbi 算法**：在 HMM 中寻找最可能的隐藏状态序列的动态规划算法。类比于序列比对中的得分最大化路径。
- **Forward-Backward 算法**：在 HMM 中计算观测序列概率和后验状态概率的算法，用于参数估计和不确定性量化。
- **马尔可夫链蒙特卡洛（Markov Chain Monte Carlo, MCMC）**：从复杂概率分布中采样的方法，广泛用于贝叶斯统计推断。
- **嵌入（Embedding）**：将离散符号映射到连续向量空间中的表示方法。在序列深度学习中，碱基或氨基酸被转化为固定维度的稠密向量。
- **Transformer**：基于自注意力机制（Self-Attention）的神经网络架构，在蛋白质结构预测（AlphaFold）和序列建模（ESM）中取得了突破性成果。
- **迁移学习（Transfer Learning）**：将在大规模数据上预训练的模型知识迁移到特定下游任务中的策略。是解决生物学标注数据稀缺问题的核心方法。

### 数据库与资源

- **RefSeq**（NCBI Reference Sequence）：NCBI 维护的参考序列数据库，提供基因组、转录本和蛋白质的非冗余参考序列。
- **GENCODE**：ENSEMBl 和 UCSC 共同维护的基因注释项目，提供人类和小鼠基因组的全面注释。
- **UniProt**：蛋白质序列和功能注释的综合数据库，包括人工审阅的 Swiss-Prot 和自动注释的 TrEMBL。
- **KEGG**（Kyoto Encyclopedia of Genes and Genomes）：生物通路和功能注释数据库。
- **GO**（Gene Ontology）：基因本体论，提供统一的基因功能分类体系。
- **SRA**（Sequence Read Archive）：NCBI 维护的原始测序数据归档数据库。
- **PDB**（Protein Data Bank）：蛋白质和核酸三维结构数据库。
- **GTDB**（Genome Taxonomy Database）：基于基因组系统发育的细菌和古菌分类数据库。

### 序列模式与功能

- **序列模式（motif）**：具有生物学意义、可在多条序列中重复出现的局部模式。例如，转录因子结合位点（Transcription Factor Binding Site, TFBS）是典型的序列 motif。
- **保守区域（conserved domain）**：在进化过程中高度保守的蛋白质区域，通常对应特定的功能或结构单元。
- **直系同源（ortholog）**：不同物种中由共同祖先基因分化而来的同源基因，通常保留相似的功能。
- **旁系同源（paralog）**：同一物种内由基因复制产生的同源基因，功能可能发生分化。
- **调控区域（regulatory region）**：控制基因表达时序和水平的 DNA 区域，包括启动子（promoter）、增强子（enhancer）和沉默子（silencer）等。

## 应用场景

术语表最适合在以下时候快速回查：

- 从基础页跳到算法页时，确认对象层是否变化；
- 从 workflow 页跳到数据库或格式页时，确认读到的是数据对象、文件格式还是资源入口；
- 阅读 RNA-seq、variant calling、assembly 等页面时，避免把不同层次的"结果"混在一起理解；
- 查看工具文档或论文时，确认英文术语在中文语境中的含义。

## 常见误区

- 觉得术语表只是词典，因此不关心对象层级；
- 只记中文翻译，不关心英文术语在工具、论文和数据库中的具体含义；
- 在一篇文章里混用多个译法，导致跨页检索困难；
- 把流程名、对象名、文件格式名和算法名混在一起使用；
- 忽视术语的上下文依赖性，同一个词在不同子领域可能有不同含义；
- 不区分"参考基因组"（一个具体版本）和"参考序列"（一个更一般的概念）。

## 参考资料

- [写作规范](../intro/style-guide/)
- [参考资料](./references/)
- 《An Introduction to Bioinformatics Algorithms》
- NCBI、Ensembl、UniProt 等官方文档

## 相关页面

- [生物信息学中的基础对象](../foundations/biology-basics/)
- [序列、字符串与坐标系统](../foundations/sequences-and-strings/)
- [参考基因组与注释](../foundations/reference-and-annotation/)
- [常见数据格式总览](../formats/common-file-formats/)
- [数据库与注释系统一览](../data-references/databases-and-annotations/)

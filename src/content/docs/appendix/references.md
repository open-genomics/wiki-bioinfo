---
title: "参考资料"
description: 本知识库引用的经典教材、综述论文与在线资源汇总。
---


## 是什么

这一页汇总的是本 wiki 反复依赖的教材、官方文档、数据库入口和站点参考。它的目标不是穷尽所有文献，而是给读者提供一组高价值、可持续回查的基础来源。

## 为什么重要

wiki 页面适合建立主线理解，但当你需要进一步确认定义、算法细节、数据库对象或工具行为时，仍需回到原始资料来源。按用途分组参考资料，可减少"知道名字但不知何时查阅"的问题。

## 教材与方法论

### 算法与计算生物学

- **An Introduction to Bioinformatics Algorithms**（Jones & Pevzner, 2004）：本项目的重要结构参考来源之一，适合建立字符串、比对、组装、系统发育等经典算法主线。涵盖穷举搜索、贪心、动态规划、图算法和随机化算法在生物序列分析中的系统应用。
- **Biological Sequence Analysis**（Durbin et al., 1998）：生物信息学概率建模的经典教材，深入讲解隐马尔可夫模型（HMM）、多序列比对、RNA 结构预测和系统发育的概率方法。是理解 Profile HMM、Viterbi 算法和 Forward-Backward 算法的权威参考。
- **Algorithms on Strings, Trees and Sequences**（Gusfield, 1997）：字符串算法的百科全书式参考，系统覆盖后缀树、后缀数组、序列比对和组合模式匹配。适合需要深入理解索引结构和比对算法的读者。
- **Bioinformatics Algorithms: An Active Learning Approach**（Compeau & Pevzner, 2015）：以问题驱动的方式讲解生物信息学算法，配合在线编程练习平台 Rosalind，适合自学者。
- **Computational Molecular Biology: An Algorithmic Approach**（Pevzner, 2000）：侧重于基因组组装、序列比对和比较基因组学的算法基础，是理解 de Bruijn 图组装理论的重要参考。

### 统计与机器学习

- **Biostatistics: The Bare Essentials**（Norman & Streiner）：生物统计学入门教材，覆盖假设检验、回归分析和实验设计的基础知识。
- **Pattern Recognition and Machine Learning**（Bishop, 2006）：机器学习的经典教材，涵盖贝叶斯方法、隐变量模型和神经网络的理论基础。
- **An Introduction to Statistical Learning**（James et al., 2021）：统计学习的入门教材，覆盖回归、分类、重采样方法和树模型，适合生物信息学中的统计建模。
- **Deep Learning**（Goodfellow et al., 2016）：深度学习的系统性教材，涵盖前馈网络、卷积网络、循环网络、自编码器和生成模型的理论基础。

### 基因组学与实验方法

- **Genomes**（T.A. Brown）：基因组学导论教材，覆盖基因组结构、基因组测序、转录组和蛋白质组的全面知识。
- **Molecular Biology of the Cell**（Alberts et al.）：分子生物学的权威教材，提供理解生物信息学数据所需的生物学背景知识。
- **Bioinformatics Data Skills**（Vince Buffalo, 2015）：更适合从数据文件、命令行与实际分析流程角度理解生物信息学实践。覆盖 Unix 命令行、版本控制、数据处理管道和最佳实践。
- **Genomics: A Very Short Introduction**（Archer, 2019）：基因组学的简明概述，适合快速了解基因组学的基本概念和历史背景。

## 经典论文与综述

### 序列比对与索引

- **Smith, T.F. & Waterman, M.S. (1981).** "Identification of common molecular subsequences." *Journal of Molecular Biology*. -- 局部比对的奠基论文，提出了 Smith-Waterman 算法。
- **Altschul, S.F. et al. (1990).** "Basic local alignment search tool." *Journal of Molecular Biology*. -- BLAST 算法的原始论文，生物信息学中被引用最多的论文之一。
- **Li, H. & Durbin, R. (2009).** "Fast and accurate short read alignment with Burrows-Wheeler transform." *Bioinformatics*. -- BWA 算法的原始论文，BWT 索引在短读长比对中的经典应用。
- **Li, H. (2013).** "Aligning sequence reads, clone sequences and assembly contigs with BWA-MEM." *arXiv*. -- BWA-MEM 算法的论文，扩展了 BWA 到长读长和 split-read 比对。
- **Ferragina, P. & Manzini, G. (2000).** "An opportunistic data structure with applications to pervasive computing." -- FM-index 的原始论文，压缩全文索引的理论基础。

### 基因组组装

- **Idury, R.M. & Waterman, M.S. (1995).** "A new algorithm for DNA sequence assembly." *Journal of Computational Biology*. -- de Bruijn 图用于序列组装的早期理论工作。
- **Pevzner, P.A., Tang, H. & Tesler, G. (2004).** "De novo repeat classification and fragment assembly." *Genome Research*. -- de Bruijn 图组装在重复序列处理上的重要进展。
- **Bankevich, A. et al. (2012).** "SPAdes: a new genome assembly algorithm and its applications to single-cell sequencing." *Journal of Computational Biology*. -- SPAdes 组装工具的原始论文。

### 变异检测

- **McKenna, A. et al. (2010).** "The Genome Analysis Toolkit: a MapReduce framework for analyzing next-generation DNA sequencing data." *Genome Research*. -- GATK 框架的原始论文，DNA-seq 变异检测的行业标准。
- **Li, H. et al. (2009).** "The Sequence Alignment/Map format and SAMtools." *Bioinformatics*. -- SAM/BAM 格式和 SAMtools 的原始论文。

### 转录组与表达分析

- **Trapnell, C. et al. (2012).** "Differential gene and transcript expression analysis of RNA-seq experiments with TopHat and Cufflinks." *Nature Protocols*. -- 经典 RNA-seq 分析流程的详细描述。
- **Patro, R. et al. (2017).** "Salmon provides fast and bias-aware quantification of transcript expression." *Nature Methods*. -- Salmon 伪比对工具的论文，RNA-seq 表达定量方法的重大进展。
- **Love, M.I., Huber, W. & Anders, S. (2014).** "Moderated estimation of fold change and dispersion for RNA-seq data with DESeq2." *Genome Biology*. -- DESeq2 差异表达分析工具的论文。

### 深度学习与蛋白质结构

- **Senior, A.W. et al. (2020).** "Improved protein structure prediction using potentials from deep learning." *Nature*. -- AlphaFold1 的论文，首次展示深度学习在蛋白质结构预测中的突破。
- **Jumper, J. et al. (2021).** "Highly accurate protein structure prediction with AlphaFold." *Nature*. -- AlphaFold2 的论文，蛋白质结构预测的里程碑式成果。
- **Lin, Z. et al. (2023).** "Evolutionary-scale prediction of atomic-level protein structure with a language model." *Science*. -- ESM-2 和 ESMFold 的论文，大规模蛋白质语言模型的代表工作。
- **AlQuraishi, M. (2019).** "End-to-end differentiable learning of protein structure." *Cell Systems*. -- 端到端蛋白质结构预测的早期探索。

### 宏基因组学

- **Wood, D.E. & Salzberg, S.L. (2014).** "Kraken: ultrafast metagenomic sequence classification using exact alignments." *Genome Biology*. -- Kraken 分类工具的原始论文。
- **Alneberg, J. et al. (2014).** "Binning metagenomic contigs by coverage and composition." *Nature Methods*. -- CONCOCT binning 方法的论文。

## 官方文档与数据库入口

### 综合性数据库

- **NCBI**（https/www.ncbi.nlm.nih.gov/）：综合资源入口，涵盖 Gene、RefSeq、SRA、PubMed、GenBank 等对象体系。是美国国家生物技术信息中心的核心平台。
- **Ensembl**（https/www.ensembl.org/）：适合 gene / transcript / genome annotation 层对象查询，提供基因组浏览器和 REST API。由 EMBL-EBI 和 Sanger Institute 维护。
- **UCSC Genome Browser**（https/genome.ucsc.edu/）：提供基因组浏览器、基因注释和比较基因组学工具。与 Ensembl 互为补充，常用于可视化基因组数据。
- **UniProt**（https/www.uniprot.org/）：适合 protein 层对象与功能注释查询，包括 Swiss-Prot（人工审阅）和 TrEMBL（自动注释）两部分。

### 结构数据库

- **PDB**（https/www.rcsb.org/）：蛋白质三维结构数据库，适合结构层信息与三维结构证据查询。
- **AlphaFold DB**（https/alphafold.ebi.ac.uk/）：DeepMind 提供的基于 AlphaFold2 预测的蛋白质结构数据库，覆盖超过 2 亿个蛋白质结构预测。

### 功能与通路数据库

- **KEGG**（https/www.kegg.jp/）：适合 pathway 与功能模块解释，覆盖代谢通路、信号转导和疾病通路。
- **GO**（Gene Ontology, https/geneontology.org/）：基因本体论数据库，提供统一的基因功能分类体系（分子功能、生物过程、细胞组分）。
- **InterPro**（https/www.ebi.ac.uk/interpro/）：蛋白质家族、功能域和位点的整合数据库。

### 宏基因组专用数据库

- **GTDB**（Genome Taxonomy Database, https/gtdb.ecogenomic.org/）：基于基因组系统发育的细菌和古菌分类数据库。
- **eggNOG**（https/eggnogmapper.embl.de/）：直系同源群和功能注释数据库，适合宏基因组基因的功能注释。

### 测序数据存储

- **SRA**（Sequence Read Archive, https/www.ncbi.nlm.nih.gov/sra）：NCBI 维护的原始测序数据存储库，是全球最大的测序数据归档平台。
- **ENA**（European Nucleotide Archive, https/www.ebi.ac.uk/ena）：EMBL-EBI 维护的核酸序列归档，与 SRA 互为镜像。

## 工具文档与教程

- **Bioconductor**（https/bioconductor.org/）：基于 R 语言的生物信息学工具包集合，涵盖测序数据分析、注释、可视化和统计检验。适合 RNA-seq、ChIP-seq 等表达和调控分析。
- **Galaxy Project**（https/usegalaxy.org/）：基于 Web 的生物信息学分析平台，提供无需编程即可运行的分析流程，适合教学和快速原型验证。
- **SEQanswers**（https/seqanswers.com/）：生物信息学社区论坛，适合查找工具使用经验和问题解决方案。
- **Biostars**（https/www.biostars.org/）：生物信息学问答社区，适合初学者提问和查阅常见问题的解答。

## 站点与写作参考

- **OI Wiki**：本项目在中文 wiki 组织方式、可连续阅读体验和知识网络构建上的重要参考。
- **Astro / Starlight**：当前站点生成框架，用于组织 sidebar、文档路由与组件页面。

## 如何使用这些参考

可以按问题类型反向选择参考来源：

- 想补算法主线：先看教材（Jones & Pevzner, Durbin 等）；
- 想确认数据库对象与版本：优先看官方资源（NCBI, Ensembl, UniProt）；
- 想深入了解某个方法的历史和原理：查看经典论文的原文；
- 想确认站内页面该如何组织：参考 OI Wiki 与现有 [style guide](../intro/style-guide/)；
- 想确认站点功能或导航实现：查看 Astro 和 Starlight 文档；
- 想快速上手某个分析流程：查看 Galaxy 教程或 Bioconductor vignettes。

## 常见误区

- 只列出资源名称，却不说明它们分别适合解决什么问题；
- 把数据库入口和具体对象体系混为一谈；
- 用二手博客替代官方文档或教材；
- 在页面里大量堆链接，却没有给出使用语境；
- 引用论文时只写缩写而不给出完整信息，导致他人难以查找；
- 忽视数据库和工具的版本差异，不同版本的结果可能不兼容。

## 相关页面

- [写作规范](../intro/style-guide/)
- [常用数据库与资源](../databases/common-resources/)
- [数据库与注释系统一览](../data-references/databases-and-annotations/)
- [术语表](./glossary/)

---
description: 全基因组关联研究的统计原理、多重检验校正、群体结构混杂控制与结果解读。
title: "GWAS"
---


## 从连锁分析到关联研究：范式转变

20世纪90年代，基因定位主要依靠家系连锁分析（linkage analysis）。这种方法寻找在患病家系中与疾病共分离的染色体区域，成功定位了亨廷顿舞蹈症、囊性纤维化等孟德尔遗传病基因。然而，对于复杂疾病（如糖尿病、精神分裂症），连锁分析的效力有限——这些疾病涉及多个微效基因，且家系中患病成员比例低。

2005年，标志性的进展出现了。Klein 等人在 *Science* 发表了一篇论文，报道了与年龄相关性黄斑变性（AMD）相关的补体因子 H（CFH）基因变异。这是首个成功的全基因组关联研究（Genome-Wide Association Study, GWAS）——它不依赖家系结构，而是在**病例-对照设计**中直接检验数十万个 SNP 与疾病状态的关联。

GWAS 的核心思想简单而强大：**在全基因组尺度上系统性地扫描遗传变异，寻找与表型相关的统计学信号。**


## 关联检验的统计模型

### 基因型编码

在 GWAS 中，SNP 通常被编码为数值变量：
- **加性模型（Additive）**：$g = 0, 1, 2$，表示次要等位基因（minor allele）的拷贝数；
- **显性模型（Dominant）**：$g = 0$（野生型纯合子）或 $1$（至少一个突变等位基因）；
- **隐性模型（Recessive）**：$g = 0$（非隐性纯合子）或 $1$（隐性纯合子）。

加性模型最为常用，它假设每个突变等位基因对表型的影响是线性的。

### 定量性状的线性回归

对于连续表型（如身高、血压、基因表达水平），标准方法是线性回归：

$$y_i = \beta_0 + \beta_1 g_i + \gamma_1 c_{i1} + \cdots + \gamma_k c_{ik} + \varepsilon_i$$

其中：
- $y_i$：个体 $i$ 的表型值
- $g_i$：基因型编码
- $c_{ij}$：协变量（年龄、性别、主成分等）
- $\beta_1$：效应大小（每个等位基因剂量对表型的平均影响）
- $\varepsilon_i \sim N(0, \sigma^2)$：残差

检验 $H_0: \beta_1 = 0$，得到 SNP 与表型关联的 p 值。

### 二分类性状的 Logistic 回归

对于疾病状态等二分类表型，使用 logistic 回归：

$$\log\frac{P(y_i = 1)}{P(y_i = 0)} = \beta_0 + \beta_1 g_i + \gamma_1 c_{i1} + \cdots + \gamma_k c_{ik}$$

这里的 $\beta_1$ 表示每个等位基因剂量对**对数比值比（log odds ratio）**的贡献。指数化后得到比值比（OR）：

$$OR = e^{\beta_1}$$

OR = 1 表示无关联，OR > 1 表示风险增加，OR < 1 表示保护效应。


## 多重检验问题与阈值选择

### 全基因组显著性

GWAS 的核心统计挑战是**多重检验**。典型的芯片包含 50-100 万个 SNP，即使所有 SNP 都与表型无关，在 $\alpha = 0.05$ 水平下，仍会有约 2.5-5 万个假阳性。

Bonferroni 校正建议：

$$\alpha_{GW} = \frac{0.05}{\text{独立检验数}}$$

由于 LD 的存在，全基因组 SNP 并非完全独立。经验估计认为人类基因组有约 100 万个**有效独立检验**。这导致广泛采用的**全基因组显著性阈值**：

$$p < 5 \times 10^{-8}$$

这一阈值已成为 GWAS 领域的标准，相当于 Bonferroni 校正后的 $\alpha = 0.05$。

### 建议显著性

为平衡假阳性和假阴性，一些研究采用**建议显著性**阈值：

$$p < 1 \times 10^{-5}$$

这类位点需要独立样本复制验证才能确认。


## 群体结构：混杂的幽灵

### 虚假关联的产生

群体结构是 GWAS 中最隐蔽的混杂来源。假设：
- 病例组主要来自欧洲北部人群（等位基因 A 频率 20%）
- 对照组主要来自欧洲南部人群（等位基因 A 频率 40%）

即使等位基因 A 与疾病无关，由于病例-对照分层的系统性差异，也会观察到显著的虚假关联。

这种混杂的危险性在于：**它与真实信号在统计上难以区分**，除非引入群体背景信息。

### 主成分校正

Price 等人（2006）提出的 PCA 校正是最常用的群体结构控制方法。步骤如下：

1. **构建基因型矩阵**：$N \times M$ 矩阵，$N$ 为样本数，$M$ 为 SNP 数；
2. **计算亲缘关系矩阵**或直接在基因型矩阵上进行 SVD；
3. **提取前 $k$ 个主成分**（通常 $k = 5-20$）；
4. **将主成分作为协变量加入回归模型**。

数学上，这相当于在模型中增加项：

$$y_i = \beta_0 + \beta_1 g_i + \sum_{j=1}^{k} \gamma_j PC_{ij} + \varepsilon_i$$

前几个主成分通常对应主要的祖源轴，吸收群体分层带来的系统差异。

### 线性混合模型

对于复杂的群体结构或亲缘关系，PCA 可能不足。线性混合模型（LMM）提供了更一般的框架：

$$\mathbf{y} = \mathbf{X}\boldsymbol{\beta} + \mathbf{Z}\mathbf{u} + \boldsymbol{\varepsilon}$$

其中 $\mathbf{u}$ 是随机效应，通常建模为 $\mathbf{u} \sim N(0, \sigma_g^2 \mathbf{K})$，$\mathbf{K}$ 是遗传亲缘关系矩阵（GRM）。

LMM 同时考虑固定效应（SNP 效应）和随机效应（个体间的遗传背景相似性），在存在亲缘关系或精细群体结构时更稳健。

常用工具：
- **PLINK 2**：快速且功能全面的关联分析工具
- **BOLT-LMM**：针对 UK Biobank 级别大样本优化的 LMM 实现
- **SAIGE**：针对 case-control 不平衡设计的快速 LMM
- **REGENIE**：基于机器学习的快速全基因组回归方法


## 结果可视化与质量评估

### Manhattan Plot

Manhattan plot 是 GWAS 的标志性可视化：
- **横轴**：染色体位置（chr 1 → chr 22 → X）；
- **纵轴**：$-\log_{10}(p)$，p 值越小，点越高；
- **显著线**：$p = 5 \times 10^{-8}$ 对应的 $-\log_{10}(p) \approx 7.3$。

显著信号通常呈现为"峰"——由于 LD，因果变异附近的多个 SNP 都会显示关联。

### QQ Plot

Quantile-Quantile plot 比较观察到的 p 值分布与零假设下的期望分布：
- **$\lambda_{GC}$（基因组膨胀因子）**：中位数观察 $\chi^2$ 与期望 $\chi^2$ 的比值，正常应在 1.0-1.05 之间；
- **前端整体抬高**：提示群体结构、批次效应或系统偏差；
- **仅尾部抬高**：更像真实关联信号的特征。

### 信号解读的局限

GWAS 发现的是**关联位点**，而非因果变异或因果基因。后续分析包括：

1. **LD Clumping**：选取每个 LD  block 中最显著的 SNP，去除冗余信号；
2. **Fine-mapping**：利用 LD 和功能性注释缩小因果变异范围；
3. **eQTL 共定位**：检验 GWAS 信号是否与基因表达调控关联；
4. **通路富集分析**：识别 GWAS 基因的功能类别；
5. **孟德尔随机化**：利用 GWAS 信号推断因果关系。


## 常见误区

### 误区一：最显著 SNP 就是因果变异

GWAS 的显著 SNP 很可能只是与因果变异处于高 LD 的 tag SNP。在欧洲人群中，因果变异与 lead SNP 的平均距离可达数十 kb。因果推断需要精细定位、功能实验和跨群体验证。

### 误区二：小 p 值等于大效应

在大样本 GWAS（如 UK Biobank，$N > 500,000$）中，极小的效应（$R^2 < 0.001$）也能达到全基因组显著。统计显著性不等于临床重要性，需结合效应大小和生物学背景解读。

### 误区三：阴性结果等于无关联

未达到显著阈值不意味着该位点与表型无关。可能原因：
- 效应太小，当前样本量不足以检测；
- 该变异未被芯片覆盖或插补质量差；
- 遗传异质性（不同群体的因果变异不同）。

### 误区四：质量控制不重要

GWAS 是"垃圾进，垃圾出"的典型：
- 样本污染或亲缘关系会导致虚假关联；
- HWE 偏离的位点可能存在分型错误；
- 批次效应若不校正会系统性扭曲结果。


## 与其他概念的联系

- **Hardy–Weinberg 平衡**：GWAS 质控中用于过滤低质量位点；
- **连锁不平衡**：决定关联信号的范围和精细定位的难度；
- **群体结构**：GWAS 混杂的主要来源，需通过 PCA 或 LMM 控制；
- **遗传力**：GWAS 发现的位点通常只解释遗传力的一小部分（"丢失的遗传力"问题）。


## 参考资料

1. Klein, R. J., et al. (2005). Complement factor H polymorphism in age-related macular degeneration. *Science*, 308(5720), 385-389.
2. Price, A. L., et al. (2006). Principal components analysis corrects for stratification in genome-wide association studies. *Nature Genetics*, 38(8), 904-909.
3. Visscher, P. M., et al. (2012). Five years of GWAS discovery. *American Journal of Human Genetics*, 90(1), 7-24.
4. Chang, C. C., et al. (2015). Second-generation PLINK: Rising to the challenge of larger and richer datasets. *GigaScience*, 4(1), s13742-015-0047-8.
5. Loh, P. R., et al. (2015). Efficient Bayesian mixed-model analysis increases association power of large cohorts. *Nature Genetics*, 47(3), 284-290. (BOLT-LMM)
6. Mbatchou, J., et al. (2021). Computationally efficient whole-genome regression for quantitative and binary traits. *Nature Genetics*, 53(7), 1097-1103. (REGENIE)

## 相关页面

- [Hardy–Weinberg 平衡](./hardy-weinberg.md) — 理解 GWAS 质控的理论基础
- [连锁不平衡](./linkage-disequilibrium.md) — 解释 GWAS 信号的范围与精细定位
- [群体结构](./population-structure.md) — 混杂的来源与校正方法

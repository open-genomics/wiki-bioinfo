---
sidebar_position: 4
description: GWAS 的统计框架、混杂校正与 Manhattan plot 解读。
---

# GWAS

## 是什么

GWAS（Genome-Wide Association Study）通过在全基因组尺度上逐个位点检验基因型与表型之间的统计关联，寻找与疾病风险或性状差异相关的变异。

最基本的思路是：对每个 SNP 单独做一个关联检验，然后在数十万到数百万个位点中寻找显著信号。

<figure>
  <img src="/wiki-bioinfo/img/illustrations/gwas-manhattan.svg" alt="GWAS Manhattan plot" />
  <figcaption>GWAS 常用 Manhattan plot 展示全基因组的关联显著性，纵轴是 -log10(p)，显著峰通常需要进一步结合 LD 和功能注释解释。</figcaption>
</figure>

## 统计模型

### 定量性状

常用线性回归：

$$y = \beta_0 + \beta_1 g + \beta_2 c_1 + \cdots + \beta_k c_k + \varepsilon$$

其中：

- `y`：表型值；
- `g`：基因型编码（0/1/2，表示等位基因剂量）；
- `c_i`：协变量（年龄、性别、PC 等）。

### 二分类性状

常用 logistic 回归：

$$\log\frac{P(y=1)}{P(y=0)} = \beta_0 + \beta_1 g + \cdots$$

`β1` 反映变异对患病风险的影响。

## 多重检验

GWAS 最大的统计挑战之一是：要同时检验海量位点，因此必须控制假阳性。

人类 GWAS 中一个经验上广泛使用的阈值是：

$$p < 5 \times 10^{-8}$$

这近似反映了在全基因组有效独立检验数量下的 Bonferroni 校正。

## 群体结构与混杂

如果病例和对照来自不同祖源群体，那么某些位点的频率差异可能反映的是祖源，而不是疾病本身。这是 GWAS 的经典混杂来源。

常见控制方法：

- 加入 PCA 主成分作为协变量；
- 使用线性混合模型（LMM）；
- 更严格的样本匹配和 QC。

常见工具：

- **PLINK 2**
- **BOLT-LMM**
- **SAIGE**（适合大样本和 case-control 不平衡）

## 结果可视化

### Manhattan plot

横轴是染色体位置，纵轴是：

$$-\log_{10}(p)$$

显著位点形成高峰，看起来像城市天际线，因此得名 Manhattan plot。

### QQ plot

比较观察到的 p 值分布与零假设下的期望分布：

- 前端整体抬高：提示群体结构、批次或系统偏差；
- 只有尾部抬高：更像真实关联信号。

## 从显著位点到生物学解释

GWAS 发现的是**关联位点**，不是自动得到因果基因。后续通常还要做：

- LD clumping / pruning；
- fine-mapping；
- eQTL 共定位；
- 功能注释（coding / promoter / enhancer）；
- 通路富集与基因集分析。

## 常见误区

- **最显著 SNP 就是致病变异**：往往只是 LD 代理；
- **达到显著阈值就说明效应很大**：大样本下很小效应也能显著；
- **GWAS 找到的是机制**：它更多给出线索，机制还需功能验证；
- **只做关联，不做 QC**：样本污染、亲缘关系、分型错误都会放大假信号。

## 参考资料

- PLINK 2 文档
- Visscher et al., GWAS 综述
- SAIGE / BOLT-LMM 相关论文

## 相关页面

- [连锁不平衡](./linkage-disequilibrium.md)
- [群体结构](./population-structure.md)
- [常见数据库与资源](../databases/common-resources.md)

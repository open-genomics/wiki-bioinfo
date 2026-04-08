---
description: RNA-seq 表达量归一化的数学定义：CPM、FPKM、TPM 与有效长度的公式推导、算法复杂度分析与适用场景。
title: "TPM、FPKM、CPM 与有效长度"
---

import SummaryBox from '@/components/docs/SummaryBox.astro';

<SummaryBox
  summary="RNA-seq 表达量归一化是消除系统偏差、实现可比性的关键步骤。本节从数学定义出发，对比 CPM、FPKM、TPM 的归一化策略，分析其算法复杂度与统计性质。"
  bullets={[
    '数学定义：counts → CPM/FPKM/TPM 的公式推导',
    '算法复杂度：归一化计算的时空开销分析',
    '统计性质：TPM 的样本内可比性 vs FPKM 的跨样本局限',
  ]}
/>

## 问题定义

**RNA-seq 归一化问题**：给定基因/转录本的原始计数（counts），消除测序深度与序列长度带来的系统偏差，获得可比较的表达量度量。

- **输入**：
  - 原始计数矩阵 $C = [c_{ij}]$，其中 $c_{ij}$ 为基因 $i$ 在样本 $j$ 中的 counts
  - 基因/转录本长度向量 $L = [l_1, l_2, ..., l_m]$（单位：kb）
  - 样本总测序深度 $N_j = \sum_i c_{ij}$
  
- **输出**：
  - 归一化表达矩阵（CPM、FPKM 或 TPM）

- **核心难点**：
  - 不同样本测序深度差异可达数量级
  - 长转录本天然获得更多 reads
  - 需要选择适合特定下游分析的归一化策略

## 归一化方法的数学定义

### CPM：测序深度归一化

**定义**：Counts Per Million

$$\text{CPM}_{ij} = \frac{c_{ij}}{N_j} \times 10^6$$

其中 $N_j = \sum_i c_{ij}$ 为样本 $j$ 的总计数。

**算法复杂度**：
- 时间：$O(m \times n)$，一次遍历计数矩阵
- 空间：$O(m \times n)$，原地计算或输出新矩阵

**适用场景**：
- 粗略比较同一样本内不同基因的表达
- 低表达基因过滤（如 CPM < 1 的过滤）
- **不适用于**：跨样本比较（未校正长度偏差）

### FPKM：长度与深度双重归一化

**定义**：Fragments Per Kilobase per Million

$$\text{FPKM}_{ij} = \frac{c_{ij}}{l_i \times N_j} \times 10^9$$

其中：
- $l_i$：基因/转录本 $i$ 的长度（单位：kb）
- $N_j$：样本 $j$ 的总 counts
- $10^9$：转换为"每 kb 每百万"的缩放因子

**归一化逻辑**：
1. 先按长度归一化：$c_{ij} / l_i$（单位长度 counts）
2. 再按深度归一化：除以 $N_j$ 并乘 $10^6$

**算法复杂度**：
- 时间：$O(m \times n)$，需额外长度信息
- 空间：$O(m \times n)$

### TPM：先长度后样本内归一化

**定义**：Transcripts Per Million

**计算步骤**：

**Step 1**：长度归一化（每 kb counts）

$$\tilde{c}_{ij} = \frac{c_{ij}}{l_i}$$

**Step 2**：样本内 rescale 到百万

$$\text{TPM}_{ij} = \frac{\tilde{c}_{ij}}{\sum_k \tilde{c}_{kj}} \times 10^6 = \frac{c_{ij}/l_i}{\sum_k c_{kj}/l_k} \times 10^6$$

**关键性质**：对于任意样本 $j$，总有

$$\sum_i \text{TPM}_{ij} = 10^6$$

**算法复杂度**：
- 时间：$O(m \times n)$，需两次遍历（长度归一化 + 样本内 rescale）
- 空间：$O(m \times n)$

## 方法比较：算法性质与适用条件

| 归一化方法 | 归一化顺序 | 样本内总和 | 跨样本可比性 | 主要用途 |
|-----------|-----------|-----------|-------------|---------|
| **Counts** | 无 | 变量（依赖深度） | 差 | 差异分析输入 |
| **CPM** | 深度 | 固定（$10^6$） | 中等 | QC、同样本内比较 |
| **FPKM** | 长度 → 深度 | 变量 | 有限 | 文献兼容（已逐渐被 TPM 替代） |
| **TPM** | 长度 → 样本内 | 固定（$10^6$） | 好 | 可视化、样本间比较 |

### 为什么 TPM 优于 FPKM 用于跨样本比较

**FPKM 的问题**：

假设有两个样本 A 和 B，总 counts 分别为 $N_A$ 和 $N_B$。

FPKM 的计算中，分母包含 $N_j$，但分子经过长度归一化后的 $\tilde{c}_{ij}$ 之和在不同样本中不同。

这导致：一个基因在样本 A 中 FPKM 较高，可能只是因为样本 A 中其他高表达基因"稀释"了总 counts，而非该基因真实表达更高。

**TPM 的优势**：

TPM 在第二步归一化时，使用的是长度归一化后的总计数 $\sum_k \tilde{c}_{kj}$，而非原始 $N_j$。

这使得 TPM 可以解释为：**在总转录本池中，该转录本所占的百万分比**。

## 有效长度（Effective Length）

### 问题背景

理想情况下，转录本产生 reads 的概率应正比于其全长。但实际中，有效可产生 reads 的区域受以下因素影响：

1. **Read 长度限制**：长度为 $L$ 的转录本，对于长度为 $l_{read}$ 的 reads，可产生的独特位置数为 $L - l_{read} + 1$
2. **覆盖度偏差**：转录本两端通常 coverage 较低
3. **GC 偏差**：某些 GC 极端区域测序效率低
4. **序列复杂性**：重复序列区域难以唯一比对

### 数学定义

**有效长度** $\tilde{l}_i$ 是对真实可产生可靠 reads 区域的估计：

$$\tilde{l}_i = l_i - \mu_{\text{bias}} + \epsilon_{\text{GC}} + \epsilon_{\text{pos}}$$

其中：
- $\mu_{\text{bias}}$：末端效应的平均损失
- $\epsilon_{\text{GC}}$：GC 含量校正
- $\epsilon_{\text{pos}}$：位置偏差校正

**在定量工具中的应用**：

Salmon、Kallisto 等工具在 EM 算法中使用有效长度：

$$P(r | t_i) \propto \frac{\theta_i}{\tilde{l}_i}$$

而非简单的 $P(r | t_i) \propto \theta_i / l_i$。

## 算法实例：计算流程

### 示例数据

假设某样本有三个转录本的 counts 和长度：

| 转录本 | Counts | 长度 (kb) |
|-------|--------|----------|
| $t_1$ | 300 | 1.5 |
| $t_2$ | 200 | 2.0 |
| $t_3$ | 100 | 1.0 |

样本总 counts：$N = 600$

### CPM 计算

$$\text{CPM}_1 = \frac{300}{600} \times 10^6 = 500{,}000$$
$$\text{CPM}_2 = \frac{200}{600} \times 10^6 = 333{,}333$$
$$\text{CPM}_3 = \frac{100}{600} \times 10^6 = 166{,}667$$

验证：$500{,}000 + 333{,}333 + 166{,}667 = 10^6$ ✓

### FPKM 计算

$$\text{FPKM}_1 = \frac{300}{1.5 \times 600} \times 10^9 = 333{,}333{,}333$$
$$\text{FPKM}_2 = \frac{200}{2.0 \times 600} \times 10^9 = 166{,}666{,}667$$
$$\text{FPKM}_3 = \frac{100}{1.0 \times 600} \times 10^9 = 166{,}666{,}667$$

### TPM 计算

**Step 1**：长度归一化

$$\tilde{c}_1 = \frac{300}{1.5} = 200$$
$$\tilde{c}_2 = \frac{200}{2.0} = 100$$
$$\tilde{c}_3 = \frac{100}{1.0} = 100$$

长度归一化总计：$200 + 100 + 100 = 400$

**Step 2**：Rescale

$$\text{TPM}_1 = \frac{200}{400} \times 10^6 = 500{,}000$$
$$\text{TPM}_2 = \frac{100}{400} \times 10^6 = 250{,}000$$
$$\text{TPM}_3 = \frac{100}{400} \times 10^6 = 250{,}000$$

验证：$500{,}000 + 250{,}000 + 250{,}000 = 10^6$ ✓

## 算法选择指南

| 分析目标 | 推荐归一化单位 | 原因 |
|---------|---------------|------|
| **差异表达分析** | 原始 counts | 统计模型（DESeq2/edgeR）内置归一化 |
| **样本间比较** | TPM | 样本内总和固定，可比性好 |
| **可视化** | TPM 或 log-TPM | 避免深度偏差，分布更易观察 |
| **同一样本内比较** | CPM 或 TPM | 长度校正后比较 |
| **与文献对比** | FPKM/TPM | 注意文献使用的版本 |

## 常见误区与算法边界

1. **在 TPM/FPKM 上做简单 t-test**
   - 问题：归一化后的数据丢失了计数数据的离散分布信息
   - 正确做法：使用原始 counts + 专用统计模型

2. **把 TPM 当作绝对分子数**
   - 问题：TPM 是相对丰度，不是每个细胞的具体分子数
   - 正确理解：TPM 反映的是"占总转录本的比例"

3. **忽略有效长度**
   - 问题：短转录本的有效长度比例损失更大
   - 影响：在短转录本（< 500bp）上定量偏差更大

## 相关算法与扩展阅读

- **[Pseudo-alignment 与表达定量](./pseudo-alignment-and-quantification.mdx)**：了解定量算法如何计算 counts
- **[差异表达分析](./differential-expression.mdx)**：为什么差异分析从 counts 出发而非 TPM
- **[RNA-seq 工作流概览](../workflows/rna-seq.md)**：归一化在完整流程中的位置

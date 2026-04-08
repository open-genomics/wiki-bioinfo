---
description: 基因层（gene-level）与转录本层（transcript-level）表达定量的算法问题定义、聚合方法的数学形式与层级选择策略。
title: "基因层与转录本层表达定量"
---

import SummaryBox from '@/components/docs/SummaryBox.astro';

<SummaryBox
  summary="RNA-seq 表达定量可以在两个解析层级进行：转录本（isoform）层和基因层。本节从算法角度分析两种层级的信息含量、聚合策略与适用条件。"
  bullets={[
    '问题定义：转录本层丰度估计 vs 基因层聚合计算',
    '聚合算法：求和、加权求和的数学形式与信息损失',
    '复杂度分析：转录本层的不确定性建模 vs 基因层的稳定性提升',
  ]}
/>

## 问题定义

**表达定量层级问题**：给定转录本层的表达丰度估计，如何聚合到基因层？或在何种条件下应保留转录本层分析？

- **输入**：
  - 转录本层丰度向量 $\theta = (\theta_1, \theta_2, ..., \theta_m)$，其中 $m$ 为转录本数量
  - 基因-转录本映射关系 $G: T \rightarrow \mathcal{G}$，将转录本集合映射到基因集合
  - （可选）转录本长度 $L = (l_1, ..., l_m)$
  
- **输出**：
  - 基因层丰度向量 $\phi = (\phi_1, ..., \phi_k)$，其中 $k$ 为基因数量（$k < m$）
  - 或保留转录本层进行 isoform 特异性分析

- **核心难点**：
  - 聚合过程会造成 isoform 信息损失
  - 转录本层估计的不确定性更高（multi-mapping 问题更严重）
  - 下游分析工具对输入层级的特定要求

## 转录本层定量：问题复杂度分析

### 基本定义

对于基因 $g$，设其包含的转录本集合为 $T_g = \{t_{g,1}, t_{g,2}, ..., t_{g,n_g}\}$，其中 $n_g$ 为该基因的转录本数目。

转录本层定量估计每个 $t \in T_g$ 的丰度 $\theta_t$。

### 算法复杂度挑战

转录本层定量面临**更高维度的不确定性**：

1. **Multi-mapping 问题更严重**
   - 同一基因内的转录本共享外显子
   - Reads 往往兼容多个 isoform
   - 需要 EM 算法等推断方法分离信号

2. **参数空间更大**
   - 估计参数数量 = 转录本总数 $m$
   - 相比基因层（$k$ 个参数），$m \gg k$
   - 需要更多 reads 支持才能稳定估计

3. **有效长度估计更复杂**
   - 不同 isoform 的结构差异（5'/3' UTR 长度、内含子保留）
   - 需要针对每个 isoform 计算有效长度

### 数学表示

转录本层丰度估计通常通过最大化似然函数：

$$\hat{\theta} = \arg\max_\theta P(R | \theta) = \arg\max_\theta \prod_{r \in R} \sum_{t \in \text{Compatible}(r)} P(r | t) \cdot \theta_t$$

其中 $P(r|t)$ 由序列相似性和有效长度决定。

## 基因层聚合：算法策略

### 聚合方法的形式化定义

给定转录本层丰度 $\theta_t$，基因层丰度 $\phi_g$ 通过聚合函数计算：

$$\phi_g = f(\{\theta_t : t \in T_g\})$$

常见聚合策略：

#### 方法 1：简单求和（Sum Aggregation）

$$\phi_g^{\text{sum}} = \sum_{t \in T_g} \theta_t$$

**算法复杂度**：$O(n_g)$ 对于每个基因

**适用条件**：
- $\theta_t$ 为绝对丰度估计（如分子数估计）
- 目标是基因总表达量

#### 方法 2：长度加权求和

考虑转录本长度的聚合（用于 counts 数据）：

$$\phi_g^{\text{length-weighted}} = \sum_{t \in T_g} \frac{\theta_t}{l_t} \times \bar{l}_g$$

其中 $\bar{l}_g$ 为该基因转录本的平均长度。

**适用场景**：当需要将不同长度的 isoform 归一化后聚合。

#### 方法 3：主转录本代表（Dominant Isoform）

$$\phi_g^{\text{dominant}} = \max_{t \in T_g} \theta_t$$

**适用场景**：当只关心基因是否存在表达，不关心 isoform 构成。

### 聚合导致的信息损失

聚合过程 $T_g \rightarrow \phi_g$ 是不可逆的，丢失的信息包括：

1. **Isoform 构成比例**：哪些转录本变体主导表达
2. **剪接模式**：外显子跳过、内含子保留等事件
3. **结构变异**：5'/3' UTR 长度变化、alternative promoters

**数学分析**：

设某基因有两个 isoform，丰度分别为 $\theta_1$ 和 $\theta_2$。简单求和得到 $\phi = \theta_1 + \theta_2$，但以下两种情境产生相同的 $\phi$：

- 情境 A：$\theta_1 = 0.8, \theta_2 = 0.2$（isoform 1 主导）
- 情境 B：$\theta_1 = 0.5, \theta_2 = 0.5$（两者均衡）

这在基因层无法区分。

## 层级选择的算法考量

### 选择转录本层的条件

| 分析目标 | 算法需求 | 推荐层级 |
|---------|---------|---------|
| 选择性剪接分析 | 区分 isoform 比例 | Transcript-level |
| Isoform 特异性调控 | 识别特定转录本的变化 | Transcript-level |
| 新转录本发现 | 检测未注释 isoform | Transcript-level |
| 结构变异分析 | 5'/3' UTR 长度变化 | Transcript-level |

**算法代价**：
- 需要专门的差异 isoform 分析工具（如 IsoformSwitchAnalyzeR、SUPPA2）
- 统计检验效能降低（参数更多，估计方差更大）
- 需要更多生物学重复（通常 $n \geq 6$）

### 选择基因层的条件

| 分析目标 | 算法优势 | 推荐层级 |
|---------|---------|---------|
| 差异表达分析 | 统计模型更稳定，检验效能更高 | Gene-level |
| 通路富集分析 | 与基因集数据库（GO/KEGG）兼容 | Gene-level |
| 机器学习分类 | 特征维度更低，过拟合风险小 | Gene-level |
| 跨研究比较 | 与历史基因芯片数据兼容 | Gene-level |

**算法优势**：
- 成熟工具生态（DESeq2、edgeR、limma）
- 更低的估计方差（信号聚合效应）
- 较少的生物学重复即可（通常 $n \geq 3$）

## 从转录本层到基因层：算法流程

### 标准转换流程

```
Transcript-level counts/TPM
    ↓
基因-转录本映射（GTF annotation）
    ↓
聚合计算（sum / weighted sum）
    ↓
Gene-level expression matrix
```

### 算法实现细节

使用 tximport 等工具进行转换时的关键参数：

1. **countsFromAbundance**：是否从丰度反推 counts
2. **lengthData**：使用有效长度还是完整长度
3. **aggregationLevel**：gene 还是 transcript

**复杂度分析**：
- 时间：$O(m)$，一次遍历转录本列表
- 空间：$O(k)$，输出基因层矩阵

### 长度校正的聚合

对于 TPM 数据，由于已经长度归一化，简单求和即可：

$$\text{TPM}_g = \sum_{t \in T_g} \text{TPM}_t$$

对于 counts 数据，需要考虑长度差异：

$$\text{counts}_g = \sum_{t \in T_g} \text{counts}_t \times \frac{\bar{l}_g}{l_t}$$

其中 $\bar{l}_g$ 为该基因的平均转录本长度。

## 实践中的算法权衡

### 推荐策略

1. **起点策略**：从转录本层定量开始（保留最多信息）
2. **评估策略**：检查 isoform 复杂性
   - 单 isoform 基因占多数 → 基因层分析
   - 多 isoform 基因表达高 → 考虑转录本层分析
3. **工具链选择**：
   - 转录本层：Salmon/Kallisto → tximport → DEXSeq/IsoformSwitchAnalyzeR
   - 基因层：Salmon/Kallisto → tximport → DESeq2/edgeR

### 常见误区

1. **混淆层级进行差异分析**
   - 错误：在转录本层矩阵上使用基因层差异分析工具
   - 后果：多重检验校正失效，假阳性率失控

2. **忽略 isoform switching**
   - 问题：基因总表达不变，但 isoform 构成变化
   - 后果：基因层分析无法检测这类调控事件

3. **聚合时未考虑长度差异**
   - 影响：长 isoform 和短 isoform 的 counts 直接相加导致偏差

## 相关算法与扩展阅读

- **[RNA-seq 工作流概览](../workflows/rna-seq.md)**：层级选择在完整流程中的位置
- **[Pseudo-alignment 与表达定量](./pseudo-alignment-and-quantification.mdx)**：转录本层定量的算法基础
- **[TPM、FPKM、CPM 与有效长度](./tpm-fpkm-cpm.mdx)**：聚合时的长度校正方法
- **[差异表达分析](./differential-expression.mdx)**：基因层与转录本层的统计检验差异

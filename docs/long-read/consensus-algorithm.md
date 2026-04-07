---
sidebar_position: 6
description: Consensus 算法的详细实现，包括 Racon 的部分顺序图 DP、Medaka 的神经网络模型和完整 worked example。
pagination_label: Consensus 算法
---

import SummaryBox from '@site/src/components/docs/SummaryBox';
import DefinitionList from '@site/src/components/docs/DefinitionList';

# Consensus 算法

<SummaryBox
  summary="Consensus 算法通过整合多条 reads 的信息生成高质量共识序列，是长读长纠错和 polishing 的核心算法。"
  bullets={[
    'Racon 使用动态规划在部分顺序图上计算最优共识',
    'Medaka 使用神经网络直接从信号预测碱基',
  ]}
/>

## 是什么

Consensus 算法解决以下问题：

> 给定一组覆盖同一基因组区域的多条 noisy reads，找出最可能的真实碱基序列。

长读长测序（尤其是 Nanopore）的原始错误率较高（5-15%），但通过多条 reads 的共识可以将错误率降低到 Q20-Q30 水平。

## 要解决什么生物信息学问题

在实际生物信息学应用中，consensus 算法适合的场景包括：

- **组装 polishing**：提高初始 contig 的碱基准确性
- **read 纠错**：在组装前提高单条 read 质量
- **变异检测**：降低假阳性率
- **单倍型分离**：区分不同单倍型的序列

## 数学模型

### 问题形式化

设有一组 reads $R = \{r_1, r_2, \ldots, r_n\}$，它们都来自同一个基因组区域。

每条 read rᵢ 可以表示为：
- 碱基序列 bᵢ = bᵢ₁bᵢ₂...bᵢLᵢ
- 质量分数 qᵢ = qᵢ₁qᵢ₂...qᵢLᵢ（可选）

目标是找到共识序列 C = c₁c₂...cₘ，使得：

$$
C = \arg\max_C \sum_{i=1}^{n} \sum_{j=1}^{L_i} P(b_{ij} | c_{\pi(i,j)})
$$

其中 `π(i,j)` 是 read `i` 的第 `j` 个碱基在共识序列中的位置。

### 多序列比对视角

Consensus 问题可以看作多序列比对（MSA）的特例：

1. 将 reads 对齐到参考序列（contig 或 draft assembly）
2. 在每个对齐位置，根据碱基分布和权重计算最优碱基

## Racon 算法

Racon 是基于动态规划的部分顺序图（Partial Order Alignment, POA）consensus 算法。

### 部分顺序图（POA）

POA 是一种表示多序列比对的图结构：

- **节点**：表示一个碱基
- **边**：表示序列顺序关系
- **路径**：每条 read 对应图中的一条路径

POA 相比传统 MSA 的优势：
- 可以处理非唯一比对
- 自然支持插入和删除
- 更高效的增量更新

### 动态规划公式

设 POA 图 G = (V, E)，其中 V 是节点集合，E 是边集合。

定义 `DP[i]` 为：从起始节点到节点 `i` 的最优路径得分。

递推公式：

$$
DP[i] = \max_{(j,i) \in E} \{DP[j] + s(v_j, v_i)\}
$$

其中 `s(v_j, v_i)` 是节点 `j` 到节点 `i` 的转换得分，考虑：
- 碱基匹配/错配得分
- 质量分数权重
- 覆盖度信息

### 算法步骤

#### 步骤 1：构建 POA

1. 将第一条 read 作为初始路径
2. 逐条添加后续 reads：
   - 将新 read 与现有 POA 比对
   - 合并路径，创建新节点和边
   - 更新节点覆盖度

#### 步骤 2：计算最优路径

使用动态规划在 POA 上找最优路径：

1. 初始化 DP[起始节点] = 0
2. 拓扑排序所有节点
3. 按拓扑序计算 DP 值
4. 回溯得到最优路径

#### 步骤 3：生成共识

最优路径对应的碱基序列即为共识序列。

## Medaka 算法

Medaka 使用神经网络直接从原始信号预测碱基，不依赖质量分数。

### 神经网络模型

Medaka 使用循环神经网络（RNN）或卷积神经网络（CNN）：

**输入**：
- 原始电流信号（归一化）
- 可能的上下文信息（移动平均、标准差等）

**输出**：
- 每个位置的概率分布 P(A, C, G, T)

**架构**：
```
Signal → Normalization → CNN/RNN → Softmax → Base Probabilities
```

### 模型训练

训练数据：
- 已知参考基因组
- 对应的 Nanopore 原始信号
- 真实碱基标签

损失函数：交叉熵

$$
L = -\sum_{i=1}^{L} \sum_{b \in \{A,C,G,T\}} y_{i,b} \log(\hat{p}_{i,b})
$$

其中 `$y_{i,b}$` 是真实标签的 one-hot 编码，`$\hat{p}_{i,b}$` 是预测概率。

### 推理过程

1. 对每个位置，模型输出四个碱基的概率
2. 选择概率最大的碱基作为预测
3. 可选：使用隐马尔可夫模型（HMM）后处理平滑结果

## 算法步骤

### Racon 流程

#### 步骤 1：Read 比对

将所有 reads 比对到参考序列（contig 或 draft assembly）。

#### 步骤 2：构建 POA

```python
def build_poa(reads):
    poa = PartialOrderGraph()
    for read in reads:
        alignment = align_to_poa(read, poa)
        poa.merge(alignment)
    return poa
```

#### 步骤 3：计算 DP

```python
def compute_consensus(poa):
    # 拓扑排序
    order = topological_sort(poa.nodes)
    
    # DP 初始化
    dp = {node: 0 for node in poa.nodes}
    predecessor = {}
    
    # DP 计算
    for node in order:
        for (prev, node) in poa.incoming_edges(node):
            score = dp[prev] + scoring_function(prev, node)
            if score > dp[node]:
                dp[node] = score
                predecessor[node] = prev
    
    # 回溯
    consensus = backtrack(poa, predecessor)
    return consensus
```

#### 步骤 4：迭代优化

通常需要多轮迭代：
- 第 1 轮：使用原始 reads
- 第 2 轮：使用第 1 轮的共识作为参考
- 第 3 轮：可选，进一步优化

## Worked Example

### Racon 示例

考虑三条 reads 覆盖同一区域（简化示例，忽略质量分数）：

- r₁ = `ACGTAC`
- r₂ = `AGGTAC`
- r₃ = `ACGTGC`

参考序列 = `ACGTAC`

#### 步骤 1：构建 POA

初始 POA（r₁）：
```
A → C → G → T → A → C
```

添加 r₂ (`AGGTAC`)：
- 与 POA 比对：A 匹配，G 匹配，G 替换 C，T 匹配，A 匹配，C 匹配
- 创建分支节点
```
A → C → G → T → A → C
  ↘ G ↗
```
（简化表示，实际 POA 更复杂）

添加 r₃ (`ACGTGC`)：
- 与 POA 比对：A 匹配，C 匹配，G 匹配，T 匹配，G 替换 A，C 匹配
- 进一步扩展图结构

#### 步骤 2：计算 DP

假设节点覆盖度：
- A (起始): 3
- C: 2
- G (位置 3): 2
- T: 2
- A (位置 5): 1
- G (位置 5): 1
- C: 3

使用简单打分：匹配 +1，错配 -1，覆盖度权重

计算最优路径：
```
路径 1: A-C-G-T-A-C (得分: 3+2+2+2+1+3 = 13)
路径 2: A-G-G-T-A-C (得分: 3+1+2+2+1+3 = 12)
路径 3: A-C-G-T-G-C (得分: 3+2+2+2+1+3 = 13)
```

选择路径 1 或 3（得分相同），假设选择路径 1。

#### 步骤 3：生成共识

共识序列 = `ACGTAC`

### Medaka 示例（简化）

假设在某位置，模型输出概率：

- P(A) = 0.1
- P(C) = 0.05
- P(G) = 0.8
- P(T) = 0.05

选择概率最大的碱基 G 作为该位置的共识。

## 复杂度分析

### Racon

#### 时间复杂度

- POA 构建：O(N · L · k)，N 为 read 数，L 为平均长度，k 为平均分支数
- 拓扑排序：O(V + E)，V 和 E 为 POA 的节点和边数
- DP 计算：O(V + E)
- 回溯：O(V)

总时间复杂度：O(N · L · k + V + E)

在实际情况中，V 和 E 与 N · L 成正比，因此约为 O(N · L · k)。

#### 空间复杂度

- POA 存储：O(V + E)
- DP 表：O(V)

总空间复杂度：O(V + E)

### Medaka

#### 时间复杂度

- 神经网络推理：O(L · d)，L 为序列长度，d 为模型复杂度（参数量）
- 后处理：O(L)

总时间复杂度：O(L · d)

#### 空间复杂度

- 模型参数：O(d)
- 中间激活：O(L · h)，h 为隐藏层大小

总空间复杂度：O(d + L · h)

## 与真实工具或流程的连接

### Racon

Racon 是广泛使用的长读长 polishing 工具：

- **Canu 组装器**：使用 Racon 进行 consensus polishing
- **Flye 组装器**：集成 Racon 作为 polishing 步骤
- **Miniasm + Racon**：经典的快速组装流程

### Medaka

Medaka 是 Oxford Nanopore 官方推荐的 polishing 工具：

- **Nanopore 流程**：Guppy basecalling → Medaka polishing
- **与 Racon 对比**：Medaka 直接处理信号，对 Nanopore 数据更优
- **模型选择**：根据测序化学和 read 长度选择不同模型

### PacBio 工具

PacBio 生态使用不同的 consensus 算法：

- **Arrow**：基于条件随机场（CRF）的 consensus
- **CCS**：Circular Consensus Sequencing，通过多次测序生成 HiFi reads

## 常见误区

### Consensus 总是提高准确性

不一定。如果 reads 质量很差或覆盖度不均，consensus 可能引入系统性错误。

### 覆盖度越高越好

不是。过高的覆盖度会增加计算成本，而边际收益递减。通常 30-50x 覆盖度已足够。

### 只需要一轮 polishing

不是。通常需要多轮迭代，特别是对于高错误率数据。

### Racon 和 Medaka 可以互换

不是。Racon 依赖质量分数，适合 PacBio；Medaka 处理原始信号，适合 Nanopore。

## 算法优化

### 并行化

- **分区处理**：将基因组分区并行处理
- **GPU 加速**：Medaka 的神经网络推理可以在 GPU 上加速
- **多线程 POA**：并行处理不同区域的 POA 构建

### 内存优化

- **增量 POA**：分批添加 reads，减少内存峰值
- **稀疏表示**：对稀疏覆盖区域使用压缩存储
- **流式处理**：边比对边生成 consensus，避免存储所有中间结果

### 混合策略

- **层级 polishing**：先用快速方法（Racon），再用精确方法（Medaka）
- **自适应迭代**：根据质量指标决定是否继续迭代
- **局部重 polishing**：只对低质量区域进行额外 polishing

## 参考资料

- Vaser, R., et al. (2017). Fast and accurate de novo genome assembly from long uncorrected reads. *Genome research*, 27(5), 737-746.
- Wick, R. R., et al. (2019). Integrating mapping, assembly and haplotype variant estimation of single-molecule sequencing data using the Medaka genome analysis toolkit. *bioRxiv*.
- Lee, H., et al. (2014). Error correction and assembly complexity of single molecule sequencing reads. *BioRxiv*.

## 相关页面

- [长读长组装](./long-read-assembly.md)
- [重叠检测算法](./overlap-detection.md)
- [PacBio 与 Nanopore](./pacbio-nanopore.md)
- [序列比对基础](../alignment/index.md)

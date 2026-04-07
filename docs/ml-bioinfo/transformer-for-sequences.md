---
sidebar_position: 6
description: Transformer 和自注意力机制在生物序列中的应用，包括注意力计算、位置编码和完整 worked example。
pagination_label: Transformer for Sequences
---

import SummaryBox from '@site/src/components/docs/SummaryBox';
import DefinitionList from '@site/src/components/docs/DefinitionList';

# Transformer 与自注意力机制

<SummaryBox
  summary="Transformer 通过自注意力机制直接建模序列中任意两个位置之间的关系，无需递归计算，是目前最强大的序列建模架构，是现代生物语言模型的基础。"
  bullets={[
    '自注意力机制捕获长程依赖',
    '并行计算，训练效率高',
    '是 ESM、DNABERT 等生物语言模型的核心',
  ]}
/>

## 是什么

Transformer 是 2017 年提出的完全基于注意力机制的序列到序列模型。与 RNN 不同，Transformer 不通过递归处理序列，而是通过自注意力（Self-Attention）机制同时考虑所有位置之间的关系。

> 给定一条序列，Transformer 通过多头自注意力机制计算每个位置对所有位置的依赖，并通过前馈网络进行特征变换。

## 要解决什么生物信息学问题

在实际生物信息学应用中，Transformer 适合的场景包括：

- **蛋白质结构预测**：建模氨基酸间的长程相互作用（如 AlphaFold）
- **大规模预训练语言模型**：ESM、DNABERT、ProtBERT 等
- **变异效应预测**：利用全局上下文信息
- **基因调控预测**：建模远距离调控元件
- **多组学整合**：融合不同模态的数据
- **单细胞分析**：建模细胞状态转换

## 数学模型

### 自注意力机制

给定输入序列 X = [x₁, x₂, ..., x_L]，每个 x_t ∈ ℝ^d。

首先通过线性变换得到 Query、Key、Value：

$$
Q = X W_Q, \quad K = X W_K, \quad V = X W_V
$$

其中 W_Q, W_K, W_V ∈ ℝ^(d×d_k) 是可学习参数。

注意力权重计算：

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

其中：
- QK^T 计算所有位置对的相似度
- 除以 √d_k 进行缩放，防止梯度消失
- softmax 归一化得到注意力权重
- 与 V 加权求和得到输出

### 多头注意力

使用多组 Q、K、V 捕获不同类型的关系：

$$
\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, ..., \text{head}_h)W^O
$$

其中每个 head 的计算：

$$
\text{head}_i = \text{Attention}(QW_i^Q, KW_i^K, VW_i^V)
$$

### 位置编码

由于自注意力本身不包含位置信息，需要添加位置编码：

$$
PE_{(pos, 2i)} = \sin\left(\frac{pos}{10000^{2i/d}}\right)
$$

$$
PE_{(pos, 2i+1)} = \cos\left(\frac{pos}{10000^{2i/d}}\right)
$$

最终输入：

$$
X' = X + PE
$$

### 前馈网络（FFN）

每个位置独立应用前馈网络：

$$
\text{FFN}(x) = \max(0, xW_1 + b_1)W_2 + b_2
$$

### 层归一化（Layer Norm）

$$
\text{LayerNorm}(x) = \frac{x - \mu}{\sigma} \odot \gamma + \beta
$$

### 残差连接

$$
\text{Output} = \text{LayerNorm}(x + \text{Sublayer}(x))
$$

### 完整 Transformer 层

$$
X' = \text{LayerNorm}(X + \text{MultiHeadAttention}(X))
$$

$$
X'' = \text{LayerNorm}(X' + \text{FFN}(X'))
$$

## 算法步骤

### 步骤 1：输入编码

将序列编码为嵌入表示，添加位置编码

### 步骤 2：多头自注意力

1. 计算每个位置的 Query、Key、Value
2. 计算注意力权重矩阵
3. 加权求和得到注意力输出
4. 拼接多头结果并线性变换

### 步骤 3：前馈网络

对每个位置独立应用前馈网络

### 步骤 4：残差连接与层归一化

应用残差连接和层归一化

### 步骤 5：堆叠多层

重复步骤 2-4 多次（通常 6-12 层）

### 步骤 6：输出层

根据任务类型设计输出层：
- 分类：全局池化 + 线性层
- 序列标注：每个位置独立分类
- 回归：线性输出

## Worked Example

考虑一个简化的蛋白质序列任务：使用 Transformer 预测氨基酸的二级结构。

序列片段：S = "ACDE"（长度 L = 4）

假设嵌入维度 d = 4，注意力头数 h = 2，每个头的维度 d_k = 2。

### 步骤 1：输入编码

假设嵌入表示（简化数值）：

```
X = [
  [1.0, 0.5, -0.3, 0.2],  # A
  [0.3, 0.8, 0.1, -0.5],  # C
  [-0.2, 0.4, 0.9, 0.1],  # D
  [0.6, -0.1, 0.3, 0.7],  # E
]
```

位置编码（简化）：

```
PE = [
  [0.0, 1.0, 0.0, 1.0],
  [0.5, 0.9, 0.5, 0.9],
  [0.8, 0.6, 0.8, 0.6],
  [1.0, 0.0, 1.0, 0.0],
]
```

添加位置编码：

```
X' = X + PE = [
  [1.0, 1.5, -0.3, 1.2],
  [0.8, 1.7, 0.6, 0.4],
  [0.6, 1.0, 1.7, 0.7],
  [1.6, -0.1, 1.3, 0.7],
]
```

### 步骤 2：计算 Q、K、V

假设权重矩阵（简化）：

```
W_Q = [
  [0.5, 0.3],
  [-0.2, 0.4],
  [0.1, -0.5],
  [0.3, 0.2],
]
```

计算 Q = X' W_Q：

```
Q = [
  [1.0×0.5 + 1.5×(-0.2) + (-0.3)×0.1 + 1.2×0.3, 1.0×0.3 + 1.5×0.4 + (-0.3)×(-0.5) + 1.2×0.2],
  ...
]
```

类似地计算 K 和 V。

### 步骤 3：计算注意力权重

假设得到 Q、K、V：

```
Q = [
  [0.5, 0.8],   # A
  [0.3, 0.6],   # C
  [0.7, 0.4],   # D
  [0.2, 0.9],   # E
]

K = [
  [0.4, 0.7],
  [0.6, 0.3],
  [0.2, 0.8],
  [0.5, 0.5],
]

V = [
  [0.9, 0.2],
  [0.3, 0.7],
  [0.6, 0.4],
  [0.1, 0.8],
]
```

计算注意力分数 QK^T：

```
QK^T = [
  [0.5×0.4+0.8×0.7, 0.5×0.6+0.8×0.3, 0.5×0.2+0.8×0.8, 0.5×0.5+0.8×0.5],
  [0.3×0.4+0.6×0.7, 0.3×0.6+0.6×0.3, 0.3×0.2+0.6×0.8, 0.3×0.5+0.6×0.5],
  [0.7×0.4+0.4×0.7, 0.7×0.6+0.4×0.3, 0.7×0.2+0.4×0.8, 0.7×0.5+0.4×0.5],
  [0.2×0.4+0.9×0.7, 0.2×0.6+0.9×0.3, 0.2×0.2+0.9×0.8, 0.2×0.5+0.9×0.5],
]

QK^T = [
  [0.76, 0.54, 0.74, 0.65],
  [0.54, 0.36, 0.54, 0.45],
  [0.56, 0.54, 0.46, 0.55],
  [0.71, 0.39, 0.76, 0.55],
]
```

缩放（除以 √d_k = √2 ≈ 1.41）：

```
Scaled = QK^T / 1.41 = [
  [0.54, 0.38, 0.52, 0.46],
  [0.38, 0.26, 0.38, 0.32],
  [0.40, 0.38, 0.33, 0.39],
  [0.50, 0.28, 0.54, 0.39],
]
```

Softmax 归一化（以第一行为例）：

$$
\text{softmax}([0.54, 0.38, 0.52, 0.46]) = \frac{e^{[0.54, 0.38, 0.52, 0.46]}}{\sum e^{[0.54, 0.38, 0.52, 0.46]}}
$$

$$
= \frac{[1.72, 1.46, 1.68, 1.58]}{1.72+1.46+1.68+1.58} = \frac{[1.72, 1.46, 1.68, 1.58]}{6.44} = [0.27, 0.23, 0.26, 0.24]
$$

完整注意力权重矩阵：

```
A = [
  [0.27, 0.23, 0.26, 0.24],
  [0.28, 0.22, 0.28, 0.22],
  [0.26, 0.25, 0.24, 0.25],
  [0.28, 0.21, 0.29, 0.22],
]
```

### 步骤 4：加权求和

计算输出 Attention = A × V：

```
Output = [
  [0.27×0.9+0.23×0.3+0.26×0.6+0.24×0.1, 0.27×0.2+0.23×0.7+0.26×0.4+0.24×0.8],
  ...
]
```

第一行：

$$
[0.27×0.9+0.23×0.3+0.26×0.6+0.24×0.1, 0.27×0.2+0.23×0.7+0.26×0.4+0.24×0.8]
$$

$$
= [0.243+0.069+0.156+0.024, 0.054+0.161+0.104+0.192] = [0.49, 0.51]
$$

### 步骤 5：多头拼接

假设第二个头的输出为 [0.3, 0.7]，拼接并线性变换得到最终输出。

这个简化的例子展示了 Transformer 如何通过自注意力机制计算每个位置对所有位置的依赖关系。

## 复杂度分析

### 时间复杂度

- 自注意力：O(L² × d)，其中 L 是序列长度，d 是嵌入维度
- 前馈网络：O(L × d²)
- 单层总复杂度：O(L² × d + L × d²)
- 多层总复杂度：O(n_layers × (L² × d + L × d²))

与序列长度平方相关，对长序列计算成本高。

### 空间复杂度

- 存储注意力矩阵：O(L²)
- 存储参数：O(n_layers × d²)
- 总空间复杂度：O(L² + n_layers × d²)

## 与真实工具或流程的连接

Transformer 在生物信息学中的代表性应用：

- **AlphaFold2**（2021）：基于 Transformer 的蛋白质结构预测
- **ESM**（2021）：蛋白质语言模型
- **DNABERT**（2020）：DNA 语言模型
- **ProtBERT**（2020）：蛋白质语言模型
- **Enformer**（2021）：基因表达预测
- **HyenaDNA**（2023）：长序列 DNA 建模

这些工具的特点：
- 利用自注意力捕获长程依赖
- 大规模预训练后迁移学习
- 在多个下游任务上表现优异

## Transformer 与 RNN/CNN 的对比

| 特性 | CNN | RNN | Transformer |
|------|-----|-----|-------------|
| 局部模式检测 | 强 | 弱 | 中 |
| 长程依赖 | 弱 | 中 | 强 |
| 并行计算 | 是 | 否 | 是 |
| 序列长度限制 | 无 | 梯度问题 | O(L²) 复杂度 |
| 参数量 | 少 | 中 | 多 |
| 可解释性 | 强 | 中 | 弱 |

## 常见误区

### Transformer 总是优于 RNN 和 CNN

不是。对于短序列和局部模式检测任务，CNN 可能更高效。对于中等长度序列，RNN 可能足够。Transformer 的优势在长序列和复杂依赖时才明显。

### 注意力权重等于生物学重要性

不一定。注意力权重反映模型对预测的贡献，但不直接等同于生物学因果关系。

### 位置编码可以学习

可以学习，但固定位置编码（正弦/余弦）具有外推能力，能处理比训练时更长的序列。

### Transformer 不需要领域知识

不是。输入设计、预训练策略、任务定义仍高度依赖领域知识。

### 越多注意力头越好

不是。过多的头可能导致冗余和过拟合。通常 4-16 个头足够。

## 算法变体与优化

### 线性注意力

降低复杂度到 O(L × d)：

$$
\text{Attention}(Q, K, V) = \phi(Q) (\phi(K)^T V)
$$

其中 φ 是核函数。

### 局部注意力

限制每个位置只关注局部窗口：

$$
\text{Attention}_i = \sum_{j=i-w}^{i+w} \alpha_{ij} V_j
$$

其中 w 是窗口大小。

### 稀疏注意力

使用稀疏模式降低计算量：

- 全局注意力：少数位置关注所有位置
- 带状注意力：每个位置关注局部带状区域
- 随机注意力：随机选择注意力模式

### 相对位置编码

使用相对位置而非绝对位置：

$$
e_{ij} = \frac{(x_i W_Q)(x_j W_K + r_{i-j})^T}{\sqrt{d_k}}
$$

其中 `$r_{i-j}$` 是相对位置嵌入。

### Rotary Position Embedding（RoPE）

通过旋转操作编码相对位置：

$$
f(x, m) = R_{\Theta,m} x
$$

其中 $R_{\Theta,m}$ 是旋转矩阵。

### Flash Attention

优化注意力计算的内存访问模式，加速训练：

- 分块计算注意力
- 减少内存读写
- 不改变计算结果

## 超参数选择

### 嵌入维度（d）

- 小模型：128-256
- 中模型：512-768
- 大模型：1024-2048

### 注意力头数（h）

- 通常 d/h = 64
- 小模型：4-8 头
- 大模型：16-32 头

### 层数

- 小模型：2-6 层
- 中模型：6-12 层
- 大模型：12-48 层

### 前馈网络维度

- 通常为嵌入维度的 2-4 倍
- FFN_dim = 4 × d

### Dropout

- 注意力 dropout：0.1-0.2
- 前馈网络 dropout：0.1-0.3
- 残差 dropout：0.1-0.2

### 学习率

- 预训练：1e-4 到 5e-4
- 微调：1e-5 到 1e-4
- 使用 warmup 和衰减

## 训练技巧

### Warmup

初始阶段使用较小的学习率，逐步增加到目标值：

$$
\eta_t = \eta_{\max} \cdot \min\left(\frac{t}{T_{warmup}}, 1\right)
$$

### 学习率衰减

使用余弦衰减或线性衰减：

$$
\eta_t = \eta_{\min} + \frac{1}{2}(\eta_{\max} - \eta_{\min})\left(1 + \cos\left(\frac{\pi t}{T_{total}}\right)\right)
$$

### 梯度裁剪

防止梯度爆炸：

$$
g \leftarrow \begin{cases}
g & \|g\| \leq \theta \\
\theta \cdot \frac{g}{\|g\|} & \|g\| > \theta
\end{cases}
$$

### 混合精度训练

使用 FP16 加速训练，减少显存占用。

## 参考资料

- Vaswani, A., et al. (2017). Attention is all you need. *Advances in neural information processing systems*, 30.
- Rives, A., et al. (2021). Biological structure and function emerge from scaling unsupervised learning to 250 million protein sequences. *Proceedings of the National Academy of Sciences*, 118(15), e2016239118.
- Ji, Y., et al. (2021). DNABERT: pre-trained Bidirectional Encoder Representations from Transformers model for DNA-language in genome. *Bioinformatics*, 37(15), 2112-2119.
- Avsec, Ž., et al. (2021). Effective gene expression prediction from sequence by integrating long-range interactions. *Nature methods*, 18(11), 1423-1433.

## 相关页面

- [序列深度学习](./deep-learning-for-sequences.md)
- [嵌入与语言模型](./embeddings-and-language-models.md)
- [CNN for Sequences](./cnn-for-sequences.md)
- [RNN/LSTM for Sequences](./rnn-lstm-for-sequences.md)
- [AlphaFold 与结构预测](../structure-bioinfo/alphafold-and-structure-prediction.md)

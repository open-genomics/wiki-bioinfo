---
sidebar_position: 5
description: 循环神经网络和长短期记忆网络在生物序列中的应用，包括递归公式、门控机制和完整 worked example。
pagination_label: RNN/LSTM for Sequences
---

import SummaryBox from '@site/src/components/docs/SummaryBox';
import DefinitionList from '@site/src/components/docs/DefinitionList';

# 循环神经网络（RNN）与 LSTM

<SummaryBox
  summary="循环神经网络通过隐状态传递信息，能够建模序列中的长程依赖关系；LSTM 通过门控机制解决了标准 RNN 的梯度消失问题，是序列建模的经典架构。"
  bullets={[
    '隐状态捕获序列上下文信息',
    'LSTM 的门控机制实现选择性记忆和遗忘',
    '适合处理变长序列和时序依赖',
  ]}
/>

## 是什么

循环神经网络（Recurrent Neural Network, RNN）是一种专门用于处理序列数据的神经网络架构。与 CNN 不同，RNN 通过隐状态（hidden state）在时间步之间传递信息，从而捕获序列中的依赖关系。

长短期记忆网络（Long Short-Term Memory, LSTM）是 RNN 的一种改进变体，通过引入门控机制（gate mechanism）解决了标准 RNN 的梯度消失问题，能够学习更长程的依赖。

> 给定一条序列，RNN/LSTM 通过递归地更新隐状态，在每个位置产生输出或最终汇总表示。

## 要解决什么生物信息学问题

在实际生物信息学应用中，RNN/LSTM 适合的场景包括：

- **基因预测**：识别编码区和非编码区
- **剪接位点预测**：利用上下文信息识别边界
- **蛋白质二级结构预测**：氨基酸序列到结构的映射
- **启动子/增强子识别**：利用远距离调控信息
- **单细胞轨迹分析**：建模细胞发育过程
- **序列生成**：生成新的生物序列

## 数学模型

### 标准 RNN

给定序列 X = [x₁, x₂, ..., x_T]，每个 x_t ∈ ℝ^K。

隐状态更新公式：

$$
h_t = \sigma(W_{hh} h_{t-1} + W_{xh} x_t + b_h)
$$

输出公式：

$$
y_t = \sigma'(W_{hy} h_t + b_y)
$$

其中：
- h_t ∈ ℝ^H 是时间步 t 的隐状态
- W_{hh} ∈ ℝ^(H×H) 是隐状态到隐状态的权重
- W_{xh} ∈ ℝ^(H×K) 是输入到隐状态的权重
- W_{hy} ∈ ℝ^(O×H) 是隐状态到输出的权重
- σ 和 σ' 是激活函数

### LSTM

LSTM 通过三个门控机制控制信息流：

#### 遗忘门（Forget Gate）

$$
f_t = \sigma(W_f \cdot [h_{t-1}, x_t] + b_f)
$$

决定从细胞状态中遗忘多少信息。

#### 输入门（Input Gate）

$$
i_t = \sigma(W_i \cdot [h_{t-1}, x_t] + b_i)
$$

$$
\tilde{C}_t = \tanh(W_C \cdot [h_{t-1}, x_t] + b_C)
$$

决定向细胞状态中添加多少新信息。

#### 细胞状态更新

$$
C_t = f_t \odot C_{t-1} + i_t \odot \tilde{C}_t
$$

其中 ⊙ 表示逐元素乘法。

#### 输出门（Output Gate）

$$
o_t = \sigma(W_o \cdot [h_{t-1}, x_t] + b_o)
$$

$$
h_t = o_t \odot \tanh(C_t)
$$

决定输出多少信息作为新的隐状态。

### GRU（Gated Recurrent Unit）

GRU 是 LSTM 的简化版本，只有两个门：

#### 更新门（Update Gate）

$$
z_t = \sigma(W_z \cdot [h_{t-1}, x_t] + b_z)
$$

#### 重置门（Reset Gate）

$$
r_t = \sigma(W_r \cdot [h_{t-1}, x_t] + b_r)
$$

#### 隐状态更新

$$
\tilde{h}_t = \tanh(W_h \cdot [r_t \odot h_{t-1}, x_t] + b_h)
$$

$$
h_t = (1 - z_t) \odot h_{t-1} + z_t \odot \tilde{h}_t
$$

## 算法步骤

### 标准 RNN

### 步骤 1：初始化

初始化隐状态 h₀（通常为零向量或随机初始化）

### 步骤 2：前向传播

对每个时间步 t = 1, 2, ..., T：
1. 计算 h_t = σ(W_{hh} h_{t-1} + W_{xh} x_t + b_h)
2. 计算 y_t = σ'(W_{hy} h_t + b_y)

### 步骤 3：损失计算

根据任务类型计算损失（如交叉熵、MSE）

### 步骤 4：反向传播

通过时间反向传播（BPTT）更新所有参数

### LSTM

### 步骤 1：初始化

初始化隐状态 h₀ 和细胞状态 C₀

### 步骤 2：前向传播

对每个时间步 t = 1, 2, ..., T：
1. 计算遗忘门 f_t
2. 计算输入门 i_t 和候选细胞状态 \tilde{C}_t
3. 更新细胞状态 C_t
4. 计算输出门 o_t
5. 更新隐状态 h_t
6. 计算输出 y_t

### 步骤 3：损失计算

根据任务类型计算损失

### 步骤 4：反向传播

通过 BPTT 更新所有参数

## Worked Example

考虑一个简化的 DNA 序列分类任务：使用 LSTM 预测序列是否为启动子。

序列：S = "TATAAA"（长度 T = 6）

假设使用 one-hot 编码，隐藏层维度 H = 4。

### 步骤 1：初始化

h₀ = [0, 0, 0, 0]
C₀ = [0, 0, 0, 0]

### 步骤 2：时间步 t=1（输入 x₁ = T）

假设权重和偏置如下（简化数值）：

遗忘门：
$$
f_1 = \sigma(W_f \cdot [h_0, x_1] + b_f) = \sigma([0.3, -0.2, 0.1, -0.1]) = [0.57, 0.45, 0.52, 0.48]
$$

输入门：
$$
i_1 = \sigma(W_i \cdot [h_0, x_1] + b_i) = \sigma([0.5, 0.3, -0.1, 0.2]) = [0.62, 0.57, 0.48, 0.55]
$$

候选细胞状态：
$$
\tilde{C}_1 = \tanh(W_C \cdot [h_0, x_1] + b_C) = \tanh([0.8, -0.5, 0.6, -0.3]) = [0.66, -0.46, 0.54, -0.29]
$$

细胞状态更新：
$$
C_1 = f_1 \odot C_0 + i_1 \odot \tilde{C}_1 = [0, 0, 0, 0] + [0.41, -0.26, 0.26, -0.16] = [0.41, -0.26, 0.26, -0.16]
$$

输出门：
$$
o_1 = \sigma(W_o \cdot [h_0, x_1] + b_o) = \sigma([0.4, 0.2, -0.3, 0.1]) = [0.60, 0.55, 0.43, 0.52]
$$

隐状态更新：
$$
h_1 = o_1 \odot \tanh(C_1) = [0.60, 0.55, 0.43, 0.52] \odot \tanh([0.41, -0.26, 0.26, -0.16])
$$

$$
h_1 = [0.60, 0.55, 0.43, 0.52] \odot [0.39, -0.25, 0.25, -0.16] = [0.23, -0.14, 0.11, -0.08]
$$

### 步骤 3：继续处理后续时间步

类似地处理 t=2, 3, 4, 5, 6，每个时间步更新隐状态和细胞状态。

### 步骤 4：最终预测

使用最后一个隐状态 h₆ 进行预测：

$$
y = \sigma(W_{hy} \cdot h_6 + b_y)
$$

假设 h₆ = [0.8, 0.6, -0.3, 0.4]，W_{hy} = [0.5, 0.3, -0.2, 0.4]，b_y = -0.3：

$$
y = \sigma(0.5 \times 0.8 + 0.3 \times 0.6 - 0.2 \times (-0.3) + 0.4 \times 0.4 - 0.3)
$$

$$
y = \sigma(0.4 + 0.18 + 0.06 + 0.16 - 0.3) = \sigma(0.5) ≈ 0.62
$$

由于 y > 0.5，预测该序列为启动子。

这个简化的例子展示了 LSTM 如何通过门控机制逐步更新细胞状态和隐状态，捕获序列中的上下文信息。

## 复杂度分析

### 时间复杂度

- 单步 RNN：O(H² + HK + HO)
- 单步 LSTM：O(4H² + 4HK + HO)（4 个门）
- 完整序列：O(T × (H² + HK + HO)) 对于 RNN
- 完整序列：O(T × (4H² + 4HK + HO)) 对于 LSTM

与序列长度 T 线性相关，但每个时间步的计算成本高于 CNN。

### 空间复杂度

- 存储参数：O(H² + HK + HO) 对于 RNN
- 存储参数：O(4H² + 4HK + HO) 对于 LSTM
- 存储 BPTT 梯度：O(T × H)

## 与真实工具或流程的连接

RNN/LSTM 在生物信息学中的代表性应用：

- **DeepGene**（2015）：基于 LSTM 的基因预测
- **SpliceAI**（2019）：基于深度学习的剪接位点预测
- **DeepPromoter**（2018）：启动子识别
- **Basset**（2016）：结合 CNN 和 RNN 的染色质可及性预测
- **scVelo**（2020）：单细胞 RNA 速度分析（使用类似 RNN 的动力学模型）

这些工具的特点：
- 利用长程依赖信息
- 适合变长序列
- 可以结合 CNN（如 DanQ）

## LSTM 与标准 RNN 的对比

| 特性 | 标准 RNN | LSTM |
|------|----------|------|
| 门控机制 | 无 | 遗忘门、输入门、输出门 |
| 梯度消失 | 严重 | 缓解 |
| 长程依赖 | 难以学习 | 能够学习 |
| 参数量 | 少 | 多（约 4 倍） |
| 计算速度 | 快 | 较慢 |
| 训练难度 | 较难 | 较容易 |

## 常见误区

### RNN 总是优于 CNN

不是。CNN 在检测局部 motif 时更高效，RNN 在建模长程依赖时更有优势。选择取决于任务特点。

### LSTM 能解决所有序列问题

不能。LSTM 仍然有梯度爆炸问题，且计算成本高。对于很多任务，CNN 或 Transformer 可能更合适。

### 隐状态维度越大越好

不是。过大的隐状态会增加参数量和过拟合风险。需要根据数据量和任务复杂度选择。

### RNN 只能处理时序数据

不是。RNN 可以处理任何序列数据，包括 DNA、蛋白质、文本等。

### 单向 RNN 足够

不是。对于某些任务（如剪接位点预测），双向 RNN（Bi-RNN）能同时利用上下文信息，效果更好。

## 算法变体与优化

### 双向 RNN（Bi-RNN）

同时处理正向和反向序列：

$$
\overrightarrow{h}_t = \text{RNN}(x_t, \overrightarrow{h}_{t-1})
$$

$$
\overleftarrow{h}_t = \text{RNN}(x_t, \overleftarrow{h}_{t+1})
$$

$$
h_t = [\overrightarrow{h}_t, \overleftarrow{h}_t]
$$

### 多层 RNN（Stacked RNN）

堆叠多个 RNN 层，学习更复杂的特征：

$$
h_t^{(l)} = \text{RNN}(h_t^{(l-1)}, h_{t-1}^{(l)})
$$

### Attention RNN

结合注意力机制，动态加权不同位置的隐状态：

$$
c_t = \sum_{i=1}^T \alpha_{ti} h_i
$$

其中 α_{ti} 是注意力权重。

### 梯度裁剪（Gradient Clipping）

防止梯度爆炸：

$$
g \leftarrow \begin{cases}
g & \|g\| \leq \theta \\
\theta \cdot \frac{g}{\|g\|} & \|g\| > \theta
\end{cases}
$$

### 层归一化（Layer Normalization）

加速训练，稳定梯度：

$$
\tilde{h}_t = \frac{h_t - \mu}{\sigma} \odot \gamma + \beta
$$

## 超参数选择

### 隐状态维度（H）

- 小数据集：32-128
- 大数据集：128-512

### 层数

- 1-2 层通常足够
- 复杂任务可尝试 2-4 层

### Dropout

- RNN 输出层：0.2-0.5
- LSTM/GRU 门控：通常不使用 dropout

### 学习率

- Adam 优化器：1e-3 到 1e-4
- SGD 优化器：1e-2 到 1e-3

### 序列长度

- 过长序列可能导致梯度问题
- 可考虑截断或分段处理

## 参考资料

- Hochreiter, S., & Schmidhuber, J. (1997). Long short-term memory. *Neural computation*, 9(8), 1735-1780.
- Cho, K., et al. (2014). Learning phrase representations using RNN encoder-decoder for statistical machine translation. *arXiv preprint arXiv:1406.1078*.
- Jaganathan, K., et al. (2019). Predicting splicing from primary sequence with deep learning. *Nature*, 571(7763), 115-119.
- Berg, J. A., et al. (2019). DeepPromoter: Promoter prediction using deep learning. *BMC bioinformatics*, 20(1), 1-13.

## 相关页面

- [序列深度学习](./deep-learning-for-sequences.md)
- [嵌入与语言模型](./embeddings-and-language-models.md)
- [CNN for Sequences](./cnn-for-sequences.md)
- [Transformer for Sequences](./transformer-for-sequences.md)
- [HMM](../models/hmm.md)

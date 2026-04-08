---
description: Nanopore Basecalling 算法的详细实现，包括 HMM 模型、神经网络架构和信号处理。
title: "Basecalling 算法"
---

import SummaryBox from '@site/src/components/docs/SummaryBox';
import DefinitionList from '@site/src/components/docs/DefinitionList';


<SummaryBox
  summary="Basecalling 是将 Nanopore 原始电流信号转换为碱基序列的核心算法，现代工具使用神经网络或隐马尔可夫模型直接从信号预测 k-mer 序列。"
  bullets={[
    'HMM 模型通过状态转移和发射概率建模信号与 k-mer 的关系',
    '神经网络（CNN/RNN/Transformer）直接学习信号到碱基的映射',
    '信号归一化和上下文建模是准确性的关键',
  ]}
/>

## 是什么

Basecalling 算法解决以下问题：

> 给定 Nanopore 测序产生的离子电流时间序列信号，推断出对应的 DNA/RNA 碱基序列。

Nanopore 测序不直接读取碱基，而是测量 DNA/RNA 分子穿过纳米孔时引起的离子电流变化。不同 k-mer 会产生特征性的电流信号模式。

## 要解决什么生物信息学问题

在实际生物信息学应用中，basecalling 适合的场景包括：

- **实时测序**：在测序过程中实时生成碱基序列
- **直接 RNA 测序**：无需反转录直接测序 RNA
- **修饰检测**：通过信号异常检测碱基修饰
- **质量评估**：评估测序质量和错误模式

## 数学模型

### 信号生成过程

当 DNA 分子穿过纳米孔时，电流信号可以建模为：

$$
I(t) = f(k(t)) + \epsilon(t)
$$

其中：
- `I(t)` 是时刻 `t` 的电流信号
- `k(t)` 是时刻 `t` 位于孔内的 k-mer
- f(·) 是 k-mer 到电流的映射函数
- ε(t) 是噪声（包括热噪声、电子噪声、分子动力学噪声）

### 问题形式化

给定信号序列 S = s₁, s₂, ..., sₙ，目标是找到碱基序列 B = b₁, b₂, ..., bₘ，使得：

$$
B^* = \arg\max_B P(B | S) = \arg\max_B \frac{P(S | B) P(B)}{P(S)}
$$

假设先验 P(B) 均匀，则等价于最大化似然：

$$
B^* = \arg\max_B P(S | B)
$$

## HMM 模型

### HMM 定义

HMM 将 basecalling 建模为隐马尔可夫模型：

- **隐状态**：k-mer 序列（每个状态对应一个 k-mer）
- **观测值**：电流信号
- **转移概率**：从一个 k-mer 转移到下一个 k-mer 的概率
- **发射概率**：给定 k-mer 产生特定电流信号的概率

### 状态空间

对于 k-mer 大小 k，状态空间大小为 4ᵏ（A, C, G, T 的组合）。

例如，k=5 时有 4⁵ = 1024 个状态。

### 转移概率

由于 DNA 序列是连续的，转移具有约束：

- 从 k-mer `x₁x₂...xₖ` 只能转移到 `x₂...xₖy`，其中 `y ∈ {A, C, G, T}`
- 因此每个状态最多有 4 个可能的转移

转移概率矩阵 `A`：

$$
A_{ij} = P(q_{t+1} = j | q_t = i)
$$

其中 `q_t` 是时刻 `t` 的隐状态。

### 发射概率

发射概率 B 定义为：

$$
b_i(s) = P(S_t = s | q_t = i)
$$

通常假设电流信号服从高斯分布：

$$
b_i(s) = \frac{1}{\sqrt{2\pi\sigma_i^2}} \exp\left(-\frac{(s - \mu_i)^2}{2\sigma_i^2}\right)
$$

其中 `μᵢ` 和 `σᵢ` 是状态 `i` 的均值和标准差。

### Viterbi 算法

使用 Viterbi 算法找到最可能的隐状态序列：

定义 `δₜ(i)` 为：时刻 `t` 处于状态 `i` 的最优路径得分。

递推公式：

$$
\delta_t(i) = \max_{j} [\delta_{t-1}(j) \cdot A_{ji}] \cdot b_i(s_t)
$$

回溯得到最优状态序列，然后转换为碱基序列。

## 神经网络模型

现代 basecaller（如 Guppy、Bonito）使用深度神经网络。

### CNN 架构

早期 basecaller 使用卷积神经网络：

```
Signal → 1D Conv → ReLU → Pool → Conv → ... → FC → Softmax → k-mer Probabilities
```

**优势**：
- 局部特征提取能力强
- 计算效率高
- 适合处理固定长度窗口

**劣势**：
- 长距离依赖建模能力弱
- 需要固定输入长度

### RNN/LSTM 架构

循环神经网络可以处理变长序列：

```
Signal → Embedding → LSTM → LSTM → ... → FC → Softmax → Base Probabilities
```

**优势**：
- 自然处理变长序列
- 建模长距离依赖
- 适合实时 streaming

**劣势**：
- 训练较慢
- 并行化困难

### Transformer 架构

最新的 basecaller（如 Dorado）使用 Transformer：

```
Signal → Embedding → Multi-Head Attention → FFN → ... → FC → Softmax
```

**优势**：
- 最强的长距离依赖建模
- 高度并行化
- 可以处理全局上下文

**劣势**：
- 计算资源需求高
- 需要大量训练数据

### 训练目标

通常使用交叉熵损失：

$$
L = -\sum_{t=1}^{T} \sum_{b \in \{A,C,G,T\}} y_{t,b} \log(\hat{p}_{t,b})
$$

其中 `$y_{t,b}$` 是真实标签的 one-hot 编码，`$\hat{p}_{t,b}$` 是预测概率。

## 信号处理

### 归一化

原始信号需要归一化以消除批次效应：

**Z-score 归一化**：

$$
s'_t = \frac{s_t - \mu}{\sigma}
$$

其中 μ 和 σ 是信号的均值和标准差。

**分位数归一化**：

将信号映射到固定范围（如 [0, 1]）：

$$
s'_t = \frac{s_t - q_{0.01}}{q_{0.99} - q_{0.01}}
$$

### 滑动窗口

由于信号与 k-mer 的对应关系不确定，使用滑动窗口：

1. 提取固定长度窗口（如 400 个信号点）
2. 预测窗口中心的 k-mer
3. 滑动窗口预测整个序列

### 上下文聚合

提高准确性需要考虑更长的上下文：

- **前向-后向**：结合前后信号
- **多头注意力**：在 Transformer 中聚合全局信息
- **残差连接**：保留低层特征

## 算法步骤

### HMM Basecalling 流程

#### 步骤 1：模型训练

1. 收集训练数据：已知序列 + 对应信号
2. 估计每个 k-mer 的发射分布（均值、方差）
3. 设定转移概率（通常设为均匀）

#### 步骤 2：信号预处理

```python
def preprocess_signal(raw_signal):
    # 归一化
    normalized = (raw_signal - mean(raw_signal)) / std(raw_signal)
    # 可选：滤波去噪
    filtered = lowpass_filter(normalized, cutoff=1000)
    return filtered
```

#### 步骤 3：Viterbi 解码

```python
def viterbi_decode(signal, transition, emission):
    T = len(signal)
    N = num_states
    
    # 初始化
    delta = np.zeros((T, N))
    psi = np.zeros((T, N), dtype=int)
    
    delta[0] = np.log(emission[:, signal[0]])
    
    # 递推
    for t in range(1, T):
        for j in range(N):
            scores = delta[t-1] + np.log(transition[:, j])
            psi[t, j] = np.argmax(scores)
            delta[t, j] = scores[psi[t, j]] + np.log(emission[j, signal[t]])
    
    # 回溯
    states = np.zeros(T, dtype=int)
    states[-1] = np.argmax(delta[-1])
    for t in range(T-2, -1, -1):
        states[t] = psi[t+1, states[t+1]]
    
    return states
```

#### 步骤 4：k-mer 到碱基转换

将 k-mer 序列转换为碱基序列（取每个 k-mer 的第一个碱基）。

### 神经网络 Basecalling 流程

#### 步骤 1：模型训练

1. 准备训练数据集
2. 设计网络架构（CNN/RNN/Transformer）
3. 训练模型最小化交叉熵损失
4. 验证和测试

#### 步骤 2：信号预处理

```python
def preprocess_signal(raw_signal):
    # 归一化
    normalized = normalize(raw_signal)
    # 分段
    chunks = split_into_chunks(normalized, window_size=400, stride=5)
    return chunks
```

#### 步骤 3：推理

```python
def basecall_signal(model, signal_chunks):
    predictions = []
    for chunk in signal_chunks:
        prob = model(chunk)  # 输出 k-mer 概率
        base = argmax(prob)
        predictions.append(base)
    return predictions
```

#### 步骤 4：后处理

可选的后处理步骤：
- HMM 平滑
- 质量分数校准
- 同聚物校正

## Worked Example

### 简化 HMM 示例

假设 k=2，只有 4 个状态：AA, AC, AG, AT（简化示例）

信号序列：[10.5, 12.3, 11.8, 13.2]

发射分布（均值）：
- AA: μ=10.0, σ=0.5
- AC: μ=11.0, σ=0.5
- AG: μ=12.0, σ=0.5
- AT: μ=13.0, σ=0.5

转移概率：均匀（每个状态到下一个状态概率相等）

#### 步骤 1：计算发射概率

对于信号 10.5：
- P(10.5|AA) ≈ exp(-(10.5-10)²/2) ≈ 0.88
- P(10.5|AC) ≈ exp(-(10.5-11)²/2) ≈ 0.88
- P(10.5|AG) ≈ exp(-(10.5-12)²/2) ≈ 0.32
- P(10.5|AT) ≈ exp(-(10.5-13)²/2) ≈ 0.04

类似计算其他信号点。

#### 步骤 2：Viterbi 递推

初始化：
- δ₁(AA) = 0.88
- δ₁(AC) = 0.88
- δ₁(AG) = 0.32
- δ₁(AT) = 0.04

递推（简化）：
- `δ₂(AC) = max(δ₁·A) · P(12.3|AC) ≈ 0.88 · 0.04 = 0.04`
- `δ₂(AG) = max(δ₁·A) · P(12.3|AG) ≈ 0.88 · 0.88 = 0.77`
- ...

#### 步骤 3：回溯

得到最优状态序列，例如：AA → AG → AG → AT

#### 步骤 4：转换为碱基

取每个 k-mer 的第一个碱基：`A → A → A → A`

最终序列：AAAA

## 复杂度分析

### HMM

#### 时间复杂度

- Viterbi 算法：O(T · N²)，T 为信号长度，N 为状态数（4ᵏ）
- 由于转移约束，实际为 O(T · N · 4) = O(T · N)

总时间复杂度：O(T · 4ᵏ)

#### 空间复杂度

- DP 表：O(T · N)

总空间复杂度：O(T · 4ᵏ)

### 神经网络

#### 时间复杂度

- CNN：O(T · d)，d 为模型复杂度（参数量 × 计算量）
- RNN：O(T · d)
- Transformer：O(T² · d)（自注意力）

总时间复杂度：O(T · d) 或 O(T² · d)

#### 空间复杂度

- 模型参数：O(d)
- 中间激活：O(T · h)，h 为隐藏层大小

总空间复杂度：O(d + T · h)

## 与真实工具或流程的连接

### Guppy

Oxford Nanopore 的官方 basecaller：

- **多种模型**：fast, high-accuracy, super-accuracy
- **实时模式**：支持 streaming basecalling
- **GPU 加速**：利用 GPU 加速推理
- **多种化学**：适配不同测序化学版本

### Bonito

开源的神经网络 basecaller：

- **模块化设计**：易于自定义和扩展
- **支持多种架构**：CNN, LSTM, Transformer
- **可训练**：用户可以训练自己的模型

### Dorado

最新的 basecaller，基于 Transformer：

- **更高准确性**：利用 Transformer 的强大建模能力
- **GPU 优化**：高度优化的 GPU 实现
- **修饰检测**：集成碱基修饰检测

## 常见误区

### Basecalling 只需要一次

不是。通常需要多次迭代，特别是对于低质量数据。

### 信号归一化不重要

重要。归一化显著影响模型性能，必须正确处理。

### HMM 已经过时

不是。HMM 仍用于某些场景，特别是作为神经网络的后处理步骤。

### 所有 basecaller 一样

不是。不同 basecaller 在准确性、速度、资源需求上有显著差异。

## 算法优化

### 硬件加速

- **GPU 加速**：神经网络推理在 GPU 上可加速 10-100 倍
- **专用芯片**：Google Coral、Edge TPU 等边缘设备
- **量化**：降低数值精度（FP16, INT8）减少计算量

### 算法优化

- **模型剪枝**：移除不重要的神经元
- **知识蒸馏**：用大模型训练小模型
- **早停机制**：实时 basecalling 中提前终止

### 流式处理

- **滑动窗口缓存**：避免存储整个信号
- **增量解码**：边接收信号边 basecalling
- **自适应采样**：根据信号质量调整采样率

## 参考资料

- Timp, W., et al. (2016). Nanopore sequencing: electrical measurements of the code of life. *IEEE Transactions on Nanobioscience*, 15(3), 260-267.
- Boža, T. T., et al. (2020). Nanopore signal processing with hidden Markov models. *Bioinformatics*, 36(7), 2105-2111.
- Wick, R. R., et al. (2019). Integrating mapping, assembly and haplotype variant estimation of single-molecule sequencing data using the Medaka genome analysis toolkit. *BioRxiv*.

## 相关页面

- [PacBio 与 Nanopore](./pacbio-nanopore.md)
- [Consensus 算法](./consensus-algorithm.md)
- [结构变异检测](./sv-detection.md)
- [概率、图与动态规划预备](../foundations/probability-and-graphs.md)

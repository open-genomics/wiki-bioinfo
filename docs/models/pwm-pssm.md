---
sidebar_position: 4
description: PWM 与 PSSM 的详细实现：理解位置权重矩阵和位置特异打分矩阵的数学原理、打分算法和实际应用。
pagination_label: PWM 与 PSSM
---

import SummaryBox from '@site/src/components/docs/SummaryBox';
import DefinitionList from '@site/src/components/docs/DefinitionList';

# PWM 与 PSSM

<SummaryBox
  summary="PWM（位置权重矩阵）和 PSSM（位置特异打分矩阵）是 motif 的核心表示方法：它们通过位置相关的统计权重，使得我们可以对任意候选片段计算'像不像这个 motif'的得分。"
  bullets={[
    'PWM 是基于对数比值的打分矩阵，PSSM 是其应用形式',
    '核心思想是用背景概率归一化，突出 motif 的统计特征',
    '它是 motif 扫描和序列 logo 可视化的基础'
  ]}
/>

## 是什么

PWM（Position Weight Matrix，位置权重矩阵）和 PSSM（Position-Specific Scoring Matrix，位置特异打分矩阵）是描述序列 motif 的经典表示方式。

它们的核心思想是：一个 motif 不是要求每个位置都完全一样，而是允许每个位置对不同字符有不同偏好。

## 要解决什么生物信息学问题

很多真实序列模式并不是“固定字符串”，而是：

- 某些位置非常保守；
- 某些位置允许多种字符；
- 整体上呈现统计偏好而不是绝对规则。

PWM / PSSM 让我们可以用矩阵形式刻画这种偏好，并用一个统一框架来“打分”候选序列片段。

## 数学模型

### 从 PFM 到 PWM

给定位置频率矩阵 PFM，其中 $f_{i,c}$ 表示位置 $i$ 上字符 $c$ 的频率，PWM 的定义为：

$$
w_{i,c} = \log_2\left(\frac{f_{i,c}}{b_c}\right)
$$

其中：
- $w_{i,c}$ 是位置 $i$ 上字符 $c$ 的权重
- $f_{i,c}$ 是位置 $i$ 上字符 $c$ 的频率
- $b_c$ 是字符 $c$ 的背景频率

为了避免零概率，通常使用伪计数：

$$
\tilde{f}_{i,c} = \frac{\text{count}_{i,c} + \alpha}{N + 4\alpha}
$$

$$
w_{i,c} = \log_2\left(\frac{\tilde{f}_{i,c}}{b_c}\right)
$$

### PSSM 打分

对于候选序列片段 $s = s_1s_2...s_L$，其 PSSM 得分为：

$$
\text{score}(s) = \sum_{i=1}^{L} w_{i,s_i}
$$

### 概率解释

PSSM 得分可以理解为对数似然比：

$$
\text{score}(s) = \log_2\left(\frac{P(s|\text{motif})}{P(s|\text{background})}\right)
$$

其中：
- $P(s|\text{motif}) = \prod_{i=1}^{L} f_{i,s_i}$ 是 motif 模型下的序列概率
- $P(s|\text{background}) = \prod_{i=1}^{L} b_{s_i}$ 是背景模型下的序列概率

得分越高，说明序列越像由 motif 生成，而非随机背景。

## 算法步骤

### 构建 PWM

**算法1：从 PFM 构建 PWM**

```
输入：PFM（或原始计数），背景频率 b_c，伪计数 α
输出：PWM

1. for i = 1 to L:
     for each character c ∈ {A, C, G, T}:
        f_ic = (PFM[i][c] + α) / (N + 4α)
        PWM[i][c] = log₂(f_ic / b_c)
2. return PWM
```

**时间复杂度**：O(L)

### PSSM 扫描

**算法2：使用 PSSM 扫描序列**

```
输入：PWM，序列 seq，motif 长度 L
输出：每个起始位置的得分

1. for pos = 1 to (|seq| - L + 1):
     score = 0
     for i = 1 to L:
        c = seq[pos + i - 1]
        score += PWM[i][c]
     output score at position pos
```

**时间复杂度**：O(|seq| · L)

### 阈值选择

常用阈值选择方法：

- **固定阈值**：根据经验设定
- **百分位数阈值**：在随机序列上计算得分分布，选择 top p%
- **FDR 控制**：根据假发现率调整阈值
- **基于 p-value**：计算每个得分的统计显著性

## Worked Example

### 示例数据

假设我们有以下 5 个 motif 实例：

```text
TATAAA
TATGAA
TATAAT
TATCAA
TATAAA
```

### 步骤 1：构建 PFM

统计每个位置上各碱基的出现次数：

| 位置 | A | C | G | T | 总计 |
|------|---|---|---|---|------|
| 1 | 0 | 0 | 0 | 5 | 5 |
| 2 | 5 | 0 | 0 | 0 | 5 |
| 3 | 0 | 0 | 0 | 5 | 5 |
| 4 | 4 | 1 | 0 | 0 | 5 |
| 5 | 5 | 0 | 0 | 0 | 5 |
| 6 | 4 | 0 | 0 | 1 | 5 |

### 步骤 2：转换为频率

使用伪计数 α = 0.5，N = 5：

$$
\tilde{f}_{i,c} = \frac{\text{count}_{i,c} + 0.5}{5 + 4 \times 0.5} = \frac{\text{count}_{i,c} + 0.5}{7}
$$

对于位置 1，碱基 T：
$$
\tilde{f}_{1,T} = \frac{5 + 0.5}{7} = \frac{5.5}{7} \approx 0.786
$$

对于位置 1，碱基 A：
$$
\tilde{f}_{1,A} = \frac{0 + 0.5}{7} = \frac{0.5}{7} \approx 0.071
$$

### 步骤 3：构建 PWM

假设背景频率 $b_A = b_C = b_G = b_T = 0.25$：

$$
w_{i,c} = \log_2\left(\frac{\tilde{f}_{i,c}}{0.25}\right)
$$

对于位置 1，碱基 T：
$$
w_{1,T} = \log_2\left(\frac{0.786}{0.25}\right) = \log_2(3.144) \approx 1.65
$$

对于位置 1，碱基 A：
$$
w_{1,A} = \log_2\left(\frac{0.071}{0.25}\right) = \log_2(0.284) \approx -1.82
$$

完整 PWM：

| 位置 | A | C | G | T |
|------|---|---|---|---|
| 1 | -1.82 | -1.82 | -1.82 | 1.65 |
| 2 | 1.65 | -1.82 | -1.82 | -1.82 |
| 3 | -1.82 | -1.82 | -1.82 | 1.65 |
| 4 | 0.85 | -1.82 | -1.82 | -1.82 |
| 5 | 1.65 | -1.82 | -1.82 | -1.82 |
| 6 | 0.85 | -1.82 | -1.82 | -1.82 |

### 步骤 4：扫描候选序列

候选序列 1：`TATAAA`

$$
\text{score} = w_{1,T} + w_{2,A} + w_{3,T} + w_{4,A} + w_{5,A} + w_{6,A}
$$
$$
= 1.65 + 1.65 + 1.65 + 0.85 + 1.65 + 0.85 = 8.30
$$

候选序列 2：`CGCGCG`

$$
\text{score} = w_{1,C} + w_{2,G} + w_{3,C} + w_{4,G} + w_{5,C} + w_{6,G}
$$
$$
= (-1.82) + (-1.82) + (-1.82) + (-1.82) + (-1.82) + (-1.82) = -10.92
$$

候选序列 3：`TATGAA`

$$
\text{score} = 1.65 + 1.65 + 1.65 + (-1.82) + 1.65 + 0.85 = 6.63
$$

显然 `TATAAA` 得分最高，最像该 motif。

## 复杂度分析

### 时间复杂度

- **构建 PWM**：O(L)，L 是 motif 长度
- **扫描序列**：O(M · L)，M 是序列长度
- **全基因组扫描**：对于长度为 G 的基因组，复杂度为 O(G · L)

### 空间复杂度

- **PWM 存储**：O(L · 4) = O(L)
- **扫描时临时空间**：O(L)

## 与真实工具或流程的连接

这类表示广泛用于：

- motif 扫描；
- 转录因子结合位点分析；
- profile-style 模式识别；
- 作为更复杂概率模型（如 profile HMM）的基础直觉。

在实际流程中，你往往会看到：

- 从 motif discovery 工具输出的 PFM/PWM；
- 使用 PSSM 进行 genome-wide 扫描，给出高分候选位点；
- 再结合进化保守性、表达数据和实验验证进行过滤。

## 常见误区

### motif 一定对应一个固定的 consensus 串

不对。很多 motif 的本质正是“位置相关的偏好”，不是单个固定字符串。

### 高分 motif 就等于真实结合位点

不一定。高分说明片段与模型相似，但是否真实绑定还需要结合背景频率、局部结构和实验数据。

## 相关页面

- [Motif 寻找](./motif-finding.md)
- [隐马尔可夫模型](./hmm.md)
- [Pseudo-alignment 与表达定量](../transcriptomics/pseudo-alignment-and-quantification.mdx)

---
description: Gene prediction 的详细实现：理解如何用 HMM 等概率模型识别基因组序列中的 exon、intron 和基因结构，包括算法步骤和 worked example。
title: "Gene prediction"
---

import SummaryBox from '@site/src/components/docs/SummaryBox';
import DefinitionList from '@site/src/components/docs/DefinitionList';


<SummaryBox
  summary="Gene prediction 是识别基因组序列中基因结构的经典问题：通过 HMM 等概率模型，将序列分段为 exon、intron、intergenic 等功能状态，预测完整的基因模型。"
  bullets={[
    '核心是状态建模：exon、intron、intergenic 等功能状态的转移和发射',
    'Viterbi 算法用于寻找最优状态路径，即最可能的基因结构',
    '结合 RNA-seq、同源信息等多证据源可提高预测准确性'
  ]}
/>

## 是什么

Gene prediction 关注的是：给定一段基因组序列，如何识别其中哪些区段更可能对应 exon、intron、起始/终止信号或完整基因结构。它要做的不是简单寻找几个 motif，而是把原始字符序列解释成更高层的注释对象。

## 要解决什么生物信息学问题

序列本身只是字符流。Gene prediction 的核心任务，是把这串字符映射成更高层的功能结构：

- 哪些区段可能是蛋白编码区域；
- 哪些是 intron 或非编码区域；
- 起始密码子、终止密码子和剪接位点如何共同约束结构；
- 是否存在多个可能的基因边界或 isoform 结构。

这类任务需要同时考虑：

- 局部信号，例如起始密码子、剪接位点、多聚腺苷酸化信号；
- 更长范围的结构模式，例如 exon / intron 排布；
- 不确定性与统计偏好；
- 不同证据源之间的一致性。

## 输入与输出

### 输入

gene prediction 常见输入包括：

- 基因组序列；
- 可选的序列统计特征，例如 codon usage、GC content、splice signal；
- 可选的同源信息；
- 可选的 RNA-seq、EST 或 transcript evidence。

### 输出

目标输出通常是：

- 候选 gene 区间；
- exon / intron 边界；
- coding sequence 结构；
- 一个或多个可能的 transcript / gene model；
- 与每种预测相关的置信度或支持证据。

## 统计方法与相似性方法

基因预测方法主要分为两大类：统计方法和相似性方法。

### 统计方法

统计方法基于编码区域和非编码区域的统计特征差异来预测基因。

#### 开放阅读框（ORF）

最简单的统计方法是寻找开放阅读框（Open Reading Frames, ORF）。

**原理**：
- 将基因组表示为 n/3 个密码子的序列
- 三个终止密码子（TAA、TAG、TGA）将序列分割成片段
- 从起始密码子 ATG 开始的片段称为 ORF

**关键观察**：
- 在"随机" DNA 中，两个连续终止密码子之间的平均密码子数约为 64/3 ≈ 21
- 平均蛋白质长度约为 300 个密码子
- 因此，显著长于某个阈值的 ORF 表示可能的基因

**局限性**：
- 可能漏掉短基因或短外显子
- 需要考虑六个阅读框（正义链和反义链各三个）

#### 密码子使用偏好

不同物种对编码同一氨基酸的不同密码子有偏好。

**原理**：
- 构建密码子使用频率数组（64 个元素）
- 编码区域和非编码区域的密码子使用数组不同
- 使用似然比检验计算给定序列是编码还是非编码的概率

**示例**：
在人类基因中，CGC 和 AGG 都编码精氨酸（Arg）：
- CGC 使用频率是 AGG 的 12 倍
- 因此偏好 CGC 的 ORF 更可能是编码区域

**似然比方法**：
- 计算序列在"编码假设"下的条件概率
- 计算序列在"非编码假设"下的条件概率
- 沿基因组滑动窗口计算似然比
- 基因通常表现为似然比图中的峰值

#### in-frame hexamer 计数

更高级的编码传感器是 in-frame hexamer 计数，反映连续密码子对的频率。

### 相似性方法

相似性方法利用已知基因或蛋白质的同源性来预测新基因。

#### 基本思想

一个新测序的基因很有可能与已知基因相关。例如：
- 99% 的小鼠基因有人类同源物
- 相关基因产生相似的蛋白质

**挑战**：
- 外显子序列和外显子结构在不同物种中不同
- 共同性在于产生的蛋白质，而非 DNA 序列

#### Exon Chaining 问题

相似性方法的第一步是找到所有候选外显子。

**问题定义**：
给定一组加权区间（候选外显子），找到最大非重叠区间集合。

**形式化**：
- 输入：一组加权区间（l, r, w），其中 l 是左端点，r 是右端点，w 是权重
- 输出：最大链的区间集合

**权重 w 可以反映**：
- 与目标蛋白质的局部比对分数
- 侧翼接受位点和供体位点的强度
- 其他度量

**动态规划解法**：

```
EXONCHAINING(G, n)
1 for i ← 1 to 2n
2   sᵢ ← 0
3 for i ← 1 to 2n
4   if 顶点 vᵢ 对应于区间 I 的右端点
5     j ← 区间 I 左端点对应顶点的索引
6     w ← 区间 I 的权重
7     sᵢ ← max {sⱼ + w, sᵢ₋₁}
8   else
9     sᵢ ← sᵢ₋₁
10 return s₂ₙ
```

**局限性**：
- 候选外显子的端点定义不明确
- 最优链可能不对应有效的比对
- 例如，第一个区间可能对应蛋白质的后缀，第二个区间可能对应前缀

#### Spliced Alignment 问题

Spliced Alignment 解决了 Exon Chaining 的局限性。

**问题定义**：
给定基因组序列 G、目标序列 T 和候选外显子集合 B，找到 B 的外显子链，使得其连接后的字符串与 T 的全局比对分数最大。

**形式化**：
- 输入：基因组序列 G，目标序列 T，候选外显子集合 B
- 输出：候选外显子链 Γ，使得比对分数 s(Γ*, T) 最大

**动态规划解法**：

定义 S(i, j, B) 为最优剪接比对分数，假设比对结束于覆盖位置 i 的外显子 B。

**递归关系**：

如果 i 不是 B 的起始位置（标准比对）：
```
S(i, j, B) = max {
  S(i-1, j, B) - σ,
  S(i, j-1, B) - σ,
  S(i-1, j-1, B) + δ(gᵢ, tⱼ)
}
```

如果 i 是 B 的起始位置：
```
S(i, j, B) = max {
  S(i, j-1, B) - σ,
  max_{B' 在 B 之前} [S(end(B'), j-1, B') + δ(gᵢ, tⱼ)],
  max_{B' 在 B 之前} [S(end(B'), j, B') - σ]
}
```

最终答案：max_B S(end(B), m, B)

**候选外显子生成**：
- 在潜在接受位点（AG）和供体位点（GT）之间生成所有片段
- 移除所有三个阅读框中都有终止密码子的外显子
- 过滤短片段以避免"马赛克效应"

### 方法对比

**统计方法**：
- 优点：不需要先验知识
- 缺点：准确率有限，特别是对于短外显子

**相似性方法**：
- 优点：利用进化保守性，准确率更高
- 缺点：需要已知同源基因或蛋白质
- 趋势：随着序列数据积累，相似性方法越来越重要

**集成方法**：
现代基因预测工具（如 GENSCAN）结合了统计方法和相似性方法：
- 编码区域统计
- 剪接信号统计
- 起始位点附近的 motif
- 在 HMM 框架中整合多种统计量

## 核心思想 / 数学模型

Gene prediction 常把问题理解成一种"序列分段 + 状态识别"任务，因此非常适合和 HMM 等概率模型联系起来理解：

- 不同隐藏状态代表不同功能区段，如 intergenic、exon、intron、start、stop；
- 不同状态下会产生不同的观测模式，如密码子偏好、剪接信号、长度分布；
- 目标是找到最合理的状态路径，也就是一条合理的基因结构解释。

在简单示意中，可以构造：

- 状态集合：Start, Exon, Intron, End 等；
- 转移结构：Start → Exon → Intron → Exon ... → End；
- 发射模型：在 Exon 状态下更偏好 coding-like 模式，在 Intron 中则呈现不同统计特征。

这类建模的关键不是"状态名字"，而是：如何让状态、转移和发射共同表达真实基因结构的先验约束。

### HMM 状态定义

<DefinitionList
  items={[
    {
      term: 'Intergenic (I)',
      definition: '非基因间区，通常具有随机碱基组成。',
    },
    {
      term: 'Exon (E)',
      definition: '外显子，编码区域，具有密码子偏好和三联体周期性。',
    },
    {
      term: 'Intron (N)',
      definition: '内含子，非编码区域，两端有剪接位点信号。',
    },
    {
      term: 'Start (S)',
      definition: '起始密码子 ATG 附近区域。',
    },
    {
      term: 'Stop (T)',
      definition: '终止密码子 TAG/TAA/TGA 附近区域。',
    },
  ]}
/>

### 状态转移结构

简化的基因结构转移：

```
I → S → E → N → E → N → ... → E → T → I
```

更复杂的模型可以包括：
- 5' UTR 和 3' UTR 状态
- 不同长度的 exon/intron 状态
- 单外显子基因的专门路径

### 发射模型

- **Exon 状态**：基于密码子使用频率（codon usage）建模
  - 每个密码子的发射概率基于编码序列统计
  - 考虑 reading frame 的周期性

- **Intron 状态**：基于背景碱基组成和剪接信号
  - GT-AG 剪接位点的高发射概率
  - 中间区域接近随机分布

- **Intergenic 状态**：基于基因组背景碱基组成

## 算法步骤

### HMM-based Gene Prediction

**算法：HMM 基因预测**

```
输入：基因组序列 seq，HMM 参数（状态转移、发射概率）
输出：最优状态路径和基因结构

1. 定义状态集合 S = {I, S, E, N, T}
2. 初始化 Viterbi 矩阵：
   for each state s in S:
      V₁(s) = π_s · b_s(seq[1])
      ψ₁(s) = 0

3. 递推填充 Viterbi 矩阵：
   for t = 2 to |seq|:
     for each state j in S:
        Vₜ(j) = maxᵢ [Vₜ₋₁(i) · aᵢⱼ] · bⱼ(seq[t])
        ψₜ(j) = argmaxᵢ [Vₜ₋₁(i) · aᵢⱼ]

4. 终止：
   P* = maxⱼ V_|seq|(j)
   z_|seq|* = argmaxⱼ V_|seq|(j)

5. 回溯得到最优状态路径：
   for t = |seq|-1 down to 1:
      zₜ* = ψₜ₊₁(zₜ₊₁*)

6. 从状态路径提取基因结构：
   - S → E 序段为起始外显子
   - E → N → E 序段为外显子-内含子-外显子
   - E → T 序段为终止外显子

7. return 状态路径和基因结构
```

**时间复杂度**：O(|seq| · K²)，K 是状态数（通常 5-10）

### 结合多证据源的集成算法

**算法：多证据源基因预测**

```
输入：基因组序列 seq，HMM 参数，RNA-seq 数据，同源比对结果
输出：整合的基因预测

1. 运行 HMM 预测得到初始基因模型
2. 用 RNA-seq 覆盖度验证 exon 区域：
   - 高覆盖度支持 exon 预测
   - 低覆盖度可能为假阳性
3. 用同源比对验证编码潜力：
   - 与已知蛋白的同源性支持 exon
   - 保守的剪接位点支持 intron 边界
4. 整合证据：
   - 对每个预测的 exon/intron 计算证据支持得分
   - 过滤低支持度的预测
   - 合并重叠的预测
5. return 整合后的基因模型
```

**时间复杂度**：O(|seq| · K² + N · M)，其中 N 是证据数量，M 是整合复杂度

## Worked Example

### 简化示例

假设我们有一段简化的基因组序列，寻找单外显子基因：

```
序列: ATG CGT AAG TAA GTG CCT
```

### HMM 参数（简化）

**状态**：I (intergenic), S (start), E (exon), T (stop)

**发射概率**（简化）：
- S 状态：偏好 ATG
- E 状态：偏好编码密码子
- T 状态：偏好 TAA/TAG/TGA
- I 状态：随机分布

**转移概率**（简化）：
- I → S: 0.01, I → I: 0.99
- S → E: 0.9, S → I: 0.1
- E → E: 0.8, E → T: 0.2
- T → I: 0.9, T → T: 0.1

### Viterbi 计算

**初始化（t=1, A）**：
- V₁(I) = π_I · b_I(A) = 0.5 · 0.25 = 0.125
- V₁(S) = π_S · b_S(A) = 0.01 · 0.25 = 0.0025
- V₁(E) = π_E · b_E(A) = 0.01 · 0.25 = 0.0025
- V₁(T) = π_T · b_T(A) = 0.01 · 0.25 = 0.0025

**t=2, T**：
- V₂(I) = max[V₁(I)·0.99, V₁(S)·0.1, V₁(E)·0, V₁(T)·0.9] · b_I(T)
- V₂(S) = max[V₁(I)·0.01, ...] · b_S(T)
- ...

（完整计算省略，实际应用需要更长的序列和更精确的参数）

### 结果解释

最优状态路径可能为：
```
I I I S E E E E T I I I
```

对应基因结构：
- 位置 4: Start (ATG)
- 位置 5-10: Exon (CGT AAG TAA)
- 位置 11: Stop (GTG - 实际应为 TAA/TAG/TGA)

### 真实场景的复杂性

在实际应用中：
- 序列长度可达数千到数百万碱基
- 基因可能包含多个外显子和内含子
- 需要考虑 reading frame 的连续性
- 需要结合 RNA-seq、EST、同源比对等多证据源

## 关键状态与结构直觉

一个 gene model 至少要同时描述两类信息：

### 局部信号

例如：

- 起始密码子；
- 终止密码子；
- donor / acceptor splice site；
- coding region 的三联体偏好。

### 全局结构

例如：

- exon 和 intron 的交替；
- reading frame 的连续性；
- gene 边界与 intergenic 区域的分离；
- 不同外显子长度和内含子长度的统计分布。

Gene prediction 困难的地方正在于：局部 motif 往往不够可靠，必须和更长程的结构约束结合起来，才能得到可解释的结果。

## 复杂度与适用前提

Gene prediction 的效果依赖于多种前提：

- 目标物种的序列特征是否与模型假设相符；
- 是否有足够好的训练数据或先验参数；
- 剪接结构是否复杂；
- 是否存在大量重复序列、假基因或特殊基因结构；
- 是否有 RNA-seq 或同源证据辅助。

纯 ab initio 方法能提供结构化假设，但往往难以单独作为“最终真注释”。证据越单一，模型误判的风险越高。

## 与真实工具或流程的连接

Gene prediction 是把序列模型、统计建模和注释生成连接起来的经典问题。它既是教材中的概率建模案例，也是很多 genome annotation pipeline 的核心步骤。

在真实注释流程中，gene prediction 通常要结合：

- **ab initio 模型**：仅基于序列与统计结构；
- **同源信息**：与已知基因或蛋白对齐；
- **转录组证据**：RNA-seq coverage、splice junction、transcript assembly；
- **注释整合**：把多类证据融合成最终 gene model。

因此，gene prediction 更适合理解为“候选注释结构生成与评分”，而不是一步到位得到绝对真值。

## 常见误区

### 只靠局部 motif 就能完整预测基因

通常不够。真实基因结构识别往往需要把局部信号和全局结构约束一起考虑。

### 预测结果就是“真注释”

不对。Gene prediction 的结果往往是“模型下最合理的解释”，而不是严格意义上的地面真值。实际注释通常来自多个证据源的融合。

### HMM 只适合讲教材例子，不适合真实注释

也不对。即使真实工具会更复杂，状态建模、路径评分和证据整合的思想仍然是核心。

### gene prediction 只和 coding gene 有关

不完全如此。虽然很多经典模型围绕 protein-coding gene 展开，但 gene annotation 的思路并不只服务于单一类型对象。

## 参考资料

- 《Biological Sequence Analysis》
- 与 HMM、profile HMM、gene annotation pipeline 相关教材和综述
- 真实 genome annotation 工作流文档

## 相关页面

- [隐马尔可夫模型](./hmm.md)
- [Viterbi、Forward 与 Backward](./viterbi-forward-backward.md)
- [Profile HMM](./profile-hmm.md)
- [PWM 与 PSSM](./pwm-pssm.md)
- [参考基因组、坐标系统与注释](../foundations/reference-and-annotation.md)
- [转录组](../transcriptomics/index.mdx)

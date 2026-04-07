---
sidebar_position: 5
---

# Gene prediction

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

## 核心思想 / 数学模型

Gene prediction 常把问题理解成一种“序列分段 + 状态识别”任务，因此非常适合和 HMM 等概率模型联系起来理解：

- 不同隐藏状态代表不同功能区段，如 intergenic、exon、intron、start、stop；
- 不同状态下会产生不同的观测模式，如密码子偏好、剪接信号、长度分布；
- 目标是找到最合理的状态路径，也就是一条合理的基因结构解释。

在简单示意中，可以构造：

- 状态集合：Start, Exon, Intron, End 等；
- 转移结构：Start → Exon → Intron → Exon ... → End；
- 发射模型：在 Exon 状态下更偏好 coding-like 模式，在 Intron 中则呈现不同统计特征。

这类建模的关键不是“状态名字”，而是：如何让状态、转移和发射共同表达真实基因结构的先验约束。

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

## worked example

设想你在一段基因组序列中观察到：

- 某处出现看似合理的起始密码子；
- 下游存在多个可能的 splice donor / acceptor 位点；
- 某些片段具有明显 coding-like 的密码子偏好。

如果只看局部 motif，你可能会得到很多候选 exon 边界；但如果再加上状态路径约束，例如：

- coding 区应保持合理 reading frame；
- intron 两端更倾向符合剪接信号；
- exon / intron 的长度分布不能太异常；

那么许多局部上“看起来像”的候选结构就会被排除，最后留下更一致的基因模型。

这个例子说明：gene prediction 的关键不是找单个模式，而是寻找一整条最合理的结构解释路径。

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

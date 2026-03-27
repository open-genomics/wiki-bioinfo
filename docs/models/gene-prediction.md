---
sidebar_position: 5
---

# Gene prediction

## 是什么

Gene prediction 关注的是：给定一段基因组序列，如何识别其中哪些区段更可能对应 exon、intron、起始/终止信号或完整基因结构。

## 要解决什么生物信息学问题

序列本身只是字符流。Gene prediction 的核心任务，是把这串字符映射成更高层的功能结构：

- 哪些区段可能是蛋白编码区域；
- 哪些是 intron 或非编码区域；
- 是否存在多个可能的 isoform 结构。

这类任务需要同时考虑：

- 局部信号，例如起始密码子、剪接位点、多聚腺苷酸化信号；
- 更长范围的结构模式，例如 exon / intron 排布；
- 不确定性与统计偏好。

## 核心思想

Gene prediction 常把问题理解成一种“序列分段 + 状态识别”任务，因此非常适合和 HMM 等概率模型联系起来理解：

- 不同隐藏状态代表不同功能区段（如 exon, intron, intergenic）；
- 不同状态下会产生不同的观测模式（如密码子偏好、剪接信号）；
- 目标是找到最合理的状态路径（即一条合理的基因结构）。

在简单示意中，可以构造：

- 状态集合：Start, Exon, Intron, End 等；
- 转移结构：Start → Exon → Intron → Exon ... → End；
- 发射模型：在 Exon 状态下更偏好编码-like 模式，在 Intron 中则相对随意。

## 与真实工具或流程的连接

Gene prediction 是把序列模型、统计建模和注释生成连接起来的经典问题。它既是教材中的典型概率建模案例，也是很多注释流程中的核心步骤。

在真实注释 pipeline 中，gene prediction 通常要结合：

- ab initio 模型（仅基于序列与统计结构）；
- 同源信息（与已知基因对齐）；
- 转录组证据（RNA-seq 覆盖和 splice junction）。

## 常见误区

### 只靠局部 motif 就能完整预测基因

通常不够。真实基因结构识别往往需要把局部信号和全局结构约束一起考虑。

### 预测结果就是“真注释”

Gene prediction 的结果往往是“模型下最合理的解释”，而不是严格意义上的地面真值。实际注释通常来自多个证据源的融合。

## 相关页面

- [隐马尔可夫模型](./hmm.md)
- [PWM 与 PSSM](./pwm-pssm.md)
- [参考基因组、坐标系统与注释](../foundations/reference-and-annotation.md)

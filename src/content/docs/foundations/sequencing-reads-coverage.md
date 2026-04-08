---
title: "测序 reads、coverage 与错误模型"
---


<figure>
  <img src="/wiki-bioinfo/img/illustrations/sequencing-by-synthesis.svg" alt="测序合成法示意图" />
  <figcaption>短读长测序常以 sequencing-by-synthesis 为基础：逐轮掺入核苷酸并成像，从而把化学反应转成序列信号。</figcaption>
</figure>

## 是什么

测序分析最原始的观察对象不是基因、转录本或变异，而是大量短小或较长的 reads。

每条 read 都只是原始分子的一次局部、不完全、带噪声的观测。coverage 和错误模型描述的，就是这些观测是如何在整个基因组或转录组上分布，以及这些观测会以什么方式偏离真实序列。

## 为什么重要

如果不先理解 reads、coverage 与错误，就很难明白：

- 为什么比对会出现错配和不确定性；
- 为什么组装图中会出现 tips、bubbles 和异常分支；
- 为什么变异检测不能只看一个位置有没有差异；
- 为什么表达定量很容易受到文库和测序偏差影响。

## 核心概念

### reads

reads 是实验平台输出的局部序列观测。它们的长度、质量分布、错误特征和是否成对出现，会直接影响后续算法选择。

### coverage

coverage 可以粗略理解为：某个位置平均被多少条 reads 覆盖。

它既是信息量的重要来源，也是很多统计判断的基础。

### 错误模型

错误模型描述的是：read 中出现错误碱基、插入缺失、末端质量下降、平台偏好等现象的规律。

## worked example

假设某个位点上只有 1 条 read 支持替换，而其他 reads 都支持参考碱基，那么这个差异更可能来自：

- 测序错误；
- 比对错位；
- 局部低质量碱基。

但如果有大量高质量 reads 独立支持同一个差异，并且覆盖分布合理，那么它更可能是真实变异。

这说明变异证据不是“看见差异就算数”，而是依赖 coverage 和错误背景来解释。

## 与真实工具或流程的连接

- 在 [序列比对](../alignment/index.md) 中，coverage 和错误模式决定一个 read 是否容易被正确定位；
- 在 [组装与图算法](../assembly/index.md) 中，错误 read 会制造伪 k-mer 和异常图结构；
- 在 [变异检测](../variants/index.mdx) 中，区分测序错误与真实变异是核心问题；
- 在 [转录组](../transcriptomics/index.mdx) 中，coverage 不均匀会直接影响表达定量。

## 常见误区

- 有 read 就说明对应区域一定存在真实信号；
- coverage 足够高就不会出错；
- 错误模型只是测序平台层面的细节；
- coverage 越高越好，且不同任务对 coverage 的要求都一样。

## 相关页面

- [生物信息学中的基础对象](./biology-basics.md)
- [参考基因组、坐标系统与注释](./reference-and-annotation.md)
- [DNA-seq 变异检测总览](../variants/variant-calling-overview.mdx)
- [de Bruijn graph 组装](../assembly/de-bruijn.md)

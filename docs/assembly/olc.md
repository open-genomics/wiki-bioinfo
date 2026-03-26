---
sidebar_position: 2
---

# OLC：Overlap-Layout-Consensus

## 是什么

OLC（Overlap-Layout-Consensus）是一类经典组装思路，它把序列重建问题拆成三个阶段：

1. **Overlap**：寻找 reads 之间的重叠关系；
2. **Layout**：根据重叠关系构建布局；
3. **Consensus**：从布局中求共识序列。

和 de Bruijn graph 相比，OLC 更强调“read 与 read 之间的真实重叠”，而不是先分解成 k-mer 再建图。

## 要解决什么生物信息学问题

组装的核心问题始终是：如何从局部观测恢复整体序列。

在 OLC 框架中，我们假设：

- 如果两条 read 有足够可靠的重叠，它们就可能来自原始序列上的相邻区域；
- 把许多这样的重叠关系拼接起来，就有机会恢复更长的序列骨架；
- 最后再用多条 read 的信息求出更稳健的共识序列。

## 三个阶段分别在做什么

### 1. Overlap

目标是找出哪些 reads 之间存在显著重叠。

这一阶段最直接，但往往也是最贵的，因为潜在 read 对数目很大。要解决的问题包括：

- 如何快速筛掉不可能重叠的 read 对；
- 如何区分真实重叠与重复/错误造成的假重叠；
- 如何给重叠边打分。

### 2. Layout

得到重叠关系后，可以把 reads 组织成图或路径结构，尝试推断它们在原始序列上的相对顺序和方向。

这一阶段最容易遇到的麻烦是：

- 重复区域造成歧义；
- 某些 read 质量差，使布局不稳定；
- 图中存在多个看似合理的延伸方向。

### 3. Consensus

即使 layout 大体正确，read 本身也可能有错误。因此最后还需要把多条重叠 read 综合起来，得到更可靠的 consensus sequence。

这一步强调的是“用冗余覆盖纠正单条 read 的错误”。

## 为什么它在长读长时代依然重要

OLC 思路在长读长时代依然重要，因为长读长之间的重叠信息更丰富，read-read overlap 更有可能跨过重复区域并提供稳定布局线索。

简化地说：

- 短读长时代，k-mer 图模型更高效；
- 长读长时代，直接利用长重叠往往更有价值。

## worked example

假设有三条 read：

```text
R1: ACGTAC
R2:   GTACGA
R3:      ACGATT
```

如果发现：

- `R1` 与 `R2` 在 `GTAC` 上有高质量重叠；
- `R2` 与 `R3` 在 `ACGA` 上有高质量重叠；

那么 layout 阶段就可能推断它们沿同一条更长序列排列。最后 consensus 阶段再综合覆盖信息，输出更稳定的结果。

## 与 de Bruijn graph 的比较

| 思路 | 更关注什么 | 常见优势 | 常见挑战 |
|---|---|---|---|
| OLC | read-read overlap | 长读长信息利用更直接 | overlap 搜索昂贵 |
| de Bruijn graph | k-mer 图结构 | 短读长场景更高效 | 对错误和重复非常敏感 |

因此，它们并不是简单的“新旧替代关系”，而更像不同数据条件下的不同建模选择。

## 挑战

- 重叠搜索代价高；
- 重复序列会造成歧义；
- 测序错误会影响边的可靠性；
- 布局阶段可能出现多个冲突路径；
- 共识步骤需要充分覆盖支撑。

## 与真实工具或流程的连接

OLC 不是单一算法，而是一整类设计范式。它的思想在很多长读长组装和共识构建流程中都能看到：

- 先找重叠
- 再构布局
- 最后做共识纠错

所以理解 OLC，有助于把“组装”看成一个逐层提炼证据的过程，而不是单纯的一次性拼接。

## 常见误区

### OLC 已经过时，只剩 de Bruijn graph 有意义

不对。长读长时代让 OLC 思路重新变得非常重要。

### overlap 找到了，就等于组装完成

不对。layout 和 consensus 往往同样困难。

### 共识阶段只是最后润色

不对。在高错误率读长场景下，consensus 可能决定最终结果是否可信。

## 参考资料

- An Introduction to Bioinformatics Algorithms
- genome assembly 相关综述

## 相关页面

- [de Bruijn graph 组装](./de-bruijn.md)
- [k-mer 与序列表示](../sequence/kmers.md)
- [概率、图与动态规划预备](../foundations/probability-and-graphs.md)
- [NGS 流程总览](../workflows/ngs-overview.md)

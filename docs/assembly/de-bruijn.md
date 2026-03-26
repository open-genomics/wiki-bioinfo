---
sidebar_position: 3
---

# de Bruijn graph 组装

## 是什么

de Bruijn graph 是短读长组装中的经典模型。它的核心思想不是直接比较每一对 read 是否重叠，而是先把 reads 分解成 k-mer，再把这些局部片段组织成图。

最常见的构造方式是：

- 顶点表示 `(k-1)`-mer；
- 边表示 `k`-mer；
- 如果一个 `k`-mer 的前缀和后缀分别对应两个 `(k-1)`-mer，就在这两个顶点之间连一条边。

这样，序列重建问题就被转成了图中的路径问题。

## 要解决什么生物信息学问题

组装的目标是：从大量局部 read 中恢复原始基因组或转录本序列。

如果直接判断每一对 read 是否重叠，代价会非常高；而 de Bruijn graph 的价值就在于：它把大量局部重叠信息压缩到了统一的图结构中。

这使得我们可以更系统地处理：

- read 数量巨大；
- 重复序列很多；
- 测序错误会制造伪连接；
- coverage 不均匀导致图结构复杂。

## 图模型

设一个 `k`-mer 为 `x_1x_2...x_k`，则：

- 它的前缀顶点为 `x_1x_2...x_{k-1}`
- 它的后缀顶点为 `x_2x_3...x_k`

于是每个 `k`-mer 对应一条从前缀顶点到后缀顶点的有向边。

如果原始序列中相邻的 k-mer 共享 `k-1` 个字符，那么在图中就会自然地接起来。

## worked example

<figure>
  <img src="/wiki-bioinfo/img/illustrations/de-bruijn-graph.svg" alt="de Bruijn graph 图结构示意图" />
  <figcaption>把 k-mer 映射成边、把 (k-1)-mer 映射成顶点之后，组装问题就转成图上的路径与图清理问题。</figcaption>
</figure>

考虑序列：

```text
AAGATTCTCTA
```

取 `k = 4`，得到一组 4-mer：

- `AAGA`
- `AGAT`
- `GATT`
- `ATTC`
- `TTCT`
- `TCTC`
- `CTCT`
- `TCTA`

对应的 `(k-1)`-mer 顶点为：

- `AAG`, `AGA`, `GAT`, `ATT`, `TTC`, `TCT`, `CTC`, `CTA`

例如：

- `AAGA` 对应 `AAG -> AGA`
- `AGAT` 对应 `AGA -> GAT`
- `GATT` 对应 `GAT -> ATT`

把所有边连起来后，就能在图中看到一条重建原始序列的路径。

## 为什么它对短读长特别合适

对于大量短 read：

- 局部重叠信息很丰富；
- 直接做 read-read overlap 成本高；
- k-mer 化以后更容易统一统计和建图。

因此，在短读长时代，de Bruijn graph 几乎成为组装算法的标志性模型之一。

## 图中的关键挑战

### 测序错误

如果某个 read 含有错误碱基，它会制造很多低频异常 k-mer。这些错误常在图中表现为：

- 毛刺（tips）
- 短小分支
- 异常低覆盖边

### 重复序列

重复序列会让多个不同区域共享相同的 k-mer，导致图中出现复杂分叉，难以判断正确路径。

### coverage 不均匀

真实数据不是每个位置都被同样充分地覆盖，因此图清理时不能只靠单一阈值。

## k 的选择

k 的取值对图结构影响极大：

| k 较小 | k 较大 |
|---|---|
| 图更连通，更敏感 | 图更稀疏，更有区分力 |
| 更容易跨过错误和低覆盖区域 | 更容易被错误打断 |
| 重复更难分解 | 内存和数据要求更高 |

因此，选择合适的 `k` 实际上是在连通性、区分力和噪声鲁棒性之间做平衡。

## 与欧拉路径的关系

de Bruijn graph 常常会让人联想到欧拉路径（Eulerian path）问题，因为理想情况下我们希望找到一条遍历边的合理路径，把所有 k-mer 串回原始序列。

不过真实组装通常并不是简单地“直接找欧拉路径”就结束，还需要：

- 图清理
- 错误校正
- coverage 统计
- 重复解析
- contig/scaffold 构建

所以欧拉路径更像是理论上的核心骨架，而不是完整工程实现的全部。

## 与真实工具或流程的连接

很多经典短读长组装器都在某种意义上建立在 de Bruijn graph 思想上。即使具体实现细节不同，它们通常都要面对相同问题：

- 如何过滤低频错误 k-mer
- 如何简化图
- 如何处理 bubbles 和 repeats
- 如何从图导出 contig

在 RNA-seq、宏基因组和 de novo assembly 中，这种思想都非常重要。

## 常见误区

### de Bruijn graph 就等于欧拉路径

欧拉路径是理论解释的一部分，但真实组装还涉及复杂的图清理和统计判断。

### 只要把 `k` 调大，重复问题就会消失

`k` 变大能提升区分力，但也可能让错误和 coverage 问题变得更严重。

### 图上的每个分叉都说明真实生物学变异

不一定。分叉也可能来自测序错误、重复序列或 coverage 波动。

## 参考资料

- An Introduction to Bioinformatics Algorithms
- genome assembly 相关综述与教材

## 相关页面

- [k-mer 与序列表示](../sequence/kmers.md)
- [概率、图与动态规划预备](../foundations/probability-and-graphs.md)
- [OLC：Overlap-Layout-Consensus](./olc.md)
- [NGS 流程总览](../workflows/ngs-overview.md)

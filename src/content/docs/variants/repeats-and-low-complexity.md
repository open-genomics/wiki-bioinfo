---
description: 重复和低复杂度区域中的变异检测挑战与解释指南。
title: "重复与低复杂度区域的变异检测"
---


## 是什么

重复序列（repeats）和低复杂度区域（low-complexity regions）在基因组中非常常见：

- 串联重复（tandem repeats）
- interspersed repeats（LINEs、SINEs 等）
- 简单重复或低复杂度序列（如 poly-A、poly-T、低信息量 motif）

在这些区域里，**reads 很容易产生多重比对，CIGAR 也容易变得复杂**，这让 small variant（SNP/短 indel）的检测和解释变得困难。

## 要解决什么问题

在重复/低复杂度区域做变异检测时，我们需要回答：

- 这个候选变异是真的发生在这里，还是只是 mapping 错位？
- 是真实生物学变异，还是测序错误或重复结构导致的假象？
- 如果 caller 把变异报告在多个近邻位置，应该如何理解？

## 典型困难

1. **多重比对（multi-mapping）严重**：
   - 一条 read 可以在多个高度相似的拷贝上获得相似得分；
   - mapper 往往只能选一个位置作为 primary alignment，并通过 MAPQ 表达不确定性。

2. **CIGAR 复杂、indel 难以定位**：
   - 在重复单元边界附近，插入/缺失的具体位置可以“滑动”；
   - 不同 aligner 可能给出不同的 indel 表达方式，但生物学含义类似。

3. **coverage 模式异常**：
   - 重复多拷贝本身会造成局部 coverage 升高；
   - mapping 错位可能在错误位置产生假高覆盖。

## 结合哪些证据来判断

### 1. 对齐质量：MAPQ 与 CIGAR

- 如果变异附近的 reads MAPQ 普遍较低，说明定位不稳定；
- 如果 CIGAR 在这一段高度杂乱（大量 indel、soft clip），通常说明局部结构复杂。

### 2. 覆盖度模式（depth）

- 真正的拷贝数变化或重复区域变异，应该在多个 reads 上有一致模式；
- 随机错误或少数错位常表现为少量 reads 的异常，不形成稳定 pattern。

### 3. 参考注释与已知重复

- 利用 RepeatMasker 等注释或内置数据库，识别该位点是否处于已知重复或低复杂度区域；
- 对这些区域的变异，很多 pipeline 会默认更保守地过滤或标记。

## 具体策略示例

在重复区域附近评估某个 indel 是否可信时，可以考虑：

1. 检查是否有足够数量的高 MAPQ reads 支持该事件；
2. 检查支持 reads 的 CIGAR 是否大致一致，而不是每条都不同；
3. 检查左右侧是否存在大段完全相同的重复单元（定位可能滑动）；
4. 查询该区域是否在 repeat 注释中，如果是，解释时特别标注不确定性。

## 与 caller 和过滤逻辑的关系

很多 caller 或过滤脚本会提供：

- 针对重复区域的特殊 FILTER 标签；
- 基于 context 的 indel 复杂度评分；
- 更严格的深度、质量阈值。

理解这些逻辑可以帮助你区分：

- “软件已经明确标记为低可信区域的变异”；
- “虽然在重复区域，但仍有较强证据支持的变异”。

## 注意事项

- 不要把重复区域里的变异“盲目当真”，也不要一刀切全部忽略；
- 在报告结果时，建议单独标明“重复/低复杂度区域变异”，并说明证据强度；
- 如果任务特别依赖这些区域（如某些 STR 相关研究），往往需要专门的工具和更严格的 QC。

## 相关页面

- [DNA-seq 变异检测总览](./variant-calling-overview.mdx)
- [DNA-seq 变异过滤与质量控制](./variant-filtering.mdx)
- [MAPQ、CIGAR 与多重比对](../alignment/mapping-quality-and-multi-mapping.md)
- [测序 reads、coverage 与错误模型](../foundations/sequencing-reads-coverage.md)

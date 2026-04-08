---
description: 重复和低复杂度区域中的变异检测挑战与解释指南。
title: "重复与低复杂度区域的变异检测"
---


## 问题背景

人类基因组中约 **50-60%** 的序列由重复序列（repetitive elements）构成。这些区域在生物学上具有重要功能（如端粒维持、基因调控），但在计算分析中却带来严峻挑战。

| 重复类型 | 占比 | 特征 | 对变异检测的影响 |
|---------|------|------|----------------|
| **串联重复（Tandem Repeats）** | ~3% | 卫星 DNA、小卫星、微卫星 | 比对不确定性、indel 定位滑动 |
| **散在重复（Interspersed Repeats）** | ~45% | LINEs、SINEs（Alu）、LTRs | 多重比对、假基因干扰 |
| **低复杂度序列** | ~5% | homopolymer、简单序列重复 | 测序错误累积、比对失败 |
| **片段重复（Segmental Duplications）** | ~5% | 100 bp - 数百 kb 的大片段重复 | 高度相似拷贝间的比对混淆 |

在这些区域进行变异检测时，核心挑战是：**区分真实的生物学变异与比对假象、测序错误**。

## 定义与分类

### 重复序列（Repetitive Elements）

**定义**：在基因组中多次出现的 DNA 序列，可通过同源重组、转座或复制滑移等机制扩增。

**主要类型**：

1. **串联重复（Tandem Repeats）**
   - **卫星 DNA**：大片段重复，位于着丝粒和端粒（如 $\alpha$-卫星 DNA）
   - **小卫星（Minisatellites）**：10-100 bp 单元，重复 10-100 次
   - **微卫星/STR（Microsatellites/STR）**：1-6 bp 单元，重复 >10 次
     - 高度多态性，常用于法医学和连锁分析
     - 复制滑移（replication slippage）导致长度高度可变

2. **散在重复（Interspersed Repeats）**
   - **LINEs（Long Interspersed Nuclear Elements）**：6-8 kb，自主转座子，LINE-1 占人类基因组 ~17%
   - **SINEs（Short Interspersed Nuclear Elements）**：100-400 bp，非自主转座子，Alu 元件占 ~10%
   - **LTRs（Long Terminal Repeats）**：来自逆转录病毒，占 ~8%

3. **片段重复（Segmental Duplications）**
   - 定义：>1 kb、序列相似度 >90% 的大片段重复
   - 位置：常位于近着丝粒和近端粒区域
   - 影响：CNV 热点、疾病相关基因拷贝数变异

### 低复杂度区域（Low-Complexity Regions, LCRs）

**定义**：信息熵显著低于随机序列的 DNA 区域，通常由单一或少数碱基类型主导。

**特征**：
- **Homopolymer**：单碱基连续重复（如 poly-A、poly-T）
- **Dinucleotide repeats**：双碱基模式重复（如 ATATAT...）
- **Simple Sequence Repeats（SSR）**：短 motif 重复

**测序挑战**：
- Illumina 在 homopolymer 区域错误率显著升高
- 读长限制导致无法跨越长重复区域
- 比对软件倾向于 soft-clip 或错误对齐

## 变异检测的核心问题

在重复/低复杂度区域，我们需要回答三个关键问题：

1. **定位问题**：该候选变异是真的发生在这个基因组位置，还是由于多重比对导致的**映射错位**（mis-mapping）？
2. **真实性问题**：是真实的生物学变异，还是测序错误（如 Illumina 在 homopolymer 区域的 indel 错误）或**伪重复**（paralogous sequence variant, PSV）？
3. **一致性问题**：如果 caller 在邻近位置报告多个相似变异，这是由于**indel 滑动**（indel sliding）还是真实的簇状变异？

这些问题使得重复区域的变异假阳性率可能比基因组平均高 **10-100 倍**。

## 技术困难的机制分析

### 1. 多重比对（Multi-mapping）

**问题描述**：短 reads（150-300 bp）在高度相似的重复拷贝间无法唯一区分，导致比对不确定性。

**数学表达**：设某 read 可比对到 $k$ 个位置，得分分别为 $s_1, s_2, ..., s_k$。当 $s_{\text{max}} - s_{\text{second}} < \epsilon$ 时，比对视为不唯一。

**后果**：
- MAPQ（Mapping Quality）被强制设为低值（通常 0-10）
- 标准变异 caller 可能过滤掉这些 reads，导致假阴性
- 若强制保留，可能引入来自其他拷贝的"伪变异"

### 2. Indel 滑动（Indel Sliding）

**问题描述**：在串联重复区域，indel 的精确位置无法唯一确定。

**示例**：对于序列 `ATATATAT`，删除 2 bp 可表示为：
- `ATATATAT → ATATAT`（删除最后两个 AT）
- `ATATATAT → ATATAT`（删除前两个 AT）

两种表示在生物学上等价，但 VCF 坐标不同。这导致：
- 不同 caller 可能报告不同位置
- 同一变异在多个样本间难以精确比较
- 注释工具可能给出不同的功能预测

### 3. 覆盖度异常

**重复多拷贝导致的覆盖升高**：
- 若某重复在基因组中有 $n$ 个高度相似拷贝，则该区域期望覆盖为平均覆盖的 $n$ 倍
- CNV 检测算法需要校正这种"基线"升高才能准确判断拷贝数变化

**映射错位导致的假高覆盖**：
- 来自其他基因组区域的 reads 因序列相似性错误比对到当前位置
- 表现为突发性、不连续的覆盖峰值
- 通常伴随低 MAPQ 和异常的配对方向

## 判断证据体系

### 1. 比对质量指标

| 指标 | 正常信号 | 可疑信号 | 解释 |
|-----|---------|---------|------|
| **MAPQ** | ≥30 | <10 或 0 | 唯一比对的置信度 |
| **CIGAR** | M（匹配）为主 | 大量 I/D/S/H | 局部结构复杂或比对失败 |
| **NM（编辑距离）** | 与序列长度匹配 | 异常高 | 可能存在嵌合比对 |
| **XA 标签** | 无 | 存在 | 存在次要比对位置 |

### 2. 覆盖度统计检验

**重复区域的覆盖度分析**：

$$Z_{\text{depth}} = \frac{\text{DP}_{\text{region}} - \mu_{\text{genome}}}{\sigma_{\text{genome}}}$$

- $|Z| < 3$：覆盖度在正常范围内
- $Z > 3$：提示拷贝数增加或比对堆积
- $Z < -3$：提示缺失或比对困难

**支持变异的 reads 一致性检验**：
- 检查支持该变异的 reads 是否来自同一模板链（strand bias 检验）
- 检查 reads 起始位置分布（是否为 PCR 重复）

### 3. 参考基因组注释

**常用注释资源**：
- **RepeatMasker**：基于 RepBase 库，标记散在重复和低复杂度区域
- **Tandem Repeats Finder**：专门识别串联重复
- **Segmental Duplication**：UCSC 提供的片段重复注释
- **DUST masker**：标记低复杂度序列（Low Complexity）

**应用策略**：
- 在变异过滤时，可设置重复区域特异的质量阈值
- 对落在 RepeatMasker 区域的变异，在报告中明确标注

## 实践策略与决策流程

### 决策树：重复区域变异可信度评估

```
候选变异位点
    ↓
检查 RepeatMasker / SD 注释
    ↓
┌─────────────┴─────────────┐
↓                           ↓
非重复区域              重复/低复杂度区域
    ↓                           ↓
标准过滤流程            强化审核流程
                                ↓
                    ┌───────────┼───────────┐
                    ↓           ↓           ↓
                MAPQ≥30    MAPQ<30    多重比对
                    ↓           ↓           ↓
                 保留       检查CIGAR    对比XA标签
                                ↓           ↓
                            一致性?    其他位置支持?
                                ↓           ↓
                            是→保留   否→过滤
```

### 具体检查清单

对于重复区域候选变异，建议按以下优先级检查：

1. **定位质量**：
   - 支持 reads 的 MAPQ ≥ 30 的比例 > 80%
   - 无不明确的次要比对（XA 标签）

2. **证据一致性**：
   - 支持 reads 的 CIGAR 模式一致（滑动检查）
   - 正负链 reads 比例接近 1:1（无显著 strand bias）

3. **区域上下文**：
   - 查询 RepeatMasker、SD 数据库了解区域特性
   - 评估是否存在同源假基因干扰

4. **交叉验证**：
   - 使用多个 caller 交叉验证（如 HaplotypeCaller + DeepVariant）
   - 长读长数据（PacBio/ONT）辅助验证（如可用）

## 注意事项

- 不要把重复区域里的变异“盲目当真”，也不要一刀切全部忽略；
- 在报告结果时，建议单独标明“重复/低复杂度区域变异”，并说明证据强度；
- 如果任务特别依赖这些区域（如某些 STR 相关研究），往往需要专门的工具和更严格的 QC。

## 相关页面

- [DNA-seq 变异检测总览](./variant-calling-overview.mdx)
- [DNA-seq 变异过滤与质量控制](./variant-filtering.mdx)
- [MAPQ、CIGAR 与多重比对](../alignment/mapping-quality-and-multi-mapping.md)
- [测序 reads、coverage 与错误模型](../foundations/sequencing-reads-coverage.md)

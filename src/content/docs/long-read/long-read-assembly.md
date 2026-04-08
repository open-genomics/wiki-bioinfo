---
description: 长读长组装的基本原理、OLC 策略流程、纠错方法与质量评估。
title: "长读长组装"
---

import SummaryBox from '@/components/docs/SummaryBox.astro';
import PrerequisitesBox from '@/components/docs/PrerequisitesBox.astro';

<SummaryBox
  summary="长读长组装采用 OLC（Overlap-Layout-Consensus）策略，通过检测 reads 间重叠、构建重叠图、生成共识序列三个主要步骤，结合 polishing 后处理，实现高质量的 de novo 基因组组装。"
  bullets={[
    '长读长可直接跨越重复区域，显著改善组装的连续性',
    'OLC 策略包括：Overlap（重叠检测）→ Layout（图构建）→ Consensus（序列生成）',
    '现代工具使用 string graph 或 repeat graph 优化图结构',
    'Polishing 通过多序列共识显著降低组装错误率'
  ]}
/>

## 问题引入：组装的核心挑战

基因组组装的本质是**从短片段重建长序列**的逆问题。考虑一个简化场景：

> 给定一组字符串片段，如何重建原始的长字符串？
> 片段：{ACGT, CGTA, GTAC, TACG}
> 可能的原始序列：ACGTACG

当片段足够长，且能够覆盖所有区域时，这个问题可解。但在实际基因组中，存在两个主要障碍：

1. **重复序列**：基因组中存在大量相似或相同的序列片段，短片段无法确定其来源位置
2. **覆盖不均**：某些区域覆盖度高，某些区域覆盖度低

长读长技术通过**增加片段长度**，使更多重复区域可被唯一跨越，从根本上改变了组装的可行性。

<PrerequisitesBox
  items={[
    { to: '/docs/assembly/index', label: '基因组组装基础' },
    { to: '/docs/assembly/graph-algorithms', label: '图算法与 de Bruijn 图' },
  ]}
/>

## 为什么长读长改变了组装

短读长组装的核心困难是**重复区解析**。考虑一个简单重复单元 `ATGC` 在基因组中出现 5 次：

- **短读长（150 bp）**：无法确定某条 read 来自哪个重复拷贝，组装图出现复杂分叉
- **长读长（20 kb）**：read 可能包含重复单元及其两侧的独特序列，从而唯一确定位置

长读长带来的优势：

- **跨越重复**：可跨越长度为读长级别的重复区域
- **单倍型区分**：长跨度信息使区分同源染色体成为可能
- **结构变异解析**：直接观测大型插入、缺失和重排

## 基本流程

长读长组装遵循 **OLC（Overlap-Layout-Consensus）** 框架：

### 1. 预处理与筛选

- 去除低质量 reads（基于质量分数或长度）
- 校正 reads（可选，特别是 Nanopore 数据）
- 移除接头序列和污染序列

### 2. 重叠检测（Overlap）

识别 reads 之间可能的重叠关系。这是组装的核心步骤：

- 输入：N 条 reads
- 输出：重叠图（overlap graph），边表示 read 间重叠
- 算法：Minimap、MHAP 等（详见[重叠检测算法](./overlap-detection.md)）

### 3. 布局（Layout）

根据重叠图确定 reads 的相对位置和方向：

- 构建 string graph 或 repeat graph
- 化简图结构（去除 transitively reducible 边）
- 处理重复区域（bubble popping、tip clipping）

### 4. 共识生成（Consensus）

在重叠区域确定最可能的碱基序列：

- 多序列比对（MSA）或部分顺序图（POA）
- 考虑质量分数和覆盖度
- 输出 contig 序列

### 5. Polishing

初始共识序列仍可能有残余错误：

- 用原始 reads 重新比对并生成高质量共识
- 工具：Racon、Medaka（Nanopore）、Arrow（PacBio）
- 可选：用高精度短读长进一步校正（Pilon）

### 6. 评估

检查组装质量：连续性、完整性、正确性

## 主流策略演进

### 传统 OLC

早期 OLC 工具（如 Celera Assembler）直接构建 read-read 重叠图，但对于长读长数据，图的复杂度较高。

### String Graph

**Myers (2005)** 提出 string graph 概念：

- 节点不是 reads，而是 reads 的**唯一序列片段**
- 化简重叠图，去除冗余边
- 重复区域表示为 bubble 结构

现代工具如 **FALCON、Canu** 采用此策略。

### Repeat Graph

**Flye** 等工具使用 repeat graph：

- 明确区分**唯一区域**（unique）和**重复区域**（repeat）
- 通过覆盖度信息识别重复节点
- 更适合处理高重复基因组

## Polishing：从 draft 到高质量

即使完成初始组装，consensus 仍可能有残余错误（特别是 Nanopore 数据）。

### Polishing 原理

利用原始 reads 对组装结果进行多轮校正：

1. **比对**：将原始 reads 比对回 contigs
2. **共识**：在比对覆盖区域生成高质量共识
3. **迭代**：通常需要 2-3 轮达到收敛

### 工具选择

| 数据类型 | 推荐工具 | 原理 |
|---------|---------|------|
| Nanopore | Medaka | 神经网络 |
| Nanopore | Racon | POA 动态规划 |
| PacBio CLR | Arrow | 条件随机场 |
| PacBio HiFi | 通常不需要 | 已有高精度 |
| 混合 | Pilon（短读长） | 短读长校正 |

## 评估指标

### 连续性

**N50**：将所有 contigs 按长度降序排列，累计到总长度 50% 时的 contig 长度。

- N50 越大，组装越连续
- 但需注意：错误拼接也会人为抬高 N50
- 补充指标：NG50（相对于参考基因组长度）、L50（N50 对应的 contig 数量）

### 完整性

**BUSCO（Benchmarking Universal Single-Copy Orthologs）**：

- 检查保守单拷贝基因的存在状态
- 完整性 = 完整 BUSCO 数 / 总 BUSCO 数
- 区分：完整单拷贝、完整重复、片段化、缺失

### 正确性

**与参考比对**（如有高质量参考）：

- 基因组覆盖率
- 平均一致性（identity）
- 结构一致性（是否存在大规模重排）

**独立评估**（de novo）：

-  Merqury：基于 k-mer 的准确性评估
-  QV 分数：估计碱基准确性（如 Q40 = 99.99%）

### 常见错误类型

- **misassembly**：错误连接（如来自不同染色体）
- **haplotig 冗余**：未塌陷的二倍体区域导致 contig 重复
- **序列塌陷**：重复区域被错误压缩为单拷贝

## 常见误区

**N50 越高越好**
不一定。错误拼接、重复区域错误连接都可能人为抬高 N50。需结合 BUSCO 完整性和 QV 分数综合评估。

**长读长一定不需要 polishing**
取决于平台。PacBio HiFi 通常可直接使用，但 Nanopore 原始 assembly 通常需要 polishing 才能达到高质量。

**组装结果是染色体级别**
大多数 assembly 仅达到 contig 级别（无 gaps 的连续序列）。要进一步获得染色体级别 assembly，需要 scaffolding（利用 Hi-C、光学图谱等）。

**重复区域已完全解析**
超过读长长度的重复（如着丝粒卫星重复）仍无法解析，assembly 在此处会出现断裂或错误连接。

## 参考资料

- Myers, E.W. (2005). The fragment assembly string graph. *Bioinformatics*, 21(suppl_2), ii79-ii85.
- Koren, S., et al. (2017). Canu: scalable and accurate long-read assembly via adaptive k-mer weighting and repeat separation. *Genome research*, 27(5), 722-736.
- Kolmogorov, M., et al. (2019). Assembly of long, error-prone reads using repeat graphs. *Nature Biotechnology*, 37(5), 540-546.
- Rhie, A., et al. (2020). Merqury: reference-free quality, completeness, and phasing assessment for genome assemblies. *Genome biology*, 21(1), 1-27.

## 相关页面

- [PacBio 与 Nanopore](./pacbio-nanopore.md)
- [重叠检测算法](./overlap-detection.md)
- [Consensus 算法](./consensus-algorithm.md)
- [组装评估](../assembly/assembly-evaluation.md)

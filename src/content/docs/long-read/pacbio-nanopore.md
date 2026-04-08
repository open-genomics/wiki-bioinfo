---
description: PacBio 与 Oxford Nanopore 两大长读长测序平台的物理原理、误差模式与典型应用场景。
title: "PacBio 与 Nanopore"
---

import SummaryBox from '@/components/docs/SummaryBox.astro';

<SummaryBox
  summary="PacBio SMRT 测序与 Oxford Nanopore 测序代表了两种截然不同的长读长技术路线：前者通过荧光信号实时观测单分子合成过程，后者通过离子电流变化识别穿过纳米孔的碱基。"
  bullets={[
    'PacBio HiFi 通过环形共识测序（CCS）实现 Q20-Q30 单条 read 精度',
    'Nanopore 可产生超长 reads（>1 Mb），且支持直接 RNA 测序',
    '两种平台的误差特征不同：PacBio 以随机插入缺失为主，Nanopore 有系统性同聚物偏差',
    '分析工具需要根据平台特性选择参数和模型'
  ]}
/>

## 问题引入：如何读取长 DNA 分子？

短读长测序（Illumina）的基本策略是**将长 DNA 打断成短片段**，然后并行测序。如果我们希望直接读取长 DNA 分子，需要解决什么新问题？

长读长测序技术面临的核心挑战是：**如何在保持 DNA 分子完整性的同时，逐个识别碱基？**

当前有两条主要技术路线：
- **合成观测法**（PacBio）：实时观察 DNA 聚合酶合成新链的过程
- **穿孔检测法**（Nanopore）：检测 DNA 穿过纳米孔时的物理信号变化

## PacBio：单分子实时测序

### 核心原理

PacBio 的 **SMRT（Single Molecule Real-Time）** 测序建立在零模波导（Zero-Mode Waveguide, ZMW）技术之上。每个 ZMW 是一个直径约 70 nm、深度 100 nm 的纳米孔，底部固定着 DNA 聚合酶。

测序过程：

1. **模板准备**：待测 DNA 片段与引物、聚合酶结合，固定在 ZMW 底部
2. **合成观测**：四种核苷酸（A、T、C、G）带有不同颜色的荧光标记，在溶液中自由扩散
3. **信号捕获**：当聚合酶掺入某个核苷酸时，该碱基的荧光信号在 ZMW 底部短暂停留，被光学系统记录
4. **碱基识别**：根据荧光颜色确定碱基类型，根据信号间隔确定时序

### 从 CLR 到 HiFi：共识测序的力量

早期 PacBio 产生 **CLR（Continuous Long Read）**，单条 read 长度可达 10-50 kb，但错误率较高（~15%）。关键突破是 **CCS（Circular Consensus Sequencing）** 技术：

**制备环形模板（SMRTbell）**：
- 在 DNA 片段两端连接发夹接头，形成环形结构
- 聚合酶可沿环多次循环测序

**多次观测整合**：
- 同一分子被测序 10-30 次
- 通过多序列共识（consensus）校正随机误差
- 最终产生 **HiFi read**：长度 10-25 kb，精度 Q20-Q30（99-99.9%）

这一过程本质上是用**时间换精度**：牺牲通量，换取单分子的高准确性。

## Nanopore：纳米孔电流测序

### 核心原理

Oxford Nanopore 技术采用完全不同的物理原理。蛋白质纳米孔（如 CsgG）嵌入脂质双分子层，两侧施加电压形成离子电流。

测序过程：

1. **分子驱动**：单链 DNA/RNA 在电场作用下被马达蛋白（helicase）解旋，逐个穿过纳米孔
2. **电流调制**：不同 k-mer（通常 5-mer）占据孔道时，会改变离子电流的电导特性
3. **信号记录**：系统以 kHz 频率采样电流信号，产生原始电信号时间序列
4. **碱基识别**：通过 **basecalling 算法**（如 HMM 或神经网络）将电流信号解码为碱基序列

### 技术特点

**超长读长**
由于 DNA 保持完整，理论上 read 长度只受限于文库制备和 DNA 质量。实际应用中已报道超过 2 Mb 的 reads。

**直接 RNA 测序**
与其他平台不同，Nanopore 可直接测序 RNA 分子（无需反转录），并保留碱基修饰信息（如 m6A 甲基化）。

**便携性**
MinION 设备仅重 87 克，可通过 USB 连接笔记本运行，支持野外实时测序。

## 误差模式与平台比较

理解两种平台的误差特征对于选择分析工具至关重要：

| 特征 | PacBio HiFi | Nanopore |
|------|-------------|----------|
| 读长范围 | 10-25 kb | 可达 >1 Mb |
| 单条精度 | Q20-Q30 | Q10-Q20 |
| 主要误差类型 | 随机插入缺失 | 同聚物收缩/延伸 |
| 系统偏差 | 较少 | 某些序列上下文有偏差 |
| 通量 | 中等 | 高（PromethION）|
| 设备成本 | 高 | 低（MinION）到高（PromethION）|

**误差来源差异**：

- **PacBio**：荧光信号检测误差、聚合酶滑移，多为随机误差
- **Nanopore**：电流信号噪声、分子动力学波动、复杂序列上下文（如 homopolymer），存在系统性偏差

这意味着：
- PacBio 数据适合直接用于变异检测
- Nanopore 数据通常需要共识后处理（polishing）才能达到高准确性

## 应用场景

- de novo assembly
- 结构变异检测
- haplotype phasing
- 全长转录本分析（Iso-Seq / direct RNA）
- 重复区域、着丝粒、复杂基因家族解析

## 常见误区

- **长读长一定比短读长更准**：并不总是如此，要看平台和模式；
- **Nanopore 只适合粗略分析**：现代 basecalling 和共识后精度已明显提升；
- **PacBio 和 Nanopore 可以直接混用解释**：误差结构和覆盖特点不同，流程要区分。

## 参考资料

- PacBio HiFi 官方文档
- Oxford Nanopore 官方文档
- 长读长综述文献

## 相关页面

- [长读长组装](./long-read-assembly.md)
- [结构变异检测](./sv-detection.md)
- [组装基础](../assembly/index.md)

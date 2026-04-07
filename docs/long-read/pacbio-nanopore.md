---
sidebar_position: 2
description: PacBio 与 Oxford Nanopore 长读长测序平台的原理、误差与应用。
---

# PacBio 与 Nanopore

## 两大主流平台

当前长读长测序主要由两类技术主导：

- **PacBio SMRT sequencing**
- **Oxford Nanopore sequencing**

两者都能产生远长于 Illumina 的 reads，但测序原理、误差模式和典型应用并不完全相同。

## PacBio：单分子实时测序

PacBio 的核心是 **SMRT（Single Molecule Real-Time）** 测序。DNA 聚合酶被固定在纳米尺度的 ZMW（zero-mode waveguide）孔底，系统实时记录荧光标记核苷酸被掺入时发出的信号。

### HiFi reads

PacBio 近年的重要进展是 **HiFi / CCS（circular consensus sequencing）**：

1. 将同一 DNA 分子做成环形模板；
2. 聚合酶多次绕环测序；
3. 将多次观测整合为高精度共识序列。

结果是：

- read 长度常在 10–25 kb；
- 单条 read 精度可以达到 Q20–Q30 级别；
- 非常适合高质量组装、变异检测和 isoform 分析。

## Nanopore：电流信号读序列

Oxford Nanopore 的原理是：单链 DNA 或 RNA 穿过蛋白纳米孔时，不同的 k-mer 会引起不同的离子电流变化，系统通过这些电流信号反推出碱基序列。

优点：

- read 可以非常长，常见几十 kb，极端情况下超过 1 Mb；
- 仪器灵活，从 MinION 到 PromethION；
- 可直接测 RNA 或检测某些修饰信号。

挑战：

- basecalling 质量依赖模型与信号质量；
- 在某些同聚物和复杂区域的误差模式与 PacBio 不同。

## 误差模式比较

| 平台 | 典型优势 | 典型挑战 |
|------|----------|----------|
| PacBio HiFi | 高准确率、适合高质量组装 | 成本与文库质量要求较高 |
| Nanopore | 超长 reads、设备灵活、可直接 RNA | 信号噪声与 basecalling 依赖更强 |

长读长错误不只是“更多 mismatch”，还会表现为插入/缺失偏差、同聚物问题和平台特异性噪声，因此分析工具通常需要专门建模。

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

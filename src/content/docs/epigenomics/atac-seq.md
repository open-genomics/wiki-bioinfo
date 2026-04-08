---
description: ATAC-seq 的原理、峰调用、footprint 与开放染色质解释。
title: "ATAC-seq"
---


## 是什么

ATAC-seq（Assay for Transposase-Accessible Chromatin using sequencing）用高活性的 **Tn5 转座酶**优先插入开放染色质区域，并同时完成接头连接，从而测到哪些区域处于可及状态。

与 ChIP-seq 不同，ATAC-seq 不针对某个特定蛋白，而是更像在测"哪里比较容易被酶接触到"。因此它常用于：

- 启动子和增强子的开放状态分析；
- 推断潜在转录因子结合；
- 比较不同细胞状态的调控变化。

## 数据特点

ATAC-seq 的插入片段长度本身就有信息：

- **小于 100 bp**：往往对应无核小体开放区；
- **~180 bp、~360 bp**：对应单核小体、双核小体保护片段；
- 因此片段长度分布可反映染色质组织结构。

## 标准流程

1. FASTQ 质控与接头去除；
2. 比对到参考基因组；
3. 去除线粒体 reads、高重复和低质量比对；
4. Tn5 offset 修正；
5. 峰调用；
6. motif / footprint / peak-to-gene 分析。

### Tn5 offset

Tn5 实际切割位置与测到的 read 起始位点存在偏移，因此常对正负链做 +4 / -5 bp 修正，以更准确地定位插入位点。

### 峰调用

ATAC-seq 可直接用 MACS2，但参数通常与 ChIP-seq 不同，例如关闭模型拟合：

```bash
macs2 callpeak \
  -t atac.bam \
  -f BAMPE \
  -g hs \
  -n atac \
  --nomodel --shift -100 --extsize 200
```

## Footprinting

如果某个转录因子真实结合在某个 motif 上，那么该位置会因为蛋白占位而减少 Tn5 插入，motif 两侧则插入较多，形成"脚印"（footprint）。

Footprint 分析常用于推断：

- 哪些转录因子可能在当前条件下活跃；
- 不同细胞类型的调控程序差异。

但 footprint 很依赖数据深度、Tn5 序列偏好校正和 motif 质量，解释要谨慎。

## 单细胞扩展

scATAC-seq 把 ATAC-seq 推到细胞分辨率，但数据更稀疏。下游常做：

- peak × cell 矩阵构建；
- LSI（latent semantic indexing）降维；
- motif deviation 分析（如 chromVAR）；
- 与 scRNA-seq 联合注释。

## 常见误区

- **开放染色质 = 一定在表达**：开放只是潜在可调控，不等于该基因一定高表达；
- **峰最近的基因就是靶基因**：调控元件可能远距离作用；
- **ATAC-seq 可以直接替代 ChIP-seq**：ATAC 看开放性，不直接告诉你哪个因子真的结合；
- **footprint 一定可靠**：低深度或偏好校正不足时很容易出假信号。

## 参考资料

- Buenrostro et al., *ATAC-seq* 原始论文
- ENCODE ATAC-seq pipelines
- chromVAR, ArchR, Signac 文档

## 相关页面

- [ChIP-seq 概览](./chip-seq-overview.md)
- [单细胞组学](../single-cell/index.md)
- [PWM / PSSM](../models/pwm-pssm.md)

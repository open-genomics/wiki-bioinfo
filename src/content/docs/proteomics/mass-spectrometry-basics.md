---
description: 质谱蛋白质组学中的 peptide、m/z、MS1 与 MS2 基础。
title: "质谱基础"
---


## 是什么

基于质谱的蛋白质组学通常不是直接测整条蛋白，而是：

1. 先把蛋白酶解成 peptide；
2. 将 peptide 电离后送入质谱仪；
3. 测量它们的 **m/z（mass-to-charge ratio）**；
4. 再通过碎裂谱推断肽段序列。

<figure>
  <img src="/wiki-bioinfo/img/illustrations/proteomics-ms.svg" alt="mass spectrometry proteomics" />
  <figcaption>蛋白质组学常以“蛋白 → 肽段 → 质谱峰 → 序列匹配”的链条工作，核心测量量是 m/z 和峰强度。</figcaption>
</figure>

## MS1 与 MS2

### MS1

第一次扫描记录的是完整 peptide 离子的 m/z 和峰强度，给出候选 precursor。

### MS2

选中某个 precursor 后将其碎裂，再测碎片离子的 m/z，得到碎裂谱。这个谱图是 peptide 鉴定的核心证据。

## 为什么是 peptide 而不是直接 protein

因为整条蛋白过长、结构复杂，不适合直接做高通量高分辨率测量；而 peptide 更容易分离、电离和解释。

## 常见误区

- **峰越高就一定是蛋白更多**：还受电离效率、肽段性质和仪器响应影响；
- **测到 peptide 就等于直接测到独特蛋白**：有些 peptide 会在多个蛋白间共享；
- **MS1 就能完成全部鉴定**：很多场景仍需依赖 MS2 碎裂谱。

## 相关页面

- [数据库搜索与 FDR](./database-search-and-fdr.md)
- [定量蛋白质组学](./quantitative-proteomics.md)

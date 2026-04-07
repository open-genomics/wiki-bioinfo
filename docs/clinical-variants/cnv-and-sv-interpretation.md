---
sidebar_position: 4
description: CNV 与结构变异在临床解释中的证据与难点。
---

# CNV 与 SV 解释

## 为什么 CNV / SV 更难

CNV 和结构变异的影响常常比 SNV 更大，但解释也更复杂，因为它们涉及：

- 更大的基因组区间；
- 多个基因或调控区域；
- 精确断点不确定；
- 技术平台和算法间差异更明显。

<figure>
  <img src="/wiki-bioinfo/img/illustrations/cnv-interpretation.svg" alt="CNV interpretation" />
  <figcaption>CNV 解释不仅要看大小，还要看涉及哪些基因、是否跨关键区域、与表型是否一致，以及群体和数据库证据如何。</figcaption>
</figure>

## 核心证据维度

- 区间大小；
- 是否包含已知剂量敏感基因；
- 是否落在已知复发性综合征区域；
- 数据库记录（ClinGen、DECIPHER 等）；
- 与患者表型、家系和分离模式的一致性。

## 为什么“越大越危险”不够

一个很大的 CNV 可能跨越多个基因但没有明确致病证据；而一个相对较小、但正好打断关键基因的缺失，可能反而更值得关注。

## 常见误区

- **只看 CNV 长度**：解释必须结合基因内容和表型；
- **算法报出来就等于真实事件**：仍要看覆盖证据、断点证据和验证；
- **SV 只影响 coding 区**：很多事件也可能通过调控区或位置效应致病。

## 相关页面

- [长读长 SV 检测](../long-read/sv-detection.md)
- [ACMG 指南](./acmg-guidelines.md)
- [变异注释与优先级排序](./variant-annotation-and-prioritization.md)

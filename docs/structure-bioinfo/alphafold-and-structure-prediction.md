---
sidebar_position: 3
description: AlphaFold、结构预测输出与置信度解释。
---

# AlphaFold 与结构预测

## 为什么结构预测重要

实验测结构（X-ray、NMR、cryo-EM）非常重要，但也成本高、速度慢。结构预测试图从序列和进化信息出发，给出一个合理的三维构象假设。

<figure>
  <img src="/wiki-bioinfo/img/illustrations/alphafold-pipeline.svg" alt="AlphaFold pipeline" />
  <figcaption>现代结构预测通常从序列和 MSA 出发，结合神经网络预测残基间几何关系，再输出三维模型及其置信度。</figcaption>
</figure>

## AlphaFold 的直觉

不需要把 AlphaFold 理解成“直接背出结构”，更贴切的直觉是：

- 输入：蛋白序列 + MSA / 模板等信息；
- 模型学习残基之间的相对几何关系；
- 输出：三维坐标和每个区域的置信度。

## 输出如何看

常见几个关键量：

- **pLDDT**：局部置信度，越高说明该区域模型更可信；
- **PAE**：预测对齐误差，更适合看不同结构域之间相对位置是否可靠；
- **ranked models**：多个候选模型中排序较高者通常优先查看。

## 什么地方要谨慎

AlphaFold 的强项并不意味着所有区域都可靠：

- 无序区通常低置信度；
- 多 domain 蛋白中，domain 内部可能准，但相对摆放不一定准；
- 配体、膜环境、复合体和构象变化可能显著影响真实结构。

## 常见误区

- **预测结构 = 实验真值**：它是高质量假设，不等同实验确认；
- **pLDDT 高就说明功能一定正确**：结构可靠不等于机制自动确定；
- **低置信度区域没有意义**：很多低置信度区域可能正对应无序调控区。

## 相关页面

- [蛋白结构基础](./protein-structure-basics.md)
- [结构比对与 fold](./structure-alignment-and-fold.md)
- [机器学习与基础模型](../ml-bioinfo/index.md)

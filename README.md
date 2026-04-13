# BioInfo Wiki

**面向中文社区的生物信息学知识库** — 连接经典算法与现代分析流程的开放式 Wiki，像教材一样可连续阅读。

[在线访问](https://lessup.github.io/wiki-bioinfo/) · [贡献指南](src/content/docs/intro/contributing.md) · [写作规范](src/content/docs/intro/style-guide.md)

[![Build](https://github.com/LessUp/wiki-bioinfo/workflows/CI/badge.svg)](https://github.com/LessUp/wiki-bioinfo/actions) [![Deploy](https://github.com/LessUp/wiki-bioinfo/workflows/Deploy%20GitHub%20Pages/badge.svg)](https://github.com/LessUp/wiki-bioinfo/actions) [![Astro](https://img.shields.io/badge/Astro-6-BC52EE?logo=astro)](https://astro.build) [![Starlight](https://img.shields.io/badge/Starlight-0.38-5440D1)](https://starlight.astro.build) [![License](https://img.shields.io/github/license/LessUp/wiki-bioinfo)](./LICENSE)

## 这是什么

大多数生物信息学资料要么是工具教程（教你怎么跑命令），要么是论文综述（假设你已经懂了）。BioInfo Wiki 试图填补中间层：

> **从生物对象出发，用数学和算法语言重新描述整个领域，再回到真实分析流程。**

它的知识结构不是术语堆砌，而是沿 **对象层 → 模型层 → 算法层 → 流程层 → 资源层** 五层递进，帮助读者建立可回溯、可交叉引用的知识地图。

## 内容覆盖

目前涵盖 **200+ 页面**，围绕六大板块组织：

| 板块 | 核心内容 |
|------|----------|
| **基础与数学** | 序列与坐标系统、reads/coverage、概率图模型、算法与复杂度、图算法、字符串匹配、动态规划、分治与随机化 |
| **核心方法** | 序列索引（k-mer / suffix array / BWT / FM-index）、比对（DP / seed-and-extend / BLAST）、组装（OLC / de Bruijn graph）、概率模型（HMM / Viterbi / Gibbs Sampling） |
| **分析方向与案例** | DNA-seq、RNA-seq、单细胞转录组、空间组学、蛋白质组学、表观组学、群体遗传学、长读长测序 |
| **数据、注释与资源** | 参考基因组版本、坐标转换、注释系统（Ensembl / RefSeq / GENCODE）、数据库、文件格式（FASTA / FASTQ / BAM / VCF / GTF） |
| **开始这里** | 项目介绍、学习路线图、贡献说明、写作规范 |

技术栈基于 **Astro + Starlight**，使用 MDX 编写内容，支持 KaTeX 数学公式渲染和 11 个可复用文档组件。

## 快速开始

```bash
# 环境要求：Node.js >= 20
npm install
npm run dev          # http://localhost:4321/wiki-bioinfo/
npm run check        # 类型检查 + 构建验证
```

## 参与贡献

欢迎通过 Issue 和 Pull Request 参与。

```bash
git clone https://github.com/<your-username>/wiki-bioinfo.git
# 修改内容后
npm run check        # 确保构建通过
git commit -m "feat: 添加 XX 内容"
```

详细规范请参阅站内文档：[贡献指南](src/content/docs/intro/contributing.md)、[写作规范](src/content/docs/intro/style-guide.md)。

## 许可证

[MIT](./LICENSE)

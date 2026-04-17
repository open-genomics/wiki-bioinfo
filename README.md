<div align="center">
  <a href="https://lessup.github.io/wiki-bioinfo/">
    <img src="./public/img/bioinfo-logo.svg" width="140" alt="BioInfo Wiki Logo">
  </a>
  
  <h1>BioInfo Wiki</h1>
  
  <p>
    <b>面向中文社区的生物信息学体系化知识库</b><br>
    <span>像教材一样可连续阅读 · 从基础概念到分析流程层层递进</span>
  </p>

  <p>
    <a href="https://lessup.github.io/wiki-bioinfo/">🌐 在线访问</a> •
    <a href="./src/content/docs/intro/contributing.md">🤝 贡献指南</a> •
    <a href="./src/content/docs/intro/style-guide.md">📝 写作规范</a> •
    <a href="./planning/font-optimization.md">⚡ 性能优化</a>
  </p>

  <p>
    <img src="https://github.com/LessUp/wiki-bioinfo/workflows/CI/badge.svg" alt="Build Status">
    <img src="https://github.com/LessUp/wiki-bioinfo/workflows/Deploy%20GitHub%20Pages/badge.svg" alt="Deploy Status">
    <img src="https://img.shields.io/badge/Astro-6-BC52EE?logo=astro" alt="Astro">
    <img src="https://img.shields.io/badge/Starlight-0.38-5440D1" alt="Starlight">
    <img src="https://img.shields.io/github/license/LessUp/wiki-bioinfo" alt="MIT License">
  </p>
</div>

---

## 📖 目录

- [项目亮点](#-项目亮点)
- [与其他资料的不同](#-与其他资料的不同)
- [内容概览](#-内容概览)
- [技术架构](#-技术架构)
- [快速开始](#-快速开始)
- [参与贡献](#-参与贡献)
- [许可证](#-许可证)

---

## ✨ 项目亮点

| 特性 | 说明 |
|------|------|
| 📚 **200+ 深度页面** | 覆盖从入门到进阶的完整知识路径 |
| 🔍 **全文搜索** | 基于 Pagefind 的即时搜索体验 |
| 📱 **响应式设计** | 完美适配桌面、平板、手机 |
| 🌐 **双语支持** | 中文内容为主，英文框架建设中 |
| ⚡ **极速加载** | 系统字体策略 + 构建优化，首屏 < 1s |
| 🎨 **精美排版** | 数学公式 (KaTeX)、代码高亮、插图 |
| 🔄 **持续更新** | 自动化 CI/CD，GitHub Pages 部署 |

---

## 🎯 与其他资料的不同

生物信息学资料通常只有两种：

| 类型 | 优点 | 缺点 |
|------|------|------|
| **工具教程** | 实用，可直接上手 | 只讲命令，不讲原理 |
| **论文综述** | 权威，前沿 | 默认读者已懂背景知识 |

**BioInfo Wiki 填补这个断层：**

> 从 DNA、reads、参考基因组这些**生物对象**出发，用**数学和算法语言**重新描述问题，再连接到**真实的分析流程**。

### 五层递进结构

```
对象层 (DNA/reads/基因组)
    ↓
模型层 (字符串/图/概率模型)
    ↓
算法层 (比对/组装/索引)
    ↓
流程层 (RNA-seq/变异检测/单细胞)
    ↓
资源层 (数据库/格式/工具)
```

不是术语堆砌，而是帮你建立 **可回溯的知识地图**。

---

## 📚 内容概览

### 六大板块

| 板块 | 适合人群 | 内容聚焦 | 页面数 |
|:---|:---|:---|:---:|
| 🚀 [导论](./src/content/docs/intro/) | 所有人 | 项目介绍、学习路线、如何贡献 | 6 |
| 🧮 [基础与数学](./src/content/docs/foundations/) | 零基础 | 序列、坐标系统、概率图模型、算法基础 | 26 |
| ⚙️ [核心方法](./src/content/docs/core-methods/) | 想深入原理 | 索引、比对、组装、概率模型四大支柱 | 45 |
| 🔬 [分析方向](./src/content/docs/applications/) | 做项目的人 | DNA/RNA/单细胞/长读长/空间组学等 | 68 |
| 📊 [数据与资源](./src/content/docs/data-references/) | 需要查资料 | 参考基因组、注释系统、文件格式、数据库 | 20 |
| 📝 [附录](./src/content/docs/appendix/) | 快速查阅 | 术语表、算法索引、参考资料 | 5 |

### 热门主题

- [序列比对算法](./src/content/docs/alignment/) — Needleman-Wunsch、Smith-Waterman、BLAST
- [基因组组装](./src/content/docs/assembly/) — de Bruijn 图、Overlap-Layout-Consensus
- [隐马尔可夫模型](./src/content/docs/models/hmm.mdx) — HMM、Viterbi、Profile HMM
- [RNA-seq 分析](./src/content/docs/transcriptomics/) — 定量、差异表达、伪比对
- [单细胞测序](./src/content/docs/single-cell/) — 细胞分群、轨迹分析、双细胞检测

---

## 🏗️ 技术架构

```
┌─────────────────────────────────────────┐
│           GitHub Pages (CDN)            │
├─────────────────────────────────────────┤
│  Astro 6.x                              │
│  ├── @astrojs/starlight (文档主题)       │
│  ├── @astrojs/sitemap (SEO)             │
│  ├── remark-math (LaTeX 支持)            │
│  └── sharp (图像优化)                    │
├─────────────────────────────────────────┤
│  Pagefind (全文搜索)                     │
│  KaTeX (数学公式渲染)                     │
└─────────────────────────────────────────┘
```

### 性能指标

| 指标 | 数值 | 说明 |
|------|------|------|
| 构建时间 | ~90s | 413 页面 + 搜索索引 |
| 部署大小 | ~74MB | 已优化（剔除本地字体） |
| Lighthouse 性能 | 95+ | 首屏加载 < 1s |
| 搜索响应 | <50ms | 本地索引，无服务端 |

---

## 🚀 快速开始

### 环境要求

- **Node.js** >= 20.0
- **npm** >= 9.0

### 安装与运行

```bash
# 1. 克隆仓库
git clone https://github.com/LessUp/wiki-bioinfo.git
cd wiki-bioinfo

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
# 访问 http://localhost:4321/wiki-bioinfo/

# 4. 构建验证
npm run check

# 5. 分析构建产物大小
npm run analyze
```

### 常用命令

```bash
npm run dev           # 开发模式
npm run build         # 生产构建
npm run preview       # 预览构建结果
npm run check:links   # 检查内部链接
npm run clean         # 清理构建缓存
```

---

## 🤝 参与贡献

我们欢迎各种形式的贡献！

### 贡献方式

- 🐛 **报告问题** — 提交 Issue 描述错误或缺失内容
- 📝 **完善文档** — 补充说明、修正错误、添加示例
- ✨ **新增内容** — 撰写新主题页面（参考[写作规范](./src/content/docs/intro/style-guide.md)）
- 🎨 **改进设计** — 优化 UI/UX、添加插图
- 🌐 **翻译** — 协助英文内容建设

### 快速贡献流程

```bash
# 1. Fork 并克隆
git clone https://github.com/<your-username>/wiki-bioinfo.git
cd wiki-bioinfo

# 2. 创建分支
git checkout -b feat/your-topic

# 3. 修改内容
# 编辑 src/content/docs/ 下的文件

# 4. 验证构建
npm run check

# 5. 提交
npm run check:links   # 确保链接有效
git add .
git commit -m "feat: 添加/完善 XX 内容"
git push origin feat/your-topic

# 6. 创建 Pull Request
```

### 贡献规范

- 遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范
- 更新 `astro.config.mjs` 中的 sidebar（如添加新页面）
- 建立必要的交叉链接
- 运行 `npm run check` 确保无构建错误

---

## 📄 许可证

本项目采用 [MIT License](./LICENSE) 开源。

```
Copyright (c) 2024 LessUp

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

<div align="center">
  <p>
    <sub>用 ❤️ 和 🧬 构建 | 持续更新中</sub>
  </p>
  <p>
    <a href="https://lessup.github.io/wiki-bioinfo/">🌐 访问站点</a> •
    <a href="https://github.com/LessUp/wiki-bioinfo/issues">🐛 报告问题</a> •
    <a href="https://github.com/LessUp/wiki-bioinfo/stargazers">⭐ Star 支持</a>
  </p>
</div>

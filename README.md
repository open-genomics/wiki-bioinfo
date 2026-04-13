# BioInfo Wiki

<p align="center">
  <a href="https://lessup.github.io/wiki-bioinfo/">
    <img src="./public/img/bioinfo-logo.svg" width="120" alt="BioInfo Wiki">
  </a>
</p>

<p align="center">
  <b>面向中文社区的生物信息学体系化知识库</b><br>
  <span>像教材一样可连续阅读，从基础概念到分析流程层层递进</span>
</p>

<p align="center">
  <a href="https://lessup.github.io/wiki-bioinfo/">🌐 在线访问</a> •
  <a href="./src/content/docs/intro/contributing.md">🤝 贡献指南</a> •
  <a href="./src/content/docs/intro/style-guide.md">📝 写作规范</a>
</p>

<p align="center">
  <img src="https://github.com/LessUp/wiki-bioinfo/workflows/CI/badge.svg" alt="Build">
  <img src="https://github.com/LessUp/wiki-bioinfo/workflows/Deploy%20GitHub%20Pages/badge.svg" alt="Deploy">
  <img src="https://img.shields.io/badge/Astro-6-BC52EE?logo=astro" alt="Astro">
  <img src="https://img.shields.io/badge/Starlight-0.38-5440D1" alt="Starlight">
  <img src="https://img.shields.io/github/license/LessUp/wiki-bioinfo" alt="License">
</p>

---

## 🎯 这个项目有什么不同

生物信息学资料通常只有两种：
- **工具教程** —— 告诉你怎么跑命令，但不讲原理
- **论文综述** —— 默认你已经懂了背景知识

BioInfo Wiki 填补这个断层：

> **从 DNA、reads、参考基因组这些生物对象出发，用数学和算法语言重新描述问题，再连接到真实的分析流程。**

不是术语堆砌，而是围绕 **对象 → 模型 → 算法 → 流程 → 资源** 五层递进，帮你建立可回溯的知识地图。

## 📚 内容概览

**200+ 页面** · **6 大板块** · **从入门到实战**

| 板块 | 适合谁 | 内容聚焦 |
|:---|:---|:---|
| 🚀 **开始这里** | 所有人 | 项目介绍、学习路线、如何贡献 |
| 🧮 **基础与数学** | 零基础 | 序列、坐标系统、概率图模型、算法基础 |
| ⚙️ **核心方法** | 想深入原理 | 索引、比对、组装、概率模型四大支柱 |
| 🔬 **分析方向** | 做项目的人 | DNA/RNA/单细胞/长读长/空间组学等 |
| 📊 **数据与资源** | 需要查资料 | 参考基因组、注释系统、文件格式、数据库 |
| 📝 **附录** | 快速查阅 | 术语表、算法索引、参考资料 |

## 🚀 快速开始

```bash
# 环境：Node.js >= 20
npm install
npm run dev      # 本地预览：http://localhost:4321/wiki-bioinfo/
npm run check    # 构建验证
```

## 🤝 参与贡献

欢迎 Issue 和 PR！

```bash
git clone https://github.com/<your-username>/wiki-bioinfo.git
# 修改后
npm run check
git commit -m "feat: 添加 XX 内容"
```

详细规范见：[贡献指南](./src/content/docs/intro/contributing.md) · [写作规范](./src/content/docs/intro/style-guide.md)

## 📄 许可证

[MIT License](./LICENSE)

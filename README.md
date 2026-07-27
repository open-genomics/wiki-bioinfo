# BioInfo Wiki

面向中文社区的生物信息学体系化知识库。项目尝试把**生物学对象、计算模型、核心算法、分析流程和数据资源**连接成一张可连续阅读的知识地图，而不是只提供零散的工具教程。

- **在线访问**：https://lessup.github.io/wiki-bioinfo/
- **核心定位**：从“为什么需要这个方法”出发，再进入算法、流程和资源
- **技术栈**：Astro 6.x + Starlight + TypeScript

## 这个项目提供什么

围绕序列、比对、组装、概率模型、工作流等核心主题组织知识主干，提供从导论到真实分析场景的连续阅读路径，并强调概念、算法、数据格式与流程之间的交叉引用。详细的设计理念与内容边界见[导论](https://lessup.github.io/wiki-bioinfo/intro/)。

## 七个入口

| 入口 | 作用 |
| --- | --- |
| 导论 | 项目定位、学习路线、贡献方式 |
| 基础与数学 | 生物对象、抽象模型、算法基础 |
| 核心方法 | 索引、比对、组装、概率模型 |
| 组学应用 | RNA-seq、单细胞、表观组、长读长等组学分析方向 |
| 临床应用 | 变异检测、临床变异解释、结构生物信息学 |
| 数据与资源 | 参考基因组、注释、文件格式、数据库 |
| 附录 | 术语、参考资料、索引 |

## 开始阅读

- 从 [导论](https://lessup.github.io/wiki-bioinfo/intro/) 了解整体结构
- 从 [基础与数学](https://lessup.github.io/wiki-bioinfo/foundations/) 建立对象与模型框架
- 从 [核心方法](https://lessup.github.io/wiki-bioinfo/core-methods/) 进入主要算法主线
- 从 [组学应用](https://lessup.github.io/wiki-bioinfo/applications-omics/) 或 [临床应用](https://lessup.github.io/wiki-bioinfo/applications-clinical/) 带着问题回溯方法

## 本地开发

```bash
npm install
npm run dev
npm run check
```

常用命令：

- `npm run dev`：本地开发
- `npm run build`：生产构建
- `npm run check`：类型检查 + 构建
- `npm run check:links`：内部链接检查

## 贡献

- 贡献入口：[`CONTRIBUTING.md`](./CONTRIBUTING.md)
- 写作规范与项目设计：站点内 [导论](https://lessup.github.io/wiki-bioinfo/intro/)
- Agent 指令：[`AGENTS.md`](./AGENTS.md)

欢迎提交内容修订、结构改进、链接修复和高质量的新页面建议。

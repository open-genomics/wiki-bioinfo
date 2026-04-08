# BioInfo Wiki

[![Build Status](https://github.com/LessUp/wiki-bioinfo/workflows/CI/badge.svg)](https://github.com/LessUp/wiki-bioinfo/actions)
[![Deploy Status](https://github.com/LessUp/wiki-bioinfo/workflows/Deploy%20GitHub%20Pages/badge.svg)](https://github.com/LessUp/wiki-bioinfo/actions)
[![Astro](https://img.shields.io/badge/Astro-6.1-BC52EE?logo=astro)](https://astro.build)
[![Starlight](https://img.shields.io/badge/Starlight-0.38-5440D1)](https://starlight.astro.build)
[![License](https://img.shields.io/github/license/LessUp/wiki-bioinfo)](./LICENSE)

BioInfo Wiki 是一个面向中文社区的开源生物信息学知识库项目。

它参考 OI Wiki 的信息架构与协作方式，但内容聚焦于生物信息学，尤其强调：

- **生物学对象与算法模型之间的映射** — 从 reads、基因组到动态规划、隐马尔可夫模型
- **经典教材主线与现代分析流程之间的连接** — 以《An Introduction to Bioinformatics Algorithms》为骨架，延伸至 NGS、单细胞、空间转录组等现代应用
- **文档驱动的开放协作与持续迭代** — 像教材一样可连续阅读，而非零散词条堆砌

:rocket: **在线访问**: [https://lessup.github.io/wiki-bioinfo/](https://lessup.github.io/wiki-bioinfo/)

## 项目目标

这个项目希望同时做到：

| 目标 | 说明 |
|------|------|
| :books: **教材式阅读体验** | 像教材一样可以连续阅读，而不是只有零散词条 |
| :world_map: **知识地图** | 把对象、模型、算法、流程和资源串进同一张知识网络 |
| :busts_in_silhouette: **分层友好** | 对新手友好，也能让进阶读者快速回到关键页面 |
| :repeat: **可持续维护** | 内容、组件和导航在同一套规则下长期维护 |

## 技术栈与项目结构

### 核心技术

- **[Astro](https://astro.build/)** 6.x — 静态站点生成器
- **[Starlight](https://starlight.astro.build/)** — Astro 官方文档主题
- **[KaTeX](https://katex.org/)** — 数学公式渲染
- **[TypeScript](https://www.typescriptlang.org/)** — 类型安全

### 关键目录

```
wiki-bioinfo/
├── src/
│   ├── content/docs/          # 文档内容（Markdown / MDX）
│   ├── components/
│   │   ├── docs/              # 文档专用组件
│   │   └── starlight/         # Starlight 覆盖组件
│   ├── styles/                # 全局样式与 KaTeX 样式
│   └── assets/                # 图片资源
├── public/img/                # 静态图片（illustrations/、figures/）
├── astro.config.mjs           # 站点配置（sidebar 导航事实来源）
├── tsconfig.json            # TypeScript 配置
└── package.json             # 依赖与脚本
```

如果你要修改站点结构、首页入口、section landing page 或文档组件，优先先看这些位置，再动手改内容。

## 快速开始

### 环境要求

- Node.js >= 20.0（推荐使用 [nvm](https://github.com/nvm-sh/nvm) 管理）

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

开发服务器默认地址：`http://localhost:4321/wiki-bioinfo/`

### 构建与预览

```bash
# 构建生产版本
npm run build

# 本地预览构建结果
npm run preview
```

### 质量检查

```bash
# 类型检查 + 构建验证
npm run check
```

> :bulb: **提示**: 修改文档、导航、组件或配置后，建议先运行 `npm run check` 确保无错误。

## 内容架构

内容文件位于 `src/content/docs/`，站点围绕 **6 个主入口**组织：

| 主入口 | 路径 | 内容定位 |
|--------|------|----------|
| :rocket: **开始这里** | `intro/` | 项目介绍、学习路线、贡献说明、写作规范 |
| :triangular_ruler: **基础与数学** | `foundations/` | 对象层、reads/coverage、坐标系统、图与概率 |
| :gear: **核心方法** | `core-methods/` | 序列表示、比对、组装、概率模型 |
| :microscope: **分析方向与案例** | `applications/` | 工作流、变异检测、转录组、单细胞等 |
| :books: **数据、注释与资源** | `data-references/` | 数据库、文件格式、参考版本 |
| :bookmark_tabs: **附录** | `appendix/` | 术语表、参考资料、算法索引 |

### 内容层级原则

```
对象层 → 模型层 → 算法层 → 流程层 → 资源层
```

- 对象层：reads、参考基因组、注释
- 模型层：字符串、动态规划、图、概率模型
- 算法层：比对、组装、索引、motif 发现
- 流程层：DNA-seq、RNA-seq、单细胞等工作流
- 资源层：数据库、参考版本、注释系统

> :warning: **注意**: 新增内容前请先判断主题属于哪个主入口和层级，避免随意扩张顶层架构。

## 写作规范

### 语言与术语

- 正文默认使用**简体中文**
- 关键术语首次出现时使用 **"中文（English, 缩写）"** 形式
- 数据库、软件、经典算法、文件格式名称**保留英文**
- 一页内尽量只使用一种主译法，避免同义混用

### 页面类型

| 类型 | 适用场景 | 示例 |
|------|----------|------|
| **Concept** | 对象、术语、数据库、文件格式 | 什么是 reads？什么是 VCF？ |
| **Algorithm** | 索引、比对、图算法、概率算法 | Needleman-Wunsch、FM-index |
| **Workflow** | variant calling、RNA-seq 等流程 | 从 FASTQ 到变异检测 |
| **Section Landing** | 板块总入口 | 核心方法、分析方向 |

### 实现约定

- Section landing page 优先复用 `PageHeaderMeta`、`SectionNavigator`、`RelatedLinks` 等组件
- 普通知识页优先使用 **Markdown**；需要组件或复杂版式时再使用 **MDX**
- 图片优先放在 `public/img/illustrations/`（示意图）或 `public/img/figures/`（成品图）
- 新增/重命名页面时**必须同步检查** `astro.config.mjs` 中的 sidebar 配置

## 部署与 CI/CD

### 自动部署

本项目使用 **GitHub Actions** 实现自动化构建与部署：

| 工作流 | 文件 | 触发条件 | 说明 |
|--------|------|----------|------|
| CI | `.github/workflows/ci.yml` | PR / push | 类型检查 + 构建验证 |
| Deploy | `.github/workflows/deploy-pages.yml` | push to master | 构建并部署到 GitHub Pages |

### 部署配置

```javascript
// astro.config.mjs
site: 'https://lessup.github.io',
base: '/wiki-bioinfo/',
```

目标地址：`https://lessup.github.io/wiki-bioinfo/`

### 首次启用 GitHub Pages

如果仓库尚未启用 Pages：

1. 打开 **Settings → Pages**
2. **Build and deployment** → **Source** 选择 **GitHub Actions**
3. 向 `master` 推送提交或手动触发 `Deploy GitHub Pages` workflow

### 自定义域名

如需更换为自定义域名或其他托管平台，请同步调整：

- `astro.config.mjs` 中的 `site` 与 `base`
- 检查静态资源路径与内部链接兼容性

## 参与贡献

欢迎通过 **Issue** 和 **Pull Request** 参与建设！

### 贡献前必读

1. [贡献指南](src/content/docs/intro/contributing.md) — 如何参与、提交规范
2. [写作规范](src/content/docs/intro/style-guide.md) — 文档风格、术语约定
3. [CLAUDE.md](CLAUDE.md) — AI 辅助约束与执行规范
4. [AGENTS.md](AGENTS.md) — AI agent 扩展工作说明

### 快速贡献流程

```bash
# 1. Fork 并克隆仓库
git clone https://github.com/<your-username>/wiki-bioinfo.git
cd wiki-bioinfo

# 2. 创建功能分支
git checkout -b feat/your-feature-name

# 3. 修改内容并验证
npm run check

# 4. 提交并推送
git commit -m "feat: 添加 XX 内容"
git push origin feat/your-feature-name

# 5. 发起 Pull Request
```

### 反馈与建议

- 发现错误或有改进建议？请提交 [Issue](https://github.com/LessUp/wiki-bioinfo/issues)
- 想讨论内容架构？请查看 [Discussions](https://github.com/LessUp/wiki-bioinfo/discussions)

---

<p align="center">
  用 :heart: 和 :microscope: 为中文生物信息学社区构建知识库
</p>

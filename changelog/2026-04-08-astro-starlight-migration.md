# 从 Docusaurus 迁移到 Astro + Starlight (2026-04-08)

将站点前端框架从 Docusaurus 迁移到 Astro 6 + Starlight 0.38，提升视觉效果、性能和中文搜索体验。

## 迁移动机

- Docusaurus 默认视觉风格偏旧，自定义受 Infima CSS 限制
- Starlight 专为文档/教程设计，开箱即用效果更现代
- Astro Islands Architecture 默认 0 JS，性能更优
- 内置 Pagefind 搜索对中文支持更好
- Shiki 代码高亮优于 Prism

## 变更概要

### 技术栈变更

- **前端框架**：Docusaurus → Astro 6.1 + Starlight 0.38
- **代码高亮**：Prism → Shiki (Expressive Code)
- **搜索**：`@easyops-cn/docusaurus-search-local` → Pagefind (内置)
- **构建输出**：`build/` → `dist/`

### 目录结构变更

- `docs/` → `src/content/docs/`
- `static/` → `public/`
- `src/css/custom.css` → `src/styles/custom.css`
- `docusaurus.config.ts` + `sidebars.ts` → `astro.config.mjs`
- 新增 `src/content.config.ts`（Content Collections 配置）

### 组件迁移

11 个自定义 React 组件重写为 Astro 组件：

- `PageHeaderMeta` — 页面元信息三栏卡片
- `SummaryBox` — 快速概览卡片
- `SectionNavigator` — 子主题导航网格
- `RelatedLinks` — 延伸阅读链接网格
- `PrerequisitesBox` — 前置知识列表
- `ComparisonTable` — 对比表格
- `DecisionMatrix` — 决策矩阵表格
- `ToolMappingBox` — 工具/流程连接列表
- `PitfallsBox` — 常见误区列表
- `DefinitionList` — 术语定义网格
- `WorkflowSteps` — 流程步骤卡片

### 首页

使用 Starlight 内置 hero + Card/LinkCard 组件重建首页，保留原有信息架构（特性、知识地图、学习路线、核心方法桥接）。

### 其他

- Frontmatter：移除 `sidebar_position`、`slug`、`pagination_label`，新增 `title`（Starlight 必填）
- MDX import 路径：`@site/src/components/docs/X` → `@/components/docs/X.astro`
- GitHub Actions：构建产物路径从 `build` 改为 `dist`
- KaTeX 数学公式支持通过 `remark-math` + `rehype-katex` 保留

## 新增文件

- `astro.config.mjs`
- `src/content.config.ts`
- `src/content/docs/index.mdx`（Starlight 首页）
- `src/styles/custom.css`
- `src/styles/katex.css`
- `src/components/docs/*.astro`（11 个 Astro 组件）

## 删除文件

- `docusaurus.config.ts` / `sidebars.ts`
- `src/pages/index.tsx`
- `src/theme/Root.tsx` 及 DocItem/DocPaginator 覆写
- `src/components/home/` 全部
- `src/components/docs/*.tsx` / `*.js` / `*.css`（React 版本）
- `src/css/custom.css`
- `static/`

## 依赖变更

### 移除

- `@docusaurus/core` / `@docusaurus/preset-classic`
- `@mdx-js/react`
- `react` / `react-dom`
- `clsx`
- `prism-react-renderer`
- `@easyops-cn/docusaurus-search-local`

### 新增

- `astro` ^6.1.0
- `@astrojs/starlight` ^0.38.3
- `@astrojs/check` ^0.9.0
- `sharp` ^0.33.0

# 前端界面全面优化 (2026-04-07)

参考 OI Wiki 的设计，对 BioInfo Wiki 前端界面进行全面优化。

## 变更概要

### 1. 首页全面重设计
- **Hero 区域**：从双栏布局改为居中布局，增加渐变标题、毛玻璃徽章
- **搜索框**：首页新增搜索入口，pill 形状设计，支持键入即搜
- **统计数据**：新增数值型统计展示（80+ 页面、6 主入口、14 子专题）
- **Features 板块**：替换原 HighlightsSection，4 列特性卡片带 emoji 图标
- **知识地图**：卡片增加图标、颜色标识和标签 pill
- **学习路线**：增加图标和受众标签
- **核心方法桥接**：卡片改为可点击链接，增加技术标签
- **贡献板块**：增加图标和箭头指示

### 2. 全局导航优化
- **搜索插件**：集成 `@easyops-cn/docusaurus-search-local`（中英双语）
- **Navbar**：启用 `hideOnScroll`，毛玻璃背景效果
- **GitHub 图标**：导航栏 GitHub 链接改为 SVG 图标（亮/暗模式自适应）
- **导航标签精简**：缩短部分导航标签（"分析方向与案例" → "分析方向"）

### 3. 文档页面阅读体验
- **侧边栏**：活跃链接高亮背景色，分类标题加粗，hover 效果
- **TOC**：左侧竖线指示，活跃条目高亮背景，"本页导航"标题
- **代码块**：统一圆角 12px，微投影，标题和复制按钮优化
- **面包屑**：活跃项主题色高亮
- **分页导航**：hover 上浮效果，边框高亮

### 4. 视觉系统升级
- **阅读进度条**：顶部固定渐变进度指示器
- **回到顶部按钮**：圆形毛玻璃按钮，滚动 400px 后显示
- **暗色模式**：全面优化（深蓝色系 #0f172a，侧边栏/TOC/卡片/代码块）
- **卡片系统**：统一 border-radius 18px，微投影，hover 上浮动画
- **投影调整**：从夸张投影改为更克制的 2-12px 范围

### 5. 页脚重设计
- **四栏布局**：入门、知识主干、核心方法、社区
- **社区栏**：新增 Issues 链接
- **版权信息**：增加 "Open Source" 标识

## 新增文件
- `src/theme/Root.tsx` — 全局阅读进度条 + 回到顶部按钮

## 修改文件
- `docusaurus.config.ts` — 搜索插件、导航栏、页脚
- `src/pages/index.tsx` — FeaturesSection 替换 HighlightsSection
- `src/components/home/Hero.tsx` — 居中布局 + 搜索框
- `src/components/home/hero.module.css` — 全新样式
- `src/components/home/Sections.tsx` — 5 个 section 重写
- `src/components/home/sections.module.css` — 全新样式
- `src/components/home/data.ts` — 数据模型升级（icon、color、tags）
- `src/css/custom.css` — 全局样式全面重写

## 新增依赖
- `@easyops-cn/docusaurus-search-local`

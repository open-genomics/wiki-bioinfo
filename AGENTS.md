# AGENTS.md

本文件为 AI coding agent 提供项目背景、技术细节和执行指南。作为 `CLAUDE.md` 的补充，本文件更全面地覆盖项目结构、技术栈和开发工作流。

**规范优先级**: 用户直接指令 > `CLAUDE.md` > 本文件 > `README.md` > 其他文档

---

## 1. 项目概览

**BioInfo Wiki** 是一个面向中文社区的生物信息学体系化知识库。

- **目标**: 提供可连续阅读、可回溯、可交叉引用的知识地图，而非工具手册或命令清单
- **技术栈**: Astro 6.x + Starlight + TypeScript
- **部署**: GitHub Pages (https://lessup.github.io/wiki-bioinfo/)
- **内容规模**: 200+ 页面，覆盖 6 大知识板块

### 1.1 核心设计原则

1. **问题优先，工具其次**: 从"为什么需要这个方法"开始，而非"如何使用某工具"
2. **五层知识结构**:
   - 对象层 (DNA/reads/基因组)
   - 模型层 (字符串/图/概率模型)
   - 算法层 (比对/组装/索引)
   - 流程层 (RNA-seq/变异检测/单细胞)
   - 资源层 (数据库/格式/工具)
3. **中文优先**: 简体中文正文，术语首次出现附英文和缩写

---

## 2. 技术栈与架构

### 2.1 核心技术

| 技术 | 版本 | 用途 |
|------|------|------|
| Astro | 6.x | 静态站点生成框架 |
| @astrojs/starlight | 0.38.x | 文档主题系统 |
| TypeScript | 5.6.x | 类型安全 |
| KaTeX | 0.16.x | 数学公式渲染 |
| Pagefind | - | 全文搜索（Starlight 内置）|
| Sharp | 0.33.x | 图像优化 |

### 2.2 项目目录结构

```
├── src/
│   ├── content/docs/          # 文档内容主目录（215+ 文件）
│   │   ├── index.mdx          # 首页入口
│   │   ├── intro/             # 导论板块（6页）
│   │   ├── foundations/       # 基础与数学（26页）
│   │   ├── core-methods/      # 核心方法（45页）
│   │   ├── applications/      # 分析方向（68页）
│   │   ├── data-references/   # 数据与资源（20页）
│   │   ├── appendix/          # 附录（5页）
│   │   └── en/                # 英文内容框架（建设中）
│   ├── components/
│   │   ├── docs/              # 可复用文档组件（11个）
│   │   │   ├── PageHeaderMeta.astro
│   │   │   ├── SectionNavigator.astro
│   │   │   ├── SummaryBox.astro
│   │   │   ├── RelatedLinks.astro
│   │   │   ├── PrerequisitesBox.astro
│   │   │   ├── PitfallsBox.astro
│   │   │   ├── ToolMappingBox.astro
│   │   │   ├── DecisionMatrix.astro
│   │   │   ├── ComparisonTable.astro
│   │   │   ├── DefinitionList.astro
│   │   │   └── WorkflowSteps.astro
│   │   └── overrides/         # Starlight 覆盖组件
│   │       └── Head.astro
│   └── styles/
│       ├── custom.css         # 全站自定义样式
│       └── katex.css          # 数学公式样式
├── public/
│   ├── img/
│   │   ├── illustrations/     # 示意图
│   │   └── figures/           # 成品配图
│   └── fonts/                 # 本地字体文件（可选）
├── scripts/
│   ├── checks/check-links.sh  # 内部链接检查
│   └── tools/prepare-fonts.sh # 字体准备
├── .github/workflows/
│   ├── ci.yml                 # CI：类型检查、构建
│   ├── deploy-pages.yml       # GitHub Pages 部署
│   └── pr-preview.yml         # PR 预览
├── astro.config.mjs           # 站点配置与导航
├── package.json               # 依赖与脚本
└── tsconfig.json              # TypeScript 配置
```

### 2.3 关键配置文件

#### astro.config.mjs
- **site**: `https://lessup.github.io`
- **base**: `/wiki-bioinfo/`（GitHub Pages 子路径部署）
- **sidebar**: 手工维护的导航结构，是站点信息架构的事实来源
- **locales**: 默认 `zh-CN`，英文框架 `en`（内容建设中，暂不启用）
- **integrations**: Starlight + Sitemap，支持数学公式（remark-math + rehype-katex）

#### tsconfig.json
- 使用 `astro/tsconfigs/strictest` 严格配置
- 路径别名: `@/*` 映射到 `./src/*`

---

## 3. 开发工作流

### 3.1 环境要求

- **Node.js**: >= 20.0
- **npm**: >= 9.0

### 3.2 常用命令

```bash
# 开发
npm run dev              # 启动开发服务器（localhost:4321/wiki-bioinfo/）
npm run start            # 同 dev

# 构建
npm run build            # 生产构建（输出到 dist/）
npm run build:optimize   # 跳过字体优化的构建
npm run preview          # 预览构建结果

# 验证
npm run check            # 类型检查 + 构建（修改后必须运行）
npm run check:links      # 检查内部链接有效性

# 分析
npm run analyze          # 构建并分析产物大小
npm run analyze:size     # 查看最大文件列表

# 清理
npm run clean            # 删除 dist/ 和 .astro/
```

### 3.3 新增页面流程

1. **判断内容层级**: 对象层/模型层/算法层/流程层/资源层
2. **选择页面类型**: Concept / Algorithm / Workflow / Section landing
3. **创建文件**: 
   - 普通页面使用 `.md`
   - 需要组件时使用 `.mdx`
4. **编写内容**: 遵循写作规范（见第 5 节）
5. **更新导航**: 在 `astro.config.mjs` 的 sidebar 中添加条目
6. **建立链接**: 添加与其他页面的交叉引用
7. **验证**: `npm run check` 确保无构建错误

---

## 4. 组件系统

### 4.1 文档组件（src/components/docs/）

| 组件 | 用途 | 典型使用场景 |
|------|------|-------------|
| `PageHeaderMeta` | 页面元信息卡片 | Landing 页顶部 |
| `SectionNavigator` | 子主题导航网格 | 板块入口页 |
| `SummaryBox` | 内容摘要/要点 | 页面开头或章节总结 |
| `RelatedLinks` | 相关页面链接 | 页面末尾 |
| `PrerequisitesBox` | 前置知识提示 | 需要前置知识的页面 |
| `PitfallsBox` | 常见误区警告 | 易错概念页面 |
| `ToolMappingBox` | 工具映射说明 | 连接算法与工具的页面 |
| `DecisionMatrix` | 决策对比表格 | 方案选择页面 |
| `ComparisonTable` | 结构化对比 | 多方案比较 |
| `DefinitionList` | 术语定义列表 | 概念解释页面 |
| `WorkflowSteps` | 工作流步骤 | 分析流程页面 |

### 4.2 组件使用示例

```mdx
---
title: "页面标题"
description: 页面描述
---

import PageHeaderMeta from '@/components/docs/PageHeaderMeta.astro';
import SectionNavigator from '@/components/docs/SectionNavigator.astro';
import RelatedLinks from '@/components/docs/RelatedLinks.astro';

<PageHeaderMeta
  section="SectionName"
  audience="目标读者"
  startWith="阅读建议"
/>

正文内容...

<SectionNavigator
  items={[{
    title: '子页面标题',
    to: '/wiki-bioinfo/path/to/page',
    badge: '标签',
    meta: '元信息',
    description: '描述文本'
  }]}
/>

<RelatedLinks
  links={[{
    title: '相关页面',
    to: '/wiki-bioinfo/related/page',
    description: '说明文本'
  }]}
/>
```

---

## 5. 内容规范

### 5.1 语言与术语

- **默认语言**: 简体中文
- **术语标注**: 首次出现使用"中文（English, 缩写）"格式
- **保留英文**: 软件名、数据库、算法名、文件格式无需翻译

示例:
```
隐马尔可夫模型（Hidden Markov Model, HMM）是一种常见的概率图模型。
使用 BWA 进行比对时，需要先构建 FM-index。
```

### 5.2 排版规范

| 场景 | 正确写法 | 错误写法 |
|------|----------|----------|
| 中英文之间 | `使用 BWA 进行比对` | `使用BWA进行比对` |
| 中文与数字间 | `长度为 150 bp` | `长度为150 bp` |
| 标题格式 | `## 动态规划` | `##动态规划。` |
| 代码块 | ` ```bash ` | ` ``` ` |
| 文件名 | `needleman-wunsch.mdx` | `NeedlemanWunsch.mdx` |

### 5.3 页面结构

**必填 Frontmatter**:
```yaml
---
title: "页面标题"
description: 简短描述（用于 SEO 和摘要）
---
```

**页面类型模板**:

1. **Concept Page**（概念页）:
   - 是什么 → 为什么重要 → 核心概念 → 相关页面

2. **Algorithm Page**（算法页）:
   - 问题定义 → 数学模型 → 递推/伪代码 → Worked example → 相关页面

3. **Workflow Page**（流程页）:
   - 任务目标 → 步骤总览 → 每步说明 → 相关页面

4. **Landing Page**（板块入口）:
   - PageHeaderMeta → 板块概述 → SectionNavigator → RelatedLinks

### 5.4 图片规范

- **示意图**: `public/img/illustrations/`
- **成品图**: `public/img/figures/`
- **必须为 SVG 或优化后的图片**
- **提供有意义的 alt 文本**
- **使用 figure/figcaption 标签**（需要时）

---

## 6. CI/CD 与部署

### 6.1 GitHub Actions 工作流

| 工作流 | 触发条件 | 功能 |
|--------|----------|------|
| `ci.yml` | PR / push | 类型检查、格式检查、链接检查、构建 |
| `deploy-pages.yml` | push to master | 构建并部署到 GitHub Pages |
| `pr-preview.yml` | PR | 提供 PR 预览（如配置）|

### 6.2 构建优化

- **字体策略**: 默认使用系统字体（0MB 下载），可选本地字体
- **构建缓存**: `.astro/` 和 `node_modules/.astro/` 被缓存
- **部署优化**: 生产部署默认移除本地字体文件（节省 ~23MB）

### 6.3 环境变量

| 变量 | 说明 |
|------|------|
| `SKIP_FONT_OPTIMIZATION=1` | 跳过字体优化，加速构建 |
| `USE_LOCAL_FONTS=1` | 使用本地字体（需配合 prepare-fonts.sh）|

---

## 7. 验证与测试

### 7.1 提交前检查清单

修改文档、导航、组件或配置后，**必须**运行：

```bash
npm run check
```

### 7.2 页面发布自检清单

- [ ] frontmatter 包含 `title` 和 `description`
- [ ] 文章从"为什么"开始
- [ ] 关键术语首次出现附英文
- [ ] 中英文之间有空格
- [ ] 代码块标注了语言类型
- [ ] 图片有 `alt` 文本
- [ ] 包含"相关页面"章节建立交叉链接
- [ ] `npm run check` 通过

### 7.3 链接检查

```bash
# 检查内部链接有效性
npm run check:links
```

此脚本会验证所有内部链接是否指向存在的页面。

---

## 8. 常见任务指南

### 8.1 添加新页面

1. 在 `src/content/docs/{section}/` 创建 `.md` 或 `.mdx` 文件
2. 添加 frontmatter（title, description）
3. 在 `astro.config.mjs` 的 sidebar 中添加条目
4. 建立与其他页面的交叉链接
5. 运行 `npm run check` 验证

### 8.2 修改导航结构

- **主入口**: 不要修改 6 个顶层板块（导论、基础与数学、核心方法、分析方向、数据与资源、附录）
- **子导航**: 可在各板块内增删，需同步更新 `astro.config.mjs`
- **slug**: 使用小写英文，连字符分隔

### 8.3 添加新组件

1. 在 `src/components/docs/` 创建 `.astro` 文件
2. 定义清晰的 Props 接口
3. 在 `src/styles/custom.css` 中添加对应的样式类
4. 参考已有组件的使用模式编写文档

### 8.4 处理数学公式

- **行内公式**: `$...$`
- **行间公式**: `$$...$$`（前后空行）
- **公式后必须紧跟解释**: 不要只给符号

示例:
```md
递推关系为：

$$
F(i,j) = \max\{F(i-1,j-1) + s(x_i, y_j),\; F(i-1,j) + g\}
$$

其中 $s(x_i, y_j)$ 是替换得分，$g$ 是 gap 罚分。
```

---

## 9. 资源与参考

### 9.1 必读文档

| 文档 | 用途 |
|------|------|
| `CLAUDE.md` | AI agent 运行时约束 |
| `README.md` | 项目概览与快速开始 |
| `src/content/docs/intro/about.md` | 项目理念与定位 |
| `src/content/docs/intro/contributing.md` | 贡献流程与标准 |
| `src/content/docs/intro/style-guide.md` | 详细的写作规范与模板 |

### 9.2 外部参考

- [Starlight 文档](https://starlight.astro.build/)
- [Astro 文档](https://docs.astro.build/)
- 教材参考:
  - Jones & Pevzner, *An Introduction to Bioinformatics Algorithms*
  - Durbin et al., *Biological Sequence Analysis*

---

## 10. 重要约束总结

### 10.1 不要做的事

- ❌ 重做全站信息架构（维持现有 6 个主入口）
- ❌ 批量重写所有页面
- ❌ 发明新的写作体系或组件模式
- ❌ 将 concept page 写成工具教程
- ❌ 将 workflow page 写成纯数学推导

### 10.2 应该做的事

- ✅ 做小而清晰、可验证的改动
- ✅ 优先复用已有组件和样式
- ✅ 修改后运行 `npm run check`
- ✅ 建立页面间的交叉链接
- ✅ 保持中文优先、术语规范的写作风格

---

**最后更新**: 2026-04-17

本文档应保持与项目实际状态同步。如有重大架构变更，请同步更新本文件。

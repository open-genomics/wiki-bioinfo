# 贡献指南

感谢你考虑为 BioInfo Wiki 做出贡献！

## 📋 目录

- [行为准则](#行为准则)
- [我能如何贡献](#我能如何贡献)
- [开发流程](#开发流程)
- [写作规范](#写作规范)
- [提交规范](#提交规范)
- [项目结构](#项目结构)

## 行为准则

本项目采用贡献者公约作为行为准则。参与本项目即表示你同意遵守其条款。请阅读 [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) 了解详情。

## 我能如何贡献

### 报告问题

如果你发现文档错误、链接失效或内容问题：

1. 检查 [Issues](https://github.com/LessUp/wiki-bioinfo/issues) 是否已有相同问题
2. 如果没有，创建新 Issue，包含：
   - 清晰的标题和描述
   - 问题所在页面的链接
   - 复现步骤（如适用）
   - 建议的解决方案（可选）

### 改进文档

**适合新贡献者的任务：**

- 修复拼写错误、语法问题
- 改进表述不清晰的内容
- 补充缺失的交叉链接
- 更新过时的信息

**需要更多了解的任务：**

- 撰写新页面
- 重构现有内容
- 添加图表、示例
- 改进组件样式

### 添加新内容

新增页面时请确保：

1. 内容符合项目定位（知识库，非工具手册）
2. 页面类型正确（concept/algorithm/workflow/landing）
3. 已添加必要的交叉链接
4. 已更新 `astro.config.mjs` 中的 sidebar

## 开发流程

### 环境准备

```bash
# 要求 Node.js >= 20
node --version

# 克隆仓库
git clone https://github.com/<your-username>/wiki-bioinfo.git
cd wiki-bioinfo

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 开发循环

```bash
# 1. 创建功能分支
git checkout -b feature/your-feature

# 2. 修改内容

# 3. 本地验证
npm run check     # 类型检查 + 构建
npm run dev       # 本地预览

# 4. 提交更改
git add .
git commit -m "feat: 添加 XX 内容"

# 5. 推送并创建 PR
git push origin feature/your-feature
```

### 构建命令

| 命令 | 说明 |
|:---|:---|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run check` | 类型检查 + 构建 |
| `npm run preview` | 预览构建结果 |
| `npm run check:links` | 检查内部链接 |

## 写作规范

### 语言风格

- 正文使用简体中文
- 关键术语首次出现时：**中文（English, 缩写）**
- 数据库、软件、文件格式名称保留英文
- 一页内保持术语翻译一致

### 页面类型

| 类型 | 用途 | 示例 |
|:---|:---|:---|
| **Concept** | 对象、术语、数据库 | reads、参考基因组、FASTA |
| **Algorithm** | 算法、方法 | Needleman-Wunsch、BLAST |
| **Workflow** | 分析流程 | RNA-seq、变异检测 |
| **Landing** | 板块入口 | 序列比对、基因组组装 |

### 页面结构

推荐阅读路径：

1. 这个页面在讲什么（是什么）
2. 为什么这个问题值得讲（动机）
3. 核心概念/算法/流程（主体内容）
4. 与其他页面的关系（连接）
5. 常见误区（避坑）
6. 延伸阅读（下一步）

### Markdown vs MDX

- **默认使用 `.md`**
- 只有需要组件时才用 `.mdx`
- 优先复用现有组件

### 常用组件

```mdx
---
title: 页面标题
description: 页面描述
---

import PageHeaderMeta from '@/components/docs/PageHeaderMeta.astro';
import SummaryBox from '@/components/docs/SummaryBox.astro';
import RelatedLinks from '@/components/docs/RelatedLinks.astro';

<PageHeaderMeta 
  section="Core Methods"
  timeToRead={15}
  difficulty="中级"
/>

<SummaryBox>

一句话总结这个页面的核心内容。

</SummaryBox>

## 核心内容

正文...

<RelatedLinks
  links={[
    { title: '相关页面', to: '/wiki-bioinfo/path/to/page', description: '简要说明' },
  ]}
/>
```

## 提交规范

### Commit Message 格式

```
<type>(<scope>): <subject>

<body>
```

### Type 类型

| Type | 说明 | 示例 |
|:---|:---|:---|
| `feat` | 新功能/新页面 | `feat: 添加 Smith-Waterman 算法页面` |
| `fix` | 修复问题 | `fix: 修正编辑距离公式的错误` |
| `docs` | 文档改进 | `docs: 更新贡献指南` |
| `style` | 格式调整 | `style: 统一代码块格式` |
| `refactor` | 重构 | `refactor: 重写比对章节结构` |
| `perf` | 性能优化 | `perf: 优化图片加载` |
| `test` | 测试相关 | `test: 添加链接检查脚本` |
| `chore` | 杂项 | `chore: 更新依赖版本` |

### PR 标题

遵循与 Commit Message 相同的格式：

```
feat: 添加长读长比对章节
fix: 修复 VCF 格式页面的链接错误
docs: 改进首页知识地图布局
```

## 项目结构

```
wiki-bioinfo/
├── src/
│   ├── content/
│   │   └── docs/              # 文档内容
│   │       ├── index.mdx      # 首页
│   │       ├── intro/         # 导论
│   │       ├── foundations/   # 基础与数学
│   │       ├── alignment/     # 序列比对
│   │       ├── assembly/      # 基因组组装
│   │       ├── models/        # 概率模型
│   │       └── ...            # 其他章节
│   ├── components/
│   │   └── docs/              # 文档组件
│   └── styles/
│       ├── custom.css         # 全局样式
│       └── katex.css          # 数学公式样式
├── public/
│   └── img/                   # 图片资源
├── astro.config.mjs           # Astro 配置 (含 sidebar)
├── CLAUDE.md                  # Claude Code 约束
├── AGENTS.md                  # AI Agent 说明
└── CONTRIBUTING.md            # 本文件
```

### 关键文件

- **`astro.config.mjs`** - 导航 sidebar 的事实来源
- **`CLAUDE.md`** - Claude Code 的项目约束
- **`AGENTS.md`** - AI 辅助贡献的工作指南

## 需要帮助？

- 💬 [GitHub Discussions](https://github.com/LessUp/wiki-bioinfo/discussions) - 提问和讨论
- 🐛 [Issues](https://github.com/LessUp/wiki-bioinfo/issues) - 报告问题
- 📧 Email - 在 GitHub profile 查找联系方式

---

再次感谢你的贡献！🎉

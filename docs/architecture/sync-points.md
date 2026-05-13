# 同步点清单

本文档记录项目中需要手动同步的关键位置。当修改某一处时，请检查是否需要同步更新其他位置。

## 1. 板块信息

当添加、修改或删除板块时，需同步更新：

| 位置 | 用途 | 文件 |
|------|------|------|
| `src/data/sections.ts` | **单一真相源** — 板块 ID、标题、描述、sidebar 项 | 数据层 |
| `astro.config.mjs` | sidebar 配置（通过 `getSidebarConfig()` 自动生成） | 配置层 |
| `src/components/docs/PageHeaderMeta.astro` | 页面头部板块元信息（通过 `sections` 自动获取） | 组件层 |
| `src/content/docs/` | 目录结构 | 内容层 |

**同步流程**：

1. 在 `sections.ts` 中添加/修改板块条目（路径前缀 → section ID 映射自动从 `sections[].items` 推导，无需手动维护）
2. 在 `src/content/docs/` 中创建对应的目录和页面
3. `astro.config.mjs` 和 `PageHeaderMeta` 会自动从 `sections.ts` 获取信息

## 2. 文档组件

当修改文档组件时，需同步更新：

| 位置 | 用途 |
|------|------|
| `src/components/docs/` | 组件定义 |
| `src/content/docs/**/*.mdx` | 使用该组件的页面 |
| `openspec/specs/components/spec.md` | 组件规范 |

## 3. 样式

当修改组件样式时，需同步更新：

| 位置 | 用途 |
|------|------|
| `src/styles/custom.css` | 自定义组件样式 |
| `src/styles/katex.css` | KaTeX 数学公式样式 |
| `src/components/docs/*.astro` | 组件内联样式 |

## 4. CI/CD

当修改构建配置时，需同步更新：

| 位置 | 用途 |
|------|------|
| `package.json` | 依赖和脚本 |
| `astro.config.mjs` | Astro 配置 |
| `.github/workflows/ci.yml` | CI 工作流 |
| `.github/workflows/deploy-pages.yml` | 部署工作流 |

---

## 历史变更

- 2026-05-08: 初始创建，记录架构重构后的同步点

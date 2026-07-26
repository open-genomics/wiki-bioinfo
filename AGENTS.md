<!-- AGENTS.md -->

# BioInfo Wiki Agent Guide

## 1. Source of truth

- **运行时摘要**：本文件、`CONTEXT.md`
- 发生冲突时，以本文件为准

## 2. Project snapshot

- **项目**：面向中文社区的生物信息学体系化知识库
- **技术栈**：Astro 6.x + Starlight + TypeScript + KaTeX
- **部署**：GitHub Pages `https://lessup.github.io/wiki-bioinfo/`
- **结构边界**：维持现有 7 个顶层入口（intro / foundations / core-methods / applications-omics / applications-clinical / data-references / appendix），不重做顶层信息架构

## 3. Closeout-first rules

- 优先做**减法和收敛**，不是继续堆叠工程化设计
- 优先修复真实不一致：规范漂移、过时文档、低价值 workflow、目录混乱、无意义增强
- 允许删除、合并、下线低价值或误导性资产
- 不在面向读者的文档中强调"项目即将归档"，但内部治理按低维护目标设计

## 4. Content rules

- 中文优先，术语首次出现使用"中文（English, 缩写）"
- 先讲问题和动机，不写成工具操作手册
- docs 目录治理采用：**保留 / 重写 / 合并 / 下线 / 延后不动**
- 首页和 `intro/` 是优先治理入口
- 英文内容如果未维护，就不要保留"名义关闭、实际启用"的状态

## 5. Engineering rules

- 站点单源配置：`astro.config.mjs`
- 修改文档、配置、组件、workflow 后运行：`npm run check`
- 只保留高信号 CI/CD；默认避免低 ROI 自动化
- 覆盖层和样式做减法，避免保留纯装饰性复杂逻辑
- 链接单源：组件 `to:` 用无前缀路径（`/core-methods/...`），由 `link-utils.ts` 统一拼接 `BASE_URL`；markdown 链接用相对路径（`./`/`../`）
- 文档组件 7 个：`NoteCard` / `PrerequisitesBox` / `DefinitionList` / `DataTable` / `LinkGrid` / `PageHeaderMeta` / `WorkflowSteps`，共享 `link-utils.ts`
- `sections.ts` 是侧边栏单一真相源，目录迁移后必须同步 slug

## 6. AI workflow

- 回复默认使用中文
- subagent 用于批量审计和高噪音检查
- 关键里程碑可使用 `/review`

## Agent skills

### Issue tracker

GitHub Issues (`gh` CLI)。

### Triage labels

默认词汇：`needs-triage`、`needs-info`、`ready-for-agent`、`ready-for-human`、`wontfix`。

### Domain docs

`CONTEXT.md` 在仓库根目录，记录领域概念与组件表。

### Architecture docs

- `CONTEXT.md` — 领域概念、页面类型、文档组件表

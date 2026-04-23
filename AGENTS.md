<!-- AGENTS.md -->

# BioInfo Wiki Agent Guide

## 1. Source of truth

- **长期规范**：`openspec/specs/`
- **运行时摘要**：本文件、`CLAUDE.md`、`.github/copilot-instructions.md`
- 发生冲突时，以 **OpenSpec** 为准

## 2. Project snapshot

- **项目**：面向中文社区的生物信息学体系化知识库
- **技术栈**：Astro 6.x + Starlight + TypeScript + KaTeX
- **部署**：GitHub Pages `https://lessup.github.io/wiki-bioinfo/`
- **结构边界**：维持现有 6 个顶层入口，不重做顶层信息架构

## 3. Closeout-first rules

- 优先做**减法和收敛**，不是继续堆叠工程化设计
- 优先修复真实不一致：规范漂移、过时文档、低价值 workflow、目录混乱、无意义增强
- 允许删除、合并、下线低价值或误导性资产
- 不在面向读者的文档中强调“项目即将归档”，但内部治理按低维护目标设计

## 4. Content rules

- 中文优先，术语首次出现使用“中文（English, 缩写）”
- 先讲问题和动机，不写成工具操作手册
- docs 目录治理采用：**保留 / 重写 / 合并 / 下线 / 延后不动**
- 首页和 `intro/` 是优先治理入口
- 英文内容如果未维护，就不要保留“名义关闭、实际启用”的状态

## 5. Engineering rules

- 站点单源配置：`astro.config.mjs`
- 修改文档、配置、组件、workflow 后运行：`npm run check`
- 只保留高信号 CI/CD；默认避免低 ROI 自动化
- 覆盖层和样式做减法，避免保留纯装饰性复杂逻辑

## 6. AI workflow

- 结构性改动先走 OpenSpec：`/opsx:propose` → `/opsx:apply` → `/opsx:archive`
- 关键里程碑使用 `/review`
- subagent 用于批量审计和高噪音检查
- 默认不常态化使用 `/fleet`
- Copilot 回复默认使用中文；项目级规则见 `.github/copilot-instructions.md`

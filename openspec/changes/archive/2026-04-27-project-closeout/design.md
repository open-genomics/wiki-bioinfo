## Context

当前仓库的主要问题不是“站点不能构建”，而是治理层和展示层长期漂移：`openspec/specs/`、`AGENTS.md`、`CLAUDE.md`、`README.md`、`.github/*`、Astro 配置、GitHub Actions、站点首页、GitHub about/homepage/topics 分别承担了部分规范和叙事职责，但彼此并不收敛，导致项目看起来功能很多、文档很多、自动化很多，却缺少一条稳定的收尾主线。

本次 change 是跨越 OpenSpec、根文档、站点、workflow、GitHub 元数据和 AI 工具链的**仓库级收尾整治**。用户已确认采用激进清理策略，因此设计重点不是兼容历史堆叠，而是建立一个可长期维持的最小、高信号项目骨架，同时避免改动超出 6 个顶层内容入口这一硬边界。

## Goals / Non-Goals

**Goals:**

- 让 `openspec/specs/` 成为唯一长期规范源，并让其他运行时文档退化为精简入口层。
- 删除、合并或重写低价值、过时、误导性的文档、workflow、配置和内容入口。
- 重建 GitHub Pages 首页、仓库元数据和 README 的一致对外叙事。
- 为 Closeout 阶段定义清晰的 AI 协作模式、LSP/editor 最小配置和低分支工作流。
- 修正英文目录、站点启用行为、CI/CD 与仓库默认分支等不一致问题。

**Non-Goals:**

- 不重做 6 个顶层知识入口，不整体推翻现有信息架构。
- 不重写全部 215+ 内容页，只治理高风险、高噪音、高漂移部分。
- 不为“工具齐全”而引入额外 MCP、插件或复杂自动化。
- 不为历史兼容保留所有旧文档、旧 workflow 和迁移痕迹。

## Decisions

### 1. 采用单一主 change 承载 Closeout

使用 `project-closeout` 作为唯一主变更，统一承载规范重建、文档治理、工程瘦身和站点收口，而不是拆成多个并行 change。

**Why:** 用户目标是尽快收尾，而不是继续扩张。单一主 change 能减少分支漂移、重复审查和多套任务列表不同步的问题。

**Alternatives considered:**

- **多个并行 change**：更容易让仓库继续碎片化，不符合收尾目标。
- **只在 SQL 或计划文件中追踪**：无法进入 OpenSpec 正式流程，也不利于后续归档。

### 2. 以 OpenSpec 为规范单源，其他指令文件只保留运行时摘要

`openspec/specs/` 承担长期规范；`AGENTS.md`、`CLAUDE.md`、`copilot-instructions.md` 只保留执行时最需要的项目约束、入口和工具使用边界。

**Why:** 当前主要问题之一就是规范重复且彼此漂移。减少重复层是避免后续再次腐化的核心。

**Alternatives considered:**

- **保留完整 AGENTS + CLAUDE + OpenSpec 三套手册**：维护成本高，未来继续漂移。
- **完全删除运行时摘要文档**：会降低日常 agent/tool 的启动效率。

### 3. 收尾阶段默认做“减法优先”的 aggressive cleanup

对英文内容框架、`planning/*`、`CHANGELOG.md`、低价值 `.github/*` 文档、PR preview workflow、站点装饰性增强项采用直接删除 / 合并 / 下线策略，只保留可以解释清楚长期收益的资产。

**Why:** 用户已经明确优先“尽快完善完结”，不是继续维护大而全的工程壳。

**Alternatives considered:**

- **全部保留，只增加说明**：噪音仍然存在，项目难以真正收口。
- **一次性大重写全部文档和内容页**：成本太高，也会破坏已有稳定内容。

### 4. 先治理规范与工程，再治理对外叙事和内容入口

执行顺序优先为：OpenSpec 与运行时指令 → 根文档与 workflow/config → 首页与 GitHub 元数据 → 内容目录集中治理。

**Why:** 如果规范和 workflow 没先收敛，后面的文档和首页重写仍会继续漂移。

**Alternatives considered:**

- **先改首页/README**：会在规范未定时重复返工。
- **先大范围逐页治理 docs**：在没有 triage 规则前容易浪费精力。

### 5. `/review` 是关键里程碑工具，subagent 用于批量审计，`/fleet` 默认不常态化

Closeout 工作流中保留少量高价值审查节点；复杂审计可交给 subagent；`/fleet` 只在明确收益大于额度消耗时使用。

**Why:** 用户明确不希望套餐被 `/fleet` 快速消耗，同时希望一轮会话承担更长任务链。

**Alternatives considered:**

- **全程手工、不使用审查或 subagent**：对跨文件治理不够稳。
- **广泛使用 `/fleet`**：不符合成本约束。

### 6. LSP/editor 配置只补充项目高频栈，不追求“所有工具统一接线”

项目级 editor/LSP 配置只覆盖 Astro、TypeScript、JSON、YAML、Markdown/MDX 等高频内容；不为 Claude/Codex/Copilot 的“理论通用”引入复杂适配层。

**Why:** LSP 是否生效取决于具体工具生态，过度设计只会增加维护成本。

**Alternatives considered:**

- **完整多工具统一 LSP/MCP 方案**：复杂且收益不稳定。
- **完全不配置任何 editor/LSP**：会错失低成本高收益的规范化机会。

## Risks / Trade-offs

- **[Risk] 激进清理误删仍有价值的资产** → **Mitigation**: 优先按“失真 / 重复 / 无法证明收益 / 与现状冲突”判定，保留高信号文档和稳定内容。
- **[Risk] 当前 worktree 已有未提交改动，和整治动作冲突** → **Mitigation**: 逐文件审查现有改动，只在确认属于收尾范围时整合，不回退来源不明但无冲突的更改。
- **[Risk] docs 规模大，单轮治理过深** → **Mitigation**: 优先治理首页、intro、英文目录和导航/交叉链接一致性，不尝试全量重写内容页。
- **[Risk] 删除 preview/PWA/装饰性增强后，用户感觉“功能变少”** → **Mitigation**: 以真实性、维护成本和实际收益为标准；保留真正有用户价值的能力，删除噪音。
- **[Risk] GitHub metadata 与站点定位仍可能分离** → **Mitigation**: 在同一轮中同步更新 README、首页、Head 元信息与 `gh repo edit`。

## Migration Plan

1. 创建并完成 `project-closeout` 的 proposal / design / specs / tasks。
2. 先重构 `openspec/specs/` 与运行时指令文档，建立规范单源。
3. 清理根目录治理文档、`.github/*` 文档和 planning / changelog 历史残留。
4. 收敛 Astro 配置、Head 覆盖、workflow、package scripts 与公共资源策略。
5. 重构首页和 intro 入口，再集中治理英文目录与 docs triage。
6. 更新 GitHub about/homepage/topics，并做一次完整验证。
7. 完成 change 后归档，为低频维护保留稳定状态。

**Rollback strategy:** 本次整治主要是仓库内容和配置收敛，没有外部数据迁移。若某一部分裁剪过度，可按 Git 历史恢复个别文件，但不回滚整轮治理策略。

## Open Questions

- `CHANGELOG.md` 最终是完全删除，还是保留一个精简“最后版本说明”仍需在实现时结合实际内容判断。
- 英文目录是完全下线，还是保留极小占位框架，需要在实际内容质量审计后决定。
- 若 `.github/DISCUSSIONS.md`、`SECURITY.md`、issue templates 中存在确有价值的项目化内容，应优先精简而非机械删除。

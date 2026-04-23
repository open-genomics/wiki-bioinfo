## Why

当前仓库已经从“可运行的知识站点”演变成“规范、文档、工程配置和工具链逐步漂移的项目”：OpenSpec 不是唯一规范源，根目录与 `.github/` 文档重复且失真，GitHub Pages 首页与仓库元数据叙事不一致，英文内容与实际启用状态冲突，workflow 与站点增强项存在低信号和过度设计。用户的目标也已经明确转向**尽快收尾、完成治理、进入低维护归档阶段**，因此现在需要一次以减法和收敛为主的系统化整治。

## What Changes

- 将 `openspec/specs/` 重构为项目治理的唯一长期规范源，补齐项目收尾、内容治理、GitHub 元数据、AI 协同流程等要求。
- 精简并重写 `AGENTS.md`、`CLAUDE.md`，新增项目级 `copilot-instructions.md`，统一 Claude / Copilot / Codex / OpenSpec 的协作规则。
- 清理根目录与 `.github/` 的低价值、过时、重复文档，删除失真 changelog 与临时 planning 资产，保留高信号治理文档。
- 重构 GitHub Pages 首页与站点信息层，收敛 `Head.astro`、PWA/SEO/字体/Mermaid 等增强项，确保对外叙事真实、一致、可维护。
- 集中治理 `src/content/docs/`，优先处理首页、`intro/`、英文目录策略、导航与交叉链接一致性，按“保留 / 重写 / 合并 / 下线”进行激进裁剪。
- 精简 `package.json`、Astro 配置与 GitHub Actions，移除低信号 workflow 和无明确收益的工程化配置。
- 使用 `gh` 对 GitHub about / homepage / topics 做收敛整理，使仓库元数据与站点定位一致。
- 为项目建立最小但高收益的 AI 开发模式：OpenSpec 主导、关键节点 `/review`、必要时使用 subagent，默认避免 `/fleet` 常态化，并补齐高 ROI 的 LSP/editor 配置。

## Capabilities

### New Capabilities

- `repo-governance`: 定义仓库收尾阶段的治理规则、保留/删除策略、根目录文档边界与归档导向维护原则。
- `github-presence`: 定义 GitHub Pages 首页、仓库 about/homepage/topics、对外叙事一致性与低维护运营面要求。
- `ai-tooling`: 定义 OpenSpec、Copilot、Claude、Codex、`/review`、subagent、LSP、MCP 的项目级协作与取舍规则。

### Modified Capabilities

- `project`: 项目定位从持续扩展转为高质量收尾，补充目录边界、信息架构稳定性、英文内容策略和规范单源要求。
- `content`: 内容规范增加集中治理、页面 triage、低质量内容裁剪、首页/intro 优先治理和交叉链接一致性要求。
- `components`: 组件使用与覆盖策略将加入“减法优先”和收尾阶段的复杂度控制要求。
- `workflow`: 工作流将改为 OpenSpec 驱动的 closeout 流程，明确 propose/apply/archive、`/review` 节点、少分支和少 `/fleet` 原则。
- `ci-cd`: CI/CD 将收敛为高价值检查和部署链路，删除误导性预览或低 ROI 自动化，修正 Pages/branch/preview 一致性。
- `tasks`: 常见任务将更新为收尾治理导向，包括文档治理、规范修订、仓库元数据维护和最终归档准备。

## Impact

- **Affected specs**: `openspec/specs/project/spec.md`, `content/spec.md`, `components/spec.md`, `workflow/spec.md`, `ci-cd/spec.md`, `tasks/spec.md`, and new capabilities under `openspec/changes/project-closeout/specs/`.
- **Affected docs**: `AGENTS.md`, `CLAUDE.md`, `README.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `.github/*`, `planning/*`, and new `copilot-instructions.md`.
- **Affected site/config**: `astro.config.mjs`, `src/content/docs/index.mdx`, `src/content/docs/intro/*`, `src/components/overrides/Head.astro`, `src/styles/custom.css`, `package.json`, `.github/workflows/*`.
- **Affected repository operations**: GitHub repository description, homepage URL, topics, and the project’s long-term maintenance workflow.

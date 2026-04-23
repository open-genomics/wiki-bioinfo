---
name: ai-tooling
overview: AI 工具链、LSP 与 MCP 的项目级协作规则
metadata:
  version: 1.0.0
  format: openspec
---

# AI 工具链规格

## Purpose

定义 OpenSpec、Copilot、Claude、Codex、review/subagent、LSP 和 MCP 在本项目中的最小协作方式。

## Requirements

### Requirement: 项目级 AI 指令统一
项目 SHALL 为 OpenSpec、Copilot、Claude、Codex 等常用 AI 工具提供统一且项目化的协作规则；这些规则 MUST 以中文优先、OpenSpec 优先和 closeout-first 为核心。

#### Scenario: 生成项目级 Copilot 指令
- **WHEN** 创建或更新 `copilot-instructions.md`
- **THEN** 内容必须明确中文回复、OpenSpec 工作流、`/review` 使用时机和收尾阶段的减法原则

#### Scenario: 指令文件协调
- **WHEN** 更新 `AGENTS.md`、`CLAUDE.md` 或 `copilot-instructions.md`
- **THEN** 三者必须共享一致的项目约束，而不是分别发散

### Requirement: LSP 与编辑器配置最小化
项目 SHALL 只为 Astro、TypeScript、JSON、YAML、Markdown/MDX 等高频技术栈补充高 ROI 的 editor/LSP 配置，而不得为了理论兼容性增加复杂的工具接线层。

#### Scenario: 添加 editor 配置
- **WHEN** 引入 `.vscode/` 或等效项目级编辑器配置
- **THEN** 配置必须直接改善当前仓库的写作、类型检查或配置文件维护体验

#### Scenario: 评估新工具
- **WHEN** 考虑引入新的 LSP、插件或扩展建议
- **THEN** 只有在其对当前技术栈有明确收益时才允许纳入仓库

### Requirement: MCP 取舍
项目 SHALL 将 MCP 视为有上下文与维护成本的可选项；若某个 MCP 不能稳定带来高频收益，则 MUST 不引入，或在文档中明确其非默认地位。

#### Scenario: 评估 MCP
- **WHEN** 考虑为项目新增 MCP
- **THEN** 必须先评估其上下文消耗、维护成本和是否真的优于现有 skill 或 CLI 工作流

#### Scenario: 默认工具链
- **WHEN** 现有 OpenSpec、`gh`、review/subagent 和项目级指令已能覆盖主要场景
- **THEN** 不新增额外 MCP

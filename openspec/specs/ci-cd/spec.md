---
name: ci-cd
overview: 高信号 CI 与 GitHub Pages 部署规则
metadata:
  version: 2.0.0
  format: openspec
---

# CI/CD 规格

## Purpose

定义收尾阶段保留的持续集成和部署能力，避免维护低价值自动化。

## Requirements

### Requirement: CI 工作流
项目 SHALL 使用 GitHub Actions 进行持续集成；CI MUST 只保留和质量直接相关的检查链路，避免保留不能提供稳定价值的展示性或噪音型工作流。

#### Scenario: PR 检查
- **WHEN** 创建 PR 或推送代码
- **THEN** CI 工作流运行类型检查、格式检查、链接检查、构建等对质量直接相关的任务

#### Scenario: 工作流收敛
- **WHEN** 审核现有 workflow
- **THEN** 低 ROI、误导性或无法提供真实可访问结果的自动化流程必须被删除、合并或降级

### Requirement: 部署工作流
项目 SHALL 自动部署到 GitHub Pages，并以仓库默认分支作为生产部署入口，而不是长期并存多套分支假设。

#### Scenario: 自动部署
- **WHEN** 推送到仓库默认分支
- **THEN** 自动构建并部署到 GitHub Pages

#### Scenario: 部署一致性
- **WHEN** 调整默认分支、Pages 配置或站点 base 路径
- **THEN** workflow、README、OpenSpec 和仓库设置必须保持一致

### Requirement: 站点配置单源
`astro.config.mjs` SHALL 作为站点导航、base 路径和语言启用策略的唯一真实来源。

#### Scenario: 导航或语言策略变更
- **WHEN** 修改导航结构、语言启用策略或站点 base 路径
- **THEN** 更新 `astro.config.mjs`，并同步检查 README、首页和 workflow

### Requirement: 构建资源策略
生产构建 SHALL 优先使用低维护、低体积的资源策略；无法证明收益的大型字体、PWA、预览工件或额外资源 MUST 被收敛或删除。

#### Scenario: 评估额外资源
- **WHEN** 某项资源加载或构建步骤增加显著体积、复杂度或维护成本
- **THEN** 只有在其用户收益明确时才允许保留

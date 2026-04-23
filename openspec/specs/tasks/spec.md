---
name: tasks
overview: 仓库级治理与常见任务规则
metadata:
  version: 2.0.0
  format: openspec
---

# 任务规格

## Purpose

定义项目在收尾阶段常见的维护任务、验证动作和仓库级治理任务。

## Requirements

### Requirement: 内容维护任务
添加或修改内容页面 SHALL 遵循稳定流程：判断层级 → 选择页面类型 → 更新内容 → 更新导航与交叉链接 → 运行验证。

#### Scenario: 添加新页面
- **WHEN** 创建新页面
- **THEN** 同步添加 frontmatter、相关链接和 `astro.config.mjs` 中的导航项

#### Scenario: 修改现有页面
- **WHEN** 调整页面结构或目录位置
- **THEN** 同步更新相关入口、交叉链接和验证步骤

### Requirement: 仓库收尾治理任务
项目 SHALL 为仓库级 closeout 工作提供标准任务类型，包括规范重建、根文档清理、workflow/config 瘦身、站点首页重构、内容目录 triage 和归档准备。

#### Scenario: 创建收尾任务
- **WHEN** 发起仓库收尾变更
- **THEN** 任务列表必须覆盖规范、文档、工程配置、站点对外展示和最终验证，而不是只覆盖代码文件修改

#### Scenario: 执行顺序
- **WHEN** 编排收尾任务
- **THEN** 优先完成规范主轴和 workflow 收敛，再推进内容和展示层治理

### Requirement: GitHub 元数据维护任务
项目 SHALL 将 GitHub about、homepage 和 topics 的整理视为正式任务，而不是变更结束后的临时手动步骤。

#### Scenario: 对外叙事对齐
- **WHEN** README、首页或项目定位发生变化
- **THEN** 同步检查并更新 GitHub 仓库 description、homepage URL 和 topics

#### Scenario: 归档前整理
- **WHEN** 项目进入 closeout 末期
- **THEN** 必须确认仓库元数据已经能准确介绍项目，而不依赖外部口头说明

### Requirement: 常用验证命令
项目 SHALL 保留少量稳定的验证命令：`npm run check`、`npm run check:links`、`npm run build`、`npm run preview`、`npm run clean`。

#### Scenario: 验证命令选择
- **WHEN** 需要执行常规验证或构建
- **THEN** 优先使用仓库已经定义的标准脚本，而不是引入新的本地约定

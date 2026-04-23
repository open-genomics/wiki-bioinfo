---
name: project
overview: 项目定位、目录边界与长期治理规则
metadata:
  version: 2.0.0
  format: openspec
---

# 项目规格

## Purpose

定义 BioInfo Wiki 的项目定位、信息架构边界、规范单源和收尾阶段治理原则。

## Requirements

### Requirement: 项目定位
项目 SHALL 形成可连续阅读、可回溯、可交叉引用的知识地图，而不是工具手册或命令清单；在收尾阶段，项目 SHALL 以高质量整理、降低维护成本和进入可归档状态为优先目标，而不是继续扩张功能范围。

#### Scenario: 知识地图导向
- **WHEN** 用户阅读文档页面
- **THEN** 内容优先解释“是什么、为什么重要、与哪些对象/方法/流程相连”

#### Scenario: 收尾优先
- **WHEN** 评估新增文档、工程配置、站点增强或自动化
- **THEN** 优先选择能减少漂移、提升现有质量和降低长期维护成本的方案

### Requirement: 信息架构稳定
项目 SHALL 维持现有 6 个顶层入口，不随意重做顶层信息架构。

#### Scenario: 顶层结构约束
- **WHEN** 进行内容更新或导航重构
- **THEN** 不改变导论、基础与数学、核心方法、分析方向、数据与资源、附录这 6 个主入口

### Requirement: 规范单源
项目 SHALL 以 `openspec/specs/` 作为长期规范的唯一事实来源；`AGENTS.md`、`CLAUDE.md`、`copilot-instructions.md` 等运行时文档 SHALL 只保留执行所需的摘要信息，且不得与 OpenSpec 长期并行维护重复规则。

#### Scenario: 规范冲突
- **WHEN** 运行时指令文件与 `openspec/specs/` 出现规则冲突
- **THEN** 以 `openspec/specs/` 为准，并更新运行时指令文件使其重新一致

#### Scenario: 摘要化运行时文档
- **WHEN** 维护 `AGENTS.md`、`CLAUDE.md` 或 `copilot-instructions.md`
- **THEN** 内容聚焦项目关键事实、执行入口和工具边界，而不是复制完整项目手册

### Requirement: 英文内容策略一致
项目 SHALL 对英文内容目录、导航配置、站点构建行为和对外文档采用一致策略；若英文内容未达到可维护质量，系统 MUST 将其明确降级、隐藏或下线，而不得保留“文档说未启用、构建却已启用”的状态。

#### Scenario: 英文内容未维护
- **WHEN** 英文目录仅为占位框架或缺乏持续维护计划
- **THEN** 导航、构建输出、README 和规范文档对英文内容的描述必须同步收敛

#### Scenario: 英文内容恢复启用
- **WHEN** 项目重新决定维护英文内容
- **THEN** 必须同时更新 OpenSpec、站点配置和对外文档，再启用相关入口

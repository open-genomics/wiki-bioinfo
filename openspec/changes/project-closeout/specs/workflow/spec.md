## MODIFIED Requirements

### Requirement: OpenSpec 工作流
项目 SHALL 使用 OpenSpec 工作流管理变更；在收尾阶段，项目 MUST 优先使用少分支、少并行 change 的方式推进，并将关键审查集中在少量高价值里程碑上。

#### Scenario: 提案流程
- **WHEN** 需要进行结构性变更或仓库级治理
- **THEN** 使用 `/opsx:propose` 创建提案

#### Scenario: 实施流程
- **WHEN** 提案就绪
- **THEN** 使用 `/opsx:apply` 实施任务

#### Scenario: 归档流程
- **WHEN** 变更完成
- **THEN** 使用 `/opsx:archive` 归档并更新主规格

#### Scenario: 收尾阶段变更管理
- **WHEN** 项目执行 closeout 整治
- **THEN** 优先使用单一主 change 或极少数必要 change，避免多分支和多套未及时合并的任务并行

## ADDED Requirements

### Requirement: 审查与子代理使用策略
项目 SHALL 在关键节点使用 `/review` 或代码审查代理进行质量把关；subagent SHALL 用于大范围审计、批量检查或高噪音任务，而不是替代主线治理决策。

#### Scenario: 关键审查节点
- **WHEN** 完成规范重建、workflow 收敛或最终 closeout
- **THEN** 必须至少触发一次 `/review` 或等效高信号审查

#### Scenario: 批量审计
- **WHEN** 需要检查大量文档、配置或跨目录问题
- **THEN** 可以使用 subagent 收集信息，但最终决策和整合仍由主变更负责

### Requirement: `/fleet` 使用节制
项目 SHALL 将 `/fleet` 视为高成本工具，默认不常态化使用；只有在明确能缩短高并行任务总时长且收益高于额度消耗时才允许使用。

#### Scenario: 常规开发
- **WHEN** 任务可以通过单会话、OpenSpec 流程、`/review` 和必要 subagent 完成
- **THEN** 不使用 `/fleet`

#### Scenario: 高并行审计
- **WHEN** 需要同时完成多个独立且高成本的探索线程
- **THEN** 只有在有明确收益说明时才允许使用 `/fleet`

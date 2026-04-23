## ADDED Requirements

### Requirement: 根目录治理
仓库 SHALL 保持精简、高信号的根目录治理文档集合；低价值、过时、重复、误导性的根文档或 planning 资产 MUST 被删除、合并或重写。

#### Scenario: 审核根文档
- **WHEN** 审核 `README.md`、`AGENTS.md`、`CLAUDE.md`、`CONTRIBUTING.md`、`CHANGELOG.md` 或 `planning/*`
- **THEN** 必须判断其是否仍承担独立且可解释的长期职责

#### Scenario: 文档职责冲突
- **WHEN** 两份或多份根文档表达相同规则
- **THEN** 保留最合适的单一职责文档，并删除或收敛其余重复内容

### Requirement: 收尾阶段保留策略
仓库 SHALL 使用“能否降低维护成本并保持项目可理解性”作为是否保留资产的核心标准，而不是默认保留历史痕迹。

#### Scenario: 历史残留资产
- **WHEN** 某个文件主要记录迁移历史、短期计划或已经失真的状态说明
- **THEN** 允许直接删除，或把仍有价值的信息合并到现行治理文档

#### Scenario: 归档准备
- **WHEN** 项目进入低频维护或归档准备阶段
- **THEN** 根目录只保留对读者、贡献者和维护者仍真正有帮助的资产

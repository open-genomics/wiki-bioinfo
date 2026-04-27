## ADDED Requirements

### Requirement: 仓库收尾治理任务
项目 SHALL 为仓库级 closeout 工作提供标准任务类型，包括规范重建、根文档清理、workflow/config 瘦身、站点首页重构、内容目录 triage 和归档准备。

#### Scenario: 创建收尾任务
- **WHEN** 发起仓库收尾变更
- **THEN** 任务列表必须覆盖规范、文档、工程配置、站点对外展示和最终验证，而不是只覆盖代码文件修改

#### Scenario: 执行顺序
- **WHEN** 编排收尾任务
- **THEN** 应优先完成规范主轴和 workflow 收敛，再推进内容和展示层治理

### Requirement: GitHub 元数据维护任务
项目 SHALL 将 GitHub about、homepage 和 topics 的整理视为正式任务，而不是变更结束后的临时手动步骤。

#### Scenario: 对外叙事对齐
- **WHEN** README、首页或项目定位发生变化
- **THEN** 必须同步检查并更新 GitHub 仓库描述、homepage URL 和 topics

#### Scenario: 归档前整理
- **WHEN** 项目进入 closeout 末期
- **THEN** 必须确认仓库元数据已经能准确介绍项目，而不依赖外部口头说明

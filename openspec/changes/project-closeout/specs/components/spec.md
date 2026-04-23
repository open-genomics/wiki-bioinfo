## MODIFIED Requirements

### Requirement: 组件复用
优先复用已有组件，SHALL NOT 轻易发明一次性组件，也 SHALL NOT 为纯装饰性、低收益或高维护成本的视觉增强继续增加长期保留的覆盖层。

#### Scenario: 组件选择
- **WHEN** 需要展示页面元信息
- **THEN** 使用 `PageHeaderMeta` 组件

#### Scenario: 收尾阶段裁剪
- **WHEN** 现有组件或覆盖层只提供装饰性价值、重复现有能力或显著提高维护复杂度
- **THEN** 优先收敛、删除或回退到 Starlight 原生能力

## ADDED Requirements

### Requirement: 覆盖层复杂度控制
项目 SHALL 对 `Head.astro`、首页样式和其他覆盖组件执行复杂度控制；任何新增覆盖逻辑都 MUST 证明其对阅读体验、导航、SEO 或维护成本有明确净收益。

#### Scenario: 评估覆盖组件
- **WHEN** 计划保留或新增覆盖组件
- **THEN** 必须说明其解决的具体问题，而不是仅因为“看起来更丰富”而存在

#### Scenario: 收敛覆盖逻辑
- **WHEN** 覆盖逻辑与项目收尾目标不一致
- **THEN** 优先删除冗余脚本、样式或资源加载逻辑

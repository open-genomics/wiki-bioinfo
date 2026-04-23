## MODIFIED Requirements

### Requirement: CI 工作流
项目 SHALL 使用 GitHub Actions 进行持续集成；在收尾阶段，CI MUST 只保留高信号检查链路，避免保留不能提供稳定价值的展示性或噪音型工作流。

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

## REMOVED Requirements

### Requirement: PR 预览
**Reason**: 现有 PR preview 更像 artifact 上传和评论提示，并未提供稳定可访问的真实预览地址，长期维护价值偏低。

**Migration**: PR 审查默认依赖常规 CI 构建结果、本地 `npm run preview`、必要时的审查说明或后续真正有价值的预览方案；不再要求每个 PR 必须有自动 preview 链接。

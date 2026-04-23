---
name: github-presence
overview: GitHub Pages、README 与仓库 metadata 的对外叙事
metadata:
  version: 1.0.0
  format: openspec
---

# GitHub 对外呈现规格

## Purpose

定义 GitHub Pages 首页、README 和仓库 metadata 的一致性要求。

## Requirements

### Requirement: 对外叙事一致性
项目 SHALL 让 GitHub Pages 首页、README、GitHub 仓库 description、homepage URL 和 topics 表达一致的项目定位，而不得出现“仓库说一套、站点说一套、规范又是另一套”的状态。

#### Scenario: 首页重构
- **WHEN** 调整站点首页或 README 的项目定位
- **THEN** 同步审查 GitHub 仓库 metadata 是否仍然一致

#### Scenario: 仓库 metadata 更新
- **WHEN** 使用 `gh` 修改 description、homepage 或 topics
- **THEN** 新描述必须与站点首页和 README 的核心叙事保持一致

### Requirement: 首页价值表达
GitHub Pages 首页 SHALL 直接服务于新访客理解项目价值、内容组织方式和开始路径，而不得只是对 README 的平庸搬运。

#### Scenario: 新访客访问首页
- **WHEN** 新用户进入 GitHub Pages 首页
- **THEN** 页面必须快速说明项目是什么、为什么值得看、适合谁、从哪里开始

#### Scenario: 首页内容取舍
- **WHEN** 首页模块无法证明其对理解项目或引导阅读有帮助
- **THEN** 该模块应被简化、合并或删除

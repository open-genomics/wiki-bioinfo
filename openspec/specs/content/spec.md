---
name: content
overview: 内容写作规范与 docs 治理规则
metadata:
  version: 2.0.0
  format: openspec
---

# 内容规格

## Purpose

定义文档页面的写作要求，以及收尾阶段对内容目录进行集中治理的规则。

## Requirements

### Requirement: 页面结构
Concept、Algorithm、Workflow 和 Landing 四类页面 SHALL 使用稳定且可阅读的结构，而不是任意拼接内容块。

#### Scenario: Concept Page
- **WHEN** 创建概念页
- **THEN** 页面围绕“是什么 → 为什么重要 → 核心概念 → 相关页面”展开，避免写成工具教程

#### Scenario: Algorithm Page
- **WHEN** 创建算法页
- **THEN** 页面围绕“问题定义 → 数学模型 → 递推/伪代码 → Worked example → 相关页面”展开，并在公式后紧跟解释

#### Scenario: Workflow Page
- **WHEN** 创建流程页
- **THEN** 页面围绕“任务目标 → 步骤总览 → 每步说明 → 相关页面”展开，而不是写成纯数学推导

#### Scenario: Landing Page
- **WHEN** 创建板块入口页
- **THEN** 使用 PageHeaderMeta、板块概述、SectionNavigator、RelatedLinks 等结构提供入口导航

### Requirement: 中文优先与术语格式
正文 SHALL 默认使用简体中文；关键术语首次出现 SHALL 使用“中文（English, 缩写）”格式；中英文和数字混排 SHALL 保持空格规范。

#### Scenario: 术语首次出现
- **WHEN** 首次提及关键术语
- **THEN** 使用“中文（English, 缩写）”格式

#### Scenario: 排版规范
- **WHEN** 写作文档内容
- **THEN** 中英文、数字、代码和标点按统一中文技术文档格式排版

### Requirement: 页面基本字段
每个页面 SHALL 包含 `title` 和 `description` frontmatter 字段；代码块 SHALL 标注语言；图片 SHALL 提供有意义的 `alt` 文本。

#### Scenario: 创建新页面
- **WHEN** 新建 `.md` 或 `.mdx` 页面
- **THEN** frontmatter 至少包含 `title` 和 `description`

#### Scenario: 添加代码块与图片
- **WHEN** 添加代码块或图片
- **THEN** 代码块标注语言类型，图片提供有意义的 `alt` 文本

### Requirement: 内容治理分级
项目 SHALL 对 `src/content/docs/` 中的页面执行分级治理，并使用“保留 / 重写 / 合并 / 下线 / 延后不动”的统一判定方式集中处理内容漂移。

#### Scenario: 页面治理判定
- **WHEN** 审核某个内容页
- **THEN** 必须明确其处于保留、重写、合并、下线或延后不动中的哪一种状态

#### Scenario: 激进清理
- **WHEN** 页面内容低质量、过时、重复或与当前信息架构冲突
- **THEN** 允许直接合并或下线，而不是默认保留

### Requirement: 首页与导论优先治理
项目 SHALL 优先治理首页和 `intro/` 板块，使其承担项目定位、阅读入口、贡献入口和规范入口，而不是继续让根 README 或零散文档承担主要引导职责。

#### Scenario: 首页定位
- **WHEN** 设计站点首页
- **THEN** 首页必须清楚说明项目价值、适合读者、阅读路径和 GitHub 协作入口

#### Scenario: 导论入口
- **WHEN** 维护 `intro/` 板块
- **THEN** 导论页面必须和首页、README、贡献流程保持定位一致而不过度重复

### Requirement: 链接与导航一致性
项目 SHALL 保证页面交叉链接、目录结构、`astro.config.mjs` 导航和实际存在的内容页一致，避免保留误导性导航项或不可持续的内容分支。

#### Scenario: 页面下线
- **WHEN** 某个页面被删除、合并或迁移
- **THEN** 相关导航项、交叉链接和入口文案必须同步更新

#### Scenario: 内容入口审计
- **WHEN** 审核某个板块入口页
- **THEN** 入口页不得链接到明显过时、空洞或未准备好维护的内容集合

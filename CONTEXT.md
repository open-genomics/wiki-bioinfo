# BioInfo Wiki 架构上下文

本文档记录项目的架构术语和领域概念，作为架构决策和代码审查的参考。

## 架构术语

术语定义来自 [improve-codebase-architecture skill](~/.claude/skills/improve-codebase-architecture/LANGUAGE.md)。

### Module（模块）

具有接口和实现的代码单元。在本项目中：
- Astro 组件（`.astro` 文件）
- TypeScript 函数（`.ts` 文件）
- 配置文件（如 `astro.config.mjs`）

### Interface（接口）

调用者必须知道的一切：类型、不变量、错误模式、顺序、配置。不仅仅是类型签名。

在本项目中：
- 组件 Props
- 函数签名
- 导出的类型定义

### Implementation（实现）

内部代码，调用者不应该依赖的细节。

### Depth（深度）

接口背后的行为量。**深度 = 高杠杆**。

- **Deep Module**：小接口，大量行为
- **Shallow Module**：接口几乎与实现一样复杂

**示例**：
- `NoteCard` 组件：深度模块（一个组件处理三种场景）
- 已删除的 `SummaryBox`、`PitfallsBox`、`ToolMappingBox`：浅层模块

### Seam（接缝）

可以修改行为的地方，无需编辑原代码。

**示例**：
- `src/data/sections.ts`：板块配置的 Seam
- `src/components/docs/link-utils.ts`：链接解析的 Seam

### Adapter（适配器）

满足接口的具体实现。

**示例**：
- 批量替换后的组件调用：所有使用 `NoteCard` 的地方

### Leverage（杠杆）

调用者从深度中获得的收益：一个接口提供多种行为。

**示例**：
- `resolveLinks()` 函数：服务 3 个组件
- `sections.ts`：一处定义，sidebar 和 PageHeaderMeta 共享

### Locality（局部性）

维护者从深度中获得的收益：bug 修复和功能增强集中在一处。

**示例**：
- 修改板块信息只需更新 `sections.ts`
- 修复链接解析 bug 只需修改 `link-utils.ts`

---

## 领域概念

### 板块（Section）

知识库的顶层分类，共 6 个：

| ID | 标题 | 描述 |
|----|------|------|
| `intro` | 导论 | 项目定位、阅读入口、贡献入口 |
| `foundations` | 基础与数学 | 对象层、坐标系统、coverage 与概率图模型 |
| `core-methods` | 核心方法 | 索引、比对、组装与概率模型 |
| `applications` | 分析方向与案例 | 真实分析任务与工作流 |
| `data-references` | 数据、注释与资源 | 参考版本、注释体系、数据格式与数据库 |
| `appendix` | 附录 | 术语、索引与参考资料 |

### 页面类型

- **Concept Page**：概念页，围绕"是什么 → 为什么重要 → 核心概念 → 相关页面"展开
- **Algorithm Page**：算法页，围绕"问题定义 → 数学模型 → 递推/伪代码 → Worked example → 相关页面"展开
- **Workflow Page**：流程页，围绕"任务目标 → 步骤总览 → 每步说明 → 相关页面"展开
- **Landing Page**：板块入口页，使用 PageHeaderMeta、SectionNavigator、RelatedLinks 等结构

### 文档组件

位于 `src/components/docs/`：

| 组件 | 用途 | 类型 |
|------|------|------|
| `LinkGrid` | 统一的链接网格（navigation/related） | Deep Module |
| `RelatedLinks` | 兼容层，委托给 LinkGrid | 兼容层 |
| `SectionNavigator` | 兼容层，委托给 LinkGrid | 兼容层 |
| `NoteCard` | 统一的笔记卡片（summary/pitfalls/tools） | Deep Module |
| `PageHeaderMeta` | 页面头部元信息 | 页面元信息 |
| `RelatedLinks` | 相关链接网格 | 导航 |
| `SectionNavigator` | 板块导航卡片 | 导航 |
| `PrerequisitesBox` | 前置知识提示框 | 学习路径 |
| `ComparisonTable` | 对比表格 | 数据展示 |
| `DecisionMatrix` | 决策矩阵 | 数据展示 |
| `DefinitionList` | 定义列表 | 数据展示 |
| `WorkflowSteps` | 工作流步骤 | 流程展示 |

---

## 架构决策记录

### 2026-05-08: 合并 RelatedLinks 与 SectionNavigator 为 LinkGrid

**背景**：`RelatedLinks` 和 `SectionNavigator` 是浅层模块，interface 与 implementation 复杂度接近，只有 props 名称和语义不同。删除任何一个，复杂性不会集中到另一个——它们是同一个模式。

**决策**：创建统一的 `LinkGrid` 组件，通过 `variant` prop 区分 `navigation`（板块导航）和 `related`（相关链接）两种场景。保留原组件作为兼容层，委托给 `LinkGrid`。

**收益**：
- Leverage：一个组件处理两种场景
- Locality：渲染逻辑和样式映射集中在一处
- Testability：只需测试一个组件的 interface
- 向后兼容：现有 214 个文件无需修改

### 2026-05-08: 合并浅层组件为 NoteCard

**背景**：`SummaryBox`、`PitfallsBox`、`ToolMappingBox` 都是浅层模块，interface 与 implementation 复杂度接近。

**决策**：创建统一的 `NoteCard` 组件，通过 `variant` prop 区分三种场景。批量替换所有引用（177 个文件）。

**收益**：
- Leverage：一个组件处理三种场景
- Locality：样式和图标映射集中在一处
- Testability：只需测试一个组件的 interface

### 2026-05-08: 提取链接解析 Seam

**背景**：`RelatedLinks`、`SectionNavigator`、`PrerequisitesBox` 都有重复的链接解析逻辑。

**决策**：在 `link-utils.ts` 中添加 `resolveLinks` 函数（服务 RelatedLinks、SectionNavigator）和 `resolvePrereqItems` 函数（服务 PrerequisitesBox）。

**收益**：
- Leverage：两个函数服务三个组件
- Locality：链接解析逻辑集中，bug 修复只需一处
- Depth：`link-utils` 从工具函数集合变为真正的 Seam
- PrerequisitesBox 支持更灵活的接口（字符串 + 多种对象格式）

### 2026-05-08: 解耦 sectionKeyMap

**背景**：`PageHeaderMeta` 中的 `sectionKeyMap` 与 `sections.ts` 存在潜在漂移风险，手动维护映射表。

**决策**：在 `sections.ts` 中添加 `findSectionByLabelOrKey()` 函数，支持按标题或 key 查找板块元信息。

**收益**：
- Locality：映射逻辑集中在 `sections.ts`
- Leverage：一个函数服务多种查找方式
- 消除同步点：无需手动维护映射表

---

## 参考文档

- [improve-codebase-architecture skill LANGUAGE.md](~/.claude/skills/improve-codebase-architecture/LANGUAGE.md)
- [OpenSpec specs](./openspec/specs/)
- [AGENTS.md](./AGENTS.md)

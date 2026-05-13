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
- **Landing Page**：板块入口页，使用 PageHeaderMeta、LinkGrid（variant="navigation"）、RelatedLinks 等结构

### 文档组件

位于 `src/components/docs/`：

| 组件 | 用途 | 类型 |
|------|------|------|
| `LinkGrid` | 统一的链接网格（navigation/related） | Deep Module |
| `RelatedLinks` | 兼容层，委托给 LinkGrid | 兼容层 |
| `NoteCard` | 统一的笔记卡片（summary/pitfalls/tools） | Deep Module |
| `DataTable` | 统一的数据表格（comparison/decision-matrix） | Deep Module |
| `ComparisonTable` | 兼容层，委托给 DataTable | 兼容层 |
| `PageHeaderMeta` | 页面头部元信息 | 页面元信息 |
| `PrerequisitesBox` | 前置知识提示框 | 学习路径 |
| `DefinitionList` | 定义列表 | 数据展示 |
| `WorkflowSteps` | 工作流步骤 | 流程展示 |

---

## 架构决策记录

### 2026-05-13: 删除 SectionNavigator 浅层模块

**背景**：`SectionNavigator` 是 `LinkGrid` 的纯转发 wrapper，没有任何逻辑或转换。整个组件只有一行：`<LinkGrid items={items} variant="navigation" />`。删除测试通过——删除后复杂性集中到 LinkGrid，不会分散。

**决策**：删除 `SectionNavigator.astro`，25 个板块入口页直接使用 `<LinkGrid variant="navigation">`。

**收益**：
- Locality：减少间接层，维护者少跳一层
- 减少组件数量：从 12 个文档组件减至 11 个
- 消除混淆：新贡献者不会困惑"SectionNavigator 和 LinkGrid 有什么区别"

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

### 2026-05-08: 合并 ComparisonTable 与 DecisionMatrix 为 DataTable

**背景**：`ComparisonTable` 和 `DecisionMatrix` 是结构完全相同的浅层模块——都是 3 列表格，共享 `comparison-table` CSS 类。区别仅在列标题（维度/左/右 vs 场景/推荐/原因）和行数据类型。删除任何一个，复杂性不会集中到另一个。

**决策**：创建统一的 `DataTable` 组件，通过 `variant` prop 区分 `comparison`（维度对比）和 `decision-matrix`（场景决策）两种场景。`ComparisonTable` 保留为兼容层（55 个文件无需修改），`DecisionMatrix` 的 8 个调用直接迁移到 `DataTable` 后删除。

**收益**：
- Leverage：一个组件处理两种表格场景
- Locality：表格渲染逻辑和样式集中在一处
- 减少组件数量：从 12 个文档组件减至 11 个
- 消除重复的类型定义（`ComparisonRow` / `MatrixRow`）

### 2026-05-13: 提取站点配置 Seam，消除 Head.astro ↔ astro.config.mjs 硬编码耦合

**背景**：站点标题、URL、base 路径、locale、OG 图片等常量在 `Head.astro` 和 `astro.config.mjs` 中重复定义。修改部署目标时必须同步两处，否则 SEO 元数据会漂移。这是配置层面的浅层重复——没有单一 Seam。

**决策**：创建 `src/data/site-config.ts` 作为站点级配置的单一真相源。`astro.config.mjs` 和 `Head.astro` 均从此 Seam 读取。同时导出派生值 `siteUrl` 和 `ogImageUrl`，避免模板中重复拼接。

**收益**：
- Locality：部署信息变更只需改一处
- Leverage：一处定义服务构建配置和运行时 SEO
- Testability：纯配置对象可以直接断言

### 2026-05-11: PageHeaderMeta 自动推断 section

**背景**：`PageHeaderMeta` 支持 10 个 props，但 95% 的调用只传递 `section` prop。这导致接口复杂度与实际使用不匹配。同时，section 成员关系在两处定义：文件路径（隐式）和组件调用（显式），存在同步 seam。

**决策**：
1. 在 `sections.ts` 中添加 `pathToSection` 映射表，从文件路径自动推断所属板块
2. 修改 `PageHeaderMeta` 组件：从 URL 路径自动推断 section，无需显式传入
3. 迁移内容文件：182 个简单调用删除整个组件调用和 import，8 个 rich 调用只删除 `section` prop

**收益**：
- Leverage：自动推断消除了 182 个显式 `section` 声明
- Locality：section 成员关系由路径唯一确定，消除同步 seam
- Testability：路径映射是确定性的，无需运行时模糊匹配
- 简化接口：组件 interface 从 10 个 props 减至 5 个（audience, startWith, prereqs, estimatedTime, difficulty）

---

## 参考文档

- [improve-codebase-architecture skill LANGUAGE.md](~/.claude/skills/improve-codebase-architecture/LANGUAGE.md)
- [OpenSpec specs](./openspec/specs/)
- [AGENTS.md](./AGENTS.md)

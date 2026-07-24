# BioInfo Wiki 架构上下文

本文档记录项目的领域概念与组件表，作为维护参考。

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
| `ComparisonTable` | 对比表主接口（内容中广泛使用），委托给 DataTable | 主接口 |
| `PageHeaderMeta` | 页面头部元信息 | 页面元信息 |
| `PrerequisitesBox` | 前置知识提示框 | 学习路径 |
| `DefinitionList` | 定义列表 | 数据展示 |
| `WorkflowSteps` | 工作流步骤 | 流程展示 |
| `PathCard` | 首页阅读路径卡片 | 首页 |

## 参考文档

- [AGENTS.md](./AGENTS.md)

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

### 子板块（Subsection）

板块内部按主题分组，在 sidebar 中以折叠组形式呈现。子板块的配置在 `src/data/sections.ts` 中通过嵌套 `items` 定义，是 sidebar 层级的单一真相源。

| 所属板块 | 子板块 | 包含的目录 |
|----------|--------|-----------|
| `foundations` | 算法专题 | `graph-algorithms`、`dynamic-programming-basics`、`divide-and-conquer` 等 |
| `core-methods` | 序列表示与索引 | `sequence/` |
| `core-methods` | 序列比对 | `alignment/` |
| `core-methods` | 组装与图算法 | `assembly/` |
| `core-methods` | 概率模型与模式识别 | `models/` |
| `applications` | 算法应用专题 | `applications/dynamic-programming` 等 |
| `applications` | 工作流与案例 | `workflows/` |
| `applications` | 变异检测 | `variants/` |
| `applications` | 转录组 | `transcriptomics/` |
| `applications` | 单细胞组学 | `single-cell/` |
| `applications` | 表观基因组学 | `epigenomics/` |
| `applications` | 群体遗传学 | `population/` |
| `applications` | 长读长测序 | `long-read/` |
| `applications` | 空间转录组 | `spatial/` |
| `applications` | 蛋白质组学 | `proteomics/` |
| `applications` | 临床变异解释 | `clinical-variants/` |
| `applications` | 结构生物信息学 | `structure-bioinfo/` |
| `applications` | 多组学整合 | `multi-omics/` |
| `applications` | 系统发育与进化 | `phylogeny/` |
| `applications` | 机器学习与基础模型 | `ml-bioinfo/` |
| `data-references` | 数据库与资源 | `databases/` |
| `data-references` | 常见数据格式 | `formats/` |

子板块目录通常有自己的 `index.mdx` 入口页，同时作为 sidebar 分组的第一项。`getSectionFromSlug()` 通过路径首段自动推导所属板块，无需手动维护映射。

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

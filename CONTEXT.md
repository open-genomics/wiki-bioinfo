# BioInfo Wiki 架构上下文

本文档记录项目的领域概念与组件表，作为维护参考。

## 领域概念

### 板块（Section）

知识库的顶层分类，共 7 个：

| ID | 标题 | 描述 |
|----|------|------|
| `intro` | 导论 | 项目定位、阅读入口、贡献入口 |
| `foundations` | 基础与数学 | 对象层、坐标系统、coverage 与概率图模型 |
| `core-methods` | 核心方法 | 索引、比对、组装与概率模型 |
| `applications-omics` | 组学应用 | RNA-seq、单细胞、表观组、长读长等组学分析方向 |
| `applications-clinical` | 临床应用 | 变异检测、临床变异解释与结构生物信息学 |
| `data-references` | 数据、注释与资源 | 参考版本、注释体系、数据格式与数据库 |
| `appendix` | 附录 | 术语、索引与参考资料 |

### 子板块（Subsection）

板块内部按主题分组，在 sidebar 中以折叠组形式呈现。子板块的配置在 `src/data/sections.ts` 中通过嵌套 `items` 定义，是 sidebar 层级的单一真相源。

| 所属板块 | 子板块 | 包含的目录 |
|----------|--------|-----------|
| `core-methods` | 算法专题 | `core-methods/algorithms/` |
| `core-methods` | 序列表示与索引 | `core-methods/sequence/` |
| `core-methods` | 序列比对 | `core-methods/alignment/` |
| `core-methods` | 组装与图算法 | `core-methods/assembly/` |
| `core-methods` | 概率模型与模式识别 | `core-methods/models/` |
| `applications-omics` | 算法应用专题 | `applications-omics/alg-applications/` |
| `applications-omics` | 工作流与案例 | `applications-omics/workflows/` |
| `applications-omics` | 转录组 | `applications-omics/transcriptomics/` |
| `applications-omics` | 单细胞组学 | `applications-omics/single-cell/` |
| `applications-omics` | 表观基因组学 | `applications-omics/epigenomics/` |
| `applications-omics` | 群体遗传学 | `applications-omics/population/` |
| `applications-omics` | 长读长测序 | `applications-omics/long-read/` |
| `applications-omics` | 空间转录组 | `applications-omics/spatial/` |
| `applications-omics` | 蛋白质组学 | `applications-omics/proteomics/` |
| `applications-omics` | 多组学整合 | `applications-omics/multi-omics/` |
| `applications-omics` | 系统发育与进化 | `applications-omics/phylogeny/` |
| `applications-omics` | 机器学习与基础模型 | `applications-omics/ml-bioinfo/` |
| `applications-clinical` | 变异检测 | `applications-clinical/variants/` |
| `applications-clinical` | 临床变异解释 | `applications-clinical/clinical-variants/` |
| `applications-clinical` | 结构生物信息学 | `applications-clinical/structure-bioinfo/` |
| `data-references` | 数据库与资源 | `data-references/databases/` |
| `data-references` | 常见数据格式 | `data-references/formats/` |

子板块目录通常有自己的 `index.mdx` 入口页，同时作为 sidebar 分组的第一项。`getSectionFromSlug()` 通过路径首段自动推导所属板块，无需手动维护映射。

### 页面类型

- **Concept Page**：概念页，围绕"是什么 → 为什么重要 → 核心概念 → 相关页面"展开
- **Algorithm Page**：算法页，围绕"问题定义 → 数学模型 → 递推/伪代码 → Worked example → 相关页面"展开
- **Workflow Page**：流程页，围绕"任务目标 → 步骤总览 → 每步说明 → 相关页面"展开
- **Landing Page**：板块入口页，使用 PageHeaderMeta、LinkGrid（variant="navigation"）等结构

### 文档组件

位于 `src/components/docs/`：

| 组件 | 用途 | 类型 |
|------|------|------|
| `LinkGrid` | 统一的链接网格（navigation/related） | Deep Module |
| `NoteCard` | 统一的笔记卡片（summary/pitfalls/tools） | Deep Module |
| `DataTable` | 统一的数据表格（comparison/decision-matrix） | Deep Module |
| `PageHeaderMeta` | 页面头部元信息（自动推断板块） | 页面元信息 |
| `PrerequisitesBox` | 前置知识提示框 | 学习路径 |
| `DefinitionList` | 定义列表 | 数据展示 |
| `WorkflowSteps` | 工作流步骤 | 流程展示 |

## 参考文档

- [AGENTS.md](./AGENTS.md)

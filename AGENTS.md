# AGENTS.md

本文件为本仓库中的 AI agent / AI 辅助贡献提供扩展工作说明。

`CLAUDE.md` 是更短、更硬的运行时约束；本文件用于补充项目背景、工作边界和执行细节。两者冲突时，以 `CLAUDE.md` 与仓库中现有规范文档为准。

## 1. 先看哪些文件

在修改内容前，优先参考：

1. `CLAUDE.md`
2. `README.md`
3. `src/content/docs/intro/about.md`
4. `src/content/docs/intro/contributing.md`
5. `src/content/docs/intro/style-guide.md`
6. `astro.config.mjs`
7. `package.json`

这些文件已经定义了项目目标、写作风格、目录结构、导航事实来源和验证方式。

## 2. 这个项目想要什么，不想要什么

### 想要什么

- 中文优先的生物信息学知识库
- 像教材一样能连续阅读的知识主线
- 能把对象、模型、算法、流程和资源互相连接起来的页面
- 可长期维护、可交叉引用、可扩展的站点结构

### 不想要什么

- 为每个工具写完整手册
- 命令堆砌页
- 复制粘贴式百科
- 只给定义、不解释动机和边界的页面
- 随意扩张顶层信息架构

## 3. 先决定内容属于哪一层

写新页面或大改旧页面前，先判断其主要层级：

- **对象层**：reads、参考基因组、注释、文件格式
- **模型层**：字符串、动态规划、图、概率模型
- **算法层**：比对、组装、索引、motif、gene prediction
- **流程层**：DNA-seq、RNA-seq、单细胞等工作流
- **资源层**：数据库、参考版本、注释系统

如果一个主题横跨多层，主页面只聚焦一层，其他部分通过“相关页面”“与真实工具或流程的连接”等方式桥接。

## 4. 选对页面类型

优先复用 `src/content/docs/intro/style-guide.md` 中已有模板：

- **Concept page**：对象、术语、数据库、文件格式
- **Algorithm page**：索引、比对、图算法、概率算法
- **Workflow page**：variant calling、RNA-seq、metagenomics 等流程
- **Section landing page**：某个板块的总入口

不要把不同类型的页面混写：

- concept page 不要写成工具教程
- workflow page 不要突然变成纯数学推导
- algorithm page 不要只剩命令或参数表

## 5. 语言与术语规则

- 正文默认使用简体中文。
- 关键术语首次出现时使用“中文（English, 缩写）”形式。
- 数据库、软件、经典算法、文件格式名称保留英文。
- 一页内尽量只使用一种主译法，避免同义混用。
- 优先解释术语之间的关系，而不是只列名词。

## 6. 页面应如何推进

优先写出这样的阅读路径：

1. 这个页面在讲什么
2. 为什么这个问题值得讲
3. 它和整站其他层级/页面有什么关系
4. 它依赖哪些前置知识
5. 常见误解是什么
6. 下一步应该读哪里

目标不是把信息堆满，而是让读者知道：
- 这个概念/方法解决什么问题
- 它为什么在生物信息学里重要
- 它和上游对象、下游流程如何连接

## 7. Markdown、MDX 与组件

- 默认优先 `.md`
- 只有在确实需要复用组件或更强版式时再使用 `.mdx`
- 新增 MDX 页面时，优先复用 `src/components/docs/` 中已有组件

常用组件包括：

- `PageHeaderMeta`
- `SummaryBox`
- `PrerequisitesBox`
- `DecisionMatrix`
- `ToolMappingBox`
- `PitfallsBox`
- `SectionNavigator`
- `RelatedLinks`
- `WorkflowSteps`
- `ComparisonTable`
- `DefinitionList`

如果现有组件能表达页面结构，就不要再发明一次性模式。

## 8. 导航、frontmatter 与 landing page

- 本仓库导航是**手工维护**的，`astro.config.mjs` 中的 `sidebar` 配置是事实来源。
- 新增或重命名页面时，检查是否需要同步调整 sidebar 配置。
- 新 section landing page 默认应补齐：
  - `title`
  - `description`
- 新 landing page 默认参考现有成熟模式：
  - `PageHeaderMeta`
  - `SectionNavigator`
  - `RelatedLinks`

不要轻易发明新的顶层板块；默认维持 README 和 sidebar 中的 6 个主入口。

## 9. 图片与图示

- 解释性示意图优先放 `public/img/illustrations/`
- 图应服务于解释，不要用装饰图替代内容
- 提供清晰的 `alt` 文本
- 需要时使用 `<figure>` / `<figcaption>`
- 保持与当前 Astro 路径约定兼容

## 10. 链接与知识图谱

- 站内优先建立交叉链接
- landing page 要主动链接子页面，不能只依赖 sidebar
- 核心页面尽量包含“相关页面”
- 外链优先指向论文、官方文档或可信数据库

目标是让页面成为知识网络的一部分，而不是孤立节点。

## 11. 改动边界

除非用户明确要求，否则不要：

- 重做全站 IA
- 批量重写所有页面
- 发明新的写作体系
- 大改导航策略
- 创建没有明确复用价值的新组件

优先做小而清晰、可验证、与现有模式一致的改动。

## 12. 验证

修改 docs、sidebar、配置、组件后，默认运行：

```bash
npm run check
```

如果改动涉及导航、路由、frontmatter、内部链接或 MDX 组件，这一步尤其不能省。

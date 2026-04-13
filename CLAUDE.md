# CLAUDE.md

本文件用于约束 Claude Code 在本仓库中的默认行为。它不替代现有文档，而是把已有项目规范提炼成可执行的项目级约束。

## 项目定位

- 这是一个面向中文社区的生物信息学体系化知识库。
- 目标是形成**可连续阅读、可回溯、可交叉引用**的知识地图，而不是工具手册或命令清单。
- 优先解释“是什么、为什么重要、与哪些对象/方法/流程相连”，而不是只堆术语、参数或命令。
- 不要随意重做顶层信息架构；默认维持现有 6 个主入口。

## 技术与目录事实

- 站点基于 `Astro 6` + `@astrojs/starlight`。
- 文档内容主目录是 `src/content/docs/`。
- 首页入口是 `src/content/docs/index.mdx`。
- 导航事实来源是 `astro.config.mjs` 中的 `sidebar`。
- 站内可复用文档组件位于 `src/components/docs/`。
- 全站样式主要位于 `src/styles/custom.css` 与 `src/styles/katex.css`。
- 静态资源优先放在 `public/img/` 下。

## 写作与内容约束

- 正文默认使用简体中文。
- 关键术语首次出现时使用“中文 + English + 缩写”的形式。
- 数据库、软件、经典算法和文件格式名称保留英文。
- 每次修改前，先判断页面属于哪一层：对象层、模型层、算法层、流程层、资源层。
- 不把 concept page 写成工具教程，也不把 workflow page 写成算法推导页。
- 核心页面应尽量说明：问题定义、动机、关键概念、常见误区、相关页面。

## 结构与实现约束

- 新内容必须适配现有 sidebar 驱动的信息架构；不要随意新增顶层分类。
- 新增或重命名 docs 页面时，检查是否需要同步更新 `astro.config.mjs` 中的 sidebar 配置。
- 优先使用 Markdown；只有在确实需要复用组件或版式时才使用 MDX。
- 优先复用 `src/components/docs/` 中已有 Astro 组件，不要轻易发明一次性组件或页面局部样式。
- 新 section landing page 默认参考现有成熟模式：`description`、`PageHeaderMeta`、`SectionNavigator`、`RelatedLinks`。
- 修改首页、landing page 或导航时，优先保持“先建立知识地图，再进入专题”的阅读路径。

## 图片与图示

- 解释性示意图优先放在 `public/img/illustrations/`。
- 成品流程图或总结性大图可放在 `public/img/figures/`。
- 图片应服务于具体解释目标，而不是纯装饰。
- 为图片提供有意义的 `alt` 文本；需要时补充 caption。
- 保持与当前站点的路径和 Astro `base` 约定兼容；不要在新内容里随意写死与部署环境强耦合的路径形式。

## 验证要求

- 修改文档、导航、组件或配置后，默认运行：`npm run check`
- 视为重要问题处理：类型错误、构建失败、明显的链接问题。

## 规范来源

在本文件之外，继续以以下文件作为详细规范来源：

- `AGENTS.md`
- `README.md`
- `src/content/docs/intro/about.md`
- `src/content/docs/intro/contributing.md`
- `src/content/docs/intro/style-guide.md`
- `astro.config.mjs`
- `package.json`

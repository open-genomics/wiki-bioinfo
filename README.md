# BioInfo Wiki

BioInfo Wiki 是一个面向中文社区的开源生物信息学知识库项目。

它参考 OI Wiki 的信息架构与协作方式，但内容聚焦于生物信息学，尤其强调：

- 生物学对象与算法模型之间的映射
- 经典教材主线与现代分析流程之间的连接
- 文档驱动的开放协作与持续迭代

站点采用 **Astro + Starlight** 构建，目录主线参考 **《An Introduction to Bioinformatics Algorithms》**，并补充数据库、工作流与社区贡献文档。

## 项目目标

这个项目希望同时做到：

- 像教材一样可以连续阅读，而不是只有零散词条
- 能把对象、模型、算法、流程和资源串进同一张知识地图
- 对新手友好，也能让进阶读者快速回到关键页面
- 允许内容、组件和导航在同一套规则下长期维护

## 技术栈与关键入口

- 框架：`Astro 6` + `@astrojs/starlight`
- 内容目录：`src/content/docs/`
- 首页入口：`src/content/docs/index.mdx`
- 站点导航事实来源：`astro.config.mjs` 中的 `sidebar`
- 可复用文档组件：`src/components/docs/`
- 全站样式：`src/styles/custom.css` 与 `src/styles/katex.css`
- 静态资源：`public/img/`

如果你要修改站点结构、首页入口、section landing page 或文档组件，优先先看这些位置，再动手改内容。

## 本地开发

```bash
npm install
npm run dev
```

默认开发地址：`http://localhost:4321/wiki-bioinfo/`

## 构建静态站点

```bash
npm run build
npm run preview
```

## 质量检查

```bash
npm run check
```

## 内容结构

内容文件位于 `src/content/docs/`，站点围绕 6 个主入口组织：

- `intro/`：开始这里（项目介绍、学习路线、贡献说明、写作规范）
- `foundations/`：基础与数学（对象层、reads/coverage、坐标系统、图与概率）
- `core-methods/`：核心方法，总领 `sequence/`、`alignment/`、`assembly/`、`models/`
- `applications/`：分析方向与案例，总领 `workflows/`、`variants/`、`transcriptomics/`、`single-cell/` 等
- `data-references/`：数据、注释与资源，并连接 `databases/` 与 `formats/`
- `appendix/`：附录（术语、参考资料等索引型内容）

整体设计强调：先让顶层入口稳定，再持续扩展二级和三级专题。

如果你要补内容，建议优先先判断新主题属于哪个主入口，再决定放到哪一层子目录。

## 内容与实现约定

- 文档正文默认使用简体中文，关键术语首次出现时补英文与缩写。
- section landing page 优先复用 `PageHeaderMeta`、`SectionNavigator`、`RelatedLinks` 等现有组件。
- 普通知识页优先使用 Markdown；只有在确实需要组件和更强版式时再使用 MDX。
- 图片与解释性示意图优先放在 `public/img/illustrations/` 或 `public/img/figures/`。
- 不要随意扩张顶层信息架构；新增或重命名页面时要同步检查 `astro.config.mjs`。

## 部署说明

当前配置默认按 GitHub Pages 项目站点部署：

- `site`: `https://lessup.github.io`
- `base`: `/wiki-bioinfo/`
- 目标地址：`https://lessup.github.io/wiki-bioinfo/`

仓库已经配置了 GitHub Actions 自动部署工作流：

- `/.github/workflows/deploy-pages.yml`
- 当 `master` 分支有新的 push 时，会自动构建并发布站点

### 首次启用 GitHub Pages

如果仓库还没有启用 Pages，需要在 GitHub 仓库页面完成一次设置：

1. 打开 **Settings → Pages**
2. 在 **Build and deployment** 中把 **Source** 设置为 **GitHub Actions**
3. 确认后，再向 `master` 推送一次提交，或手动触发 `Deploy GitHub Pages` workflow

### 部署验证

```bash
npm run check
```

然后在 GitHub Actions 中检查：

- `Deploy GitHub Pages` 工作流是否通过

最后访问：

- `https://lessup.github.io/wiki-bioinfo/`

如果后续改为自定义域名或其他静态托管平台，需要同步调整 `astro.config.mjs` 中的 `site` 与 `base`，并检查静态资源与内部链接是否仍然兼容。

## 参与贡献

欢迎通过 Issue 和 Pull Request 参与建设。建议先阅读：

- `src/content/docs/intro/contributing.md`
- `src/content/docs/intro/style-guide.md`
- `CLAUDE.md`
- `AGENTS.md`

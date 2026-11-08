# 2026-11-08 DataTable 行键、跨页锚点与完整历史

## DataTable 空表

`clinical-variants/algorithms.mdx` 的对比表使用
`feature/variant_a/variant_b` 行键，而 `DataTable.astro` 的
`comparison` 变体固定读取 `aspect/left/right`。键名不匹配时组件不报错，
只渲染出空表，页面静默丢失整块内容。

- 改成组件契约的键名；
- 新增 `scripts/checks/check-data-tables.mjs`（`npm run check:tables`），
  扫描 MDX 中所有 `<DataTable>` 并校验行键，`npm run check` 已包含。

## 跨页锚点

`overlap-detection.mdx` 链接到 minimap2 页面的
`#seeding-阶段-降维索引`，实际标题 id 是 `seeding-阶段降维索引`（冒号被
移除，不会补连字符）。

- 修正链接；
- `check-rendered-links.mjs` 扩展为同时校验收录页面的 `#fragment`
  （先 URL 解码再对照目标 HTML 的 `id`），当前 30,915 条站内链接全部通过。

## 部署历史深度

部署 workflow 的 checkout 使用 `workflow_run.head_sha` 但默认浅克隆，
“最近更新”只能看到同一次提交的日期。增加 `fetch-depth: 0`，
部署构建保留完整历史。

## 验证

`npm run check`：字体覆盖、DataTable 检查、`astro check`、175 页构建、
head 元数据、30,915 条站内链接（含锚点）全部通过；构建产物中该对比表
已渲染 3 行数据。

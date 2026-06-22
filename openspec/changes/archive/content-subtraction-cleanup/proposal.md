## Why

closeout 减法审计覆盖了全部 26 个 section / 206 篇文档。结果：92.7% 的页面质量稳定、定位清晰、入站链接充分，无需改动；但仍有 6 篇页面存在真实的重复或定位漂移，违反 closeout-first 的"收敛优先"原则。这些页面要么与他页内容高度重叠（独立存在增加维护成本与读者困惑），要么与同入口下的概览页职责冲突（双份"层级框架"叙事漂移）。本次 change 只处理这 6 篇高确定度页面，不触碰 9 篇"延后不动"页面（留给后续 change 决策），避免一次 change 承载过多决策分支。

## What Changes

- **合并 2 篇**：
  - `alignment/longest-common-subsequence` → 并入 `alignment/edit-distance`（LCS 是编辑距离的特例，仅 2 入站链接）
  - `models/median-string` → 并入 `models/motif-discovery-algorithms`（Median String 是 motif discovery 的等价表述，仅 3 入站链接）
- **重写 4 篇**（消除与"数据与资源"入口下概览页的重复）：
  - `formats/common-file-formats`：删除与 `data-references/common-formats-overview` 重复的层级框架部分，改为"格式字段细节"专项
  - `databases/common-resources`：删除与 `data-references/databases-and-annotations` 重复的对象分类框架，改为"ID 映射与查询"专项
  - `phylogeny/corrupted-cliques-cast`：并入 `phylogeny/k-means-bioinformatics` 作"噪声聚类"小节（CAST 是聚类特例非独立系统发育方法，仅 2 入站链接）
  - `assembly/sequencing-by-hybridization`：并入 `assembly/graph-traversal-algorithms` 作"欧拉路径应用"小节（历史方法，欧拉路径内容与该页重叠）
- **修复入站链接**：每篇合并/重写后，grep 全域引用并更新指向新位置或新章节锚点
- **更新 sidebar**：在 `src/data/sections.ts` 中移除已合并/下线页面的 slug
- **验证**：每步运行 `npm run check` + `npm run check:links`

## Capabilities

### Modified Capabilities

- `content`: 落实"内容治理分级"中的合并/重写判定，消除 6 处真实重复与定位漂移，使"数据与资源"入口下的概览/细节分工清晰

### New Capabilities

无。本次 change 不引入新 capability，只在现有 `content` spec 范围内执行减法。

## Impact

- **Affected specs**: `openspec/specs/content/spec.md`（无需修改文本，本次是 spec 的执行）
- **Affected docs**:
  - 删除：`src/content/docs/alignment/longest-common-subsequence.mdx`、`src/content/docs/models/median-string.mdx`、`src/content/docs/phylogeny/corrupted-cliques-cast.mdx`、`src/content/docs/assembly/sequencing-by-hybridization.mdx`
  - 重写：`src/content/docs/formats/common-file-formats.mdx`、`src/content/docs/databases/common-resources.mdx`
  - 编辑（吸收合并内容 + 修复链接）：`src/content/docs/alignment/edit-distance.mdx`、`src/content/docs/models/motif-discovery-algorithms.mdx`、`src/content/docs/phylogeny/k-means-bioinformatics.mdx`、`src/content/docs/assembly/graph-traversal-algorithms.mdx`，以及所有引用上述 slug 的页面
- **Affected config**: `src/data/sections.ts`（移除 4 个 slug）
- **Affected site**: sidebar 项减少 4 条，相关页面"相关页面"区块链接更新
- **Non-Goals**: 不处理 9 篇"延后不动"页面（foundations 隐形子层 7 篇 + alignment/four-russians-speedup），留给后续 change；不新增页面、组件或入口；不重做信息架构

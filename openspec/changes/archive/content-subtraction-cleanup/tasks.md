## 1. 合并 alignment/longest-common-subsequence → edit-distance

- [x] 1.1 读取 `alignment/longest-common-subsequence.mdx` 与 `alignment/edit-distance.mdx`，提取前者核心内容（LCS 定义、与编辑距离的数学关系、worked example）
- [x] 1.2 在 `edit-distance.mdx` 末尾"相关页面"之前插入 `## 最长公共子序列（LCS）` 小节，保留核心内容，删除与 edit-distance 重复的动机段
- [x] 1.3 `grep -rl "longest-common-subsequence" src/content/docs --include="*.md*"` 找出所有引用，替换为 `edit-distance#最长公共子序列lcs`（或对应锚点）
- [x] 1.4 删除 `src/content/docs/alignment/longest-common-subsequence.mdx`
- [x] 1.5 从 `src/data/sections.ts` 的 alignment.items 中移除 `longest-common-subsequence` slug
- [x] 1.6 运行 `npm run check` 与 `npm run check:links`，修复暴露问题

## 2. 合并 models/median-string → motif-discovery-algorithms

- [x] 2.1 读取 `models/median-string.mdx` 与 `models/motif-discovery-algorithms.mdx`，提取前者核心内容（Median String 问题定义、与 motif finding 的等价性、算法复杂度）
- [x] 2.2 在 `motif-discovery-algorithms.mdx` 末尾"相关页面"之前插入 `## Median String 等价表述` 小节
- [x] 2.3 `grep -rl "median-string" src/content/docs --include="*.md*"` 找出所有引用，替换为新锚点链接
- [x] 2.4 删除 `src/content/docs/models/median-string.mdx`
- [x] 2.5 从 `src/data/sections.ts` 的 models.items 中移除 `median-string` slug
- [x] 2.6 运行 `npm run check` 与 `npm run check:links`

## 3. 合并 phylogeny/corrupted-cliques-cast → k-means-bioinformatics

- [x] 3.1 读取 `phylogeny/corrupted-cliques-cast.mdx` 与 `phylogeny/k-means-bioinformatics.mdx`，提取前者核心内容（CAST 算法、噪声聚类动机、与 k-means 的关系）
- [x] 3.2 在 `k-means-bioinformatics.mdx` 末尾"相关页面"之前插入 `## 噪声聚类：CAST` 小节
- [x] 3.3 `grep -rl "corrupted-cliques-cast" src/content/docs --include="*.md*"` 找出所有引用，替换为新锚点链接
- [x] 3.4 删除 `src/content/docs/phylogeny/corrupted-cliques-cast.mdx`
- [x] 3.5 从 `src/data/sections.ts` 的 phylogeny.items 中移除 `corrupted-cliques-cast` slug
- [x] 3.6 运行 `npm run check` 与 `npm run check:links`

## 4. 合并 assembly/sequencing-by-hybridization → graph-traversal-algorithms

- [x] 4.1 读取 `assembly/sequencing-by-hybridization.mdx` 与 `assembly/graph-traversal-algorithms.mdx`，提取前者核心内容（SBH 问题、欧拉路径建模、与 de Bruijn 图的关系）
- [x] 4.2 在 `graph-traversal-algorithms.mdx` 末尾"相关页面"之前插入 `## 欧拉路径应用：测序杂交（SBH）` 小节
- [x] 4.3 `grep -rl "sequencing-by-hybridization" src/content/docs --include="*.md*"` 找出所有引用，替换为新锚点链接
- [x] 4.4 删除 `src/content/docs/assembly/sequencing-by-hybridization.mdx`
- [x] 4.5 从 `src/data/sections.ts` 的 assembly.items 中移除 `sequencing-by-hybridization` slug
- [x] 4.6 运行 `npm run check` 与 `npm run check:links`

## 5. 重写 formats/common-file-formats

- [x] 5.1 读取 `formats/common-file-formats.mdx` 与 `data-references/common-formats-overview.mdx`，识别重叠部分（层级框架、对象分类）
- [x] 5.2 重写 `common-file-formats.mdx`：删除与 `common-formats-overview` 重复的层级框架部分，改为"格式字段细节"专项（FASTA/FASTQ/SAM/GTF/VCF 的字段语义、编码规则、常见陷阱）
- [x] 5.3 在重写后的页面顶部添加交叉引用：`> 格式的层级框架与设计动机见 [数据格式总论](../data-references/common-formats-overview/)`
- [x] 5.4 检查 `formats/index.mdx` 与 sidebar 是否仍指向此页（应保留，作为 formats section 入口）
- [x] 5.5 运行 `npm run check` 与 `npm run check:links`

## 6. 重写 databases/common-resources

- [x] 6.1 读取 `databases/common-resources.mdx` 与 `data-references/databases-and-annotations.mdx`，识别重叠部分（对象分类、数据库分类框架）
- [x] 6.2 重写 `common-resources.mdx`：删除与 `databases-and-annotations` 重复的分类框架，改为"ID 映射与查询"专项（NCBI/Ensembl/UniProt/PDB 的 ID 体系、跨库映射、查询入口）
- [x] 6.3 在重写后的页面顶部添加交叉引用：`> 数据库的对象体系与分类见 [数据库与注释](../data-references/databases-and-annotations/)`
- [x] 6.4 检查 `databases/index.mdx` 与 sidebar 是否仍指向此页（应保留，作为 databases section 入口）
- [x] 6.5 运行 `npm run check` 与 `npm run check:links`

## 7. 最终验证与归档准备

- [x] 7.1 全量运行 `npm run check` 与 `npm run check:links`，确认无错误
- [x] 7.2 `grep -r "longest-common-subsequence\|median-string\|corrupted-cliques-cast\|sequencing-by-hybridization" src/content/docs src/data/sections.ts --include="*.md*" --include="*.ts"` 确认无残留引用
- [x] 7.3 检查 sidebar 项数减少 4 条，6 顶层入口结构未变
- [x] 7.4 运行 `/review` 对本 change 做高信号审查
- [x] 7.5 归档：`/opsx:archive` 将本 change 移入 `openspec/changes/archive/`

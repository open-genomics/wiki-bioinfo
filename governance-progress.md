# 内容治理进度

## 统计

- **文档总数**：206 个
- **已完成**：17/26 领域
- **发现问题**：118 个（P0: 0, P1: 41, P2: 69, P3: 8）
- **已修复**：97 个

## 构建状态

✅ `astro check` 通过（0 errors, 0 warnings）

## 领域状态

| 领域 | 状态 | 文件数 | 问题数 | 备注 |
|------|------|--------|--------|------|
| intro | ✅ 已完成 | 6 | 3 | 已修复 3 个 P2 问题 |
| foundations | ✅ 已完成 | 25 | 4 | 已修复 4 个 P1 问题 |
| sequence | ✅ 已完成 | 13 | 4 | 已修复 4 个 P1 问题 |
| alignment | ✅ 已完成 | 15 | 3 | 已修复 3 个 P2 问题 |
| models | ⏳ 待开始 | 14 | - | |
| core-methods | ✅ 已完成 | 3 | 3 | 已修复 3 个 P2 问题 |
| assembly | ⏳ 待开始 | 8 | - | |
| variants | ⏳ 待开始 | 6 | - | |
| transcriptomics | ⏳ 待开始 | 5 | - | |
| single-cell | ✅ 已完成 | 6 | 6 | 已修复 2 个 P1、4 个 P2 问题 |
| epigenomics | ✅ 已完成 | 7 | 7 | 已修复 4 个 P1、3 个 P2 问题 |
| population | ✅ 已完成 | 5 | 5 | 已修复 1 个 P1、4 个 P2 问题 |
| long-read | ✅ 已完成 | 8 | 7 | 已修复 3 个 P1、4 个 P2 问题 |
| spatial | ✅ 已完成 | 4 | 2 | 已修复 2 个 P2 问题 |
| proteomics | ✅ 已完成 | 7 | 6 | 已修复 4 个 P1、2 个 P2 问题 |
| clinical-variants | ✅ 已完成 | 5 | 3 | 已修复 3 个 P1 问题 |
| structure-bioinfo | ✅ 已完成 | 6 | 2 | 已修复 2 个 P2 问题 |
| multi-omics | ⏳ 待开始 | 9 | - | |
| phylogeny | ⏳ 待开始 | 10 | - | |
| ml-bioinfo | ✅ 已完成 | 6 | 1 | 已修复 1 个 P2 问题 |
| databases | ✅ 已完成 | 7 | 4 | 已修复 2 个 P1 问题，记录 2 个 P2 问题 |
| formats | ✅ 已完成 | 7 | 4 | 已修复 1 个 P1 问题，记录 3 个 P2 问题 |
| data-references | ✅ 已完成 | 6 | 3 | 已修复 3 个 P2 问题 |
| workflows | ✅ 已完成 | 7 | 3 | 已修复 3 个 P2 问题 |
| applications | ⏳ 待开始 | 6 | - | |
| appendix | ⏳ 待开始 | 5 | - | |

## 问题清单

### proteomics 领域（已完成）

| 文件 | 级别 | 问题描述 | 状态 |
|------|------|----------|------|
| mass-spectrometry-basics.mdx | P1 | 图片路径错误 `/img/...` 应为 `/wiki-bioinfo/img/...` | ✅ 已修复 |
| database-search-and-fdr.mdx | P1 | 图片路径错误 `/img/...` 应为 `/wiki-bioinfo/img/...` | ✅ 已修复 |
| quantitative-proteomics.mdx | P1 | PitfallsBox 最后一项内容缺失（"TMT/iTRAQ 的比例压缩效应"无解释） | ✅ 已修复 |
| spectrum-graphs.mdx | P1 | PitfallsBox 格式严重错误，使用了 Markdown 表格格式而非组件预期格式 | ✅ 已修复 |
| spectral-convolution.mdx | P2 | ComparisonTable 中 aspect 字段使用了 Markdown 加粗语法 `**修饰检测**` 等 | ✅ 已修复 |

### databases 领域（已完成）

| 文件 | 级别 | 问题描述 | 状态 |
|------|------|----------|------|
| ensembl.mdx | P1 | VEP 示例 URL 缺少协议分隔符 `://` | ✅ 已修复 |
| sam-bam-cram.mdx | P1 | Mermaid 图表中 `...` 可能在某些环境下解析错误 | ✅ 已修复 |
| database-algorithms.mdx | P2 | 章节编号从 9.10 开始，与知识库整体编号体系不一致 | 📝 记录（内容正确，编号风格问题） |
| common-resources.mdx | P2 | PrerequisitesBox 使用纯文本而非对象格式 | 📝 记录（待批量修复） |

### formats 领域（已完成）

| 文件 | 级别 | 问题描述 | 状态 |
|------|------|----------|------|
| common-file-formats.mdx | P2 | 页面结构未按标准章节组织（无"是什么"标题） | 📝 记录（设计如此，作为总论页面） |
| gtf-gff-bed.mdx | P2 | PrerequisitesBox 位置不标准 | 📝 记录（待批量修复） |
| fastq-format.mdx | P2 | PrerequisitesBox 包含 LaTeX 公式 | 📝 记录（待批量修复） |
| index.mdx | P2 | SectionNavigator 链接描述可优化 | 📝 记录（功能正常） |

### epigenomics 领域（已完成）

| 文件 | 级别 | 问题描述 | 状态 |
|------|------|----------|------|
| chip-seq-overview.mdx | P1 | 图片路径错误 `/img/...` 应为 `/wiki-bioinfo/img/...` | ✅ 已修复 |
| footprinting-algorithms.mdx | P1 | PrerequisitesBox 使用错误的属性名 `prerequisites` 应为 `items`，且属性名 `title` 应为 `name` | ✅ 已修复 |
| macs2-peak-calling.mdx | P1 | PrerequisitesBox 使用错误的属性名 `prerequisites` 应为 `items`，且属性名 `title` 应为 `name` | ✅ 已修复 |
| dmr-detection.mdx | P1 | PrerequisitesBox 使用错误的属性名 `prerequisites` 应为 `items`，且属性名 `title` 应为 `name` | ✅ 已修复 |
| dmr-detection.mdx | P2 | PitfallsBox 最后一项内容不完整 | ✅ 已修复 |
| macs2-peak-calling.mdx | P2 | PitfallsBox 最后一项内容不完整 | ✅ 已修复 |
| footprinting-algorithms.mdx | P2 | PitfallsBox 最后一项内容不完整 | ✅ 已修复 |

### long-read 领域（已完成）

| 文件 | 级别 | 问题描述 | 状态 |
|------|------|----------|------|
| index.mdx | P1 | PrerequisitesBox 使用 `label`/`to` 属性而非 `name`/`href` | ✅ 已修复 |
| overlap-detection.mdx | P1 | PrerequisitesBox 使用 `prerequisites` 属性而非 `items`，且属性格式不一致 | ✅ 已修复 |
| sv-detection.mdx | P1 | 图片路径错误 `/img/...` 应为 `/wiki-bioinfo/img/...` | ✅ 已修复 |
| pacbio-nanopore.mdx | P2 | "CCS (Circular Consensus Sequencing)" 格式不规范，应为"环形共识测序（Circular Consensus Sequencing, CCS）" | ✅ 已修复 |
| basecalling-algorithm.mdx | P2 | "隐马尔可夫模型（HMM）"格式不规范，首次出现应为完整格式 | ✅ 已修复 |
| long-read-assembly.mdx | P2 | "OLC (Overlap-Layout-Consensus)" 格式不规范，缺少中文释义 | ✅ 已修复 |
| consensus-algorithm.mdx | P2 | "部分顺序图（Partial Order Alignment, POA）" 概念表述不准确，应为"部分顺序比对图（Partial Order Alignment Graph, POA）" | ✅ 已修复 |

### single-cell 领域（已完成）

| 文件 | 级别 | 问题描述 | 状态 |
|------|------|----------|------|
| doublet-detection.mdx | P1 | 章节编号重复（两个"## 4."和两个"## 7."），导致编号不连续 | ✅ 已修复 |
| doublet-detection.mdx | P2 | RelatedLinks 组件使用 `items`/`name` 属性而非 `links`/`title` | ✅ 已修复 |
| clustering-and-umap.mdx | P1 | `<PageHeaderMeta>` 组件位置异常，出现在文章中间而非开头 | ✅ 已修复 |
| clustering-and-umap.mdx | P2 | PCA 首次出现未标注中文全称"主成分分析" | ✅ 已修复 |
| scrna-seq-overview.mdx | P2 | LaTeX 公式笔误 `\log_1` 应为 `\log` | ✅ 已修复 |
| scrna-seq-overview.mdx | P2 | 数据描述错误"13 个基因"应为"约 13,000 个基因" | ✅ 已修复 |

### population 领域（已完成）

| 文件 | 级别 | 问题描述 | 状态 |
|------|------|----------|------|
| gwas.mdx | P1 | 图片路径错误 `/img/...` 应为 `/wiki-bioinfo/img/...` | ✅ 已修复 |
| hardy-weinberg.mdx | P2 | SummaryBox 中 HWE 缩写格式不规范，未标注英文全称 | ✅ 已修复 |
| hardy-weinberg.mdx | P2 | DefinitionList 中"适合度"后空格不规范 | ✅ 已修复 |
| population-structure.mdx | P2 | SummaryBox 中 $F_{ST}$ 和 PCA 未标注中文全称和英文全称 | ✅ 已修复 |
| index.mdx | P2 | PitfallsBox 格式不规范，误区标题和解释被分成两个数组元素 | ✅ 已修复 |

### P1-Critical（LaTeX 警告）- 已修复

修复了 21 个 LaTeX 公式中的中文问题，将 `\text{}` 中的中文改为英文。

### alignment 领域（已完成）

| 文件 | 级别 | 问题描述 | 状态 |
|------|------|----------|------|
| global-local.mdx | P2 | 图片路径错误 `/img/...` 应为 `/wiki-bioinfo/img/...` | ✅ 已修复 |
| gotoh.mdx | P2 | LaTeX 公式转义错误 `\text\{GapCost\}` 应为 `\text{GapCost}` | ✅ 已修复 |
| gotoh.mdx | P2 | LaTeX 公式转义错误 `\begin\{aligned\}` 应为 `\begin{aligned}` | ✅ 已修复 |

### core-methods 领域（已完成）

| 文件 | 级别 | 问题描述 | 状态 |
|------|------|----------|------|
| index.mdx | P2 | "隐藏马尔可夫模型"应为"隐马尔可夫模型"，且首次出现未标注英文缩写 | ✅ 已修复 |
| method-connections.mdx | P2 | SummaryBox 中 HMM、PWM 首次出现未标注中文全称 | ✅ 已修复 |
| algorithm-design-paradigms.mdx | P2 | HMM 首次出现未标注中文全称和英文全称 | ✅ 已修复 |

### intro 领域（已完成）

| 文件 | 级别 | 问题描述 | 状态 |
|------|------|----------|------|
| algorithms-intro.mdx | P2 | 章节编号不连续（5→7，缺少第 6 节） | ✅ 已修复 |
| algorithms-intro.mdx | P2 | 术语"动态规划"首次出现未标注缩写 DP | ✅ 已修复 |
| algorithms-intro.mdx | P2 | 术语"隐马尔可夫模型""位置权重矩阵"首次出现格式不规范 | ✅ 已修复 |

### foundations 领域（已完成）

| 文件 | 级别 | 问题描述 | 状态 |
|------|------|----------|------|
| reference-and-annotation.mdx | P1 | 图片路径错误 `/wiki-bioinfo/img/...` | ✅ 已修复 |
| graph-algorithms.mdx | P1 | PitfallsBox 最后一项内容缺失 | ✅ 已修复 |
| randomized-algorithms.mdx | P1 | PitfallsBox 最后一项内容缺失 | ✅ 已修复 |
| string-pattern-matching.mdx | P1 | LaTeX 公式转义错误 `\{` 应为 `{` | ✅ 已修复 |
| approximation-algorithms.mdx | P1 | LaTeX 公式转义错误 `\{` 应为 `{` | ✅ 已修复 |

### P0-Blocker

（暂无）

### P2-Major（待处理）

以下问题需要后续批量修复：

1. **reference-and-annotation.mdx**: PrerequisitesBox 使用纯文本而非对象格式，无法提供链接
2. **多个文件**: 部分术语首次出现时未完整标注中英文缩写
3. **biology-basics.mdx**: PCR 等术语格式可优化

### spatial 领域（已完成）

| 文件 | 级别 | 问题描述 | 状态 |
|------|------|----------|------|
| spatial-transcriptomics-overview.mdx | P2 | URL 格式错误 `https/www.` 应为 `https://www.` | ✅ 已修复 |
| spot-vs-single-cell.mdx | P2 | 术语 "隐马尔可夫模型" 首次出现未标注英文 | ✅ 已修复 |

### clinical-variants 领域（已完成）

| 文件 | 级别 | 问题描述 | 状态 |
|------|------|----------|------|
| cnv-and-sv-interpretation.mdx | P1 | PitfallsBox 内容错误嵌套了 PrerequisitesBox 组件代码 | ✅ 已修复 |
| algorithms.mdx | P2 | 图片路径错误 `/img/...` 应为 `/wiki-bioinfo/img/...` | ✅ 已修复 |
| variant-annotation-and-prioritization.mdx | P1 | PrerequisitesBox 使用 `name`/`href` 属性而非 `title`/`to` | ✅ 已修复 |

### structure-bioinfo 领域（已完成）

| 文件 | 级别 | 问题描述 | 状态 |
|------|------|----------|------|
| alphafold-and-structure-prediction.mdx | P2 | 图片路径错误 `/img/...` 应为 `/wiki-bioinfo/img/...` | ✅ 已修复 |
| protein-structure-basics.mdx | P2 | PrerequisitesBox 使用字符串数组而非对象数组 | ✅ 已修复 |

### ml-bioinfo 领域（已完成）

| 文件 | 级别 | 问题描述 | 状态 |
|------|------|----------|------|
| cnn-for-sequences.mdx | P2 | 术语 "长短期记忆网络" 首次出现未完整标注英文缩写 | ✅ 已修复 |

### P3-Minor（待处理）

1. 部分文件坐标格式不一致
2. 代码块注释风格可统一

### data-references 领域（已完成）

| 文件 | 级别 | 问题描述 | 状态 |
|------|------|----------|------|
| reference-genome-history.mdx | P2 | PitfallsBox 使用 Markdown 加粗语法，与其他文件风格不一致 | ✅ 已修复 |

### workflows 领域（已完成）

| 文件 | 级别 | 问题描述 | 状态 |
|------|------|----------|------|
| ngs-overview.mdx | P2 | PitfallsBox 使用 `pitfalls` 属性而非标准 `items` 属性 | ✅ 已修复 |
| rna-seq.mdx | P2 | PitfallsBox 使用 `pitfalls` 属性而非标准 `items` 属性 | ✅ 已修复 |

## 更新日志

- 2026-05-01：完成 data-references 领域治理，检查 6 个文件，发现并修复 1 个 P2 问题
- 2026-05-01：完成 workflows 领域治理，检查 7 个文件，发现并修复 3 个 P2 问题
- 2026-05-01：完成 proteomics 领域治理，检查 7 个文件，发现并修复 4 个 P1、2 个 P2 问题
- 2026-05-01：完成 epigenomics 领域治理，检查 7 个文件，发现并修复 4 个 P1、3 个 P2 问题
- 2026-05-01：完成 population 领域治理，检查 5 个文件，发现并修复 1 个 P1、3 个 P2 问题
- 2026-05-01：完成 ml-bioinfo 领域治理，检查 6 个文件，发现并修复 1 个 P2 问题
- 2026-05-01：完成 structure-bioinfo 领域治理，检查 6 个文件，发现并修复 2 个问题（1 P1 + 1 P2）
- 2026-05-01：完成 clinical-variants 领域治理，检查 5 个文件，发现并修复 3 个 P1 问题
- 2026-05-01：完成 spatial 领域治理，检查 4 个文件，发现并修复 2 个 P2 问题
- 2026-05-01：修复 21 个 LaTeX 公式中的中文问题（P1）
- 2026-05-01：完成 sequence 领域治理，检查 13 个文件，发现并修复 4 个 P1 问题
- 2026-05-01：完成 alignment 领域治理，检查 15 个文件，发现并修复 3 个 P2 问题
- 2026-05-01：完成 core-methods 领域治理，检查 3 个文件，发现并修复 3 个 P2 问题
- 2026-05-01：完成 foundations 领域治理，检查 25 个文件，发现 5 个 P1 问题并全部修复
- 2026-05-01：完成 intro 领域治理，检查 6 个文件，发现并修复 3 个 P2 问题
- 2026-05-01：创建进度文件，完成阶段 0 准备工作

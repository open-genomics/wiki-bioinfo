# 内容治理进度

## 统计

- **文档总数**：206 个
- **已完成**：4/26 领域
- **发现问题**：54 个（P0: 0, P1: 20, P2: 31, P3: 3）
- **已修复**：34 个

## 构建状态

✅ `npm run check` 通过（207 页面构建成功）
⚠️ 12 个 KaTeX 严格模式警告（不影响渲染）

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
| single-cell | ⏳ 待开始 | 6 | - | |
| epigenomics | ⏳ 待开始 | 7 | - | |
| population | ⏳ 待开始 | 5 | - | |
| long-read | ⏳ 待开始 | 8 | - | |
| spatial | ⏳ 待开始 | 4 | - | |
| proteomics | ⏳ 待开始 | 7 | - | |
| clinical-variants | ⏳ 待开始 | 5 | - | |
| structure-bioinfo | ⏳ 待开始 | 6 | - | |
| multi-omics | ⏳ 待开始 | 9 | - | |
| phylogeny | ⏳ 待开始 | 10 | - | |
| ml-bioinfo | ⏳ 待开始 | 6 | - | |
| databases | ⏳ 待开始 | 7 | - | |
| formats | ⏳ 待开始 | 7 | - | |
| data-references | ⏳ 待开始 | 6 | - | |
| workflows | ⏳ 待开始 | 7 | - | |
| applications | ⏳ 待开始 | 6 | - | |
| appendix | ⏳ 待开始 | 5 | - | |

## 问题清单

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

### P3-Minor（待处理）

1. 部分文件坐标格式不一致
2. 代码块注释风格可统一

## 更新日志

- 2026-05-01：修复 21 个 LaTeX 公式中的中文问题（P1）
- 2026-05-01：完成 sequence 领域治理，检查 13 个文件，发现并修复 4 个 P1 问题
- 2026-05-01：完成 alignment 领域治理，检查 15 个文件，发现并修复 3 个 P2 问题
- 2026-05-01：完成 core-methods 领域治理，检查 3 个文件，发现并修复 3 个 P2 问题
- 2026-05-01：完成 foundations 领域治理，检查 25 个文件，发现 5 个 P1 问题并全部修复
- 2026-05-01：完成 intro 领域治理，检查 6 个文件，发现并修复 3 个 P2 问题
- 2026-05-01：创建进度文件，完成阶段 0 准备工作

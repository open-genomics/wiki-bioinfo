## Context

closeout 减法审计（2026-06-22）覆盖了全部 26 个 section / 206 篇文档。审计结论：92.7% 的页面质量稳定，无需改动；6 篇页面存在真实重复或定位漂移，需立即收敛；另有 9 篇"延后不动"页面留给后续决策。本次 change 只处理这 6 篇高确定度页面，避免一次 change 承载过多决策分支。

6 篇页面分两类问题：
1. **跨页内容重叠**（4 篇）：独立页与他页内容高度重叠，独立存在只增加维护成本与读者困惑——`longest-common-subsequence`、`median-string`、`corrupted-cliques-cast`、`sequencing-by-hybridization`
2. **同入口概览/细节职责冲突**（2 篇）：与"数据与资源"入口下的概览页叙事重复——`formats/common-file-formats`、`databases/common-resources`

## Goals / Non-Goals

**Goals:**

- 消除 6 处真实重复与定位漂移，使相关 section 内部职责分工清晰
- 修复所有受影响的入站链接，确保 `npm run check` 与 `npm run check:links` 通过
- 保持 6 顶层入口稳定，不新增页面/组件/入口

**Non-Goals:**

- 不处理 9 篇"延后不动"页面（foundations 隐形子层 7 篇 + alignment/four-russians-speedup），留给后续 change `foundations-invisible-sublayer-cleanup`
- 不重写保留的 191 篇页面
- 不修改 `openspec/specs/content/spec.md` 文本（本次是 spec 的执行，不是 spec 修订）
- 不引入新组件、新 frontmatter 字段或新导航结构

## Decisions

### 1. 合并优先于下线

对 4 篇跨页重叠页面（`longest-common-subsequence`、`median-string`、`corrupted-cliques-cast`、`sequencing-by-hybridization`），采用"合并入目标页"而非"直接下线"。

**Why:** 这些页面仍有教学价值（worked example、历史方法、算法特例），合并能保留有价值的内容片段，同时消除独立页的维护成本。直接下线会丢失内容，不符合"减法但不丢知识"的 closeout 原则。

**Alternatives considered:**

- **直接下线**：内容丢失，违反知识库定位
- **保留+加交叉引用**：重复仍在，未解决根本问题

### 2. 重写优先于合并（概览/细节冲突）

对 `formats/common-file-formats` 与 `databases/common-resources`，采用"重写为细节专项"而非"合并入概览页"。

**Why:** 这两篇是各自 section 的入口页（`formats/index`、`databases/index` 的下一层），承担"引导读者进入具体格式/数据库"的职责。若合并入 `data-references/` 的概览页，会让 `formats` 和 `databases` 两个 section 失去入口，破坏 sidebar 结构。重写为"字段细节"和"ID 映射"专项，既消除与概览页的重复，又保留 section 入口职能。

**Alternatives considered:**

- **合并入 data-references 概览页**：破坏 formats/databases section 入口结构
- **删除整篇**：formats/databases section 失去概览层
- **保留现状**：双份层级框架叙事继续漂移

### 3. 合并内容以"小节"形式注入目标页

合并时，被合并页的内容以一个新 `## 小节` 注入目标页末尾（在"相关页面"之前），不打散目标页原有结构。

**Why:** 保持目标页结构稳定，降低 review 难度；新小节有明确边界，未来若需独立化也容易拆出。

### 4. 链接修复策略

每篇合并/重写后：
1. `grep -rl "<old-slug>" src/content/docs --include="*.md*"` 找出所有引用
2. 替换为新 slug + 锚点（如 `edit-distance#lcs-关系`）
3. 运行 `npm run check:links` 验证
4. 在 `src/data/sections.ts` 移除已删 slug

### 5. 单一 change，分 6 个任务单元

6 篇页面各自独立成一个任务单元（合并 4 篇 + 重写 2 篇），不交叉依赖。每个单元完成后运行 `npm run check`，最后统一运行 link check。

**Why:** 6 个单元可独立验证，降低单步失败影响；符合 workflow spec 的"少分支、少并行 change"原则。

## Risks / Trade-offs

- **入站链接遗漏**：合并后若有遗漏的入站链接，会导致 broken link。缓解：每步 grep + `check:links` 双重验证
- **合并后目标页过长**：`edit-distance`、`motif-discovery-algorithms` 等目标页已较长，合并后可能更长。缓解：合并时只保留被合并页的核心内容（worked example、关键公式），删除重复的动机/背景段落
- **读者书签失效**：被合并页 URL 将 404。缓解：closeout 阶段低流量，且 Starlight 不支持自动重定向，接受此代价（与 project-closeout 的"激进清理"决策一致）
- **sidebar 空缺**：`sections.ts` 移除 slug 后 sidebar 项减少。缓解：目标页本就在 sidebar 中，读者通过目标页的"相关页面"区块可达合并内容

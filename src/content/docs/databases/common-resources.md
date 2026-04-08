---
title: "常用数据库与资源"
---

import SummaryBox from '@site/src/components/docs/SummaryBox';
import PrerequisitesBox from '@site/src/components/docs/PrerequisitesBox';
import DecisionMatrix from '@site/src/components/docs/DecisionMatrix';
import ToolMappingBox from '@site/src/components/docs/ToolMappingBox';
import PitfallsBox from '@site/src/components/docs/PitfallsBox';
import RelatedLinks from '@site/src/components/docs/RelatedLinks';


<SummaryBox
  summary="这页重点不是背数据库名字，而是先判断：你的问题是在找 gene / transcript / protein / structure / pathway，还是在找公开数据集，然后再去合适的资源入口。"
  bullets={[
    '数据库之间最大的差别，往往不在网页长得像不像，而在它们各自承载的对象类型和版本体系。',
    '先问“我要解释什么对象”，通常比先问“我要打开哪个网站”更有效。',
  ]}
/>

## 是什么

生物信息学中的“数据库与资源”并不只是资料网站列表。它们分别围绕不同对象组织信息，例如：

- gene / transcript 的注释对象；
- protein 的序列与功能对象；
- structure 的三维结构对象；
- pathway 的网络与功能模块；
- sample / dataset 的公开实验数据。

同一个分析问题，往往需要跨越多个资源才能真正解释清楚。因此，学习数据库的重点不是记住入口名称，而是知道：**什么问题应该去哪个资源找、拿到的记录到底表示什么对象**。

## 为什么重要

真实分析里的很多时间并不花在“跑工具”本身，而花在下面这些判断上：

- 这个结果对应的是 gene、transcript 还是 protein；
- 该去哪个资源确认注释、功能、结构或通路；
- 一个 ID 能不能直接和另一个数据库里的记录对应起来；
- 公开数据究竟是原始 reads、处理后的表达矩阵，还是项目级元信息。

如果数据库对象没分清，就很容易把错误带到后续解释层。

<PrerequisitesBox
  items={[
    'gene、transcript、protein、structure、sample / dataset 是不同层次对象，不应混为一谈。',
    '参考版本和注释版本会影响你在数据库里看到的坐标、ID 与解释。',
    '很多门户整合了多个子数据库，因此不能把“入口网站”和“具体数据库对象”视为同一件事。',
  ]}
/>

## 先按问题选资源

<DecisionMatrix
  rows={[
    {
      scenario: '想确认某个基因或转录本的坐标、注释与版本',
      recommendation: 'Ensembl / NCBI Gene / RefSeq',
      rationale: '这些资源更直接围绕 gene、transcript、assembly 与注释记录组织信息。',
    },
    {
      scenario: '想看蛋白功能、名称统一和功能注释',
      recommendation: 'UniProt',
      rationale: '它更适合作为 protein 层对象的统一入口。',
    },
    {
      scenario: '想看已有三维结构或结构证据',
      recommendation: 'PDB',
      rationale: '这里关注的是 structure 对象，而不是基因注释本身。',
    },
    {
      scenario: '想把结果放到通路或功能模块里解释',
      recommendation: 'KEGG',
      rationale: '它更适合回答“这个分子处在什么过程或网络里”。',
    },
    {
      scenario: '想找公开实验的原始测序数据',
      recommendation: 'SRA',
      rationale: 'SRA 更偏原始 reads 与测序存档。',
    },
    {
      scenario: '想找公共表达数据集、实验设计与项目说明',
      recommendation: 'GEO',
      rationale: 'GEO 更常作为表达研究和数据集元信息的入口。',
    },
  ]}
/>

## 核心资源怎么看

### NCBI

NCBI 更像一个综合入口，而不是单一类型数据库。它下面常见的对象包括：

- **NCBI Gene / RefSeq**：基因、转录本与参考序列；
- **SRA**：原始测序 reads；
- **PubMed**：文献；
- 以及其他多种知识库与交叉链接。

更适合回答的问题：

- 某个基因或转录本在 NCBI 体系里如何表示；
- 某项研究是否有对应的原始测序数据；
- 某个对象在文献、序列和存档层面如何串起来。

容易混淆的点：看到的是 NCBI 门户页面，并不代表你正在使用同一种数据库对象。

### Ensembl

Ensembl 更适合作为基因组注释与转录本层对象的入口。它常见的强项包括：

- gene / transcript / protein 的结构化注释；
- 参考基因组版本和 assembly 背景；
- 在多物种场景下保持相对统一的浏览方式。

更适合回答的问题：

- 某个基因有哪些转录本；
- 某个转录本在参考基因组上的位置与结构如何；
- 当前分析使用的注释体系和转录本对象该如何理解。

### UniProt

UniProt 更偏 protein 对象本身。它适合用来补充：

- 蛋白名称统一与功能描述；
- 域、功能注释和蛋白层级信息；
- 从基因/转录本进一步走向蛋白解释。

更适合回答的问题：

- 一个基因对应的蛋白通常做什么；
- 不同蛋白名称或条目之间如何对应；
- 某个结果如何从 transcript 层走到 protein 层解释。

### PDB

PDB 关注的是结构对象，而不是一般的注释对象。

更适合回答的问题：

- 某个蛋白或复合体是否已有三维结构；
- 一个变化位点是否落在已知结构区域或功能位点附近；
- 结构证据能否帮助解释功能变化。

### KEGG

KEGG 更适合把基因、蛋白或代谢对象放回通路背景中理解。

更适合回答的问题：

- 某个分子参与哪些代谢或信号通路；
- 一组结果是否集中在同一功能模块；
- 下游解释应落在哪个过程或网络层面。

### GEO / SRA

这两个资源经常一起出现，但用途不完全相同：

- **GEO** 更常作为表达研究、实验设计和数据集说明的入口；
- **SRA** 更偏原始测序读段和测序存档。

更适合回答的问题：

- 我能否找到某类公开实验作为对照；
- 我需要的是项目元信息，还是原始 reads；
- 这个公开研究更适合复用元数据，还是重新下载原始数据自己分析。

## worked example

假设你在 RNA-seq 或变异解释里遇到一个候选基因，想回答下面几个问题：

1. 这个基因在当前参考版本上对应哪些转录本？
2. 它编码的蛋白大致做什么？
3. 是否已有已知结构可供参考？
4. 它位于什么通路背景中？
5. 是否存在可复用的公开实验数据？

一种自然的查询路径是：

- 先到 **Ensembl** 或 **NCBI Gene / RefSeq** 确认 gene 与 transcript 对象，以及所处的参考与注释背景；
- 再到 **UniProt** 看蛋白层面的功能描述；
- 如果需要结构线索，再查 **PDB**；
- 如果想把结果放回生物过程，再查 **KEGG**；
- 如果想寻找公开实验数据，则去 **GEO / SRA** 看数据集说明或原始 reads。

这个例子说明：数据库不是彼此替代关系，而是分别回答不同层次的问题。

## 与真实工具或流程的连接

<ToolMappingBox
  items={[
    'RNA-seq、variant calling 等流程的“解释层”，最终都要把结果映射回 gene / transcript / protein / pathway 等数据库对象。',
    '很多注释工具本质上是在做“把文件里的坐标或 ID 接到数据库对象上”这件事。',
    '复用公开数据时，通常要先区分你需要的是数据集说明、处理结果，还是原始 reads。',
  ]}
/>

## 常见误区

<PitfallsBox
  items={[
    '把 NCBI 当成单一数据库，而忽略它其实是多个资源入口的集合。',
    '只看 gene symbol，不确认稳定 ID、转录本层级或参考版本。',
    '把 GEO 和 SRA 当成完全相同的资源，结果在“项目说明”和“原始数据”之间来回混淆。',
    '找到一个数据库记录后，就默认它能和当前分析里的参考版本或注释体系直接对应。',
  ]}
/>

## 相关页面

<RelatedLinks
  links={[
    {
      title: '数据库与注释系统一览',
      to: '/docs/data-references/databases-and-annotations',
      label: '上层地图',
      description: '先从更高层理解数据库分类、ID 体系和版本意识。',
    },
    {
      title: '参考基因组、坐标系统与注释',
      to: '/docs/foundations/reference-and-annotation',
      label: '对象边界',
      description: '理解为什么数据库对象几乎总和参考与注释体系绑定出现。',
    },
    {
      title: '常见文件格式概览',
      to: '/docs/formats/common-file-formats',
      label: '文件接口',
      description: '数据库对象最终往往通过 FASTA、GTF、VCF 等文件格式进入实际流程。',
    },
  ]}
/>

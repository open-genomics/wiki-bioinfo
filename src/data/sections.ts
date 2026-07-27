/**
 * 板块配置 - 单一真相源
 *
 * 作为 Seam，统一管理所有板块信息，供以下消费者使用：
 * - astro.config.mjs → sidebar 配置
 * - PageHeaderMeta.astro → 板块元信息
 * - 其他需要板块信息的组件
 *
 * 提升了 Locality（一处修改）和 Leverage（多处使用）
 */

export interface SectionMeta {
  /** 板块标识，与 sections 对象的 key 同名（运行时通过对象 key 查找，不读取此字段） */
  id: string;
  /** 板块标题（用于 sidebar 和组件显示） */
  label: string;
  /** 板块描述（用于 PageHeaderMeta） */
  description: string;
  /** Sidebar 配置项 */
  items: SidebarItem[];
  /** 是否默认折叠 */
  collapsed?: boolean;
}

export interface SidebarItem {
  slug?: string;
  label?: string;
  collapsed?: boolean;
  items?: SidebarItem[];
}

/**
 * 所有板块配置
 */
export const sections: Record<string, SectionMeta> = {
  intro: {
    id: 'intro',
    label: '导论',
    description: '帮助你快速判断本页所属知识层级与在全站中的位置。',
    items: [
      { slug: 'intro' },
      { slug: 'intro/roadmap' },
      { slug: 'intro/contributing' },
      { slug: 'intro/style-guide' },
    ],
  },
  foundations: {
    id: 'foundations',
    label: '基础与数学',
    description: '对象层、坐标系统、coverage 与概率图模型的共同语言。',
    items: [
      { slug: 'foundations' },
      { slug: 'foundations/biology-basics' },
      { slug: 'foundations/sequences-and-strings' },
      { slug: 'foundations/sequencing-reads-coverage' },
      { slug: 'foundations/reference-and-annotation' },
      { slug: 'foundations/probability-and-graphs' },
      { slug: 'foundations/algorithms-and-complexity' },
    ],
  },
  'core-methods': {
    id: 'core-methods',
    label: '核心方法',
    description: '索引、比对、组装与概率模型构成的核心算法主轴。',
    items: [
      { slug: 'core-methods' },
      { slug: 'core-methods/algorithm-design-paradigms' },
      { slug: 'core-methods/method-connections' },
      {
        label: '算法专题',
        collapsed: true,
        items: [
          { slug: 'core-methods/algorithms' },
          { slug: 'core-methods/algorithms/graph-algorithms' },
          { slug: 'core-methods/algorithms/dynamic-programming-basics' },
          { slug: 'core-methods/algorithms/divide-and-conquer' },
          { slug: 'core-methods/algorithms/exhaustive-search' },
          { slug: 'core-methods/algorithms/greedy-algorithms' },
          { slug: 'core-methods/algorithms/approximation-algorithms' },
          { slug: 'core-methods/algorithms/randomized-algorithms' },
          { slug: 'core-methods/algorithms/genome-rearrangements' },
          { slug: 'core-methods/algorithms/eulerian-hamiltonian-paths' },
          { slug: 'core-methods/algorithms/dag-longest-path' },
          { slug: 'core-methods/algorithms/clustering-algorithms' },
        ],
      },
      {
        label: '序列表示与索引',
        collapsed: true,
        items: [
          { slug: 'core-methods/sequence' },
          { slug: 'core-methods/sequence/kmers' },
          { slug: 'core-methods/sequence/indexing' },
          { slug: 'core-methods/sequence/hash-tables' },
          { slug: 'core-methods/sequence/exact-string-matching' },
          { slug: 'core-methods/sequence/kmp-algorithm' },
          { slug: 'core-methods/sequence/boyer-moore-algorithm' },
          { slug: 'core-methods/sequence/trie-and-multi-pattern-matching' },
          { slug: 'core-methods/sequence/exact-vs-approximate' },
          { slug: 'core-methods/sequence/suffix-tree' },
          { slug: 'core-methods/sequence/suffix-array-bwt' },
          { slug: 'core-methods/sequence/fm-index' },
        ],
      },
      {
        label: '序列比对',
        collapsed: true,
        items: [
          { slug: 'core-methods/alignment' },
          { slug: 'core-methods/alignment/edit-distance' },
          { slug: 'core-methods/alignment/global-local' },
          { slug: 'core-methods/alignment/needleman-wunsch' },
          { slug: 'core-methods/alignment/smith-waterman' },
          { slug: 'core-methods/alignment/scoring-matrices' },
          { slug: 'core-methods/alignment/semi-global-alignment' },
          { slug: 'core-methods/alignment/affine-gap-penalty' },
          { slug: 'core-methods/alignment/hirschberg' },
          { slug: 'core-methods/alignment/banded-dp' },
          { slug: 'core-methods/alignment/blast' },
          { slug: 'core-methods/alignment/multiple-sequence-alignment' },
        ],
      },
      {
        label: '组装与图算法',
        collapsed: true,
        items: [
          { slug: 'core-methods/assembly' },
          { slug: 'core-methods/assembly/olc' },
          { slug: 'core-methods/assembly/de-bruijn' },
          { slug: 'core-methods/assembly/graph-traversal-algorithms' },
          { slug: 'core-methods/assembly/repeats-and-graph-cleaning' },
          { slug: 'core-methods/assembly/assembly-evaluation' },
        ],
      },
      {
        label: '概率模型与模式识别',
        collapsed: true,
        items: [
          { slug: 'core-methods/models' },
          { slug: 'core-methods/models/motif-finding' },
          { slug: 'core-methods/models/motif-discovery-algorithms' },
          { slug: 'core-methods/models/pwm-pssm' },
          { slug: 'core-methods/models/hmm' },
          { slug: 'core-methods/models/viterbi-forward-backward' },
          { slug: 'core-methods/models/profile-hmm' },
          { slug: 'core-methods/models/em-algorithm' },
          { slug: 'core-methods/models/bayesian-inference' },
          { slug: 'core-methods/models/gene-prediction-hmm' },
          { slug: 'core-methods/models/exon-chaining' },
          { slug: 'core-methods/models/spliced-alignment' },
          { slug: 'core-methods/models/gibbs-sampling' },
        ],
      },
    ],
  },
  'applications-omics': {
    id: 'applications-omics',
    label: '组学应用',
    description: '把核心方法放回 RNA-seq、单细胞、表观组、长读长、空间组学、蛋白质组学、多组学、系统发育与机器学习等真实任务。',
    items: [
      { slug: 'applications-omics' },
      {
        label: '工作流与案例',
        collapsed: true,
        items: [
          { slug: 'applications-omics/workflows' },
          { slug: 'applications-omics/workflows/ngs-overview' },
          { slug: 'applications-omics/workflows/qc-overview' },
          { slug: 'applications-omics/workflows/rna-seq' },
          { slug: 'applications-omics/workflows/metagenomics-overview' },
          { slug: 'applications-omics/workflows/choosing-alignment-assembly' },
        ],
      },
      {
        label: '转录组',
        collapsed: true,
        items: [
          { slug: 'applications-omics/transcriptomics' },
          { slug: 'applications-omics/transcriptomics/pseudo-alignment-and-quantification' },
          { slug: 'applications-omics/transcriptomics/tpm-fpkm-cpm' },
          { slug: 'applications-omics/transcriptomics/gene-vs-transcript-quant' },
          { slug: 'applications-omics/transcriptomics/differential-expression' },
        ],
      },
      {
        label: '单细胞组学',
        collapsed: true,
        items: [
          { slug: 'applications-omics/single-cell' },
          { slug: 'applications-omics/single-cell/scrna-seq-overview' },
          { slug: 'applications-omics/single-cell/cell-barcode-umi' },
          { slug: 'applications-omics/single-cell/clustering-and-umap' },
          { slug: 'applications-omics/single-cell/trajectory-analysis' },
          { slug: 'applications-omics/single-cell/doublet-detection' },
          { slug: 'applications-omics/single-cell/spatial-transcriptomics-overview' },
          { slug: 'applications-omics/single-cell/spatial-spot-vs-single-cell' },
          { slug: 'applications-omics/single-cell/spatial-deconvolution-and-mapping' },
        ],
      },
      {
        label: '表观基因组学',
        collapsed: true,
        items: [
          { slug: 'applications-omics/epigenomics' },
          { slug: 'applications-omics/epigenomics/chip-seq-overview' },
          { slug: 'applications-omics/epigenomics/atac-seq' },
          { slug: 'applications-omics/epigenomics/dna-methylation' },
          { slug: 'applications-omics/epigenomics/macs2-peak-calling' },
        ],
      },
      {
        label: '群体遗传学',
        collapsed: true,
        items: [
          { slug: 'applications-omics/population' },
          { slug: 'applications-omics/population/hardy-weinberg' },
          { slug: 'applications-omics/population/linkage-disequilibrium' },
          { slug: 'applications-omics/population/gwas' },
          { slug: 'applications-omics/population/population-structure' },
        ],
      },
      {
        label: '长读长测序',
        collapsed: true,
        items: [
          { slug: 'applications-omics/long-read' },
          { slug: 'applications-omics/long-read/pacbio-nanopore' },
          { slug: 'applications-omics/long-read/long-read-assembly' },
          { slug: 'applications-omics/long-read/sv-detection' },
          { slug: 'applications-omics/long-read/basecalling-algorithm' },
          { slug: 'applications-omics/long-read/consensus-algorithm' },
          { slug: 'applications-omics/long-read/minimap2-alignment' },
          { slug: 'applications-omics/long-read/overlap-detection' },
        ],
      },
      {
        label: '蛋白质组学',
        collapsed: true,
        items: [
          { slug: 'applications-omics/proteomics' },
          { slug: 'applications-omics/proteomics/mass-spectrometry-basics' },
          { slug: 'applications-omics/proteomics/database-search-and-fdr' },
          { slug: 'applications-omics/proteomics/quantitative-proteomics' },
          { slug: 'applications-omics/proteomics/spectrum-graphs' },
          { slug: 'applications-omics/proteomics/spectral-convolution' },
          { slug: 'applications-omics/proteomics/spectral-alignment' },
        ],
      },
      {
        label: '多组学整合',
        collapsed: true,
        items: [
          { slug: 'applications-omics/multi-omics' },
          { slug: 'applications-omics/multi-omics/integration-strategies' },
          { slug: 'applications-omics/multi-omics/batch-effect-and-harmonization' },
          { slug: 'applications-omics/multi-omics/single-cell-multiome' },
          { slug: 'applications-omics/multi-omics/integration-algorithms' },
        ],
      },
      {
        label: '系统发育与进化',
        collapsed: true,
        items: [
          { slug: 'applications-omics/phylogeny' },
          { slug: 'applications-omics/phylogeny/distance-methods' },
          { slug: 'applications-omics/phylogeny/additive-phylogeny' },
          { slug: 'applications-omics/phylogeny/upgma' },
          { slug: 'applications-omics/phylogeny/neighbor-joining' },
          { slug: 'applications-omics/phylogeny/parsimony' },
          { slug: 'applications-omics/phylogeny/maximum-likelihood' },
        ],
      },
      {
        label: '机器学习与基础模型',
        collapsed: true,
        items: [
          { slug: 'applications-omics/ml-bioinfo' },
          { slug: 'applications-omics/ml-bioinfo/deep-learning-for-sequences' },
          { slug: 'applications-omics/ml-bioinfo/cnn-for-sequences' },
          { slug: 'applications-omics/ml-bioinfo/transformer-for-sequences' },
          { slug: 'applications-omics/ml-bioinfo/embeddings-and-language-models' },
        ],
      },
    ],
  },
  'applications-clinical': {
    id: 'applications-clinical',
    label: '临床应用',
    description: '围绕变异检测、临床变异解释与结构生物信息学等偏临床解释的分析方向。',
    items: [
      { slug: 'applications-clinical' },
      {
        label: '变异检测',
        collapsed: true,
        items: [
          { slug: 'applications-clinical/variants' },
          { slug: 'applications-clinical/variants/variant-calling-overview' },
          { slug: 'applications-clinical/variants/variant-filtering' },
          { slug: 'applications-clinical/variants/small-variants-vs-sv' },
          { slug: 'applications-clinical/variants/repeats-and-low-complexity' },
          { slug: 'applications-clinical/variants/germline-vs-somatic' },
        ],
      },
      {
        label: '临床变异解释',
        collapsed: true,
        items: [
          { slug: 'applications-clinical/clinical-variants' },
          { slug: 'applications-clinical/clinical-variants/variant-annotation-and-prioritization' },
          { slug: 'applications-clinical/clinical-variants/acmg-guidelines' },
          { slug: 'applications-clinical/clinical-variants/cnv-and-sv-interpretation' },
          { slug: 'applications-clinical/clinical-variants/algorithms' },
        ],
      },
      {
        label: '结构生物信息学',
        collapsed: true,
        items: [
          { slug: 'applications-clinical/structure-bioinfo' },
          { slug: 'applications-clinical/structure-bioinfo/protein-structure-basics' },
          { slug: 'applications-clinical/structure-bioinfo/alphafold-and-structure-prediction' },
          { slug: 'applications-clinical/structure-bioinfo/structure-alignment-and-fold' },
          { slug: 'applications-clinical/structure-bioinfo/molecular-dynamics-basics' },
          { slug: 'applications-clinical/structure-bioinfo/protein-interaction-prediction' },
        ],
      },
    ],
  },
  'data-references': {
    id: 'data-references',
    label: '数据、注释与资源',
    description: '参考版本、注释体系、数据格式与数据库的统一入口。',
    items: [
      { slug: 'data-references' },
      { slug: 'data-references/databases-and-annotations' },
      { slug: 'data-references/common-formats-overview' },
      { slug: 'data-references/reference-versions-and-liftover' },
      { slug: 'data-references/annotation-pipelines' },
      {
        label: '数据库与资源',
        collapsed: true,
        items: [
          { slug: 'data-references/databases' },
          { slug: 'data-references/databases/common-resources' },
          { slug: 'data-references/databases/ncbi' },
          { slug: 'data-references/databases/ensembl' },
          { slug: 'data-references/databases/uniprot' },
          { slug: 'data-references/databases/pdb' },
          { slug: 'data-references/databases/database-algorithms' },
        ],
      },
      {
        label: '常见数据格式',
        collapsed: true,
        items: [
          { slug: 'data-references/formats' },
          { slug: 'data-references/formats/common-file-formats' },
          { slug: 'data-references/formats/fasta-format' },
          { slug: 'data-references/formats/fastq-format' },
          { slug: 'data-references/formats/sam-bam-cram' },
          { slug: 'data-references/formats/gtf-gff-bed' },
          { slug: 'data-references/formats/vcf-bcf-format' },
        ],
      },
    ],
  },
  appendix: {
    id: 'appendix',
    label: '附录',
    description: '术语、索引与参考资料入口，帮助快速定位相关主题。',
    collapsed: true,
    items: [
      { slug: 'appendix' },
      { slug: 'appendix/glossary' },
      { slug: 'appendix/references' },
      { slug: 'appendix/classical-problems-index' },
    ],
  },
};

/**
 * 获取板块元信息
 */
export function getSectionMeta(sectionId: string): SectionMeta | undefined {
  return sections[sectionId];
}

/**
 * 从 SidebarItem 树中递归提取所有 slug
 */
function flattenSlugs(items: SidebarItem[]): string[] {
  const slugs: string[] = [];
  for (const item of items) {
    if (item.slug) slugs.push(item.slug);
    if (item.items) slugs.push(...flattenSlugs(item.items));
  }
  return slugs;
}

/**
 * 自动从 sections 配置推导路径前缀 → section ID 映射
 * 消除手动维护的同步 seam
 */
function derivePathToSection(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const [sectionId, section] of Object.entries(sections)) {
    if (sectionId === 'intro') continue; // intro 页面不属于特定板块
    for (const slug of flattenSlugs(section.items)) {
      const firstSegment = slug.split('/')[0];
      if (firstSegment && !map[firstSegment]) {
        map[firstSegment] = sectionId;
      }
    }
  }
  return map;
}

/**
 * 路径前缀 → section ID 映射（自动推导，非手动维护）
 */
const pathToSection: Record<string, string> = derivePathToSection();

/**
 * 从 slug 路径推断所属板块
 * @param slug 页面路径（不含 base URL，如 "alignment/edit-distance"）
 * @returns section ID 或 undefined（intro 页面等）
 */
export function getSectionFromSlug(slug: string): string | undefined {
  const firstSegment = slug.split('/')[0];
  if (!firstSegment) return undefined;
  return pathToSection[firstSegment];
}

/**
 * 生成 Starlight sidebar 配置
 */
export function getSidebarConfig() {
  return Object.values(sections).map((section) => ({
    label: section.label,
    collapsed: section.collapsed ?? false,
    items: section.items,
  }));
}

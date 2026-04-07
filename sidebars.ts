import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: '开始这里',
      link: {type: 'doc', id: 'intro/index'},
      items: ['intro/about', 'intro/roadmap', 'intro/contributing', 'intro/style-guide'],
    },
    {
      type: 'category',
      label: '基础与数学',
      link: {type: 'doc', id: 'foundations/index'},
      items: [
        'foundations/biology-basics',
        'foundations/sequences-and-strings',
        'foundations/sequencing-reads-coverage',
        'foundations/reference-and-annotation',
        'foundations/probability-and-graphs',
        'foundations/algorithms-and-complexity',
      ],
    },
    {
      type: 'category',
      label: '核心方法',
      link: {type: 'doc', id: 'core-methods/index'},
      items: [
        {
          type: 'category',
          label: '序列表示与索引',
          link: {type: 'doc', id: 'sequence/index'},
          items: [
            'sequence/kmers',
            'sequence/indexing',
            'sequence/exact-string-matching',
            'sequence/trie-and-multi-pattern-matching',
            'sequence/exact-vs-approximate',
            'sequence/suffix-tree',
            'sequence/suffix-array-bwt',
            'sequence/fm-index',
          ],
        },
        {
          type: 'category',
          label: '序列比对',
          link: {type: 'doc', id: 'alignment/index'},
          items: [
            'alignment/edit-distance',
            'alignment/global-local',
            'alignment/scoring-matrices',
            'alignment/affine-gap-penalty',
            'alignment/seed-and-extend',
            'alignment/multiple-sequence-alignment',
          ],
        },
        {
          type: 'category',
          label: '组装与图算法',
          link: {type: 'doc', id: 'assembly/index'},
          items: [
            'assembly/olc',
            'assembly/de-bruijn',
            'assembly/repeats-and-graph-cleaning',
            'assembly/assembly-evaluation',
          ],
        },
        {
          type: 'category',
          label: '概率模型与模式识别',
          link: {type: 'doc', id: 'models/index'},
          items: [
            'models/motif-finding',
            'models/motif-discovery-algorithms',
            'models/pwm-pssm',
            'models/hmm',
            'models/viterbi-forward-backward',
            'models/profile-hmm',
            'models/gene-prediction',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '分析方向与案例',
      link: {type: 'doc', id: 'applications/index'},
      items: [
        {
          type: 'category',
          label: '工作流与案例',
          link: {type: 'doc', id: 'workflows/index'},
          items: [
            'workflows/ngs-overview',
            'workflows/qc-overview',
            'workflows/rna-seq',
            'workflows/metagenomics-overview',
            'workflows/choosing-alignment-assembly',
          ],
        },
        {
          type: 'category',
          label: '变异检测',
          link: {type: 'doc', id: 'variants/index'},
          items: [
            'variants/variant-calling-overview',
            'variants/variant-filtering',
            'variants/small-variants-vs-sv',
            'variants/repeats-and-low-complexity',
            'variants/germline-vs-somatic',
          ],
        },
        {
          type: 'category',
          label: '转录组',
          link: {type: 'doc', id: 'transcriptomics/index'},
          items: [
            'transcriptomics/pseudo-alignment-and-quantification',
            'transcriptomics/tpm-fpkm-cpm',
            'transcriptomics/gene-vs-transcript-quant',
            'transcriptomics/differential-expression',
          ],
        },
        {
          type: 'category',
          label: '单细胞组学',
          link: {type: 'doc', id: 'single-cell/index'},
          items: [
            'single-cell/scrna-seq-overview',
            'single-cell/cell-barcode-umi',
            'single-cell/clustering-and-umap',
            'single-cell/trajectory-analysis',
            'single-cell/doublet-detection',
          ],
        },
        {
          type: 'category',
          label: '表观基因组学',
          link: {type: 'doc', id: 'epigenomics/index'},
          items: [
            'epigenomics/chip-seq-overview',
            'epigenomics/atac-seq',
            'epigenomics/dna-methylation',
          ],
        },
        {
          type: 'category',
          label: '群体遗传学',
          link: {type: 'doc', id: 'population/index'},
          items: [
            'population/hardy-weinberg',
            'population/linkage-disequilibrium',
            'population/gwas',
            'population/population-structure',
          ],
        },
        {
          type: 'category',
          label: '长读长测序',
          link: {type: 'doc', id: 'long-read/index'},
          items: [
            'long-read/pacbio-nanopore',
            'long-read/long-read-assembly',
            'long-read/sv-detection',
          ],
        },
        {
          type: 'category',
          label: '空间转录组',
          link: {type: 'doc', id: 'spatial/index'},
          items: [
            'spatial/spatial-transcriptomics-overview',
            'spatial/spot-vs-single-cell',
            'spatial/deconvolution-and-mapping',
          ],
        },
        {
          type: 'category',
          label: '蛋白质组学',
          link: {type: 'doc', id: 'proteomics/index'},
          items: [
            'proteomics/mass-spectrometry-basics',
            'proteomics/database-search-and-fdr',
            'proteomics/quantitative-proteomics',
          ],
        },
        {
          type: 'category',
          label: '临床变异解释',
          link: {type: 'doc', id: 'clinical-variants/index'},
          items: [
            'clinical-variants/variant-annotation-and-prioritization',
            'clinical-variants/acmg-guidelines',
            'clinical-variants/cnv-and-sv-interpretation',
          ],
        },
        {
          type: 'category',
          label: '结构生物信息学',
          link: {type: 'doc', id: 'structure-bioinfo/index'},
          items: [
            'structure-bioinfo/protein-structure-basics',
            'structure-bioinfo/alphafold-and-structure-prediction',
            'structure-bioinfo/structure-alignment-and-fold',
          ],
        },
        {
          type: 'category',
          label: '多组学整合',
          link: {type: 'doc', id: 'multi-omics/index'},
          items: [
            'multi-omics/integration-strategies',
            'multi-omics/batch-effect-and-harmonization',
            'multi-omics/single-cell-multiome',
          ],
        },
        {
          type: 'category',
          label: '系统发育与进化',
          link: {type: 'doc', id: 'phylogeny/index'},
          items: [
            'phylogeny/hierarchical-clustering',
            'phylogeny/k-means-bioinformatics',
            'phylogeny/distance-methods',
            'phylogeny/additive-phylogeny',
            'phylogeny/parsimony',
            'phylogeny/maximum-likelihood',
          ],
        },
        {
          type: 'category',
          label: '机器学习与基础模型',
          link: {type: 'doc', id: 'ml-bioinfo/index'},
          items: [
            'ml-bioinfo/deep-learning-for-sequences',
            'ml-bioinfo/embeddings-and-language-models',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '数据、注释与资源',
      link: {type: 'doc', id: 'data-references/index'},
      items: [
        'foundations/reference-and-annotation',
        {
          type: 'category',
          label: '数据库与资源',
          link: {type: 'doc', id: 'databases/index'},
          items: ['databases/common-resources'],
        },
        {
          type: 'category',
          label: '常见数据格式',
          link: {type: 'doc', id: 'formats/index'},
          items: ['formats/common-file-formats'],
        },
      ],
    },
    {
      type: 'category',
      label: '附录',
      link: {type: 'doc', id: 'appendix/index'},
      items: ['appendix/glossary', 'appendix/references'],
    },
  ],
};

export default sidebars;

import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: '项目简介',
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
      ],
    },
    {
      type: 'category',
      label: '序列表示与索引',
      link: {type: 'doc', id: 'sequence/index'},
      items: [
        'sequence/kmers',
        'sequence/indexing',
        'sequence/exact-vs-approximate',
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
      label: '变异检测',
      link: {type: 'doc', id: 'variants/index'},
      items: ['variants/variant-calling-overview'],
    },
    {
      type: 'category',
      label: '转录组',
      link: {type: 'doc', id: 'transcriptomics/index'},
      items: ['transcriptomics/pseudo-alignment-and-quantification'],
    },
    {
      type: 'category',
      label: '概率模型与模式识别',
      link: {type: 'doc', id: 'models/index'},
      items: ['models/hmm', 'models/motif-finding', 'models/pwm-pssm', 'models/gene-prediction'],
    },
    {
      type: 'category',
      label: '系统发育与进化',
      link: {type: 'doc', id: 'phylogeny/index'},
      items: ['phylogeny/distance-methods'],
    },
    {
      type: 'category',
      label: '数据库、注释与数据格式',
      link: {type: 'doc', id: 'databases/index'},
      items: ['databases/common-resources', 'formats/index', 'formats/common-file-formats'],
    },
    {
      type: 'category',
      label: '工作流与案例',
      link: {type: 'doc', id: 'workflows/index'},
      items: [
        'workflows/ngs-overview',
        'workflows/rna-seq',
        'workflows/metagenomics-overview',
        'workflows/choosing-alignment-assembly',
      ],
    },
    {
      type: 'category',
      label: '附录',
      link: {type: 'doc', id: 'appendix/glossary'},
      items: ['appendix/references'],
    },
  ],
};

export default sidebars;

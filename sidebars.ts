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
      label: '基础预备',
      link: {type: 'doc', id: 'foundations/index'},
      items: [
        'foundations/biology-basics',
        'foundations/sequences-and-strings',
        'foundations/probability-and-graphs',
      ],
    },
    {
      type: 'category',
      label: '序列与字符串',
      link: {type: 'doc', id: 'sequence/index'},
      items: ['sequence/kmers', 'sequence/indexing'],
    },
    {
      type: 'category',
      label: '序列比对',
      link: {type: 'doc', id: 'alignment/index'},
      items: [
        'alignment/edit-distance',
        'alignment/global-local',
        'alignment/scoring-matrices',
      ],
    },
    {
      type: 'category',
      label: '基因组组装',
      link: {type: 'doc', id: 'assembly/index'},
      items: ['assembly/olc', 'assembly/de-bruijn'],
    },
    {
      type: 'category',
      label: '系统发育',
      link: {type: 'doc', id: 'phylogeny/index'},
      items: ['phylogeny/distance-methods'],
    },
    {
      type: 'category',
      label: '概率模型与模式识别',
      link: {type: 'doc', id: 'models/index'},
      items: ['models/hmm', 'models/motif-finding'],
    },
    {
      type: 'category',
      label: '数据库与资源',
      link: {type: 'doc', id: 'databases/index'},
      items: ['databases/common-resources'],
    },
    {
      type: 'category',
      label: '分析流程',
      link: {type: 'doc', id: 'workflows/index'},
      items: ['workflows/ngs-overview', 'workflows/rna-seq'],
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

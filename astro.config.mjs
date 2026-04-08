import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const isProd = process.env.CI === 'true';

export default defineConfig({
  site: 'https://lessup.github.io',
  base: isProd ? '/wiki-bioinfo/' : '/',
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  integrations: [
    starlight({
      title: 'BioInfo Wiki',
      description: '面向中文社区的开源生物信息学知识库',
      defaultLocale: 'root',
      locales: {
        root: {
          label: '简体中文',
          lang: 'zh-CN',
        },
      },
      logo: {
        src: './src/assets/bioinfo-logo.svg',
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/LessUp/wiki-bioinfo',
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/LessUp/wiki-bioinfo/tree/master/',
      },
      lastUpdated: true,
      customCss: [
        './src/styles/custom.css',
        './src/styles/katex.css',
      ],
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css',
          },
        },
      ],
      sidebar: [
        {
          label: '开始这里',
          items: [
            { slug: 'intro' },
            { slug: 'intro/about' },
            { slug: 'intro/roadmap' },
            { slug: 'intro/contributing' },
            { slug: 'intro/style-guide' },
          ],
        },
        {
          label: '基础与数学',
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
        {
          label: '核心方法',
          items: [
            { slug: 'core-methods' },
            {
              label: '序列表示与索引',
              items: [
                { slug: 'sequence' },
                { slug: 'sequence/kmers' },
                { slug: 'sequence/indexing' },
                { slug: 'sequence/exact-string-matching' },
                { slug: 'sequence/kmp-algorithm' },
                { slug: 'sequence/boyer-moore-algorithm' },
                { slug: 'sequence/trie-and-multi-pattern-matching' },
                { slug: 'sequence/exact-vs-approximate' },
                { slug: 'sequence/suffix-tree' },
                { slug: 'sequence/suffix-array-bwt' },
                { slug: 'sequence/fm-index' },
              ],
            },
            {
              label: '序列比对',
              items: [
                { slug: 'alignment' },
                { slug: 'alignment/edit-distance' },
                { slug: 'alignment/global-local' },
                { slug: 'alignment/scoring-matrices' },
                { slug: 'alignment/semi-global-alignment' },
                { slug: 'alignment/affine-gap-penalty' },
                { slug: 'alignment/seed-and-extend' },
                { slug: 'alignment/multiple-sequence-alignment' },
              ],
            },
            {
              label: '组装与图算法',
              items: [
                { slug: 'assembly' },
                { slug: 'assembly/olc' },
                { slug: 'assembly/de-bruijn' },
                { slug: 'assembly/graph-traversal-algorithms' },
                { slug: 'assembly/repeats-and-graph-cleaning' },
                { slug: 'assembly/assembly-evaluation' },
              ],
            },
            {
              label: '概率模型与模式识别',
              items: [
                { slug: 'models' },
                { slug: 'models/motif-finding' },
                { slug: 'models/motif-discovery-algorithms' },
                { slug: 'models/pwm-pssm' },
                { slug: 'models/hmm' },
                { slug: 'models/viterbi-forward-backward' },
                { slug: 'models/profile-hmm' },
                { slug: 'models/em-algorithm' },
                { slug: 'models/bayesian-inference' },
                { slug: 'models/gene-prediction' },
              ],
            },
          ],
        },
        {
          label: '分析方向与案例',
          items: [
            { slug: 'applications' },
            {
              label: '工作流与案例',
              items: [
                { slug: 'workflows' },
                { slug: 'workflows/ngs-overview' },
                { slug: 'workflows/qc-overview' },
                { slug: 'workflows/rna-seq' },
                { slug: 'workflows/metagenomics-overview' },
                { slug: 'workflows/choosing-alignment-assembly' },
              ],
            },
            {
              label: '变异检测',
              items: [
                { slug: 'variants' },
                { slug: 'variants/variant-calling-overview' },
                { slug: 'variants/variant-filtering' },
                { slug: 'variants/small-variants-vs-sv' },
                { slug: 'variants/repeats-and-low-complexity' },
                { slug: 'variants/germline-vs-somatic' },
              ],
            },
            {
              label: '转录组',
              items: [
                { slug: 'transcriptomics' },
                { slug: 'transcriptomics/pseudo-alignment-and-quantification' },
                { slug: 'transcriptomics/tpm-fpkm-cpm' },
                { slug: 'transcriptomics/gene-vs-transcript-quant' },
                { slug: 'transcriptomics/differential-expression' },
              ],
            },
            {
              label: '单细胞组学',
              items: [
                { slug: 'single-cell' },
                { slug: 'single-cell/scrna-seq-overview' },
                { slug: 'single-cell/cell-barcode-umi' },
                { slug: 'single-cell/clustering-and-umap' },
                { slug: 'single-cell/trajectory-analysis' },
                { slug: 'single-cell/doublet-detection' },
              ],
            },
            {
              label: '表观基因组学',
              items: [
                { slug: 'epigenomics' },
                { slug: 'epigenomics/chip-seq-overview' },
                { slug: 'epigenomics/atac-seq' },
                { slug: 'epigenomics/dna-methylation' },
              ],
            },
            {
              label: '群体遗传学',
              items: [
                { slug: 'population' },
                { slug: 'population/hardy-weinberg' },
                { slug: 'population/linkage-disequilibrium' },
                { slug: 'population/gwas' },
                { slug: 'population/population-structure' },
              ],
            },
            {
              label: '长读长测序',
              items: [
                { slug: 'long-read' },
                { slug: 'long-read/pacbio-nanopore' },
                { slug: 'long-read/long-read-assembly' },
                { slug: 'long-read/sv-detection' },
              ],
            },
            {
              label: '空间转录组',
              items: [
                { slug: 'spatial' },
                { slug: 'spatial/spatial-transcriptomics-overview' },
                { slug: 'spatial/spot-vs-single-cell' },
                { slug: 'spatial/deconvolution-and-mapping' },
              ],
            },
            {
              label: '蛋白质组学',
              items: [
                { slug: 'proteomics' },
                { slug: 'proteomics/mass-spectrometry-basics' },
                { slug: 'proteomics/database-search-and-fdr' },
                { slug: 'proteomics/quantitative-proteomics' },
              ],
            },
            {
              label: '临床变异解释',
              items: [
                { slug: 'clinical-variants' },
                { slug: 'clinical-variants/variant-annotation-and-prioritization' },
                { slug: 'clinical-variants/acmg-guidelines' },
                { slug: 'clinical-variants/cnv-and-sv-interpretation' },
              ],
            },
            {
              label: '结构生物信息学',
              items: [
                { slug: 'structure-bioinfo' },
                { slug: 'structure-bioinfo/protein-structure-basics' },
                { slug: 'structure-bioinfo/alphafold-and-structure-prediction' },
                { slug: 'structure-bioinfo/structure-alignment-and-fold' },
              ],
            },
            {
              label: '多组学整合',
              items: [
                { slug: 'multi-omics' },
                { slug: 'multi-omics/integration-strategies' },
                { slug: 'multi-omics/batch-effect-and-harmonization' },
                { slug: 'multi-omics/single-cell-multiome' },
              ],
            },
            {
              label: '系统发育与进化',
              items: [
                { slug: 'phylogeny' },
                { slug: 'phylogeny/hierarchical-clustering' },
                { slug: 'phylogeny/k-means-bioinformatics' },
                { slug: 'phylogeny/distance-methods' },
                { slug: 'phylogeny/additive-phylogeny' },
                { slug: 'phylogeny/parsimony' },
                { slug: 'phylogeny/maximum-likelihood' },
              ],
            },
            {
              label: '机器学习与基础模型',
              items: [
                { slug: 'ml-bioinfo' },
                { slug: 'ml-bioinfo/deep-learning-for-sequences' },
                { slug: 'ml-bioinfo/cnn-for-sequences' },
                { slug: 'ml-bioinfo/rnn-lstm-for-sequences' },
                { slug: 'ml-bioinfo/transformer-for-sequences' },
                { slug: 'ml-bioinfo/embeddings-and-language-models' },
              ],
            },
          ],
        },
        {
          label: '数据、注释与资源',
          items: [
            { slug: 'data-references' },
            {
              label: '数据库与资源',
              items: [
                { slug: 'databases' },
                { slug: 'databases/common-resources' },
                { slug: 'databases/database-algorithms' },
              ],
            },
            {
              label: '常见数据格式',
              items: [
                { slug: 'formats' },
                { slug: 'formats/common-file-formats' },
              ],
            },
          ],
        },
        {
          label: '附录',
          items: [
            { slug: 'appendix' },
            { slug: 'appendix/glossary' },
            { slug: 'appendix/references' },
          ],
        },
      ],
    }),
  ],
});

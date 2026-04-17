import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const siteBase = '/wiki-bioinfo/';

export default defineConfig({
  site: 'https://lessup.github.io',
  base: siteBase,
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            katex: ['katex'],
          },
        },
      },
    },
  },
  integrations: [
    starlight({
      title: 'BioInfo Wiki',
      description: '面向中文社区的生物信息学体系化知识库',
      defaultLocale: 'root',
      locales: {
        root: {
          label: '简体中文',
          lang: 'zh-CN',
        },
        en: {
          label: 'English',
          lang: 'en',
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
      components: {
        Head: './src/components/starlight/Head.astro',
      },
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
      expressiveCode: {
        themes: ['github-dark', 'github-light'],
        styleOverrides: {
          borderRadius: '0.75rem',
          borderColor: 'var(--sl-color-gray-5)',
        },
      },
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
          label: 'Introduction',
          translations: {
            'zh-CN': '导论',
          },
          items: [
            { slug: 'en' },
            { slug: 'en/intro' },
            { slug: 'en/intro/about' },
            { slug: 'en/intro/contributing' },
          ]
        },
        {
          label: 'Core Methods',
          translations: {
            'zh-CN': '核心方法',
          },
          items: [
            { slug: 'en/core-methods' },
            { slug: 'en/sequence' },
            { slug: 'en/alignment' },
            { slug: 'en/assembly' },
            { slug: 'en/models' },
          ]
        },
        {
          label: '导论',
          items: [
            { slug: 'intro' },
            { slug: 'intro/about' },
            { slug: 'intro/roadmap' },
            { slug: 'intro/algorithms-intro' },
            { slug: 'intro/contributing' },
            { slug: 'intro/style-guide' },
          ],
        },
        {
          label: '基础与数学',
          collapsed: false,
          items: [
            { slug: 'foundations' },
            { slug: 'foundations/biology-basics' },
            { slug: 'foundations/sequences-and-strings' },
            { slug: 'foundations/sequencing-reads-coverage' },
            { slug: 'foundations/reference-and-annotation' },
            { slug: 'foundations/probability-and-graphs' },
            { slug: 'foundations/algorithms-and-complexity' },
            {
              label: '算法专题',
              collapsed: true,
              items: [
                { slug: 'foundations/graph-algorithms' },
                { slug: 'foundations/string-pattern-matching' },
                { slug: 'foundations/dynamic-programming-basics' },
                { slug: 'foundations/divide-and-conquer' },
                { slug: 'foundations/exhaustive-search' },
                { slug: 'foundations/greedy-algorithms' },
                { slug: 'foundations/change-problem' },
                { slug: 'foundations/manhattan-tourist' },
                { slug: 'foundations/edit-distance-alignment' },
                { slug: 'foundations/approximation-algorithms' },
                { slug: 'foundations/randomized-algorithms' },
                { slug: 'foundations/restriction-mapping' },
                { slug: 'foundations/genome-rearrangements' },
                { slug: 'foundations/gene-prediction' },
                { slug: 'foundations/breakpoints-and-reversals' },
                { slug: 'foundations/pancake-flipping' },
                { slug: 'foundations/eulerian-hamiltonian-paths' },
                { slug: 'foundations/dag-longest-path' },
              ],
            },
          ],
        },
        {
          label: '核心方法',
          collapsed: false,
          items: [
            { slug: 'core-methods' },
            { slug: 'core-methods/algorithm-design-paradigms' },
            { slug: 'core-methods/method-connections' },
            {
              label: '序列表示与索引',
              collapsed: true,
              items: [
                { slug: 'sequence' },
                { slug: 'sequence/kmers' },
                { slug: 'sequence/indexing' },
                { slug: 'sequence/hash-tables' },
                { slug: 'sequence/exact-string-matching' },
                { slug: 'sequence/kmp-algorithm' },
                { slug: 'sequence/boyer-moore-algorithm' },
                { slug: 'sequence/trie-and-multi-pattern-matching' },
                { slug: 'sequence/exact-vs-approximate' },
                { slug: 'sequence/suffix-tree' },
                { slug: 'sequence/suffix-array-bwt' },
                { slug: 'sequence/fm-index' },
                { slug: 'sequence/approximate-pattern-matching' },
              ],
            },
            {
              label: '序列比对',
              collapsed: true,
              items: [
                { slug: 'alignment' },
                { slug: 'alignment/edit-distance' },
                { slug: 'alignment/longest-common-subsequence' },
                { slug: 'alignment/global-local' },
                { slug: 'alignment/needleman-wunsch' },
                { slug: 'alignment/smith-waterman' },
                { slug: 'alignment/scoring-matrices' },
                { slug: 'alignment/semi-global-alignment' },
                { slug: 'alignment/affine-gap-penalty' },
                { slug: 'alignment/gotoh' },
                { slug: 'alignment/hirschberg' },
                { slug: 'alignment/banded-dp' },
                { slug: 'alignment/blast' },
                { slug: 'alignment/multiple-sequence-alignment' },
                { slug: 'alignment/four-russians-speedup' },
              ],
            },
            {
              label: '组装与图算法',
              collapsed: true,
              items: [
                { slug: 'assembly' },
                { slug: 'assembly/shortest-superstring' },
                { slug: 'assembly/sequencing-by-hybridization' },
                { slug: 'assembly/olc' },
                { slug: 'assembly/de-bruijn' },
                { slug: 'assembly/graph-traversal-algorithms' },
                { slug: 'assembly/repeats-and-graph-cleaning' },
                { slug: 'assembly/assembly-evaluation' },
              ],
            },
            {
              label: '概率模型与模式识别',
              collapsed: true,
              items: [
                { slug: 'models' },
                { slug: 'models/motif-finding' },
                { slug: 'models/motif-discovery-algorithms' },
                { slug: 'models/median-string' },
                { slug: 'models/pwm-pssm' },
                { slug: 'models/hmm' },
                { slug: 'models/viterbi-forward-backward' },
                { slug: 'models/profile-hmm' },
                { slug: 'models/em-algorithm' },
                { slug: 'models/bayesian-inference' },
                { slug: 'models/gene-prediction' },
                { slug: 'models/exon-chaining' },
                { slug: 'models/spliced-alignment' },
                { slug: 'models/gibbs-sampling' },
              ],
            },
          ],
        },
        {
          label: '分析方向与案例',
          collapsed: false,
          items: [
            { slug: 'applications' },
            {
              label: '算法应用专题',
              collapsed: true,
              items: [
                { slug: 'applications/algorithms-overview' },
                { slug: 'applications/dynamic-programming' },
                { slug: 'applications/graph-algorithms' },
                { slug: 'applications/string-algorithms' },
                { slug: 'applications/probabilistic-algorithms' },
              ],
            },
            {
              label: '工作流与案例',
              collapsed: true,
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
              collapsed: true,
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
              collapsed: true,
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
              collapsed: true,
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
              collapsed: true,
              items: [
                { slug: 'epigenomics' },
                { slug: 'epigenomics/chip-seq-overview' },
                { slug: 'epigenomics/atac-seq' },
                { slug: 'epigenomics/dna-methylation' },
                { slug: 'epigenomics/macs2-peak-calling' },
                { slug: 'epigenomics/dmr-detection' },
                { slug: 'epigenomics/footprinting-algorithms' },
              ],
            },
            {
              label: '群体遗传学',
              collapsed: true,
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
              collapsed: true,
              items: [
                { slug: 'long-read' },
                { slug: 'long-read/pacbio-nanopore' },
                { slug: 'long-read/long-read-assembly' },
                { slug: 'long-read/sv-detection' },
                { slug: 'long-read/basecalling-algorithm' },
                { slug: 'long-read/consensus-algorithm' },
                { slug: 'long-read/minimap2-alignment' },
                { slug: 'long-read/overlap-detection' },
              ],
            },
            {
              label: '空间转录组',
              collapsed: true,
              items: [
                { slug: 'spatial' },
                { slug: 'spatial/spatial-transcriptomics-overview' },
                { slug: 'spatial/spot-vs-single-cell' },
                { slug: 'spatial/deconvolution-and-mapping' },
              ],
            },
            {
              label: '蛋白质组学',
              collapsed: true,
              items: [
                { slug: 'proteomics' },
                { slug: 'proteomics/mass-spectrometry-basics' },
                { slug: 'proteomics/database-search-and-fdr' },
                { slug: 'proteomics/quantitative-proteomics' },
                { slug: 'proteomics/spectrum-graphs' },
                { slug: 'proteomics/spectral-convolution' },
                { slug: 'proteomics/spectral-alignment' },
              ],
            },
            {
              label: '临床变异解释',
              collapsed: true,
              items: [
                { slug: 'clinical-variants' },
                { slug: 'clinical-variants/variant-annotation-and-prioritization' },
                { slug: 'clinical-variants/acmg-guidelines' },
                { slug: 'clinical-variants/cnv-and-sv-interpretation' },
                { slug: 'clinical-variants/algorithms' },
              ],
            },
            {
              label: '结构生物信息学',
              collapsed: true,
              items: [
                { slug: 'structure-bioinfo' },
                { slug: 'structure-bioinfo/protein-structure-basics' },
                { slug: 'structure-bioinfo/alphafold-and-structure-prediction' },
                { slug: 'structure-bioinfo/structure-alignment-and-fold' },
                { slug: 'structure-bioinfo/molecular-dynamics-basics' },
                { slug: 'structure-bioinfo/protein-interaction-prediction' },
              ],
            },
            {
              label: '多组学整合',
              collapsed: true,
              items: [
                { slug: 'multi-omics' },
                { slug: 'multi-omics/integration-strategies' },
                { slug: 'multi-omics/batch-effect-and-harmonization' },
                { slug: 'multi-omics/single-cell-multiome' },
                { slug: 'multi-omics/canonical-correlation-analysis' },
                { slug: 'multi-omics/joint-nmf' },
                { slug: 'multi-omics/mofa-plus' },
                { slug: 'multi-omics/similarity-network-fusion' },
                { slug: 'multi-omics/integration-algorithms' },
              ],
            },
            {
              label: '系统发育与进化',
              collapsed: true,
              items: [
                { slug: 'phylogeny' },
                { slug: 'phylogeny/hierarchical-clustering' },
                { slug: 'phylogeny/k-means-bioinformatics' },
                { slug: 'phylogeny/distance-methods' },
                { slug: 'phylogeny/additive-phylogeny' },
                { slug: 'phylogeny/upgma' },
                { slug: 'phylogeny/neighbor-joining' },
                { slug: 'phylogeny/parsimony' },
                { slug: 'phylogeny/maximum-likelihood' },
                { slug: 'phylogeny/corrupted-cliques-cast' },
              ],
            },
            {
              label: '机器学习与基础模型',
              collapsed: true,
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
          collapsed: false,
          items: [
            { slug: 'data-references' },
            { slug: 'data-references/databases-and-annotations' },
            { slug: 'data-references/common-formats-overview' },
            { slug: 'data-references/reference-versions-and-liftover' },
            { slug: 'data-references/reference-genome-history' },
            { slug: 'data-references/annotation-pipelines' },
            {
              label: '数据库与资源',
              collapsed: true,
              items: [
                { slug: 'databases' },
                { slug: 'databases/common-resources' },
                { slug: 'databases/ncbi' },
                { slug: 'databases/ensembl' },
                { slug: 'databases/uniprot' },
                { slug: 'databases/pdb' },
                { slug: 'databases/database-algorithms' },
              ],
            },
            {
              label: '常见数据格式',
              collapsed: true,
              items: [
                { slug: 'formats' },
                { slug: 'formats/common-file-formats' },
                { slug: 'formats/fasta-format' },
                { slug: 'formats/fastq-format' },
                { slug: 'formats/sam-bam-cram' },
                { slug: 'formats/gtf-gff-bed' },
                { slug: 'formats/vcf-bcf-format' },
              ],
            },
          ],
        },
        {
          label: '附录',
          collapsed: true,
          items: [
            { slug: 'appendix' },
            { slug: 'appendix/glossary' },
            { slug: 'appendix/references' },
            { slug: 'appendix/algorithms' },
            { slug: 'appendix/classical-problems-index' },
          ],
        },
      ],
    }),
    sitemap({
      filter: (page) => !page.includes('/en/'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'zh-CN',
        locales: {
          'zh-CN': 'zh-CN',
          'en': 'en',
        },
      },
    }),
  ],
});

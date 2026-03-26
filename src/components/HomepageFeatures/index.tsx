import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import styles from './styles.module.css';

type HighlightCard = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

type TopicCard = {
  title: string;
  to: string;
  description: string;
  meta: string;
};

type PathCard = {
  title: string;
  to: string;
  description: string;
  audience: string;
};

type BridgeCard = {
  title: string;
  description: string;
  bullets: string[];
};

type ContributionCard = {
  title: string;
  to: string;
  description: string;
};

const highlightCards: HighlightCard[] = [
  {
    title: '体系化知识组织',
    Svg: require('@site/static/img/illustrations/knowledge-map.svg').default,
    description: (
      <>
        参考 OI Wiki 的层级导航方式，把生物学基础、字符串算法、图算法、概率模型与分析流程组织成一张可持续扩展的知识地图。
      </>
    ),
  },
  {
    title: '算法与问题并重',
    Svg: require('@site/static/img/illustrations/alignment-grid.svg').default,
    description: (
      <>
        不只介绍工具怎么用，也解释工具背后的动态规划、图模型、索引结构、概率推断和数据结构设计。
      </>
    ),
  },
  {
    title: '开放协作与持续改进',
    Svg: require('@site/static/img/illustrations/community-workflow.svg').default,
    description: (
      <>
        以文档为中心，通过 GitHub Issue、Pull Request 和自动构建逐步完善内容，让知识库像代码一样可以演进。
      </>
    ),
  },
];

const topicCards: TopicCard[] = [
  {
    title: '基础与数学',
    to: '/docs/foundations/',
    meta: '对象层',
    description: '理解序列、reads、覆盖度、参考基因组、注释、图与概率，是后续所有页面共享的语言。',
  },
  {
    title: '序列表示与索引',
    to: '/docs/sequence/',
    meta: '模型层',
    description: '从 k-mer、suffix array、BWT 到 FM-index，建立搜索、压缩与索引的统一视角。',
  },
  {
    title: '序列比对',
    to: '/docs/alignment/',
    meta: '算法层',
    description: '从编辑距离、打分矩阵与 affine gap 出发，理解比对如何从教学模型走向真实工具。',
  },
  {
    title: '组装与图算法',
    to: '/docs/assembly/',
    meta: '算法层',
    description: '理解 OLC、de Bruijn graph、重复序列与图清理，建立从局部片段恢复整体结构的视角。',
  },
  {
    title: '数据库、注释与数据格式',
    to: '/docs/databases/',
    meta: '资源层',
    description: '把 FASTA/FASTQ/BAM/VCF 等输入输出格式与 NCBI、Ensembl、UniProt 等数据对象对应起来。',
  },
  {
    title: '工作流与案例',
    to: '/docs/workflows/',
    meta: '流程层',
    description: '把 DNA-seq、RNA-seq、metagenomics 等流程和前面的算法模块、文件格式、数据库资源真正连起来。',
  },
];

const pathCards: PathCard[] = [
  {
    title: '初学者路线',
    to: '/docs/intro/roadmap',
    audience: '从整体框架开始',
    description: '先建立对象、数据格式与流程地图，再逐步深入到索引、比对、组装与统计模型。',
  },
  {
    title: '算法路线',
    to: '/docs/alignment/edit-distance',
    audience: '教材主线驱动',
    description: '从字符串、动态规划、图和概率模型切入，再映射到 BLAST、BWA、组装器和 gene prediction。',
  },
  {
    title: '实战流程路线',
    to: '/docs/workflows/ngs-overview',
    audience: '问题驱动学习',
    description: '围绕 DNA-seq、RNA-seq 与宏基因组任务，倒推它们分别依赖哪些算法与数据结构。',
  },
];

const bridgeCards: BridgeCard[] = [
  {
    title: '字符串与动态规划',
    description: '从编辑距离、全局/局部比对到 affine gap，理解 read mapping 背后的数学骨架。',
    bullets: ['编辑距离', 'Needleman–Wunsch / Smith–Waterman', 'gap penalty'],
  },
  {
    title: '索引与快速搜索',
    description: '从 k-mer 与 minimizer 到 BWT / FM-index，解释为什么真实工具能在海量参考序列上快速定位。',
    bullets: ['k-mer', 'suffix array / BWT', 'FM-index'],
  },
  {
    title: '图算法与组装',
    description: '从 overlap 到 de Bruijn graph，再到重复、错误与图清理，把局部 read 还原成整体序列。',
    bullets: ['OLC', 'de Bruijn graph', 'graph cleaning'],
  },
  {
    title: '概率模型与统计推断',
    description: '从 HMM、PWM/PSSM 到表达定量、差异分析与 gene prediction，理解不确定性如何被建模。',
    bullets: ['HMM', 'PWM / PSSM', 'quantification / DE'],
  },
];

const contributionCards: ContributionCard[] = [
  {
    title: '编辑与补充页面',
    to: '/docs/intro/contributing',
    description: '补知识点、补图、补 worked example、补交叉链接，让站点结构越来越完整。',
  },
  {
    title: '查看写作规范',
    to: '/docs/intro/style-guide',
    description: '统一使用概念页、算法页、流程页和 landing page 模板，保证整站长期可维护。',
  },
  {
    title: '跟进学习路线',
    to: '/docs/intro/roadmap',
    description: '把新页面放进正确层级里，确保读者能按目录系统学，也能按问题跳转。',
  },
];

function Highlight({title, Svg, description}: HighlightCard) {
  return (
    <div className={clsx('col col--4', styles.cardColumn)}>
      <div className={styles.highlightCard}>
        <Svg className={styles.highlightSvg} role="img" />
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <>
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <Heading as="h2">为什么要做 BioInfo Wiki</Heading>
            <p>
              生物信息学的学习门槛往往来自两端：一端是生物学背景知识，另一端是算法与工程实现。这个项目试图把两端接起来。
            </p>
          </div>
          <div className="row">
            {highlightCards.map((card, index) => (
              <Highlight key={index} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className={clsx(styles.section, styles.topicSection)}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <Heading as="h2">全站知识地图</Heading>
            <p>BioInfo Wiki 不是按工具列表堆砌内容，而是把对象、模型、算法、资源与工作流组织成可回溯的知识网络。</p>
          </div>
          <div className={styles.topicGrid}>
            {topicCards.map((item) => (
              <Link key={item.to} className={styles.topicCard} to={item.to}>
                <span className={styles.topicMeta}>{item.meta}</span>
                <Heading as="h3">{item.title}</Heading>
                <p>{item.description}</p>
                <span>进入专题</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <Heading as="h2">推荐学习路线</Heading>
            <p>无论你是从教材入门，还是已经在做实际分析，都可以从这里找到适合自己的阅读顺序。</p>
          </div>
          <div className={styles.pathGrid}>
            {pathCards.map((item) => (
              <Link key={item.to} className={styles.pathCard} to={item.to}>
                <span className={styles.pathAudience}>{item.audience}</span>
                <Heading as="h3">{item.title}</Heading>
                <p>{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={clsx(styles.section, styles.bridgeSection)}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <Heading as="h2">从教材到实践</Heading>
            <p>把字符串、图和概率模型一路映射到 DNA-seq、RNA-seq、变异检测、组装和功能解释，是这个站点最核心的设计目标。</p>
          </div>
          <div className={styles.bridgeGrid}>
            {bridgeCards.map((card) => (
              <div key={card.title} className={styles.bridgeCard}>
                <Heading as="h3">{card.title}</Heading>
                <p>{card.description}</p>
                <ul>
                  {card.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <Heading as="h2">开放协作与最近更新入口</Heading>
            <p>站点会持续扩充页面、图示与工作流。你可以从贡献入口、写作规范和学习路线开始参与这张知识图谱的建设。</p>
          </div>
          <div className={styles.contributionGrid}>
            {contributionCards.map((item) => (
              <Link key={item.to} className={styles.contributionCard} to={item.to}>
                <Heading as="h3">{item.title}</Heading>
                <p>{item.description}</p>
                <span>查看入口</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

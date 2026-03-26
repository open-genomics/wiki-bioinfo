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
};

type PathCard = {
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
    title: '基础预备',
    to: '/docs/foundations/',
    description: '理解 DNA、RNA、蛋白质、测序读段、图模型和概率概念，是后续算法学习的共同起点。',
  },
  {
    title: '序列与字符串',
    to: '/docs/sequence/',
    description: '从 k-mer、最小化子到 FM-index，建立序列表示、索引和搜索的统一视角。',
  },
  {
    title: '序列比对',
    to: '/docs/alignment/',
    description: '从编辑距离和打分矩阵出发，串联全局比对、局部比对和启发式搜索。',
  },
  {
    title: '基因组组装',
    to: '/docs/assembly/',
    description: '理解 OLC 与 de Bruijn graph 两条主线，以及错误、重复和覆盖度带来的挑战。',
  },
  {
    title: '系统发育',
    to: '/docs/phylogeny/',
    description: '掌握距离矩阵、聚类和树构建方法，理解序列相似性如何映射到进化关系。',
  },
  {
    title: '数据库与流程',
    to: '/docs/databases/',
    description: '把教材中的算法视角与现代常用数据库、测序分析流程和质量控制实践连接起来。',
  },
];

const pathCards: PathCard[] = [
  {
    title: '1. 先补基础',
    to: '/docs/foundations/biology-basics',
    description: '先建立对生物学对象、参考基因组、读段与注释文件的基本认识。',
  },
  {
    title: '2. 再看序列模型',
    to: '/docs/sequence/kmers',
    description: '把生物序列抽象成字符串和图，再理解搜索、索引和压缩。',
  },
  {
    title: '3. 进入核心算法',
    to: '/docs/alignment/edit-distance',
    description: '从动态规划到图遍历，是教材主线中最重要的一段。',
  },
  {
    title: '4. 连接真实流程',
    to: '/docs/workflows/ngs-overview',
    description: '把算法知识映射回实际分析任务，例如比对、定量、变异检测与组装。',
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
            <Heading as="h2">第一阶段核心专题</Heading>
            <p>先把最常用、最能串起全局认知的知识块搭起来，再逐步向更多实验流程和高级专题扩展。</p>
          </div>
          <div className={styles.topicGrid}>
            {topicCards.map((item) => (
              <Link key={item.to} className={styles.topicCard} to={item.to}>
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
            <Heading as="h2">推荐阅读路径</Heading>
            <p>如果你是第一次系统学习生物信息学，可以按下面的顺序阅读。</p>
          </div>
          <div className={styles.pathGrid}>
            {pathCards.map((item) => (
              <Link key={item.to} className={styles.pathCard} to={item.to}>
                <Heading as="h3">{item.title}</Heading>
                <p>{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import knowledgeMapSvg from '@site/static/img/illustrations/knowledge-map.svg';
import alignmentGridSvg from '@site/static/img/illustrations/alignment-grid.svg';
import communityWorkflowSvg from '@site/static/img/illustrations/community-workflow.svg';
import {highlightCards, knowledgeBuckets, learningPaths, bridgeCards, contributionCards} from './data';
import styles from './sections.module.css';

type SectionProps = {
  label: string;
  title: string;
  description: string;
  nextStep?: ReactNode;
  children: ReactNode;
  className?: string;
};

type HighlightProps = {
  title: string;
  badge: string;
  illustration: React.ComponentType<React.ComponentProps<'svg'>>;
  description: string;
};

const illustrationMap = {
  'knowledge-map': knowledgeMapSvg,
  'alignment-grid': alignmentGridSvg,
  'community-workflow': communityWorkflowSvg,
} as const;

function Section({label, title, description, nextStep, children, className}: SectionProps) {
  return (
    <section className={clsx(styles.section, className)}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>{label}</span>
          <Heading as="h2">{title}</Heading>
          <p>{description}</p>
          {nextStep ? <div className={styles.sectionNext}>{nextStep}</div> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

function HighlightCard({title, badge, illustration: Svg, description}: HighlightProps) {
  return (
    <div className={clsx('col col--4', styles.cardColumn)}>
      <div className={styles.highlightCard}>
        <span className={styles.highlightBadge}>{badge}</span>
        <Svg className={styles.highlightSvg} role="img" />
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export function HighlightsSection(): ReactNode {
  return (
    <Section
      label="Editorial View"
      title="为什么先做结构成熟化"
      description="继续扩内容当然重要，但如果顶层目录、首页入口和源码边界还不稳定，内容越多，后面越难收拾。"
      nextStep={<Link to="/docs/intro/roadmap">先看学习路线，再决定从哪条主干进入。</Link>}
    >
      <div className="row">
        {highlightCards.map((card) => (
          <HighlightCard key={card.title} title={card.title} badge={card.badge} illustration={illustrationMap[card.illustration]} description={card.description} />
        ))}
      </div>
    </Section>
  );
}

export function KnowledgeMapSection(): ReactNode {
  return (
    <Section
      label="Knowledge Atlas"
      title="全站知识地图"
      description="首页、顶部导航和左侧目录都围绕同一张地图展开，不再让用户看到三套略有差异的结构。"
      nextStep={<Link to="/docs/intro/">如果你是第一次进入，建议先从“开始这里”建立整体地图。</Link>}
      className={styles.softSection}
    >
      <div className={styles.bucketGrid}>
        {knowledgeBuckets.map((item) => (
          <Link key={item.to} className={styles.bucketCard} to={item.to}>
            <span className={styles.bucketMeta}>{item.meta}</span>
            <Heading as="h3">{item.title}</Heading>
            <p>{item.description}</p>
            <ul>
              {item.children.map((child) => (
                <li key={child}>{child}</li>
              ))}
            </ul>
            <div className={styles.bucketFooter}>
              <small>{item.nextStep}</small>
              <span>进入板块</span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

export function LearningPathsSection(): ReactNode {
  return (
    <Section
      label="Reading Paths"
      title="推荐学习路线"
      description="不管你是从教材、算法还是分析任务切入，都应该先进入稳定的主干，再逐步钻进子专题。"
      nextStep={<Link to="/docs/intro/roadmap">查看完整学习路线页。</Link>}
    >
      <div className={styles.pathGrid}>
        {learningPaths.map((item) => (
          <Link key={item.to} className={styles.pathCard} to={item.to}>
            <span className={styles.pathAudience}>{item.audience}</span>
            <Heading as="h3">{item.title}</Heading>
            <p>{item.description}</p>
            <ol className={styles.pathSteps}>
              {item.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </Link>
        ))}
      </div>
    </Section>
  );
}

export function BridgeSection(): ReactNode {
  return (
    <Section
      label="Bridge"
      title="从教材到实践"
      description="把字符串、图、概率模型、数据格式和工作流放进同一套知识坐标系里，是 BioInfo Wiki 区别于零散教程的关键。"
      nextStep={<Link to="/docs/core-methods/">先看方法主干，再进入应用层案例。</Link>}
      className={styles.bridgeSection}
    >
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
    </Section>
  );
}

export function ContributionSection(): ReactNode {
  return (
    <Section
      label="Contribute"
      title="像 Wiki 一样持续演进"
      description="站点结构、内容模板、图示和导航都应该是可持续维护的系统，而不是一批临时拼出来的页面。"
      nextStep={<Link to="/docs/intro/contributing">查看贡献方式和写作规范。</Link>}
    >
      <div className={styles.contributionGrid}>
        {contributionCards.map((item) => (
          <Link key={item.to} className={styles.contributionCard} to={item.to}>
            <Heading as="h3">{item.title}</Heading>
            <p>{item.description}</p>
            <span>查看入口</span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

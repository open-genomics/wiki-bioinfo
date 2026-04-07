import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import { featureCards, knowledgeBuckets, learningPaths, bridgeCards, contributionCards } from './data';
import styles from './sections.module.css';

type SectionProps = {
  label: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  centered?: boolean;
};

function Section({ label, title, description, children, className, centered }: SectionProps) {
  return (
    <section className={clsx(styles.section, className)}>
      <div className="container">
        <div className={clsx(styles.sectionHeader, centered && styles.sectionHeaderCentered)}>
          <span className={styles.sectionLabel}>{label}</span>
          <Heading as="h2">{title}</Heading>
          {description ? <p>{description}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

export function FeaturesSection(): ReactNode {
  return (
    <Section
      label="Why BioInfo Wiki"
      title="为什么选择 BioInfo Wiki"
      centered
    >
      <div className={styles.featureGrid}>
        {featureCards.map((card) => (
          <div key={card.title} className={styles.featureCard}>
            <span className={styles.featureIcon}>{card.icon}</span>
            <Heading as="h3">{card.title}</Heading>
            <p>{card.description}</p>
          </div>
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
      description="首页、导航和目录围绕同一套结构组织，六个主入口覆盖从基础到应用的完整链路。"
      className={styles.softSection}
      centered
    >
      <div className={styles.bucketGrid}>
        {knowledgeBuckets.map((item) => (
          <Link key={item.to} className={styles.bucketCard} to={item.to}>
            <div className={styles.bucketHeader}>
              <span className={styles.bucketIcon}>{item.icon}</span>
              <span className={styles.bucketMeta}>{item.meta}</span>
            </div>
            <Heading as="h3">{item.title}</Heading>
            <p>{item.description}</p>
            <div className={styles.bucketTags}>
              {item.children.map((child) => (
                <span key={child} className={styles.bucketTag}>{child}</span>
              ))}
            </div>
            <span className={styles.bucketArrow}>进入板块 →</span>
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
      description="无论你是零基础、算法爱好者还是实战导向，都能找到适合的起点。"
      centered
    >
      <div className={styles.pathGrid}>
        {learningPaths.map((item) => (
          <Link key={item.to} className={styles.pathCard} to={item.to}>
            <span className={styles.pathIcon}>{item.icon}</span>
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
      label="Core Topics"
      title="从教材到实践"
      description="把字符串、图、概率模型和工作流放进同一套知识坐标系，是 BioInfo Wiki 区别于零散教程的关键。"
      className={styles.bridgeSection}
      centered
    >
      <div className={styles.bridgeGrid}>
        {bridgeCards.map((card) => (
          <Link key={card.title} className={styles.bridgeCard} to={card.to}>
            <span className={styles.bridgeIcon}>{card.icon}</span>
            <Heading as="h3">{card.title}</Heading>
            <p>{card.description}</p>
            <div className={styles.bridgeTags}>
              {card.tags.map((tag) => (
                <span key={tag} className={styles.bridgeTag}>{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

export function ContributionSection(): ReactNode {
  return (
    <Section
      label="Contribute"
      title="一起建设 BioInfo Wiki"
      description="站点结构、内容模板和导航都应该是可持续维护的系统，欢迎一起完善。"
      centered
    >
      <div className={styles.contributionGrid}>
        {contributionCards.map((item) => (
          <Link key={item.to} className={styles.contributionCard} to={item.to}>
            <span className={styles.contributionIcon}>{item.icon}</span>
            <Heading as="h3">{item.title}</Heading>
            <p>{item.description}</p>
            <span className={styles.contributionArrow}>查看 →</span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

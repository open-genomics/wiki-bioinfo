import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

const atlasStats = [
  {
    label: '12 个板块',
    detail: '覆盖基础、索引、比对、组装、变异、转录组与工作流',
  },
  {
    label: '教材到实践',
    detail: '从字符串、图、概率模型一路连接到真实分析流程',
  },
  {
    label: '开放协作',
    detail: '以 GitHub、编辑链接与统一模板持续迭代内容',
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const heroImage = useBaseUrl('/img/illustrations/home-hero.svg');

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Open-source · Chinese-first · Bioinformatics</p>
            <div className={styles.heroBadgeRow}>
              <span className={styles.heroBadge}>算法主线</span>
              <span className={styles.heroBadge}>工作流桥接</span>
              <span className={styles.heroBadge}>图文并茂</span>
            </div>
            <Heading as="h1" className={styles.heroTitle}>
              {siteConfig.title}
            </Heading>
            <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
            <p className={styles.heroDescription}>
              参考 OI Wiki 的知识组织方式，以《An Introduction to Bioinformatics Algorithms》为骨架，
              把生物学对象、字符串与图算法、概率模型、数据格式、数据库资源与 DNA-seq / RNA-seq /
              宏基因组等分析流程组织成一张可持续扩展的知识地图。
            </p>
            <div className={styles.buttons}>
              <Link className="button button--primary button--lg" to="/docs/intro/">
                开始阅读
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/intro/roadmap">
                查看学习路线
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/intro/contributing">
                参与贡献
              </Link>
            </div>
            <div className={styles.metrics}>
              {atlasStats.map((item) => (
                <div key={item.label} className={styles.metricCard}>
                  <strong>{item.label}</strong>
                  <span>{item.detail}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.heroVisualWrap}>
            <div className={styles.heroAtlasCard}>
              <p className={styles.heroAtlasEyebrow}>Knowledge Atlas</p>
              <img src={heroImage} alt="BioInfo Wiki 首页知识图谱示意图" className={styles.heroVisualImage} />
              <div className={styles.heroAtlasLegend}>
                <span>对象</span>
                <span>模型</span>
                <span>流程</span>
                <span>资源</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description="BioInfo Wiki 首页">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

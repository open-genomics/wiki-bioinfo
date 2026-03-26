import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const heroImage = useBaseUrl('/img/illustrations/home-hero.svg');

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Open-source · Chinese-first · Bioinformatics</p>
            <Heading as="h1" className={styles.heroTitle}>
              {siteConfig.title}
            </Heading>
            <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
            <p className={styles.heroDescription}>
              参考 OI Wiki 的知识组织方式，围绕《An Introduction to Bioinformatics Algorithms》主线，
              建设一个面向中文社区、可持续协作的生物信息学知识库。
            </p>
            <div className={styles.buttons}>
              <Link className="button button--primary button--lg" to="/docs/intro/">
                开始阅读
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/intro/contributing">
                参与贡献
              </Link>
            </div>
            <div className={styles.metrics}>
              <div className={styles.metricCard}>
                <strong>9 大板块</strong>
                <span>覆盖基础、算法、数据库与流程</span>
              </div>
              <div className={styles.metricCard}>
                <strong>教材主线</strong>
                <span>以经典教材为骨架，兼顾现代实践</span>
              </div>
              <div className={styles.metricCard}>
                <strong>社区协作</strong>
                <span>文档驱动、GitHub PR、持续构建</span>
              </div>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <img src={heroImage} alt="BioInfo Wiki 首页示意图" />
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

import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import {homeStats} from './data';
import styles from './hero.module.css';

type HeroProps = {
  className?: string;
};

export default function Hero({className}: HeroProps): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const heroImage = useBaseUrl('/img/illustrations/home-hero.svg');

  return (
    <header className={clsx(styles.heroBanner, className)}>
      <div className="container">
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Open-source · Chinese-first · Bioinformatics</p>
            <div className={styles.heroBadgeRow}>
              <span className={styles.heroBadge}>结构优先</span>
              <span className={styles.heroBadge}>知识地图</span>
              <span className={styles.heroBadge}>长期演进</span>
            </div>
            <Heading as="h1" className={styles.heroTitle}>
              {siteConfig.title}
            </Heading>
            <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
            <p className={styles.heroDescription}>
              参考 OI Wiki 的组织方式，但先收敛成更稳定的六个入口：开始这里、基础与数学、核心方法、分析方向与案例、数据与资源、附录。
              让内容增长时，导航和源码结构也一起成熟。
            </p>
            <div className={styles.buttons}>
              <Link className="button button--primary button--lg" to="/docs/intro/">
                开始阅读
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/core-methods/">
                查看核心方法
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/intro/contributing">
                参与贡献
              </Link>
            </div>
            <div className={styles.metrics}>
              {homeStats.map((item) => (
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
                <span>方法</span>
                <span>应用</span>
                <span>资源</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

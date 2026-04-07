import { type ReactNode, useState, useCallback } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import { homeStats } from './data';
import styles from './hero.module.css';

type HeroProps = {
  className?: string;
};

export default function Hero({ className }: HeroProps): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const history = useHistory();
  const [query, setQuery] = useState('');

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const q = query.trim();
      if (q) {
        history.push(`/wiki-bioinfo/search?q=${encodeURIComponent(q)}`);
      }
    },
    [query, history],
  );

  return (
    <header className={clsx(styles.heroBanner, className)}>
      <div className={styles.heroGlow} />
      <div className="container">
        <div className={styles.heroInner}>
          <div className={styles.heroBadgeRow}>
            <span className={styles.heroBadge}>Open Source</span>
            <span className={styles.heroBadge}>中文优先</span>
            <span className={styles.heroBadge}>Bioinformatics</span>
          </div>

          <Heading as="h1" className={styles.heroTitle}>
            {siteConfig.title}
          </Heading>

          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>

          <form className={styles.searchBox} onSubmit={handleSearch}>
            <span className={styles.searchIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </span>
            <input
              className={styles.searchInput}
              type="search"
              placeholder="搜索知识页面… 例如 BWT、RNA-seq、de Bruijn"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className={styles.searchBtn}>搜索</button>
          </form>

          <div className={styles.buttons}>
            <Link className={clsx('button button--primary button--lg', styles.btnPrimary)} to="/docs/intro/">
              开始阅读
            </Link>
            <Link className={clsx('button button--outline button--lg', styles.btnOutline)} to="/docs/core-methods/">
              核心方法
            </Link>
            <Link className={clsx('button button--outline button--lg', styles.btnOutline)} href="https://github.com/LessUp/wiki-bioinfo">
              GitHub
            </Link>
          </div>

          <div className={styles.stats}>
            {homeStats.map((item) => (
              <div key={item.label} className={styles.statItem}>
                <strong className={styles.statValue}>{item.value}</strong>
                <span className={styles.statLabel}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

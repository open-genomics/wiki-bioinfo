import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import styles from './docs-primitives.module.css';

type SectionCard = {
  title: ReactNode;
  to: string;
  description: ReactNode;
  badge?: ReactNode;
  meta?: ReactNode;
};

type SectionNavigatorProps = {
  items: SectionCard[];
  className?: string;
};

export default function SectionNavigator({items, className}: SectionNavigatorProps): ReactNode {
  return (
    <div className={clsx(styles.sectionNavGrid, className)}>
      {items.map((item) => (
        <Link key={item.to} className={styles.sectionNavCard} to={item.to}>
          <div className={styles.sectionNavTopline}>
            {item.badge ? <span className={styles.cardBadge}>{item.badge}</span> : null}
            {item.meta ? <span className={styles.sectionMeta}>{item.meta}</span> : null}
          </div>
          <Heading as="h3">{item.title}</Heading>
          <p>{item.description}</p>
          <span className={styles.primaryAction}>进入子主题</span>
        </Link>
      ))}
    </div>
  );
}

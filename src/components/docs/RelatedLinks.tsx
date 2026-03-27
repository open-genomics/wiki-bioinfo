import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './docs-primitives.module.css';

type RelatedLink = {
  title: ReactNode;
  to: string;
  description: ReactNode;
  label?: ReactNode;
};

type RelatedLinksProps = {
  links: RelatedLink[];
  className?: string;
};

export default function RelatedLinks({links, className}: RelatedLinksProps): ReactNode {
  return (
    <div className={clsx(styles.relatedGrid, className)}>
      {links.map((link) => (
        <Link key={link.to} className={styles.relatedCard} to={link.to}>
          {link.label ? <span className={styles.relatedLabel}>{link.label}</span> : null}
          <h3>{link.title}</h3>
          <p>{link.description}</p>
          <span className={styles.secondaryAction}>延伸阅读</span>
        </Link>
      ))}
    </div>
  );
}

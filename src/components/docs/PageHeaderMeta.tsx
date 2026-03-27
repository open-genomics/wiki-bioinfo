import type {ReactNode} from 'react';
import clsx from 'clsx';
import styles from './docs-primitives.module.css';

type PageHeaderMetaProps = {
  section: ReactNode;
  audience: ReactNode;
  startWith: ReactNode;
  className?: string;
};

export default function PageHeaderMeta({section, audience, startWith, className}: PageHeaderMetaProps): ReactNode {
  return (
    <div className={clsx(styles.headerMetaGrid, className)}>
      <div className={styles.headerMetaCard}>
        <span>所属板块</span>
        <strong>{section}</strong>
      </div>
      <div className={styles.headerMetaCard}>
        <span>适合谁读</span>
        <strong>{audience}</strong>
      </div>
      <div className={styles.headerMetaCard}>
        <span>建议起点</span>
        <strong>{startWith}</strong>
      </div>
    </div>
  );
}

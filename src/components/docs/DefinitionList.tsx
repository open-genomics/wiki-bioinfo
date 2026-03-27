import type {ReactNode} from 'react';
import clsx from 'clsx';
import styles from './docs-primitives.module.css';

type DefinitionItem = {
  term: ReactNode;
  definition: ReactNode;
};

type DefinitionListProps = {
  items: DefinitionItem[];
  className?: string;
};

export default function DefinitionList({items, className}: DefinitionListProps): ReactNode {
  return (
    <dl className={clsx(styles.definitionList, className)}>
      {items.map((item, index) => (
        <div key={index} className={styles.definitionCard}>
          <dt>{item.term}</dt>
          <dd>{item.definition}</dd>
        </div>
      ))}
    </dl>
  );
}

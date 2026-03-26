import type {ReactNode} from 'react';
import clsx from 'clsx';
import styles from './content.module.css';

type PrerequisitesBoxProps = {
  title?: ReactNode;
  items: ReactNode[];
  className?: string;
};

export default function PrerequisitesBox({title = '前置知识', items, className}: PrerequisitesBoxProps): ReactNode {
  return (
    <aside className={clsx(styles.noteCard, className)}>
      <strong>{title}</strong>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}

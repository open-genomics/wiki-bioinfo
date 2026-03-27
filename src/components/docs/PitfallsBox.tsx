import type {ReactNode} from 'react';
import clsx from 'clsx';
import styles from './docs-primitives.module.css';

type PitfallsBoxProps = {
  title?: ReactNode;
  items: ReactNode[];
  className?: string;
};

export default function PitfallsBox({title = '常见误区', items, className}: PitfallsBoxProps): ReactNode {
  return (
    <aside className={clsx(styles.noteCard, styles.pitfallsCard, className)}>
      <strong>{title}</strong>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}

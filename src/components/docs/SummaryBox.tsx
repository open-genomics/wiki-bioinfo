import type {ReactNode} from 'react';
import clsx from 'clsx';
import styles from './docs-primitives.module.css';

type SummaryBoxProps = {
  title?: ReactNode;
  summary: ReactNode;
  bullets?: ReactNode[];
  className?: string;
};

export default function SummaryBox({title = '快速概览', summary, bullets = [], className}: SummaryBoxProps): ReactNode {
  return (
    <section className={clsx(styles.summaryCard, className)}>
      <strong>{title}</strong>
      <p>{summary}</p>
      {bullets.length > 0 ? (
        <ul>
          {bullets.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

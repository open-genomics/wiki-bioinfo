import type {ReactNode} from 'react';
import clsx from 'clsx';
import styles from './content.module.css';

type ComparisonRow = {
  aspect: ReactNode;
  left: ReactNode;
  right: ReactNode;
};

type ComparisonTableProps = {
  leftTitle: ReactNode;
  rightTitle: ReactNode;
  rows: ComparisonRow[];
  className?: string;
};

export default function ComparisonTable({leftTitle, rightTitle, rows, className}: ComparisonTableProps): ReactNode {
  return (
    <div className={clsx(styles.wrapper, className)}>
      <table className={styles.comparisonTable}>
        <thead>
          <tr>
            <th>维度</th>
            <th>{leftTitle}</th>
            <th>{rightTitle}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <th scope="row">{row.aspect}</th>
              <td>{row.left}</td>
              <td>{row.right}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

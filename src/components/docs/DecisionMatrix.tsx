import type {ReactNode} from 'react';
import clsx from 'clsx';
import styles from './docs-primitives.module.css';

type MatrixRow = {
  scenario: ReactNode;
  recommendation: ReactNode;
  rationale: ReactNode;
};

type DecisionMatrixProps = {
  rows: MatrixRow[];
  className?: string;
};

export default function DecisionMatrix({rows, className}: DecisionMatrixProps): ReactNode {
  return (
    <div className={clsx(styles.wrapper, className)}>
      <table className={styles.comparisonTable}>
        <thead>
          <tr>
            <th>场景</th>
            <th>推荐选择</th>
            <th>原因</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <th scope="row">{row.scenario}</th>
              <td>{row.recommendation}</td>
              <td>{row.rationale}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

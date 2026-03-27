import type {ReactNode} from 'react';
import clsx from 'clsx';
import styles from './docs-primitives.module.css';

type WorkflowStep = {
  title: ReactNode;
  description: ReactNode;
  hint?: ReactNode;
  badge?: ReactNode;
};

type WorkflowStepsProps = {
  steps: WorkflowStep[];
  className?: string;
};

export default function WorkflowSteps({steps, className}: WorkflowStepsProps): ReactNode {
  return (
    <div className={clsx(styles.workflowGrid, className)}>
      {steps.map((step, index) => (
        <div key={index} className={styles.workflowCard}>
          <div className={styles.stepIndex}>{index + 1}</div>
          <div className={styles.workflowContent}>
            {step.badge ? <span className={styles.cardBadge}>{step.badge}</span> : null}
            <h3>{step.title}</h3>
            <div className={styles.workflowDescription}>{step.description}</div>
            {step.hint ? <div className={styles.workflowHint}>{step.hint}</div> : null}
          </div>
        </div>
      ))}
    </div>
  );
}

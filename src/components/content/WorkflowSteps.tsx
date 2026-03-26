import type {ReactNode} from 'react';
import clsx from 'clsx';
import styles from './content.module.css';

type WorkflowStep = {
  title: ReactNode;
  description: ReactNode;
  hint?: ReactNode;
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
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            {step.hint ? <div className={styles.workflowHint}>{step.hint}</div> : null}
          </div>
        </div>
      ))}
    </div>
  );
}

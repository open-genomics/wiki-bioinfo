import type {ReactNode} from 'react';
import clsx from 'clsx';
import styles from './docs-primitives.module.css';

type ToolMappingBoxProps = {
  title?: ReactNode;
  items: ReactNode[];
  className?: string;
};

export default function ToolMappingBox({title = '与真实工具或流程的连接', items, className}: ToolMappingBoxProps): ReactNode {
  return (
    <aside className={clsx(styles.noteCard, styles.toolMappingCard, className)}>
      <strong>{title}</strong>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}

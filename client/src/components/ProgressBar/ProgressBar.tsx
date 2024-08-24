import './ProgressBar.scss';

import { ProgressHTMLAttributes } from 'react';

interface ProgressBarProps extends ProgressHTMLAttributes<HTMLProgressElement> {
  color?: string;
  loader?: boolean;
}

export default function ProgressBar({
  color,
  loader = false,
  ...props
}: Readonly<ProgressBarProps>) {
  return (
    <progress
      className={`progress-bar ${loader ? 'in-progress' : ''}`}
      style={{ '--accentColor': color } as React.CSSProperties}
      defaultValue={0}
      {...props}
    />
  );
}

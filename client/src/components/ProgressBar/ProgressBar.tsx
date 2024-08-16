import './ProgressBar.scss';

import { ProgressHTMLAttributes } from 'react';

interface ProgressBarProps extends ProgressHTMLAttributes<HTMLProgressElement> {
  color: string;
  loader?: boolean;
}

export default function ProgressBar({
  color,
  loader = false,
  ...props
}: Readonly<ProgressBarProps>) {
  return (
    <progress
      style={{ '--accent-color': color } as React.CSSProperties}
      className={`progress-bar${loader ? ' in-progress' : ''}`}
      defaultValue={0}
      {...props}
    />
  );
}

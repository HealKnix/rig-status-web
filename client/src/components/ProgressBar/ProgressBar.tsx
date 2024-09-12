import './ProgressBar.scss';

import { ProgressHTMLAttributes } from 'react';

interface ProgressBarProps extends ProgressHTMLAttributes<HTMLProgressElement> {
  color?: string;
  loader?: boolean;
  min?: number;
  max?: number;
  value: number;
  defaultValue?: number;
}

export default function ProgressBar({
  color,
  loader = false,
  min = 0,
  max = 100,
  value,
  defaultValue = 0,
}: Readonly<ProgressBarProps>) {
  const currentMaxValue = max - min;
  const currentValue = ((value - min) / currentMaxValue) * 100;

  return (
    <div
      className={`progress-bar${loader ? ' in-progress' : ''}`}
      style={
        {
          '--width': `${currentValue ?? defaultValue}%`,
          '--accentColor': color,
        } as React.CSSProperties
      }
    />
  );
}

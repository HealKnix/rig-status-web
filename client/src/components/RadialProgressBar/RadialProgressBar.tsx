import './RadialProgressBar.scss';

import { useEffect, useState } from 'react';

interface RadialProgressBarProps {
  value: number;
  maxValue: number;
  boundaries?: {
    color: string;
    value: number;
  }[];
  size?: number;
  postfix?: string;
}

export default function RadialProgressBar({
  maxValue,
  value,
  boundaries,
  postfix,
  size,
}: RadialProgressBarProps) {
  const [color, setColor] = useState('var(--primary-color)');

  useEffect(() => {
    if (!boundaries) return;

    boundaries.forEach((bound) => {
      if (value <= bound.value) {
        setColor(bound.color);
      }
    });
  }, [value]);

  return (
    <div
      className="radial-progress-bar"
      style={{
        width: `${size ?? 200}px`,
        height: `${size ?? 200}px`,
        background: `
        radial-gradient(
          closest-side,
          var(--white) 85%,
          transparent 80% 100%
        ),
        conic-gradient(
          ${color ?? 'var(--primary-color)'} calc(${value} * ${
            100 / maxValue
          }%),
          var(--border-color) 0
        )`,
      }}
    >
      <progress max={maxValue} defaultValue={value} value={value}></progress>
      <span
        className="radial-progress-bar__text"
        style={{
          color: `${color ?? 'var(--primary-color)'}`,
        }}
      >{`${value} ${postfix ? postfix : ''}`}</span>
    </div>
  );
}

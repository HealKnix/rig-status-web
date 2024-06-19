import './ProgressBar.scss';

interface ProgressBarProps {
  color: string;
  value: number;
  maxValue: number;
}

export default function ProgressBar({
  color,
  value,
  maxValue,
}: ProgressBarProps) {
  return (
    <progress
      style={{ '--accent-color': color } as React.CSSProperties}
      className="progress-bar"
      value={value}
      max={maxValue}
      defaultValue={0}
    ></progress>
  );
}

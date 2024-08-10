import './ProgressBar.scss';

interface ProgressBarProps {
  color: string;
  value: number;
  maxValue: number;
  loader?: boolean;
}

export default function ProgressBar({
  color,
  value,
  maxValue,
  loader,
}: Readonly<ProgressBarProps>) {
  return (
    <progress
      style={{ '--accent-color': color } as React.CSSProperties}
      className={`progress-bar${loader ? ' in-progress' : ''}`}
      value={value}
      max={maxValue}
      defaultValue={0}
    ></progress>
  );
}

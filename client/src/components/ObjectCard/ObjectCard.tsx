import './ObjectCard.scss';

import { useNavigate } from 'react-router-dom';

import Button from '../Button/Button';
import ProgressBar from '../ProgressBar/ProgressBar';
import SatelliteSVG from '../SVGs/SatelliteSVG';

interface ObjectCardProps {
  id: number;
  name: string;
  location: string;
  connection_speed: number;
  drillingProgressValue: number;
  drillingProgressStatus: 'Работает' | 'Запуск...' | 'Авария' | 'Отключено';
  status: 'нормально' | 'удовлетворительно' | 'требуется ТО' | 'не в сети';
}

export default function ObjectCard({
  id,
  name,
  location,
  connection_speed,
  drillingProgressValue,
  drillingProgressStatus,
  status,
}: ObjectCardProps) {
  const navigate = useNavigate();
  let statusColor = 'var(--text-additional-color)';

  if (status === 'нормально') {
    statusColor = 'var(--success-color)';
  } else if (status === 'удовлетворительно') {
    statusColor = 'var(--warning-color)';
  } else if (status === 'требуется ТО') {
    statusColor = 'var(--error-color)';
  } else if (status === 'не в сети') {
    statusColor = 'var(--text-additional-color)';
  }

  let progressBarColor = 'var(--text-additional-color)';

  if (drillingProgressStatus === 'Работает') {
    progressBarColor = 'var(--success-color)';
  } else if (drillingProgressStatus === 'Запуск...') {
    progressBarColor = 'var(--warning-color)';
  } else if (drillingProgressStatus === 'Авария') {
    progressBarColor = 'var(--error-color)';
  } else if (drillingProgressStatus === 'Отключено') {
    progressBarColor = 'var(--text-additional-color)';
  }

  return (
    <>
      <div
        className="card-object"
        style={{
          borderBottom: `3px solid ${statusColor}`,
        }}
      >
        <span className="object-id">{id}</span>
        <span className="object-name">{name}</span>
        <span className="object-location">{location}</span>
        <div className="object-connection">
          <SatelliteSVG connection_speed={connection_speed} />
        </div>
        <div className="object-drilling-progress">
          <span>{drillingProgressStatus}</span>
          <ProgressBar
            loader={drillingProgressStatus === 'Работает'}
            value={drillingProgressValue}
            color={progressBarColor}
            maxValue={100}
          />
        </div>
        <Button
          variant="outlined"
          onClick={() => {
            navigate(`${id}`);
          }}
        >
          подробнее
        </Button>
        <span className="object-status">{status}</span>
      </div>
    </>
  );
}

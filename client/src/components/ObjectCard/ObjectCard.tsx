import './ObjectCard.scss';

import { useNavigate } from 'react-router-dom';

import { DrillingStatus } from '@/models/DrillingStatus';
import { Rig } from '@/models/Rig';
import { TechStatus } from '@/models/TechStatus';

import Button from '../Button/Button';
import ProgressBar from '../ProgressBar/ProgressBar';
import SatelliteSVG from '../SVGs/SatelliteSVG';

export default function ObjectCard({
  id,
  name,
  longitude,
  latitude,
  well_depth,
  bottom_hole_drilling,
  connection_speed,
  drilling_status_id,
  tech_status_id,
}: Readonly<Rig>) {
  const navigate = useNavigate();
  let statusColor = 'var(--text-additional-color)';

  if (tech_status_id === 1) {
    statusColor = 'var(--success-color)';
  } else if (tech_status_id === 2) {
    statusColor = 'var(--warning-color)';
  } else if (tech_status_id === 3) {
    statusColor = 'var(--error-color)';
  } else if (tech_status_id === 4) {
    statusColor = 'var(--text-additional-color)';
  }

  let progressBarColor = 'var(--text-additional-color)';

  if (drilling_status_id === 1) {
    progressBarColor = 'var(--success-color)';
  } else if (drilling_status_id === 2) {
    progressBarColor = 'var(--warning-color)';
  } else if (drilling_status_id === 3) {
    progressBarColor = 'var(--error-color)';
  } else if (drilling_status_id === 4) {
    progressBarColor = 'var(--text-additional-color)';
  }

  return (
    <div
      className="card-object"
      style={{
        borderBottom: `3px solid ${statusColor}`,
      }}
    >
      <span className="object-id">{id}</span>
      <span className="object-name">{name}</span>
      <span className="object-location">
        {longitude}° {latitude}°
      </span>
      <div className="object-connection">
        <SatelliteSVG connection_speed={connection_speed} />
      </div>
      <div className="object-drilling-progress">
        <span>{DrillingStatus[drilling_status_id]}</span>
        <ProgressBar
          loader={drilling_status_id === 1}
          value={(bottom_hole_drilling / well_depth) * 100}
          color={progressBarColor}
          max={100}
        />
      </div>
      <Button
        outlined
        onClick={() => {
          navigate(`${id}/workplace`);
        }}
      >
        подробнее
      </Button>
      <span className="object-status">{TechStatus[tech_status_id]}</span>
    </div>
  );
}

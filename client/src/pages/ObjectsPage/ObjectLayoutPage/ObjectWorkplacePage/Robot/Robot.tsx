import { FC, useState } from 'react';

import Button from '@/components/Button/Button';
import ShareSVG from '@/components/SVGs/ShareSVG';

import ChevronSVG from '../../../../../components/SVGs/ChevronSVG';
import styles from './Robot.module.scss';

interface RobotParameter {
  id: number;
  name: string;
  value: number;
  unit: string;
}

interface Robot {
  id: number;
  name: string;
  indicator: 'working' | 'complete' | 'waiting';
  time: string;
  status: 'Выполнено' | 'Перемещение...' | 'Ожидание';
  parameters: RobotParameter[];
  watchable: boolean;
}

const robotList: Robot[] = [
  {
    id: 1,
    name: 'КМУ-1',
    indicator: 'working',
    time: '3 сек',
    status: 'Выполнено',
    parameters: [{ id: 1, name: 'Мощность', value: 12.54, unit: 'кВт' }],
    watchable: true,
  },
  {
    id: 2,
    name: 'Лента подачи',
    indicator: 'working',
    time: '3 сек',
    status: 'Перемещение...',
    parameters: [{ id: 2, name: 'Мощность', value: 12.54, unit: 'кВт' }],
    watchable: false,
  },
  {
    id: 3,
    name: 'КМУ-2',
    indicator: 'complete',
    time: '3 сек',
    status: 'Выполнено',
    parameters: [{ id: 3, name: 'Скорость', value: 11, unit: 'труб/с' }],
    watchable: false,
  },
  {
    id: 4,
    name: 'АКБ',
    indicator: 'waiting',
    time: '3 сек',
    status: 'Ожидание',
    parameters: [{ id: 4, name: 'Скорость', value: 11, unit: 'труб/с' }],
    watchable: false,
  },
  {
    id: 5,
    name: 'РМ',
    indicator: 'waiting',
    time: '3/4/5 сек',
    status: 'Ожидание',
    parameters: [{ id: 5, name: 'Скорость', value: 11, unit: 'труб/с' }],
    watchable: false,
  },
];

const Robot = () => {
  const [robot, setRobot] = useState<Robot | null>(null);

  return (
    <div
      className={styles.block}
      style={{
        border: '2px dashed var(--primary-color)',
      }}
    >
      <div className={styles.header}>
        {robot && (
          <>
            <Button
              onClick={() => {
                setRobot(null);
              }}
            >
              <ChevronSVG />
            </Button>
            <div style={{ display: 'flex', gap: 5 }}>
              <a
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                  setRobot(null);
                }}
              >
                Робот
              </a>
              {''}/{''}
              <span
                style={{
                  color: 'var(--primary-color)',
                }}
              >
                {robot.name}
              </span>
            </div>
          </>
        )}
        {!robot && (
          <h2>
            Робот <ShareSVG />
          </h2>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.table}>
          <div className={styles.table_row}>
            <div className={styles.table_column}>Ø Текущая труба</div>
            <div className={styles.table_column}>1 000 кг</div>
          </div>

          <div className={styles.table_row}>
            <div className={styles.table_column}>Общее время операции</div>
            <div className={styles.table_column}>24 сек</div>
          </div>
        </div>

        {robot && (
          <>
            <RobotRow robot={robot} setRobot={setRobot} />
            {robot.parameters && (
              <div className={styles.table}>
                {robot.parameters.map((param) => (
                  <div className={styles.table_row} key={param.id}>
                    <div className={styles.table_column}>{param.name}</div>
                    <div className={styles.table_column}>
                      {param.value} {param.unit}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {robot.watchable && (
              <Button variant="primary" outlined>
                Наблюдать
              </Button>
            )}
          </>
        )}

        {!robot &&
          robotList.map((robot) => {
            return (
              <RobotRow robot={robot} setRobot={setRobot} key={robot.id} />
            );
          })}
      </div>
    </div>
  );
};

export default Robot;

const RobotRow: FC<{
  robot: Robot;
  setRobot: (robot: Robot) => void;
}> = ({ robot, setRobot }) => {
  let indicator = '';

  if (robot.indicator === 'complete') {
    indicator = styles.complete;
  } else if (robot.indicator === 'waiting') {
    indicator = styles.waiting;
  } else if (robot.indicator === 'working') {
    indicator = styles.working;
  }

  return (
    <div className={styles.robot_content} key={robot.id}>
      <a
        href="/#"
        className={styles.robot_name}
        onClick={(e) => {
          e.preventDefault();
          setRobot(robot);
        }}
      >
        {robot.name}
      </a>

      <div className={styles.robot_time}>
        <div className={`${styles.robot_indicator} ${indicator}`}></div>
        {robot.time}
      </div>

      <div className={styles.robot_status}>{robot.status}</div>
    </div>
  );
};

import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Button from '@/components/Button/Button';
import ShareSVG from '@/components/SVGs/ShareSVG';

import ChevronSVG from '../../../../../components/SVGs/ChevronSVG';
import styles from './Robot.module.scss';

interface Robot {
  id: number;
  name: string;
  indicator: string;
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
    parameters: [{ id: 3, name: 'Скорость', value: 1, unit: 'труб/с' }],
    watchable: false,
  },
  {
    id: 4,
    name: 'АКБ',
    indicator: 'waiting',
    time: '3 сек',
    status: 'Ожидание',
    parameters: [{ id: 4, name: 'Скорость', value: 1, unit: 'труб/с' }],
    watchable: false,
  },
  {
    id: 5,
    name: 'РМ',
    indicator: 'waiting',
    time: '3/4/5 сек',
    status: 'Ожидание',
    parameters: [{ id: 5, name: 'Скорость', value: 1, unit: 'труб/с' }],
    watchable: false,
  },
];

interface RobotParameter {
  id: number;
  name: string;
  value: number;
  unit: string;
}

const Robot = () => {
  const [robot, setRobot] = useState<Robot | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const robotId = searchParams.get('robot_id');

  useEffect(() => {
    if (robotId) {
      setRobot(() => {
        const robot = robotList.filter(
          (robot) => robot.id === Number(robotId),
        )[0];

        if (!robot) {
          searchParams.delete('robot_id');
          setSearchParams(searchParams);
        }

        return robot;
      });
    }
  }, [robotId]);

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
                searchParams.delete('robot_id');
                setSearchParams(searchParams);
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
                  searchParams.delete('robot_id');
                  setSearchParams(searchParams);
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
          <h2 className="link">
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
            <RobotRow
              robot={robot}
              callback={() => {
                setRobot(null);
                searchParams.set('robot_id', robot.id.toString());
                setSearchParams(searchParams);
              }}
            />
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
              <RobotRow
                link
                robot={robot}
                callback={() => {
                  setRobot(null);
                  searchParams.set('robot_id', robot.id.toString());
                  setSearchParams(searchParams);
                }}
                key={robot.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Robot;

const RobotRow: FC<{
  link?: boolean;
  robot: Robot;
  callback: () => void;
}> = ({ link, robot, callback }) => {
  return (
    <div className={styles.robot_content} key={robot.id}>
      {link && (
        <a
          href="/#"
          className={styles.robot_name}
          onClick={(e) => {
            e.preventDefault();
            callback();
          }}
        >
          {robot.name}
        </a>
      )}

      {!link && (
        <span className={styles['robot_name--no-link']}>{robot.name}</span>
      )}

      <div className={styles.robot_time}>
        <div
          className={`${styles.robot_indicator} ${styles[robot.indicator]}`}
        ></div>
        {robot.time}
      </div>

      <div className={styles.robot_status}>{robot.status}</div>
    </div>
  );
};

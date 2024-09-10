import './Robot.scss';

import { FC } from 'react';

import ShareSVG from '@/components/SVGs/ShareSVG';

interface RobotProps {}

const robotList: {
  name: string;
  indicator: 'working' | 'complete' | 'waiting';
  time: string;
  status: 'Выполнено' | 'Перемещение...' | 'Ожидание';
}[] = [
  {
    name: 'КМУ-1',
    indicator: 'working',
    time: '3 сек',
    status: 'Выполнено',
  },
  {
    name: 'Лента подачи',
    indicator: 'working',
    time: '3 сек',
    status: 'Перемещение...',
  },
  {
    name: 'КМУ-2',
    indicator: 'complete',
    time: '3 сек',
    status: 'Выполнено',
  },
  {
    name: 'АКБ',
    indicator: 'waiting',
    time: '3 сек',
    status: 'Ожидание',
  },
  {
    name: 'РМ',
    indicator: 'waiting',
    time: '3/4/5 сек',
    status: 'Ожидание',
  },
];

const Robot: FC<RobotProps> = () => {
  return (
    <div
      className="robot__block"
      style={{
        border: '2px dashed var(--primary-color)',
      }}
    >
      <div className="robot__block__header">
        <h2 className="link">
          Робот <ShareSVG />
        </h2>
      </div>

      <div className="robot__block__content">
        <div className="robot__block__content__table">
          <div className="robot__block__content__table__row">
            <div className="robot__block__content__table__column">
              Ø Текущая труба
            </div>

            <div className="robot__block__content__table__column">1 000 кг</div>
          </div>

          <div
            className="robot__block__content__table__row"
            style={{
              borderBottom: '1px solid var(--background-color)',
            }}
          >
            <div className="robot__block__content__table__column">
              Общее время операции
            </div>

            <div className="robot__block__content__table__column">24 сек</div>
          </div>
        </div>

        {robotList.map((robot, index) => (
          <div className="robot__block__content__robot" key={index}>
            <div className="robot__block__content__robot-name">
              {robot.name}
            </div>
            <div className="robot__block__content__robot-time">
              <div
                className={`robot__block__content__robot-indicator ${robot.indicator}`}
              ></div>
              {robot.time}
            </div>
            <div className="robot__block__content__robot-status">
              {robot.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Robot;

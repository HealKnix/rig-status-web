import './ObjectRobot.scss';

import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import RobotArm from '@/assets/mock-images/robot_arm.png';
import Button from '@/components/Button/Button';
import Slider from '@/components/Slider/Slider';
import Switch from '@/components/Switch/Switch';
import { useObjectIdStore } from '@/store/useObjectIdStore';

interface ObjectRobotProps {}

const ObjectRobot: FC<ObjectRobotProps> = () => {
  const { id } = useParams();
  const objectIdStore = useObjectIdStore();

  const [sliderValue, setSliderValue] = useState(0.38);

  useEffect(() => {
    objectIdStore.setId(Number(id));

    return () => {
      objectIdStore.setId(null);
    };
  }, [id]);

  return (
    <div className="object-robot__wrapper">
      <div className="object-robot__row">
        <span>Командная панель</span>
        <Switch
          style={
            { '--checked-color': 'var(--primary-color)' } as React.CSSProperties
          }
        />
      </div>

      <div className="object-robot__grid">
        <div className="object-robot__block">
          <div className="object-robot__block__title">
            <h2>Роботизированный манипулятор</h2>
          </div>

          <div className="object-robot__block__content">
            <img src={RobotArm} alt="" width={207} height={184} />

            <div className="object-robot__block__content__table">
              <div className="object-robot__block__content__table__row">
                <div className="object-robot__block__content__table__column">
                  Износ
                </div>

                <div
                  className="object-robot__block__content__table__column"
                  style={{
                    color: 'var(--error-color)',
                  }}
                >
                  90%
                </div>
              </div>

              <div className="object-robot__block__content__table__row">
                <div className="object-robot__block__content__table__column">
                  Погрешность
                </div>

                <div
                  className="object-robot__block__content__table__column"
                  style={{
                    color: 'var(--error-color)',
                  }}
                >
                  0.1%
                </div>
              </div>

              <div className="object-robot__block__content__table__row">
                <Slider
                  title="Скорость"
                  value={sliderValue}
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={(e) => {
                    setSliderValue(e.currentTarget.valueAsNumber);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="object-robot__btns">
            <Button outlined>Диагностика</Button>
            <Button variant="green" outlined>
              Наблюдать
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectRobot;

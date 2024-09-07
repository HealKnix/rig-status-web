import './ObjectWorkplace.scss';

import { FC, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

import SpinningDrill from '@/assets/spinning_drill.webm';
import Speedometer from '@/components/ECharts/Speedometer';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import SensorDataWebSocket from '@/components/SensorDataWebSocket/SensorDataWebSocket';
import DrillSVG from '@/components/SVGs/DrillSVG';
import LloSVG from '@/components/SVGs/LloSVG';
import ShareSVG from '@/components/SVGs/ShareSVG';
import Switch from '@/components/Switch/Switch';
import { DrillingStatus } from '@/models/DrillingStatus';
import { Rig } from '@/models/Rig';
import { useObjectIdStore } from '@/store/useObjectIdStore';

interface ObjectWorkplaceProps {}

const ObjectWorkplace: FC<ObjectWorkplaceProps> = () => {
  const { id } = useParams();
  const objectIdStore = useObjectIdStore();

  const { rig } = useOutletContext<{ rig: Rig }>();

  useEffect(() => {
    objectIdStore.setId(Number(id));

    return () => {
      objectIdStore.setId(null);
    };
  }, [id]);

  return (
    <div className="object-workplace__wrapper">
      <div
        className="object-workplace__block"
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          border: '2px dashed var(--primary-color)',
        }}
      >
        <h2>Текущая глубина</h2>
        <span
          style={{
            textAlign: 'center',
          }}
        >
          <h2 style={{ color: 'var(--primary-color)' }}>
            {rig?.bottom_hole_drilling} м
          </h2>
          <video
            src={SpinningDrill}
            style={{
              objectFit: 'cover',
            }}
            width={100}
            height={100}
            autoPlay
            muted
            loop
          ></video>
          <h4>
            осталось{' '}
            {Number(rig?.well_depth) - Number(rig?.bottom_hole_drilling)} м
          </h4>
        </span>
        <h2>Горная порода</h2>
        <h2 style={{ color: 'var(--primary-color)' }}>Песчаник</h2>
        <h2>Текущий процесс</h2>
        <h2 style={{ color: 'var(--primary-color)' }}>
          {DrillingStatus[rig?.drilling_status_id ?? 0]}
        </h2>
      </div>

      <div className="object-workplace__block">
        <div className="object-workplace__block__header">
          <h2 className="link">
            Лебёдка <ShareSVG />
          </h2>
          <Switch />
        </div>

        <div className="object-workplace__block__content">
          <div className="object-workplace__block__content__table">
            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Вес на крюке
              </div>

              <div className="object-workplace__block__content__table__column">
                <SensorDataWebSocket sensor_id={1} /> т
              </div>
            </div>

            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Нагрузка на долото
              </div>

              <div className="object-workplace__block__content__table__column">
                <SensorDataWebSocket sensor_id={2} /> кгс
              </div>
            </div>

            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Положение крюка
              </div>

              <div className="object-workplace__block__content__table__column">
                <SensorDataWebSocket sensor_id={3} /> м
              </div>
            </div>

            <div className="object-workplace__block__content__table__row--with-graphs">
              <div className="object-workplace__block__content__table__column">
                <div className="table__column__statistic-name">
                  <DrillSVG />
                  Скорость бурения
                </div>
                <div className="table__column__statistic-name">
                  <LloSVG />
                  Скорость СПО
                </div>
              </div>

              <div className="object-workplace__block__content__table__column">
                <Speedometer
                  color="#3A7CFF"
                  min={0}
                  max={100}
                  value={10}
                  size={96}
                />
                <Speedometer
                  color="#FF7C3A"
                  min={0}
                  max={100}
                  value={10}
                  size={96}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="object-workplace__block">
        <div className="object-workplace__block__header--pumps">
          <div>
            <Switch />
            <h2>БН1</h2>
          </div>
          <h2 className="link">
            Насосы <ShareSVG />
          </h2>
          <div>
            <h2>БН2</h2>
            <Switch />
          </div>
        </div>

        <div className="object-workplace__block__parameters">
          <span
            style={{
              color: 'var(--primary-color)',
            }}
          >
            Параметры
          </span>
        </div>

        <div className="object-workplace__block__parameter">
          <div className="parameter_left">
            <SensorDataWebSocket sensor_id={6} /> кВт
          </div>

          <span className="parameter_name">Мощность</span>

          <div className="parameter_right">
            <SensorDataWebSocket sensor_id={6} /> кВт
          </div>
        </div>

        <div className="object-workplace__block__parameter">
          <div className="parameter_left">
            <SensorDataWebSocket sensor_id={7} /> ход/мин
          </div>

          <span className="parameter_name">Ходы насоса</span>

          <div className="parameter_right">
            <SensorDataWebSocket sensor_id={7} /> ход/мин
          </div>
        </div>

        <div className="object-workplace__block__parameter">
          <div className="parameter_left">
            <SensorDataWebSocket sensor_id={8} /> л/с
          </div>

          <span className="parameter_name">Расход</span>

          <div className="parameter_right">
            <SensorDataWebSocket sensor_id={8} /> л/с
          </div>
        </div>

        <div
          className="object-workplace__block__content"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          <div
            className="object-workplace__block__content__row"
            style={{
              display: 'grid',
              gap: '10px',
              gridTemplateColumns: '1fr 1fr 100px',
            }}
          >
            <span>Расход на входе</span>
            <ProgressBar color="var(--primary-color)" value={40} max={100} />
            <span
              style={{
                textAlign: 'right',
                fontWeight: '500',
              }}
            >
              <SensorDataWebSocket sensor_id={9} /> л/с
            </span>
          </div>

          <div
            className="object-workplace__block__content__row"
            style={{
              display: 'grid',
              gap: '10px',
              gridTemplateColumns: '1fr 1fr 100px',
            }}
          >
            <span>Поток на выходе</span>
            <ProgressBar color="var(--primary-color)" value={20} max={100} />
            <span
              style={{
                textAlign: 'right',
                fontWeight: '500',
              }}
            >
              <SensorDataWebSocket sensor_id={10} /> л/с
            </span>
          </div>

          <div
            className="object-workplace__block__content__row"
            style={{
              display: 'grid',
              gap: '10px',
              gridTemplateColumns: '1fr 1fr 100px',
            }}
          >
            <span>Давление манифольда</span>
            <ProgressBar color="var(--primary-color)" value={55} max={100} />
            <span
              style={{
                textAlign: 'right',
                fontWeight: '500',
              }}
            >
              <SensorDataWebSocket sensor_id={11} /> кПа
            </span>
          </div>

          <div
            className="object-workplace__block__content__row"
            style={{
              display: 'grid',
              gap: '10px',
              gridTemplateColumns: '1fr 1fr 100px',
            }}
          >
            <span>Перепад давления</span>
            <ProgressBar color="var(--primary-color)" value={35} max={100} />
            <span
              style={{
                textAlign: 'right',
                fontWeight: '500',
              }}
            >
              <SensorDataWebSocket sensor_id={12} /> кПа
            </span>
          </div>
        </div>
      </div>

      <div
        className="object-workplace__block"
        style={{
          border: '1px solid var(--primary-color)',
        }}
      >
        <div className="object-workplace__block__header">
          <h2 className="link">
            ВЗД <ShareSVG />
          </h2>
        </div>

        <div className="object-workplace__block__content">
          <div className="object-workplace__block__content__table">
            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Осевая нагрузка
              </div>

              <div className="object-workplace__block__content__table__column">
                <SensorDataWebSocket sensor_id={20} /> кН
              </div>
            </div>

            <div className="object-workplace__block__content__table__row--with-graph">
              <div className="object-workplace__block__content__table__column">
                Частота вращения вала
              </div>

              <div className="object-workplace__block__content__table__column">
                <Speedometer
                  color="#3A7CFF"
                  min={0}
                  max={100}
                  value={10}
                  size={96}
                />
              </div>
            </div>

            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Момент силы
              </div>

              <div className="object-workplace__block__content__table__column">
                <SensorDataWebSocket sensor_id={22} /> кН·м
              </div>
            </div>

            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Мощность
              </div>

              <div className="object-workplace__block__content__table__column">
                <SensorDataWebSocket sensor_id={23} /> кВт
              </div>
            </div>

            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Температура
              </div>

              <div className="object-workplace__block__content__table__column">
                <SensorDataWebSocket sensor_id={24} />
                °C
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="object-workplace__block">
        <div className="object-workplace__block__header">
          <h2 className="link">
            Система БР <ShareSVG />
          </h2>
          <Switch />
        </div>

        <div className="object-workplace__block__content">
          <div className="object-workplace__block__content__table">
            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Плотность
              </div>

              <div className="object-workplace__block__content__table__column">
                <SensorDataWebSocket sensor_id={25} /> кг/м³
              </div>
            </div>

            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Температура
              </div>

              <div className="object-workplace__block__content__table__column">
                <SensorDataWebSocket sensor_id={26} /> °C
              </div>
            </div>

            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Сероводород
              </div>

              <div className="object-workplace__block__content__table__column">
                <SensorDataWebSocket sensor_id={27} /> мг/м³
              </div>
            </div>

            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Загазованность
              </div>

              <div className="object-workplace__block__content__table__column">
                <SensorDataWebSocket sensor_id={28} /> %
              </div>
            </div>

            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Объём в ёмкостях
              </div>

              <div className="object-workplace__block__content__table__column">
                <SensorDataWebSocket sensor_id={29} /> м³/сек
              </div>
            </div>

            <div className="object-workplace__block__content__table__row--with-graph">
              <div className="object-workplace__block__content__table__column">
                Водоотдача
              </div>

              <div className="object-workplace__block__content__table__column">
                <Speedometer
                  color="#3A7CFF"
                  size={96}
                  min={0}
                  max={100}
                  value={10}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="object-workplace__block">
        <div className="object-workplace__block__header">
          <h2 className="link">
            АПД <ShareSVG />
          </h2>
          <Switch />
        </div>

        <div className="object-workplace__block__content">
          <div className="object-workplace__block__content__table">
            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Статус
              </div>

              <div className="object-workplace__block__content__table__column">
                Активный?
              </div>
            </div>

            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Статус работы ОРБ
              </div>

              <div className="object-workplace__block__content__table__column">
                Активный?
              </div>
            </div>

            <div
              className="object-workplace__block__content__table__row--with-graph"
              style={{
                paddingBottom: 10,
              }}
            >
              <div className="object-workplace__block__content__table__column">
                <div>
                  Давление в{' '}
                  <span
                    style={{
                      fontWeight: 500,
                    }}
                  >
                    левом
                  </span>{' '}
                  рабочем контуре
                </div>
                <span
                  style={{
                    fontWeight: 500,
                  }}
                >
                  <SensorDataWebSocket sensor_id={33} /> МПа
                </span>
                <ProgressBar
                  color="var(--primary-color)"
                  value={40}
                  max={100}
                />
              </div>
              <div className="object-workplace__block__content__table__column">
                <div>
                  Давление в{' '}
                  <span
                    style={{
                      fontWeight: 500,
                    }}
                  >
                    правом
                  </span>{' '}
                  рабочем контуре
                </div>
                <span
                  style={{
                    fontWeight: 500,
                  }}
                >
                  <SensorDataWebSocket sensor_id={34} /> МПа
                </span>
                <div
                  style={{
                    rotate: '180deg',
                  }}
                >
                  <ProgressBar
                    color="var(--primary-color)"
                    value={20}
                    max={100}
                  />
                </div>
              </div>
            </div>

            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Давление в стояночном тормозе
              </div>

              <div className="object-workplace__block__content__table__column">
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 100px',
                    gridAutoFlow: 'column',
                  }}
                >
                  <ProgressBar
                    color="var(--thirdly-color)"
                    value={40}
                    max={100}
                  />
                  <span>
                    <SensorDataWebSocket sensor_id={35} /> МПа
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="object-workplace__block">
        <div className="object-workplace__block__header">
          <h2 className="link">
            Дефектоскоп <ShareSVG />
          </h2>
          <Switch />
        </div>

        <div className="object-workplace__block__content">
          <div className="object-workplace__block__content__table">
            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Время работы
              </div>

              <div className="object-workplace__block__content__table__column">
                1 ч / 5 ч
              </div>
            </div>

            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Толщина тела трубы
              </div>

              <div className="object-workplace__block__content__table__column">
                <SensorDataWebSocket sensor_id={37} /> мм
              </div>
            </div>

            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Дефекты
              </div>

              <div className="object-workplace__block__content__table__column">
                Есть
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="object-workplace__block">
        <div className="object-workplace__block__header">
          <h2 className="link">
            ВСП <ShareSVG />
          </h2>
          <Switch />
        </div>

        <div className="object-workplace__block__content">
          <div className="object-workplace__block__content__table">
            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Момент ключа
              </div>

              <div className="object-workplace__block__content__table__column">
                <SensorDataWebSocket sensor_id={39} /> кН·м
              </div>
            </div>

            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Момент ГК
              </div>

              <div className="object-workplace__block__content__table__column">
                <SensorDataWebSocket sensor_id={40} /> кН·м
              </div>
            </div>

            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Частота вращения
              </div>

              <div className="object-workplace__block__content__table__column">
                <SensorDataWebSocket sensor_id={41} /> об/мин
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectWorkplace;

import './ObjectWorkplace.scss';

import EChartsReact from 'echarts-for-react';
import { FC, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

import ProgressBar from '@/components/ProgressBar/ProgressBar';
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

  const options1: echarts.EChartsOption = {
    series: [
      {
        type: 'gauge',
        itemStyle: {
          color: '#3a7cff',
        },
        radius: 48,
        progress: {
          show: true,
          width: 8,
        },
        axisLine: {
          lineStyle: {
            width: 8,
          },
        },
        pointer: {
          show: true,
          width: 2,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 2,
          itemStyle: {
            borderColor: '#3a7cff',
            borderWidth: 4,
          },
        },
        title: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          fontSize: 16,
          lineHeight: 20,
          fontFamily: 'Geometria',
          offsetCenter: [0, 30],
          fontWeight: 'bolder',
          formatter: '{value}\nм³/ч',
          color: '#1b2539',
        },
        min: 0,
        max: 100,
        data: [
          {
            value: 10,
          },
        ],
      },
    ],
  };

  const options2: echarts.EChartsOption = {
    series: [
      {
        type: 'gauge',
        itemStyle: {
          color: '#ff7c3a',
        },
        radius: 48,
        progress: {
          show: true,
          width: 8,
        },
        axisLine: {
          lineStyle: {
            width: 8,
          },
        },
        pointer: {
          show: true,
          width: 2,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 2,
          itemStyle: {
            borderColor: '#ff7c3a',
            borderWidth: 4,
          },
        },
        title: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          fontSize: 16,
          lineHeight: 20,
          fontFamily: 'Geometria',
          offsetCenter: [0, 30],
          fontWeight: 'bolder',
          formatter: '{value}\nм³/ч',
          color: '#1b2539',
        },
        min: 0,
        max: 100,
        data: [
          {
            value: 10,
          },
        ],
      },
    ],
  };

  const options3: echarts.EChartsOption = {
    series: [
      {
        type: 'gauge',
        itemStyle: {
          color: '#3a7cff',
        },
        radius: 48,
        progress: {
          show: true,
          width: 8,
        },
        axisLine: {
          lineStyle: {
            width: 8,
          },
        },
        pointer: {
          show: true,
          width: 2,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 2,
          itemStyle: {
            borderColor: '#3a7cff',
            borderWidth: 4,
          },
        },
        title: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          fontSize: 16,
          lineHeight: 20,
          fontFamily: 'Geometria',
          offsetCenter: [0, 30],
          fontWeight: 'bolder',
          formatter: '{value}\nоб/мин',
          color: '#1b2539',
        },
        min: 0,
        max: 200,
        data: [
          {
            value: 129,
          },
        ],
      },
    ],
  };

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
        <div className="object-workplace__block__title">
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
                10 кг
              </div>
            </div>

            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Нагрузка на долото
              </div>

              <div className="object-workplace__block__content__table__column">
                1110 кг
              </div>
            </div>

            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Положение крюка
              </div>

              <div className="object-workplace__block__content__table__column">
                10 кг
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
                <EChartsReact
                  option={options1}
                  style={{
                    width: '96px',
                    height: '96px',
                  }}
                />
                <EChartsReact
                  option={options2}
                  style={{
                    width: '96px',
                    height: '96px',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="object-workplace__block"
        style={{
          gridColumn: 'auto',
        }}
      >
        <div
          className="object-workplace__block__title"
          style={{
            display: 'grid',
            gridAutoFlow: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Switch />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <h2>БН1</h2>
            <br />
            <span>10 ход/мин</span>
            <span>10 кг</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <h2 className="link">
              Насосы <ShareSVG />
            </h2>
            <span
              style={{
                color: 'var(--primary-color)',
              }}
            >
              Параметры
            </span>
            <span
              style={{
                fontWeight: '500',
              }}
            >
              Ходы насоса
            </span>
            <span
              style={{
                fontWeight: '500',
              }}
            >
              Расход
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <h2>БН2</h2>
            <br />
            <span>0 ход/мин</span>
            <span>10 кг</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Switch />
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
              10 кг
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
              10 кг
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
              10 кг
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
              10 м³/ч
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
        <div className="object-workplace__block__title">
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
                100 кН
              </div>
            </div>

            <div className="object-workplace__block__content__table__row--with-graph">
              <div className="object-workplace__block__content__table__column">
                Частота вращения вала
              </div>

              <div className="object-workplace__block__content__table__column">
                <EChartsReact
                  option={options3}
                  style={{
                    width: '96px',
                    height: '96px',
                  }}
                />
              </div>
            </div>

            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Момент силы
              </div>

              <div className="object-workplace__block__content__table__column">
                1 кН*м
              </div>
            </div>

            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Мощность
              </div>

              <div className="object-workplace__block__content__table__column">
                кВт
              </div>
            </div>

            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Температура
              </div>

              <div className="object-workplace__block__content__table__column">
                75°C
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="object-workplace__block">
        <div className="object-workplace__block__title">
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
                10 кг
              </div>
            </div>

            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Температура
              </div>

              <div className="object-workplace__block__content__table__column">
                1110 кг
              </div>
            </div>

            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Сероводород
              </div>

              <div className="object-workplace__block__content__table__column">
                10 кг
              </div>
            </div>

            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Загазованность
              </div>

              <div className="object-workplace__block__content__table__column">
                10 м³/ч
              </div>
            </div>

            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Объём в ёмкостях
              </div>

              <div className="object-workplace__block__content__table__column">
                10 м/сек
              </div>
            </div>

            <div className="object-workplace__block__content__table__row--with-graph">
              <div className="object-workplace__block__content__table__column">
                Водоотдача
              </div>

              <div className="object-workplace__block__content__table__column">
                <EChartsReact
                  option={options1}
                  style={{
                    width: '96px',
                    height: '96px',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="object-workplace__block">
        <div className="object-workplace__block__title">
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
                  40 кПа
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
                  20 кПа
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
                  <span>20 кПа</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="object-workplace__block">
        <div className="object-workplace__block__title">
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
                10 кг
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
        <div className="object-workplace__block__title">
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
                10 кг
              </div>
            </div>

            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Момент ГК
              </div>

              <div className="object-workplace__block__content__table__column">
                10 кг
              </div>
            </div>

            <div className="object-workplace__block__content__table__row">
              <div className="object-workplace__block__content__table__column">
                Частота вращения
              </div>

              <div className="object-workplace__block__content__table__column">
                10 кг
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectWorkplace;

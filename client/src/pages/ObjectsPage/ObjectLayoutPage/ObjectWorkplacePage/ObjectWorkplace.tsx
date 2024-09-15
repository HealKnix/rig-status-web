import './ObjectWorkplace.scss';

import { ArrowLeftToLine, ArrowRightToLine } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { api } from '@/api';
import Button from '@/components/Button/Button';
import DropdownMenu from '@/components/DropdownMenu/DropdownMenu';
import Speedometer from '@/components/ECharts/Speedometer';
import Input from '@/components/Input/Input';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import DrillSVG from '@/components/SVGs/DrillSVG';
import LloSVG from '@/components/SVGs/LloSVG';
import ShareSVG from '@/components/SVGs/ShareSVG';
import Switch from '@/components/Switch/Switch';
import { useSensorDataWebSocket } from '@/hooks/useSensorDataWebSocket';
import { Sensor } from '@/models/Sensor';
import { SensorOutputTypeId } from '@/models/SensorOutputType';
// import { Rig } from '@/models/Rig';
import { Subsystem } from '@/models/Subsystem';
import { useObjectIdStore } from '@/store/useObjectIdStore';
import { useToastStore } from '@/store/useToastStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import Robot from './Robot/Robot';

interface ObjectWorkplaceProps {}

const ObjectWorkplace: FC<ObjectWorkplaceProps> = () => {
  const { id } = useParams();
  const objectIdStore = useObjectIdStore();

  // const { rig } = useOutletContext<{ rig: Rig }>();

  const { data: sensorListQuery, isFetched: sensorListFetched } = useQuery({
    queryKey: ['sensors'],
    queryFn: () => api.get<Sensor>('sensors'),
    initialData: [],
  });

  const { data: subsystemListQuery } = useQuery({
    queryKey: ['subsystems'],
    queryFn: () => api.get<Subsystem>('subsystems'),
  });

  useEffect(() => {
    objectIdStore.setId(Number(id));

    return () => {
      objectIdStore.setId(null);
    };
  }, [id]);

  return (
    <div className="object-workplace__wrapper">
      <Robot />

      <div className="object-workplace__block">
        <div className="object-workplace__block__header">
          <h2 className="link">
            Лебёдка <ShareSVG />
          </h2>
          <Switch defaultChecked={subsystemListQuery?.[0].active} />
        </div>

        <div className="object-workplace__block__content">
          <div className="object-workplace__block__content__table">
            {sensorListFetched && <SensorRow sensor={sensorListQuery[0]} />}

            {sensorListFetched && <SensorRow sensor={sensorListQuery[1]} />}

            {sensorListFetched && <SensorRow sensor={sensorListQuery[2]} />}

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
                  value={useSensorDataWebSocket(4)}
                  unite="м/ч"
                  size={96}
                />
                <Speedometer
                  color="#FF7C3A"
                  min={0}
                  max={100}
                  value={useSensorDataWebSocket(5)}
                  unite="кгс"
                  size={96}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="object-workplace__block">
        <div className="object-workplace__block__header pumps">
          <div>
            <Switch defaultChecked={subsystemListQuery?.[1].active} />
            <h2>БН1</h2>
          </div>
          <h2 className="link">
            Насосы <ShareSVG />
          </h2>
          <div>
            <h2>БН2</h2>
            <Switch defaultChecked={subsystemListQuery?.[2].active} />
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
          <div className="parameter_left">{useSensorDataWebSocket(6)} кВт</div>

          <span className="parameter_name">Мощность</span>

          <div className="parameter_right">{useSensorDataWebSocket(6)} кВт</div>
        </div>

        <div className="object-workplace__block__parameter">
          <div className="parameter_left">
            {useSensorDataWebSocket(7)} ход/мин
          </div>

          <span className="parameter_name">Ходы насоса</span>

          <div className="parameter_right">
            {useSensorDataWebSocket(7)} ход/мин
          </div>
        </div>

        <div className="object-workplace__block__parameter">
          <div className="parameter_left">{useSensorDataWebSocket(8)} л/с</div>

          <span className="parameter_name">Расход</span>

          <div className="parameter_right">{useSensorDataWebSocket(8)} л/с</div>
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
            <ProgressBar
              color="var(--primary-color)"
              value={useSensorDataWebSocket(9)}
              max={300}
            />
            <span
              style={{
                textAlign: 'right',
                fontWeight: '500',
              }}
            >
              {useSensorDataWebSocket(9)} л/с
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
            <ProgressBar
              color="var(--primary-color)"
              value={useSensorDataWebSocket(10)}
              max={300}
            />
            <span
              style={{
                textAlign: 'right',
                fontWeight: '500',
              }}
            >
              {useSensorDataWebSocket(10)} л/с
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
            <ProgressBar
              color="var(--primary-color)"
              value={useSensorDataWebSocket(11)}
              max={100}
            />
            <span
              style={{
                textAlign: 'right',
                fontWeight: '500',
              }}
            >
              {useSensorDataWebSocket(11)} кПа
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
            <ProgressBar
              color="var(--primary-color)"
              value={useSensorDataWebSocket(12)}
              max={100}
            />
            <span
              style={{
                textAlign: 'right',
                fontWeight: '500',
              }}
            >
              {useSensorDataWebSocket(12)} кПа
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
            {sensorListFetched && <SensorRow sensor={sensorListQuery[19]} />}

            {sensorListFetched && <SensorRow sensor={sensorListQuery[20]} />}

            {sensorListFetched && <SensorRow sensor={sensorListQuery[21]} />}

            {sensorListFetched && <SensorRow sensor={sensorListQuery[22]} />}

            {sensorListFetched && <SensorRow sensor={sensorListQuery[23]} />}
          </div>
        </div>
      </div>

      <div className="object-workplace__block">
        <div className="object-workplace__block__header">
          <h2 className="link">
            Система БР <ShareSVG />
          </h2>
        </div>

        <div className="object-workplace__block__content">
          <div className="object-workplace__block__content__table">
            {sensorListFetched && <SensorRow sensor={sensorListQuery[24]} />}

            {sensorListFetched && <SensorRow sensor={sensorListQuery[25]} />}

            {sensorListFetched && <SensorRow sensor={sensorListQuery[26]} />}

            {sensorListFetched && <SensorRow sensor={sensorListQuery[27]} />}

            {sensorListFetched && <SensorRow sensor={sensorListQuery[28]} />}

            {sensorListFetched && <SensorRow sensor={sensorListQuery[29]} />}
          </div>
        </div>
      </div>

      <div className="object-workplace__block">
        <div className="object-workplace__block__header">
          <h2 className="link">
            АПД <ShareSVG />
          </h2>
          <Switch defaultChecked={subsystemListQuery?.[5].active} />
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
                  {useSensorDataWebSocket(33)} МПа
                </span>
                <ProgressBar
                  color="var(--primary-color)"
                  value={useSensorDataWebSocket(33)}
                  max={150}
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
                  {useSensorDataWebSocket(34)} МПа
                </span>
                <div
                  style={{
                    rotate: '180deg',
                  }}
                >
                  <ProgressBar
                    color="var(--primary-color)"
                    value={useSensorDataWebSocket(34)}
                    max={150}
                  />
                </div>
              </div>
            </div>

            {sensorListFetched && <SensorRow sensor={sensorListQuery[34]} />}
          </div>
        </div>
      </div>

      <div className="object-workplace__block">
        <div className="object-workplace__block__header">
          <h2 className="link">
            Дефектоскоп <ShareSVG />
          </h2>
          <Switch defaultChecked={subsystemListQuery?.[6].active} />
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

            {sensorListFetched && <SensorRow sensor={sensorListQuery[36]} />}

            {sensorListFetched && <SensorRow sensor={sensorListQuery[37]} />}
          </div>
        </div>
      </div>

      <div className="object-workplace__block">
        <div className="object-workplace__block__header">
          <h2 className="link">
            ВСП <ShareSVG />
          </h2>
          <Switch defaultChecked={subsystemListQuery?.[7].active} />
        </div>

        <div className="object-workplace__block__content">
          <div className="object-workplace__block__content__table">
            {sensorListFetched && <SensorRow sensor={sensorListQuery[38]} />}

            {sensorListFetched && <SensorRow sensor={sensorListQuery[39]} />}

            {sensorListFetched && <SensorRow sensor={sensorListQuery[40]} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectWorkplace;

const SensorRow = ({ sensor }: { sensor: Sensor | null }) => {
  const toastStore = useToastStore();
  const sensorDataWebSocket = useSensorDataWebSocket(sensor?.id ?? -1);

  const [minValue, setMinValue] = useState<number | string>(
    sensor?.min_value ?? '',
  );
  const [maxValue, setMaxValue] = useState<number | string>(
    sensor?.max_value ?? '',
  );

  const client = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['sensors', 'update'],
    mutationFn: () =>
      api.update<Partial<Sensor>>('sensors', sensor?.id ?? -1, {
        min_value: Number(minValue),
        max_value: Number(maxValue),
      }),
    onSuccess: () => {
      toastStore.addToast('success', 'Велична успешно назначена!');
      return client.invalidateQueries({
        queryKey: ['sensors'],
      });
    },
  });

  const { data: subsystemQuery } = useQuery({
    queryKey: ['subsystems', 'id', sensor?.subsystem_id],
    queryFn: () =>
      api.getById<Subsystem>('subsystems', sensor?.subsystem_id ?? -1),
    initialData: null,
  });

  const getWarningBound = () =>
    (Math.abs(1 - Number(Number(minValue) / sensorDataWebSocket)) <= 0.15 ||
      Math.abs(1 - Number(sensorDataWebSocket) / Number(maxValue)) <= 0.15) &&
    subsystemQuery?.active;

  const getAlertBound = () =>
    (sensorDataWebSocket <= Number(minValue) ||
      sensorDataWebSocket >= Number(maxValue)) &&
    subsystemQuery?.active;

  return (
    <div
      className={`object-workplace__block__content__table__row${sensor?.output_type_id === SensorOutputTypeId.SPEEDOMETER ? '--with-graph' : ''} ${getWarningBound() ? 'warning' : ''} ${getAlertBound() ? 'alert' : ''}`}
      style={
        sensor?.output_type_id === SensorOutputTypeId.PROGRESSBAR
          ? {
              display: 'grid',
              gap: '10px',
              gridTemplateColumns: '1fr 1fr 100px',
            }
          : {}
      }
    >
      <DropdownMenu
        target={
          <div className="object-workplace__block__content__table__column">
            {sensor?.name}
          </div>
        }
        placement="bottomLeft"
      >
        <DropdownMenu
          target={
            <Button variant="transparent">
              <ArrowLeftToLine strokeWidth={1.5} />
              Минимальное значение
            </Button>
          }
          placement="top"
        >
          <Input
            placeholder="Введите мин. порог"
            type="number"
            value={minValue}
            onInput={(e) => {
              setMinValue(e.currentTarget.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                mutate();
              }
            }}
            movable_placeholder
          />
        </DropdownMenu>
        <DropdownMenu
          target={
            <Button variant="transparent">
              <ArrowRightToLine strokeWidth={1.5} />
              Максимальное значение
            </Button>
          }
          placement="bottom"
        >
          <Input
            placeholder="Введите макс. порог"
            type="number"
            value={maxValue}
            onInput={(e) => {
              setMaxValue(e.currentTarget.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                mutate();
              }
            }}
            movable_placeholder
          />
        </DropdownMenu>
      </DropdownMenu>

      {sensor?.output_type_id === SensorOutputTypeId.PROGRESSBAR && (
        <>
          <ProgressBar
            color="var(--primary-color)"
            value={sensorDataWebSocket}
            max={sensor.max_value}
          />
          <span
            style={{
              textAlign: 'right',
              fontWeight: '500',
            }}
          >
            {sensorDataWebSocket} {sensor.unit}
          </span>
        </>
      )}

      {sensor?.output_type_id !== SensorOutputTypeId.PROGRESSBAR && (
        <div className="object-workplace__block__content__table__column">
          {sensor?.output_type_id === SensorOutputTypeId.SPEEDOMETER && (
            <Speedometer
              color="#3A7CFF"
              textColor={
                getAlertBound()
                  ? '#ff4d55'
                  : getWarningBound()
                    ? '#ffb200'
                    : undefined
              }
              min={sensor.min_value}
              max={sensor.max_value}
              value={sensorDataWebSocket}
              unite={sensor.unit ?? ''}
              size={96}
            />
          )}
          {sensor?.output_type_id === SensorOutputTypeId.TEXT && (
            <>
              {sensorDataWebSocket} {sensor?.unit}
            </>
          )}
        </div>
      )}
    </div>
  );
};

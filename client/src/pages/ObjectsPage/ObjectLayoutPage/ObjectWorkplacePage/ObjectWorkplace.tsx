import './ObjectWorkplace.scss';

import { ArrowLeftToLine, ArrowRightToLine, SendHorizonal } from 'lucide-react';
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
import { Subsystem } from '@/models/Subsystem';
import { useAlertStore } from '@/store/useAlertStore';
import { useObjectIdStore } from '@/store/useObjectIdStore';
import { useToastStore } from '@/store/useToastStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import Robot from './Robot/Robot';

interface ObjectWorkplaceProps {}

const ObjectWorkplace: FC<ObjectWorkplaceProps> = () => {
  const { id } = useParams();
  const objectIdStore = useObjectIdStore();

  const getSensorData = useSensorDataWebSocket(id ?? -1);

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
          <SubsystemHeader subsystem_id={1} />
        </div>

        <div className="object-workplace__block__content">
          <div className="object-workplace__block__content__table">
            <SensorRow sensor_id={1} getSensorData={getSensorData} />
            <SensorRow sensor_id={2} getSensorData={getSensorData} />
            <SensorRow sensor_id={3} getSensorData={getSensorData} />

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
                  value={getSensorData(4) ?? 0}
                  unite="м/ч"
                  size={96}
                />
                <Speedometer
                  color="#FF7C3A"
                  min={0}
                  max={100}
                  value={getSensorData(5) ?? 0}
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
          <SubsystemHeader subsystem_id={2} placement="left" />
          <h2>Насосы</h2>
          <SubsystemHeader subsystem_id={3} />
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
          <div className="parameter_left">{getSensorData(6)} кВт</div>

          <span className="parameter_name">Мощность</span>

          <div className="parameter_right">{getSensorData(6)} кВт</div>
        </div>

        <div className="object-workplace__block__parameter">
          <div className="parameter_left">{getSensorData(7)} ход/мин</div>

          <span className="parameter_name">Ходы насоса</span>

          <div className="parameter_right">{getSensorData(7)} ход/мин</div>
        </div>

        <div className="object-workplace__block__parameter">
          <div className="parameter_left">{getSensorData(8)} л/с</div>

          <span className="parameter_name">Расход</span>

          <div className="parameter_right">{getSensorData(8)} л/с</div>
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
              value={getSensorData(9) ?? 0}
              max={300}
            />
            <span
              style={{
                textAlign: 'right',
                fontWeight: '500',
              }}
            >
              {getSensorData(9) ?? 0} л/с
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
              value={getSensorData(10) ?? 0}
              max={300}
            />
            <span
              style={{
                textAlign: 'right',
                fontWeight: '500',
              }}
            >
              {getSensorData(10) ?? 0} л/с
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
              value={getSensorData(11) ?? 0}
              max={100}
            />
            <span
              style={{
                textAlign: 'right',
                fontWeight: '500',
              }}
            >
              {getSensorData(11) ?? 0} кПа
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
              value={getSensorData(12) ?? 0}
              max={100}
            />
            <span
              style={{
                textAlign: 'right',
                fontWeight: '500',
              }}
            >
              {getSensorData(12) ?? 0} кПа
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
          <SubsystemHeader subsystem_id={4} />
        </div>

        <div className="object-workplace__block__content">
          <div className="object-workplace__block__content__table">
            <SensorRow sensor_id={20} getSensorData={getSensorData} />
            <SensorRow sensor_id={21} getSensorData={getSensorData} />
            <SensorRow sensor_id={22} getSensorData={getSensorData} />
            <SensorRow sensor_id={23} getSensorData={getSensorData} />
            <SensorRow sensor_id={24} getSensorData={getSensorData} />
          </div>
        </div>
      </div>

      <div className="object-workplace__block">
        <div className="object-workplace__block__header">
          <SubsystemHeader subsystem_id={5} />
        </div>

        <div className="object-workplace__block__content">
          <div className="object-workplace__block__content__table">
            <SensorRow sensor_id={25} getSensorData={getSensorData} />
            <SensorRow sensor_id={26} getSensorData={getSensorData} />
            <SensorRow sensor_id={27} getSensorData={getSensorData} />
            <SensorRow sensor_id={28} getSensorData={getSensorData} />
            <SensorRow sensor_id={29} getSensorData={getSensorData} />
            <SensorRow sensor_id={30} getSensorData={getSensorData} />
          </div>
        </div>
      </div>

      <div className="object-workplace__block">
        <div className="object-workplace__block__header">
          <SubsystemHeader subsystem_id={6} />
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
                  {getSensorData(33)} МПа
                </span>
                <ProgressBar
                  color="var(--primary-color)"
                  value={getSensorData(33) ?? 0}
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
                  {getSensorData(34)} МПа
                </span>
                <div
                  style={{
                    rotate: '180deg',
                  }}
                >
                  <ProgressBar
                    color="var(--primary-color)"
                    value={getSensorData(34) ?? 0}
                    max={150}
                  />
                </div>
              </div>
            </div>

            <SensorRow sensor_id={35} getSensorData={getSensorData} />
          </div>
        </div>
      </div>

      <div className="object-workplace__block">
        <div className="object-workplace__block__header">
          <SubsystemHeader subsystem_id={7} />
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

            <SensorRow sensor_id={37} getSensorData={getSensorData} />
            <SensorRow sensor_id={38} getSensorData={getSensorData} />
          </div>
        </div>
      </div>

      <div className="object-workplace__block">
        <div className="object-workplace__block__header">
          <SubsystemHeader subsystem_id={8} />
        </div>

        <div className="object-workplace__block__content">
          <div className="object-workplace__block__content__table">
            <SensorRow sensor_id={39} getSensorData={getSensorData} />
            <SensorRow sensor_id={40} getSensorData={getSensorData} />
            <SensorRow sensor_id={41} getSensorData={getSensorData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectWorkplace;

const SubsystemHeader = ({
  subsystem_id,
  placement = 'right',
}: {
  subsystem_id: number;
  placement?: 'left' | 'right';
}) => {
  const toastStore = useToastStore();
  const client = useQueryClient();

  const { data: subsystem, isSuccess } = useQuery({
    queryKey: ['subsystems', 'id', subsystem_id],
    queryFn: () => api.getById<Subsystem>('subsystems', subsystem_id ?? -1),
  });

  const { mutate } = useMutation({
    mutationKey: ['subsystems', 'update', 'id', subsystem_id],
    mutationFn: () =>
      api.update<Partial<Subsystem>>('subsystems', subsystem_id ?? -1, {
        active: !subsystem?.active,
      }),
    onSuccess: (data) => {
      toastStore.addToast(
        'success',
        `Подсистема "${data?.name}" ${data?.active ? 'включена' : 'отключена'}`,
      );
      return client.invalidateQueries({
        queryKey: ['subsystems', 'id', subsystem_id],
      });
    },
  });

  return (
    isSuccess &&
    ((placement == 'left' && (
      <div>
        <Switch defaultChecked={subsystem?.active} onChange={() => mutate()} />
        <h2 className="link">
          {subsystem?.name} <ShareSVG />
        </h2>
      </div>
    )) ||
      (placement == 'right' && (
        <div>
          <h2 className="link">
            {subsystem?.name} <ShareSVG />
          </h2>
          <Switch
            defaultChecked={subsystem?.active}
            onChange={() => mutate()}
          />
        </div>
      )))
  );
};

const SensorRow = ({
  sensor_id,
  getSensorData,
}: {
  sensor_id: number;
  getSensorData: (sensor_id: number) => number | undefined;
}) => {
  const toastStore = useToastStore();
  const alertStore = useAlertStore();
  const sensorDataWebsocket = getSensorData(sensor_id) ?? 0;
  const client = useQueryClient();

  const [warning, setWarning] = useState(false);
  const [alert, setAlert] = useState(false);

  const { data: sensor, isSuccess: sensorIsSuccess } = useQuery({
    queryKey: ['sensors', 'id', sensor_id],
    queryFn: () => api.getById<Sensor>('sensors', sensor_id),
  });

  const [minValue, setMinValue] = useState<number | string>(
    sensor?.min_value ?? '',
  );
  const [maxValue, setMaxValue] = useState<number | string>(
    sensor?.max_value ?? '',
  );

  const { mutate } = useMutation({
    mutationKey: ['sensors', 'update'],
    mutationFn: () =>
      api.update<Partial<Sensor>>('sensors', sensor_id, {
        min_value: Number(minValue),
        max_value: Number(maxValue),
      }),
    onSuccess: (data) => {
      toastStore.addToast('success', 'Велична успешно назначена!');
      setMinValue(data?.min_value ?? 0);
      setMaxValue(data?.max_value ?? Infinity);
      return client.invalidateQueries({
        queryKey: ['sensors'],
      });
    },
  });

  const { data: subsystem, isSuccess: subsystemIsSuccess } = useQuery({
    queryKey: ['subsystems', 'id', sensor?.subsystem_id],
    queryFn: () =>
      api.getById<Subsystem>('subsystems', sensor?.subsystem_id ?? -1),
  });

  useEffect(() => {
    setWarning(() => {
      if (
        (Math.abs(
          1 - Number(Number(sensor?.min_value) / sensorDataWebsocket),
        ) <= 0.15 ||
          Math.abs(
            1 - Number(sensorDataWebsocket) / Number(sensor?.max_value),
          ) <= 0.15) &&
        subsystem?.active &&
        sensorDataWebsocket
      )
        return true;

      return false;
    });
    setAlert(() => {
      if (
        (sensorDataWebsocket <= Number(sensor?.min_value) ||
          sensorDataWebsocket >= Number(sensor?.max_value)) &&
        subsystem?.active &&
        sensorDataWebsocket
      )
        return true;
      return false;
    });
  }, [sensorDataWebsocket, minValue, maxValue]);

  useEffect(() => {
    if (!sensorDataWebsocket || !warning) return;
    toastStore.addToast(
      'warning',
      `Параметр "${sensor?.name}" подходит к критическому значению!`,
    );
  }, [warning]);

  useEffect(() => {
    if (!sensorDataWebsocket || !alert) return;
    alertStore.openAlert(
      `Блок "${sensor?.name} (${subsystem?.name})": превышено допустимое критическое значение`,
    );
  }, [alert]);

  useEffect(() => {
    setMinValue(sensor?.min_value ?? 0);
    setMaxValue(sensor?.max_value ?? 0);
  }, [sensorIsSuccess, subsystemIsSuccess, sensor?.id]);

  return (
    sensorIsSuccess && (
      <div
        className={`object-workplace__block__content__table__row${sensor?.output_type_id === SensorOutputTypeId.SPEEDOMETER ? '--with-graph' : ''}`}
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
            style={{
              display: 'flex',
            }}
          >
            <Input
              placeholder="Введите мин. порог"
              type="number"
              value={minValue}
              min={0}
              onInput={(e) => {
                setMinValue(e.currentTarget.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  mutate();
                }
              }}
              movable_placeholder
              style={{
                flex: '1',
                maxWidth: '150px',
              }}
            />
            <Button outlined onClick={() => mutate()}>
              <SendHorizonal size={16} />
            </Button>
          </DropdownMenu>
          <DropdownMenu
            target={
              <Button variant="transparent">
                <ArrowRightToLine strokeWidth={1.5} />
                Максимальное значение
              </Button>
            }
            placement="bottomLeft"
            style={{
              display: 'flex',
            }}
          >
            <Input
              placeholder="Введите макс. порог"
              type="number"
              value={maxValue}
              min={0}
              onInput={(e) => {
                setMaxValue(e.currentTarget.value);
              }}
              movable_placeholder
              style={{
                flex: '1',
                maxWidth: '150px',
              }}
            />
            <Button outlined onClick={() => mutate()}>
              <SendHorizonal size={16} />
            </Button>
          </DropdownMenu>
        </DropdownMenu>

        {sensor?.output_type_id === SensorOutputTypeId.PROGRESSBAR && (
          <>
            <ProgressBar
              color="var(--primary-color)"
              value={sensorDataWebsocket}
              max={Number(maxValue)}
            />
            <span
              style={{
                textAlign: 'right',
                fontWeight: '500',
              }}
            >
              {sensorDataWebsocket} {sensor.unit}
            </span>
          </>
        )}

        {sensor?.output_type_id !== SensorOutputTypeId.PROGRESSBAR && (
          <div className="object-workplace__block__content__table__column">
            {sensor?.output_type_id === SensorOutputTypeId.SPEEDOMETER && (
              <Speedometer
                color="#3A7CFF"
                textColor={alert ? '#ff4d55' : warning ? '#ffb200' : undefined}
                min={Number(minValue)}
                max={Number(maxValue)}
                value={sensorDataWebsocket}
                unite={sensor.unit ?? ''}
                size={96}
              />
            )}
            {sensor?.output_type_id === SensorOutputTypeId.TEXT && (
              <span
                className={`${warning ? 'warning' : ''} ${alert ? 'alert' : ''}`}
              >
                {sensorDataWebsocket} {sensor?.unit}
              </span>
            )}
          </div>
        )}
      </div>
    )
  );
};

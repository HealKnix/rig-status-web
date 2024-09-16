import './Header.scss';

import { useEffect, useState } from 'react';

import { api } from '@/api';
import SatelliteSVG from '@/components/SVGs/SatelliteSVG';
import { DrillingStatus } from '@/models/DrillingStatus';
import { Rig } from '@/models/Rig';
import { useObjectIdStore } from '@/store/useObjectIdStore';
import { addLeadingZero } from '@/utils/addLeadingZero';
import { useQuery } from '@tanstack/react-query';

export default function Header() {
  const objectIdStore = useObjectIdStore();

  const { data: rigsDataQuery } = useQuery({
    queryKey: ['header', 'rigs', 'id', objectIdStore.id],
    queryFn: () => api.getById<Rig>('rigs', objectIdStore.id),
  });

  const [time, setTime] = useState<{
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
  }>({
    year: new Date().getFullYear().toString(),
    month: addLeadingZero(new Date().getMonth() + 1),
    day: addLeadingZero(new Date().getDate()),
    hour: addLeadingZero(new Date().getHours()),
    minute: addLeadingZero(new Date().getMinutes()),
  });

  useEffect(() => {
    const timeId = setInterval(() => {
      const time = new Date();

      setTime({
        year: time.getFullYear().toString(),
        month: addLeadingZero(time.getMonth() + 1),
        day: addLeadingZero(time.getDate()),
        hour: addLeadingZero(time.getHours()),
        minute: addLeadingZero(time.getMinutes()),
      });
    }, 1000);

    return () => {
      clearInterval(timeId);
    };
  }, []);

  return (
    <header>
      <div className="header__object-name">
        {objectIdStore.idIsNotNull() && (
          <>
            <SatelliteSVG
              connection_speed={rigsDataQuery?.connection_speed ?? 0}
            />
            <span>{rigsDataQuery?.name}</span>
          </>
        )}
      </div>
      {objectIdStore.idIsNotNull() && (
        <div className="header__well-pad">Кустовая площадка - 38</div>
      )}
      <div className="header__object-data">
        {objectIdStore.idIsNotNull() && (
          <>
            <div>
              <span className="object-data__latitude">
                Дата начала:{' '}
                <b>
                  {new Date(
                    rigsDataQuery?.start_date ?? '',
                  ).toLocaleDateString()}
                </b>
              </span>
              <span className="object-data__longitude">
                Дата конца:{' '}
                <b>
                  {new Date(
                    rigsDataQuery?.end_date_plan ?? '',
                  ).toLocaleDateString()}
                </b>
              </span>
            </div>
            <hr />
            <div>
              <span className="object-data__latitude">
                Тип скважины: <b>ГС</b>
              </span>
              <span className="object-data__longitude">
                № скважины: <b>XXX</b>
              </span>
            </div>
            <hr />
            <span className="object-data__status">
              Статус:{' '}
              <b
                style={{
                  color: 'var(--primary-color)',
                }}
              >
                {DrillingStatus[rigsDataQuery?.drilling_status_id ?? 0]}
              </b>
            </span>
            <hr />
            <div>
              <span className="object-data__latitude">
                В.Д. <b>{rigsDataQuery?.latitude}°</b>
              </span>
              <span className="object-data__longitude">
                С.Ш. <b>{rigsDataQuery?.longitude}°</b>
              </span>
            </div>
            <hr />
          </>
        )}
        <div>
          <span className="object-data__current-time">
            <b>
              {time?.hour}:{time?.minute}
            </b>
          </span>
          <span className="object-data__current-date">
            <b>
              {time?.day}.{time?.month}.{time?.year}
            </b>
          </span>
        </div>
      </div>
    </header>
  );
}

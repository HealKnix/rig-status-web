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

  const {
    data: rigData,
    refetch,
    isFetched,
  } = useQuery({
    queryKey: ['rig by id'],
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

  useEffect(() => {
    refetch();
  }, [objectIdStore.id, isFetched]);

  return (
    <header>
      <div className="header__object-name">
        {objectIdStore.idIsNotNull() && (
          <>
            <SatelliteSVG connection_speed={rigData?.connection_speed ?? 0} />
            <span>{rigData?.name}</span>
          </>
        )}
      </div>
      {objectIdStore.idIsNotNull() && (
        <div className="header__well-pad">
          Кустовая площадка - {rigData?.tech_status_id}
        </div>
      )}
      <div className="header__object-data">
        {objectIdStore.idIsNotNull() && (
          <span className="object-data__status">
            Статус: <b>{DrillingStatus[rigData?.drilling_status_id ?? 0]}</b>
          </span>
        )}
        <span className="object-data__current-time">
          Время:{' '}
          <b>
            {time?.hour}:{time?.minute}
          </b>
        </span>
        <span className="object-data__current-date">
          Дата:{' '}
          <b>
            {time?.day}.{time?.month}.{time?.year}
          </b>
        </span>
        {objectIdStore.idIsNotNull() && (
          <>
            <span className="object-data__longitude">
              С.Ш. <b>{rigData?.location.split('°')[0]}°</b>
            </span>
            <span className="object-data__latitude">
              В.Д. <b>{rigData?.location.split('°')[1]}°</b>
            </span>
          </>
        )}
      </div>
    </header>
  );
}

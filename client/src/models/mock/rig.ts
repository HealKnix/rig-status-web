import { Rig } from '../Rig';

export const rigList: Rig[] = [
  {
    id: 1,
    name: 'Объект_1',
    location: '59.02° 93.83°',
    connection_speed: 150,
    drillingProgressValue: 74,
    drillingProgressStatus: 'Работает',
    status: 'нормально',
  },
  {
    id: 2,
    name: 'Объект_2',
    location: '58.95° 95.72°',
    connection_speed: 43,
    drillingProgressValue: 74,
    drillingProgressStatus: 'Запуск...',
    status: 'удовлетворительно',
  },
  {
    id: 3,
    name: 'Объект_3',
    location: '58.64° 94.83°',
    connection_speed: 1,
    drillingProgressValue: 74,
    drillingProgressStatus: 'Авария',
    status: 'требуется ТО',
  },
  {
    id: 4,
    name: 'Объект_4',
    location: '58.64° 94.83°',
    connection_speed: 0,
    drillingProgressValue: 74,
    drillingProgressStatus: 'Отключено',
    status: 'не в сети',
  },
];

export enum DrillingStatusId {
  WORKING = 1,
  STARTING = 2,
  ABNORMAL = 3,
  OFFLINE = 4,
}

export const DrillingStatus: { [key in DrillingStatusId]: string } = {
  [DrillingStatusId.WORKING]: 'Работает',
  [DrillingStatusId.STARTING]: 'Запуск...',
  [DrillingStatusId.ABNORMAL]: 'Авария',
  [DrillingStatusId.OFFLINE]: 'Отключено',
};

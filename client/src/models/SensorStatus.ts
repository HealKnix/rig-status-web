export enum SensorStatusId {
  WORKING = 1,
  IDLING = 2,
}

export const SensorStatus: { [key in SensorStatusId]: string } = {
  [SensorStatusId.WORKING]: 'Работает',
  [SensorStatusId.IDLING]: 'Простаивает',
};

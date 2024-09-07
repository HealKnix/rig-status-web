export enum SensorOutputTypeId {
  TEXT = 1,
  SPEEDOMETER = 2,
  PROGRESSBAR = 3,
}

export const SensorOutputType: { [key in SensorOutputTypeId]: string } = {
  [SensorOutputTypeId.TEXT]: 'text',
  [SensorOutputTypeId.SPEEDOMETER]: 'speedometer',
  [SensorOutputTypeId.PROGRESSBAR]: 'progressbar',
};

export enum TechStatusId {
  NORMAL = 1,
  DEGRADED = 2,
  NEED_TO_OPEN_THE_VENT = 3,
  NOT_CONNECTED = 4,
}

export const TechStatus: { [key in TechStatusId]: string } = {
  [TechStatusId.NORMAL]: 'Нормально',
  [TechStatusId.DEGRADED]: 'Удовлетворительно',
  [TechStatusId.NEED_TO_OPEN_THE_VENT]: 'Требуется ТО',
  [TechStatusId.NOT_CONNECTED]: 'Не в сети',
};

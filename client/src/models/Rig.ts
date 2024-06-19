export interface Rig {
  id: number;
  name: string;
  location: string;
  connection_speed: number;
  drillingProgressValue: number;
  drillingProgressStatus: 'Работает' | 'Запуск...' | 'Авария' | 'Отключено';
  status: 'нормально' | 'удовлетворительно' | 'требуется ТО' | 'не в сети';
}

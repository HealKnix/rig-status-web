import { create } from 'zustand';

interface AlertStore {
  alert: boolean;
  alertDescripion: string;
  openAlert: (description: string) => void;
  closeAlert: () => void;
}

export const useAlertStore = create<AlertStore>()((set) => ({
  alert: false,
  alertDescripion: '',
  openAlert: (description: string) =>
    set({ alert: true, alertDescripion: description }),
  closeAlert: () => set({ alert: false }),
}));

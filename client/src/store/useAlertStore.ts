import { create } from 'zustand';

interface AlertStore {
  alert: boolean;
  openAlert: () => void;
  closeAlert: () => void;
}

export const useAlertStore = create<AlertStore>()((set) => ({
  alert: false,
  openAlert: () => set({ alert: true }),
  closeAlert: () => set({ alert: false }),
}));

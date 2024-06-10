import { create } from 'zustand';

interface ModalState {
  profileModal: boolean;
  openProfileModal: () => void;
  closeProfileModal: () => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  profileModal: false,
  openProfileModal: () => set({ profileModal: true }),
  closeProfileModal: () => set({ profileModal: false }),
}));

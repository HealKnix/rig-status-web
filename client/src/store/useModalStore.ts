import { create } from 'zustand';

interface ModalState {
  modal: boolean;
  openModal: () => void;
  closeModal: () => void;

  logoutModal: boolean;
  openLogoutModal: () => void;
  closeLogoutModal: () => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  modal: false,
  openModal: () => set({ modal: true }),
  closeModal: () => set({ modal: false }),

  logoutModal: false,
  openLogoutModal: () => set({ logoutModal: true, modal: true }),
  closeLogoutModal: () => {
    setTimeout(() => {
      set({ logoutModal: false });
    }, 200);
    set({ modal: false });
  },
}));

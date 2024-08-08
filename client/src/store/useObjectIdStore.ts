import { create } from 'zustand';

interface ObjectIdState {
  id: number | null;
  setId: (id: number | null) => void;
  idIsNotNull: () => boolean;
}

export const useObjectIdStore = create<ObjectIdState>()((set, store) => ({
  id: null,
  setId: (id) => set({ id }),
  idIsNotNull: () => Boolean(store().id),
}));

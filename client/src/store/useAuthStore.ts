import { create } from 'zustand';

import { User } from '@/models/User';

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuth: () => boolean;
  isEmployee: () => boolean;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()((set, state) => ({
  user: null,
  setUser: (user) => set({ user }),
  isAuth: () => Boolean(state().user),
  isEmployee: () => Boolean(state().user?.role === 'employee'),
  isAdmin: () => Boolean(state().user?.role === 'admin'),
}));

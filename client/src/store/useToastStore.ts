import { create } from 'zustand';

type ToastVariants = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  id: number;
  variant: ToastVariants;
  description: string;
}

interface ToastStore {
  toasts: ToastProps[];
  addToast: (variant: ToastVariants, description: string) => void;
  delToast: (id: number) => void;
}

export const useToastStore = create<ToastStore>()((set) => ({
  toasts: [],
  addToast: (variant: ToastVariants, description: string) => {
    set((state) => ({
      toasts: [
        ...state.toasts,
        {
          id: state.toasts.length
            ? state.toasts[state.toasts.length - 1].id + 1
            : 0,
          variant: variant,
          description: description,
        },
      ],
    }));
  },
  delToast: (id: number) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));

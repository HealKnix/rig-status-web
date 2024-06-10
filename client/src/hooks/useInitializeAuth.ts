import { useEffect, useState } from 'react';

import { useAuthStore } from '@/store/useAuthStore';

export const useInitializeAuth = () => {
  const authStore = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      authStore.setUser(JSON.parse(storedUser));
    } else {
      authStore.setUser(null);
    }

    setLoading(false);
  }, []);

  return { isAuthenticated: authStore.isAuth(), loading };
};

import { useEffect, useState } from 'react';

import { api } from '@/api';
import { useAuthStore } from '@/store/useAuthStore';

export const useInitializeAuth = () => {
  const authStore = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.auth().then((res) => {
      authStore.setUser(res);
      setLoading(false);
    });
  }, []);

  return { isAuthenticated: authStore.isAuth(), loading };
};

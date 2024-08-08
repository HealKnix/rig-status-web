import { api } from '@/api';
import { useAuthStore } from '@/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';

export const useInitializeAuth = () => {
  const authStore = useAuthStore();

  const { isFetching } = useQuery({
    queryKey: ['api auth'],
    queryFn: () =>
      api.auth().then((res) => {
        authStore.setUser(res);
        return res;
      }),
  });

  return { isAuthenticated: authStore.isAuth(), loading: isFetching };
};

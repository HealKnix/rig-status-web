import './Login.scss';

import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { useFetchUsers } from '@/hooks/api/useFetchUsers';
import { useAuthStore } from '@/store/useAuthStore';

export default function Login() {
  const { getUserByEmailAndPassword } = useFetchUsers();
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="login-form">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();

            if (!inputEmail.current?.value || !inputPassword.current?.value) {
              return;
            }

            const user = getUserByEmailAndPassword(
              inputEmail.current.value,
              inputPassword.current.value,
            );

            if (user) {
              localStorage.setItem('user', JSON.stringify(user));
              authStore.setUser(user);
              navigate('/console');
            } else {
              alert('Такого пользователя не существует');
            }
          }}
        >
          <h1>Вход</h1>
          <Input
            title="Почта"
            type="email"
            forwardRef={inputEmail}
            autoComplete="email webauthn"
            required
            movablePlaceholder
          />
          <Input
            title="Пароль"
            type="password"
            forwardRef={inputPassword}
            autoComplete="current-password webauthn"
            required
            movablePlaceholder
          />
          <Button variant="outlined">Авторизоваться</Button>
        </form>
      </div>
    </>
  );
}

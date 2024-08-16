import './Login.scss';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '@/api';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { useAuthStore } from '@/store/useAuthStore';

export default function Login() {
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  return (
    <div className="login-form">
      <form
        action=""
        onSubmit={async (e) => {
          e.preventDefault();

          if (!inputEmail || !inputPassword) {
            return;
          }

          const loginData = await api.login(inputEmail, inputPassword);

          if (loginData) {
            authStore.setUser(loginData.user);
            navigate('/');
          } else {
            alert('Такого пользователя не существует!');
          }
        }}
      >
        <h1>Вход</h1>
        <Input
          title="Почта"
          type="email"
          value={inputEmail}
          onChange={(e) => {
            setInputEmail(e?.target.value ?? '');
          }}
          required
          movable_placeholder
        />
        <Input
          title="Пароль"
          type="password"
          value={inputPassword}
          onChange={(e) => {
            setInputPassword(e?.target.value ?? '');
          }}
          autoComplete="current-password webauthn"
          required
          movable_placeholder
        />

        {import.meta.env.VITE_API_MOCK === 'true' && (
          <Button
            type="button"
            variant="black"
            onClick={async () => {
              const loginData = await api.login('www.test@gmail.com', 'test');
              authStore.setUser(loginData?.user ?? null);
            }}
          >
            Войти под тестовым пользователем
          </Button>
        )}

        <Button variant="outlined" type="submit">
          Авторизоваться
        </Button>
      </form>
    </div>
  );
}

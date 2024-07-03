import './Login.scss';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { userService } from '@/services/user.service';
import { useAuthStore } from '@/store/useAuthStore';

export default function Login() {
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const [inputLogin, setInputLogin] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  return (
    <>
      <div className="login-form">
        <form
          action=""
          onSubmit={async (e) => {
            e.preventDefault();

            if (!inputLogin || !inputPassword) {
              return;
            }

            try {
              const loginData = await userService.login(
                inputLogin,
                inputPassword,
              );

              if (loginData?.user) {
                authStore.setUser(loginData?.user);
                navigate('/objects');
              }
            } catch {
              alert('Такого пользователя не существует!');
            }
          }}
        >
          <h1>Вход</h1>
          <Input
            title="Логин"
            value={inputLogin}
            onChange={(e) => {
              setInputLogin(e?.target.value ?? '');
            }}
            required
            movablePlaceholder
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
            movablePlaceholder
          />
          <Button variant="outlined">Авторизоваться</Button>
        </form>
      </div>
    </>
  );
}

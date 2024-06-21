import './Login.scss';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { useFetchUsers } from '@/hooks/api/useFetchUsers';
import { useAuthStore } from '@/store/useAuthStore';

export default function Login() {
  const { getUserByEmailAndPassword } = useFetchUsers();
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  return (
    <>
      <div className="login-form">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();

            if (!inputEmail || !inputPassword) {
              return;
            }

            const user = getUserByEmailAndPassword(inputEmail, inputPassword);

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
            value={inputEmail}
            onChange={(e) => {
              setInputEmail(e?.target.value ?? '');
            }}
            autoComplete="email webauthn"
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

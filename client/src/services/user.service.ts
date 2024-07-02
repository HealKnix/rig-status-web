import axios from 'axios';
import Cookies from 'cookies-ts';

import { User } from '@/models/User';

const cookies = new Cookies();

class UserService {
  async login(username: string, password: string) {
    const { data } = await axios.post<{
      sessionid: string;
      csrftoken: string;
      user: User;
    }>(
      '/login/',
      {
        username: username,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    cookies.set('sessionid', data.sessionid);
    cookies.set('csrftoken', data.csrftoken);

    localStorage.setItem('user', JSON.stringify(data.user));

    return data;
  }

  async logout() {
    const { data } = await axios.post<{
      detail: string;
    }>('/logout/');

    return data;
  }
}

export const userService = new UserService();

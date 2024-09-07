import axios from 'axios';
import Cookies from 'cookies-ts';

import { User } from '@/models/User';

import { ApiNames, ApiType } from './ApiType';

const cookies = new Cookies();

export class Api implements ApiType {
  constructor() {
    console.log('production api');
  }

  async login(email: string, password: string) {
    const { data } = await axios.post<{
      sessionid: string;
      csrftoken: string;
      user: User;
    }>('/login/', {
      email: email,
      password: password,
    });

    cookies.set('csrftoken', data.csrftoken);
    cookies.set('sessionid', data.sessionid);

    return data;
  }

  async logout() {
    await axios.post(
      '/logout/',
      {},
      {
        withCredentials: true,
        headers: {
          'X-CSRFToken': cookies.get('csrftoken'),
        },
      },
    );

    cookies.remove('csrftoken');
    cookies.remove('sessionid');
  }

  async auth() {
    if (!cookies.get('sessionid')) return null;

    const { data } = await axios.post<User>(
      '/auth-login/',
      {},
      {
        withCredentials: true,
        headers: {
          'X-CSRFToken': cookies.get('csrftoken'),
        },
      },
    );

    return data;
  }

  async get<T>(apiName: ApiNames) {
    const { data } = await axios.get<T[]>(`/api/v1/${apiName}/`, {
      withCredentials: true,
    });

    return data;
  }

  async getById<T>(apiName: ApiNames, id: number | null) {
    if (!id) return null;

    const { data } = await axios.get<T>(`/api/v1/${apiName}/${id}/`, {
      withCredentials: true,
    });

    return data;
  }

  async post<T>(apiName: ApiNames, dataBody: T) {
    const { data } = await axios.post<T>(`/api/v1/${apiName}/`, dataBody, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': cookies.get('csrftoken'),
      },
    });

    return data;
  }

  async update<T>(apiName: ApiNames, dataBody: T, id: number | null) {
    if (!id) return null;

    const { data } = await axios.patch<T>(
      `/api/v1/${apiName}/${id}/`,
      dataBody,
      {
        withCredentials: true,
        headers: {
          'X-CSRFToken': cookies.get('csrftoken'),
        },
      },
    );

    return data;
  }

  async delete<T>(apiName: ApiNames, id: number | null) {
    if (!id) return null;

    const { data } = await axios.delete<T>(`/api/v1/${apiName}/${id}/`, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': cookies.get('csrftoken'),
      },
    });

    return data;
  }
}

import axios from 'axios';
import Cookies from 'cookies-ts';

import { rigList } from '@/models/mock/rig';
import { userList } from '@/models/mock/user';

import { ApiNames, ApiType } from './ApiType';

const cookies = new Cookies();

const DELAY = 300; // Задержка 300 мс

// Возвращает переданные данные с заданной задержкой
async function delayRes<T>(data: T, delay: number): Promise<T> {
  await new Promise((res) => {
    setTimeout(res, delay);
  });
  return data;
}

export class ApiMock implements ApiType {
  constructor() {
    console.log('mock api');
  }

  async login(email: string, password: string) {
    const userId = userList.findIndex((user) => {
      return user.email === email && user.password === password;
    });

    if (!userList[userId]) return await delayRes(null, DELAY);

    const data = await delayRes(
      {
        csrftoken: userList[userId].csrftoken ?? 'mock',
        sessionid: userList[userId].sessionid ?? 'mock',
        user: userList[userId],
      },
      DELAY,
    );

    cookies.set('csrftoken', data.csrftoken);
    cookies.set('sessionid', data.sessionid);

    return data;
  }

  async logout() {
    const userId = userList.findIndex((user) => {
      return (
        user.sessionid == cookies.get('sessionid') &&
        user.csrftoken === cookies.get('csrftoken')
      );
    });

    if (userList[userId]) {
      cookies.remove('csrftoken');
      cookies.remove('sessionid');
    }
  }

  async auth() {
    const userId = userList.findIndex((user) => {
      return (
        user.sessionid == cookies.get('sessionid') &&
        user.csrftoken === cookies.get('csrftoken')
      );
    });

    if (!userList[userId]) return await delayRes(null, DELAY);

    const data = await delayRes(userList[userId], DELAY);

    return data;
  }

  async get<T>(apiName: ApiNames) {
    const userId = userList.findIndex((user) => {
      return (
        user.sessionid == cookies.get('sessionid') &&
        user.csrftoken === cookies.get('csrftoken')
      );
    });

    if (!userList[userId]) return await delayRes([], DELAY);

    let data: T[];

    if (apiName === 'rigs') {
      data = await delayRes(<T[]>rigList, DELAY);
    } else {
      data = await delayRes([], DELAY);
    }

    return data;
  }

  async getById<T>(apiName: ApiNames, id: number | null) {
    const userId = userList.findIndex((user) => {
      return (
        user.sessionid == cookies.get('sessionid') &&
        user.csrftoken === cookies.get('csrftoken')
      );
    });

    if (!userList[userId] || !id) return await delayRes(null, DELAY);

    let data: T | null;

    if (apiName === 'rigs') {
      const rigId = rigList.findIndex((rig) => rig.id === id);

      data = await delayRes(<T>rigList[rigId], DELAY);
    } else {
      data = await delayRes(null, DELAY);
    }

    return data;
  }

  async post<T>(apiName: ApiNames, dataBody: T) {
    const { data } = await axios.post<T>(`/api/${apiName}/`, dataBody, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': cookies.get('csrftoken'),
      },
    });

    return data;
  }

  async update<T>(apiName: ApiNames, dataBody: T) {
    const { data } = await axios.patch<T>(`/api/${apiName}/`, dataBody, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': cookies.get('csrftoken'),
      },
    });

    return data;
  }

  async delete<T>(apiName: ApiNames) {
    const { data } = await axios.delete<T>(`/api/${apiName}/`, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': cookies.get('csrftoken'),
      },
    });

    return data;
  }
}

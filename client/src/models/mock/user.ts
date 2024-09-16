import { User } from '../User';

export const userList: User[] = [
  {
    id: 0,
    user_name: 'test',
    first_name: 'Тест',
    last_name: 'Тестов',
    patronymic: 'Тестович',
    email: 'www.test@gmail.com',
    password: 'test',
    sessionid: 'mock0',
    csrftoken: 'mock0',
  },
  {
    id: 1,
    user_name: 'admin',
    first_name: 'Админ',
    last_name: 'Админов',
    patronymic: 'Админович',
    email: 'www.admin@gmail.com',
    password: 'admin',
    sessionid: 'mock1',
    csrftoken: 'mock1',
  },
  {
    id: 2,
    user_name: 'user_0001',
    first_name: 'Сергей',
    last_name: 'Константинов',
    patronymic: 'Андреевич',
    email: 'www.sergandr@gmail.com',
    password: 'sergandr74',
    sessionid: 'mock2',
    csrftoken: 'mock2',
  },
];

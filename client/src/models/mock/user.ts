import { User } from '../User';

export const userList: User[] = [
  {
    id: 0,
    user_name: 'test',
    first_name: 'Тест',
    last_name: 'Тестов',
    middle_name: 'Тестович',
    email: 'www.test@gmail.com',
    password: 'test',
    sessionid: 'mock0',
    csrftoken: 'mock0',
  },
  {
    id: 1,
    user_name: 'admin',
    first_name: 'Адин',
    last_name: 'Админов',
    middle_name: 'Админович',
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
    middle_name: 'Андреевич',
    email: 'www.sergandr@gmail.com',
    password: 'sergandr74',
    sessionid: 'mock2',
    csrftoken: 'mock2',
  },
];

import { useMemo, useState } from 'react';

import { userList } from '@/models/mock/user';
import { User } from '@/models/User';

export const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useMemo(() => {
    setUsers(() => userList);
  }, []);

  const addUser = (user: User) => {
    setUsers((users) => [...users, user]);
  };

  const getUserById = (id: number) => {
    return users.find((user) => user.id === id);
  };

  const getUserByEmailAndPassword = (email: string, password: string) => {
    return users.find(
      (user) => user.email === email && user.password === password,
    );
  };

  return { users, addUser, getUserById, getUserByEmailAndPassword };
};

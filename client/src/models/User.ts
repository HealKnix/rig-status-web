export interface User {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  role: 'employee' | 'admin';
  email: string;
  password: string;
}

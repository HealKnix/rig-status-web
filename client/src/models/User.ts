export interface User {
  id: number;
  user_name: string;
  first_name: string;
  last_name: string;
  patronymic: string;
  email: string;
  password?: string;
  sessionid?: string;
  csrftoken?: string;
}

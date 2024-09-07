import { User } from '@/models/User';

export type ApiNames =
  | 'rigs'
  | 'drilling-statuses'
  | 'sensors'
  | 'sensor-data'
  | 'tech-statuses'
  | 'subsystems';

export interface ApiType {
  login?: (
    email: string,
    password: string,
  ) => Promise<{
    sessionid: string;
    csrftoken: string;
    user: User;
  } | null>;
  logout?: () => Promise<void>;
  auth?: (email: string, password: string) => Promise<User | null>;
  get?: <T>(apiName: ApiNames) => Promise<T[]>;
  getById?: <T>(apiName: ApiNames, id: number | null) => Promise<T | null>;
  post?: <T>(apiName: ApiNames, dataBody: T) => Promise<T>;
  update?: <T>(
    apiName: ApiNames,
    dataBody: T,
    id: number | null,
  ) => Promise<T | null>;
  delete?: <T>(apiName: ApiNames, id: number | null) => Promise<T | null>;
}

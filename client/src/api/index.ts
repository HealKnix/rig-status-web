import { Api } from './Api';
import { ApiMock } from './ApiMock';

export const api =
  import.meta.env.VITE_API_MOCK === 'true' ? new ApiMock() : new Api();

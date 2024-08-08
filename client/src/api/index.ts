import { Api } from './Api';
import { ApiMock } from './ApiMock';

export const api = import.meta.env.VITE_API_MOCK ? new ApiMock() : new Api();

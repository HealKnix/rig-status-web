/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WS_URL: string;
  readonly VITE_API_URL: string;
  readonly VITE_API_NAME: string;
  readonly VITE_API_VERSION: string;
  readonly VITE_API_MOCK?: 'true' | 'false';
  readonly VITE_API_AUTH?: 'true' | 'false';
}

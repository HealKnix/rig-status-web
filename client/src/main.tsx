import './index.scss';

import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Alert from './components/Alert/Alert.tsx';
import LogoutModal from './components/Modal/LogoutModal/LogoutModal.tsx';
import Modal from './components/Modal/Modal.tsx';
import Toast from './components/Toast/Toast.tsx';
import App from './pages/AppPage/App.tsx';

const queryClient = new QueryClient();

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toast />
        <Modal>
          <LogoutModal />
        </Modal>
        <Alert />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);

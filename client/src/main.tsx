import './index.scss';

import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Modal from './components/Modal/Modal.tsx';
import App from './pages/AppPage/App.tsx';

const queryClient = new QueryClient();

axios.defaults.baseURL = 'http://localhost:8001';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Modal />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);

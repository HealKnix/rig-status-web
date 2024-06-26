import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Modal from './components/Modal/Modal.tsx';
import App from './pages/AppPage/App.tsx';

const queryClient = new QueryClient();

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

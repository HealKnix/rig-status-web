import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import Modal from './components/Modal/Modal.tsx';
import App from './pages/AppPage/App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Modal />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

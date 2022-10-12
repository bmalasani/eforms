import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { EFormsProvider } from './store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <EFormsProvider>
        <App />
      </EFormsProvider>
    </BrowserRouter>
  </React.StrictMode>
);

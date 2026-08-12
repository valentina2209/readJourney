import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store/store';
import { QueryProvider } from './app/providers/QueryProvider';
import { AppRouterProvider } from './app/providers/RouterProvider';
import './app/styles/global.css';
import { Toaster } from 'react-hot-toast';

// Невеличкий хак: синхронізуємо тему з тегом HTML при першому завантаженні сайту
const savedTheme = (localStorage.getItem('theme') || 'dark') as 'dark' | 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

ReactDOM.createRoot(document.getElementById('modal-root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryProvider>
        <Toaster
          position='top-right'
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--bg-surface)',
              color: 'var(--text-main)',
              border: '1px solid var(--border-color)',
            },
          }}
        />
        <AppRouterProvider />
      </QueryProvider>
    </Provider>
  </React.StrictMode>
);

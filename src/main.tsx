import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store/store';
import { QueryProvider } from './app/providers/QueryProvider';
import { AppRouterProvider } from './app/providers/RouterProvider';
import './app/styles/global.css';

// Невеличкий хак: синхронізуємо тему з тегом HTML при першому завантаженні сайту
const savedTheme = (localStorage.getItem('theme') || 'dark') as 'dark' | 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryProvider>
        <AppRouterProvider />
      </QueryProvider>
    </Provider>
  </React.StrictMode>
);

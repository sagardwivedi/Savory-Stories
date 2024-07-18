import { createClient } from '@hey-api/client-fetch';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import '@/main.css';
import App from '@/routes/App';
import LoginPage from '@/routes/auth/login';
import SignupPage from '@/routes/auth/signup';
import Root from './routes/app';
import Home from './routes/app/home';

const query = new QueryClient();

const key = localStorage.getItem('access_token') || '';

createClient({
  baseUrl: 'http://localhost:8000',
  headers: {
    Authentication: `Bearer ${key}`,
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/auth/signup',
    element: <SignupPage />,
  },
  {
    path: '/auth/login',
    element: <LoginPage />,
  },
  {
    path: '/home',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Home />,
      },
    ],
  },
]);

const TanStackQueryDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : React.lazy(() =>
        import('@tanstack/react-query-devtools').then((res) => ({
          default: res.ReactQueryDevtools,
        })),
      );

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={query}>
        <RouterProvider router={router} />
        <React.Suspense>
          <TanStackQueryDevtools />
        </React.Suspense>
      </QueryClientProvider>
    </React.StrictMode>,
  );
}

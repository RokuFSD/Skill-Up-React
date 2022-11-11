import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import store from './app/store';
import ProtectedRoute from './components/routes/ProtectedRoute.jsx';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  BalancePage,
  MovementsPage,
  ErrorPage,
  RegisterPage,
  HomePage
} from './pages/index.js';
import Login from './components/login/login';
import SendPage from './pages/SendPage.jsx';

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'register',
        element: <RegisterPage />
        // action: registerAction
      },
      {
        path: 'login',
        element: <Login />
        // action: loginAction
      },
      {
        path: 'balance',
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <BalancePage />
          },
          {
            path: 'add'
            // element: <AddBalance />,
          },
          {
            path: 'spent'
            // element: <SpentBalance />,
          }
        ]
      },
      {
        path: 'movements',
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <MovementsPage />
          }
        ]
      },
      {
        path: 'send',
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <SendPage />
          }
        ]
      }
    ],
    errorElement: <ErrorPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={browserRouter}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);

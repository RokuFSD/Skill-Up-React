import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import store from './app/store';
import ProtectedRoute from './components/routes/ProtectedRoute.jsx';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MovementsPage, ErrorPage, HomePage } from './pages/index.js';
import Login from './components/login/login';
import Add from './components/add/add';
import Spent from './components/spent/spent';
import Send from './components/send/send';
import Dashboard from './components/dashboard/Dashboard.jsx';

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
          path: 'login',
          element: <Login />
        },
        {
          path: 'balance',
          element: <ProtectedRoute />,
          children: [
            {
              index: true,
              element: <Dashboard />
            },
            {
              path: 'add',
              element: <Add />
            },
            {
              path: 'spent',
              element: <Spent />
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
              element: <Send />
            }
          ]
        }
      ],
      errorElement: <ErrorPage />
    }
  ])
;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={browserRouter}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);

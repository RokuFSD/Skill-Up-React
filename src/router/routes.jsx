import App from '../App.jsx';
import Add from '../components/pages/add.jsx';
import Send from '../components/pages/send.jsx';
import Spent from '../components/pages/spent.jsx';
import Login from '../components/pages/login.jsx';
import Landing from '../components/pages/landing/index.jsx';
import Dashboard from '../components/layout/dashboard/Dashboard.jsx';
import ProtectedRoute from './helpers/ProtectedRoute.jsx';
import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage, HomePage, MovementsPage } from '../components/pages/index.js';

const routes = [
  {
    path: '/',
    element: <App/>,
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
  },
  {
    path: 'home',
    element: <Landing />,
    errorElement: <ErrorPage />
  }
];

export const browserRouter = createBrowserRouter(routes)

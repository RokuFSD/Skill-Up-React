import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import store from './redux/app/store';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { browserRouter } from './router/routes.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={browserRouter}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);

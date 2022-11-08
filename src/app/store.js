import { configureStore } from '@reduxjs/toolkit';
import { listenerMiddleware } from './middleware.js';
import { apiSlice } from '../features/api/apiSlice.js';
import userReducer from '../features/user/userSlice.js';

const store = configureStore({
  reducer: {
    [apiSlice?.reducerPath]: apiSlice?.reducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice?.middleware, listenerMiddleware.middleware)
});

export default store;

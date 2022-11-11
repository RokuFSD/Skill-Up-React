import { configureStore } from '@reduxjs/toolkit';
import { listenerMiddleware, adminListenerMiddleware } from './middleware.js';
import { apiSlice } from '../features/api/apiSlice.js';
import userReducer from '../features/user/userSlice.js';
import transactionReducer from '../features/transaction/transactionSlice.js';

const store = configureStore({
  reducer: {
    [apiSlice?.reducerPath]: apiSlice?.reducer,
    user: userReducer,
    transaction: transactionReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice?.middleware, listenerMiddleware.middleware, adminListenerMiddleware.middleware),
});

export default store;

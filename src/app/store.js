import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { listenerMiddleware } from './middleware.js';
import userReducer from '../features/user/userSlice.js';

const rootReducer = combineReducers({
  user: userReducer
});

/* Testing purposes */
const store = (preloadedState) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(listenerMiddleware.middleware)
  });

export default store;

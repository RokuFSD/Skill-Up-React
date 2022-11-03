import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

const rootReducer = combineReducers({
  auth: authReducer
});

/* Testing purposes */
const store = (preloadedState) =>
  configureStore({
    reducer: rootReducer,
    preloadedState
  });

export default store;

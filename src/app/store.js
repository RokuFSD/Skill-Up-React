import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice.js';

const rootReducer = combineReducers({
  user: userReducer
});

/* Testing purposes */
const store = (preloadedState) =>
  configureStore({
    reducer: rootReducer,
    preloadedState
  });

export default store;

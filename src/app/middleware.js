import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { adminResponse, getAccount } from '../features/user/accountActions.js';
import { authRegister } from '../features/user/authActions.js';
import { deposit, withdraw, transaction } from '../features/user/balanceActions.js';
import { apiSlice } from '../features/api/apiSlice.js';
import store from './store.js';
import { userLogout } from '../features/user/userSlice.js';

export const listenerMiddleware = createListenerMiddleware();
export const adminListenerMiddleware = createListenerMiddleware();
export const logoutListenerMiddleware = createListenerMiddleware();
export const transactionListenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(
    deposit.fulfilled,
    withdraw.fulfilled,
    transaction.fulfilled,
    authRegister.fulfilled,
    getAccount.fulfilled
  ),
  effect: (action, listenerApi) => {
    localStorage.setItem('user', JSON.stringify(listenerApi.getState().user.user));
    localStorage.setItem('account', JSON.stringify(listenerApi.getState().user.account));
    localStorage.setItem('userToken', listenerApi.getState().user.userToken);
  }
});

adminListenerMiddleware.startListening({
  matcher: isAnyOf(adminResponse.fulfilled),
  effect: (action, listenerApi) => {
    localStorage.setItem('adminToken', listenerApi.getState().user.adminToken);
  }
});

transactionListenerMiddleware.startListening({
  matcher: isAnyOf(transaction.fulfilled, withdraw.fulfilled, deposit.fulfilled),
  effect: (action, listenerApi) => {
    store.dispatch(apiSlice.util.invalidateTags(['Transaction']));
  }
});

logoutListenerMiddleware.startListening({
  matcher: isAnyOf(userLogout),
  effect: (action, listenerApi) => {
    store.dispatch(apiSlice.util.resetApiState());
  }
});

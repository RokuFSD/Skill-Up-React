import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { adminResponse } from '../features/user/accountActions.js';
import { authRegister } from '../features/user/authActions.js';
import { deposit, withdraw, transaction } from '../features/user/balanceActions.js';

export const listenerMiddleware = createListenerMiddleware();
export const adminListenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(
    deposit.fulfilled,
    withdraw.fulfilled,
    transaction.fulfilled,
    authRegister.fulfilled
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

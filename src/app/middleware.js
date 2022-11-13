import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { adminResponse, getAccount } from '../features/user/accountActions.js';
import { authRegister } from '../features/user/authActions.js';
import { deposit, withdraw, transaction } from '../features/user/balanceActions.js';
import { apiSlice } from '../features/api/apiSlice.js';
import store from './store.js';
import { userLogout } from '../features/user/userSlice.js';
import { removeDestinyAccount } from '../features/transaction/transactionSlice.js';

export const listenerMiddleware = createListenerMiddleware();
export const adminListenerMiddleware = createListenerMiddleware();
export const logoutListenerMiddleware = createListenerMiddleware();
export const transactionListenerMiddleware = createListenerMiddleware();


/*
* Middleware to ensure that the last data of the user and the account is in local storage
* */
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

/*
* Middleware to ensure that a admin token is available to make requests
* */
adminListenerMiddleware.startListening({
  matcher: isAnyOf(adminResponse.fulfilled),
  effect: (action, listenerApi) => {
    localStorage.setItem('adminToken', listenerApi.getState().user.adminToken);
  }
});

/*
* Middleware to ensure that the transactions are refetched when a transaction is made
* */
transactionListenerMiddleware.startListening({
  matcher: isAnyOf(transaction.fulfilled, withdraw.fulfilled, deposit.fulfilled),
  effect: (action, listenerApi) => {
    store.dispatch(apiSlice.util.invalidateTags(['Transaction']));
  }
});

/*
* Middleware to ensure that the data of the user is removed from local storage when the user logs out
* */

logoutListenerMiddleware.startListening({
  matcher: isAnyOf(userLogout),
  effect: (action, listenerApi) => {
    store.dispatch(apiSlice.util.resetApiState());
    store.dispatch(removeDestinyAccount())
  }
});

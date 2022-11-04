import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { getAccount } from '../features/user/accountActions.js';

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(getAccount.fulfilled),
  effect: (action, listenerApi) => localStorage.setItem('user', JSON.stringify(listenerApi.getState().user.user))
})

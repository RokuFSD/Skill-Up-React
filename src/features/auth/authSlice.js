import { createSlice } from '@reduxjs/toolkit';
import { authLogin, authRegister } from './authActions';
import { getAccount } from './accountActions';
import { operateOnBalance } from './balanceActions.js';

const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;

const initialState = {
  user: null,
  loading: false,
  error: '',
  userToken,
  success: false // for monitoring the registration process
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogout: (state) => {
      localStorage.removeItem('userToken');
      state.user = null;
      state.userToken = null;
      state.error = '';
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      /* Register user */
      .addCase(authRegister.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(authRegister.fulfilled, (state) => {
        state.loading = false;
        state.success = true; // registration was successful
      })
      .addCase(authRegister.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload?.error;
        } else {
          state.error = action.error.message;
        }
      })
      /* Login user */
      .addCase(authLogin.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.userToken = action.payload.token;
        state.error = '';
      })
      .addCase(authLogin.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload?.error;
        } else {
          state.error = action.error.message;
        }
        state.loading = false;
      })
      .addCase(getAccount.fulfilled, (state, action) => {
        state.user.account = action.payload;
      })
      .addCase(getAccount.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload?.error;
        } else {
          state.error = action.error.message;
        }
        state.loading = false;
      })
      .addCase(operateOnBalance.fulfilled, (state, action) => {
        state.user.account.money = action.payload.money;
      })
      .addCase(operateOnBalance.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload?.error;
        } else {
          state.error = action.error.message;
        }
        state.loading = false;
      });
  }
});

export const selectUser = (state) => state.auth.user;
export const selectUserToken = (state) => state.auth.userToken;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;

export const selectBalance = (state) => state.auth?.user?.account?.money;

export const { authLogout } = authSlice.actions;

export default authSlice.reducer;

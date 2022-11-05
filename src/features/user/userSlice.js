import { createSlice } from '@reduxjs/toolkit';
import { authLogin, authRegister } from './authActions';
import { getAccount } from './accountActions';
import { deposit, withdraw, transaction } from './balanceActions.js';

const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const initialState = {
  user,
  loading: false,
  error: '',
  userToken,
  success: false, // for monitoring the registration process
  onMovement: false // for monitoring a deposit - withdraw - transaction process
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: (state) => {
      state.user = null;
      state.userToken = null;
      state.error = '';
      state.loading = false;
      localStorage.removeItem('userToken');
      localStorage.removeItem('user');
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
      /* Get user account */
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
      /* Make a deposit in any account */
      .addCase(deposit.fulfilled, (state, action) => {
        state.user.account.money = action.payload.money;
        state.onMovement = false;
      })
      .addCase(deposit.pending, (state) => {
        state.onMovement = true;
      })
      .addCase(deposit.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload?.error;
        } else {
          state.error = action.error.message;
        }
        state.onMovement = false;
      })
      /* Make a withdrawal from the user account modifying it*/
      .addCase(withdraw.fulfilled, (state, action) => {
        state.user.account.money = action.payload;
        state.onMovement = false;
      })
      .addCase(withdraw.pending, (state) => {
        state.onMovement = true;
      })
      .addCase(withdraw.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload?.error;
        } else {
          state.error = action.error.message;
        }
        state.onMovement = false;
      })
      /* In case of a withdrawal or deposit on another user account, make a transaction */
      .addCase(transaction.fulfilled, (state, action) => {
        state.onMovement = false;
      })
      .addCase(transaction.pending, (state) => {
        state.onMovement = true;
      })
      .addCase(transaction.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload?.error;
        } else {
          state.error = action.error.message;
        }
        state.onMovement = false;
      })
    ;
  }
});

export const selectUser = (state) => state.user.user;
export const selectUserToken = (state) => state.user.userToken;
export const selectLoading = (state) => state.user.loading;
export const selectOnMovement = (state) => state.user.onMovement;
export const selectError = (state) => state.user.error;

export const selectBalance = (state) => state.user?.user?.account?.money;
export const selectName = (state) => state.user?.user?.first_name;

export const { userLogout } = userSlice.actions;

export default userSlice.reducer;

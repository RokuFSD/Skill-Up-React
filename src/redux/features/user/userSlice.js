import { createSlice } from '@reduxjs/toolkit';
import { authLogin, authRegister } from './authActions.js';
import { adminResponse, getAccount } from './accountActions.js';
import { deposit, withdraw, transaction } from './balanceActions.js';

const adminToken = localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : null;
const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const account = localStorage.getItem('account')
  ? JSON.parse(localStorage.getItem('account'))
  : null;

const initialState = {
  account,
  accounts: [],
  user,
  loading: false,
  error: '',
  userToken,
  adminToken,
  success: false,
  onMovement: false
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
      localStorage.removeItem('account');
      localStorage.removeItem('userToken');
      localStorage.removeItem('user');
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder

      /* Register user */

      .addCase(authRegister.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(authRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.account = action.payload;
        state.success = true;
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
        state.account = action.payload;
        state.onMovement = false;
      })
      .addCase(getAccount.pending, (state) => {
        state.onMovement = true;
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
        state.account.money = action.payload.money;
        state.success = true;
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
        state.account.money = action.payload;
        state.success = true;
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
        state.success = true;
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

      //Admin Token for restricted API endpoints

      .addCase(adminResponse.fulfilled, (state, action) => {
        state.adminToken = action.payload.accessToken;
      });
  }
});

export const selectUser = (state) => state.user.user;
export const selectUserToken = (state) => state.user.userToken;
export const selectOnMovement = (state) => state.user.onMovement;
export const selectError = (state) => state.user.error;
export const selectSuccess = (state) => state.user.success;
export const selectAccount = (state) => state.user.account?.id;
export const selectBalance = (state) => state.user.account?.money;
export const selectName = (state) => state.user?.user?.first_name;

export const { userLogout, setError, setSuccess } = userSlice.actions;

export default userSlice.reducer;

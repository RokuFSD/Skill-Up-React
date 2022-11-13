import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiUrl from '../../../api/index.js';
import { apiSlice } from '../api/apiSlice.js';


/*
  * This is a thunk that is used to make a deposit or transfer to a user.
* */
export const deposit = createAsyncThunk(
  'balance/deposit',
  async ({ amount, toAccount, concept, type }, { rejectWithValue, getState }) => {
    try {
      const token = getState().user.userToken;
      const destinationAccount = toAccount || getState().user.account.id;
      const response = await axios.post(
        `${apiUrl}/accounts/${destinationAccount}`,
        {
          type: type,
          amount: Number(amount),
          concept
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (type === 'topup') {
        return { money: Number(getState().user.account.money) + Number(amount) };
      }
      return { money: Number(getState().user.account.money) - Number(amount) };
    } catch (e) {
      if (!e.response) {
        throw e;
      } else {
        return rejectWithValue(e.response.data);
      }
    }
  }
);

/*
  * This is a thunk that is used to make a withdrawal from a user making a put action to the API.
* */

export const withdraw = createAsyncThunk(
  'balance/withdraw',
  async ({ amount }, { rejectWithValue, getState }) => {
    try {
      const token = getState().user.userToken;
      const destinationAccount = getState().user.account.id;
      const currentAccountMoney = getState().user.account.money;
      const finalAmount = Number(currentAccountMoney) - Number(amount);
      const userId = getState().user.user.id;
      const adminToken = getState().user.adminToken;
      const response = await axios.put(
        `${apiUrl}/accounts/${destinationAccount}`,
        {
          userId,
          money: finalAmount
        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        }
      );
      return finalAmount;
    } catch (e) {
      if (!e.response) {
        throw e;
      } else {
        return rejectWithValue(e.response.data);
      }
    }
  }
);

/*
* This is a thunk that is used to create a transaction when the API doesn't do it.
* */

export const transaction = createAsyncThunk(
  'balance/transaction',
  async ({ amount, type, concept, screen, toAccount }, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState().user.userToken;
      let userId = getState().user.user.id;
      let accountId = getState().user.account.id;
      let sendAccountId = accountId;
      if (screen === 'send') {
        accountId = toAccount;
        const { data } = await dispatch(apiSlice.endpoints.getUserId.initiate({ id: accountId }));
        userId = data;
        concept = 'Ingreso de Dinero';
        type = 'topup';
      }
      const response = await axios.post(
        `${apiUrl}/transactions`,
        {
          date: Date.now(),
          type,
          concept,
          accountId,
          userId,
          amount: Number(amount),
          to_account_id: sendAccountId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (e) {
      if (!e.response) {
        throw e;
      } else {
        return rejectWithValue(e.response.data);
      }
    }
  }
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiUrl from '../api/index.js';

export const deposit = createAsyncThunk('balance/deposit', async ({ amount, accountId, concept, type }, {
  rejectWithValue,
  getState
}) => {
  try {
    const token = getState().user.userToken;
    const destinationAccount = accountId || getState().user.user.account.id;
    const response = await axios.post(`${apiUrl}/accounts/${destinationAccount}`, {
      type: type,
      amount: Number(amount),
      concept
    }, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    if (type === 'topup') {
      return { money: Number(getState().user.user.account.money) + Number(amount) };
    }
    return { money: Number(getState().user.user.account.money) - Number(amount) };
  } catch (e) {
    if (!e.response) {
      throw e;
    } else {
      return rejectWithValue(e.response.data);
    }
  }
});

export const withdraw = createAsyncThunk('balance/withdraw', async ({ amount }, {
  rejectWithValue,
  getState
}) => {
  try {
    const token = getState().user.userToken;
    const destinationAccount = getState().user.user.account.id;
    const currentAccountMoney = getState().user.user.account.money;
    const finalAmount = Number(currentAccountMoney) - Number(amount);
    const userId = getState().user.user.id;
    const response = await axios.put(`${apiUrl}/accounts/${destinationAccount}`, {
      userId,
      money: finalAmount
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return finalAmount;
  } catch (e) {
    if (!e.response) {
      throw e;
    } else {
      return rejectWithValue(e.response.data);
    }
  }
});


export const transaction = createAsyncThunk(
  'balance/transaction',
  async ({ amount, type, concept }, { rejectWithValue, getState }) => {
    try {
      const token = getState().user.userToken;
      const userId = getState().user.user.id;
      const accountId = getState().user.user.account.id;
      const response = await axios.post(
        `${apiUrl}/transactions`,
        {
          date: Date.now(),
          type,
          concept,
          accountId,
          userId,
          amount: Number(amount),
          to_account_id: accountId
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

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiUrl from '../../utils/api';

export const deposit = createAsyncThunk('balance/deposit', async ({ amount, accountId, concept }, {
  rejectWithValue,
  getState
}) => {
  try {
    const token = getState().user.userToken;
    const currentAccountId = getState().user.user.account.id;
    const response = await axios.post(`${apiUrl}/accounts/${accountId}`, {
      type: 'topup',
      amount: Number(amount),
      concept
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (currentAccountId === accountId) {
      return { money: Number(getState().user.user.account.money) + Number(amount) };
    }
    return { money: Number(getState().user.user.account.money) };
  } catch (e) {
    if (!e.response) {
      throw e;
    } else {
      return rejectWithValue(e.response.data);
    }
  }
});

export const withdraw = createAsyncThunk('balance/withdraw', async ({ amount, accountId }, {
  rejectWithValue,
  getState
}) => {
  try {
    const token = getState().user.userToken;
    const currentAccountMoney = getState().user.user.account.money;
    const userId = getState().user.user.id;
    const response = await axios.put(`${apiUrl}/accounts/${accountId}`, {
      userId,
      money: currentAccountMoney - Number(amount)
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return currentAccountMoney - Number(amount);
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
  async ({ amount, type, concept, accountId, toAccountId }, { rejectWithValue, getState }) => {
    try {
      const token = getState().user.userToken;
      const userId = getState().user.user.id;
      const response = await axios.post(
        `${apiUrl}/transactions`,
        {
          date: Date.now(),
          type,
          concept,
          accountId,
          userId,
          amount: Number(amount),
          to_account_id: toAccountId
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

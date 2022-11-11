import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiUrl from '../../utils/api';
import { adminResponse } from './accountActions';

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

export const withdraw = createAsyncThunk(
  'balance/withdraw',
  async ({ amount }, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState().user.userToken;
      const destinationAccount = getState().user.account.id;
      const currentAccountMoney = getState().user.account.money;
      const finalAmount = Number(currentAccountMoney) - Number(amount);
      const userId = getState().user.user.id;
      const adminToken = await adminResponse();
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

export const transaction = createAsyncThunk(
  'balance/transaction',
  async ({ amount, type, concept }, { rejectWithValue, getState }) => {
    try {
      const token = getState().user.userToken;
      const userId = getState().user.user.id;
      const accountId = getState().user.account.id;
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

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiUrl from '../../utils/api';

export const operateOnBalance = createAsyncThunk(
  'balance/addToBalance',
  async ({ amount, type, concept }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const accountId = getState().auth.user.account.id;
      const response = await axios.put(
        `${apiUrl}/accounts/${accountId}`,
        {
          type,
          concept,
          amount
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.status === 200) {
        return type === 'topup'
          ? { money: getState().auth.user.account.money + amount }
          : { money: getState().auth.user.account.money - amount };
      }
    } catch (e) {
      if (!e.response) {
        throw e;
      } else {
        return rejectWithValue(e.response.data);
      }
    }
  }
);

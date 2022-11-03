import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiUrl from '../../utils/api';

export const getAccount = createAsyncThunk(
  'account/getAccount',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const userId = getState().auth.user.id;
      const response = await axios.get(`${apiUrl}/account`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.find((account) => account.id === userId);
    } catch (e) {
      if (!e.response) {
        throw e;
      } else {
        return rejectWithValue(e.response.data);
      }
    }
  }
);

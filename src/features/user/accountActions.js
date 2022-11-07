import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiUrl from '../../utils/api';

export const getAccount = createAsyncThunk(
  'account/getAccount',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().user.userToken;
      // const userId = getState().auth.user.id;
      // Hardcoded account id because the api is not working properly
      const response = await axios.get(`${apiUrl}/accounts/213`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
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

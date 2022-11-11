import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiUrl from '../../utils/api';

const accountsPage = async (userId, token, page = '/accounts') => {
  const response = await axios.get(apiUrl + page, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (response.data.nextPage !== null) {
    page = response.data.nextPage;
  } else {
    console.log('No hay mas paginas en BBDD');
  }
  const userAccouts = response.data.data.filter((e) => {
    return e.userId === userId;
  });
  if (userAccouts.length > 0) {
    return userAccouts[0];
  } else if (response.data.nextPage === null) {
    console.log('No match');
    return;
  } else {
    return await accountsPage(userId, token, page);
  }
};

export const adminResponse = async () => {
  const response = await axios.post(`${apiUrl}/auth/login`, {
    email: import.meta.env.VITE_ADMIN_USER,
    password: import.meta.env.VITE_ADMIN_PASS
  });
  return response.data.accessToken;
};

export const getAccount = createAsyncThunk(
  'accounts/getAccount',
  async (_, { rejectWithValue, getState }) => {
    try {
      const userId = getState().user.user.id;
      const adminToken = await adminResponse();
      const response = await accountsPage(userId, adminToken);
      return response;
    } catch (e) {
      if (!e.response) {
        throw e;
      } else {
        return rejectWithValue(e.response.data);
      }
    }
  }
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiUrl from '../../../api/index.js';

/*
 * User: {email: string, password: string}
 * Returns: {token: string, user: user data object}
 *  */

export const authLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password
      });
      const userResponse = await axios.get(`${apiUrl}/auth/me`, {
        headers: {
          Authorization: `Bearer ${response.data.accessToken}`
        }
      });
      return { token: response.data.accessToken, user: userResponse.data };
    } catch (e) {
      if (!e.response) {
        throw e;
      } else {
        return rejectWithValue(e.response.data);
      }
    }
  }
);

export const authRegister = createAsyncThunk(
  'auth/register',
  async ({ email, password, firstName, lastName }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${apiUrl}/users`, {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        roleId: 2,
        points: 0
      });
      const loginResponse = await dispatch(authLogin({ email, password }));
      const accountResponse = await axios.post(
        `${apiUrl}/accounts`,
        {
          creationDate: Date.now(),
          money: 0,
          isBlocked: false,
          userId: response.data.id
        },
        { headers: { Authorization: `Bearer ${loginResponse.payload.token}` } }
      );
      return accountResponse.data;
    } catch (e) {
      if (!e.response) {
        throw e;
      } else {
        return rejectWithValue(e.response.data);
      }
    }
  }
);

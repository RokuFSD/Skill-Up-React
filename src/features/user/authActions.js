import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiUrl from '../api/index.js';

/*
 * User: {email: string, password: string}
 * Returns: {token: string, user: {id: string, email: string}}
 *  */

export const authLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}auth/login`, {
        email,
        password
      });
      const userResponse = await axios.get(`${apiUrl}auth/me`, {
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

/*
 * TODO: make the input values as the api expects
 * User: {email: string, password: string, passwordConfirmation: string, name: string, lastName: string}
 * Returns: void
 *  */

export const authRegister = createAsyncThunk(
  'auth/register',
  async ({ email, password, passwordConfirmation }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}auth/register`, {
        email,
        password,
        passwordConfirmation
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

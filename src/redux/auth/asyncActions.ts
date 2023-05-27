/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAuth = createAsyncThunk(
  'auth/fetchAuth',
  async (user: { email: string; password: string }) => {
    const { data: responseData } = await axios.post('/auth/login', user);
    return responseData;
  },
);

export const fetchRegister = createAsyncThunk(
  '/auth/fetchRegister',
  async (user: { fullName: string; email: string; password: string }) => {
    const { data } = await axios.post('/auth/register', user);
    return data;
  },
);

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/auth/me');
  return data;
});

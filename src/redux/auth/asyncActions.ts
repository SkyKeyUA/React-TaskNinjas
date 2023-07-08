/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api';
import { AuthService } from '../../services/AuthService';
import { setUser } from './slice';
import { AxiosError } from 'axios';

export const fetchAuth = createAsyncThunk(
  'auth/fetchAuth',
  async (user: { email: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await AuthService.login(user);
      localStorage.setItem('token', response.data.accessToken);
      dispatch(setUser(response.data.user));
      return response;
    } catch (e) {
      const err = e as AxiosError;
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

export const fetchRegister = createAsyncThunk(
  '/auth/fetchRegister',
  async (user: { fullName: string; email: string; password: string }) => {
    const { data } = await axios.post('/auth/register', user);
    return data;
  },
);

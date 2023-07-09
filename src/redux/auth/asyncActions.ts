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
      console.log(response);
      dispatch(setUser(response.data.user));
      localStorage.setItem('token', response.data.accessToken);
      return response.data;
    } catch (e) {
      const err = e as AxiosError;
      if (!err.response) {
        throw err;
      }
      alert('Failed to log in');
      return rejectWithValue(err.response.data);
    }
  },
);

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async (user: { email: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await AuthService.registration(user);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      dispatch(setUser(response.data.user));
      return response.data;
    } catch (e) {
      const err = e as AxiosError;
      if (!err.response) {
        throw err;
      }
      alert('Failed to register');
      return rejectWithValue(err.response.data);
    }
  },
);
export const logout = createAsyncThunk('auth/logout', async (_, { dispatch, rejectWithValue }) => {
  try {
    const response = await AuthService.logout();
    console.log(response);
    localStorage.removeItem('token');
    dispatch(logout());
    return response;
  } catch (e) {
    const err = e as AxiosError;
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
});

export const fetchAuthMe = createAsyncThunk(
  'auth/fetchAuthMe',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await AuthService.auth();
      console.log(response);
      dispatch(setUser(response.data.user));
      localStorage.setItem('token', response.data.accessToken);
    } catch (e) {
      const err = e as AxiosError;
      if (!err.response) {
        throw err;
      }
      localStorage.removeItem('token');
      return rejectWithValue(err.response.data);
    }
  },
);

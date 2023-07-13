/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '../../services/AuthService';
import { setUser, logout } from './slice';
import { AxiosError } from 'axios';

export const fetchAuth = createAsyncThunk(
  'auth/fetchAuth',
  async (user: { email: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await AuthService.login(user);
      dispatch(setUser(response.data.userDto));
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
      localStorage.setItem('token', response.data.accessToken);
      dispatch(setUser(response.data.userDto));
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
export const fetchLogout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await AuthService.logout();
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
  },
);

export const fetchAuthMe = createAsyncThunk(
  'auth/fetchAuthMe',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await AuthService.auth();
      dispatch(setUser(response.data.userDto));
      localStorage.setItem('token', response.data.accessToken);
      return response.data.userDto;
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

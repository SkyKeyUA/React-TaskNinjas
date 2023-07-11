/** @format */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { error } from 'console';
import { AuthResponse } from '../redux/auth/type';

const baseURL = process.env.REACT_APP_API_URL;

const $api = axios.create({
  withCredentials: true,
  baseURL,
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = window.localStorage.getItem('token');
  if (token !== null && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

$api.interceptors.response.use(
  (config: AxiosResponse) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(`${baseURL}/auth/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem('token', response.data.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        console.log("A user isn't authorization");
      }
    }
    throw error;
  },
);

export default $api;

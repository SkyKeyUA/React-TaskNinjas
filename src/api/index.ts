/** @format */

import axios, { AxiosRequestConfig } from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

const $api = axios.create({
  withCredentials: true,
  baseURL,
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = window.localStorage.getItem('token');
  if (token !== null && config.headers) {
    config.headers.Authorization = token;
  }

  return config;
});

export default $api;

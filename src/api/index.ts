/** @format */

import axios, { AxiosRequestConfig } from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

const $api = axios.create({
  baseURL,
});

// We save the token to our localStorage for later use
$api.interceptors.request.use((config: AxiosRequestConfig) => {
  //config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  //return config;

  const token = window.localStorage.getItem('token');
  if (token !== null && config.headers) {
    config.headers.Authorization = token;
  }
  return config;
});

$api.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default $api;

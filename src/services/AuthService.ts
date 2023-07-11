/** @format */

import { AxiosResponse } from 'axios';
import $api from '../api';
import { AuthResponse } from '../redux/auth/type';

class AuthService {
  static async login(user: {
    email: string;
    password: string;
  }): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('auth/login', user);
  }
  static async registration(user: {
    email: string;
    password: string;
  }): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('auth/registration', user);
  }
  static async logout(): Promise<void> {
    return $api.post('auth/logout');
  }
  static async auth(): Promise<AxiosResponse<AuthResponse>> {
    return $api.get<AuthResponse>('auth/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }
}

export { AuthService };

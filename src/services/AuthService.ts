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
  static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('auth/registration', { email, password });
  }
  static async logout(): Promise<void> {
    return $api.post('/logout');
  }
}

export { AuthService };

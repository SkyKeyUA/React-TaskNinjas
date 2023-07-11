/** @format */

import { AxiosResponse } from 'axios';
import $api from '../api';
import { Auth } from '../redux/auth/type';

class UserService {
  static fetchUsers(): Promise<AxiosResponse<Auth[]>> {
    return $api.get<Auth[]>('auth/users');
  }
}

export { UserService };

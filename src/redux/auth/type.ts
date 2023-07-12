/** @format */

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type Auth = {
  avatarUrl: string;
  createdAt: string;
  email: string;
  fullName: string;
  id: string;
  isActivated: boolean;
};

export interface AuthSliceState {
  data: Auth | null;
  statusAuth: Status;
  isAuth: boolean;
}
export interface AuthResponse extends Auth {
  accessToken: string;
  refreshToken: string;
  userDto: Auth;
}

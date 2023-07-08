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
  _id: string;
  isActivated: boolean;
};

export interface AuthSliceState {
  data: Auth | null;
  statusAuth: Status;
  isAuth: boolean;
}
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: Auth;
}

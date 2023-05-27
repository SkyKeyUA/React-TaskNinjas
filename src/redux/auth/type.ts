/** @format */

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type Auth = {
  userData: {
    avatarUrl: string;
    createdAt: string;
    email: string;
    fullName: string;
    _id: string;
  };
};

export interface AuthSliceState {
  data: Auth | null;
  statusAuth: Status;
}

/** @format */

import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
// import filterSlice from './filter/slice';
import postsSlice from './posts/slice';
import authSlice from './auth/slice';

export const store = configureStore({
  reducer: {
    //  filterSlice,
    posts: postsSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

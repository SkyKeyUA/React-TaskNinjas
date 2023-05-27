/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { Posts } from './type';

export const fetchPosts = createAsyncThunk<Posts[]>('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id: string) => {
  await axios.delete(`/posts/${id}`);
  return id;
});

/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api';
import { PostsPages, SearchPostsParams } from './type';

export const fetchPostsPages = createAsyncThunk<PostsPages, SearchPostsParams>(
  'posts/fetchPostsPages',
  async (params) => {
    const { currentPage } = params;
    const { data } = await axios.get<PostsPages>(`/posts?page=${currentPage}&limit=5`);
    return data;
  },
);

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id: string) => {
  await axios.delete(`/posts/${id}`);
  return id;
});

/** @format */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchPostsPages, fetchRemovePost } from './asyncActions';
import { Posts, PostsSliceState, Status } from './type';

const initialState: PostsSliceState = {
  posts: [],
  statusPosts: Status.LOADING,
  totalPages: 0,
  currentPage: 0,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Posts[]>) {
      state.posts = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostsPages.pending, (state) => {
      state.posts = [];
      state.statusPosts = Status.LOADING;
    });
    builder.addCase(fetchPostsPages.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.statusPosts = Status.SUCCESS;
    });
    builder.addCase(fetchPostsPages.rejected, (state) => {
      state.posts = [];
      state.statusPosts = Status.ERROR;
      console.log('Was Error');
    });
    builder.addCase(fetchRemovePost.pending, (state, action) => {
      state.posts = state.posts.filter((obj) => obj._id !== action.meta.arg);
    });
  },
});

export const { setPosts, setTotalPages, setCurrentPage } = postsSlice.actions;

export default postsSlice.reducer;

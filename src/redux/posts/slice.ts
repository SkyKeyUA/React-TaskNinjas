/** @format */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchPostsPages, fetchRemovePost } from './asyncActions';
import { Posts, PostsSliceState, Status } from './type';

const initialState: PostsSliceState = {
  posts: [],
  statusPosts: Status.LOADING,
  totalPages: 1,
  currentPage: 1,
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
    //  builder.addCase(fetchPosts.pending, (state) => {
    //    state.posts = [];
    //    state.statusPosts = Status.LOADING;
    //    console.log('The data is sending');
    //  });
    //  builder.addCase(fetchPosts.fulfilled, (state, action) => {
    //    state.posts = action.payload;
    //    state.statusPosts = Status.SUCCESS;
    //    console.log(state, 'All Good');
    //  });
    //  builder.addCase(fetchPosts.rejected, (state) => {
    //    state.posts = [];
    //    state.statusPosts = Status.ERROR;
    //    console.log('Was Error');
    //  });
    builder.addCase(fetchPostsPages.pending, (state) => {
      state.posts = [];
      state.statusPosts = Status.LOADING;
      console.log('The data is sending');
    });
    builder.addCase(fetchPostsPages.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.statusPosts = Status.SUCCESS;
      console.log(state, 'All Good');
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

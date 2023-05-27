/** @format */
import { createSlice } from '@reduxjs/toolkit';
import { fetchAuth, fetchAuthMe, fetchRegister } from './asyncActions';
import { AuthSliceState, Status } from './type';

const initialState: AuthSliceState = {
  data: null,
  statusAuth: Status.LOADING,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.data = null;
      state.statusAuth = Status.LOADING;
      console.log('The data is sending');
    });
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.data = action.payload;
      state.statusAuth = Status.SUCCESS;
      console.log(state, 'All Good');
    });
    builder.addCase(fetchAuth.rejected, (state) => {
      state.data = null;
      state.statusAuth = Status.ERROR;
      console.log('Was Error');
    });
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.data = null;
      state.statusAuth = Status.LOADING;
      console.log('The data is sending');
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.data = action.payload;
      state.statusAuth = Status.SUCCESS;
      console.log(state, 'All Good');
    });
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.data = null;
      state.statusAuth = Status.ERROR;
      console.log('Was Error');
    });
    builder.addCase(fetchRegister.pending, (state) => {
      state.data = null;
      state.statusAuth = Status.LOADING;
      console.log('The data is sending');
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.data = action.payload;
      state.statusAuth = Status.SUCCESS;
      console.log(state, 'All Good');
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.data = null;
      state.statusAuth = Status.ERROR;
      console.log('Was Error');
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

/** @format */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAuth, fetchAuthMe, fetchRegister } from './asyncActions';
import { Auth, AuthSliceState, Status } from './type';

const initialState: AuthSliceState = {
  data: null,
  statusAuth: Status.LOADING,
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.data = null;
      state.isAuth = false;
    },
    setUser: (state, action: PayloadAction<Auth | null>) => {
      state.data = action.payload;
      state.isAuth = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.data = null;
      state.statusAuth = Status.LOADING;
    });
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.data = action.payload;
      state.statusAuth = Status.SUCCESS;
      state.isAuth = true;
    });
    builder.addCase(fetchAuth.rejected, (state) => {
      state.data = null;
      state.statusAuth = Status.ERROR;
      console.log('There was an error');
    });
    builder.addCase(fetchRegister.pending, (state) => {
      state.data = null;
      state.statusAuth = Status.LOADING;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.data = action.payload;
      state.statusAuth = Status.SUCCESS;
      state.isAuth = true;
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.data = null;
      state.statusAuth = Status.ERROR;
      console.log('There was an error');
    });
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.data = null;
      state.statusAuth = Status.LOADING;
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.data = action.payload;
      state.statusAuth = Status.SUCCESS;
      state.isAuth = true;
    });
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.data = null;
      state.statusAuth = Status.ERROR;
      console.log('There was an error');
    });
  },
});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;

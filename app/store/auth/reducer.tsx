import { createSlice } from '@reduxjs/toolkit';
import { signup, login } from './actions';
import { IAuthState } from '@/app/types';

const initialState: IAuthState = {
  user: null,
  error: null,
  token: null,
  refresh: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = null;
      state.refresh = null;
      state.user = null;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = String(action.payload);
      })

      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.refresh = action.payload.refreshToken;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = String(action.payload);
      });
  },
});

export const { logOut, setError } = authSlice.actions;

export default authSlice.reducer;

// actions.tsx is for async actions
import { createAsyncThunk } from '@reduxjs/toolkit';

import { axiosClient } from '@/utils/axios';
import { ICreateUser } from '@/app/types';

export const loginData = {
  email: process.env.EXPO_PUBLIC_EMAIL || '',
  password: process.env.EXPO_PUBLIC_PASS || '',
}

export const signup = createAsyncThunk(
  'auth/signup',
  async function (user: ICreateUser, { rejectWithValue }) {
    const url = `auth/signup`;
    try {
      const response = await axiosClient.post(url, user = loginData);
      return response.data;
    } catch (err) {
      console.log('Something went wrong ->', err);
      return rejectWithValue(err);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async function (user: ICreateUser, { rejectWithValue }) {
    const url = `auth/login`;
    try {
      const response = await axiosClient.post(url, user = loginData);
      return response.data;
    } catch (err) {
      console.log('Something went wrong ->', err);
      return rejectWithValue('Invalid email or password');
    }
  }
);

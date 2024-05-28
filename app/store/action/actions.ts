// actions.tsx is for async actions
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '@/utils/axios';
import { IAction } from '@/app/types';
const url = `action`;

export const createAction = createAsyncThunk(
  'action/create',
  async function (action: IAction, { rejectWithValue }) {
    try {
      const response = await axiosClient.post(url, action);
      return response.data;
    } catch (err) {
      console.log('Something went wrong ->', err);
      return rejectWithValue(err);
    }
  }
);

export const deleteAction = createAsyncThunk(
  'action/delete',
  async function (id: number, { rejectWithValue }) {
    const url = `action`;

    try {
      await axiosClient.delete(url, { data: { id: id } });
      return id;
    } catch (err) {
      console.log('Something went wrong ->', err);
      return rejectWithValue(err);
    }
  }
);

export const editAction = createAsyncThunk(
  'action/edit',
  async function (action: IAction, { rejectWithValue }) {
    const url = `action`;
    try {
      await axiosClient.put(url, action);
      return action;
    } catch (err) {
      console.log('Something went wrong ->', err);
      return rejectWithValue(err);
    }
  }
);

export const getActions = createAsyncThunk(
  'action/getAll',
  async function (categoryId: string, { rejectWithValue }) {
    if (categoryId) {
      const url = `action?catId=${categoryId}`;
      try {
        const response = await axiosClient.get(url);
        return response.data;
      } catch (err) {
        console.log('Something went wrong ->', err);
        return rejectWithValue(err);
      }
    }
  }
);



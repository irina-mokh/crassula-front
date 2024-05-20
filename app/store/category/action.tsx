import { createAsyncThunk } from '@reduxjs/toolkit';
import { AnyAction } from '@reduxjs/toolkit';

import { ICategory, ICreateCategory } from '@/app/types';
import { axiosClient } from '@/utils/axios';

const url = `category`;

export const createCategory = createAsyncThunk(
  'category/create',
  async function (category: ICreateCategory, { rejectWithValue }) {
    try {
      const response = await axiosClient.post(url, category);
      return response.data;
    } catch (err) {
      console.log('Something went wrong ->', err);
      return rejectWithValue(err);
    }
  }
);

export const editCategory = createAsyncThunk(
  'category/edit',
  async function (cat: ICategory, { rejectWithValue }) {
    try {
      await axiosClient.put(url, cat);
      return cat;
    } catch (err) {
      console.log('Something went wrong ->', err);
      return rejectWithValue(err);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'category/delete',
  async function (id: number, { rejectWithValue, dispatch }) {

    // delete all actions inside category
    // const response: AnyAction = await dispatch(getActions(id));
    // const actions = response.payload.data;
    // actions.forEach((action: IAction) => {
    //   if (action.id) {
    //     dispatch(deleteAction(action.id));
    //   }
    // });

    try {
      await axiosClient.delete(url, { data: { id: id } });
      return id;
    } catch (err) {
      console.log('Something went wrong ->', err);
      return rejectWithValue(err);
    }
  }
);

export const getAllCategories = createAsyncThunk(
  'category/getAll',
  async function (userId: number, { rejectWithValue }) {
    try {
      const response = await axiosClient.get(`category?userId=${userId}`);
      return response.data;
    } catch (err) {
      console.log('Something went wrong ->', err);
      return rejectWithValue(err);
    }
  }
);

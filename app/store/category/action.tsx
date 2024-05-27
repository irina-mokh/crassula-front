import { createAsyncThunk } from '@reduxjs/toolkit';
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

export const getCategory = createAsyncThunk(
  'category/get',
  async function (id: string, { rejectWithValue }) {
    try {
      const response = await axiosClient.get(`category/${id}`);
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
  async function (id: string, { rejectWithValue }) {
    try {
      await axiosClient.delete(url+'/'+id);
      return id;
    } catch (err) {
      console.log('Something went wrong ->', err);
      return rejectWithValue(err);
    }
  }
);

export const getAllCategories = createAsyncThunk(
  'category/getAll',
  async function (userId: string, { rejectWithValue }) {
    try {
      const response = await axiosClient.get(`category?userId=${userId}`);
      return response.data;
    } catch (err) {
      console.log('Something went wrong ->', err);
      return rejectWithValue(err);
    }
  }
);

import { createSlice } from '@reduxjs/toolkit';
import { ICategoryState } from '@/app/types';
import { createCategory, getAllCategories } from './action';

const initialState: ICategoryState = {
  data: [],
  error: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setPeriod: (state, action) => {
      // state.period = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.fulfilled, (state, action)=> {
        state.data = [...action.payload];
      })

      .addCase(createCategory.fulfilled, (state, action)=> {
        state.data = [...state.data, action.payload];
      })
      .addCase(createCategory.rejected, (state, action)=> {
        state.error = String(action.payload);
      })
  }
    // 'category/getAll/pending': (state) => {
    //   state.isLoading = true;
    //   state.error = null;
    // },
    // 'category/getAll/fulfilled': (state, action) => {
    //   state.categories = action.payload;
    //   state.error = null;
    //   state.isLoading = false;
    // },
    // 'category/getAll/rejected': (state, action) => {
    //   state.error = String(action.payload);
    //   state.isLoading = false;
    // },

    // 'main/createCategory/fulfilled': (state, action) => {
      
    // },

    // 'main/deleteCategory/fulfilled': (state, { payload: id }) => {
    //   const { data } = state;
    //   state.data = [...data.filter((item) => item.id !== id)];
    // },
    // 'main/editCategory/fulfilled': (state, action) => {
    //   const index = state.data.findIndex((item) => item.id == action.payload.id);
    //   state.data[index] = { ...action.payload };
    // },
});

export const { setPeriod } = categorySlice.actions;

export default categorySlice.reducer;

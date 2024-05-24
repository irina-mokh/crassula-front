import { createSlice } from '@reduxjs/toolkit';
import { ICategoryState } from '@/app/types';
import { createCategory, deleteCategory, getAllCategories } from './action';

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

      .addCase(deleteCategory.fulfilled, (state, action)=> {
        const { data } = state;
        state.data = [...data.filter((item) => item.id !== action.payload)];
      })
      .addCase(deleteCategory.rejected, (state, action)=> {
        state.error = String(action.payload);
      })
  }

    // 'main/editCategory/fulfilled': (state, action) => {
    //   const index = state.data.findIndex((item) => item.id == action.payload.id);
    //   state.data[index] = { ...action.payload };
    // },
});

export const { setPeriod } = categorySlice.actions;

export default categorySlice.reducer;

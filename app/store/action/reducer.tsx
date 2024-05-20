import { createSlice } from '@reduxjs/toolkit';
import { IActionState } from '@/app/types';
import { createAction } from './actions';

const initialState: IActionState = {
  data: [],
  error: null,
};

export const actionSlice = createSlice({
  name: 'action',
  initialState,
  reducers: {
    setError: (state, { payload }) => {
      // state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAction.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(createAction.rejected, (state, action) => {
        state.error = String(action.payload);
      })

  },
});

export const { setError } = actionSlice.actions;

export default actionSlice.reducer;

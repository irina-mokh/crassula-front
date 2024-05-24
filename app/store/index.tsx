import { configureStore, ThunkAction, Action, ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { combineReducers, Reducer, Store } from 'redux';

import auth from './auth/reducer';
import action from './action/reducer';
import category from './category/reducer';
import { IStore } from '../types';

const reducer: Reducer<IStore> = combineReducers({
  category,
  auth,
  action,
});

export const store = configureStore({
  reducer
});


export type AppDispatch = typeof store.dispatch;
export type RootReducer = ReturnType<typeof reducer>;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppThunkDispatch = ThunkDispatch<IStore, void, AnyAction>;

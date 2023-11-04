import { configureStore } from '@reduxjs/toolkit';

import { useDispatch } from 'react-redux';
import itemSlice from './itemSlice';

export const store = configureStore({
  reducer: { itemSlice },
});
export type RootType = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const UseAppDispatch = () => useDispatch<AppDispatch>();

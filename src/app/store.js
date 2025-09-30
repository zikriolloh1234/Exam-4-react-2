import { configureStore } from '@reduxjs/toolkit';

import itemSlice from '../features/api'

export const store = configureStore({
  reducer: {
    items: itemSlice,
  },
});


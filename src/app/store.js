import { configureStore } from '@reduxjs/toolkit';

import itemSlice from '../features/api'
import { itemsUsers } from '../features/api';
import { itemsBrands } from '../features/api';
import { itemsCategory } from '../features/api';

export const store = configureStore({
  reducer: {
    items: itemSlice,
    users: itemsUsers.reducer,
    brands: itemsBrands.reducer,
    category: itemsCategory.reducer,
  },
});


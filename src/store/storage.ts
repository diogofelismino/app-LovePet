import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './loading/loading';

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
  },
});

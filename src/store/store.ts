import { configureStore } from '@reduxjs/toolkit';
import consultantsReducer from './consultantsSlice';

export const store = configureStore({
  reducer: {
    consultants: consultantsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
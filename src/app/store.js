import { configureStore } from '@reduxjs/toolkit';
import basketReducer from '../features/basket/basketSlice';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    basket: basketReducer,
  },
});

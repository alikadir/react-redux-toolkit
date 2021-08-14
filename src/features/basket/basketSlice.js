import { createSelector, createSlice } from '@reduxjs/toolkit';
import { authCurrentUserSelector } from '../auth/authSlice';

/** @type {{productList: [{price: number}]}} */
const initialState = {
  productList: [
    { id: 1, name: 'Apple Watch', price: 4599.99 },
    { id: 2, name: 'iMac', price: 24399.5 },
    { id: 3, name: 'MacBook', price: 18499.99 },
  ],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    add: (state, action) => {
      state.productList.push(action.payload);
    },
    remove: (state, action) => {
      state.productList = state.productList.filter((i) => i.id !== action.payload);
    },
  },
});

export const basketProductsSelector = (state) => state.basket.productList;

export const subtotalSelector = createSelector(basketProductsSelector, (list) =>
  list.reduce((previousValue, currentValue) => previousValue + currentValue.price, 0)
);
export const totalSelector = createSelector(
  subtotalSelector,
  authCurrentUserSelector,
  (subtotal, currentUser) => subtotal - (subtotal / 100) * currentUser.extraDiscountPercent
);

export const { add, remove } = basketSlice.actions;

export default basketSlice.reducer;

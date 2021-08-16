import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { authCurrentUserSelector } from '../auth/authSlice';

/** @type {{productList: [{price: number}]}} */
const initialState = {
  productList: [
    { id: 1, name: 'Apple Watch', price: 4599.99 },
    { id: 2, name: 'iMac', price: 24399.5 },
    { id: 3, name: 'MacBook', price: 18499.99 },
  ],
  isLoading: false,
  error: null,
};

export const checkStockAndAddBasket = createAsyncThunk(
  'basket/checkStockAndAddBasket',
  async (product, thunkAPI) => {
    const rootState = thunkAPI.getState();
    const dispatch = thunkAPI.dispatch;
    const userId = rootState.auth.currentUser.id;

    const randomServerResult = await new Promise((resolve) =>
      setTimeout(() => resolve((Math.random() * 100).toFixed(0)), 3000)
    );

    if (randomServerResult % 2 === 0) {
      dispatch(add(product));
    } else {
      throw 'there is no this product in stock right now';
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(checkStockAndAddBasket.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkStockAndAddBasket.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(checkStockAndAddBasket.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
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

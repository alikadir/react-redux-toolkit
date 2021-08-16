import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: { id: 12345, name: 'Ali Kadir', extraDiscountPercent: 5 },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeExtraDiscountPercent: (state, action) => {
      state.currentUser.extraDiscountPercent = action.payload;
    },
  },
});

export const authCurrentUserSelector = (state) => state.auth.currentUser;

export const { changeExtraDiscountPercent } = authSlice.actions;

export default authSlice.reducer;

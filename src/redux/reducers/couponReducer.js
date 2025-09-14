import { createSlice } from "@reduxjs/toolkit";

const couponSlice = createSlice({
  name: "coupons",
  initialState: {
    coupons: [],
    loading: true,
  },
  reducers: {
    setCoupons: (state, action) => {
      return { ...state, coupons: action.payload, loading: false };
    },
  },
});

export const { setCoupons } = couponSlice.actions;
export default couponSlice.reducer;

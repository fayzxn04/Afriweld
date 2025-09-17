import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: true,
  },
  reducers: {
    setOrders: (state, action) => {
      return { ...state, orders: action.payload, loading: false };
    },
  },
});

export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: true,
  },
  reducers: {
    setProducts: (state, action) => {
      return { ...state, products: action.payload, loading: false };
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;

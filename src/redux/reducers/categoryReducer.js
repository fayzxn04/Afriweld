import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: true,
  },
  reducers: {
    setCategories: (state, action) => {
      return { ...state, categories: action.payload, loading: false };
    },
  },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const bannerSlice = createSlice({
  name: "banners",
  initialState: {
    banners: [],
    loading: true,
  },
  reducers: {
    setBanners: (state, action) => {
      return { ...state, banners: action.payload, loading: false };
    },
  },
});

export const { setBanners } = bannerSlice.actions;
export default bannerSlice.reducer;

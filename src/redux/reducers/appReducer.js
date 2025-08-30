import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    user: null,
  },
  reducers: {
    setAppUser: (state, action) => {
      return { ...state, user: action.payload };
    },
  },
});

export const { setAppUser } = appSlice.actions;
export default appSlice.reducer;

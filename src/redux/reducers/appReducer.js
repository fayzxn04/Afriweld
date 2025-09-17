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

    signOut: (state) => {
      state.user = null;
    },
  },
});

export const { setAppUser, signOut } = appSlice.actions;
export default appSlice.reducer;

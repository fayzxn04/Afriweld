import { createSlice } from "@reduxjs/toolkit";

const portalUserSlice = createSlice({
  name: "portalUsers",
  initialState: {
    portalUsers: [],
    loading: true,
  },
  reducers: {
    setPortalUsers: (state, action) => {
      return { ...state, portalUsers: action.payload, loading: false };
    },
  },
});

export const { setPortalUsers } = portalUserSlice.actions;
export default portalUserSlice.reducer;

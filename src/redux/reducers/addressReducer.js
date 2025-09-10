import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "addresses",
  initialState: {
    addresses: [],
    loading: true,
  },
  reducers: {
    setAddresses: (state, action) => {
      return { ...state, addresses: action.payload, loading: false };
    },
  },
});

export const { setAddresses } = addressSlice.actions;
export default addressSlice.reducer;

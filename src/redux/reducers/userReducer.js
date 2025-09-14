import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: true,
  },
  reducers: {
    setUsers: (state, action) => {
      return { ...state, users: action.payload, loading: false };
    },
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;

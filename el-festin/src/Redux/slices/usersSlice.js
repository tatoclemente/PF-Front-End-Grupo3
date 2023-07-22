import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    getAllUsers: (state, action) => {
      state.users = action.payload;
    },
    postUser: (state, action) => {
      state.users.push(action.payload);
    },
  },
});

export const { getAllUsers, postUser } = userSlice.actions;

export default userSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    stateFood: 'all'
  },
  reducers: {
    getAllUsers: (state, action) => {
      state.users = action.payload;
    },
    postUser: (state, action) => {
      state.users.push(action.payload);
    }, setStateFood: (state, action) =>{
      state.stateFood = action.payload
    }
  },
});

export const { getAllUsers, postUser, setStateFood } = userSlice.actions;

export default userSlice.reducer;


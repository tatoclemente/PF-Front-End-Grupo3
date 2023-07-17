import { createSlice } from "@reduxjs/toolkit";

export const sideSlice = createSlice({
  name: "sides",
  initialState: {
    sides: [],
  },
  reducers: {
    setSides: (state, action) => {
      state.sides = action.payload;
    },
  },
});

export const { setSides } = sideSlice.actions;

export default sideSlice.reducer;

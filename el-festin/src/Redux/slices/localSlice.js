import { createSlice } from "@reduxjs/toolkit";

export const localSlice = createSlice({
  name: "local",
  initialState: {
    locals: [],
  },
  reducers: {
    getAllLocal: (state, action) => {
      state.locals = action.payload;
    },
  },
});

export const { getAllLocal } = localSlice.actions;

export default localSlice.reducer;

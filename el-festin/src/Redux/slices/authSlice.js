// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //estado de autenticacion del usuario
  user: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoading = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;

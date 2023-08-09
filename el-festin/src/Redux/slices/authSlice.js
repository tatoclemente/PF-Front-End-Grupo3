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
      const user = {
        displayName: action.payload.displayName,
        email: action.payload.email,
        photoURL: action.payload.photoURL,
      }
      state.user = user;
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

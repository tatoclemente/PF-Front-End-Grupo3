import { createSlice } from "@reduxjs/toolkit";

export const reservationSlice = createSlice({
  name: "reservation",
  initialState: {
    reservations: [],
  },
  reducers: {
    getAllReservation: (state, action) => {
      state.reservations = action.payload;
    },
  },
});

export const { getAllReservation } = reservationSlice.actions;

export default reservationSlice.reducer;

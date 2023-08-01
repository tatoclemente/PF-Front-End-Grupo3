import { createSlice } from "@reduxjs/toolkit";

export const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    banners: [],
  },
  reducers: {
    getAllBanners: (state, action) => {
      state.banners = action.payload;
    },
  },
});

export const { getAllBanners } = bannerSlice.actions;

export default bannerSlice.reducer;

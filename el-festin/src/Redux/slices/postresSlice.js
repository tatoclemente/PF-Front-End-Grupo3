import { createSlice } from "@reduxjs/toolkit";

export const dessertSlice = createSlice({
name: "desserts",
initialState:{
    desserts: [],
    dessertsFilter: [],
},
reducers:{
    setDesserts: (state, action) => {
        state.desserts = action.payload
    }
}

});

export const { setDesserts } = dessertSlice.actions;

export default dessertSlice.reducer;

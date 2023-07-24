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
    }, filterDessertsByName: (state, {payload}) =>{
        
        state.desserts = []
    }

}

});

export const { setDesserts, filterDessertsByName } = dessertSlice.actions;

export default dessertSlice.reducer;

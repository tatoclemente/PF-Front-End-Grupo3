import { createSlice } from "@reduxjs/toolkit";

export const drinkSlice = createSlice({
name: "drink",
initialState:{
    drinks: [],
    drinksFilter: [],
},
reducers:{
    setDrinks: (state, action) => {
        state.drinks = action.payload
    }
}

});

export const { setDrinks } = drinkSlice.actions;

export default drinkSlice.reducer;

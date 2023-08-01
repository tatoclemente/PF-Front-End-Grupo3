import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    datesMoney: 0,
    selledDishes: []
}

const adminSlice = createSlice({
    name: 'admin-dates',
    initialState,
    reducers:{
        setDatesFromAction: (state, action) => {
            let datesM = action.payload
            
            state.datesMoney += parseInt(datesM);
            console.log(state.datesMoney)
        },
        setDatesDishes: (state, action) =>{
            state.selledDishes = action.payload
        }
    }

})

export const {setDatesFromAction, setDatesDishes} = adminSlice.actions

export default adminSlice.reducer
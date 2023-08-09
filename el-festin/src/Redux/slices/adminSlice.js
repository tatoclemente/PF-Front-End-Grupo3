import { createSlice } from "@reduxjs/toolkit";


const adminSlice = createSlice({
    name: 'admin',
    initialState: {
   
        selledDishes: [],
    },
    reducers:{
        setDatesDishes: (state, action) =>{
            state.selledDishes = action.payload
        }
    }

})

export const {setDatesFromAction, setDatesDishes} = adminSlice.actions

export default adminSlice.reducer
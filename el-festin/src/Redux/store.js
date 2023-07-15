import { configureStore } from "@reduxjs/toolkit";
import dishesSlice from './slices/platosSlice'


export default configureStore ({
    reducer:{
        dishes: dishesSlice,
    }
}) 



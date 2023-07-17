import { configureStore } from "@reduxjs/toolkit";
import dishesSlice from './slices/platosSlice'
import  drinkSlice  from "./slices/bebidasSlice";


export default configureStore ({
    reducer:{
        dishes: dishesSlice,
        drinks: drinkSlice
    }
}) 



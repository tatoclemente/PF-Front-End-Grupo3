import { configureStore } from "@reduxjs/toolkit";
import dishesSlice from './slices/platosSlice'
import drinkSlice  from "./slices/bebidasSlice";
import dessertSlice from "./slices/postresSlice";


export default configureStore ({
    reducer:{
        dishes: dishesSlice,
        drinks: drinkSlice,
        desserts: dessertSlice,
    }
}) 



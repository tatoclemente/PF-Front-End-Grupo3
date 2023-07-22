import { configureStore, combineReducers } from "@reduxjs/toolkit";
import dishesSlice from './slices/platosSlice'
import drinkSlice  from "./slices/bebidasSlice";
import dessertSlice from "./slices/postresSlice";
import sideSlice from "./slices/sideSlice";
import usersSlice from "./slices/usersSlice";

const reducer = combineReducers({
    dishes: dishesSlice,
        drinks: drinkSlice,
        desserts: dessertSlice,
        sides: sideSlice,
        users: usersSlice
})


export default configureStore ({
    reducer
}) 



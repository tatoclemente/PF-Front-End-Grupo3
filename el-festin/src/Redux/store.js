import { configureStore } from "@reduxjs/toolkit";
import dishesSlice from './slices/platosSlice'
import drinkSlice  from "./slices/bebidasSlice";
import dessertSlice from "./slices/postresSlice";
import sideSlice from "./slices/sideSlice";
import usersSlice from "./slices/usersSlice";
import orderSlice, { cartMiddleware } from "./slices/orderSlice";


export default configureStore ({
    reducer:{
        dishes: dishesSlice,
        drinks: drinkSlice,
        desserts: dessertSlice,
        sides: sideSlice,
        users: usersSlice,
        cart: orderSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cartMiddleware),
}) 



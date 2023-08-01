import { configureStore, combineReducers } from "@reduxjs/toolkit";
import dishesSlice from "./slices/platosSlice";
import drinkSlice from "./slices/bebidasSlice";
import dessertSlice from "./slices/postresSlice";
import sideSlice from "./slices/sideSlice";
import usersSlice from "./slices/usersSlice";
import authSlice from "./slices/authSlice";
import orderSlice, { cartMiddleware } from "./slices/orderSlice";
import bannerSlice from "./slices/bannerSlice";
import localSlice from "./slices/localSlice";

const reducer = combineReducers({
  dishes: dishesSlice,
  drinks: drinkSlice,
  desserts: dessertSlice,
  sides: sideSlice,
  users: usersSlice,
  cart: orderSlice,
  auth: authSlice,
  banner: bannerSlice,
  local: localSlice,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cartMiddleware),
});

const customizedMiddleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(cartMiddleware);

const store = configureStore({
  reducer: reducer,
  middleware: customizedMiddleware,
});

export default store;

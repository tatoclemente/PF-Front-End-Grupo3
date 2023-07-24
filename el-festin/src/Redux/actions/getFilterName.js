import axios from "axios";
import  {filterDishesByName}  from "../slices/platosSlice";
import {filterDessertsByName } from "../slices/postresSlice";
import {filterDrinksByName } from "../slices/bebidasSlice";
import { server } from "../../Helpers/EndPoint";

export const getFilterName = (input) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${server}/dish?name=${input}`);
    // const dataDish = data.filter(d => d.description)
    // const dataDrink = data.filter(d => d.volume)
    // const dataDesert = data.filter((d) => !d.description && !d.volume)
      dispatch(filterDishesByName(data))
      dispatch(filterDessertsByName())
      dispatch(filterDrinksByName())
    
    
   
  } catch (error) {
    throw new Error(error);
  }
};

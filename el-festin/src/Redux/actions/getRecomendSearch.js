import axios from "axios";
import { recomenderDish } from "../slices/platosSlice";
import { server } from "../../Helpers/EndPoint";

export const getRecomendName = (input) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${server}/dish?name=${input}`);
    // const dataDish = data.filter(d => d.description)
    // const dataDrink = data.filter(d => d.volume)
    // const dataDesert = data.filter((d) => !d.description && !d.volume)
      dispatch(recomenderDish(data))
    
   
  } catch (error) {
    throw new Error(error);
  }
};

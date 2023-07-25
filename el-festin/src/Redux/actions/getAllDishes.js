import { server } from "../../Helpers/EndPoint";
import { getAllDishes } from "../slices/platosSlice";
import axios from "axios";

export const getDishes = () => async (dispatch) => {
    try {
      const { data } = await axios.get(`${server}/dish`);
      dispatch(getAllDishes(data));
    } catch (error) {
      console.log(error.message);
    }
  };
    
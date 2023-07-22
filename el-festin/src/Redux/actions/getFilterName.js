import axios from "axios";
import  {filterDishesByName}  from "../slices/platosSlice";
import { server } from "../../Helpers/EndPoint";

export const getFilterName = (input) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${server}/dish?name=${input}`);
    dispatch(filterDishesByName(data));
  } catch (error) {
    throw new Error(error);
  }
};

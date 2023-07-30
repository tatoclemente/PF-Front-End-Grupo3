import { server } from "../../../Helpers/EndPoint";
import { getAllLocal } from "../../slices/localSlice";
import axios from "axios";

export const getLocal = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${server}/local`);
    dispatch(getAllLocal(data));
  } catch (error) {
    console.log(error);
  }
};

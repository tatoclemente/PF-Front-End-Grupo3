import { server } from "../../../Helpers/EndPoint";
import { getAllBanners } from "../../slices/bannerSlice";
import axios from "axios";

export const getBanners = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${server}/banner`);
    dispatch(getAllBanners(data));
  } catch (error) {
    console.log(error);
  }
};

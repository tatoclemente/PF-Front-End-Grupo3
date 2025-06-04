import { server } from "../../../Helpers/EndPoint";
import { getAllBanners } from "../../slices/bannerSlice";
import axios from "axios";

export const getBanners = () => async (dispatch) => {
  try {
    let { data } = await axios.get(`${server}/banner`);
    if (!data || data.error) {
      data = []
    };
    dispatch(getAllBanners(data));
  } catch (error) {
    console.log(error);
  }
};

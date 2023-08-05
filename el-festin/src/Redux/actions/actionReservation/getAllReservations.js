import { server } from "../../../Helpers/EndPoint";
import { getAllReservation } from "../../slices/reservationSlice";
import axios from "axios";

export const getReservation = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${server}/reser`);
    dispatch(getAllReservation(data));
  } catch (error) {
    console.log(error);
  }
};

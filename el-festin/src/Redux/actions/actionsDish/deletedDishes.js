import axios from "axios";
import {server} from '../../../Helpers/EndPoint'

export const deletedDishes = (id) => async (dispatch) => {
  try {
    const deleter = await axios.put(`${server}/`);
    
  } catch (error) {
    throw error;
  }
};

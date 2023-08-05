import { server } from "../../../Helpers/EndPoint";
import {setDatesDishes} from '../../slices/adminSlice'
import axios from "axios";

export const getDishesDates = () => async (dispatch) => {
    try {
      const { data } = await axios.get(`${server}/dish`);

      let FilteredData = data.map((t) => {return{name: t.name, 'CantidadVendida': t.salesCount, id: t.id }})
      console.log(FilteredData)
      dispatch(setDatesDishes(FilteredData));
    } catch (error) {
      console.log(error.message);
    }
  };
    
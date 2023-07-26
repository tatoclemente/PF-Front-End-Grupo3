import { server } from "../../../Helpers/EndPoint";
import { getDrinksTypes } from "../../slices/bebidasSlice";
import axios from "axios";

export const getDrTypes = () => async (dispatch) => {
    try {
        const {data} = await axios.get(`${server}/drink`);
        const drinksTypes = data.map((a) => a.type);
      let resultado = drinksTypes.reduce((a, e) => {
          if(!a.find(d => d === e)) a.push(e)
          return a
        }, [])
      dispatch(getDrinksTypes(resultado));
    } catch (error) {
        console.log(error);
    }

}
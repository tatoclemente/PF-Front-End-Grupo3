import { getDrinksTypes } from "../../slices/bebidasSlice";
import axios from "axios";

export const getDrinkTypes = () => async (dispatch) => {
    try {
        const {data} = await axios.get('https://pf-server-production.up.railway.app/drink');
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
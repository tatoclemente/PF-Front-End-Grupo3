import {getAllDishesTypes } from '../slices/platosSlice'
import axios from 'axios';

export const getTypes = () => async (dispatch) => {

    try {
      const { data } = await axios.get("http://pf-server-production.up.railway.app/dish");
      const dishTypes = data.map((a) => a.subtype);
      let resultado = dishTypes.reduce((a, e) => {
          if(!a.find(d => d === e)) a.push(e)
          return a
        }, [])
      dispatch(getAllDishesTypes(resultado));
    } catch (error) {
      console.log(error.message);
    }
  };


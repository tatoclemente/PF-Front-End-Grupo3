import {getAllDishesTypes } from '../slices/platosSlice'
import { dataDish } from '../../utils/mock'
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
  
export const getTypes = () => (dispatch) => {
    const dishTypes = dataDish.map((a) => a.subtype);
    let resultado = dishTypes.reduce((a, e) => {
        if(!a.find(d => d === e)) a.push(e)
        return a
      }, [])
      resultado = resultado.map((t, id) => {return{name: t, id: id++}})
      console.log(resultado)
    dispatch(getAllDishesTypes(resultado));

};


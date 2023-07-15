import {getAllDishesTypes } from '../slices/platosSlice'
import { dataDish } from '../../utils/mock'


export const getTypes = () => (dispatch) => {
    const dishTypes = dataDish.map((a) => a.subtype);
    let resultado = dishTypes.reduce((a, e) => {
        if(!a.find(d => d === e)) a.push(e)
        return a
      }, [])
    dispatch(getAllDishesTypes(resultado));

};


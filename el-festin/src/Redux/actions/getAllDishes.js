import { getAllDishes } from "../slices/platosSlice";
import { dataDish } from '../../utils/mock'

export const getDishes = ( ) => (dispatch) =>{
    const dishes = dataDish.map(a => a)
    dispatch(getAllDishes(dishes))
}

    



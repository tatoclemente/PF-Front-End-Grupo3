import { server } from '../../../Helpers/EndPoint';
import { setDrinks } from '../../slices/bebidasSlice';
import axios from 'axios';

export const getDrinks = () => async (dispatch) => {
    try {
        const {data} = await axios.get(`${server}/drink`);
        dispatch(setDrinks(data));
    } catch (error) {
        console.log(error);
    }

}
import { setDrinks } from '../../slices/bebidasSlice';
import axios from 'axios';

export const getDrinks = () => async (dispatch) => {
    try {
        const {data} = await axios.get('https://pf-server-production.up.railway.app/drink');
        dispatch(setDrinks(data));
    } catch (error) {
        console.log(error);
    }

}
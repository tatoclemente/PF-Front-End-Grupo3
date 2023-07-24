import { setDesserts } from '../../slices/postresSlice';
import axios from 'axios';

export const getDesserts = () => async (dispatch) => {
    try {
        const {data} = await axios.get('https://pf-server-production.up.railway.app/desert');
        dispatch(setDesserts(data));
    } catch (error) {
        console.log(error);
    }

}
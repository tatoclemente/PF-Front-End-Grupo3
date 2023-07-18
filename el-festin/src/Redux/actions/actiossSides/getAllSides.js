import { setSides } from '../../slices/sideSlice';
import axios from 'axios';

export const getSides = () => async (dispatch) => {
    try {
        const {data} = await axios.get('https://pf-server-production.up.railway.app/side');
        dispatch(setSides(data));
    } catch (error) {
        console.log(error);
    }

}
import { server } from '../../../Helpers/EndPoint';
import { setDesserts } from '../../slices/postresSlice';
import axios from 'axios';

export const getDesserts = () => async (dispatch) => {
    try {
        const {data} = await axios.get(`${server}/desert`);
        dispatch(setDesserts(data));
    } catch (error) {
        console.log(error);
    }

}
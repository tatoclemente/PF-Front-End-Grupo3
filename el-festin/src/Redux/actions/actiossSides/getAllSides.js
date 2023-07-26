import { server } from '../../../Helpers/EndPoint';
import { setSides } from '../../slices/sideSlice';
import axios from 'axios';

export const getSides = () => async (dispatch) => {
    try {
        const {data} = await axios.get(`${server}/side`);
        dispatch(setSides(data));
    } catch (error) {
        console.log(error);
    }

}
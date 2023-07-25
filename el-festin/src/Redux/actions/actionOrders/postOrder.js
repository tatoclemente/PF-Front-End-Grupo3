import { postOrder } from '../../slices/usersSlice';
import axios from 'axios';

export const postUsers = (order) => async (dispatch) => {
    try {
        const { data } = await axios.post('https://pf-server-production.up.railway.app/order', order);
        console.log(data);
        dispatch(postOrder(data));
    } catch (error) {
        console.log(error);
    }
}

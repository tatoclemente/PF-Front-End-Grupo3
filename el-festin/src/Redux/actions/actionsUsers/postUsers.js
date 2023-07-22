import { postUser } from '../../slices/usersSlice';
import axios from 'axios';

export const postUsers = (userData) => async (dispatch) => {
    try {
        const { data } = await axios.post('https://pf-server-production.up.railway.app/user', userData);
        console.log(data);
        dispatch(postUser(data));
    } catch (error) {
        console.log(error);
    }
}

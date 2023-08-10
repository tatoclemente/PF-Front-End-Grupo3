import { server } from '../../../Helpers/EndPoint';
import { postUser } from '../../slices/usersSlice';
import axios from 'axios';

export const postUsers = (userData) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${server}/user`, userData);
        dispatch(postUser(data));
    } catch (error) {
        console.log(error);
    }
}

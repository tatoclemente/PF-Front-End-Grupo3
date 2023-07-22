import { getAllUsers } from '../../slices/usersSlice';
import axios from 'axios';

export const getUsers = () => async (dispatch) => {
    try {
        const {data} = await axios.get('https://pf-server-production.up.railway.app/user');
        dispatch(getAllUsers(data));
    } catch (error) {
        console.log(error);
    }

}
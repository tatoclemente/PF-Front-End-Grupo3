import { server } from '../../../Helpers/EndPoint';
import { getAllUsers } from '../../slices/usersSlice';
import axios from 'axios';

export const getUsers = () => async (dispatch) => {
    try {
        const {data} = await axios.get(`${server}/user`);
        dispatch(getAllUsers(data));
    } catch (error) {
        console.log(error);
    }

}
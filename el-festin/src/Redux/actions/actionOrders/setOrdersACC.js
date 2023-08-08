import { server } from "../../../Helpers/EndPoint";
import axios from "axios";
import { setAccepted } from "../../slices/usersSlice";


export const ordersAccepted = () => async(dispatch) =>{
    try {
        const { data } = await axios.get(`${server}/ticket`)

        dispatch(setAccepted(data))
        
    } catch (error) {
        console.log(error)
    }
}
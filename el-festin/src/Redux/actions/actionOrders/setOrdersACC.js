import { server } from "../../../Helpers/EndPoint";
import axios from "axios";
import { setAccepted } from "../../slices/usersSlice";


export const ordersAccepted = () => async(dispatch) =>{
    try {
        const { data } = await axios.get(`${server}/ticket`)
        
        if(!data || data.error) return

        let ordersAproved = data.filter((a) => !a.status.includes('Pendiente'))

        dispatch(setAccepted(ordersAproved))
        
    } catch (error) {
        console.log(error)
    }
}
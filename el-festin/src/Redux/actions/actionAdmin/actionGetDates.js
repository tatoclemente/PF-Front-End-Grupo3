import { setDatesFromAction } from "../../slices/adminSlice";

export const setDates = (dates) => (dispatch) =>{
    console.log(dates)
     dispatch(setDatesFromAction(dates))
}

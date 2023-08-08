import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReservation } from "../../../Redux/actions/actionReservation/getAllReservations";
import { getUsers } from "../../../Redux/actions/actionsUsers/getAllUsers";
import { server } from "../../../Helpers/EndPoint";
import axios from "axios";
import style from "./Reservation.module.css";
import Swal from "sweetalert2";

export const Reservation = () => {
  const allReservations = useSelector(
    (state) => state.reservation.reservations
  );
  const allUsers = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const [reservation, setReservation] = useState({
    id: "",
    name: "",
    phoneNumber: "",
    eventDate: "",
    confirmation: "",
    quanty: "",
    zone: "",
    decor: "",
    honoree: "",
  });

  useEffect(() => {
    dispatch(getReservation());
    dispatch(getUsers());
  }, [dispatch]);

  const handleUpdateReservation = async (reservationId) => {
    const reservationToUpdate = allReservations.find(
      (res) => res.id === reservationId
    );
    console.log(
      "reservationToUpdate to update:",
      JSON.stringify(reservationToUpdate)
    );

    let bannerToUpdate = 'xd'

    if (reservationToUpdate) {
      const updatedReservation = {
        ...bannerToUpdate,
        confirmation: !reservationToUpdate.confirmation,
      };
      console.log("updatedReservation " + JSON.stringify(updatedReservation));

      try {
        const response = await axios.put(
          `${server}/reser/${reservationId}`,
          updatedReservation
        );
        console.log("Reservation updated successfully:", response.data);

        dispatch(getReservation());
      } catch (error) {
        console.error("Error updating Reservation:", error);
      }
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    const reservationToDelete = allReservations.find(
      (res) => res.id === reservationId
    );
    console.log("reservation to delete:", JSON.stringify(reservationToDelete));

    if (reservationToDelete) {
      try {
        const response = await axios.delete(`${server}/reser/${reservationId}`);
        console.log("reservation deleted successfully:", response.data);

        dispatch(getReservation());
      } catch (error) {
        console.error("Error deleting Reservation:", error);
      }
    }
  };

  return (
    <div>
      <div>
        <h2 className={style.title}>ESTADO DE MIS RESERVACIONES</h2>
      </div>
      <div>
        <h3 className={style.recommendation}>
          Aviso: Llamar al cliente para realizar confirmacion de su reserva.
        </h3>
      </div>
      <div>
        {allReservations?.map((res, index) => {
          return (
            <div key={index}>
              <ul>
                <li>
                  <p></p>
                </li>
                <li>
                  <p></p>
                </li>
                <li>
                  <p></p>
                </li>
                <li>
                  <p>{res.eventDate}</p>
                </li>
                <li>
                  <p>{res.quanty}</p>
                </li>
                <li>
                  <p>{res.zone}</p>
                </li>
                <li>
                  <p>{res.decor}</p>
                </li>
                <li>
                  <p>{res.honoree}</p>
                </li>
              </ul>

              <div>
                <button onClick={() => handleUpdateReservation(res.id)}>
                  Confirmar
                </button>
                <button onClick={() => handleDeleteReservation(res.id)}>
                  Rechazar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

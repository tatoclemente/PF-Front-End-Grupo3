import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReservation } from "../../../Redux/actions/actionReservation/getAllReservations";
import { getUsers } from "../../../Redux/actions/actionsUsers/getAllUsers";
import { server } from "../../../Helpers/EndPoint";
import axios from "axios";
import style from "./Reservation.module.css"


export const Reservation = () => {
  const allReservations = useSelector(
    (state) => state.reservation.reservations
  );
  const dispatch = useDispatch();
  const [reservation, setReservation] = useState({
    name: "",
    lastname: "",
    phoneNumber: "",
    eventDate: "",
    confirmation: "",
    quantity: "",
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

    if (reservationToUpdate) {
      const updatedReservation = {
        ...reservationToUpdate,
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
        <h2 className={style.titleReser} >ESTADO DE MIS RESERVACIONES</h2>
      </div>
      <div>
        <h3 className={style.aviso} >
          Aviso: Llamar al cliente para realizar confirmacion de su reserva.
        </h3>
      </div>
      <div className={style.div}>
      {allReservations?.map((res, index) => {
        return (
          <div key={index} className={style.reservationCard}>
            <div className={style.reservationDetails}>
              <p>
                <span>Nombre: </span>
                {res.name}
              </p>
              <p>
                <span>Apellido: </span>
                {res.lastName}
              </p>
              <p>
                <span>Teléfono: </span>
                {res.phoneNumber}
              </p>
              <p>
                <span>Fecha del evento: </span>
                {res.eventDate}
              </p>
              <p>
                <span>Cantidad: </span>
                {res.quantity}
              </p>
              <p>
                <span>Zona: </span>
                {res.zone}
              </p>
              <p>
                <span>Decoración: </span>
                {res.decor}
              </p>
              <p>
                <span>Homenajeado/a: </span>
                {res.honoree}
              </p>
            </div>
            <div className={style.reservationActions} >
              <button onClick={() => handleUpdateReservation(res.id)} className={style.buttonRes}>Confirmar</button>
              <button onClick={() => handleDeleteReservation(res.id)} className={style.buttonRes}>Rechazar</button>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
};

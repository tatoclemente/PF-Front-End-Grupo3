import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReservation } from "../../../Redux/actions/actionReservation/getAllReservations";
import { getUsers } from "../../../Redux/actions/actionsUsers/getAllUsers";
import { server } from "../../../Helpers/EndPoint";
import axios from "axios";
import { FiCheck } from "react-icons/fi";
import style from "./Reservation.module.css";

export const Reservation = () => {
  const allReservations = useSelector(
    (state) => state.reservation.reservations
  );
  const dispatch = useDispatch();

  console.log("reseeeeeeedr" + allReservations);
  const filterRequest =
    allReservations.length > 0 &&
    allReservations.filter((res) => res.confirmation === false);

  const filterConfirmation =
    allReservations.length > 0 &&
    allReservations.filter((res) => res.confirmation === true);

  const [activeButton, setActiveButton] = useState("requests");

  const handleShowRequests = () => {
    setActiveButton("requests");
  };

  const handleShowReservations = () => {
    setActiveButton("confirmed");
  };

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
        <h2 className={style.titleReser}>ESTADO DE MIS RESERVACIONES</h2>
      </div>
      <div>
        <h3 className={style.aviso}>
          Aviso: Llamar al cliente para realizar confirmacion de su reserva.
        </h3>
        <div className={style.buttonsContainer}>
          <button
            className={
              activeButton === "requests"
                ? style.activeButtons
                : style.buttonReservations
            }
            onClick={handleShowRequests}
          >
            SOLICITUDES
          </button>
          <button
            className={
              activeButton === "confirmed"
                ? style.activeButtons
                : style.buttonReservations
            }
            onClick={handleShowReservations}
          >
            CONFIRMADAS
          </button>
        </div>
      </div>
      <div className={style.div}>
        {activeButton === "requests" &&
          Array.isArray(filterRequest) &&
          filterRequest?.map((res, index) => {
            return (
              <div className={style.containerReservation} key={index}>
                <div key={index} className={style.reservationCard}>
                  <div className={style.reservationDetails}>
                    <p>
                      <span>Nombre: </span>
                      {`${res.name}  ${res.lastName}`}
                    </p>
                    <p>
                      <span>Teléfono: </span>
                      {res.phoneNumber}
                    </p>
                  </div>
                  <div className={style.reservationDetails}>
                    <p>
                      <span>Fecha: </span>
                      {res.date}
                    </p>
                    <p>
                      <span>Hora: </span>
                      {res.time}
                    </p>
                  </div>{" "}
                  <div className={style.reservationDetails}>
                    <p>
                      <span>Asistentes: </span>
                      {res.quantity}
                    </p>
                    <p>
                      <span>Zona: </span>
                      {res.zone}
                    </p>
                  </div>{" "}
                  <div className={style.reservationDetails}>
                    <p>
                      <span>Decoración: </span>
                      {res.decor}
                    </p>
                    <p>
                      <span>Homenajeado: </span>
                      {res.honoree}
                    </p>
                  </div>
                </div>

                <div className={style.reservationActions}>
                  <button
                    onClick={() => handleUpdateReservation(res.id)}
                    className={style.buttonRes}
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={() => handleDeleteReservation(res.id)}
                    className={style.buttonRes}
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <div className={style.div}>
        {activeButton === "confirmed" &&
          filterConfirmation?.map((res, index) => {
            return (
              <div className={style.containerReservation}>
                <div key={index} className={style.reservationCard}>
                  <div className={style.reservationDetails}>
                    <p>
                      <span>Nombre: </span>
                      {`${res.name} ${res.lastName}`}
                    </p>
                    <p>
                      <span>Teléfono: </span>
                      {res.phoneNumber}
                    </p>
                  </div>
                  <div className={style.reservationDetails}>
                    <p>
                      <span>Fecha: </span>
                      {res.date}
                    </p>
                    <p>
                      <span>Hora: </span>
                      {res.time}
                    </p>
                  </div>
                  <div className={style.reservationDetails}>
                    <p>
                      <span>Asistentes: </span>
                      {res.quantity}
                    </p>
                    <p>
                      <span>Zona: </span>
                      {res.zone}
                    </p>
                  </div>
                  <div className={style.reservationDetails}>
                    <p>
                      <span>Decoración: </span>
                      {res.decor}
                    </p>
                    <p>
                      <span>Homenajeado: </span>
                      {res.honoree}
                    </p>
                  </div>
                </div>
                <div className={style.reservationConfirmed}>
                  <p className={style.pButton}>
                    <FiCheck /> Reserva Confirmada
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

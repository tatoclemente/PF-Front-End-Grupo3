import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReservation } from "../../../Redux/actions/actionReservation/getAllReservations";
import { getUsers } from "../../../Redux/actions/actionsUsers/getAllUsers";
import { server } from "../../../Helpers/EndPoint";
import axios from "axios";
import Swal from "sweetalert2";
import { FiCheck } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import style from "./Reservation.module.css";

export const Reservation = () => {
  const allReservations = useSelector(
    (state) => state.reservation.reservations
  );
  const dispatch = useDispatch();

  const filterRequest =
    allReservations.length > 0 &&
    allReservations.filter((res) => res.status === "Pendiente");

  const filterConfirmation =
    allReservations.length > 0 &&
    allReservations.filter((res) => res.status === "Confirmado");
  const filterRejected =
    allReservations.length > 0 &&
    allReservations.filter((res) => res.status === "Rechazado");
  const filterCanceled =
    allReservations.length > 0 &&
    allReservations.filter((res) => res.status === "Cancelado");

  const [activeButton, setActiveButton] = useState("requests");

  const handleShowRequests = () => {
    setActiveButton("requests");
  };

  const handleShowReservations = () => {
    setActiveButton("confirmed");
  };
  const handleShowRejected = () => {
    setActiveButton("rejected");
  };
  const handleShowCanceled = () => {
    setActiveButton("canceled");
  };
  useEffect(() => {
    dispatch(getReservation());
    dispatch(getUsers());
  }, [dispatch]);

  const handleUpdateConfirmed = async (reservationId) => {
    const reservationToUpdate =
      Array.isArray(allReservations) &&
      allReservations.find((res) => res.id === reservationId);

    if (reservationToUpdate) {
      const updatedReservation = {
        ...reservationToUpdate,
        status: "Confirmado",
      };

      try {
        await axios.put(`${server}/reser/${reservationId}`, updatedReservation);

        dispatch(getReservation());
        Swal.fire({
          icon: "success",
          title: `Se confirmo la reserva de ${reservationToUpdate.name}`,
          text: `Fecha: ${reservationToUpdate.date} Hora: ${reservationToUpdate.time}`,
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error updating Reservation:", error);
      }
    }
  };

  const handleUpdateRejected = async (reservationId) => {
    const reservationToUpdate =
      Array.isArray(allReservations) &&
      allReservations.find((res) => res.id === reservationId);

    if (reservationToUpdate) {
      const updatedReservation = {
        ...reservationToUpdate,
        status: "Rechazado",
      };

      try {
        await axios.put(`${server}/reser/${reservationId}`, updatedReservation);

        dispatch(getReservation());
        Swal.fire({
          icon: "success",
          title: "La reserva ha sido cancelada",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error updating Reservation:", error);
      }
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    const reservationToDelete =
      Array.isArray(allReservations) &&
      allReservations.find((res) => res.id === reservationId);

    if (reservationToDelete) {
      try {
        await axios.delete(`${server}/reser/${reservationId}`);

        dispatch(getReservation());
        Swal.fire({
          icon: "success",
          title: "La reserva ha sido eliminada",
          confirmButtonText: "OK",
        });
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
          <button
            className={
              activeButton === "canceled"
                ? style.activeButtons
                : style.buttonReservations
            }
            onClick={handleShowCanceled}
          >
            CANCELADAS
          </button>
          <button
            className={
              activeButton === "rejected"
                ? style.activeButtons
                : style.buttonReservations
            }
            onClick={handleShowRejected}
          >
            RECHAZADAS
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
                      {res.name && !res.lastName
                        ? res.name
                        : `${res.name} ${res.lastName}`}
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
                    onClick={() => handleUpdateConfirmed(res.id)}
                    className={style.buttonRes}
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={() => handleUpdateRejected(res.id)}
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
          Array.isArray(filterConfirmation) &&
          filterConfirmation?.map((res, index) => {
            return (
              <div className={style.containerReservation}>
                <div key={index} className={style.reservationCard}>
                  <div className={style.reservationDetails}>
                    <p>
                      <span>Nombre: </span>
                      {res.name && !res.lastName
                        ? res.name
                        : `${res.name} ${res.lastName}`}
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
                    <FiCheck size={"18"} /> Reserva Confirmada
                  </p>
                </div>
              </div>
            );
          })}
      </div>
      <div className={style.div}>
        {activeButton === "canceled" &&
          Array.isArray(filterCanceled) &&
          filterCanceled?.map((res, index) => {
            return (
              <div className={style.containerReservation}>
                <div key={index} className={style.reservationCard}>
                  <div className={style.reservationDetails}>
                    <p>
                      <span>Nombre: </span>
                      {res.name && !res.lastName
                        ? res.name
                        : `${res.name} ${res.lastName}`}
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
                  <p className={style.pButtonReject}>
                    <FiCheck size={"18"} /> Reserva Cancelada
                  </p>
                </div>
              </div>
            );
          })}
      </div>
      <div className={style.div}>
        {activeButton === "rejected" &&
          Array.isArray(filterRejected) &&
          filterRejected?.map((res, index) => {
            return (
              <div className={style.containerReservation}>
                <div key={index} className={style.reservationCard}>
                  <div className={style.reservationDetails}>
                    <p>
                      <span>Nombre: </span>
                      {res.name && !res.lastName
                        ? res.name
                        : `${res.name} ${res.lastName}`}
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
                  <p className={style.pButtonReject}>
                    <MdOutlineClose size={"18"} /> Reserva Rechazada
                  </p>
                  <button
                    onClick={() => handleDeleteReservation(res.id)}
                    className={style.buttonRejected}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

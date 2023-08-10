import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReservation } from "../../Redux/actions/actionReservation/getAllReservations";
import { getUsers } from "../../Redux/actions/actionsUsers/getAllUsers";
import styles from "./Booking.module.css";
import Calendar from "react-calendar";
import Validate from "./ValidationBooking";
import { server } from "../../Helpers/EndPoint";
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import "./custom-calendar.css";

export default function BookingComponent() {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  // const [selectedDateTimeWithTime, setSelectedDateTimeWithTime] = useState(null);
  const [numPersons, setNumPersons] = useState(2);
  const [reservedTimes, setReservedTimes] = useState([]);
  const allReservations = useSelector(
    (state) => state.reservation.reservations
  );
  const users = useSelector((state) => state.users.users);
  const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState({});
  // const [userId, setUserId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getReservation());
  }, [dispatch]);

  useEffect(() => {
    // Cuando el usuario cambia, busca su ID en la base de datos local
    const emailId =
      Array.isArray(users) && users.filter((us) => us.email === user?.email);
    if (emailId.length > 0) {
      // setUserId(emailId[0].id);
      setInputValues((prevValues) => ({
        ...prevValues,
        id: emailId[0].id,
      }));
    }
  }, [user, users]);

  const emailExists =
    Array.isArray(users) && users.filter((us) => us.email === user?.email);

  const dataUser = emailExists.map((u) => ({
    id: u.id,
    name: u.name,
    lastName: u.lastName,
    phoneNumber: u.phoneNumber,
    email: u.email,
    image: u.image,
  }));

  const [inputValues, setInputValues] = useState({
    id: dataUser.id,
    name: user?.displayName
      ? user?.displayName
      : dataUser.length > 0
      ? `${dataUser[0].name} ${dataUser[0].lastName}`
      : "",
    quantity: numPersons,
    phoneNumber: dataUser.length > 0 ? dataUser[0].phoneNumber || "" : "",
    date: "",
    time: "",
    zone: "",
    decor: "",
    honoree: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    if (name === "date") {
      setSelectedDateTime(new Date(value));
      setInputValues({
        ...inputValues,
        date: new Date(value),
      });
    }
    setError(
      Validate({
        ...inputValues,
        [event.target.name]: event.target.value,
      })
    );
  };
  function handleSelect(e) {
    e.preventDefault();
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });

    setError(
      Validate({
        ...inputValues,
        [e.target.name]: e.target.value,
      })
    );
  }

  const handleDateChange = (date) => {
    const fechaObj = new Date(date);

    // Obtener los componentes de la fecha
    const dia = fechaObj.getUTCDate().toString().padStart(2, "0");
    const mes = (fechaObj.getUTCMonth() + 1).toString().padStart(2, "0");
    const anio = fechaObj.getUTCFullYear();

    // Formatear la fecha en el formato deseado "05-08-2023"
    const fechaFormateada = `${dia}-${mes}-${anio}`;

    setInputValues({
      ...inputValues,
      date: fechaFormateada,
    });
    // Obtén las horas reservadas para la fecha seleccionada
    const reservedHours = allReservations
      .filter((res) => res.date === moment(date).format("DD-MM-YYYY"))
      .map((res) => res.time);

    setReservedTimes(reservedHours);
    setSelectedTime("");
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);

    setInputValues({
      ...inputValues,
      time: time,
    });
    const isReserved = reservedTimes.includes(time);

    if (isReserved) {
      Swal.fire({
        icon: "error",
        title: "Hora reservada",
        text: "La hora seleccionada ya está reservada. Por favor, elige otra hora.",
      });
    }
  };

  const handleMinusClick = () => {
    setNumPersons((prevNum) => Math.max(prevNum - 1, 1));
    setInputValues({
      ...inputValues,
      quantity: Math.max(numPersons - 1, 1),
    });
  };

  const handlePlusClick = () => {
    setNumPersons((prevNum) => Math.min(prevNum + 1, 20));
    setInputValues({
      ...inputValues,
      quantity: Math.min(numPersons + 1, 20),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !inputValues.phoneNumber ||
      !inputValues.date ||
      !inputValues.time ||
      !inputValues.zone ||
      !inputValues.decor ||
      !inputValues.honoree
    ) {
      Swal.fire({
        icon: "error",
        title: "Por favor, completa todos los campos antes de reservar.",
        confirmButtonText: "OK",
      });
      return;
    }
    const reservationExists =
      Array.isArray(allReservations) &&
      allReservations.find(
        (res) => res.date === inputValues.date && res.time === inputValues.time
      );

    if (reservationExists) {
      Swal.fire({
        icon: "error",
        title: "La fecha y hora seleccionadas ya están reservadas.",
        text: "Por favor, elige otra fecha u hora.",
        confirmButtonText: "OK",
      });
      return;
    } else {
      try {
        const reservationData = new FormData();
        reservationData.append("id", inputValues.id);
        reservationData.append("name", inputValues.name);
        reservationData.append("quantity", inputValues.quantity);
        reservationData.append("phoneNumber", inputValues.phoneNumber);
        reservationData.append("date", inputValues.date);
        reservationData.append("time", inputValues.time);
        reservationData.append("zone", inputValues.zone);
        reservationData.append("decor", inputValues.decor);
        reservationData.append("honoree", inputValues.honoree);

        const response = await axios.post(`${server}/reser`, reservationData);

        Swal.fire({
          icon: "success",
          title: `${inputValues.name} su reserva ha sido enviada`,
          text: "El restaurante se estara comunicando con usted para confirmar su reserva",
          confirmButtonText: "OK",
        });
        setInputValues({
          id: dataUser.id,
          name: user.displayName
            ? user.displayName
            : dataUser.length > 0
            ? `${dataUser[0].name} ${dataUser[0].lastName}`
            : "",
          quantity: numPersons,
          phoneNumber: dataUser.length > 0 ? dataUser[0].phoneNumber || "" : "",
          date: "",
          time: "",
          zone: "",
          decor: "",
          honoree: "",
        });
      } catch (error) {
        console.error("Error create reservation:", error);
      }
    }
  };

  // Agregamos un efecto para seleccionar la fecha actual cuando se monta el componente.
  useEffect(() => {
    setSelectedDateTime(new Date());
  }, []);

  return (
    <div>
      <div className={styles.containerTitleBooking}>
        <h1 className={styles.titleBooking}>¡RESERVA CON NOSOTROS!</h1>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.leftSide}>
          <label className={styles.labelBooking}>Nombre</label>
          <input
            className={styles.inputBooking}
            value={inputValues.name}
          ></input>
          <label className={styles.labelBooking} htmlFor="phoneNumber">
            Celular
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            className={styles.inputBooking}
            value={inputValues.phoneNumber}
            onChange={handleInputChange}
          ></input>
          {error.phoneNumber && (
            <p style={{ fontSize: "12px" }}>{error.phoneNumber}</p>
          )}
          <label className={styles.labelBooking}>
            ¿Para cuántas personas deseas reservar?
          </label>
          <div className={styles.numPersonsContainer}>
            <div className={styles.numPersonsWrapper}>
              <button
                type="button"
                className={styles.numPersonsButton}
                onClick={handleMinusClick}
              >
                -
              </button>
              <span
                className={styles.numPersonsValue}
                value={inputValues.quantity}
              >
                {numPersons}
              </span>
              <button
                type="button"
                className={styles.numPersonsButton}
                onClick={handlePlusClick}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className={styles.centerSide}>
          <div className={styles.reservationForm}>
            <div className={styles.datePickerContainer}>
              <label className={styles.labelBooking}>
                ¿En qué fecha y hora deseas realizar tu reservación?
              </label>
              {inputValues.date ? (
                <div style={{ color: "#313045", marginBottom: "10px" }}>
                  Fecha seleccionada:{" "}
                  <span style={{ fontWeight: "bold", color: "#313045" }}>
                    {inputValues.date}
                  </span>
                </div>
              ) : (
                <p style={{ color: "#313045", marginBottom: "10px" }}>
                  Seleccione una fecha
                </p>
              )}
              <div>
                <Calendar
                  id="calendar"
                  value={selectedDateTime}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  maxDate={moment().add(1, "month").toDate()}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <div className={styles.selectTime}>
                <div>
                  {selectedTime ? (
                    <div style={{ color: "#313045", marginBottom: "10px" }}>
                      Hora seleccionada:{" "}
                      <span style={{ fontWeight: "bold" }}>{selectedTime}</span>{" "}
                      {reservedTimes.includes(selectedTime) && (
                        <span style={{ fontWeight: "bold" }}>
                          (No disponible)
                        </span>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p>Seleccione una hora</p>
                    </div>
                  )}
                </div>
                <select
                  className={styles.selectBooking}
                  value={selectedTime}
                  onChange={(e) => handleTimeChange(e.target.value)}
                >
                  <option value="" disabled>
                    Selecciona una hora
                  </option>
                  {[
                    "12:00",
                    "13:00",
                    "14:00",
                    "20:00",
                    "21:00",
                    "22:00",
                    "23:00",
                  ].map((time) => {
                    const isReserved = reservedTimes.includes(time);
                    return (
                      <option
                        key={time}
                        value={time}
                        style={
                          isReserved
                            ? { backgroundColor: "gray", color: "#fff" }
                            : selectedTime === time
                            ? { backgroundColor: "#313045", color: "#fff" }
                            : {}
                        }
                      >
                        {isReserved ? `${time} (No disponible)` : time}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightSide}>
          <label className={styles.labelBooking}>
            ¿En qué zona deseas realizar tu celebración?
          </label>
          <select
            name="zone"
            value={inputValues.zone}
            className={styles.selectBooking}
            onChange={handleSelect}
          >
            <option value="" disabled selected>
              Seleccione una zona
            </option>
            <option value="Salon principal">Salón principal</option>
            <option value="Zona vip">Zona VIP</option>
            <option value="Zonas verdes">Zonas verdes</option>
          </select>

          <label className={styles.labelBooking}>
            ¿Deseas algún tipo de decoración?
          </label>
          <select
            name="decor"
            value={inputValues.decor}
            className={styles.selectBooking}
            onChange={handleSelect}
          >
            <option value="" disabled selected>
              Seleccione una decoración
            </option>
            <option value="Ninguna">Ninguna</option>
            <option value="Cumpleaños">Cumpleaños</option>
            <option value="Aniversario">Aniversario</option>
            <option value="Grado">Grado</option>
          </select>
          <label className={styles.labelBooking}>
            ¿Quién es la persona homenajeada?
          </label>
          <input
            value={inputValues.honoree}
            name="honoree"
            className={styles.inputBooking}
            onChange={handleInputChange}
          ></input>
          {error.honoree && <p style={{ fontSize: "12px" }}>{error.honoree}</p>}
        </div>
      </div>
      <div className={styles.containerButtonBooking}>
        <button
          type="submit"
          className={styles.submitButtonBooking}
          onClick={handleSubmit}
        >
          RESERVAR
        </button>
      </div>
    </div>
  );
}

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
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "./custom-calendar.css";

export default function BookingComponent() {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  // const [selectedDateTimeWithTime, setSelectedDateTimeWithTime] = useState(null);
  const [numPersons, setNumPersons] = useState(2);
  const allReservations = useSelector(
    (state) => state.reservation.reservations
  );
  const users = useSelector((state) => state.users.users);
  const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState({});
  const [userId, setUserId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getReservation());
  }, [dispatch]);

  console.log(selectedDateTime);

  useEffect(() => {
    // Cuando el usuario cambia, busca su ID en la base de datos local
    const emailId = users.filter((us) => us.email === user.email);
    if (emailId.length > 0) {
      setUserId(emailId[0].id);
      setInputValues((prevValues) => ({
        ...prevValues,
        id: emailId[0].id,
      }));
    }
  }, [user, users]);

  const emailExists = users.filter((us) => us.email === user.email);

  const dataUser = emailExists.map((u) => ({
    id: u.id,
    name: u.name,
    lastName: u.lastName,
    phoneNumber: u.phoneNumber,
    email: u.email,
    image: u.image,
  }));

  console.log(dataUser);

  const [inputValues, setInputValues] = useState({
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

  console.log(inputValues);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    if (name === "eventDate") {
      setSelectedDateTime(new Date(value));
      setInputValues({
        ...inputValues,
        eventDate: new Date(value),
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
    const mes = (fechaObj.getUTCMonth() + 1).toString().padStart(2, "0"); // +1 porque los meses en JavaScript van de 0 a 11
    const anio = fechaObj.getUTCFullYear();

    // Formatear la fecha en el formato deseado "05-08-2023"
    const fechaFormateada = `${dia}-${mes}-${anio}`;
    console.log(fechaFormateada);

    setInputValues({
      ...inputValues, date: fechaFormateada
    })
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);

    // const [hours, minutes] = time.split(":");

    // // Creamos una nueva fecha que combine la fecha seleccionada y la hora seleccionada
    // const selectedDateTimeWithTime = new Date(selectedDateTime);
    // selectedDateTimeWithTime.setHours(Number(hours), Number(minutes), 0, 0);

    // // Convertimos la fecha con la hora seleccionada a formato ISO 8601
    // const isoDateTime = selectedDateTimeWithTime.toISOString();

    // setSelectedDateTimeWithTime(selectedDateTimeWithTime);

    // console.log("ISOOOOOOOOOOOO" + isoDateTime);

    setInputValues({
      ...inputValues,
      time: time,
    });
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
    if (!inputValues.phoneNumber ||
      !inputValues.date ||
      !inputTime.date ||
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

    const eventExists = allReservations.find(
      (res) => res.eventDate === inputValues.eventDate
    );

    if (eventExists) {
      Swal.fire({
        icon: "error",
        title: "Ya existe una reserva con esa fecha",
        confirmButtonText: "OK",
      });
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
        console.log("reservation create successfully:", response.data);
        Swal.fire({
          icon: "success",
          title: "Reserva Exitosa",
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
        });;
      } catch (error) {
        console.error("Error create reservation:", error);
      }
    }
  };

  // console.log("aaaaaaaaaaaaaaaa" + selectedDateTimeWithTime);

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
              <div>
                <Calendar
                  id="calendar"
                  value={selectedDateTime}
                  onChange={handleDateChange}
                  className={styles.customCalendar}
                  minDate={new Date()}
                  maxDate={moment().add(1, "year").toDate()}
                />
              </div>
            </div>
            {selectedDateTime && (
              <div className={styles.formGroup}>
                <label className={styles.labelBooking}>
                  Horas disponibles:
                </label>
                <div className={styles.timeCheckboxes}>
                  <label
                    style={
                      selectedTime === "18:00"
                        ? { backgroundColor: "#313045", color: "#fff" }
                        : {}
                    }
                  >
                    <input
                      type="checkbox"
                      value="18:00"
                      checked={selectedTime === "18:00"}
                      onChange={(e) => handleTimeChange(e.target.value)}
                    />
                    06:00 PM
                  </label>
                  <label
                    style={
                      selectedTime === "19:00"
                        ? { backgroundColor: "#313045", color: "#fff" }
                        : {}
                    }
                  >
                    <input
                      type="checkbox"
                      value="19:00"
                      checked={selectedTime === "19:00"}
                      onChange={(e) => handleTimeChange(e.target.value)}
                    />
                    07:00 PM
                  </label>
                  <label
                    style={
                      selectedTime === "20:00"
                        ? { backgroundColor: "#313045", color: "#fff" }
                        : {}
                    }
                  >
                    <input
                      type="checkbox"
                      value="20:00"
                      checked={selectedTime === "20:00"}
                      onChange={(e) => handleTimeChange(e.target.value)}
                    />
                    08:00 PM
                  </label>
                  <label
                    style={
                      selectedTime === "21:00"
                        ? { backgroundColor: "#313045", color: "#fff" }
                        : {}
                    }
                  >
                    <input
                      type="checkbox"
                      value="21:00"
                      checked={selectedTime === "21:00"}
                      onChange={(e) => handleTimeChange(e.target.value)}
                    />
                    09:00 PM
                  </label>
                  {/* Agrega más opciones de hora según las horas disponibles en tu restaurante */}
                </div>
              </div>
            )}
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
            <option value="salon principal">Salón principal</option>
            <option value="zona vip">Zona VIP</option>
            <option value="zonas verdes">Zonas verdes</option>
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
            <option value="ninguna">Ninguna</option>
            <option value="cumpleaños">Cumpleaños</option>
            <option value="aniversario">Aniversario</option>
            <option value="grado">Grado</option>
          </select>
          <label className={styles.labelBooking}>
            ¿Cuál es el nombre de la persona homenajeada?
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

import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../Redux/actions/actionsUsers/getAllUsers";
import { server } from "../../Helpers/EndPoint";
import Swal from "sweetalert2";
import axios from "axios";
import styles from "./Profile.module.css";
import Loader from '../Loader/Loader'
import defaultImage from './images/profile.png'
import { useNavigate } from "react-router-dom";
import RightSide from "./RightSide";


export const Profile = ({toggleCart}) => {
  const users = useSelector((state) => state.users.users);
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
    image: null,
  });
  const [userId, setUserId] = useState(null);
  const [myOrders, setMyOrders] = useState([])
  const [myReservations, setMyReservations] = useState([]);




  // Variable de estado para controlar si los detalles de los tickets están cargando
  const [loadingDetails, setLoadingDetails] = useState(true);


  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    // Cuando el usuario cambia, busca su ID en la base de datos local
    const emailId = Array.isArray(users) && users.filter((us) => us.email === user?.email);
    if (emailId.length > 0) {
      setUserId(emailId[0].id);
    }
  }, [user, users]);

  //-----------------------------------------------------------------------------
  // Traemos todos los tickets de ese usuario cada vez que se monta el componente

  const prevMyOrdersRef = useRef([]);
  useEffect(() => {
    prevMyOrdersRef.current = myOrders;
  }, [myOrders]);

    // Función para ordenar por fecha y hora de manera descendente
  function sortByDateAndTimeDesc(a, b) {
    const dateComparison = b.date.localeCompare(a.date);
    if (dateComparison !== 0) {
      return dateComparison;
    }

    return b.createdAt.localeCompare(a.createdAt);
  }

  useEffect(() => {
    if (userId) {
      const orders = async () => {
        try {
          const { data } = await axios.get(`${server}/ticket/user/${userId}`);
          console.log("DATA_________", data);

          // Verificar si el usuario no tiene pedidos aprobados
          if (data === 'No hay tickets asociados a este usuario') {
            setMyOrders([]); // Establecer myOrders como una matriz vacía
            setLoadingDetails(false); // Actualizar loadingDetails a false
          } else {
            const aproved = data.filter((ticket) => ticket.status !== "Rechazado" && ticket.status !== "Pendiente");

              // Ordenar los tickets por fecha y hora de manera descendente
            aproved.sort(sortByDateAndTimeDesc);
            // // Ordenar las órdenes por hora (createdAt) en orden descendente
            // aproved.sort((a, b) => {
            //   const timeA = new Date(`2000-01-01T${a.createdAt}:00`).getTime();
            //   const timeB = new Date(`2000-01-01T${b.createdAt}:00`).getTime();
            //   return timeB - timeA;
            // });

            setMyOrders(aproved);
            setLoadingDetails(false); // Actualizar loadingDetails a false cuando hay pedidos aprobados
          }
        } catch (error) {
          console.log("ERROR: ", error.message);
        }
      };
      orders();
    }
  }, [userId]);

  console.log("MY ORDERS", myOrders);


  //----------------------------------------------------------------------------
  // Traemos todas las reservaciones de ese usuario cada vez que se monta el componente
  const prevMyReservationsRef = useRef([]);
  useEffect(() => {
    prevMyReservationsRef.current = myReservations;
  }, [myReservations]);

  // Función para ordenar reservaciones por fecha y hora de manera descendente
function sortByDateAndTimeDescReser(a, b) {
  const dateComparison = b.date.localeCompare(a.date);
  if (dateComparison !== 0) {
    return dateComparison;
  }

  return b.time.localeCompare(a.time);
}

  useEffect(() => {
    if (userId) {
      const reservations = async () => {
        try {
          const { data: reservations } = await axios.get(`${server}/reser/user/${userId}`);
          console.log("DATA_________", reservations);

          // Verificar si el usuario no tiene pedidos aprobados
          if (reservations === 'No hay tickets asociados a este usuario') {
            setMyOrders([]); // Establecer myOrders como una matriz vacía
            setLoadingDetails(false); // Actualizar loadingDetails a false
          } else {
            const validReservations = reservations.filter((reserv) => reserv.status !== "Rechazado");

            // // Ordenar las reservaciones por fecha y hora en orden descendente
            // validReservations.sort((a, b) => {
            //   const dateA = new Date(`${a.date} ${a.time}`);
            //   const dateB = new Date(`${b.date} ${b.time}`);
            //   return dateB - dateA;
            // });
            validReservations.sort(sortByDateAndTimeDescReser);
            setMyReservations(validReservations);
            setLoadingDetails(false); // Actualizar loadingDetails a false cuando hay pedidos aprobados
          }
        } catch (error) {
          console.log("ERROR: ", error.message);
        }
      };
      reservations();
    }
  }, [userId]);

  console.log("MY RESERVATIONS", myReservations);


  //----------------------------------------------------------------------------


  const emailExists = Array.isArray(users) && users.filter((us) => us.email === user?.email);

  const dataUser = emailExists && emailExists.map((u) => ({
    name: u.name,
    lastName: u.lastName,
    phoneNumber: u.phoneNumber,
    email: u.email,
    image: u.image,
  }));

  const [inputValues, setInputValues] = useState({
    name: user?.displayName
      ? user?.displayName
      : dataUser.length > 0
        ? `${dataUser[0].name} ${dataUser[0].lastName}`
        : "",
    email: user?.email ? user?.email : dataUser.length > 0 ? dataUser.email : "",
    phoneNumber: dataUser.length > 0 ? dataUser[0].phoneNumber || "" : "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleOnChangeImage = ({ target }) => {
    setProfile({ ...profile, image: target.files[0] });
  };
  const handleSubmitUpdate = async (event) => {
    event.preventDefault();

    if (!userId) {
      console.error(
        "No se pudo encontrar el ID del usuario en la base de datos local."
      );
      return;
    }

    const dataToUpdate = users.find((us) => us.id === userId);

    if (dataToUpdate) {
      // Creamos un nuevo objeto FormData para enviar los datos en el formato esperado por el servidor
      const formData = new FormData();
      formData.append("phoneNumber", inputValues.phoneNumber);

      // Si el usuario ha seleccionado una nueva imagen, la agregamos al FormData
      if (profile.image) {
        formData.append("image", profile.image);
      }

      try {
        const response = await axios.put(`${server}/user/${userId}`, formData);
        console.log("Data user updated successfully:", response.data);
        dispatch(getUsers(userId));
        Swal.fire({
          icon: "success",
          title: "Se ha actualizado sus datos",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error updating data local:", error);
      }
    }
  };

  console.log("LOADING", loadingDetails);

  // Vista previa de la imagen seleccionada
  const imagePreview = profile.image
    ? URL.createObjectURL(profile.image)
    : dataUser.length > 0
      ? dataUser[0].image
      : isValidURL(user?.photoURL)
        ? user?.photoURL
        : undefined;



  function isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }



  const navigate = useNavigate();

  if(loading) 
  return ( 
    <div style={{width: '100%', zIndex:'50', top: '0', left: '0', position: 'absolute', height: '100vh',backgroundColor: 'var(--background-darkblue)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <p><Loader /></p>
    </div>)

  return (
    <div className={styles.containerProfile}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        VOLVER ATRÁS
      </button>
      <div className={styles.leftSide}>
        <h1 className={styles.title}>Mi perfil</h1>

        {imagePreview ? (
          <div className={styles.imgContainer}>
            <img className={styles.image} src={imagePreview} alt="Profile" />
          </div>
        ) : (
          <>
            <div className={styles.imgContainer}>
              <img className={styles.image} src={defaultImage} alt="Profile" />
            </div>
            <label htmlFor="fileInput" className={styles.upButton}>
              Subir imagen
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleOnChangeImage}
            />
          </>
        )}

        {imagePreview && (
          <>
            <label htmlFor="fileInput" className={styles.upButton}>
              Cambiar imagen
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleOnChangeImage}
            />
          </>
        )}

        <form onSubmit={handleSubmitUpdate}>
          <div className={styles.userContainer}>
            <label className={styles.label} htmlFor="name">
              Nombre:
            </label>
            <span className={styles.info}>{inputValues.name}</span>
          </div>
          <div className={styles.userContainer}>
            <label className={styles.label} htmlFor="email">
              Email:
            </label>
            <span className={styles.info}>{inputValues.email}</span>
          </div>
          <div className={styles.userContainer}>
            <label className={styles.label} htmlFor="phoneNumber">
              Celular:
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={inputValues.phoneNumber}
              onChange={handleInputChange}
              className={styles.inputText}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Actualizar datos
          </button>
        </form>
      </div>

      <div className={styles.rightSide}>
        <RightSide 
        myOrders={myOrders} 
        myReservations={myReservations} 
        loadingDetails={loadingDetails}
        toggleCart={toggleCart}
        userId={userId} />
      </div>
    </div>
  );
};
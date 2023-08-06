import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../Redux/actions/actionsUsers/getAllUsers";
import { server } from "../../Helpers/EndPoint";
import Swal from "sweetalert2";
import axios from "axios";
import styles from "./Profile.module.css";

import { AiFillCheckCircle, AiOutlineStar } from 'react-icons/ai'
import { PiCookingPotFill } from 'react-icons/pi'
import ROUTES from "../../Routes/routes";
import defaultImage from './images/profile.png'
import { useNavigate } from "react-router-dom";


export const Profile = () => {
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


  const [activeTab, setActiveTab] = useState("orders");

  const handleShowOrders = () => {
    setActiveTab("orders");
  };

  const handleShowReservations = () => {
    setActiveTab("reservations");
  };

  // Variable de estado para controlar si los detalles de los tickets están cargando
  const [loadingDetails, setLoadingDetails] = useState(true);


  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    // Cuando el usuario cambia, busca su ID en la base de datos local
    const emailId = users.filter((us) => us.email === user.email);
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
    
            // Ordenar las órdenes por hora (createdAt) en orden descendente
            aproved.sort((a, b) => {
              const timeA = new Date(`2000-01-01T${a.createdAt}:00`).getTime();
              const timeB = new Date(`2000-01-01T${b.createdAt}:00`).getTime();
              return timeB - timeA;
            });

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

  const emailExists = users.filter((us) => us.email === user.email);

  const dataUser = emailExists.map((u) => ({
    name: u.name,
    lastName: u.lastName,
    phoneNumber: u.phoneNumber,
    email: u.email,
    image: u.image,
  }));

  const [inputValues, setInputValues] = useState({
    name: user.displayName
      ? user.displayName
      : dataUser.length > 0
        ? `${dataUser[0].name} ${dataUser[0].lastName}`
        : "",
    email: user.email ? user.email : dataUser.length > 0 ? dataUser.email : "",
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
      : isValidURL(user.photoURL)
        ? user.photoURL
        : undefined;



  function isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  const handleReview = (id) => {
    console.log("Ticket N°: ", id);
  }


  const handleGetDetail = (id) => {
    console.log("Ticket N°: ", id);
  }

  const handleReSale = (id) => {
    console.log("Ticket N°: ", id);
  }

  const navigate = useNavigate();

  if (loading) return <h1>loading...</h1>;

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
        <div className={styles.tabsContainer}>
          <button
            className={activeTab === "orders" ? styles.activeTab : styles.tab}
            onClick={handleShowOrders}
          >
            Mis pedidos
          </button>
          <button
            className={activeTab === "reservations" ? styles.activeTab : styles.tab}
            onClick={handleShowReservations}
          >
            Mis reservaciones
          </button>
        </div>
        {/* <h1 className={styles.title}>Mis pedidos</h1> */}
           {/* Renderizar el contenido según la pestaña activa */}
      {activeTab === "orders" ? (
        loadingDetails ? (
          <p>Estamos cargando sus órdenes. Por favor espere...</p>
        ) : myOrders.length === 0 ? (
          <div>
            <h2 className={styles.notOrder}>Aún no tienes pedidos</h2>
          </div>
        ) : myOrders.map((order, index) => (
          <div key={index} className={styles.orderContainer}>
            <div className={styles.orderHeader}>
              <div className={styles.dataOrder}>
                <span>Pedido: <b>{order.idPedido}</b></span>
                <span>Hora: <b>{order.createdAt}</b></span>
              </div>
              <div className={styles.dataOrderRigth}>
                <div className={styles.status}>
                  <p className={styles.statusTitle}>ESTADO: <b>{order.status}</b></p>
                  {order.status === "Aprobado" ? <AiFillCheckCircle className={styles.checkAproved} /> : order.status === "En proceso" ? <PiCookingPotFill className={styles.cookingIcon} /> : <AiFillCheckCircle className={styles.checkComplete} />}
                </div>
                <span className={styles.totalPrice}>Pagaste: <b>${order.totalPrice || 3000}</b></span>
              </div>


            </div>


            <div className={styles.buttonsActionsContainer}>
              <button className={styles.buttonReview} onClick={() => handleReview(order.idPedido)}>Opinar <AiOutlineStar className={styles.starIcon} /></button>
              <button className={styles.buttonsActions} onClick={() => handleReSale(order.idPedido)}>Repetir orden</button>
              <button className={styles.buttonsActions} onClick={() => handleGetDetail(order.idPedido)}>Ver detalle</button>
            </div>

            {/* Detalles del ticket */}
          </div>
        ))
      ) : (
        //aca debo crear un nuevo estado cuando tenga el get a /resevar
        loadingDetails ? (
          <p>Estamos cargando sus reservaciones. Por favor espere...</p>
        ) : myReservations.length === 0 ? (
          <div>
            <h2 className={styles.notOrder}>Aún no tienes reservaciones</h2>
          </div>
        ) : (
          myReservations.map((reservation, index) => (
            <div key={index} className={styles.reservationContainer}>
              {/* Resto del contenido de la reservación */}
            </div>
          ))
        )
      )}

      </div>
    </div>
  );
};


// <div>
// <h4>Detalles del ticket:</h4>
// {order.detail && order.detail.map((detail, index) => (
//   <ul key={index}>
//   {/* Platos */}
//   {/* <li>
//     Plato: {detail.dish} {detail?.garnish && `con ${detail.garnish}`}, Cantidad: {detail.quantity}, Precio Total: {detail.totalPrice}
//   </li> */}

//   {/* Bebidas */}
//   {/* {detail.drinks && detail.drinks.map((drink, index) => (
//     <li key={index}>
//       Bebida: {drink.name}, Cantidad: {drink.quantity}, Precio: {drink.price}
//     </li>
//   ))} */}
//   {/* Postres */}
//   {/* {detail.desserts && detail.desserts.map((dessert, index) => (
//     <li key={index}>
//       Postre: {dessert.name}, Cantidad: {dessert.quantity}, Precio: {dessert.price}
//     </li>
//   ))} */}
// </ul>
// ))}
// </div>
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../Redux/actions/actionsUsers/getAllUsers";
import { server } from "../../Helpers/EndPoint";
import Swal from "sweetalert2";
import axios from "axios";
import styles from "./Profile.module.css";

export const Profile = () => {
  const users = useSelector((state) => state.users.users);
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
    image: null,
  });
  const [userId, setUserId] = useState(null);

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
 

  // Vista previa de la imagen seleccionada
  const imagePreview = profile.image
    ? URL.createObjectURL(profile.image)
    : dataUser.length > 0
    ? dataUser[0].image
    : isValidURL(user.photoURL)
    ? user.photoURL
    : null;

  function isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }


  if (loading) return <h1>loading...</h1>;

  return (
    <div className={styles.containerProfile}>
      <div className={styles.leftSide}>
        <h1 className={styles.title}>Mi perfil</h1>

        {imagePreview ? (
          <div className={styles.imgContainer}>
            <img className={styles.image} src={imagePreview} alt="Profile" />
          </div>
        ) : (
          <>
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
        <h1 className={styles.title}>Mis pedidos</h1>
        <h2 className={styles.subTitle}>Aún no tienes pedidos</h2>
      </div>
    </div>
  );
};

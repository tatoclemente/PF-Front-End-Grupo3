import { useAuth } from "../../Context/authContext";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../Redux/actions/actionsUsers/getAllUsers";
import styles from "./Profile.module.css"
import logo from "../../images/default-image.jpg";

export const Profile = () => {
  const users = useSelector((state) => state.users.users);
  const { user, loading} = useAuth();
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getUsers())
  }, [])

  const emailExists = users.filter((us) => us.email === user.email);
  
  const dataUser = emailExists.map((u) => ({
    name: u.name,
    lastName: u.lastName,
    phoneNumber: u.phoneNumber,
    email: u.email
  }));
  
  const [inputValues, setInputValues] = useState({
    name: user.displayName ? user.displayName : dataUser.length > 0 ? `${dataUser[0].name} ${dataUser[0].lastName}` : "",
    email: user.email ? user.email: dataUser.length > 0 ? dataUser.email: "",
    phoneNumber: dataUser.length > 0 ? dataUser[0].phoneNumber || "" : ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };


  

  // console.log(user)
  // console.log(dataUser)

 if (loading) return <h1>loading...</h1>



  return (<div className={styles.containerProfile}>
    <div className={styles.leftSide}>
      <h1 className={styles.title}>Mi perfil</h1>
      <div className={styles.imgContainer}>
      
      
        {user.photoURL ? (<img className={styles.image} src={user.photoURL}></img>) : (<img className={styles.image} src={logo}></img>)}
      
      </div>
      <div className={styles.userContainer}>
          <label className={styles.label} htmlFor="name">Nombre:</label>
          <span className={styles.info}>{inputValues.name}</span>
        </div>
        <div className={styles.userContainer}>
          <label className={styles.label} htmlFor="email">Email:</label>
          <span className={styles.info}>{inputValues.email}</span>
        </div>
        <div className={styles.userContainer}>
          <label className={styles.label} htmlFor="phoneNumber">Celular:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={inputValues.phoneNumber}
            onChange={handleInputChange}
            className={styles.inputText}
          />
        </div>
        <input type="submit" value="Actualizar datos"  className={styles.submitButton} />
      </div>
   <div className={styles.rightSide}>
    <h1 className={styles.title}>Mis pedidos</h1>
    <h2 className={styles.subTitle}>Aún no tienes pedidos</h2>
   </div>
   </div>
   )
};

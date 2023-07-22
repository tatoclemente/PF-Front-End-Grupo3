import { useAuth } from "../../Context/authContext";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../Redux/actions/actionsUsers/getAllUsers";

export const Profile = () => {
  const users = useSelector((state) => state.users.users);
  const { user, logout, loading} = useAuth();
  const dispatch = useDispatch()
  

  useEffect(()=>{
    dispatch(getUsers())
  }, [])

  console.log(user)

 if (loading) return <h1>loading...</h1>

  const emailExists = users.filter((us) => us.email === user.email);
  
  const dataUser = emailExists.map((u) => ({
    name: u.name,
    lastName: u.lastName,
    phoneNumber: u.phoneNumber,
    email: u.email
  }));


  const handleLogout = async() => {
    await logout()
  }

  return (
    <div>
      {user.displayName ? (
  <div>
    <h1>Iniciaste sesión con Google</h1>
    <p>Nombre: {user.displayName }</p>
    <p>Correo: {user.email} </p>
    <img src={user.photoURL}></img>
  </div>
) : (
  dataUser.map((userData) => (
    <div key={userData.email}>
      <h1>Iniciaste sesión con tu correo</h1>
      <p>Nombre: {userData.name}</p>
      <p>Apellido: {userData.lastName}</p>
      <p>Celular: {userData.phoneNumber}</p>
      <p>Correo: {userData.email}</p>
    </div>
  ))
)}  
      <button onClick={handleLogout}>Salir</button>
    </div>
  );
};

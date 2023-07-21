import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";

export const PrivateRoute = ({ children }) => {
  //cuando este el state en el store de que si el usuario esta logeado :true
  //por ahora uso la variable autenthicated
  const {user, loading} = useAuth()

  if (loading) return <h1>loading...</h1>

  if (!user) return <Navigate to="auth/login" />

  return <>{children}</>
  // let authenticated = true;

  // return authenticated ? children : <Navigate to="/login" />;
};

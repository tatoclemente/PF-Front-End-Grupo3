import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  //cuando este el state en el store de que si el usuario esta logeado :true
  //por ahora uso la variable autenthicated

  let authenticated = true;

  return authenticated ? children : <Navigate to="/login" />;
};

import { Navigate } from "react-router-dom";

export const PrivateRouteUser = ({ children }) => {
  //cuando este el state en el store de que si el usuario esta logeado :true
  //por ahora uso la variable autenthicated

  let isAuthenticated = false;
 


  return isAuthenticated ? children : <Navigate to="/auth/login" />;
};

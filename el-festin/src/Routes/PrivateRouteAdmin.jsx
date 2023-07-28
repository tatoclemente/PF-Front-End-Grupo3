import { Navigate } from "react-router-dom";

export const PrivateRouteAdmin = ({ children }) => {
  //cuando este el state en el store de que si el usuario esta logeado :true
  //por ahora uso la variable autenthicated
console.log("children",children.props.children[1].props.path)

const rutaChildren = children.props.children[1].props.path

  let isAuthenticated = true;
 


  return isAuthenticated ? children : <Navigate to="/auth/login" />;
};

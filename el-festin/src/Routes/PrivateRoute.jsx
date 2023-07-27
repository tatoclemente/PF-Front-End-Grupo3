// PrivateRoute.js
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Importar el useSelector de react-redux

export const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.isLoading);

  if (loading) return <h1>Loading...</h1>;

  if (!user) return <Navigate to="auth/login" />;

  return <>{children}</>;
};

// let authenticated = true;

// return authenticated ? children : <Navigate to="/login" />;

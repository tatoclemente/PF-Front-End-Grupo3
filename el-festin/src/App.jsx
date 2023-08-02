import { useState } from "react";
import style from "./App.module.css";
import { Navbar } from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Home from "./Views/Home/Home";
import About from "./Views/About/About";
import { LoginPage } from "./Views/Login/LoginPage";
import Landing from "./Views/Landing/Landing";
import Detail from "./Views/Detail/Detail";
import ShoppingCart from "./Views/ShoppingCart/ShoppingCart";
import AuthProvider from "./Hook/AuthProvider";
import { PrivateRoute } from "./Routes/PrivateRoute";

import { DashboardView } from "./Views/Dashboard/DashboardView";

import { RegisterPage } from "./Views/Register/RegisterPage";

import { Profile } from "./Components/Profile/Profile";
import { useSelector } from "react-redux";

function App() {
  let location = useLocation();

  const navigate = useNavigate();

  const userGoogle = useSelector((state) => state.auth.user);

  const userDB = useSelector((state) => state.users.users);

  console.log("userGOOGLE", userGoogle);
  console.log("userdB", userDB);

  //const currentUser = userDB.find((user) => user.email === userGoogle.email);
  //console.log("curretUser",currentUser);
  const currentUser = {
    role: "user",
  };

  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className={style.appContainer}>
      <AuthProvider>
        {location.pathname !== "/auth/login" &&
        location.pathname !== "/dashboard" &&
        location.pathname !== "/auth/register" ? (
          <Navbar toggleCart={toggleCart} />
        ) : undefined}
        {location.pathname !== "/auth/login" &&
        location.pathname !== "/dashboard" &&
        location.pathname !== "/auth/register" &&
        isCartOpen ? (
          <div className={style.overlay} onClick={toggleCart} />
        ) : undefined}
        <ShoppingCart isOpen={isCartOpen} onCloseCart={toggleCart} />
        {/* rutas publicas (libre acceso navegando por la pagina) */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/home" element={<Home toggleCart={toggleCart} />} />
          <Route path="/about" element={<About />} />

          {/* rutas de escape (por si alguien escribe cualquier cosa en la url) */}
          {/*<Route path="/*" element={<Landing />} />*/}

          <Route
            path="/detail/:id"
            element={<Detail toggleCart={toggleCart} />}
          />
          {/* rutas privada (para degenegar acceso segun ciertos criterios) */}
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Routes>
                  <Route path="/profile" element={<Profile />} />
                  {currentUser.role !== "user" ? (
                    <Route path="/dashboard" element={<DashboardView />} />
                  ) : (
                    <Route path="*" element={<Navigate to="/home" />} />
                  )}
                </Routes>
              </PrivateRoute>
            }
          />
        </Routes>

        {location.pathname !== "/auth/login" &&
        location.pathname !== "/dashboard" &&
        location.pathname !== "/auth/register" &&
        location.pathname !== "/shopping-cart" ? (
          <Footer />
        ) : undefined}
      </AuthProvider>
      {/* 
      {location.pathname === "/shopping-cart" ? (
        <div className={style.overlay} />
      ) : undefined} */}
    </div>
  );
}

export default App;

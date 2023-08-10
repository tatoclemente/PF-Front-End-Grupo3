import { useState } from "react";
import style from "./App.module.css";
import { Navbar } from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import {
  Routes,
  Route,
  useLocation,
  // useNavigate,
  // Navigate,
} from "react-router-dom";
import Home from "./Views/Home/Home";
import About from "./Views/About/About";
import { LoginPage } from "./Views/Login/LoginPage";
import Landing from "./Views/Landing/Landing";
import Detail from "./Views/Detail/Detail";
import ShoppingCart from "./Views/ShoppingCart/ShoppingCart";
import AuthProvider from "./Hook/AuthProvider";

import { DashboardView } from "./Views/Dashboard/DashboardView";

import { RegisterPage } from "./Views/Register/RegisterPage";

import { Profile } from "./Components/Profile/Profile";

import { BookingView } from "./Views/Booking/BookingView";

// import { useSelector } from "react-redux";
import { decodeToken } from "react-jwt";
import ROUTES from "./Routes/routes";
import PaymentSuccess from "./Views/PymentSuccess/PaymentSuccess";
import PaymentFailed from "./Views/PaymentError/PaymentFailed";
import NotFound from "./Views/404NotFound/404NotFound";

function App() {
  let location = useLocation();

  // const navigate = useNavigate();

  // const userGoogle = useSelector((state) => state.auth.user);

  // const userDB = useSelector((state) => state.users.users);

  // console.log("userGOOGLE", userGoogle);
  // console.log("userdB", userDB);

  //const currentUser = userDB.find((user) => user.email === userGoogle.email);
  //console.log("curretUser",currentUser);
  function getCustomTokenFromLocalStorage() {
    return localStorage.getItem("customToken");
  }
  const customToken = getCustomTokenFromLocalStorage();

  const decodeCustomToken = customToken && decodeToken(customToken);
  const currentUser = {

    //role: decodeCustomToken ? decodeCustomToken.role : false,
    role: "Admin",

  };
  console.log(currentUser)

  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  console.log(currentUser);
  return (
    <div className={style.appContainer}>
      <AuthProvider>
        {location.pathname !== ROUTES.LOGIN &&
        location.pathname !== ROUTES.DASHBOARD &&
        location.pathname !== ROUTES.REGISTER &&
        location.pathname !== ROUTES.ABOUT &&
        location.pathname !== ROUTES.NOT_FOUND ? (
          <Navbar toggleCart={toggleCart} />
        ) : undefined}
        {location.pathname !== ROUTES.LOGIN &&
        location.pathname !== ROUTES.DASHBOARD &&
        location.pathname !== ROUTES.REGISTER &&
        isCartOpen ? (
          <div className={style.overlay} onClick={toggleCart} />
        ) : undefined}
        <ShoppingCart isOpen={isCartOpen} onCloseCart={toggleCart} />
        {/* rutas publicas (libre acceso navegando por la pagina) */}
        <Routes>
          <Route path={ROUTES.LANDING} element={<Landing />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route
            path={ROUTES.HOME}
            element={<Home toggleCart={toggleCart} />}
          />
          
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.PAYMENT_SUCCESS} element={<PaymentSuccess />} />
          <Route
            path={ROUTES.PAYMENT_FAILED}
            element={<PaymentFailed toggleCart={toggleCart} />}
          />

          {/* rutas de escape (por si alguien escribe cualquier cosa en la url) */}
          <Route path="/*" element={<NotFound />} />

          <Route
            path={`${ROUTES.DETAIL}/:id`}
            element={<Detail toggleCart={toggleCart} />}
          />
          {/* rutas privada (para degenegar acceso segun ciertos criterios) */}

          {currentUser.role && (
            <>
              <Route path={ROUTES.BOOKING} element={<BookingView />} />
              <Route
                path={ROUTES.PROFILE}
                element={<Profile toggleCart={toggleCart} />}
              />

              {currentUser.role !== "User"?(
                <Route path={ROUTES.DASHBOARD} element={<DashboardView currentUser={currentUser} />} />
              ): (<Route
                path={ROUTES.HOME}
                element={<Home toggleCart={toggleCart} />}/>) }
            </>
          )}
        </Routes>

        {location.pathname !== ROUTES.LOGIN &&
        location.pathname !== ROUTES.DASHBOARD &&
        location.pathname !== ROUTES.REGISTER &&
        location.pathname !== ROUTES.PAYMENT_SUCCESS &&
        location.pathname !== ROUTES.PAYMENT_FAILED &&
        location.pathname !== ROUTES.ABOUT &&
        location.pathname !== ROUTES.NOT_FOUND ? (
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

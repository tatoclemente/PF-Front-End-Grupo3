import style from "./App.module.css";
import { Navbar } from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Views/Home/Home";
import About from "./Views/About/About";
import { LoginPage } from "./Views/Login/LoginPage";
import Landing from "./Views/Landing/Landing";
import Detail from "./Views/Detail/Detail";
import {AuthProvider} from "./Context/authContext"
// import { PrivateRoute } from "./Routes/PrivateRoute";

import { DashboardView } from "./Views/Dashboard/DashboardView";

import { RegisterPage } from "./Views/Register/RegisterPage";
import ShoppingCart from "./Views/ShoppingCart/ShoppingCart";

function App() {
  let location = useLocation();

  return (
    <div className={style.appContainer}>
      {location.pathname !== "/auth/login" &&
      location.pathname !== "/dashboard" &&
      location.pathname !== "/auth/register" ? (
        <Navbar />
      ) : undefined}
<AuthProvider>
      <Routes>
      
        <Route path="/" element={<Landing />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        {/* <Route
          path="/*"
          element={
            <PrivateRoute>
              <Routes> */}
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/dashboard" element={<DashboardView />} />
                <Route path="/shoppingCart" element={<ShoppingCart />} />

              {/* </Routes>
            </PrivateRoute>
          }
        /> */}
       
      </Routes>
      </AuthProvider>
      {location.pathname !== "/auth/login" &&
      location.pathname !== "/dashboard" &&
      location.pathname !== "/auth/register" ? (
        <Footer />
      ) : undefined}
    </div>
  );
}

export default App;

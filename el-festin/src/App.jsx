import style from "./App.module.css";
import { Navbar } from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Views/Home/Home";
import About from "./Views/About/About";
import { LoginPage } from "./Views/Login/LoginPage";
import Landing from "./Views/Landing/Landing";
import Detail from "./Views/Detail/Detail";
import { PrivateRoute } from "./Routes/PrivateRoute";
import { RegisterPage } from './Views/Register/RegisterPage'

function App() {
  let location = useLocation();
  let isLoginPage = location.pathname.includes("/login");
  return (
    <div className={style.appContainer}>
      {!isLoginPage ? <Navbar /> : undefined}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login/auth/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/detail" element={<Detail />} />
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
      {!isLoginPage ? <Footer /> : undefined}
    </div>
  );
}

export default App;

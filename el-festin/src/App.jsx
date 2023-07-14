import style from "./App.module.css";
import { Navbar } from "./Components/NavBar/NavBar";
import { RegisterPage } from "./Views/Register/Register";
import { Routes, Route } from "react-router-dom";
import Home from "./Views/Home/Home";
import Footer from "./Components/Footer/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Views/Home/Home";
import About from "./Views/About/About";
import Landing from "./Views/Landing/Landing";
import Detail from "./Views/Detail/Detail";
import { PrivateRoute } from "./Routes/PrivateRoute";

function App() {
  let location = useLocation();
  return (
    <div className={style.appContainer}>
      {location.pathname !== "/login" ? <Navbar /> : undefined}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/home" element={<Home />} />
        <Route path="/auth/register" element={<RegisterPage />} />
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
      {location.pathname !== "/login" ? <Footer /> : undefined}
    </div>
  );
}

export default App;

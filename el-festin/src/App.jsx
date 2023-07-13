import style from "./App.module.css";

import { Navbar } from "./Components/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from './Views/Home/Home'
import { LoginPage } from "./Views/Login/LoginPage";


function App() {
  return (
    <div className={style.appContainer}>
      <Navbar />
      <Routes>
        <Routw path="/login" element={<LoginPage />}
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

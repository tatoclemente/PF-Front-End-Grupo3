import style from "./App.module.css";

import { Navbar } from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./Views/Home/Home";
import About from "./Views/About/About";
import { LoginPage } from "./Views/Login/LoginPage";
import Landing from "./Views/Landing/Landing";

function App() {
  return (
    <div className={style.appContainer}>
      <Navbar />
      <Routes>
        <Route path="/" element= {<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

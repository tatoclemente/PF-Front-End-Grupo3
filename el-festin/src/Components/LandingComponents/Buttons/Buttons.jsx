import style from "./Buttons.module.css";
import { Link } from "react-router-dom";
import { scrollToTop } from "../../../Helpers/functions";

const Buttons = () => {
  return (
    <div className={style.container}>
      <Link to="/home" style={{ textDecoration: "none" }}>
        <button onClick={() => scrollToTop()} className={style.button}>
          QUIERO HACER UN PEDIDO
        </button>
      </Link>
      <Link to="/booking" style={{ textDecoration: "none" }}>
        <button onClick={() => scrollToTop()} className={style.button}>QUIERO HACER UNA RESERVACION</button>
      </Link>
    </div>
  );
};

export default Buttons;

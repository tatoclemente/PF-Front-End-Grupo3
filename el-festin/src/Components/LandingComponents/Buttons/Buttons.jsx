import style from "./Buttons.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { scrollToTop } from "../../../Helpers/functions";
import Swal from "sweetalert2";

const Buttons = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleBooking = () => {

    if (!user) {
      Swal.fire({
        icon: "info",
        title: "Ups, lo siento!",
        text: "Debe estar registrado para reservar",
        confirmButtonText: "¡Registrarme Ahora!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/auth/login");
        }
      });
      return;
    } else {
      navigate("/booking");
      scrollToTop(); 
    }
  };

  return (
    <div className={style.container}>
      <Link to="/home" style={{ textDecoration: "none" }}>
        <button onClick={() => scrollToTop()} className={style.button}>
          QUIERO HACER UN PEDIDO
        </button>
      </Link>
   
      <button onClick={() => { handleBooking(); }} className={style.button}>
          QUIERO HACER UNA RESERVACION
        </button>
  
    </div>
  );
};

export default Buttons;

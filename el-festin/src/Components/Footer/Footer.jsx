import { useNavigate } from 'react-router-dom';
import React from "react";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { ImLocation2 } from "react-icons/im";
import { GrInstagram } from "react-icons/gr";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import logo from '../../Assets/logo-el-festin-nav.png';
import Styles from "./Footer.module.css";
import { logout } from "../../Hook/FunctionsAuth";
import { useDispatch } from "react-redux";
import { clearCart } from '../../Redux/actions/actionOrders/actionOrders';
import ROUTES from '../../Routes/routes';
import { scrollToTop } from "../../Helpers/functions";

function Footer() {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const customToken = localStorage.getItem("customToken");

  const handleLogout = async () => {
    await dispatch(clearCart())
    scrollToTop()
    navigate(ROUTES.HOME)
    logout();
  };

  const onClickUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className={Styles.container}>
      <img
        className={Styles.img}
        src={logo}
        alt="logo"

      />
      <div className={Styles.divh5}>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <h5 className={Styles.h5}>Pide aquí</h5>
        </Link>
        {customToken ?
          <span onClick={() => handleLogout()} style={{cursor: "pointer"}}>
            <h5 className={Styles.h5}>Salir</h5>
          </span>
          : <Link to="/auth/login" style={{ textDecoration: "none" }}>
            <h5 className={Styles.h5}>Iniciar Sesión</h5>
          </Link>}

        <Link to="/about" style={{ textDecoration: "none" }}>
          <h5 className={Styles.h5}>Nosotros</h5>
        </Link>
      </div>

      <div className={Styles.divContact}>
        <h5 className={Styles.titleContact}>Contacto</h5>
        <div className={Styles.divContactIcons}>
          <p className={Styles.aContact}>
            <MdEmail size={23} color="#fdc52d" /> Festincontacto2023@gmail.com
          </p>
        </div>
        <div className={Styles.divContactIcons}>
          <p className={Styles.aContact}>
            <BsFillTelephoneFill size={23} color="#fdc52d" /> +54 9-3533-43-1705
          </p>
        </div>
        <div className={Styles.divContactIcons}>
          <p className={Styles.aContact}>
            <ImLocation2 size={23} color="#fdc52d" /> Argentina
          </p>
        </div>
      </div>

      <div className={Styles.divSocial}>
        <h5 className={Styles.titleSocial}>Síguenos</h5>
        <a
          href="https://www.instagram.com/"
          className={Styles.icon}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GrInstagram size={30} color="#fdc52d" />
        </a>
        <a
          href="https://www.facebook.com/"
          className={Styles.icon}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookSquare size={30} color="#fdc52d" />
        </a>
      </div>
      <button className={Styles.buttonUp} onClick={() => onClickUp()}>
        <BsArrowUpCircleFill size={40} color="#fdc52d" />
      </button>
      <p className={Styles.pFestin}>EL FESTÍN ® 2023</p>
    </div>
  );
}

export default Footer;

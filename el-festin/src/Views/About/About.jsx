import React from "react";
import Styles from "./About.module.css";
import logo from '../../Assets/logo-el-festin-nav.png';
import { Link } from "react-router-dom";
import ROUTES from '../../Routes/routes'

export default function About() {
  return (
    <div className={Styles.mainContainer}>
      <div className={Styles.aboutContainer}>
        <div className={Styles.imageContainer}>
        <img
            className={Styles.img}
            src={logo}
            alt="logo"
          />
          <h2 className={Styles.titleAbout}>Nosotros</h2>
          <Link to={ROUTES.HOME} className={Styles.buttonHeader}>
            Entrar a ver
          </Link>
        </div>

        <p className={Styles.p}>
          ¡Bienvenidos a El Festín! Desde nuestra apertura en 2023, nos hemos
          dedicado a ofrecer la mejor experiencia gastronómica.
          <br />
          Ya sea que prefieras disfrutar nuestros platos en casa o reservar una
          mesa en nuestro restaurante, estamos aquí para satisfacerte.
          <br />
          Con nuestra aplicación web, puedes elegir tus platos favoritos, combinarlos de la manera más fácil y rápiada para disfrutar de exquisitas comidas en la comodidad de tu hogar.
          <br />
          <br />
          Si prefieres una experiencia más personalizada, nuestro amable personal
          te recibirá en un ambiente acogedor en nuestro restaurante.
          <br />
          Nuestro menú cuenta con una amplia variedad de opciones, incluyendo platos
          tradicionales e innovadores, así como opciones vegetarianas y sin
          gluten. En cada visita, nos esforzamos por superar tus expectativas con
          nuestra calidad y servicio excepcionales.
          <br />
          <br />
          Entra en nuestra aplicación
          web, haz tu pedido o reserva tu mesa y déjanos crear momentos
          inolvidables a través de nuestra deliciosa comida y atención
          excepcional.
          <br />
          <br />
          En El Festín, tu satisfacción es nuestra prioridad.
        </p>
      </div>
    </div>
  );
}

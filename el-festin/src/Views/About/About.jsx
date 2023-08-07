import React from "react";
import Styles from "./About.module.css";
import logo from '../../Assets/logo-el-festin-nav.png';

export default function About() {
  return (
    <div className={Styles.container}>
      <img
        className={Styles.img}
        src={logo}
        alt="logo"
        width="90"
        height="60"
      />
      <h2>Nosotros</h2>
      <p className={Styles.p}>
        ¡Bienvenidos a El Festín! Desde nuestra apertura en 2023, nos hemos
        dedicado a ofrecer la mejor experiencia gastronómica.
        <br />
        Ya sea que prefieras disfrutar nuestros platos en casa o reservar una
        mesa en nuestro restaurante, estamos aquí para satisfacerte. Con nuestra
        aplicación web, puedes hacer pedidos a domicilio y deleitarte con platos
        exquisitos en la comodidad de tu hogar.
        <br />
        Si prefieres una experiencia más personalizada, nuestro amable personal
        te recibirá en un ambiente acogedor en nuestro restaurante. Nuestro menú
        cuenta con una amplia variedad de opciones, incluyendo platos
        tradicionales e innovadores, así como opciones vegetarianas y sin
        gluten. En cada visita, nos esforzamos por superar tus expectativas con
        nuestra calidad y servicio excepcionales. Entra en nuestra aplicación
        web, haz tu pedido o reserva tu mesa y déjanos crear momentos
        inolvidables a través de nuestra deliciosa comida y atención
        excepcional. En El Festín, tu satisfacción es nuestra prioridad.
      </p>
    </div>
  );
}

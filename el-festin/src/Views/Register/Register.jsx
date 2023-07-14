import React from "react";
import Auth from "../../Auth/Auth";
import loginPhoto from "../../Assets/loginPhoto.jpg";

export const RegisterPage = () => {
  return (
    <div className="row w-100 m-0 bg-color-blue">
      <div className="col-6 position-relative">
        <img src={loginPhoto} alt="imagenlogin" width="600" height="600" />
        <p className="position-absolute top-0 start-50 translate-middle-x pt-5 mt-5 text-white fs-2">
          "Si te estás preguntando cuál es el amor más sincero… <br /> Entra y
          encontrarás la respuesta"
        </p>
      </div>
      <div className="col-6 bg-color-blue">
        <Auth />
      </div>
    </div>
  );
};

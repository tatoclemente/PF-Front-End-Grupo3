import React from "react";
import { Login } from "../../Auth/Login";
import loginPhoto from "../../Assets/loginPhoto.jpg";
import "./LoginPage.css"

export const LoginPage = () => {
  return (
    <>
      <div className="row w-100 m-0 bg-color-blue">
        <div className="col-6 position-relative">
          <img
            src={loginPhoto}
            alt="imagenlogin"
            className="img-fluid img-cover vh-100 w-100"
          />
          <p className="position-absolute mt-5 text-white fs-4 message">
            "Si te estás preguntando cuál es el amor más sincero… <br /> Entra y
            encontrarás la respuesta"
          </p>
        </div>
        <div className="col-6 bg-color-blue d-flex align-items-center justify-content-center">
          <Login />
        </div>
      </div>
    </>
  );
};

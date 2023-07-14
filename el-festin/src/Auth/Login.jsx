import { useState } from "react";
import logo1 from "../Assets/logo1.png";
import logo2 from "../Assets/logo2.png";
import { logo } from "../Helpers/ImageUrl";
import { Link } from "react-router-dom";
import "./login.css";

export const Login = () => {
  let initialState = {
    email: "",
    password: "",
  };

  const [inputLogin, setInputLogin] = useState(initialState);

  const onInputLoginChange = ({ target }) => {
    setInputLogin({ ...inputLogin, [target.name]: target.value });
  };

  const onSubmitLogin = (e) => {
    e.preventDefault();
    console.log(inputLogin);
  };

  return (
    <ul className="">
      <li className="d-flex justify-content-center align-items-center mt-3">
        <img src={logo} alt="image-logo" className="img-fluid w-25" />
      </li>

      <li className="text-white fs-2 mt-5 d-flex justify-content-center align-items-center">
        Ingresa aqui
      </li>
      <form onSubmit={onSubmitLogin}>
        <li className="d-flex justify-content-center align-items-center">
          <label className="text-white fs-5 pb-2 pt-4">Email</label>
        </li>
        <li className="d-flex justify-content-center align-items-center">
          <input
            type="text"
            className="login-input"
            name="email"
            value={inputLogin.email}
            onChange={onInputLoginChange}
          />
        </li>
        <li className="d-flex justify-content-center align-items-center">
          <label className="text-white fs-5 pb-2 pt-4">Contraseña</label>
        </li>
        <li className="d-flex justify-content-center align-items-center">
          <input
            type="text"
            className="login-input"
            name="password"
            value={inputLogin.password}
            onChange={onInputLoginChange}
          />
        </li>
        <li className="d-flex justify-content-center align-items-center">
          <button
            type="submit"
            className="d-flex justify-content-center align-items-center mt-3 btn-login fs-5 fw-bold">
            Entrar
          </button>
        </li>
      </form>

      <li className="d-flex justify-content-center align-items-center pt-4">
        <button className="btn-google-rounded text-white fs-5">
          <span>
            <img
              src={logo1}
              alt="logo google"
              className="img-fluid img-login-button"
            />
          </span>{" "}
          Continuar con Google
        </button>
      </li>
      <li className="d-flex justify-content-center align-items-center pt-4">
        <button className="btn-face-rounded text-white fs-5">
          <span>
            <img
              src={logo2}
              alt="logo de facebook"
              className="img-fluid img-login-button"
            />
          </span>{" "}
          Continuar con Facebook
        </button>
      </li>
      <li className="d-flex justify-content-center align-items-center pt-4">
        <p className="text-white fs-5 pb-2 pt-2 fs-5">
          No tienes cuenta? &nbsp;
          <Link to="auth/register" className="color-register-b">
            Registrate aqui
          </Link>
        </p>
      </li>
    </ul>
  );
};

<<<<<<< HEAD
import React, { useState } from "react";
//import { useSelector, useDispatch } from "react-redux";
import Styles from "./Auth.module.css";
import { GoogleLogin } from "react-google-login";

function Auth() {
  const logo =
    "https://res.cloudinary.com/dg83wyf9p/image/upload/v1689108438/logos%20e%20imagenes/logo_vsr7uy.png";
  //const dispatch = useDispatch();
  //const users = useSelector((state) => state.email);
  const [register, setRegister] = useState({
    name: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [viewPassword, setViewPassword] = useState(false);
  const PasswordVisibility = () => {
    setViewPassword(!viewPassword);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const existingemail = users.map((us) => us.email);
  //   const errorsValue = Object.values(errors);
  //   if (errorsValue.length === 0 && register.name.length) {
  //     if (existingemail.includes(register.email)) {
  //       alert("User email already exists");
  //     } else {
  //       dispatch(postUsers(register));
  //       alert("Registered user");

  //       setRegister({
  //         name: "",
  //         lastName: "",
  //         phoneNumber: "",
  //         email: "",
  //         password: "",
  //       });
  //     }
  //   }
  // };

  const handleGoogleLoginSuccess = (response) => {
    // Aquí puedes acceder a la respuesta de autenticación de Google y enviar los datos al servidor
    console.log(response);
  };

  const handleGoogleLoginFailure = (error) => {
    // Aquí puedes manejar el error de autenticación de Google
    console.error(error);
  };

  return (
    <div className={Styles.container}>
      <form className={Styles.form} onSubmit={handleSubmit}>
        <img
          className={Styles.img}
          src={logo}
          alt="logo"
          width="100"
          height="60"
        />
        <div className={Styles.divInputs}>
          <label className={Styles.label}>Nombre</label>
          <input
            className={Styles.input}
            type="text"
            name="name"
            value={register.name}
            onChange={handleChange}
            required
          />
          <label className={Styles.label}>Apellido</label>
          <input
            className={Styles.input}
            type="text"
            name="lastName"
            value={register.lastName}
            onChange={handleChange}
            required
          />
          <label className={Styles.label}>Telefono</label>
          <input
            className={Styles.input}
            type="text"
            name="phoneNumber"
            value={register.dateOfBirth}
            onChange={handleChange}
            required
          />
          <label className={Styles.label}>Email</label>
          <input
            className={Styles.input}
            type="email"
            name="email"
            value={register.email}
            onChange={handleChange}
            required
          />
          <label className={Styles.label}>Contraseña</label>
          <div className={Styles.inputContainer}>
            <input
              className={`${Styles.input} ${
                viewPassword ? PasswordVisibility : ""
              }`}
              onClick={PasswordVisibility}
              type={viewPassword ? "text" : "password"}
              name="password"
              value={register.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button className={Styles.button} type="submit">
          Registrarse
        </button>
        <br />
        <GoogleLogin
          clientId="28920578166-ob0r6ojjbt4qto749a4ksh8i3o3au840.apps.googleusercontent.com"
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          buttonText="Continuar con Google"
          isSignedIn={true}
          cookiePolicy={"single_host_origin"}
          className={Styles.googleButton}
        />
      </form>
    </div>
  );
=======
import React from "react";

function Auth() {
  return <div></div>;
>>>>>>> develop
}

export default Auth;

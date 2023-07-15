import React, { useState } from "react";
//import { useSelector, useDispatch } from "react-redux";
import logoGoogle from "../Assets/logo1.png";
import logoFacebook from "../Assets/logo2.png";
import Validate from "./validateRegister";
import Styles from "./Register.module.css";

function Register() {
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
  const [validateInput, setValidateInput] = useState(false);
  const [errors, setErrors] = useState({}); //estado manejar errores de validacion.
  const PasswordVisibility = () => {
    setValidateInput(!validateInput);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
    setValidateInput({
      ...register,
      [e.target.name]: true,
    });
    setErrors(
      Validate({
        ...register,
        [e.target.name]: e.target.value,
      })
    );
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

  return (
    <div className={Styles.container}>
      <form className={Styles.form} onSubmit={handleSubmit}>
        <img
          className={Styles.img}
          src={logo}
          alt="logo"
          width="130"
          height="70"
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
          {setValidateInput.name && register.name && (
            <p className={Styles.error}>{errors.name}</p>
          )}
          <label className={Styles.label}>Apellido</label>
          <input
            className={Styles.input}
            type="text"
            name="lastName"
            value={register.lastName}
            onChange={handleChange}
          />
          {setValidateInput.name && register.lastName && (
            <p className={Styles.error}>{errors.lastName}</p>
          )}
          <label className={Styles.label}>Telefono</label>
          <input
            className={Styles.input}
            type="text"
            name="phoneNumber"
            value={register.phoneNumber}
            onChange={(e) => handleChange(e)}
            required
          />
          {setValidateInput.name && register.phoneNumber && (
            <p className={Styles.error}>{errors.phoneNumber}</p>
          )}

          <label className={Styles.label}>Email</label>
          <input
            className={Styles.input}
            type="email"
            name="email"
            value={register.email}
            onChange={handleChange}
            required
          />
          {setValidateInput.name && register.email && (
            <p className={Styles.error}>{errors.email}</p>
          )}
          <label className={Styles.label}>Contraseña</label>
          <div className={Styles.inputContainer}>
            <input
              className={Styles.input}
              onClick={PasswordVisibility}
              type="password"
              name="password"
              value={register.password}
              onChange={handleChange}
              required
            />
            {setValidateInput.name && register.password && (
              <p className={Styles.error}>{errors.password}</p>
            )}
          </div>
        </div>
        <button className={Styles.button} type="submit">
          Registrarse
        </button>
        <li className={Styles.liButtonsAuth}>
          <button className={Styles.buttonAuth}>
            <span>
              <img src={logoGoogle} alt="google" className={Styles.imgButton} />
            </span>
            Registrarse con Google
          </button>
          <button className={Styles.buttonAuth1}>
            <span>
              <img
                src={logoFacebook}
                alt="facebook"
                className={Styles.imgButton}
              />
            </span>
            Registrarse con Facebook
          </button>
        </li>
      </form>
    </div>
  );
}
export default Register;

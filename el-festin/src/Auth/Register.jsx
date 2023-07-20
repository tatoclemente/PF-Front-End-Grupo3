import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postUsers } from "../Redux/actions/actionsUsers/postUsers.js";
import Validate from "./validateRegister";
import Styles from "./Register.module.css";
import { getUsers } from "../Redux/actions/actionsUsers/getAllUsers.js";

function Register() {
  const logo =
    "https://res.cloudinary.com/dg83wyf9p/image/upload/v1689108438/logos%20e%20imagenes/logo_vsr7uy.png";
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
 
  const [register, setRegister] = useState({
    name: "",
    lastName: "",
    phoneNumber: "",
    birthDate: "",
    email: "",
    password: "",

  });
  const [validateInput, setValidateInput] = useState(false);
  const [errors, setErrors] = useState({}); //estado manejar errores de validacion.
  const PasswordVisibility = () => {
    setValidateInput(!validateInput);
  };

  useEffect(() => {
    dispatch(getUsers());

  }, []);

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
    const emailExists = users.some((user) => user.email.toLowerCase() === register.email.toLowerCase());
    const errorsValue = Object.values(errors);
    
    if (errorsValue.length === 0 && register.email.length) {
      if (emailExists) {
        alert("Ya existe un usuario con ese email");
      } else {
        dispatch(postUsers(register));
        alert("¡Ha sido registrado exitosamente!");
  
        setRegister({
          name: "",
          lastName: "",
          phoneNumber: "",
          birthDate: "",
          email: "",
          password: "",
        });
      }
    } else {
      let errorsMessage = errorsValue.filter((error)=> error !== "")
      if(errorsMessage){
        alert("Por favor complete todos los campos correctamente")
      }
    }
  };
  

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
          />
          {setValidateInput.name && register.phoneNumber && (
            <p className={Styles.error}>{errors.phoneNumber}</p>
          )}


<label className={Styles.label}>Fecha de nacimiento</label>
          <input
            className={Styles.input}
            type="date"
            name="birthDate"
            value={register.birthDate}
            onChange={handleChange}
          />




          <label className={Styles.label}>Email</label>
          <input
            className={Styles.input}
            type="email"
            name="email"
            value={register.email}
            autoComplete="off"
            onChange={handleChange}
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
              autoComplete="off"
              onChange={handleChange}
            />
            {setValidateInput.name && register.password && (
              <p className={Styles.error}>{errors.password}</p>
            )}
          </div>
        </div>
        <button className={Styles.button} type="submit">
          Registrarse
        </button>
      </form>
    </div>
  );
}
export default Register;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postUsers } from "../Redux/actions/actionsUsers/postUsers.js";
import Validate from "./validateRegister";
import { getUsers } from "../Redux/actions/actionsUsers/getAllUsers.js";
import { useAuth } from "../Context/authContext.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md"
import "./register.css";

function Register() {
  // const logo =
  //   "https://res.cloudinary.com/dg83wyf9p/image/upload/v1689108438/logos%20e%20imagenes/logo_vsr7uy.png";

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const { signup } = useAuth()
  const navigate = useNavigate()
 
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const emailExists = users.some((user) => user.email.toLowerCase() === register.email.toLowerCase());
      const errorsValue = Object.values(errors);
      
      if (errorsValue.length === 0 && register.email.length) {
        if (emailExists) {
          alert("Ya existe un usuario con ese email");
        } else {
          await signup(register.email, register.password)
          dispatch(postUsers(register));
          alert("¡Ha sido registrado exitosamente!");
          navigate("/home")
    
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
    } catch (error) {
      console.error("Ha ocurrido un error:", error);
    }
  };

  return (
    <div className="container">
        <Link to="/auth/login">
      <MdArrowBackIosNew className="backButton text-white position-absolute mt-1 fs-3"  style={{ left: "51%" }}/>
      </Link>
      <form onSubmit={handleSubmit}>
        <ul className="list-unstyled">
          {/* <li className="d-flex justify-content-center align-items-center mt-3">
            <img
              className="img-fluid"
              src={logo}
              alt="logo"
              width="130"
              height="70"
            />
          </li> */}
          <li className="text-white fs-3 mt-4 d-flex justify-content-center align-items-center">
            Registrate aquí
          </li>
          <li className="d-flex justify-content-center align-items-center">
            <label className="inputDistance text-white fs-6 pb-2 pt-4">Nombre</label>
          </li>
          <li className="d-flex justify-content-center align-items-center">
          <div className="register-input-container">
            <input
              className="register-input"
              type="text"
              name="name"
              value={register.name}
              onChange={handleChange}
            />
          {setValidateInput.name && register.name && (
              <p className="error-message text-danger position-absolute">{errors.name}</p>
            )}
            </div>
            </li>
          <li className="d-flex justify-content-center align-items-center">
            <label className="inputDistance text-white fs-6 pb-2 pt-3">Apellido</label>
          </li>
          <li className="d-flex justify-content-center align-items-center">
          <div className="register-input-container">
            <input
              className="register-input"
              type="text"
              name="lastName"
              value={register.lastName}
              onChange={handleChange}
            />
          
          {setValidateInput.name && register.lastName && (
              <p className="error-message text-danger position-absolute">{errors.lastName}</p>
            )}
            </div>
            </li>
          <li className="d-flex justify-content-center align-items-center">
            <label className="inputDistance text-white fs-6 pb-2 pt-3">Telefono</label>
          </li>
          <li className="d-flex justify-content-center align-items-center">
          <div className="register-input-container">
            <input
              className="register-input"
              type="text"
              name="phoneNumber"
              value={register.phoneNumber}
              onChange={(e) => handleChange(e)}
            /> 
          {setValidateInput.name && register.phoneNumber && (
              <p className="error-message text-danger position-absolute">{errors.phoneNumber}</p>
            )}
            </div>
            </li>
          <li className="d-flex justify-content-center align-items-center">
            <label className="inputDistance text-white fs-6 pb-2 pt-3">Fecha de nacimiento</label>
          </li>
          <li className="d-flex justify-content-center align-items-center">
            <input
              className="register-input"
              type="date"
              name="birthDate"
              value={register.birthDate}
              onChange={handleChange}
            />
          </li>
          <li className="d-flex justify-content-center align-items-center">
            <label className="inputDistance text-white fs-6 pb-2 pt-3">Email</label>
          </li>
          <li className="d-flex justify-content-center align-items-center">
          <div className="register-input-container">
            <input
              className="register-input"
              type="email"
              name="email"
              value={register.email}
              autoComplete="off"
              onChange={handleChange}
            />
    
          {setValidateInput.name && register.email && (
              <p className="error-message text-danger position-absolute">{errors.email}</p>
            )}
            </div>
            </li>
          <li className="d-flex justify-content-center align-items-center">
            <label className="inputDistance text-white fs-6 pb-2 pt-3">Contraseña</label>
          </li>
          <li className="d-flex justify-content-center align-items-center">
            <div className="register-input-container">
              <input
                className="register-input"
                onClick={PasswordVisibility}
                type="password"
                name="password"
                value={register.password}
                autoComplete="off"
                onChange={handleChange}
              />
              {setValidateInput.name && register.password && (
                <p className="error-message text-danger position-absolute" >{errors.password}</p>
              )}
            </div>
          </li>
          <li className="d-flex justify-content-center align-items-center">
            <button
              type="submit"
              className="buttonDistance d-flex justify-content-center align-items-center btn-register fs-6 fw-bold"
            >
              Registrarse
            </button>
          </li>
        </ul>
      </form>
    </div>
  );}
export default Register;

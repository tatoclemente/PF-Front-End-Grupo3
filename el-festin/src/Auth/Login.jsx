import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import logo1 from "../Assets/logo1.png";
import { server } from "../Helpers/EndPoint";
import { logo } from "../Helpers/ImageUrl";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../Redux/actions/actionsUsers/getAllUsers";
import Swal from "sweetalert2";
import "./login.css";
import { MdArrowBackIosNew } from "react-icons/md";
import axios from "axios";
import { login, logingWithGoogle, resetPassword } from "../Hook/FunctionsAuth";
import { setCartFromDatabase } from "../Redux/actions/actionOrders/actionOrders";

export const Login = () => {
  const usersDB = useSelector((state) => state.users.users);
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const clearErrors = () => {
    setErrors({
      email: "",
      password: "",
    });
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      handleGooglePost();
    }
  }, [user]);

  const handleChange = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
    clearErrors();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const noEmail = usersDB.every(
      (us) => us.email.toLowerCase() !== users.email.toLowerCase()
    );
    const noPassword = usersDB.every((us) => us.password !== users.password);

    if (!users.email || !users.password) {
      setErrors({
        email: users.email ? "" : "El correo electrónico es obligatorio",
        password: users.password ? "" : "La contraseña es obligatoria",
      });
    } else if (noEmail) {
      setErrors({ email: "No existe un usuario con ese correo electrónico" });
    } else if (noPassword) {
      setErrors({ password: "Contraseña incorrecta" });
    } else {
      try {
        // Iniciar sesión en Firebase y obtener el token de acceso
        const response = await login(users.email, users.password);

        const firebaseToken = await response.user.getIdToken();
        console.log(firebaseToken);
        // Enviar el token de Firebase al servidor
        const serverResponse = await axios.post(`${server}/create-jwt`, {
          firebaseToken,
        });

        // Obtener el token JWT personalizado desde la respuesta del servidor
        const customToken = serverResponse.data.token;

        dispatch(setCartFromDatabase(customToken));

        // Guardar el token JWT personalizado en el almacenamiento local o en una cookie
        localStorage.setItem("customToken", customToken);
        // login(users.email, users.password)
        navigate("/home");
        Swal.fire({
          icon: "success",
          title: "¡Bienvenido al Festin!",
          confirmButtonText: "OK",
        });
        setUsers({
          email: "",
          password: "",
        });
        setErrors({});
      } catch (error) {
        console.error("Error de autenticación:", error.message);
      }
    }
  };

  const postUsers = async (userData) => {
    try {
      const { data } = await axios.post(`${server}/user`, userData);
      console.log("data", data);
    } catch (error) {
      console.error("Error de post:", error.message);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const googleUser = await logingWithGoogle();

      const googleToken = await googleUser.getIdToken();

      const serverResponse = await axios.post(`${server}/create-jwt`, {
        firebaseToken: googleToken,
      });

      // Obtener el token JWT personalizado desde la respuesta del servidor
      const customToken = serverResponse.data.token;

      dispatch(setCartFromDatabase(customToken));

      // Guardar el token JWT personalizado en el almacenamiento local o en una cookie
      localStorage.setItem("customToken", customToken);

      // Guardar el token JWT personalizado en el almacenamiento local o en una cookie
      localStorage.setItem("customToken", customToken);
    } catch (error) {
      console.error("Error de autenticación:", error.message);
    }
  };

  const handleGooglePost = async () => {
    const emailExist = usersDB.map((us) => us.email);
    if (emailExist.includes(user.email)) {
      navigate("/home");
      Swal.fire({
        icon: "success",
        title: "¡Bienvenido al Festin!",
        confirmButtonText: "OK",
      });
    } else if (!emailExist.includes(user.email)) {
      const userData = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        lastName: "",
      };

      await postUsers(userData);
      // Obtener el token de acceso de Firebase del usuario autenticado
      const googleToken = await user.getIdToken();

      // Enviar el token de acceso de Firebase al servidor para obtener el JWT personalizado
      const serverResponse = await axios.post(`${server}/create-jwt`, {
        firebaseToken: googleToken,
      });

      // Obtener el token JWT personalizado desde la respuesta del servidor
      const customToken = serverResponse.data.token;

      // Guardar el token JWT personalizado en el almacenamiento local o en una cookie
      localStorage.setItem("customToken", customToken); // O usa document.cookie para guardar en una cookie

      navigate("/home");
      Swal.fire({
        icon: "success",
        title: "¡Bienvenido al Festin!",
        confirmButtonText: "OK",
      });
    }
  };

  const handleResetPassword = async () => {
    if (!users.email) return setErrors({ email: "Ingrese un email" });
    try {
      resetPassword(users.email);
      Swal.fire({
        icon: "success",
        title:
          "Se ha enviado un correo a tu email para restablecer tu contraseña",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error de restablecimiento de contraseña:", error.message);
    }
  };

  return (
    <ul className="">
      <Link to="/">
        <MdArrowBackIosNew
          className="backButton text-white position-absolute mt-4 fs-3"
          style={{ left: "51%" }}
        />
      </Link>
      <li className="d-flex justify-content-center align-items-center">
        <img src={logo} alt="imagen-logo" className="img-fluid w-25 mt-4" />
      </li>

      <li className="text-white fs-3 mt-4 d-flex justify-content-center align-items-center">
        Ingresa aquí
      </li>
      <form onSubmit={handleSubmit}>
        <li className="d-flex justify-content-center align-items-center">
          <label className="text-white fs-6 pb-2 pt-4">Email</label>
        </li>
        <li className="d-flex justify-content-center align-items-center">
          <div className="register-input-container">
            <input
              type="text"
              className="login-input"
              name="email"
              value={users.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="error-message text-danger position-absolute">
                {errors.email}
              </p>
            )}
          </div>
        </li>

        <li className="d-flex justify-content-center align-items-center">
          <label className="text-white fs-6 pb-2 pt-4">Contraseña</label>
        </li>
        <li className="d-flex justify-content-center align-items-center">
          <div className="register-input-container">
            <input
              type="password"
              className="login-input"
              name="password"
              value={users.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="error-message text-danger position-absolute">
                {errors.password}
              </p>
            )}
          </div>
        </li>

        <li className=" d-flex justify-content-center pt-4 fs-6">
          <a
            href="#!"
            className="color-register-b"
            onClick={handleResetPassword}
          >
            ¿Olvidaste la contraseña?
          </a>
        </li>

        <li className="d-flex justify-content-center align-items-center">
          <button
            type="submit"
            className="d-flex justify-content-center align-items-center mt-3 btn-login fs-6 fw-bold"
          >
            Entrar
          </button>
        </li>
      </form>

      <li className="d-flex justify-content-center align-items-center pt-4">
        <button
          className="btn-google-rounded text-white fs-6"
          onClick={handleGoogleLogin}
        >
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
        <p className="text-white fs-5 pt-1 fs-6">
          ¿No tienes cuenta? &nbsp;
          <Link to="/auth/register" className="color-register-b">
            Registrate aqui
          </Link>
        </p>
      </li>
    </ul>
  );
};

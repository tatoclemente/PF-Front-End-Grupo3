import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import logo1 from "../Assets/logo1.png";
import logo2 from "../Assets/logo2.png";
import { logo } from "../Helpers/ImageUrl";
import { Link } from "react-router-dom";
import "./login.css";
import { useAuth } from "../Context/authContext";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../Redux/actions/actionsUsers/getAllUsers";

export const Login = () => {
  const users = useSelector((state) => state.users.users);

  const { login, logingWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
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

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    clearErrors();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const noEmail = users.every(
      (us) => us.email.toLowerCase() !== user.email.toLowerCase()
    );
    const noPassword = users.every((us) => us.password !== user.password);

    if (!user.email || !user.password) {
      setErrors({
        email: user.email ? "" : "El correo electrónico es obligatorio",
        password: user.password ? "" : "La contraseña es obligatoria",
      });
    } else if (noEmail) {
      setErrors({ email: "No existe un usuario con ese correo electrónico" });
    } else if (noPassword) {
      setErrors({ password: "Contraseña incorrecta" });
    } else {
      try {
        await login(user.email, user.password);
        navigate("/home");
        setUser({
          email: "",
          password: "",
        });
        setErrors({});
      } catch (error) {
        console.error("Error de autenticación:", error.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await logingWithGoogle();
      navigate("/home");
    } catch (error) {
      console.error("Error de autenticación:", error.message);
    }
  };
  // const handleFacebookLogin = async () => {
  //   try {
  //     await logingWithFacebook();
  //     navigate("/home");
  //   } catch (error) {
  //     console.error("Error de autenticación:", error.message);
  //   }
  // };
  const handleResetPassword = async () => {
    if (!user.email) return setErrors({ email: "Ingrese un email" });
    try {
      await resetPassword(user.email);
      alert(
        "Se ha enviado un correo a tu email para restablecer tu contraseña"
      );
    } catch (error) {
      console.error("Error de restablecimiento de contraseña:", error.message);
    }
  };

  return (
    <ul className="">
      <li className="d-flex justify-content-center align-items-center mt-3">
        <img src={logo} alt="imagen-logo" className="img-fluid w-25" />
      </li>

      <li className="text-white fs-2 mt-5 d-flex justify-content-center align-items-center">
        Ingresa aqui
      </li>
      <form onSubmit={handleSubmit}>
        <li className="d-flex justify-content-center align-items-center">
          <label className="text-white fs-5 pb-2 pt-4">Email</label>
        </li>
        <li className="d-flex justify-content-center align-items-center">
          <input
            type="text"
            className="login-input"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </li>
        {errors.email && <p className="text-danger">{errors.email}</p>}
        <li className="d-flex justify-content-center align-items-center">
          <label className="text-white fs-5 pb-2 pt-4">Contraseña</label>
        </li>
        <li className="d-flex justify-content-center align-items-center">
          <input
            type="text"
            className="login-input"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </li>
        {errors.password && <p className="text-danger">{errors.password}</p>}
        <li className=" d-flex justify-content-center pt-1">
          <a
            href="#!"
            className="color-register-b"
            onClick={handleResetPassword}
          >
            Olvidaste la contraseña
          </a>
        </li>

        <li className="d-flex justify-content-center align-items-center">
          <button
            type="submit"
            className="d-flex justify-content-center align-items-center mt-3 btn-login fs-5 fw-bold"
          >
            Entrar
          </button>
        </li>
      </form>

      <li className="d-flex justify-content-center align-items-center pt-4">
        <button
          className="btn-google-rounded text-white fs-5"
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
        <button
          className="btn-face-rounded text-white fs-5"
          //onClick={handleFacebookLogin}
        >
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
          <Link to="/auth/register" className="color-register-b">
            Registrate aqui
          </Link>
        </p>
      </li>
    </ul>
  );
};

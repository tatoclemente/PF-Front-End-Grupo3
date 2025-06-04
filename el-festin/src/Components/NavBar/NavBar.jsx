import { useCallback, useEffect, useState } from "react";
import { BiRestaurant } from "react-icons/bi";
import { FiLogIn } from "react-icons/fi";
import { GiCook } from "react-icons/gi";
import { decodeToken } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import cart from "../../Assets/bolsa-pedido.png";
import logo from "../../Assets/logo-el-festin-nav.png";
import profileImg from "../../Assets/profile.png";
import "../../Components/NavBar/Navbar.css";
import calculateTotalItems from "../../functions/calculateTotalItems";
import { logout } from "../../Hook/FunctionsAuth";
import { clearCart } from "../../Redux/actions/actionOrders/actionOrders";
import { getUsers } from "../../Redux/actions/actionsUsers/getAllUsers";
import ROUTES from "../../Routes/routes";
import { SearchBar } from "./SearchBar";
// import Modal from 'react-modal';

export const Navbar = ({ isDashboard, toggleCart }) => {
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const order = useSelector((state) => state.cart);
  const users = useSelector((state) => state.users.users);
  const user = useSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState({});

  // console.log(users);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  
  const handleLogout = async () => {
    await dispatch(clearCart())
    navigate(ROUTES.HOME)
    logout();
  };

  const totalItems = calculateTotalItems(order);

  const landing = location.pathname;

  // console.log(user);

   // Función que utiliza la información de user
   const handleSomethingWithUser = useCallback(() => {
    if (user) {
      // Realizar operaciones utilizando la información de user
      setUserEmail(user.email);
    } else {
      console.log("El usuario no está autenticado.");
    }
  }, [user]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  useEffect(() => {
    handleSomethingWithUser()

  }, [handleSomethingWithUser]);

  const CurrentUser = Array.isArray(users) && users.find((u) => u.email === userEmail);

  const userImage = CurrentUser && CurrentUser.image;

  const customToken = localStorage.getItem('customToken');
  const decodeCustomToken = customToken && decodeToken(customToken);

  const { role } = decodeCustomToken !== null && decodeCustomToken;


  return (
    <div className="d-flex justify-content-between navbarLanding">
      <Link className="navbar-brand d-none d-lg-block" to="/">
        <img src={logo} alt="logo" className="img-width-logo" />
      </Link>
      {isDashboard ? null : (
        <div className="d-none d-lg-block seach-bar-nav">
          <SearchBar path={landing} />
        </div>
      )}
      <div className='right-container'>
        {!isDashboard &&
        <>
          {location.pathname === ROUTES.LANDING && <div className='go-about'>
            <GiCook style={{fontSize: '1.8rem'}} />
            <Link to={ROUTES.ABOUT}>Nosotros</Link>
          </div>}
          <div style={location.pathname === ROUTES.HOME ? {borderBottom: '2px solid var(--main-color)', color: 'var(--main-color)'} : undefined} className='go-home'>
            <BiRestaurant style={{fontSize: '1.8rem'}} />
            <Link to={ROUTES.HOME}>Pide aquí</Link>
          </div>
        </>
        
        }

        <div className="dropdown-container d-none d-lg-flex align-items-center">
          {isDashboard ? (
            <div className="d-none d-lg-block button-admin">
              <Link to="/" className="text-decoration-none text-white fs-4">
                Vista Cliente
              </Link>
            </div>
          ) : user ? (
            <div className="dropdown-container">
              <button className="dropdown-button" onClick={handleOpen}>
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    width="50"
                    height="50"
                    alt="profile"
                    style={{
                      borderRadius: "30px",
                      border: "2px solid white",
                    }}
                  ></img>
                ) : (
                  <img
                    src={userImage ? userImage : profileImg}
                    width="60"
                    height="60"
                    style={{ borderRadius:"50%"}}
                    alt="profile"
                  ></img>
                )}
              </button>
              {isOpen && (
                <div className="dropdown-menu">
                  {role !== null && role !== 'User' ? (
                    <Link to="/dashboard">Administrador</Link> 
                  ) : null}
                  <Link to="/profile">Mi cuenta</Link>
                  <Link onClick={handleLogout}>Cerrar sesión</Link>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth/login"
              className="text-decoration-none text-white me-2 sign-in"
            >
              <FiLogIn className="fs-4 icon-login" />
              {" "}
              Ingresar{" "}
            </Link>
          )}
          {isDashboard ? null : (
            <div className="text-end cart" onClick={toggleCart}>
              <img
                src={cart}
                alt="cart"
                className="img-width-cart position-relative"
              />
              <span className="position-absolute top-50 translate-middle badge rounded-pill fs-6 bg-countCart mt-3">
                {totalItems}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../Components/NavBar/Navbar.css";
import { SearchBar } from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import calculateTotalItems from "../../functions/calculateTotalItems";
import profileImg from "../../Assets/profile.png";
import logo from "../../Assets/logo-el-festin-nav.png";
import cart from "../../Assets/bolsa-pedido.png";
import { getUsers } from "../../Redux/actions/actionsUsers/getAllUsers";
import { logout } from "../../Hook/FunctionsAuth";
import { useEffect, useState } from "react";
import { clearCart } from "../../Redux/actions/actionOrders/actionOrders";
import ROUTES from "../../Routes/routes";
import { GiCook } from "react-icons/gi";
import { BiRestaurant } from "react-icons/bi";
import { decodeToken } from "react-jwt";
// import Modal from 'react-modal';

export const Navbar = ({ isDashboard, toggleCart }) => {
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const order = useSelector((state) => state.cart);
  const users = useSelector((state) => state.users.users);
  const user = useSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

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

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  useEffect(() => {
    if (user && users.email) {
      const emailUser = Array.isArray(users) ? users.find((u) => u.email === user.email) : [];
      setUserEmail(emailUser);
    }
  }, [user, users]);

  const userImage = userEmail ? userEmail.image : null;

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
            <BiRestaurant style={{fontSize: '20px', transform: 'scale(3.7)'}} />
            <Link to={ROUTES.ABOUT}>Nosotros</Link>
          </div>}
          <div style={location.pathname === ROUTES.HOME ? {borderBottom: '2px solid var(--main-color)', color: 'var(--main-color)'} : undefined} className='go-home'>
            <GiCook style={{fontSize: '1.8rem'}} />
            <Link to={ROUTES.HOME}>Home</Link>
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
                    width="50"
                    height="50"
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

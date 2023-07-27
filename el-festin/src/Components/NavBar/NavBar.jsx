import { Link, useLocation } from "react-router-dom";
import { logo, cart } from "../../Helpers/ImageUrl";
import "../../Components/NavBar/Navbar.css";
import { SearchBar } from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import calculateTotalItems from "../../functions/calculateTotalItems";
import profileImg from "./images/profile.png";
import { getUsers } from "../../Redux/actions/actionsUsers/getAllUsers";
import { logout } from "../../Hook/FunctionsAuth";
import { useEffect, useState } from "react";
// import Modal from 'react-modal';

export const Navbar = ({ isDashboard, toggleCart }) => {
  const location = useLocation();

  const dispatch = useDispatch();
  const order = useSelector((state) => state.cart);
  const users = useSelector((state) => state.users.users);
  const user = useSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);

  // console.log(users);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const totalItems = calculateTotalItems(order);

  const landing = location.pathname;

  // console.log(user);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <>
      <div className="container-fluid position-relative navbarLanding">
        <div className="container-fluid position-absolute top-0 start-0">
          <div className="d-flex justify-content-between pt-4 align-items-center">
            <Link className="navbar-brand d-none d-lg-block ps-lg-5" to="/">
              <img src={logo} alt="logo" className="img-width-logo" />
            </Link>
            {isDashboard ? null : (
              <div className="d-none d-lg-block">
                <SearchBar path={landing} />
              </div>
            )}
            <div className="dropdown-container d-none d-lg-flex align-items-center ps-5">
              {isDashboard ? (
                <div className="d-none d-lg-block pe-3">
                  <Link to="/" className="text-decoration-none text-white fs-3">
                    Salir
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
                        style={{
                          borderRadius: "30px",
                          border: "2px solid white",
                        }}
                      ></img>
                    ) : (
                      <img src={profileImg} width="50" height="50"></img>
                    )}
                  </button>
                  {isOpen && (
                    <div className="dropdown-menu">
                      <Link to="/profile">Mi cuenta</Link>
                      <Link onClick={handleLogout}>Cerrar sesión</Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/auth/login"
                  className="text-decoration-none text-white fs-4 me-2 sign-in"
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
      </div>
    </>
  );
};
//  <nav className="navbarLanding">
//         <Link className="navbar-brand d-none d-lg-block ps-lg-5" href="/*">
//           <img src={logo} alt="logo" className="img-width-logo" />
//         </Link>
//         <div className="d-none d-lg-block">
//           <SearchBar />
//         </div>

//         <div className="d-none d-lg-block">
//           <Link
//             to="/login"
//             className="text-decoration-none text-white fs-3">
//             {" "}
//             Ingresar{" "}
//           </Link>
//           <Link to="/cart" className="text-end">
//             <img
//               src={cart}
//               alt="cart"
//               className="img-width-cart position-relative"
//             />
//             <span className="position-absolute top-50 start-110 translate-middle badge rounded-pill fs-6 bg-countCart mt-2">
//               5
//             </span>
//           </Link>
//         </div>

//         <div className="d-flex justify-content-between align-items-center">
//           <Link
//             className="navbar-brand text-start ps-2 d-lg-none d-sm-block"
//             href="/*">
//             <img src={logo} alt="logo" className="w-50" />
//           </Link>
//           <div className="d-lg-none d-sm-block text-end">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               fill="currentColor"
//               className="bi bi-search pe-3 pt-2 svg-width-menu text-white"
//               viewBox="0 0 16 16">
//               <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
//             </svg>
//           </div>

//           <div
//             className="d-lg-none d-sm-block text-end "
//             data-bs-toggle="offcanvas"
//             data-bs-target="#offcanvasRight"
//             aria-controls="offcanvasRight">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               fill="currentColor"
//               className="bi bi-list-nested pe-3 pt-2 svg-width-menu text-white"
//               viewBox="0 0 16 16">
//               <path
//                 fill-rule="evenodd"
//                 d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z"
//               />
//             </svg>
//           </div>
//         </div>
//       </nav>
//       <div
//         className="offcanvas index offcanvas-end w-75 bg-dark d-lg-none d-sm-block"
//         tabindex="1"
//         id="offcanvasRight"
//         aria-labelledby="offcanvasRightLabel">
//         <div className="offcanvas-header justify-content-center ps-3">
//           <h5 id="offcanvasRightLabel" className=" text-white pt-5">
//             Bienvenidos al menu!
//           </h5>
//           <button
//             type="button"
//             className="btn-close text-white text-reset"
//             data-bs-dismiss="offcanvas"
//             aria-label="Close"></button>
//         </div>
//         <div className="offcanvas-body">
//           <ul className="nav flex-column text-center pt-3">
//             <Link className="nav-link text-white" to="/auth/login">
//               Ingresar
//             </Link>
//             <Link className="nav-link text-white" to="/cart">
//               Carrito
//             </Link>
//             <li></li>
//           </ul>
//         </div>
//       </div>

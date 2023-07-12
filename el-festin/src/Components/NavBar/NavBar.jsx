import { Link } from "react-router-dom";
//import { logo, cart } from "../../Helpers/ImageUrl";
import "../../Components/NavBar/Navbar.css";
import { SearchBar } from "./SearchBar";

export const Navbar = () => {
  const logo =
    "https://res.cloudinary.com/dg83wyf9p/image/upload/v1689108438/logos%20e%20imagenes/logo_vsr7uy.png";
  const cart =
    "https://res.cloudinary.com/dg83wyf9p/image/upload/v1689108438/logos%20e%20imagenes/cart_dq31go.png";
  return (
    <>
      <nav className="navbar p-0 navbar-expand-lg navbar-light navbarLanding py-2">
        <div className="container-fluid justify-content-between py-2">
          <a className="navbar-brand ps-5" href="/*">
            <img src={logo} alt="logo" className="img-width-logo" />
          </a>
          <SearchBar />
          <Link
            to="/auth/login"
            className="text-decoration-none text-white fs-3 padding-ingresar">
            {" "}
            Ingresar{" "}
          </Link>

          <Link to="/cart" className="text-end pe-5">
            <img src={cart} alt="cart" className="w-50 position-relative" />
            <span className="position-absolute top-50 start-110 translate-middle badge rounded-pill fs-6 bg-countCart mt-2">
              5
            </span>
          </Link>
        </div>
      </nav>
      
    </>
  );
};

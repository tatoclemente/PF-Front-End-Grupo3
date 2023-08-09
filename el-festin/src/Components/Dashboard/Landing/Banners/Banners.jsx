import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBanners } from "../../../../Redux/actions/actionBanners/getAllBanners";
import { server } from "../../../../Helpers/EndPoint";
import axios from "axios";
import style from "./Banners.module.css";
import Slider from "react-slick";
import Swal from "sweetalert2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        position: "absolute",
        textShadow: "1px 1px 5px var(--shadow)",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        position: "absolute",
        textShadow: "1px 1px 5px var(--shadow)",
      }}
      onClick={onClick}
    />
  );
}

export const Banner = () => {
  const allBanners = useSelector((state) => state.banner.banners);
  const dispatch = useDispatch();
  const [filed, setFiled] = useState(null);
  const [banner, setBanner] = useState({
    name: "",
    image: filed,
    disabled: false,
  });

  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  const handleChangeBanner = (e) => {
    setBanner({ ...banner, [e.target.name]: e.target.value });
  };

  const handleOnChangeImage = ({ target }) => {
    setFiled(target.files[0]);
  };

  const formData = new FormData();
  formData.append("name", banner.name);
  formData.append("image", filed);
  formData.append("disabled", banner.disabled);

  const handleSubmitBanner = async (e) => {
    e.preventDefault();

    if (!banner.name || !filed) {
      Swal.fire({
        icon: "error",
        title: "Por favor, completa todos los campos antes de crear el banner.",
        confirmButtonText: "OK",
      });
      return;
    }

    const nameExists = Array.isArray(allBanners) && allBanners.find(
      (ban) => ban.name.toLowerCase() === banner.name.toLowerCase()
    );

    if (nameExists) {
      Swal.fire({
        icon: "error",
        title: "Ya existe un banner con ese nombre",
        confirmButtonText: "OK",
      });
    } else {
      try {
        const bannerData = new FormData();
        bannerData.append("name", banner.name);
        bannerData.append("image", filed);
        bannerData.append("disabled", banner.disabled);

        const response = await axios.post(`${server}/banner`, bannerData);
        console.log("Banner create successfully:", response.data);
        Swal.fire({
          icon: "success",
          title: "Se creó el banner",
          confirmButtonText: "OK",
        });
        setBanner({
          name: "",
          image: null,
          disabled: "",
        });
        setShowModal(false);
      } catch (error) {
        console.error("Error create banner:", error);
      }
    }
  };

  const handleUpdateBanners = async (bannerId) => {
    const bannerToUpdate = Array.isArray(allBanners) && allBanners.find((ban) => ban.id === bannerId);
    console.log("Banner to update:", JSON.stringify(bannerToUpdate));

    if (bannerToUpdate) {
      const updatedbanner = {
        ...bannerToUpdate,
        disabled: !bannerToUpdate.disabled,
      };
      console.log("updatedBanner " + JSON.stringify(updatedbanner));

      try {
        const response = await axios.put(
          `${server}/banner/${bannerId}`,
          updatedbanner
        );
        console.log("Banner updated successfully:", response.data);

        dispatch(getBanners());
      } catch (error) {
        // Handle error if needed
        console.error("Error updating Banner:", error);
      }
    }
  };

  const handleDeleteBanners = async (bannerId) => {
    const bannerToDelete = Array.isArray(allBanners) && allBanners.find((ban) => ban.id === bannerId);
    console.log("Banner to delete:", JSON.stringify(bannerToDelete));

    if (bannerToDelete) {
      try {
        const response = await axios.delete(`${server}/banner/${bannerId}`);
        console.log("Banner deleted successfully:", response.data);

        dispatch(getBanners());
      } catch (error) {
        // Handle error if needed
        console.error("Error deleting banner:", error);
      }
    }
  };
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  

  const allBannersCopy = [...allBanners];

  const sortedBanners = allBannersCopy.sort((a, b) =>
    a.disabled === b.disabled ? 0 : a.disabled ? 1 : -1
  )

  // // Agregamos un estado para almacenar el ID del banner que se está mostrando en el desplegable
  // const [selectedBannerId, setSelectedBannerId] = useState(null);

  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // // Función para mostrar u ocultar el desplegable al hacer clic en la imagen
  // const handleToggleDropdown = (bannerId) => {
  //   setSelectedBannerId((prevState) =>
  //     prevState === bannerId ? null : bannerId
  //   );
  // };

  // // Función para mostrar el desplegable al pasar el mouse por encima de la imagen
  // const handleMouseEnter = (bannerId) => {
  //   setSelectedBannerId(bannerId);
  // };

  // // Función para ocultar el desplegable al quitar el mouse de la imagen
  // const handleMouseLeave = () => {
  //   setSelectedBannerId(null);
  // };

  const numImagesToShow = sortedBanners.length > 2 ? 3 : sortedBanners.length;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: numImagesToShow,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div style={{borderBottom: "2px solid #e5e5e5", paddingBottom: "2rem"}}>
      <div>
        <h2 className={style.title}>ESTADO DE MI BANNER PUBLICITARIO</h2>
      </div>
      <div>
        <h3 className={style.recommendation}>
          Aviso: Para obtener la mejor calidad de visualización, se recomienda
          subir una imagen con una resolución de 1860x700 píxeles.
        </h3>
      </div>
      <div className={style.crearButtonContainer}>
        <button onClick={openModal} className={style.crearButton}>
          CARGAR BANNER
        </button>
      </div>
      <div>
        {showModal && (
          <div
            style={{
              background: "rgba(0, 0, 0, 0.5)",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999,
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "20px 50px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "8px",
              }}
            >
              <button
                onClick={closeModal}
                type="button"
                className={` ${style.closeButton} btn-close`}
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>{" "}
              {/* Botón para cerrar el modal */}
              <form
                onSubmit={handleSubmitBanner}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <label className={style.createBannerName}>
                  Nombre del banner
                </label>
                <input
                  type="text"
                  name="name"
                  value={banner.name}
                  onChange={(e) => handleChangeBanner(e)}
                  className="form-control"
                />
                <label className={style.createBannerName}>
                  Deshabilitar banner
                </label>
                <div className="dropdown mt-0">
                  <select
                    name="disabled"
                    value={banner.disabled}
                    onChange={(e) => handleChangeBanner(e)}
                  >
                    <option value={false}>false</option>
                    <option value={true}>true</option>
                  </select>
                </div>
                <label
                  htmlFor=""
                  className={`${style.createBannerName} pe-3 form-label`}
                >
                  Imagen
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleOnChangeImage}
                />
                <button className={style.buttonSubmitBanner} type="submit">
                  Crear
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className={style.dropdownContainer}>
        <Slider {...settings}>
          {Array.isArray(sortedBanners) && sortedBanners?.map((ban, index) => {
            return (
              <div
                key={index}
                className={style.imageContainer}
                // onMouseEnter={() => handleMouseEnter(ban.id)}
                // onMouseLeave={handleMouseLeave}
              >
                <img
                  src={ban.image}
                  alt="banner"
                  // onClick={() => handleToggleDropdown(ban.id)}
                  className={` ${ban.disabled ? style.imageDisabled : ""} ${
                    style.images
                  } custom-class`}
                />

                <div className={style.dropdownBanner}>
                  <button
                    onClick={() => handleUpdateBanners(ban.id)}
                    className={style.buttonChangeBanner}
                  >
                    {ban.disabled ? "Habilitar" : "Deshabilitar"}
                  </button>
                  <button
                    onClick={() => handleDeleteBanners(ban.id)}
                    className={style.buttonChangeBanner}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

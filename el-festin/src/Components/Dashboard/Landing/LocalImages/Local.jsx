import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocal } from "../../../../Redux/actions/actionsLocal/getAllLocal";
import { server } from "../../../../Helpers/EndPoint";
import axios from "axios";
import Swal from "sweetalert2";
import style from "./Local.module.css";
import Slider from "react-slick";
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

export const Local = () => {
  const allLocal = useSelector((state) => state.local.locals);
  const dispatch = useDispatch();
  const [filed, setFiled] = useState(null);
  const [local, setLocal] = useState({
    name: "",
    image: filed,
    disabled: false,
  });

  useEffect(() => {
    dispatch(getLocal());
  }, [dispatch]);

  const handleChangeLocal = (e) => {
    setLocal({ ...local, [e.target.name]: e.target.value });
  };

  const handleOnChangeImage = ({ target }) => {
    setFiled(target.files[0]);
  };

  const handleSubmitLocal = async (e) => {
    e.preventDefault();
    if (!local.name || !filed) {
      Swal.fire({
        icon: "error",
        title: "Por favor, completa todos los campos antes de crear la imagen.",
        confirmButtonText: "OK",
      });
      return;
    }

    const nameExists = Array.isArray(allLocal) && allLocal.find(
      (loc) => loc.name.toLowerCase() === local.name.toLowerCase()
    );

    if (nameExists) {
      Swal.fire({
        icon: "error",
        title: "Ya existe una imagen del restaurante con ese nombre",
        confirmButtonText: "OK",
      });
    } else {
      try {
        const localData = new FormData();
        localData.append("name", local.name);
        localData.append("image", filed);
        localData.append("disabled", local.disabled);

        const response = await axios.post(`${server}/local`, localData);
        console.log("image local create successfully:", response.data);
        Swal.fire({
          icon: "success",
          title: "Se creó la imagen",
          confirmButtonText: "OK",
        });
        setLocal({
          name: "",
          image: null,
          disabled: "",
        });
        setShowModal(false);
      } catch (error) {
        console.error("Error create local:", error);
      }
    }
  };

  const handleUpdateImage = async (localId) => {
    const imageToUpdate = Array.isArray(allLocal) && allLocal.find((loc) => loc.id === localId);
    console.log("image local to update:", JSON.stringify(imageToUpdate));

    if (imageToUpdate) {
      const updatedImage = {
        ...imageToUpdate,
        disabled: !imageToUpdate.disabled,
      };
      console.log("updatedImage " + JSON.stringify(updatedImage));

      try {
        const response = await axios.put(
          `${server}/local/${localId}`,
          updatedImage
        );
        console.log("image local updated successfully:", response.data);

        dispatch(getLocal());
      } catch (error) {
        console.error("Error updating image local:", error);
      }
    }
  };

  const handleDeleteImage = async (localId) => {
    const imageToDelete = Array.isArray(allLocal) && allLocal.find((loc) => loc.id === localId);
    console.log("Image local to delete:", JSON.stringify(imageToDelete));

    if (imageToDelete) {
      try {
        const response = await axios.delete(`${server}/local/${localId}`);
        console.log("Image local deleted successfully:", response.data);

        dispatch(getLocal());
      } catch (error) {
        console.error("Error deleting image local:", error);
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

  const allLocalCopy = [...allLocal];

  const sortedLocal = allLocalCopy.sort((a, b) =>
    a.disabled === b.disabled ? 0 : a.disabled ? 1 : -1
  )

  // const [selectedLocalId, setSelectedLocalId] = useState(null);

  // const handleToggleDropdown = (LocalId) => {
  //   setSelectedLocalId((prevState) =>
  //     prevState === LocalId ? null : LocalId
  //   );
  // };

  // // Función para mostrar el desplegable al pasar el mouse por encima de la imagen
  // const handleMouseEnter = (LocalId) => {
  //   setSelectedLocalId(LocalId);
  // };

  // // Función para ocultar el desplegable al quitar el mouse de la imagen
  // const handleMouseLeave = () => {
  //   setSelectedLocalId(null);
  // };

  const numImagesToShow = sortedLocal.length > 2 ? 3 : sortedLocal.length;

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
        <h2 className={style.title}>ESTADO DE MI GALERIA DE FOTOS</h2>
      </div>
      <div>
        <h3 className={style.recommendation}>
          Aviso: Para obtener la mejor calidad de visualización, se recomienda
          subir una imagen con una resolución de 1860x700 píxeles.
        </h3>
      </div>
      <div className={style.crearButtonContainer}>
        <button onClick={openModal} className={style.crearButton}>
          CARGAR IMAGEN
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
                onSubmit={handleSubmitLocal}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <label className={style.createLocalName}>
                  Nombre del local
                </label>
                <input
                  type="text"
                  name="name"
                  value={local.name}
                  onChange={(e) => handleChangeLocal(e)}
                  className="form-control"
                />
                <label className={style.createLocalName}>
                  Deshabilitar local
                </label>
                <div className="dropdown mt-0">
                  <select
                    name="disabled"
                    value={local.disabled}
                    onChange={(e) => handleChangeLocal(e)}
                  >
                    <option value={false}>false</option>
                    <option value={true}>true</option>
                  </select>
                </div>
                <label
                  htmlFor=""
                  className={`${style.createLocalName} pe-3 form-label`}
                >
                  Imagen
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleOnChangeImage}
                />
                <button className={style.buttonSubmitLocal} type="submit">
                  Crear
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className={style.dropdownContainer}>
        <Slider {...settings}>
          {Array.isArray(sortedLocal) && sortedLocal?.map((loc, index) => {
            return (
              <div
                key={index}
                className={style.imageContainer}
                // onMouseEnter={() => handleMouseEnter(loc.id)}
                // onMouseLeave={handleMouseLeave}
              >
                <img
                  src={loc.image}
                  alt="dish"
                  // onClick={() => handleToggleDropdown(loc.id)}
                  className={` ${loc.disabled ? style.imageDisabled : ""} ${
                    style.images
                  } custom-class`}
                />

                <div className={style.dropdownLocal}>
                  <button
                    onClick={() => handleUpdateImage(loc.id)}
                    className={style.buttonChangeLocal}
                  >
                    {loc.disabled ? "Habilitar" : "Deshabilitar"}
                  </button>
                  <button
                    onClick={() => handleDeleteImage(loc.id)}
                    className={style.buttonChangeLocal}
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

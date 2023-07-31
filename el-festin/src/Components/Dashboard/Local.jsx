import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocal } from "../../Redux/actions/actionsLocal/getAllLocal";
import { server } from "../../Helpers/EndPoint";
import axios from "axios";

export const Local = () => {
  const allLocal = useSelector((state) => state.local.locals);
  const dispatch = useDispatch();
  const [filed, setFiled] = useState(null);
  const [local, setLocal] = useState({
    name: "",
    image: filed,
    disabled: "",
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
    if (!local.name || !local.disabled || !filed) {
      alert("Por favor, completa todos los campos antes de crear la imagen.");
      return;
    }

    const nameExists = allLocal.find(
      (loc) => loc.name.toLowerCase() === local.name.toLowerCase()
    );

    if (nameExists) {
      alert("Ya existe una imagen del restaurante con ese nombre");
    } else {
      try {
        const localData = new FormData();
        localData.append("name", local.name);
        localData.append("image", filed);
        localData.append("disabled", local.disabled);

        const response = await axios.post(`${server}/local`, localData);
        console.log("image local create successfully:", response.data);

        alert("Se creó la imagen");
        setLocal({
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

  const handleUpdateImage = async (localId) => {
    const imageToUpdate = allLocal.find((loc) => loc.id === localId);
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
    const imageToDelete = allLocal.find((loc) => loc.id === localId);
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

  return (
    <div>
      <div>
        {allLocal?.map((loc, index) => {
          return (
            <div key={index}>
              <h3>{loc.name}</h3>
              <img src={loc.image} alt="dish" width="50" height="50" />
              <p>Disabled: {loc.disabled.toString()}</p>
              <button onClick={() => handleUpdateImage(loc.id)}>Update</button>
              <button onClick={() => handleDeleteImage(loc.id)}>Delete</button>
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={openModal}>Crear</button>{" "}
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
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <button onClick={closeModal}>Cerrar</button>{" "}
              <form onSubmit={handleSubmitLocal}>
                <label>name</label>
                <input
                  type="text"
                  name="name"
                  value={local.name}
                  onChange={(e) => handleChangeLocal(e)}
                />
                <label>habilitado</label>
                <input
                  type="text"
                  name="disabled"
                  value={local.disabled}
                  onChange={(e) => handleChangeLocal(e)}
                />
                <label htmlFor="">imagen</label>
                <input type="file" onChange={handleOnChangeImage} />
                <button type="submit">Crear</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

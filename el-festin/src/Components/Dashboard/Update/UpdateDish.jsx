import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../Card/Card";
import { server } from "../../../Helpers/EndPoint";
import axios from "axios";
import { FiCheck } from "react-icons/fi";
import { validacionDish } from "../Validaciones/validacionDish";
import Swal from "sweetalert2";
import "../dashboard.css";
import style from "../Dashboard.module.css";

export const UpdateDish = ({ allDates }) => {
  const [updateState, setUpdateState] = useState("DEFAULT");
  const [inputView, setInputView] = useState({
    name: false,
    description: false,
    calorias: false,
    price: false,
  });
  const subtiposDish = useSelector((state) => state.dishes.dishesTypes);
  const selectedItem = allDates.find((item) => item.name === updateState);
  const [error, setError] = useState({});

  const [inputUpdate, setInputUpdate] = useState({
    name: "",
    description: "",
    type: "",
    subtype: [],
    calories: "",
    glutenfree: null,
    vegetarian: null,
    dailyspecial: null,
    price: "",
  });
  const [filed, setFiled] = useState(null);

  useEffect(() => {
    setInputUpdate(selectedItem);
  }, [selectedItem]);

  const onUpdateChange = (e) => {
    setUpdateState(e.target.value);
  };

  const handleInputView = (e) => {
    e.preventDefault();
    let { name } = e.target;
    setInputView({
      ...inputView,
      [name]: !inputView[name],
    });
  };

  const onInputChange = ({ target }) => {
    setInputUpdate({ ...inputUpdate, [target.name]: target.value });
    setError(
      validacionDish({
        ...inputUpdate,
        [target.name]: target.value,
      })
    );
  };
  let handleOnChangeImage = ({ target }) => {
    setFiled(target.files[0]);
  };

  console.log("input update", inputUpdate);

  const formData = new FormData();
  formData.append("name", inputUpdate?.name);
  formData.append("description", inputUpdate?.description);
  formData.append("type", inputUpdate?.type);
  formData.append("calories", inputUpdate?.calories);
  formData.append("price", inputUpdate?.price);
  formData.append("subtype", inputUpdate?.subtype);
  formData.append("glutenfree", inputUpdate?.glutenfree);
  formData.append("vegetarian", inputUpdate?.vegetarian);
  formData.append("dailyspecial", inputUpdate?.dailyspecial);
  formData.append("image", filed);

  console.log("formdata", formData);
  const onUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const errorValue = Object.values(error);
      let errorMessage = errorValue.filter((err) => err !== "");
      if (errorMessage.length > 0) {
        Swal.fire({
          icon: "error",
          title: "Complete todos los campos correctamente",
          confirmButtonText: "OK",
        });
        return;
      }
      if (selectedItem === inputUpdate) {
        Swal.fire({
          icon: "info",
          title: "Ups, siento!",
          text: "Realiza un cambio",
          confirmButtonText: "OK",
        });
      } else {
        const { data } = await axios.put(
          `${server}/dish/${selectedItem.id}`,
          formData
        );
        if (data.name) {
          Swal.fire({
            icon: "success",
            title: "Se ha modificado el plato correctamente",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "El plato no pudo modificarse",
            confirmButtonText: "OK",
          });
        }
      }
    } catch (error) {
      throw error.messagge;
    }
  };

  return (
    <div className="container-fluid text-dark">
      <button
        type="button"
        className={`btn btn-primary ${style.buttonDelete}`}
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop9"
      >
        Modificar plato
      </button>

      <div
        className="modal fade"
        id="staticBackdrop9"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content modal-width-update">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Modificar
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setUpdateState("DEFAULT")}
              ></button>
            </div>
            <form className="modal-body" onSubmit={onUpdateSubmit}>
              <label className="fw-bold fs-5 pb-2">
                Elija plato a modificar
              </label>
              <br />
              <div className="dropdown pt-2">
                <select value={updateState} onChange={onUpdateChange}>
                  <option value="DEFAULT" disabled>
                    {`Buscar ${"algo"}`}
                  </option>
                  {allDates.map((item) => {
                    return (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="row d-flex align-items-center justify-content-center ps-5">
                {selectedItem && (
                  <div className="d-grid gap-2 mx-auto col-4 py-5 px-5">
                    <h5 className="pb-2">Datos a modificar</h5>
                    <button
                      name="name"
                      onClick={handleInputView}
                      className="btn buttonCrear"
                    >
                      Nombre
                    </button>

                    <button
                      name="description"
                      onClick={handleInputView}
                      className="btn buttonCrear"
                    >
                      Descripcion
                    </button>

                    <button
                      name="calorias"
                      onClick={handleInputView}
                      className="btn buttonCrear"
                    >
                      Calorias
                    </button>

                    <button
                      name="price"
                      onClick={handleInputView}
                      className="btn buttonCrear"
                    >
                      Precio
                    </button>

                    <div className="dropdown">
                      <select
                        defaultValue={"DEFAULT"}
                        className="mt-2"
                        name="type"
                        onChange={onInputChange}
                      >
                        <option value="DEFAULT" disabled>
                          Tipos de plato
                        </option>

                        <option value="plato principal">Plato principal</option>
                        <option value="entrada">Entrada</option>
                      </select>
                    </div>
                    <div className="dropdown">
                      <select
                        defaultValue={"DEFAULT"}
                        className="form-group mt-2"
                        name="subtype"
                        onChange={onInputChange}
                      >
                        <option value="DEFAULT" disabled className="">
                          Subtipos
                        </option>
                        {subtiposDish?.map((subtipo, key) => {
                          return (
                            <option key={key} value={subtipo}>
                              {subtipo}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="dropdown">
                      <select
                        defaultValue={"DEFAULT"}
                        className="form-group mt-2"
                        name="glutenfree"
                        onChange={onInputChange}
                      >
                        <option value="DEFAULT" disabled className="">
                          Glutenfree
                        </option>
                        <option value={true}>Si</option>
                        <option value={false}>no</option>
                      </select>
                    </div>

                    <div className="dropdown">
                      <select
                        defaultValue={"DEFAULT"}
                        className="form-group mt-2"
                        name="vegetarian"
                        onChange={onInputChange}
                      >
                        <option value="DEFAULT" disabled>
                          Vegetariano
                        </option>

                        <option value={true}>Si</option>
                        <option value={false}>no</option>
                      </select>
                    </div>
                    <li>
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleOnChangeImage}
                      />
                    </li>
                  </div>
                )}

                <div className="col-8 py-5">
                  {selectedItem && (
                    <Card
                      key={inputUpdate?.id}
                      type={inputUpdate?.type}
                      image={inputUpdate?.image}
                      name={inputUpdate?.name}
                      price={inputUpdate?.price}
                      rating={inputUpdate?.rating}
                      description={inputUpdate?.description}
                    />
                  )}
                </div>
              </div>
              {inputView.name && (
                <div className="">
                  <label>Cambiar nombre</label>
                  <br />
                  <input
                    className="mi-input"
                    type="text"
                    placeholder="Escribe aquí"
                    name="name"
                    value={inputUpdate.name}
                    onChange={onInputChange}
                  />
                  <button
                    className="btn border-2 btn-outline-success"
                    onClick={() => setInputView({ ...inputView, name: false })}
                    disabled={error.name}
                  >
                    <FiCheck style={{ fontSize: "24px" }} />
                  </button>
                  {error.name && (
                    <p style={{ fontSize: "12px" }}>{error.name}</p>
                  )}
                </div>
              )}
              {inputView.description && (
                <div className="">
                  <label>Cambiar descripcion</label>
                  <br />
                  <input
                    className="mi-input"
                    type="text"
                    placeholder="Escribe aquí"
                    name="description"
                    value={inputUpdate.description}
                    onChange={onInputChange}
                  />
                  <button
                    className="btn border-2 btn-outline-success"
                    onClick={() =>
                      setInputView({ ...inputView, description: false })
                    }
                    disabled={error.description}
                  >
                    <FiCheck style={{ fontSize: "24px" }} />
                  </button>
                  {error.description && (
                    <p style={{ fontSize: "12px" }}>{error.description}</p>
                  )}
                </div>
              )}
              {inputView.calorias && (
                <div>
                  <label>Cambiar calorias</label>
                  <br />
                  <input
                    className="mi-input"
                    type="text"
                    placeholder="Escribe aquí"
                    name="calories"
                    value={inputUpdate.calories}
                    onChange={onInputChange}
                  />
                  <button
                    className="btn border-2 btn-outline-success"
                    onClick={() =>
                      setInputView({ ...inputView, calorias: false })
                    }
                    disabled={error.calories}
                  >
                    <FiCheck style={{ fontSize: "24px" }} />
                  </button>
                  {error.calories && (
                    <p style={{ fontSize: "12px" }}>{error.calories}</p>
                  )}
                </div>
              )}
              {inputView.price && (
                <div>
                  <label>Cambiar precio</label>
                  <br />
                  <input
                    className="mi-input"
                    type="text"
                    placeholder="Escribe aquí"
                    name="price"
                    value={inputUpdate.price}
                    onChange={onInputChange}
                  />
                  <button
                    className="btn border-2 btn-outline-success"
                    onClick={() => setInputView({ ...inputView, price: false })}
                    disabled={error.price}
                  >
                    <FiCheck style={{ fontSize: "24px" }} />
                  </button>
                  {error.price && (
                    <p style={{ fontSize: "12px" }}>{error.price}</p>
                  )}
                </div>
              )}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setUpdateState("DEFAULT")}
                >
                  Cerrar
                </button>
                <button type="submit" className="btn buttonCrear">
                  Modificar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../Card/Card";
import { server } from "../../../Helpers/EndPoint";
import { volumeDrink, typeDrink } from "../../../Helpers/objetosHelp";
import axios from "axios";
import { FiCheck } from "react-icons/fi";
import "../dashboard.css";
import style from "../Dashboard.module.css";

export const UpdateDrink = ({ allDates }) => {
  const [updateState, setUpdateState] = useState("DEFAULT");
  const [inputView, setInputView] = useState({
    name: false,
    stock: false,
    price: false,
  });

  const selectedItem = allDates.find((item) => item.name === updateState);

  const [inputUpdate, setInputUpdate] = useState({
    name: "",
    volume: "",
    type: "",
    alcohol: "",
    stock: 0,
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
  };
  let handleOnChangeImage = ({ target }) => {
    setFiled(target.files[0]);
  };

  console.log("input update", inputUpdate);

  const formData = new FormData();
  formData.append("name", inputUpdate?.name);
  formData.append("volume", inputUpdate?.volume);
  formData.append("type", inputUpdate?.type);
  formData.append("alcohol", inputUpdate?.alcohol);
  formData.append("price", inputUpdate?.price);
  formData.append("stock", inputUpdate?.stock);
  formData.append("image", filed);

  console.log("formdata", formData.data);
  const onUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedItem === inputUpdate) {
        alert("Realiza un cambio");
      } else {
        const { data } = await axios.put(
          `${server}/drink/${selectedItem.id}`,
          formData
        );
        console.log(data);
        if (data.name) {
          alert("Se ha modificado la guarnicion");
        } else {
          alert("la guarnicion no pudo modificarse");
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
        data-bs-target="#staticBackdrop11">
        Modificar Bebida
      </button>

      <div
        className="modal fade"
        id="staticBackdrop11"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true">
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
                onClick={() => setUpdateState("DEFAULT")}></button>
            </div>
            <form className="modal-body" onSubmit={onUpdateSubmit}>
              <label className="fw-bold fs-5 pb-2">
                Elija bebida a modificar
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
                      className="btn buttonCrear">
                      Nombre
                    </button>

                    <button
                      name="price"
                      onClick={handleInputView}
                      className="btn buttonCrear">
                      Precio
                    </button>

                    <button
                      name="stock"
                      onClick={handleInputView}
                      className="btn buttonCrear">
                      Stock
                    </button>

                    <div className="dropdown">
                      <select
                        defaultValue={"DEFAULT"}
                        className="form-group "
                        name="volume"
                        onChange={onInputChange}>
                        <option value="DEFAULT" disabled className="">
                          Medida
                        </option>
                        {volumeDrink.map((volume, key) => {
                          return (
                            <option key={key} value={volume}>
                              {volume}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="dropdown">
                      <select
                        defaultValue={"DEFAULT"}
                        className="form-group"
                        name="type"
                        onChange={onInputChange}>
                        <option value="DEFAULT" disabled className="">
                          tipo de bebida
                        </option>
                        {typeDrink.map((type, key) => {
                          return (
                            <option key={key} value={type}>
                              {type}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="dropdown">
                      <select
                        defaultValue={"DEFAULT"}
                        className="form-group"
                        name="alcohol"
                        onChange={onInputChange}>
                        <option value="DEFAULT" disabled>
                          contiene alcohol
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
                    onClick={() => setInputView({ ...inputView, name: false })}>
                    <FiCheck style={{ fontSize: "24px" }} />
                  </button>
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
                    onClick={() =>
                      setInputView({ ...inputView, price: false })
                    }>
                    <FiCheck style={{ fontSize: "24px" }} />
                  </button>
                </div>
              )}
              {inputView.stock && (
                <div>
                  <label>Cambiar Stock</label>
                  <br />
                  <input
                    className="mi-input"
                    type="text"
                    placeholder="Escribe aquí"
                    name="stock"
                    value={inputUpdate.stock}
                    onChange={onInputChange}
                  />
                  <button
                    type="button"
                    className="btn border-2 btn-outline-success"
                    onClick={() =>
                      setInputView({ ...inputView, stock: false })
                    }>
                    <FiCheck style={{ fontSize: "24px" }} />
                  </button>
                </div>
              )}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setUpdateState("DEFAULT")}>
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

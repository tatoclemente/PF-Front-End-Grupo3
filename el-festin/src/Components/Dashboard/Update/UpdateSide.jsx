import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../Card/Card";
import { server } from "../../../Helpers/EndPoint";
import axios from "axios";
import Swal from "sweetalert2";
import { FiCheck } from "react-icons/fi";
import { validacionGuar } from "../Validaciones/validacionGuar";
import "../dashboard.css";
import style from "../Dashboard.module.css";
import { getSides } from "../../../Redux/actions/actiossSides/getAllSides";

export const UpdateSide = ({ allDates }) => {
  const [updateState, setUpdateState] = useState("DEFAULT");
  const [inputView, setInputView] = useState({
    name: false,
    type: false,
    stock: false,
    price: false,
  });

  const selectedItem =
    Array.isArray(allDates) &&
    allDates.find((item) => item.name === updateState);
  const [error, setError] = useState({});

  const dispatch = useDispatch()
  const [inputUpdate, setInputUpdate] = useState({
    name: "",
    stock: 0,
    type: "",

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
      validacionGuar({
        ...inputUpdate,
        [target.name]: target.value,
      })
    );
  };
  let handleOnChangeImage = ({ target }) => {
    setFiled(target.files[0]);
  };

  const formData = new FormData();
  formData.append("name", inputUpdate?.name);

  formData.append("type", inputUpdate?.type);
  formData.append("stock", inputUpdate?.stock);

  formData.append("price", inputUpdate?.price);

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
          `${server}/side/${selectedItem.id}`,
          formData
        );
        console.log(data);
        if (data.name) {
          dispatch(getSides())
          Swal.fire({
            icon: "success",
            title: "Se ha modificado la guarnicion correctamente",
            confirmButtonText: "OK",
          });
          setUpdateState("DEFAULT");
        } else {
          Swal.fire({
            icon: "error",
            title: "la guarnicion no pudo modificarse",
            confirmButtonText: "OK",
          });
        }
      }
    } catch (error) {
      throw error.messagge;
    }
  };

  const isInputViewEnabled =
    inputView.name || inputView.price || inputView.stock;
  return (
    <div className="container-fluid text-dark">
      <button
        type="button"
        className={style.buttonDelete}
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop10">
        Guarnicion
      </button>

      <div
        className="modal fade"
        id="staticBackdrop10"
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
                Elija guarnicion a modificar
              </label>
              <br />
              <div className="dropdown pt-2">
                <select value={updateState} onChange={onUpdateChange}>
                  <option value="DEFAULT" disabled>
                    {`Buscar ${"algo"}`}
                  </option>
                  {Array.isArray(allDates) &&
                    allDates.map((item) => {
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
                      name="stock"
                      onClick={handleInputView}
                      className="btn buttonCrear">
                      Stock
                    </button>
                    <button
                      name="price"
                      onClick={handleInputView}
                      className="btn buttonCrear">
                      Precio
                    </button>

                    <div className="dropdown">
                      <select
                        defaultValue={"DEFAULT"}
                        name="type"
                        onChange={onInputChange}>
                        <option value="DEFAULT" disabled>
                          Tipos de guarnicion
                        </option>

                        <option value="Salsa">Salsa</option>
                        <option value="acompañamiento">acompañamiento</option>
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
                      buttonOut={true}
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
                    disabled={error.name}>
                    <FiCheck style={{ fontSize: "24px" }} />
                  </button>
                  {error.name && (
                    <p style={{ fontSize: "12px" }}>{error.name}</p>
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
                    disabled={error.price}>
                    <FiCheck style={{ fontSize: "24px" }} />
                  </button>
                  {error.price && (
                    <p style={{ fontSize: "12px" }}>{error.price}</p>
                  )}
                </div>
              )}
              {inputView.stock && (
                <div>
                  <label>Cambiar stock</label>
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
                    className="btn border-2 btn-outline-success"
                    onClick={() => setInputView({ ...inputView, stock: false })}
                    disabled={error.stock}>
                    <FiCheck style={{ fontSize: "24px" }} />
                  </button>
                  {error.stock && (
                    <p style={{ fontSize: "12px" }}>{error.stock}</p>
                  )}
                </div>
              )}
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn buttonCrear"
                  disabled={isInputViewEnabled}>
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

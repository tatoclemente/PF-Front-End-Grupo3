import axios from "axios";
import { server } from "../../../Helpers/EndPoint";
import { useRef, useState } from "react";
import { validacionGuar } from "../Validaciones/validacionGuar";
import Swal from "sweetalert2";
import style from "../Dashboard.module.css";

export const ModalCreateSide = () => {
  const [updateState, setUpdateState] = useState("DEFAULT");
  let initialState = {
    name: "",
    type: updateState,
    price: "",
    available: updateState,
  };

  const [inputCreateSide, setInputCreateSide] = useState(initialState);

  const [filed, setFiled] = useState(null);

  const [error, setError] = useState({});
  const fileInputRef = useRef(null);

  const onInputChange = ({ target }) => {
    setInputCreateSide({
      ...inputCreateSide,
      [target.name]: target.value,
    });
    setError(
      validacionGuar({
        ...inputCreateSide,
        [target.name]: target.value,
      })
    );
  };

  let handleOnChangeImage = ({ target }) => {
    setFiled(target.files[0]);
  };

  const onSubmitCreate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", inputCreateSide.name);
      formData.append("type", inputCreateSide.type);
      formData.append("price", inputCreateSide.price);
      formData.append("available", inputCreateSide.available);
      formData.append("image", filed);

      const { data } = await axios.post(`${server}/side`, formData);

      if (data.name) {
        Swal.fire({
          icon: "success",
          title: "Guarnicion creada con exito",
          confirmButtonText: "OK",
        });
        setInputCreateSide(initialState);
        setUpdateState("DEFAULT");
        setFiled(null);
        fileInputRef.current.value = null;
        setError({});
      }
    } catch (error) {
      throw error.message;
    }
  };

  return (
    <div className="container-fluid text-dark">
      <button
        type="button"
        className={`btn btn-primary ${style.buttonDelete}`}
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop3"
      >
      Guarnicion
      </button>

      <div
        className="modal fade"
        id="staticBackdrop3"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Crear Guarnicion nuevo
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmitCreate}>
                <label htmlFor="" className="pe-3 pt-3 form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={inputCreateSide.name}
                  onChange={onInputChange}
                />
                {error.name && (
                  <p className={style.dato_incorrecto}>{error.name}</p>
                )}

                <label htmlFor="" className="pe-3 pt-3 form-label">
                  Precio
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="price"
                  value={inputCreateSide.price}
                  onChange={onInputChange}
                />
                {error.price && (
                  <p className={style.dato_incorrecto}>{error.price}</p>
                )}

                <label htmlFor="" className="pe-3 pt-3 form-label">
                  Imagen
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleOnChangeImage}
                  ref={fileInputRef}
                />
                <div className="dropdown pe-2">
                  <label htmlFor="" className="form-label">
                    Guarnicion
                  </label>
                  <select
                    value={updateState}
                    className="form-group"
                    name="type"
                    onChange={onInputChange}
                  >
                    <option value={updateState} disabled>
                      Tipo de guarnicion
                    </option>

                    <option value="salsa">Salsa</option>
                    <option value="acompañamiento">acompañamiento</option>
                  </select>
                </div>

                <div className="dropdown px-2 pb-3">
                  <label htmlFor="" className="form-label">
                    Disponible
                  </label>
                  <select
                    value={updateState}
                    className="form-group "
                    name="available"
                    onChange={onInputChange}
                  >
                    <option value={updateState} disabled>
                      Disponible
                    </option>

                    <option value={true}>Si</option>
                    <option value={false}>no</option>
                  </select>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>
                  <button type="submit" className="btn buttonCrear">
                    Crear
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

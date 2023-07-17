import React, { useState } from "react";
import {validacionGuar} from "./Validaciones/validacionGuar"
import style from "./dashBoard.module.css"

export const ModalCreateSide = () => {
  let initialState = {
    name: "",
    stock: "",
    price: "",
    image: "",
  };

  const [inputCreateSide, setInputCreateSide] = useState(initialState);
  const [error, setError] = useState({});

  const onInputChange = ({ target }) => {
    setInputCreateSide({
      ...inputCreateSide,
      [target.name]: target.value,
    });
    setError(validacionGuar({
      ...inputCreateSide,
      [target.name]:  target.value
    }))
  };

  const onSubmitCreate = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container-fluid">
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop3">
        Crear Guarnicion
      </button>

      <div
        className="modal fade"
        id="staticBackdrop3"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true">
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
                aria-label="Close"></button>
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
                {error.name && <p className={style.dato_incorrecto}>{error.name}</p>}

                <label htmlFor="" className="pe-3 pt-3 form-label">
                  Tipo
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="calories"
                  value={inputCreateSide.stock}
                  onChange={onInputChange}
                />

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
                {error.price && <p className={style.dato_incorrecto}>{error.price}</p>}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal">
                    Cerrar
                  </button>
                  <button type="submit" className="btn btn-primary">
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

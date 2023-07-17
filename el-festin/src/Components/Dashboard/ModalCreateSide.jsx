
import axios from "axios";
import { server } from "../../Helpers/EndPoint";

import React, { useState } from "react";
import {validacionGuar} from "./Validaciones/validacionGuar"
import style from "./Dashboard.module.css"


export const ModalCreateSide = () => {
  let initialState = {
    name: "",
    type: "",
    price: "",
    available: null,
  };

  const [inputCreateSide, setInputCreateSide] = useState(initialState);

  const [filed, setFiled] = useState(null);

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

  let handleOnChangeImage = ({ target }) => {
    setFiled(target.files[0]);
  };

  const formData = new FormData();
  formData.append("name", inputCreateSide.name);
  formData.append("type", inputCreateSide.type);
  formData.append("price", inputCreateSide.price);
  formData.append("available", inputCreateSide.available);
  formData.append("image", filed);

  

  const onSubmitCreate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${server}/side`, formData);
      
      if (data.name) {
        alert("Guarnicion creada con exito");
      }
    } catch (error) {
      throw error.message;
    }
  };

  return (
    <div className="container-fluid text-dark">
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

                <select
                  defaultValue={"DEFAULT"}
                  className="form-group mt-4"
                  name="type"
                  onChange={onInputChange}>
                  <option value="DEFAULT" disabled>
                    tipo de guarnicion
                  </option>

                  <option value="salsa">Salsa</option>
                  <option value="acompañamiento">acompañamiento</option>
                </select>
                <br />
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

                <br />
                <select
                  defaultValue={"DEFAULT"}
                  className="form-group mt-4"
                  name="available"
                  onChange={onInputChange}>
                  <option value="DEFAULT" disabled>
                    Disponible
                  </option>

                  <option value={true}>Si</option>
                  <option value={false}>no</option>
                </select>
                <br />
                <label htmlFor="" className="pe-3 pt-3 form-label">
                  Imagen
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleOnChangeImage}
                />


                <br />


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

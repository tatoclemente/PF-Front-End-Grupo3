import React, { useState } from "react";

export const Dashboard = () => {
  let initialState = {
    name: "",
    description: "",
    type: "",
    subtype: "",
    disabled: "",
    available: "",
    calories: "",
    glutenfree: "",
    vegetarian: "",
    dailyspecial: "",
    especial: "",
    price: "",
  };

  const [inputCreate, setInputCreate] = useState(initialState);

  const onInputChange = ({ target }) => {
    setInputCreate({
      ...inputCreate,
      [target.name]: target.value,
    });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="fs-4 text-center">
          <h1>Dashboard</h1>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop">
          Crear de plato
        </button>

        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Crear plato nuevo
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form className="">
                  <label htmlFor="" className="pe-3 pt-3 form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={inputCreate.name}
                    onChange={onInputChange}
                  />
                  <label
                    htmlFor=""
                    className="pe-3 pt-3 form-label"
                    name="name">
                    Descripcion
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={inputCreate.description}
                    onChange={onInputChange}
                  />
                  <label htmlFor="" className="pe-3 pt-3 form-label">
                    tipo de plato (plato principal, entrada, Etc)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="type"
                    value={inputCreate.type}
                    onChange={onInputChange}
                  />
                  <label htmlFor="" className="pe-3 pt-3 form-label">
                    Subtipo ("pastas", "ensaladas", "carnes")
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="subtype"
                    value={inputCreate.subtype}
                    onChange={onInputChange}
                  />
                  <label htmlFor="" className="pe-3 pt-3 form-label">
                    Disables
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="disabled"
                    value={inputCreate.disabled}
                    onChange={onInputChange}
                  />
                  <label htmlFor="" className="pe-3 pt-3 form-label">
                    available
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="available"
                    value={inputCreate.available}
                    onChange={onInputChange}
                  />
                  <label htmlFor="" className="pe-3 pt-3 form-label">
                    Calorias
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="calories"
                    value={inputCreate.calories}
                    onChange={onInputChange}
                  />
                  <label htmlFor="" className="pe-3 pt-3 form-label">
                    Glutenfree
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="glutenfree"
                    value={inputCreate.glutenfree}
                    onChange={onInputChange}
                  />
                  <label htmlFor="" className="pe-3 pt-3 form-label">
                    Vegetariana
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="vegetarian"
                    value={inputCreate.vegetarian}
                    onChange={onInputChange}
                  />
                  <label htmlFor="" className="pe-3 pt-3 form-label">
                    dailyspecial
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="dailyspecial"
                    value={inputCreate.dailyspecial}
                    onChange={onInputChange}
                  />
                  <label htmlFor="" className="pe-3 pt-3 form-label">
                    Precio
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="price"
                    value={inputCreate.price}
                    onChange={onInputChange}
                  />
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal">
                  Cerrar
                </button>
                <button type="button" className="btn btn-primary">
                  Crear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

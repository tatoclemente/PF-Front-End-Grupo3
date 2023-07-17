import { useState } from "react";

export const ModalCreateDish = () => {
  let initialState = {
    name: "",
    description: "",
    type: "",
    subtype: "",
    calories: "",
    glutenfree: "",
    vegetarian: "",
    dailyspecial: "",
    especial: "",
    price: "",
  };

  const [inputCreateDish, setInputCreateDish] = useState(initialState);

  const onInputChange = ({ target }) => {
    setInputCreateDish({
      ...inputCreateDish,
      [target.name]: target.value,
    });
  };

  const onSubmitCreate = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="container-fluid">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Crear Plato
        </button>

        <div
          className="modal fade"
          id="staticBackdrop"
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
                  Crear plato nuevo
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
                    value={inputCreateDish.name}
                    onChange={onInputChange}
                  />
                  <label
                    htmlFor=""
                    className="pe-3 pt-3 form-label"
                    name="name"
                  >
                    Descripcion
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={inputCreateDish.description}
                    onChange={onInputChange}
                  />
                  <label htmlFor="" className="pe-3 pt-3 form-label">
                    tipo de plato (plato principal, entrada, Etc)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="type"
                    value={inputCreateDish.type}
                    onChange={onInputChange}
                  />
                  <label htmlFor="" className="pe-3 pt-3 form-label">
                    Subtipo ("pastas", "ensaladas", "carnes")
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="subtype"
                    value={inputCreateDish.subtype}
                    onChange={onInputChange}
                  />

                  <label htmlFor="" className="pe-3 pt-3 form-label">
                    Calorias
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="calories"
                    value={inputCreateDish.calories}
                    onChange={onInputChange}
                  />
                  <label htmlFor="" className="pe-3 pt-3 form-label">
                    Glutenfree
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="glutenfree"
                    value={inputCreateDish.glutenfree}
                    onChange={onInputChange}
                  />
                  <label htmlFor="" className="pe-3 pt-3 form-label">
                    Vegetariana
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="vegetarian"
                    value={inputCreateDish.vegetarian}
                    onChange={onInputChange}
                  />
                  <label htmlFor="" className="pe-3 pt-3 form-label">
                    dailyspecial
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="dailyspecial"
                    value={inputCreateDish.dailyspecial}
                    onChange={onInputChange}
                  />
                  <label htmlFor="" className="pe-3 pt-3 form-label">
                    Precio
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="price"
                    value={inputCreateDish.price}
                    onChange={onInputChange}
                  />
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
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
    </>
  );
};

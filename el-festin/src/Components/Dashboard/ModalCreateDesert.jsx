import { useState } from "react";
import { validacionDesert } from "./Validaciones/validacionDesert";
import style from "./Dashboard.module.css";

export const ModalCreateDesert = () => {
  let initialState = {
    name: "",
    stock: "",
    price: "",
    image: "",
  };

  const [inputCreateDesert, setInputCreateDesert] = useState(initialState);
  const [error, setError] = useState({});

  const onInputChange = ({ target }) => {
    setInputCreateDesert({
      ...inputCreateDesert,
      [target.name]: target.value,
    });
    setError(
      validacionDesert({
        ...inputCreateDesert,
        [target.name]: target.value,
      })
    );
  };

  const onSubmitCreate = (e) => {
    e.preventDefault();
    if (Object.keys(error).length === 0) {
      console.log(inputCreateDesert);
      setInputCreateDesert(initialState);
      window.alert("Postre creado correctamente");
    } else {
      window.alert("Postre no creado");
    }
  };

  return (
    <div className="container-fluid">
      <button
        type="button"
        className={`btn btn-primary ${style.buttonDelete}`}
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop2"
      >
        Crear Postre
      </button>

      <div
        className="modal fade"
        id="staticBackdrop2"
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
                Crear Postre nuevo
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
                  value={inputCreateDesert.name}
                  onChange={onInputChange}
                />
                {error.name && (
                  <p className={style.dato_incorrecto}>{error.name}</p>
                )}

                <label htmlFor="" className="pe-3 pt-3 form-label">
                  Stock
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="stock"
                  value={inputCreateDesert.stock}
                  onChange={onInputChange}
                />
                {error.stock && (
                  <p className={style.dato_incorrecto}>{error.stock}</p>
                )}

                <label htmlFor="" className="pe-3 pt-3 form-label">
                  Precio
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="price"
                  value={inputCreateDesert.price}
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
                  name="price"
                  value={inputCreateDesert.image}
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
  );
};

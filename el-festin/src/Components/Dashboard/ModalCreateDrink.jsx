import { useState } from "react";
import {validacionDrink} from './Validaciones/validacionDrink'
import style from "./dashBoard.module.css"

export const ModalCreateDrink = () => {
  let initialState = {
    name: "",
    volume: "",
    type: "",
    alcohol: "",
    stock: "",
    price: "",
    image: "",
  };

  const [inputCreateDrink, setInputCreateDrink] = useState(initialState);
  const [error, setError] = useState({});

  const onInputChange = ({ target }) => {
    setInputCreateDrink({
      ...inputCreateDrink,
      [target.name]: target.value,
    });
    setError(validacionDrink({
      ...inputCreateDrink,
      [target.name]: target.value,
    }));
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
        data-bs-target="#staticBackdrop1">
        Crear Bebida
      </button>

      <div
        className="modal fade"
        id="staticBackdrop1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Crear bebida nuevo
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
                  value={inputCreateDrink.name}
                  onChange={onInputChange}
                />
                {error.name && <p className={style.dato_incorrecto}>{error.name}</p>}
                <label htmlFor="" className="pe-3 pt-3 form-label">
                  Medida
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={inputCreateDrink.volume}
                  onChange={onInputChange}
                />
                {error.volume && <p className={style.dato_incorrecto}>{error.volume}</p>}

                <label htmlFor="" className="pe-3 pt-3 form-label">
                  tipo de bebida
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="type"
                  value={inputCreateDrink.type}
                  onChange={onInputChange}
                />
                <label htmlFor="" className="pe-3 pt-3 form-label">
                  Contiene alcohol
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="subtype"
                  value={inputCreateDrink.alcohol}
                  onChange={onInputChange}
                />

                <label htmlFor="" className="pe-3 pt-3 form-label">
                  Stock
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="calories"
                  value={inputCreateDrink.stock}
                  onChange={onInputChange}
                />
                {error.stock && <p className={style.dato_incorrecto}>{error.stock}</p>}

                <label htmlFor="" className="pe-3 pt-3 form-label">
                  Precio
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="price"
                  value={inputCreateDrink.price}
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

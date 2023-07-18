import { useEffect, useState } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  validacionDish,
  validacionDishName,
} from "./Validaciones/validacionDish";
import { getTypes } from "../../Redux/actions/getDishesTypes";
import style from "./Dashboard.module.css";

export const ModalCreateDish = () => {
  let initialState = {
    name: "",
    description: "",
    type: "",
    subtype: [],
    calories: "",
    glutenfree: "",
    vegetarian: "",
    plateoftheday: "",
    price: "",
  };

  const [inputCreateDish, setInputCreateDish] = useState(initialState);
  const [error, setError] = useState({});
  const repDish = useSelector((state) => state.dishes.dishes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  const onInputChange = ({ target }) => {
    setInputCreateDish({
      ...inputCreateDish,
      [target.name]: target.value,
    });
    setError(validacionDishName({ repDish, inputCreateDish }));
    setError(
      validacionDish({
        ...inputCreateDish,
        [target.name]: target.value,
      })
    );
  };

  const onSubmitCreate = (e) => {
    e.preventDefault();
    if (repDish.find((e) => e.name === inputCreateDish.name)) {
      window.alert("El postre ya existe");
      return;
    }
    if (
      !error.name &&
      !error.description &&
      !error.subtype &&
      !error.calories &&
      !error.price
    ) {
      console.log(inputCreateDish);
      setInputCreateDish(initialState);
      window.alert("Postre creado correctamente");
    } else {
      console.log(error);
      window.alert("Postre no creado");
    }
  };

  return (
    <div className="container-fluid">
      <button
        type="button"
        className={`btn btn-primary ${style.buttonDelete}`}
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
                {error.name && (
                  <p className={style.dato_incorrecto}>{error.name}</p>
                )}
                <label htmlFor="" className="pe-3 pt-3 form-label" name="name">
                  Descripcion
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={inputCreateDish.description}
                  onChange={onInputChange}
                />
                {error.description && (
                  <p className={style.dato_incorrecto}>{error.description}</p>
                )}
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
                {error.calories && (
                  <p className={style.dato_incorrecto}>{error.calories}</p>
                )}
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
                {error.glutenfree && (
                  <p className={style.dato_incorrecto}>{error.glutenfree}</p>
                )}
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
                {error.vegetarian && (
                  <p className={style.dato_incorrecto}>{error.vegetarian}</p>
                )}
                <label htmlFor="" className="pe-3 pt-3 form-label">
                  dailyspecial
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="plateoftheday"
                  value={inputCreateDish.dailyspecial}
                  onChange={onInputChange}
                />
                {error.plateoftheday && (
                  <p className={style.dato_incorrecto}>{error.plateoftheday}</p>
                )}
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
                {error.price && (
                  <p className={style.dato_incorrecto}>{error.price}</p>
                )}
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

import axios from "axios";
import { server } from "../../Helpers/EndPoint";
import { useEffect, useState } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  validacionDish,
  validacionDishName,
} from "./Validaciones/validacionDish";
import { getTypes } from "../../Redux/actions/getDishesTypes";
import style from "./Dashboard.module.css";
import "../Dashboard/dashboard.css";

export const ModalCreateDish = () => {
  let initialState = {
    name: "",
    description: "",
    type: "",
    subtype: [],
    calories: "",
    glutenfree: null,
    vegetarian: null,
    dailyspecial: null,
    price: "",
  };

  const [inputCreateDish, setInputCreateDish] = useState(initialState);

  const [filed, setFiled] = useState(null);

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

                <div className="dropdown">
                  <select
                    defaultValue={"DEFAULT"}
                    className="mt-4"
                    name="type"
                    onChange={onInputChange}>
                    <option value="DEFAULT" disabled>
                      Tipos de plato
                    </option>

                    <option value="plato principal">Plato principal</option>
                    <option value="entrada">Entrada</option>
                  </select>
                </div>

                <div className="dropdown px-2">
                  <select
                    defaultValue={"DEFAULT"}
                    className="form-group mt-4"
                    name="subtype"
                    onChange={onInputChange}>
                    <option value="DEFAULT" disabled className="">
                      Subtipos
                    </option>
                    {subtiposDish?.map((subtipo, key) => {
                      return (
                        <option key={key} value={subtipo}>
                          {subtipo}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="dropdown">
                  <select
                    defaultValue={"DEFAULT"}
                    className="form-group mt-4"
                    name="glutenfree"
                    onChange={onInputChange}>
                    <option value="DEFAULT" disabled className="">
                      Glutenfree
                    </option>

                    <option value={true}>Si</option>
                    <option value={false}>no</option>
                  </select>
                </div>

                <div className="dropdown pe-2">
                  <select
                    defaultValue={"DEFAULT"}
                    className="form-group mt-4"
                    name="vegetarian"
                    onChange={onInputChange}>
                    <option value="DEFAULT" disabled className="">
                      Vegetariano
                    </option>

                    <option value={true}>Si</option>
                    <option value={false}>no</option>
                  </select>
                </div>

                <div className="dropdown">
                  <select
                    defaultValue={"DEFAULT"}
                    className=" my-4"
                    name="dailyspecial"
                    onChange={onInputChange}>
                    <option value="DEFAULT" disabled className="">
                      Especial del dia
                    </option>
                    <option value={true} className="">
                      Si
                    </option>
                    <option value={false}>no</option>
                  </select>
                </div>
                <br />


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

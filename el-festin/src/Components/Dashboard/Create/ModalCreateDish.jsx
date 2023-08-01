import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { server } from "../../../Helpers/EndPoint";
import { validacionDish } from "../Validaciones/validacionDish";
import { getTypes } from "../../../Redux/actions/getDishesTypes";
import style from "../Dashboard.module.css";
import "../dashboard.css";

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

  const subtiposDish = useSelector((state) => state.dishes.dishesTypes);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  const onInputChange = ({ target }) => {
    setInputCreateDish({
      ...inputCreateDish,
      [target.name]: target.value,
    });
    setError(
      validacionDish({
        ...inputCreateDish,
        [target.name]: target.value,
      })
    );
  };

  const onSubmitCreate = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${server}/dish`, formData);

      if (data.name) {
        alert("Plato creado correctamente");
      }
    } catch (error) {
      throw error.message;
    }
  };

  let handleOnChangeImage = ({ target }) => {
    setFiled(target.files[0]);
  };

  const formData = new FormData();
  formData.append("name", inputCreateDish.name);
  formData.append("description", inputCreateDish.description);
  formData.append("type", inputCreateDish.type);
  formData.append("calories", inputCreateDish.calories);
  formData.append("price", inputCreateDish.price);
  formData.append("subtype", inputCreateDish.subtype);
  formData.append("glutenfree", inputCreateDish.glutenfree);
  formData.append("vegetarian", inputCreateDish.vegetarian);
  formData.append("dailyspecial", inputCreateDish.dailyspecial);
  formData.append("image", filed);

  return (
    <div className="container-fluid text-dark">
      <button
        type="button"
        className={`btn btn-primary ${style.buttonDelete}`}
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop">
        Crear Plato
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
                <label>Descripcion</label>
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
                <label htmlFor="" className="pe-3 pt-3 form-label">
                  Imagen
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleOnChangeImage}
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
                    data-bs-dismiss="modal">
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

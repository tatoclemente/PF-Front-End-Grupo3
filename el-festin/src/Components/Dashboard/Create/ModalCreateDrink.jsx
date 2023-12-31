import { useRef, useState } from "react";
import axios from "axios";
import { server } from "../../../Helpers/EndPoint";
import { volumeDrink } from "../../../Helpers/objetosHelp";
import { typeDrink } from "../../../Helpers/objetosHelp";
import { validacionDrink } from "../Validaciones/validacionDrink";
import Swal from "sweetalert2";
import "../dashboard.css";
import style from "../Dashboard.module.css";
import { useDispatch } from "react-redux";
import { getDrinks } from "../../../Redux/actions/actionsDrinks/getAllDrinks";

export const ModalCreateDrink = () => {
  const [updateState, setUpdateState] = useState("DEFAULT");
  let initialState = {
    name: "",
    volume: updateState,
    type: updateState,
    alcohol: updateState,
    stock: 0,
    price: "",
  };

  const dispatch = useDispatch();

  const [inputCreateDrink, setInputCreateDrink] = useState(initialState);

  const [filed, setFiled] = useState(null);
  const [error, setError] = useState({});
  const fileInputRef = useRef(null);

  const onInputChange = ({ target }) => {
    setInputCreateDrink({
      ...inputCreateDrink,
      [target.name]: target.value,
    });
    setError(
      validacionDrink({
        ...inputCreateDrink,
        [target.name]: target.value,
      })
    );
  };

  let handleOnChangeImage = ({ target }) => {
    setFiled(target.files[0]);
  };

  const formData = new FormData();
  formData.append("name", inputCreateDrink.name);
  formData.append("volume", inputCreateDrink.volume);
  formData.append("type", inputCreateDrink.type);
  formData.append("alcohol", inputCreateDrink.alcohol);
  formData.append("price", inputCreateDrink.price);
  formData.append("stock", inputCreateDrink.stock);
  formData.append("image", filed);

  const onSubmitCreate = async (e) => {
    e.preventDefault();
    console.log(error);
    try {
      if (Object.keys(error).length === 0) {
        const { data } = await axios.post(`${server}/drink`, formData);
        if (data.name) {
          dispatch(getDrinks());
          setInputCreateDrink(initialState);
          setUpdateState("DEFAULT");
          setFiled(null);
          fileInputRef.current.value = null;
          setError({});
          Swal.fire({
            icon: "success",
            title: "Bebida creada con exito",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "La bebida no pudo ser creado",
            confirmButtonText: "OK",
          });
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "Revisa los errores",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      throw error.message;
    }
  };

  return (
    <div className="container-fluid text-dark">
      <button
        type="button"
        className={style.buttonDeleteCreate}
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop1">
        Bebida
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
                  value={inputCreateDrink.stock}
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
                  value={inputCreateDrink.price}
                  onChange={onInputChange}
                />

                <label htmlFor="" className="pe-3 pt-3 form-label">
                  Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleOnChangeImage}
                  ref={fileInputRef}
                />

                {error.price && (
                  <p className={style.dato_incorrecto}>{error.price}</p>
                )}
                <div className="dropdown">
                  <select
                    value={inputCreateDrink.volume}
                    className="form-group mt-4"
                    name="volume"
                    onChange={onInputChange}>
                    <option value="DEFAULT" disabled className="">
                      Medida
                    </option>
                    {volumeDrink.map((volume, key) => {
                      return (
                        <option key={key} value={volume}>
                          {volume}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="dropdown px-2 pb-3">
                  <select
                    value={inputCreateDrink.type}
                    className="form-group  mt-4"
                    name="type"
                    onChange={onInputChange}>
                    <option value="DEFAULT" disabled className="">
                      Tipo de bebida
                    </option>
                    {typeDrink.map((type, key) => {
                      return (
                        <option key={key} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="dropdown">
                  <select
                    value={inputCreateDrink.alcohol}
                    className="form-group"
                    name="alcohol"
                    onChange={onInputChange}>
                    <option value="DEFAULT" disabled>
                      Contiene alcohol
                    </option>

                    <option value={true}>Si</option>
                    <option value={false}>no</option>
                  </select>
                </div>
                <br />

                <div className="modal-footer">
                  {/* <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button> */}
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

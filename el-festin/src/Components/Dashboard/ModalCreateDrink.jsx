import { useState } from "react";
import { validacionDrink } from "./Validaciones/validacionDrink";
import style from "./Dashboard.module.css";

export const ModalCreateDrink = () => {
  let initialState = {
    name: "",
    volume: "",
    type: "",
    alcohol: "",
    stock: 0,
    price: "",
  };

  const [inputCreateDrink, setInputCreateDrink] = useState(initialState);

  const [filed, setFiled] = useState(null);
  const [error, setError] = useState({});

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
    try {
      const { data } = await axios.post(`${server}/drink`, formData);

      if (data.name) {
        alert("Bebida creada con exito");
      }
    } catch (error) {
      throw error.message;
    }
  };

  return (
    <div className="container-fluid">
      <button
        type="button"
        className={`btn btn-primary ${style.buttonDelete}`}
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop1"
      >
        Crear Bebida
      </button>

      <div
        className="modal fade"
        id="staticBackdrop1"
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
                Crear bebida nuevo
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
                  value={inputCreateDrink.name}
                  onChange={onInputChange}
                />
                {error.name && (
                  <p className={style.dato_incorrecto}>{error.name}</p>
                )}
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
                {error.volume && (
                  <p className={style.dato_incorrecto}>{error.volume}</p>
                )}

                <select
                  defaultValue={"DEFAULT"}
                  className="form-group mt-4"
                  name="type"
                  onChange={onInputChange}
                >
                  <option value="DEFAULT" disabled className="">
                    tipo de bebida
                  </option>
                  {typeDrink.map((type, key) => {
                    return (
                      <option key={key} value={type}>
                        {type}
                      </option>
                    );
                  })}
                </select>
                <br />
                <select
                  defaultValue={"DEFAULT"}
                  className="form-group mt-4"
                  name="alcohol"
                  onChange={onInputChange}
                >
                  <option value="DEFAULT" disabled>
                    contiene alcohol
                  </option>

                  <option value={true}>Si</option>
                  <option value={false}>no</option>
                </select>
                <br />

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

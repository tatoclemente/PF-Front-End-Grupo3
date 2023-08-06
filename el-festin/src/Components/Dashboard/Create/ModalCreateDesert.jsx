import { useRef, useState } from "react";
import axios from "axios";
import { server } from "../../../Helpers/EndPoint";
import { validacionDesert } from "../Validaciones/validacionDesert";
import Swal from "sweetalert2";
import style from "../Dashboard.module.css";

export const ModalCreateDesert = () => {
  let initialState = {
    name: "",
    stock: "",
    price: "",
  };

  const [inputCreateDesert, setInputCreateDesert] = useState(initialState);
  const [filed, setFiled] = useState(null);
  const [error, setError] = useState({});
  const fileInputRef = useRef(null);

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

  let handleOnChangeImage = ({ target }) => {
    setFiled(target.files[0]);
  };

  const formData = new FormData();
  formData.append("name", inputCreateDesert.name);
  formData.append("stock", inputCreateDesert.stock);
  formData.append("price", inputCreateDesert.price);
  formData.append("image", filed);

  const onSubmitCreate = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${server}/desert`, formData);

      if (data.name) {
        Swal.fire({
          icon: "success",
          title: "Postre creado con exito",
          confirmButtonText: "OK",
        });
        setInputCreateDesert(initialState);
        setFiled(null);
        fileInputRef.current.value = null;
        setError({});
      }
    } catch (error) {
      throw error.message;
    }
  };

  return (
    <div className="container-fluid text-dark">
      <button
        type="button"
        className={`btn btn-primary ${style.buttonDelete}`}
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop2"
      >
        Postre
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
                  onChange={handleOnChangeImage}
                  ref={fileInputRef}
                />
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

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { server } from "../../../Helpers/EndPoint";
import Card from "../../Card/Card";
import Swal from "sweetalert2";
import style from "../Dashboard.module.css";
import "../dashboard.css";

export const Deleted = ({ allDates, path, getItems, name, idModal }) => {
  const [deleteState, setDeleteState] = useState("DEFAULT");

  const [isOn, setIsOn] = useState(null);

  const dispatch = useDispatch();

  let selectedItem =
    Array.isArray(allDates) &&
    allDates.find((item) => {
      return item.name === deleteState;
    });

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  useEffect(() => {
    setIsOn(selectedItem?.disabled);
  }, [selectedItem]);

  const onDeleteChange = ({ target }) => {
    setDeleteState(target.value);
  };

  const toggleButton = () => {
    setIsOn((prevState) => !prevState);
  };

  const handleSubmitDeleted = async (e) => {
    e.preventDefault();
    if (selectedItem.disabled !== isOn) {
      await axios.put(`${server}/${path}/${selectedItem.id}`, {
        ...selectedItem,
        disabled: isOn,
      });
      setDeleteState(null);
      dispatch(getItems());
      setDeleteState("DEFAULT");
      Swal.fire({
        icon: "success",
        title: "Estado de plato cambiado con exito",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "El plato ya tiene ese estado",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <div className="container-fluid text-dark">
        <button
          type="button"
          className={style.buttonDelete}
          data-bs-toggle="modal"
          data-bs-target={`#${idModal}`}
        >
          {name}
        </button>
        <div
          className="modal fade"
          id={idModal}
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content modal-width">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  {`Borrar ${name}`}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  onClick={() => setDeleteState("DEFAULT")}
                  aria-label="Close"
                ></button>
              </div>

              <form onSubmit={handleSubmitDeleted} className="modal-body">
                <label className="fw-bold fs-5 pb-2">
                  {`Elija ${name} a borrar`}
                </label>{" "}
                <br />
                <div className="dropdown">
                  <select value={deleteState} onChange={onDeleteChange}>
                    <option value="DEFAULT" disabled>
                      {`Buscar ${name}`}
                    </option>
                    {Array.isArray(allDates) &&
                      allDates.map((item) => {
                        return (
                          <option key={item.id} value={item.name}>
                            {item.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                {selectedItem ? (
                  <div
                    className={`button ${!isOn ? "on" : ""}`}
                    onClick={toggleButton}
                  >
                    <div className="d-flex align-items-center justify-content-between pt-2 px-2">
                      <div className="text-start">Off</div>
                      <div className="text-end">On</div>
                    </div>
                    <div className="button-inner"></div>
                  </div>
                ) : undefined}
                <div className="d-flex justify-content-center align-item-center py-5">
                  <div className={`${isOn ? "bg-disabled" : ""}`}>
                    {selectedItem && (
                      <Card
                        key={selectedItem.id}
                        type={selectedItem.type}
                        image={selectedItem.image}
                        name={selectedItem.name}
                        price={selectedItem.price}
                        rating={selectedItem.rating}
                        description={selectedItem.description}
                        id={selectedItem.id}
                      />
                    )}
                  </div>
                </div>
                {selectedItem ? (
                  <div className="pb-2">
                    {isOn ? (
                      <h4 className="text-danger">{`${name} deshabilitado`}</h4>
                    ) : (
                      <h4 className="text-success">{`${name} Habilitado`}</h4>
                    )}
                  </div>
                ) : undefined}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => setDeleteState("DEFAULT")}
                  >
                    Cerrar
                  </button>
                  <button type="submit" className="btn buttonCrear">
                    Guardar cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

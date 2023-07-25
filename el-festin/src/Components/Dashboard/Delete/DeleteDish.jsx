import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getDishes } from "../../../Redux/actions/getAllDishes";
import { deletedDishes } from "../../../Redux/actions/actionsDish/deletedDishes";
import Card from "../../Card/Card";
import style from "../Dashboard.module.css";
import "../dashboard.css";

export const DeleteDish = () => {
  const [deleteState, setDeleteState] = useState(null);
  const [isOn, setIsOn] = useState(false);
  const allDishes = useSelector((state) => state.dishes.dishes);
  const dispatch = useDispatch();

  let dish = allDishes.find((dish) => {
    return dish.name === deleteState;
  });

  useEffect(() => {
    dispatch(getDishes());
  }, [dispatch]);

  useEffect(() => {
    setIsOn(dish?.disabled);
  }, [dish]);

  const onDeleteDishChange = ({ target }) => {
    setDeleteState(target.value);
  };

  const toggleButton = () => {
    //el estado local tiene que tomar el valor de disabled de cada item

    setIsOn((prevState) => !prevState);
  };

  const handleSubmitDeleted = (e) => {
    e.preventDefault();
    if (dish) {
      if (isOn === false) {
        dispatch(deletedDishes(dish.id));
      } else {
        //dispatch del estado restore plato
      }
    } else {
      alert("Debe selecionar un plato");
    }
    //logica para mostrar mensaje de que el plato ya esta habilitado o deshabilitado
  };

  return (
    <>
      <div className="container-fluid text-dark">
        <button
          type="button"
          className={`btn btn-primary ${style.buttonDelete}`}
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop5">
          Borrar plato
        </button>
        <div
          className="modal fade"
          id="staticBackdrop5"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content modal-width">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Borrar plato
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"></button>
              </div>

              <form onSubmit={handleSubmitDeleted} className="modal-body">
                <label className="fw-bold fs-5 pb-2">
                  Elija plato a borrar
                </label>{" "}
                <br />
                <div className="dropdown">
                  <select
                    defaultValue={"DEFAULT"}
                    onChange={onDeleteDishChange}>
                    <option value="DEFAULT" disabled>
                      Buscar Plato
                    </option>
                    {allDishes.map((dish) => {
                      return (
                        <option key={dish.id} value={dish.name}>
                          {dish.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {dish ? (
                  <div
                    className={`button ${!isOn ? "on" : ""}`}
                    onClick={toggleButton}>
                    <div className="d-flex align-items-center justify-content-between pt-2 px-2">
                      <div className="text-start">Off</div>
                      <div className="text-end">On</div>
                    </div>
                    <div className="button-inner"></div>
                  </div>
                ) : undefined}
                <div className="d-flex justify-content-center align-item-center py-5">
                  <div className={`${isOn ? "bg-disabled" : ""}`}>
                    {dish && (
                      <Card
                        key={dish.id}
                        type={dish.type}
                        image={dish.image}
                        name={dish.name}
                        price={dish.price}
                        rating={dish.rating}
                        description={dish.description}
                        id={dish.id}
                      />
                    )}
                  </div>
                </div>
                <div className="pb-2">
                  {isOn ? (
                    <h4 className="text-danger">Plato deshabilitado</h4>
                  ) : (
                    <h4 className="text-success">Plato Habilitado</h4>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal">
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

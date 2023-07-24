import React from "react";
import style from "./FiltersAndSorts.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  sortDishesByGluten,
  sortDishesByVeggy,
  sortByCalories,
  sortByPrice,
  sortDishesByType,
} from "../../../Redux/slices/platosSlice";
import {
  sortDrinksByAlchol,
  sortDrinksByPrice,
  sortDrinksByVolume,
} from "../../../Redux/slices/bebidasSlice";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useEffect } from "react";
import { getDrTypes } from "../../../Redux/actions/actionsDrinks/getDrinksTypes";

function FiltersAndSorts(props) {
  const [isCollapsed, setIsCollapsed] = props.state;
  const dispatch = useDispatch();
  const drinkType = useSelector((state) => state.drinks.drinksTypes);

  useEffect(() => {
    dispatch(getDrTypes());
  }, []);

  const handleVolume = (e) => {
    const val = e.target.value;
    dispatch(sortDrinksByVolume(val));
  };

  const handleAlcohol = (e) => {
    const val = e.target.value;
    dispatch(sortDrinksByAlchol(val));
  };
  const handlePriceDrink = (e) => {
    const val = e.target.value;

    dispatch(sortDrinksByPrice(val));
  };

  const handleGluten = (e) => {
    const val = e.target.value;
    dispatch(sortDishesByGluten(val));
  };

  const handleVeggy = (e) => {
    const val = e.target.value;
    dispatch(sortDishesByVeggy(val));
  };

  const handlePrice = (e) => {
    const val = e.target.value;
    dispatch(sortByPrice(val));
  };

  const handleCalories = (e) => {
    const val = e.target.value;
    dispatch(sortByCalories(val));
  };

  const handleToggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      style={
        isCollapsed
          ? { width: "5px", transition: "width 0.5s ease-in-out" }
          : { width: "18vw", transition: "width 0.5s ease-in-out" }
      }
      className={`${style.mainContainer} ${isCollapsed ? style.collapsed : ""}`}
    >
      <div
        style={
          isCollapsed
            ? {
                transform: "translateX(-150%)",
                transition: "transform .5s ease-in-out",
              }
            : {}
        }
      >
        <button
          className={isCollapsed ? style.btnCollapsed : style.buttonDropDown}
          onClick={handleToggleMenu}
        >
          <RiArrowLeftSLine className={style.arrow} />
        </button>
        {isCollapsed ? (
          <p className={style.text}>abrir barra de filtros</p>
        ) : null}
      </div>

      <div className={style.filteredContent}>
        {props.stateFood !== "all" ? (
          <div>
            <div className={style.filtersContainer}>
              <h6>APLICAR FILTROS</h6>
              {props.stateFood === "dishes" ? (
                <div>
                  <div className={style.filters}>
                    <label>¿Sin gluten?</label>
                    <select className={style.select} onChange={handleGluten} defaultValue='title'>
                      <option value='title' disabled>
                        Con o sin gluten
                      </option>
                      <option value="all">Todos</option>
                      <option value="gluten">Con gluten</option>
                      <option value="noGluten">Sin gluten</option>
                    </select>
                  </div>

                  <div className={style.filters}>
                    <label>¿Vegetariano?</label>
                    <select className={style.select} onChange={handleVeggy} defaultValue='title'>
                      <option value='title' disabled>
                        Elige comida vegetariana
                      </option>
                      <option value="all">Todos</option>
                      <option value="veggy">Vegetariano</option>
                      <option value="noVeggy">No vegetariano</option>
                    </select>
                  </div>
                </div>
              ) : null}
              {props.stateFood === "drinks" ? (
                <div>
                  <div className={style.filters}>
                    <label>¿Sin alcohol?</label>
                    <select className={style.select} onChange={handleAlcohol} defaultValue='title'>
                      <option value='title' disabled>
                        Con o sin alcohol
                      </option>
                      <option value="all">Todos</option>
                      <option value="alcohol">Con alcohol</option>
                      <option value="noAlcohol">Sin alcohol</option>
                    </select>
                  </div>
                </div>
              ) : null}
            </div>

            <div className={style.filtersContainer}>
              <h6>ORDENAMIETOS</h6>

              {props.stateFood === "dishes" ? (
                <div>
                  <div className={style.filters}>
                    <label>Ordene por calorías</label>
                    <select className={style.select} onChange={handleCalories} defaultValue='title'>
                      <option value='title' disabled>
                        Elige por calorias
                      </option>
                      <option value="asc">Más Calorías</option>
                      <option value="desc">Menos Calorías</option>
                    </select>
                  </div>

                  <div className={style.filters}>
                    <label>Ordene por precio</label>
                    <select className={style.select} onChange={handlePrice} defaultValue='title'>
                      <option value='title' disabled>
                        Elige ordenar por precio
                      </option>
                      <option value="asc">Menor precio</option>
                      <option value="desc">Mayor precio</option>
                    </select>
                  </div>
                </div>
              ) : null}
              {props.stateFood === "drinks" ? (
                <div>
                  <div className={style.filters}>
                    <label>Ordene por volumen</label>
                    <select className={style.select} onChange={handleVolume} defaultValue='title'>
                      <option value='title' disabled>
                        Elige por volumen
                      </option>
                      <option value="asc">Más volumen</option>
                      <option value="desc">Menos volumen</option>
                    </select>
                  </div>

                  <div className={style.filters}>
                    <label>Ordene por precio</label>
                    <select
                      className={style.select}
                      onChange={handlePriceDrink}
                      defaultValue='title'
                    >
                      <option value='title' disabled>
                        Elige por precio
                      </option>
                      <option value="asc">Mayor precio</option>
                      <option value="desc">Menor precio</option>
                    </select>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default FiltersAndSorts;

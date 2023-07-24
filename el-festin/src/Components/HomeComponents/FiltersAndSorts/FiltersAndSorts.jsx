import React from "react";
import style from "./FiltersAndSorts.module.css";
import { useDispatch} from "react-redux";
import {
  sortDishesByGluten,
  sortDishesByVeggy,
  sortByCalories,
  
} from "../../../Redux/slices/platosSlice";
import {
  sortDrinksByAlchol,
  sortDrinksByVolume,
} from "../../../Redux/slices/bebidasSlice";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useEffect } from "react";
import { getDrTypes } from "../../../Redux/actions/actionsDrinks/getDrinksTypes";

function FiltersAndSorts(props) {
  const [isCollapsed, setIsCollapsed] = props.state;
  const dispatch = useDispatch();

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
 

  const handleGluten = (e) => {
    const val = e.target.value;
    dispatch(sortDishesByGluten(val));
  };

  const handleVeggy = (e) => {
    const val = e.target.value;
    dispatch(sortDishesByVeggy(val));
  };


  const handleCalories = (e) => {
    const val = e.target.value;
    dispatch(sortByCalories(val));
  };

  const handleToggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handlePriceAll = (e) =>{
const val = e.target.value;
 props.setStateSort(val)
  }

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

      <div className={style.filteredContent} isCollapsed={isCollapsed}>
        

        {props.stateFood !== "all" ? (
          <div>
            <div className={style.filtersContainer}>
              {props.stateFood === "dishes" ? (
                <div>
                  <h6>APLICAR FILTROS</h6>
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
                  <h6>APLICAR FILTROS</h6>
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
            </div>
          </div>
        ) : null}
            <div  className={style.filtersContainer}>
        <h6>ORDENAMIETOS</h6>
        <div className={style.filters}>
        
                    <label>Ordene por precio</label>
                    <select
                      className={style.select}
                      onChange={handlePriceAll}
                    >
                      <option selected disabled>
                        Elige por precio
                      </option>
                      <option value="asc">Mayor precio</option>
                      <option value="dsc">Menor precio</option>
                    </select>
                  </div>

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

                  
                </div>
              ) : null}
                {props.stateFood === "dishes" ? (
                <div>
                  <div className={style.filters}>

                    <label>Ordene por calorías</label>
                    <select className={style.select} onChange={handleCalories}>
                      <option selected disabled>
                        Elige por calorias
                      </option>
                      <option value="asc">Más Calorías</option>
                      <option value="desc">Menos Calorías</option>
                    </select>
                  </div>

                </div>
              ) : null}
        </div> 
      </div>
    </div>
  );
}

export default FiltersAndSorts;
